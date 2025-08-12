// frontend/src/components/FlightCard.jsx
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #3a3a3a; /* lighter gray */
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

const PriceRow = styled.div`
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #00adb5;
`;

const BookButton = styled.button`
  appearance: none;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.06s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  background: linear-gradient(180deg, #00c4ce, #009aa2);
  color: #0e0e0e;
  box-shadow: 0 6px 14px rgba(0, 173, 181, 0.25);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(0, 173, 181, 0.35);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 6px 14px rgba(0, 173, 181, 0.25);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    transform: none;
    box-shadow: none;
  }
`;

const FlightCard = ({ flight, onBook }) => {
  const seats = Number(flight.seat_availability ?? 0);
  const canBook = seats > 0;

  return (
    <Card>
      <Image
        src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=60"
        alt={`${flight.airline} airplane`}
      />
      <Route>{flight.origin} → {flight.destination}</Route>

      <InfoRow><span>Airline:</span> {flight.airline} ({flight.flight_number})</InfoRow>
      <InfoRow><span>Departure:</span> {new Date(flight.departure_time).toLocaleString()}</InfoRow>
      <InfoRow><span>Arrival:</span> {new Date(flight.arrival_time).toLocaleString?.() || flight.arrival_time}</InfoRow>
      <InfoRow><span>Duration:</span> {flight.duration} mins</InfoRow>
      <InfoRow><span>Passengers:</span> {flight.passenger_count}</InfoRow>
      <InfoRow><span>Seats Available:</span> {seats}</InfoRow>

      <PriceRow>
        <Price>${parseFloat(flight.price).toFixed(2)}</Price>
        <BookButton
          disabled={!canBook}
          onClick={() => canBook && onBook?.(flight)}
          aria-label={`Book flight ${flight.flight_number}`}
          title={canBook ? 'Book this flight' : 'No seats available'}
        >
          {canBook ? 'Book' : 'Sold Out'}
        </BookButton>
      </PriceRow>
    </Card>
  );
};

export default FlightCard;
