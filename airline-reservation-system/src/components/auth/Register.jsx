import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 48%;
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

const FullWidthInput = styled(Input)`
  min-width: 100%;
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


const Registration = () => {
  return (
    <RegisterContainer>
      <RegisterBox>
        <RegisterHeading>Create Account</RegisterHeading>
        <form>
          <InputGroup>
            <Input type="text" placeholder="First Name" required />
            <Input type="text" placeholder="Last Name" required />
          </InputGroup>
          <FullWidthInput type="tel" placeholder="Phone Number" required />
          <FullWidthInput type="email" placeholder="Email Address" required />
          <FullWidthInput type="password" placeholder="Password" required />
          <SubmitButton type="submit">Register</SubmitButton>
        </form>
        <AuthLinks>
          <AuthText>
            Already have an account?
            <StyledLink to="/login">Login</StyledLink>
          </AuthText>
        </AuthLinks>
      </RegisterBox>
    </RegisterContainer>
  );
};

export default Registration;
