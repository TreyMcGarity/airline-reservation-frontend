import React from 'react';
import styled from 'styled-components';
import CustomerList from '../components/agent/CustomerList';
import ReservationList from '../components/agent/ReservationList';

const Page = styled.div`
  padding: 2rem;
  color: #e0e0e0;
  background: #1e1e1e;
  min-height: 100vh;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 1rem;
`;

const AgentDashboard = () => {
  return (
    <Page>
      <h1 style={{ color: '#00adb5' }}>Agent Dashboard</h1>
      <Columns>
        <CustomerList />
        <ReservationList />
      </Columns>
    </Page>
  );
};

export default AgentDashboard;