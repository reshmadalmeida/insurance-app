import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoute';
import RoleRoute from './RoleRoute';
import AppShell from '../layout/AppShell';
import LoginPage from '../features/auth/LoginPage';
import Dashboard from '../features/auth/Dashboard';
import CreatePolicyWizard from '../features/policy/CreatePolicyWizard/CreatePolicyWizard';
import PoliciesList from '../features/policy/PolicyList';
import { ROLES } from '../app/constants';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/policies" element={<PoliciesList />} />
          <Route
            path="/policies/new"
            element={
              <RoleRoute allowed={ROLES}>
                <CreatePolicyWizard />
              </RoleRoute>
            }
          />
        </Route>
      </Route>
      <Route path ="*" element={<AccessDenied/>}/>
      {/* <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
    </Routes>
  );
}
