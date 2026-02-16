import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  // const from = useLocation().state?.from?.pathname || '/dashboard';
console.log(useLocation().state,"...loc")
  const submit = async (e) => {
    e.preventDefault();
    try { await login(form); 
      navigate('./dashboard')
      }
      // navigate(from, { replace: true }); }
    catch { setErr('Invalid credentials'); }
  };

  return (
    <Box sx={{ display:'grid', placeItems:'center', height:'100dvh' }}>
      <Paper sx={{ p: 4, width: 360 }} component="form" onSubmit={submit}>
        <Typography variant="h6" gutterBottom>Sign in to Insurance Portal</Typography>
        <TextField label="Username" value={form.username} onChange={(e)=>setForm(f=>({ ...f, username: e.target.value }))} margin="dense" fullWidth />
        <TextField label="Password" type="password" value={form.password} onChange={(e)=>setForm(f=>({ ...f, password: e.target.value }))} margin="dense" fullWidth />
        {err && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{err}</Typography>}
        <Button type="submit" fullWidth sx={{ mt: 2 }}>Login</Button>
      </Paper>
    </Box>
  );
}