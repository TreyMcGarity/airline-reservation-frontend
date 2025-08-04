import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: #1e1e1e;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #444;
  background-color: #2a2a2a;
  color: #e0e0e0;
  font-size: 0.95rem;

  &::placeholder {
    color: #888;
  }
`;

const Button = styled.button`
  grid-column: span 2;
  padding: 0.75rem;
  background-color: #00adb5;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #00cbd1;
  }
`;

const FlightSearchForm = ({ filters, setFilters, onSearch }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="origin"
        placeholder="Origin (e.g., JFK)"
        value={filters.origin}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="destination"
        placeholder="Destination (e.g., LAX)"
        value={filters.destination}
        onChange={handleChange}
      />
      <Input
        type="date"
        name="departureDate"
        value={filters.departureDate}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="maxPrice"
        placeholder="Max Price ($)"
        value={filters.maxPrice}
        onChange={handleChange}
      />
      <Button type="submit">Search Flights</Button>
    </Form>
  );
};

export default FlightSearchForm;
