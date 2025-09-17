import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #2c2c2c;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.01);
  }
`;

const FlightTitle = styled.h3`
  color: #00adb5;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  border-bottom: 1px solid #444;
  padding-bottom: 0.25rem;
`;

const InfoRow = styled.p`
  margin: 0.4rem 0;
  font-size: 0.95rem;
  color: #e0e0e0;
`;

const Label = styled.span`
  font-weight: bold;
  color: #bbbbbb;
`;

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const BookingCard = ({ booking }) => {
  return (
    <Card>
      <FlightTitle>{booking.airline || 'Flight'}</FlightTitle>
      <InfoRow><Label>Departure:</Label> {formatDateTime(booking.departure_time)}</InfoRow>
      <InfoRow><Label>Arrival:</Label> {booking.arrival_time} </InfoRow>
      <InfoRow><Label>Seat:</Label> {booking.seat_number || 'N/A'}</InfoRow>
      <p>other things plus a cancellation button</p>
    </Card>
  );
};

export default BookingCard;

