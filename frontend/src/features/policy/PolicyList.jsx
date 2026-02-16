import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { policyService } from '../../services/policyService';

export default function PoliciesList() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await policyService.list(q ? { q } : undefined);
        setRows(data.items || data);
      } catch (e) { console.error(e); }
    })();
  }, [q]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Policies</Typography>
        <Button component={Link} to="/policies/new">New Policy</Button>
      </Stack>

      <TextField placeholder="Search by policy number or insured name" value={q} onChange={(e)=>setQ(e.target.value)} />

      {/* <Stack spacing={1}>
        {rows.map((p) => (
          <Card key={p._id}><CardContent>
            <Typography variant="subtitle1">{p.policyNumber} — {p.insuredName}</Typography>
            <Typography variant="body2">LOB: {p.lineOfBusiness} • Status: {p.status} • Sum Insured: ₹{p.sumInsured}</Typography>
          </CardContent></Card>
        ))}
      </Stack> */}
         <table>
        <thead>
          <tr>
            <th>Policy #</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id}>
              <td>{p.policyNumber}</td>
              <td><PolicyStatusBadge status={p.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <DataTable values={rows}/> */}
    </Stack>
  );
}

// import React, { useState } from "react";
// import PolicyStatusBadge from "./PolicyStatusBadge";
// import CreatePolicyWizard from "./CreatePolicyWizard";
// import DataTable from '../../shared/DataTable';

// export default function PolicyList() {
//   const [open, setOpen] = useState(false);
//   const [policies, setPolicies] = useState([]);

//   const addPolicy = (id) => {
//     setPolicies((p) => [
//       ...p,
//       { id, status: "Submitted", policyNumber: "POL-" + id }
//     ]);
//     setOpen(false);
//   };

//   return (
//     <div>
//       <h1>Policies</h1>

//       <button onClick={() => setOpen(true)}>Create Policy</button>

//       {open && <CreatePolicyWizard onCreated={addPolicy} />}

//       <table>
//         <thead>
//           <tr>
//             <th>Policy #</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {policies.map((p) => (
//             <tr key={p.id}>
//               <td>{p.policyNumber}</td>
//               <td><PolicyStatusBadge status={p.status} /></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }