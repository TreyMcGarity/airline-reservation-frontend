// components/auth/RequireRole.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from '../../utils/auth';

const RequireRole = ({ allowed = [], children }) => {
  const { token, role } = getAuth();
  if (!token) {
    // no token → send to the first allowed role (default to customer)
    const target = allowed[0] || 'customer';
    return <Navigate to={`/login/${target}`} replace />;
  }
  if (allowed.length && !allowed.includes(role)) {
    // wrong role → send to that role’s login
    const target = role === 'agent' ? 'agent' : 'customer';
    return <Navigate to={`/login/${target}`} replace />;
  }
  return children;
};

export default RequireRole;
