import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../api/api';

const Overlay = styled.div`
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Card = styled.div`
  background: #222;
  color: #eee;
  padding: 1rem;
  border-radius: 8px;
  width: 420px;
`;

const Btn = styled.button`
  margin-right: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
`;

const CancellationWidget = ({ booking, onDone = () => {}, onClose = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const doCancel = async () => {
    if (!window.confirm('Confirm cancel booking #' + (booking.id || booking.booking_id))) return;
    setLoading(true);
    setError(null);
    try {
      const id = booking.id || booking.booking_id;
      await api.put(`/bookings/${id}`, { status: 'cancelled' });
      onDone();
    } catch (e) {
      console.error(e);
      setError('Failed to cancel booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Card onClick={e => e.stopPropagation()}>
        <h3>Manage Booking</h3>
        <p><strong>Booking:</strong> {booking.id || booking.booking_id}</p>
        <p><strong>Passenger:</strong> {(booking.first_name || '') + ' ' + (booking.last_name || '')}</p>
        <p><strong>Flight:</strong> {booking.flight_number || booking.flight_id}</p>

        {error && <p style={{ color: 'salmon' }}>{error}</p>}

        <div style={{ marginTop: 12 }}>
          <Btn onClick={doCancel} disabled={loading}>Cancel Booking</Btn>
          <Btn onClick={onClose}>Close</Btn>
        </div>
      </Card>
    </Overlay>
  );
};

export default CancellationWidget;
