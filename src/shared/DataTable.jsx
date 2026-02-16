import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DataTable({ values }) {
  const headers = ['Insured Name','Insured Type','Line of Business','Effective From','Effective To','Sum Insured','Premium','Retention Limit']
 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="dynamic data table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} align={index === 0 ? "left" : "right"} sx={{ fontWeight: 'bold' }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          {Object.values(values).map((val, index) => (
      <TableCell key={index}>
        {val}
      </TableCell>
    ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
