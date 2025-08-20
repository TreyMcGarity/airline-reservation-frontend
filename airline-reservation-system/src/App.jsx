import React, { useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import SplashPage from './pages/SplashPage';
import Home from './pages/Home';
import Flights from './components/flights/Flights';
import AddFlight from './components/flights/AddFlight';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CustomerDashboard from './components/CustomerDashboard';
import AgentDashboard from './components/AgentDashboard';
import RequireRole from './components/auth/RequireRole';
import api from './api/api';
import Logo from './utils/airline-res-logo.png';
import { getAuth } from './utils/auth';

const Nav = styled.nav`
  background-color: #0a0a0aff;
  height: 100px;
  padding: 0 2rem;
  display: flex; align-items: center; justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
`;
const LogoContainer = styled.div` display: flex; align-items: center; height: 100%; `;
const LogoImage = styled.img` height: 80px; width: auto; margin-right: 1rem; `;
const NavLinks = styled.div` display: flex; align-items: center; gap: 1.5rem; height: 100%; `;
const StyledLink = styled(Link)`
  color: #e0e0e0; text-decoration: none; font-weight: 500; font-size: 1.1rem; position: relative;
  &:hover { color: #fff; }
  &::after { content: ''; display: block; height: 2px; background: #00adb5; transition: width .3s; width: 0%; position: absolute; bottom: -5px; left: 0; }
  &:hover::after { width: 100%; }
`;

const App = () => {
  const { token, role } = useMemo(() => getAuth(), []);
  const isLoggedIn = !!token;

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  return (
    <Router>
      <Nav>
        <LogoContainer><LogoImage src={Logo} alt="Logo" /></LogoContainer>
        <NavLinks>
          <StyledLink to="/support">Support</StyledLink>
          <StyledLink to="/home">Home</StyledLink>
          <StyledLink to="/flights">Find Flights</StyledLink>
          {isLoggedIn ? (
            <StyledLink to={role === 'agent' ? '/agent/dashboard' : '/dashboard'}>Dashboard</StyledLink>
          ) : (
            <StyledLink to="/login/customer">Login</StyledLink>
          )}
        </NavLinks>
      </Nav>

      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/add-flight" element={<AddFlight />} />

        {/* role-aware auth pages */}
        <Route path="/login/:role" element={<Login />} />
        <Route path="/register/:role" element={<Register />} />

        {/* legacy redirects to customer */}
        <Route path="/login" element={<Navigate to="/login/customer" replace />} />
        <Route path="/register" element={<Navigate to="/register/customer" replace />} />

        {/* dashboards with role guards */}
        <Route
          path="/dashboard"
          element={
            <RequireRole allowed={['customer']}>
              <CustomerDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/agent/dashboard"
          element={
            <RequireRole allowed={['agent']}>
              <AgentDashboard />
            </RequireRole>
          }
        />

        <Route path="/support" element={<div>Support Page Coming Soon</div>} />
      </Routes>
    </Router>
  );
};

export default App;
