import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const AddFlight = () => {
  const [form, setForm] = useState({ origin: '', destination: '', price: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/flights', form);
      navigate('/flights');  // Redirect to flights page after adding
    } catch (error) {
      console.error('Error adding flight:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="origin" placeholder="Origin" onChange={handleChange} required />
      <input name="destination" placeholder="Destination" onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
      <button type="submit">Add Flight</button>
    </form>
  );
};

export default AddFlight;
