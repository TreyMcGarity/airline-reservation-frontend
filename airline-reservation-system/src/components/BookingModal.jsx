import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const Row = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;

const Field = styled.div`
  display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 0.9rem;
  label { font-size: 0.9rem; color: #cfcfcf; }
  input, select, textarea {
    background: #202020; color: #e9e9e9;
    border: 1px solid #3d3d3d; border-radius: 8px;
    padding: 0.65rem 0.75rem; font-size: 0.95rem;
  }
`;

const Actions = styled.div`
  display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 0.5rem;
`;

// NOTE: use transient prop "$variant" so it isn't forwarded to the DOM
const Button = styled.button`
  appearance: none; border: 0; border-radius: 10px;
  padding: 0.7rem 1rem; font-weight: 600; cursor: pointer;
  background: ${p => p.$variant === 'ghost' ? 'transparent' : 'linear-gradient(180deg,#00c4ce,#009aa2)'};
  color: ${p => p.$variant === 'ghost' ? '#ddd' : '#0e0e0e'};
  border: ${p => p.$variant === 'ghost' ? '1px solid #4a4a4a' : '0'};
  opacity: ${p => p.disabled ? 0.6 : 1};
`;

const Error = styled.p`
  color: #ff8d8d; font-size: 0.85rem; margin: 0.25rem 0 0;
`;

export default function BookingModal({ flight, onClose, onConfirm, submitting }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    passengers: 1, cabin: 'Economy', notes: ''
  });
  const [errors, setErrors] = useState({});

  const seatsAvailable = useMemo(
    () => Number(flight?.seat_availability ?? 0),
    [flight]
  );

  const priceNum = Number.parseFloat(flight?.price ?? 0) || 0;
  const total = useMemo(
    () => (priceNum * Number(form.passengers || 1)).toFixed(2),
    [priceNum, form.passengers]
  );

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = 'Required';
    if (!form.lastName.trim()) next.lastName = 'Required';
    if (!/\S+@\S+\.\S+/.test(form.email)) next.email = 'Valid email required';
    const p = Number(form.passengers);
    if (p < 1) next.passengers = 'Must be at least 1';
    if (p > seatsAvailable) next.passengers = `Only ${seatsAvailable} seats left`;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    // Call parent; parent will create PaymentIntent and open PaymentModal
    onConfirm?.({
      flightId: flight.id,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      passengers: Number(form.passengers),
      cabin: form.cabin,
      notes: form.notes.trim(),
      unitPrice: priceNum,
      totalPrice: Number(total),
    });
  };

  return (
    <Modal title={`Book Flight ${flight?.flight_number}`} onClose={onClose}>
      <Row>
        <Field>
          <label>From</label>
          <input value={flight?.origin || ''} readOnly />
        </Field>
        <Field>
          <label>To</label>
          <input value={flight?.destination || ''} readOnly />
        </Field>
      </Row>

      <Row>
        <Field>
          <label>Departure</label>
          <input value={new Date(flight?.departure_time).toLocaleString()} readOnly />
        </Field>
        <Field>
          <label>Seats Available</label>
          <input value={seatsAvailable} readOnly />
        </Field>
      </Row>

      <Row>
        <Field>
          <label>First Name</label>
          <input value={form.firstName} onChange={update('firstName')} />
          {errors.firstName && <Error>{errors.firstName}</Error>}
        </Field>
        <Field>
          <label>Last Name</label>
          <input value={form.lastName} onChange={update('lastName')} />
          {errors.lastName && <Error>{errors.lastName}</Error>}
        </Field>
      </Row>

      <Row>
        <Field>
          <label>Email</label>
          <input type="email" value={form.email} onChange={update('email')} />
          {errors.email && <Error>{errors.email}</Error>}
        </Field>
        <Field>
          <label>Passengers</label>
          <select value={form.passengers} onChange={update('passengers')}>
            {Array.from({ length: Math.max(seatsAvailable, 1) }, (_, i) => i + 1).map(n =>
              <option key={n} value={n}>{n}</option>
            )}
          </select>
          {errors.passengers && <Error>{errors.passengers}</Error>}
        </Field>
      </Row>

      <Row>
        <Field>
          <label>Cabin</label>
          <select value={form.cabin} onChange={update('cabin')}>
            <option>Economy</option>
            <option>Premium Economy</option>
            <option>Business</option>
            <option>First</option>
          </select>
        </Field>
        <Field>
          <label>Notes (optional)</label>
          <input value={form.notes} onChange={update('notes')} placeholder="Seat prefs, assistance, etc." />
        </Field>
      </Row>

      <Field>
        <label>Total</label>
        <input value={`$${total}`} readOnly />
      </Field>

      <Actions>
        <Button $variant="ghost" onClick={onClose} disabled={submitting}>Cancel</Button>
        <Button onClick={submit} disabled={submitting || seatsAvailable < 1}>
          {submitting ? 'Preparing…' : 'Pay & Continue'}
        </Button>
      </Actions>
    </Modal>
  );
}
