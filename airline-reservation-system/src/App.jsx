import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import SplashPage from './pages/SplashPage';
import Home from './pages/Home';
import Flights from './pages/Flights';
import AddFlight from './pages/AddFlight';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CustomerDashboard from './components/CustomerDashboard';

const Nav = styled.nav`
  background-color: #121212;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

const StyledLink = styled(Link)`
  color: #e0e0e0;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  position: relative;

  &:hover {
    color: #ffffff;
  }

  &::after {
    content: '';
    display: block;
    height: 2px;
    background: #00adb5;
    transition: width 0.3s;
    width: 0%;
    position: absolute;
    bottom: -5px;
    left: 0;
  }

  &:hover::after {
    width: 100%;
  }
`;

const App = () => (
  <Router>
    <Nav>
      <StyledLink to="/home">Home</StyledLink>
      <StyledLink to="/flights">View Flights</StyledLink>
      <StyledLink to="/add-flight">Add Flight</StyledLink> {/* ← Temporary link */}
      <StyledLink to="/login">Login</StyledLink>
      <StyledLink to="/register">Register</StyledLink>
      <StyledLink to="/dashboard">Dashboard</StyledLink> {/* ← Temporary link */}
    </Nav>
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/flights" element={<Flights />} />
      <Route path="/add-flight" element={<AddFlight />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<CustomerDashboard />} />
    </Routes>
  </Router>
);

export default App;
