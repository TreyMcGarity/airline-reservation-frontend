// frontend/src/pages/Flights.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import FlightGrid from '../components/FlightGrid';
import FlightCard from '../components/FlightCard';

const Flights = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const res = await api.get('/flights');
      setFlights(res.data);
    };
    fetchFlights();
  }, []);

  return (
    <div>
      <h2>Available Flights</h2>
      <FlightGrid>
        {flights.map(flight => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </FlightGrid>
    </div>
  );
};

export default Flights;
