import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../api/api';
import CancellationWidget from './CancellationWidget';

const Box = styled.div`
  background: #2b2b2b;
  padding: 1rem;
  border-radius: 8px;
  color: #e6e6e6;
`;

const Filters = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const Input = styled.input`
  padding: 0.45rem;
  border-radius: 6px;
  border: 1px solid #444;
  background: #1f1f1f;
  color: #fff;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid #3a3a3a;
  font-size: 0.9rem;
  color: #dcdcdc;
`;

const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid #2f2f2f;
  font-size: 0.9rem;
`;

const ReservationList = () => {
  const [bookings, setBookings] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings');
      setBookings(res.data || []);
    } catch (e) {
      console.error('Failed to load bookings', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const filtered = bookings.filter(b => {
    const ql = q.trim().toLowerCase();
    if (status && b.status !== status) return false;
    if (!ql) return true;
    return (
      (b.first_name || '').toLowerCase().includes(ql) ||
      (b.last_name || '').toLowerCase().includes(ql) ||
      (b.flight_number || '').toLowerCase().includes(ql) ||
      (b.origin || '').toLowerCase().includes(ql) ||
      (b.destination || '').toLowerCase().includes(ql)
    );
  });

  const onCancelDone = () => {
    setSelected(null);
    fetchBookings();
  };

  return (
    <Box>
      <h2>Reservations</h2>
      <Filters>
        <Input placeholder="Search name / flight / route" value={q} onChange={e => setQ(e.target.value)} />
        <Input as="select" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">pending</option>
          <option value="Paid">Paid</option>
          <option value="cancelled">cancelled</option>
        </Input>
      </Filters>

      {loading ? <p>Loading...</p> : (
        <Table>
          <thead>
            <tr>
              <Th>Booking ID</Th>
              <Th>Customer</Th>
              <Th>Flight</Th>
              <Th>Route</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id || b.booking_id}>
                <Td>{b.id || b.booking_id}</Td>
                <Td>{(b.first_name || '') + ' ' + (b.last_name || '')}</Td>
                <Td>{b.flight_number || b.flight_id}</Td>
                <Td>{(b.origin || '') + ' → ' + (b.destination || '')}</Td>
                <Td>{b.status}</Td>
                <Td>
                  <button onClick={() => setSelected(b)}>Manage</button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {selected && (
        <CancellationWidget booking={selected} onDone={onCancelDone} onClose={() => setSelected(null)} />
      )}
    </Box>
  );
};

export default ReservationList;
