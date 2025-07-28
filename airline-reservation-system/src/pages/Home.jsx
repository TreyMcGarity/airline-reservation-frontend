import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  background-color: #1e1e1e;
  color: #e0e0e0;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const SubHeading = styled.h2`
  font-weight: 400;
  color: #cccccc;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #00adb5;
  color: #ffffff;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: #00cbd1;
  }
`;

const FeatureList = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 3rem;
`;

const Feature = styled.div`
  background-color: #2a2a2a;
  padding: 1.5rem;
  border-radius: 10px;
  max-width: 300px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  h3 {
    margin-top: 0;
    color: #00adb5;
  }

  p {
    color: #cccccc;
  }
`;

const Home = () => (
  <HomeContainer>
    <Heading>Welcome to the Airline Reservation System</Heading>
    <SubHeading>Book, manage, and track flights with ease</SubHeading>

    <StyledLink to="/flights">View Available Flights</StyledLink>

    <FeatureList>
      <Feature>
        <h3>Search Flights</h3>
        <p>Find flights across destinations with real-time availability and pricing.</p>
      </Feature>
      <Feature>
        <h3>Manage Bookings</h3>
        <p>Update passenger details, cancel, or reschedule your trips easily.</p>
      </Feature>
      <Feature>
        <h3>24/7 Support</h3>
        <p>Get help anytime from our friendly customer service team.</p>
      </Feature>
    </FeatureList>
  </HomeContainer>
);

export default Home;
