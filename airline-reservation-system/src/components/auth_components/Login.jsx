import React from 'react';
import styled from 'styled-components';

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

const Login = () => {
  return (
    <LoginContainer>
      <LoginBox>
        <LoginHeading>Login</LoginHeading>
        <form>
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <SubmitButton type="submit">Sign In</SubmitButton>
        </form>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
