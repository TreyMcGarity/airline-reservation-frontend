import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to the Airline Reservation System</h1>
    <Link to="/flights">View Flights</Link>
  </div>
);

export default Home;