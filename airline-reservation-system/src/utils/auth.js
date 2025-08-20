// utils/auth.js
export const AUTH_STORAGE_KEY = 'auth'; // stores { token, role }

export function saveAuth({ token, role }) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, role }));
  // optional legacy keys if other code still reads them:
  localStorage.setItem('authToken', token);
  localStorage.setItem('token', token);
}

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

export function clearAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem('authToken');
  localStorage.removeItem('token');
}
