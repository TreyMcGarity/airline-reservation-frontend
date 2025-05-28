// frontend/src/components/FlightCard.jsx
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #3a3a3a; // lighter gray
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Route = styled.h3`
  margin: 0 0 0.5rem;
  color: #ffffff;
`;

const InfoRow = styled.p`
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #cccccc;

  span {
    font-weight: 600;
    color: #ffffff;
  }
`;

const Price = styled.div`
  margin-top: 0.75rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #00adb5;
`;

const FlightCard = ({ flight }) => (
  <Card>
    <Image
      src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=60"
      alt={`${flight.airline} airplane`}
    />
    <Route>{flight.origin} → {flight.destination}</Route>
    <InfoRow><span>Airline:</span> {flight.airline} ({flight.flight_number})</InfoRow>
    <InfoRow><span>Departure:</span> {new Date(flight.departure_time).toLocaleString()}</InfoRow>
    <InfoRow><span>Arrival:</span> {flight.arrival_time}</InfoRow>
    <InfoRow><span>Duration:</span> {flight.duration} mins</InfoRow>
    <InfoRow><span>Passengers:</span> {flight.passenger_count}</InfoRow>
    <InfoRow><span>Seats Available:</span> {flight.seat_availability}</InfoRow>
    <Price>${parseFloat(flight.price).toFixed(2)}</Price>
  </Card>
);

export default FlightCard;
