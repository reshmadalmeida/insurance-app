import { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = async ({ email,password}) => {
    // Replace with real API call:
    const { data } = await api.post('/auth/login', { email,password });
     setToken(data.accessToken); setUser(data.user);

    // Temporary mock:
    // const mock = { accessToken: 'demo-token', user: { id: 'u1', email, role: 'UNDERWRITER' } };
    // setToken(mock.accessToken); setUser(mock.user);
    localStorage.setItem('token', mock.accessToken);
    localStorage.setItem('user', JSON.stringify(mock.user));
    return true;
  };

  const logout = () => {
    setToken(null); setUser(null);
    localStorage.clear()
  };

  const value = useMemo(() => ({ token, user, login, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
