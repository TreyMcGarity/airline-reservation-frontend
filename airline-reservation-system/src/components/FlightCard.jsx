// frontend/src/components/FlightCard.jsx
import React from 'react';

const FlightCard = ({ flight }) => (
  <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px' }}>
    <h3>{flight.origin} &rarr; {flight.destination}</h3>
    <p>Price: ${flight.price}</p>
  </div>
);

export default FlightCard;
