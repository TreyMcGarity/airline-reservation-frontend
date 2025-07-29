import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SplashWrapper = styled.div`
  background-color: #111;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
  text-align: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  background-color: #00d1d1;
  color: #000;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #00baba;
  }
`;

const SplashPage = () => {
  return (
    <SplashWrapper>
      <Title>Airline Reservation System</Title>
      <Subtitle>Book, manage, and track flights with ease</Subtitle>
      <NavLinks>
        <StyledLink to="/home">Home</StyledLink>
        <StyledLink to="/login">Login</StyledLink>
        <StyledLink to="/register">Register</StyledLink>
      </NavLinks>
    </SplashWrapper>
  );
};

export default SplashPage;
