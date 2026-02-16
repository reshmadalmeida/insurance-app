import { createContext, useMemo, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = async ({ username }) => {
    // Replace with real API call:
    // const { data } = await api.post('/auth/login', { username, password });
    // setToken(data.accessToken); setUser(data.user);

    // Temporary mock:
    const mock = { accessToken: 'demo-token', user: { id: 'u1', username, role: 'UNDERWRITER' } };
    setToken(mock.accessToken); setUser(mock.user);
    localStorage.setItem('token', mock.accessToken);
    localStorage.setItem('user', JSON.stringify(mock.user));
    return true;
  };

  const logout = () => {
    setToken(null); setUser(null);
    localStorage.removeItem('token'); localStorage.removeItem('user');
  };

  const value = useMemo(() => ({ token, user, login, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}