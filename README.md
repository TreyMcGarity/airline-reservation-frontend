Airline Reservation System (Frontend)

A React-based frontend for a simple airline booking experience. It includes authentication (login/register), a customer dashboard, flight search, booking, and Stripe-powered payments. It connects to a Node/Express backend API here:
Backend repo: https://github.com/TreyMcGarity/airline-reservation-backend

Features

Auth: Login & Register (JWT stored in localStorage)

Flight Search: Filter by origin, destination, date, and max price

Booking Flow: Booking modal → payment modal (Stripe Elements)

Payments: Create Payment Intent via backend, confirm card payment in the UI

Customer Dashboard: Quick access after login

Dark UI: Built with styled-components

Routing: react-router-dom (HashRouter for GitHub Pages compatibility)





The frontend expects the backend to provide routes like:

POST /api/auth/login – returns { token }

POST /api/auth/register

GET /api/flights – returns flights list

POST /api/bookings – create a booking after successful payment

POST /api/payments/create-intent – returns { clientSecret, paymentIntentId } for Stripe
