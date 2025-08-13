// src/stripe/stripe.js
import { loadStripe } from '@stripe/stripe-js';

// Pull from Vite OR CRA
const getPublishableKey = () => {
  const viteKey =
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  const craKey =
    typeof process !== 'undefined' &&
    process.env &&
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

  return viteKey || craKey || null;
};

const pk = getPublishableKey();

export const hasStripeKey = !!pk;

if (!pk) {
  // Helpful warning instead of cryptic "match" error
  console.warn(
    'Stripe publishable key is missing. Set VITE_STRIPE_PUBLISHABLE_KEY (Vite) or REACT_APP_STRIPE_PUBLISHABLE_KEY (CRA) and restart the dev server.'
  );
}

// Only call loadStripe when we actually have a key
export const stripePromise = pk ? loadStripe(pk) : null;
