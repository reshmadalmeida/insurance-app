import { Outlet, Link, useLocation } from 'react-router-dom';
import { AppBar, Box, CssBaseline, Drawer, Toolbar, List, ListItemButton, ListItemText } from '@mui/material';
import TopBar from './TopBar';

const drawerWidth = 240;

const nav = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Policies', to: '/policies' },
  { label: 'New Policy', to: '/policies/new' }
];

export default function AppShell() {
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <TopBar />
      </AppBar>

      <Drawer variant="permanent" sx={{ width: drawerWidth, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' } }}>
        <Toolbar />
        <List>
          {nav.map((n) => (
            <ListItemButton key={n.to} component={Link} to={n.to} selected={pathname === n.to}>
              <ListItemText primary={n.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}