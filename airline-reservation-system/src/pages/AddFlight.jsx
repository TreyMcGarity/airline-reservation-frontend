import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: #1e1e1e;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  margin: 3rem auto;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  color: #00cfd1;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  background-color: #1e1e1e;
  border: 2px solid #00cfd1;
  border-radius: 6px;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: #888;
  }

  &:focus {
    outline: none;
    border-color: #00f0ff;
  }
`;

const Button = styled.button`
  background-color: #00cfd1;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #00a5a7;
  }
`;

const AddFlight = () => {
  const [form, setForm] = useState({ origin: '', destination: '', price: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/flights', form);
      navigate('/flights');
    } catch (error) {
      console.error('Error adding flight:', error);
    }
  };

  return (
  <PageWrapper>
    <FormContainer>
      <Title>Add Flight</Title>
      <StyledForm onSubmit={handleSubmit}>
        <Input name="origin" placeholder="Origin" onChange={handleChange} required />
        <Input name="destination" placeholder="Destination" onChange={handleChange} required />
        <Input name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <Button type="submit">Add Flight</Button>
      </StyledForm>
    </FormContainer>
  </PageWrapper>
  );
};

export default AddFlight;
