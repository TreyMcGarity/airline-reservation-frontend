import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../api/api';

const Box = styled.div`
  background: #2b2b2b;
  padding: 1rem;
  border-radius: 8px;
  color: #e6e6e6;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
  border-radius: 6px;
  border: 1px solid #444;
  background: #1f1f1f;
  color: #fff;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  padding: 0.6rem 0.5rem;
  border-bottom: 1px solid #393939;
  display: flex;
  justify-content: space-between;
`;

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await api.get('/customers');
        if (mounted) setCustomers(res.data || []);
      } catch (e) {
        setError('Failed to load customers');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
    return () => { mounted = false; };
  }, []);

  const filtered = customers.filter(c => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (c.first_name || '').toLowerCase().includes(q) ||
      (c.last_name || '').toLowerCase().includes(q) ||
      (c.email || '').toLowerCase().includes(q)
    );
  });

  return (
    <Box>
      <h2>Customers</h2>
      <Input placeholder="Search by name or email" value={query} onChange={e => setQuery(e.target.value)} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <List>
        {filtered.map(c => (
          <Item key={c.id}>
            <div>
              <div style={{ fontWeight: 700 }}>{c.first_name} {c.last_name}</div>
              <div style={{ fontSize: 12, color: '#bdbdbd' }}>{c.email}</div>
            </div>
            <div style={{ fontSize: 12, color: '#9f9f9f' }}>ID: {c.id}</div>
          </Item>
        ))}
      </List>
    </Box>
  );
};

export default CustomerList;
