import React, { useEffect, useState } from 'react';
import api from '../api/api';
import FlightGrid from '../components/flights/FlightGrid';
import FlightCard from '../components/flights/FlightCard';
import FlightSearchForm from '../components/flights/FlightSearchForm';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: #121212;
  min-height: 100vh;
  padding: 3rem 2rem;
  color: #e0e0e0;
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #00adb5;
  text-align: center;
`;

const NoResults = styled.p`
  color: #999;
  font-size: 1rem;
  margin-top: 2rem;
  text-align: center;
`;

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    maxPrice: ''
  });

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

  return (
    <PageWrapper>
      <Heading>Find Flights</Heading>
      <FlightSearchForm filters={filters} setFilters={setFilters} onSearch={filterFlights} />

      <FlightGrid>
        {filteredFlights.length > 0 ? (
          filteredFlights.map(flight => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        ) : (
          <NoResults>No flights match your search.</NoResults>
        )}
      </FlightGrid>
    </PageWrapper>
  );
};

export default Flights;
