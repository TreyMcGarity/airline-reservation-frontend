import React, { useEffect, useState } from 'react';
import FlightCard from './FlightCard';
import FlightSearchForm from '../flights/FlightSearchForm';
import BookingModal from '../BookingModal';
import api from '../../api/api';

export default function FlightsList({ flights: flightsProp }) {
  // Always start with []
  const [flights, setFlights] = useState(Array.isArray(flightsProp) ? flightsProp : []);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    maxPrice: ''
  });
  const [activeFlight, setActiveFlight] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(!flightsProp);
  const [error, setError] = useState(null);

   useEffect(() => {
    const fetchFlights = async () => {
      const res = await api.get('/flights');
      setFlights(res.data);
      setFilteredFlights(res.data);
    };
    fetchFlights();
  }, []);


  const filterFlights = () => {
    const filtered = flights.filter(flight => {
      const matchOrigin =
        filters.origin === '' || flight.origin.toLowerCase().includes(filters.origin.toLowerCase());
      const matchDestination =
        filters.destination === '' || flight.destination.toLowerCase().includes(filters.destination.toLowerCase());
      const matchDate =
        filters.departureDate === '' || flight.departure_time.startsWith(filters.departureDate);
      const matchPrice =
        filters.maxPrice === '' || parseFloat(flight.price) <= parseFloat(filters.maxPrice);
      return matchOrigin && matchDestination && matchDate && matchPrice;
    });
    setFilteredFlights(filtered);
  };

  useEffect(() => {
    if (flightsProp) return; // parent provided data
    (async () => {
      try {
        setLoading(true);
        const res = await api.get('/flights');
        // normalize common shapes
        const list =
          Array.isArray(res.data) ? res.data :
          Array.isArray(res.data?.flights) ? res.data.flights :
          [];
        setFlights(list);
      } catch (e) {
        setError('Failed to load flights');
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [flightsProp]);

  const handleBookClick = (flight) => setActiveFlight(flight);
  const close = () => setActiveFlight(null);

  const confirmBooking = async (payload) => {
    try {
      setSubmitting(true);
      await api.post('/bookings', payload);
      close();
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading flights…</p>;
  if (error) return <p>{error}</p>;
  if (!flights.length) return <p>No flights found.</p>;

  return (
    <>
      <FlightSearchForm filters={filters} setFilters={setFilters} onSearch={filterFlights} />

      <div style={{display:'grid', gap:'1rem', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))'}}>
        {flights.map(f => (
          <FlightCard key={f.id ?? `${f.flight_number}-${f.departure_time}`} flight={f} onBook={handleBookClick} />
        ))}
      </div>

      {activeFlight && (
        <BookingModal
          flight={activeFlight}
          onClose={close}
          onConfirm={confirmBooking}
          submitting={submitting}
        />
      )}
    </>
  );
}
