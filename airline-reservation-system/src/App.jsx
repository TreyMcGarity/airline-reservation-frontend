// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import Flights from './pages/Flights';
import AddFlight from './pages/AddFlight';

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
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/flights">View Flights</StyledLink>
      <StyledLink to="/add-flight">Add Flight</StyledLink>
    </Nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flights" element={<Flights />} />
      <Route path="/add-flight" element={<AddFlight />} />
    </Routes>
  </Router>
);


export default App;
