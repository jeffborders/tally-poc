import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const DiscrepancyTable: React.FC<{
  invoiceId: Invoice['id'];
  discrepancies: Discrepency[];
}> = ({ 
  invoiceId,
  discrepancies 
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {discrepancies.map((row, idx) => (
            <TableRow
              key={`${invoiceId}-row-${idx}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography color="error" fontWeight="bold" variant="body2">{row.type}</Typography>
              </TableCell>
              <TableCell align="right">{row.detail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
  )
}

export default DiscrepancyTable;