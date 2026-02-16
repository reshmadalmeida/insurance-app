import { Toolbar, Typography, Box, Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export default function TopBar() {
  const { user, logout } = useAuth();
  return (
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>Insurance Portal</Typography>
      {user && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2">{user.username} • {user.role}</Typography>
          <Button color="secondary" onClick={logout}>Logout</Button>
        </Box>
      )}
    </Toolbar>
  );
}