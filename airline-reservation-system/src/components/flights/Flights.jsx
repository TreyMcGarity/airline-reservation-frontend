// frontend/src/components/Flights.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← NEW
import FlightCard from './FlightCard';
import FlightSearchForm from '../flights/FlightSearchForm';
import BookingModal from '../BookingModal';
import PaymentModal from '../PaymentModal';
import api from '../../api/api';

const AUTH_TOKEN_KEY = 'authToken';               // ← adjust if your key name differs
const PENDING_BOOKING_KEY = 'pending_booking';    // sessionStorage key

export default function FlightsList({ flights: flightsProp }) {
  const navigate = useNavigate(); // ← NEW

  const [flights, setFlights] = useState(Array.isArray(flightsProp) ? flightsProp : []);
  const [filteredFlights, setFilteredFlights] = useState(Array.isArray(flightsProp) ? flightsProp : []);
  const [filters, setFilters] = useState({ origin: '', destination: '', departureDate: '', maxPrice: '' });

  const [activeFlight, setActiveFlight] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(!flightsProp);
  const [error, setError] = useState(null);

  // payment flow state
  const [bookingPayload, setBookingPayload] = useState(null);
  const [paymentData, setPaymentData] = useState(null); // { clientSecret, paymentIntentId, amountCents }

  const isLoggedIn = () => !!localStorage.getItem(AUTH_TOKEN_KEY); // ← simple auth check

  // Fetch flights (and keep filtered list in sync)
  useEffect(() => {
    if (flightsProp) {
      setFilteredFlights(flightsProp);
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const res = await api.get('/flights');
        const list = Array.isArray(res.data) ? res.data : (res.data?.flights || []);
        setFlights(list);
        setFilteredFlights(list);
      } catch (e) {
        console.error(e);
        setError('Failed to load flights');
      } finally {
        setLoading(false);
      }
    })();
  }, [flightsProp]);

  // If we redirected to login earlier, resume the booking when we return
  useEffect(() => {
    if (loading) return;
    const raw = sessionStorage.getItem(PENDING_BOOKING_KEY);
    if (!raw) return;
    try {
      const { flightId } = JSON.parse(raw);
      const f = flights.find(x => String(x.id) === String(flightId));
      if (f) setActiveFlight(f);
    } catch (_) {
      /* ignore parse errors */
    } finally {
      sessionStorage.removeItem(PENDING_BOOKING_KEY);
    }
  }, [loading, flights]);

  const filterFlights = () => {
    const filtered = flights.filter(flight => {
      const matchOrigin =
        !filters.origin || flight.origin.toLowerCase().includes(filters.origin.toLowerCase());
      const matchDestination =
        !filters.destination || flight.destination.toLowerCase().includes(filters.destination.toLowerCase());
      const matchDate =
        !filters.departureDate || String(flight.departure_time).startsWith(filters.departureDate);
      const matchPrice =
        !filters.maxPrice || parseFloat(flight.price) <= parseFloat(filters.maxPrice);
      return matchOrigin && matchDestination && matchDate && matchPrice;
    });
    setFilteredFlights(filtered);
  };

  // When user clicks "Book"
  const handleBookClick = (flight) => {
    if (!isLoggedIn()) {
      // remember where we were and what we tried to book
      sessionStorage.setItem(PENDING_BOOKING_KEY, JSON.stringify({ flightId: flight.id }));
      navigate('/login', { state: { from: '/flights' } }); // router will bring them back
      return;
    }
    setActiveFlight(flight);
  };

  const closeBooking = () => setActiveFlight(null);

  // BookingModal → create PaymentIntent → open PaymentModal
  const confirmBooking = async (payload) => {
    try {
      setSubmitting(true);
      setBookingPayload(payload);

      const amountCents = Math.round(Number(payload.totalPrice) * 100);

      const res = await api.post('/payments/create-intent', {
        amount: amountCents,
        currency: 'usd',
        metadata: {
          flightId: payload.flightId,
          email: payload.email,
          passengers: String(payload.passengers)
        }
      });

      setPaymentData({
        clientSecret: res.data.clientSecret,
        paymentIntentId: res.data.paymentIntentId,
        amountCents
      });

      closeBooking(); // close BookingModal, then PaymentModal opens
    } catch (e) {
      console.error(e);
      setError('Unable to start payment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Payment success → finalize booking
  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      await api.post('/bookings', {
        ...bookingPayload,
        paymentIntentId: paymentIntent.id,
        status: 'confirmed'
      });
      // Optional: toast success, refresh flight seats, etc.
    } catch (e) {
      console.error(e);
      // Even if this fails, payment is captured; handle gracefully
    } finally {
      setPaymentData(null);
      setBookingPayload(null);
    }
  };

  if (loading) return <p>Loading flights…</p>;
  if (error) return <p>{error}</p>;
  if (!flights.length) return <p>No flights found.</p>;

  const listToShow = filteredFlights.length ? filteredFlights : flights;

  return (
    <>
      <FlightSearchForm filters={filters} setFilters={setFilters} onSearch={filterFlights} />

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {listToShow.map(f => (
          <FlightCard
            key={f.id ?? `${f.flight_number}-${f.departure_time}`}
            flight={f}
            onBook={handleBookClick}
          />
        ))}
      </div>

      {activeFlight && (
        <BookingModal
          flight={activeFlight}
          onClose={closeBooking}
          onConfirm={confirmBooking}  // → creates PaymentIntent, then opens PaymentModal
          submitting={submitting}
        />
      )}

      {paymentData && (
        <PaymentModal
          clientSecret={paymentData.clientSecret}
          amountCents={paymentData.amountCents}
          defaultEmail={bookingPayload?.email}
          defaultName={`${bookingPayload?.firstName || ''} ${bookingPayload?.lastName || ''}`.trim()}
          onClose={() => setPaymentData(null)}
          onSuccess={handlePaymentSuccess}     // → finalize booking
        />
      )}
    </>
  );
}
