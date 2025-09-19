import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SupportWrapper = styled.div`
  background-color: #111;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 1.5rem;
  text-align: center;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  min-height: 120px;
`;

const SubmitButton = styled.button`
  background-color: #00d1d1;
  color: #000;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #00baba;
  }
`;

const BackLink = styled(Link)`
  color: #00d1d1;
  margin-top: 1rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function SupportPage() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dummy support ticket created:', { subject, message });
    setSubmitted(true);
    setSubject('');
    setMessage('');
  };

  return (
    <SupportWrapper>
      <Title>Support</Title>
      <Subtitle>Need help? Submit a ticket below and our agent dashboard will pick it up (dummy event).</Subtitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <TextArea
          placeholder="Describe the issue briefly"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <SubmitButton type="submit">Submit Ticket</SubmitButton>
      </Form>
      {submitted && <p style={{ color: 'lightgreen', marginTop: '1rem' }}>Ticket submitted! (Check console)</p>}
      <BackLink to="/">← Back to Home</BackLink>
    </SupportWrapper>
  );
}
