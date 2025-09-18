import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import { saveAuth } from '../../utils/auth';

const AUTH_TOKEN_KEY = 'authToken';

const LoginContainer = styled.div`
  background-color: #1e1e1e;
  color: #e0e0e0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const LoginBox = styled.div`
  background-color: #2a2a2a;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  width: 100%;
  max-width: 400px;
`;

const LoginHeading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #00adb5;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.75rem 0;
  border: none;
  border-radius: 6px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  box-shadow: inset 0 0 4px rgba(0, 173, 181, 0.5);
  &:focus { outline: none; box-shadow: 0 0 0 2px #00adb5; }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #00adb5;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover { background-color: #00cbd1; }
`;

const Login = () => {
  const { role: roleParam } = useParams();
  const role = (roleParam || 'customer').toLowerCase(); // default to customer
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await api.post(`/auth/${role}/login`, { email, password });
      const token = res.data?.token;
      const roleFromServer = res.data?.role || role;
      if (!token) throw new Error('Missing token from server');

      saveAuth({ token, role: roleFromServer });
      localStorage.setItem(AUTH_TOKEN_KEY, token); // keep legacy in sync
      api.defaults.headers.common.Authorization = `${token}`;

      navigate(roleFromServer === 'agent' ? '/agent/dashboard' : '/dashboard', { replace: true });
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert('Login failed: ' + (err.response?.data?.error || 'Unexpected error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <LoginHeading>{role === 'agent' ? 'Agent Login' : 'Customer Login'}</LoginHeading>
        <form onSubmit={handleLogin}>
          <Input type="email" placeholder="Email" value={email}
                 onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password}
                 onChange={(e) => setPassword(e.target.value)} required />
          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? 'Signing In…' : 'Sign In'}
          </SubmitButton>
        </form>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
