import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import { saveAuth } from '../../utils/auth';

const RegisterContainer = styled.div`
  background-color: #1e1e1e;
  color: #e0e0e0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const RegisterBox = styled.div`
  background-color: #2a2a2a;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  width: 100%;
  max-width: 500px;
`;

const RegisterHeading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #00adb5;
  text-align: center;
`;

const InputGroup = styled.div`
  display: flex; gap: 1rem; flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1; min-width: 48%;
  padding: 0.75rem; margin: 0.75rem 0;
  border: none; border-radius: 6px;
  background-color: #1e1e1e; color: #e0e0e0;
  box-shadow: inset 0 0 4px rgba(0, 173, 181, 0.5);
  &:focus { outline: none; box-shadow: 0 0 0 2px #00adb5; }
`;

const FullWidthInput = styled(Input)` min-width: 100%; `;

const SubmitButton = styled.button`
  width: 100%; padding: 0.75rem;
  background-color: #00adb5; color: #ffffff;
  border: none; border-radius: 6px; font-weight: 600;
  margin-top: 1.5rem; cursor: pointer; transition: background-color 0.3s;
  &:hover { background-color: #00cbd1; }
`;

const Registration = () => {
  const { role: roleParam } = useParams();
  const role = (roleParam || 'customer').toLowerCase();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await api.post(`/auth/${role}/register`, {
        first_name, last_name, phone, email, password
      });
      const token = res.data?.token;
      const roleFromServer = res.data?.user?.role || role;
      if (!token) throw new Error('Missing token from server');

      saveAuth({ token, role: roleFromServer });
      api.defaults.headers.common.Authorization = `${token}`;

      navigate(roleFromServer === 'agent' ? '/agent/dashboard' : '/dashboard', { replace: true });
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      alert('Registration failed: ' + (err.response?.data?.error || 'Unexpected error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterBox>
        <RegisterHeading>{role === 'agent' ? 'Create Agent Account' : 'Create Customer Account'}</RegisterHeading>
        <form onSubmit={handleRegister}>
          <InputGroup>
            <Input type="text" placeholder="First Name" value={first_name} onChange={(e)=>setFirstName(e.target.value)} required />
            <Input type="text" placeholder="Last Name" value={last_name} onChange={(e)=>setLastName(e.target.value)} required />
          </InputGroup>
          <FullWidthInput type="tel" placeholder="Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
          <FullWidthInput type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <FullWidthInput type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <SubmitButton type="submit" disabled={submitting}>{submitting ? 'Creating…' : 'Register'}</SubmitButton>
        </form>
      </RegisterBox>
    </RegisterContainer>
  );
};

export default Registration;
