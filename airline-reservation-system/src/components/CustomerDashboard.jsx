import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../api/api';

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
  const [customer, setCustomer] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("⚠️ Please log in first.");
      window.location.href = "login.html";
      return;
    }

    const fetchCustomer = async () => {
      try {
        const res = await api.get('/customers/me', {
          headers: {
            "Authorization": `${token}` // ✅ Add 'Bearer' if your backend expects it
          }
        });
        setCustomer(res.data);
      } catch (err) {
        console.error("Failed to fetch customer data", err);
        alert("Session expired or unauthorized. Please log in again.");
        window.location.href = "login.html";
      }
    };

    fetchCustomer();
  }, [token]);

  if (!customer) {
    return <DashboardContainer>Loading...</DashboardContainer>;
  }

  return (
    <DashboardContainer>
      <Heading>Welcome, {customer.first_name} ✈️</Heading>

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
