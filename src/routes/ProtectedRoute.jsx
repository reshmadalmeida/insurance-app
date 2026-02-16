// import { useContext } from "react";
// import { AuthContext } from "./AuthContext";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({children}) {
//     const { user } = useContext(AuthContext);
//     return user ? children : <Navigate to="/login" />
// }

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute() {
  const { token } = useAuth();
  const location = useLocation();
  if (!token) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}