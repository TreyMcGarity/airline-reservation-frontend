import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../stripe/stripe';

const Form = styled.div` display: grid; gap: 0.9rem; `;
const Row = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;
const Field = styled.div`
  display: flex; flex-direction: column; gap: 0.4rem;
  label { font-size: 0.9rem; color: #cfcfcf; }
  input {
    background: #202020; color: #e9e9e9; border: 1px solid #3d3d3d;
    border-radius: 8px; padding: 0.65rem 0.75rem; font-size: 0.95rem;
  }
`;
const CardBox = styled.div`
  background: #202020; border: 1px solid #3d3d3d; border-radius: 8px; padding: 0.75rem;
  .StripeElement { font-size: 16px; }
`;
const Actions = styled.div` display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 0.5rem; `;

// NOTE: transient prop
const Button = styled.button`
  appearance: none; border: 0; border-radius: 10px; padding: 0.7rem 1rem; font-weight: 600; cursor: pointer;
  background: ${p => p.$variant === 'ghost' ? 'transparent' : 'linear-gradient(180deg,#00c4ce,#009aa2)'};
  color: ${p => p.$variant === 'ghost' ? '#ddd' : '#0e0e0e'};
  border: ${p => p.$variant === 'ghost' ? '1px solid #4a4a4a' : '0'};
  opacity: ${p => p.disabled ? 0.6 : 1};
`;

const ErrorMsg = styled.p` color: #ff8d8d; font-size: 0.9rem; margin: 0; `;
const Note = styled.p` color: #bdbdbd; font-size: 0.85rem; margin: 0.25rem 0 0; `;

function InnerPaymentModal({
  clientSecret,
  amountCents,
  defaultEmail,
  defaultName,
  onClose,
  onSuccess,
  confirmLabel
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState(defaultName || '');
  const [email, setEmail] = useState(defaultEmail || '');
  const [processing, setProcessing] = useState(false);
  const [err, setErr] = useState('');

  const amountDisplay = useMemo(
    () => `$${((amountCents || 0) / 100).toFixed(2)}`,
    [amountCents]
  );

  const validate = () => {
    if (!name.trim()) return 'Name is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Valid email required';
    return '';
  };

  const pay = async () => {
    setErr('');
    const v = validate();
    if (v) { setErr(v); return; }
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) { setErr('Card element not ready'); return; }

    setProcessing(true);
    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: { name: name.trim(), email: email.trim() }
        }
      });

      if (error) {
        setErr(error.message || 'Payment failed. Please try again.');
      } else if (paymentIntent?.status === 'succeeded') {
        onSuccess?.(paymentIntent);
      } else {
        setErr('Payment did not complete. Please try again.');
      }
    } catch (e) {
      console.error(e);
      setErr('Unexpected error. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Modal title={`Pay ${amountDisplay}`} onClose={onClose}>
      <Form>
        <Row>
          <Field>
            <label>Name on Card</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" />
          </Field>
          <Field>
            <label>Email (receipt)</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" />
          </Field>
        </Row>

        <Field>
          <label>Card Details</label>
          <CardBox>
            <CardElement
              options={{
                hidePostalCode: false,
                style: {
                  base: { color: '#e9e9e9', '::placeholder': { color: '#9e9e9e' } },
                  invalid: { color: '#ff8d8d' }
                }
              }}
            />
          </CardBox>
          <Note>Test: 4242 4242 4242 4242 · Any future date · Any CVC · Any ZIP</Note>
        </Field>

        {err && <ErrorMsg>{err}</ErrorMsg>}

        <Actions>
          <Button $variant="ghost" onClick={onClose} disabled={processing}>Cancel</Button>
          <Button onClick={pay} disabled={processing || !stripe || !elements}>
            {processing ? 'Processing…' : (confirmLabel || `Confirm Payment`)}
          </Button>
        </Actions>
      </Form>
    </Modal>
  );
}

export default function PaymentModal(props) {
  const options = { appearance: { theme: 'night' }, clientSecret: props.clientSecret };
  return (
    <Elements stripe={stripePromise} options={options}>
      <InnerPaymentModal {...props} confirmLabel={props.confirmLabel} />
    </Elements>
  );
}