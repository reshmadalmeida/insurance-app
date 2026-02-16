/* eslint-disable react-hooks/preserve-manual-memoization */
import { createContext, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';

// eslint-disable-next-line react-refresh/only-export-components
export const PermissionContext = createContext(null);

export function PermissionProvider({ children }) {
  const { user } = useAuth();

  const can = (roles) => {
    if (!user) return false;
    return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
  };

  const value = useMemo(() => ({ can }), [user]);
  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}