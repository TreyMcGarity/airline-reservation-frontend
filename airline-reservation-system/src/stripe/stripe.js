// src/stripe/stripe.js
import { loadStripe } from '@stripe/stripe-js';

// Pull from environment. Avoid direct `import.meta` usage because
// that syntax can cause a runtime SyntaxError when served as a
// non-module script (CRA builds/dev server). Prefer CRA env var,
// then a global injected value if your deploy sets one.
const getPublishableKey = () => {
  // CRA / react-scripts
  const craKey =
    typeof process !== 'undefined' &&
    process.env &&
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

  // Some deployments (or Vite builds) may inject a global at runtime.
  // Check `window.__VITE_STRIPE_PUBLISHABLE_KEY` as a safe fallback.
  const globalKey = typeof window !== 'undefined' && window.__VITE_STRIPE_PUBLISHABLE_KEY;

  return craKey || globalKey || null;
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
