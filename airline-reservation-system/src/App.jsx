import React, { useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import SplashPage from './pages/SplashPage';
import Home from './pages/Home';
import Flights from './components/flights/Flights';
import AddFlight from './components/flights/AddFlight';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CustomerDashboard from './components/CustomerDashboard';
import api from './api/api';
import Logo from './utils/airline-res-logo.png';

const AUTH_TOKEN_KEY = 'authToken';

const Nav = styled.nav`
  background-color: #0a0a0aff;
  height: 100px;  // increase height
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const LogoImage = styled.img`
  height: 80px;       // make this match Nav height minus some padding
  width: auto;
  margin-right: 1rem;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 100%;
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

const App = () => {
  // Read token consistently; fall back to legacy key if present
  const token = useMemo(
    () => localStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem('token'),
    []
  );
  const isLoggedIn = !!token;

  // Attach token to axios on app load
  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <Router>
      <Nav>
        <LogoContainer>
          <LogoImage src={Logo} alt="Logo" />
        </LogoContainer>

        <NavLinks>
          <StyledLink to="/support">Support</StyledLink>
          <StyledLink to="/home">Home</StyledLink>
          <StyledLink to="/flights">Find Flights</StyledLink>
          {isLoggedIn ? (
            <StyledLink to="/dashboard">Dashboard</StyledLink>
          ) : (
            <StyledLink to="/login">Login</StyledLink>
          )}
        </NavLinks>
      </Nav>

      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/add-flight" element={<AddFlight />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/support" element={<div>Support Page Coming Soon</div>} />
      </Routes>
    </Router>
  );
};

export default App;