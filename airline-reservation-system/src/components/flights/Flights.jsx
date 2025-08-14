// frontend/src/components/Flights.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlightCard from './FlightCard';
import FlightSearchForm from '../flights/FlightSearchForm';
import BookingModal from '../BookingModal';
import PaymentModal from '../PaymentModal';
import api from '../../api/api';

const AUTH_TOKEN_KEY = 'authToken';
const PENDING_BOOKING_KEY = 'pending_booking';

export default function FlightsList({ flights: flightsProp }) {
  const navigate = useNavigate();

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

  const isLoggedIn = () => !!localStorage.getItem(AUTH_TOKEN_KEY);

  // Fetch flights
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

  // Resume booking after login
  useEffect(() => {
    if (loading) return;
    const raw = sessionStorage.getItem(PENDING_BOOKING_KEY);
    if (!raw) return;
    try {
      const { flightId } = JSON.parse(raw);
      const f = flights.find(x => String(x.id) === String(flightId));
      if (f) setActiveFlight(f);
    } catch (_) {
      // ignore
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

  // Book click → login gate → open BookingModal
  const handleBookClick = (flight) => {
    if (!isLoggedIn()) {
      sessionStorage.setItem(PENDING_BOOKING_KEY, JSON.stringify({ flightId: flight.id }));
      navigate('/login', { state: { from: '/flights' } });
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

      // "$1,299.50" -> 129950 cents
      const priceStr = String(payload.totalPrice ?? '')
        .replace(/,/g, '')
        .replace(/[^0-9.]/g, '');
      const amountCents = Math.round(parseFloat(priceStr) * 100);

      if (!Number.isFinite(amountCents) || amountCents < 50) {
        setError('Invalid total. Please check passengers and try again.');
        return;
      }

      const res = await api.post('/payments/create-intent', {
        amountCents,                 // ← send integer cents
        currency: 'usd',
        metadata: {
          flightId: payload.flightId,
          email: payload.email,
          passengers: String(payload.passengers)
        }
      });

      if (!res.data?.clientSecret) throw new Error('Missing clientSecret');

      setPaymentData({
        clientSecret: res.data.clientSecret,
        paymentIntentId: res.data.paymentIntentId,
        amountCents
      });

      closeBooking(); // close BookingModal → PaymentModal opens
    } catch (e) {
      console.error('create-intent failed:', e?.response?.data || e.message);
      setError(e?.response?.data?.error || e.message || 'Unable to start payment. Please try again.');
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
      // Optionally show toast & refresh seats
    } catch (e) {
      console.error(e);
      // Payment captured; handle finalize error gracefully
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
          onConfirm={confirmBooking}   // → creates PaymentIntent, then opens PaymentModal
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
          onSuccess={handlePaymentSuccess}
          // Nice UX label on the button:
          confirmLabel={`Confirm Payment — $${(paymentData.amountCents / 100).toFixed(2)}`}
        />
      )}
    </>
  );
}