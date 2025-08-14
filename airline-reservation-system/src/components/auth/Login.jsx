import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom'; // ← added useLocation
import api from '../../api/api'; 

const AUTH_TOKEN_KEY = 'authToken'; // keep in sync with App

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

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #00adb5;
  }
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

  &:hover {
    background-color: #00cbd1;
  }
`;

const AuthLinks = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

const AuthText = styled.p`
  margin: 0.5rem 0;
  font-size: 0.95rem;
  color: #cccccc;
`;

const StyledLink = styled(Link)`
  color: #00adb5;
  text-decoration: none;
  margin-left: 0.25rem;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #00cbd1;
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await api.post('/auth/login', { email, password });
      const token = res.data?.token;
      if (!token) throw new Error('Missing token from server');

      // Store under a single, consistent key
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      // (optional) keep legacy key too if other code still uses it
      localStorage.setItem('token', token);

      // Attach to axios for future calls (adjust if your backend expects Bearer)
      api.defaults.headers.common.Authorization = `${token}`;

      // ALWAYS send to dashboard
      navigate('/dashboard', { replace: true });
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
        <LoginHeading>Login</LoginHeading>
        <form onSubmit={handleLogin}>
          <Input type="email" placeholder="Email" value={email}
                 onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password}
                 onChange={(e) => setPassword(e.target.value)} required />
          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? 'Signing In…' : 'Sign In'}
          </SubmitButton>
        </form>
        <AuthLinks>
          <AuthText>Don’t have an account? <StyledLink to="/register">Sign up</StyledLink></AuthText>
          <AuthText><StyledLink to="/email-request">Forgot Password?</StyledLink></AuthText>
        </AuthLinks>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;