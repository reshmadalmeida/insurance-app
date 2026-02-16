import { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import api from '../../services/apiClient';

const COLORS = ['#1e88e5', '#43a047', '#fb8c00', '#8e24aa'];

export default function Dashboard() {
  const [exposureByLOB, setExposure] = useState([]);
  const [split, setSplit] = useState([]);
  const [claimsRatio, setClaimsRatio] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [lob, rs, cr] = await Promise.all([
          api.get('/metrics/exposure').then(r => r.data),
          api.get('/metrics/reinsurer-split').then(r => r.data),
          api.get('/metrics/claims-ratio').then(r => r.data)
        ]);
        setExposure(lob); setSplit(rs); setClaimsRatio(cr?.value);
      } catch {
        // fallback mock if backend not ready
        setExposure([{ lob:'HEALTH', exposure:120 },{ lob:'MOTOR', exposure:80 },{ lob:'LIFE', exposure:50 },{ lob:'PROPERTY', exposure:60 }]);
        setSplit([{ name:'Retained', value:55 },{ name:'Reinsurer A', value:25 },{ name:'Reinsurer B', value:20 }]);
        setClaimsRatio(0.42);
      }
    })();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2, height: 360 }}>
          <Typography variant="subtitle1" gutterBottom>Total Exposure by LOB</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={exposureByLOB}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="lob" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="exposure" fill="#1e88e5" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, height: 360 }}>
          <Typography variant="subtitle1" gutterBottom>Reinsurer Split</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={split} dataKey="value" nameKey="name" label>
                {split.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1">Claims Ratio</Typography>
          <Typography variant="h4">{claimsRatio != null ? (claimsRatio * 100).toFixed(1) + '%' : '—'}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}