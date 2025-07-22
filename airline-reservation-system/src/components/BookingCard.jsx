import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #333;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.4);
`;

const BookingCard = ({ booking }) => {
  return (
    <Card>
      <h3>{booking.flight_name}</h3>
      <p>Departure: {booking.departure_time}</p>
      <p>Arrival: {booking.arrival_time}</p>
      <p>Seat: {booking.seat_number}</p>
    </Card>
  );
};

export default BookingCard;
