import { usePermissions } from '../hooks/usePermissions';
export default function RoleRoute({ allowed, children }) {
  const { can } = usePermissions();
  if (!can(allowed)) return <div>Access Denied</div>;
  return children;
}