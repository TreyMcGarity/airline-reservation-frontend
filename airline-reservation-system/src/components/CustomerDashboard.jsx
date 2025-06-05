import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  background-color: #1e1e1e;
  color: #e0e0e0;
  min-height: 100vh;
  padding: 3rem 2rem;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #00adb5;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

const Stat = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0;
`;

const CustomerDashboard = () => {
  // You can pull user info from Redux later if needed
  const userName = 'Traveler'; // Placeholder

  return (
    <DashboardContainer>
      <Heading>Welcome, {userName} ✈️</Heading>

      <Section>
        <h2>Your Stats</h2>
        <Stat>Total Flights Booked: 3</Stat>
        <Stat>Upcoming Trips: 1</Stat>
        <Stat>Frequent Airline: SkyBound</Stat>
      </Section>

      <Section>
        <h2>Quick Actions</h2>
        <ul>
          <li>🔍 View Available Flights</li>
          <li>📄 View Booking History</li>
          <li>⚙️ Manage Profile</li>
        </ul>
      </Section>
    </DashboardContainer>
  );
};

export default CustomerDashboard;
