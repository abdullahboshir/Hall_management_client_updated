'use client';

import {
  Typography,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useGetSingleUserQuery } from '@/redux/api/userApi';
import Spinner from '@/components/Shared/Spinner/Spinner';



const statusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'paid':
      return 'success';
    case 'pending':
      return 'warning';
    case 'failed':
      return 'error';
    default:
      return 'default';
  }
};

const PaymentHistoryPage = () => {
     const { data, isLoading } = useGetSingleUserQuery({});

    if (isLoading || !data) {
        <Spinner />;
    }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Payment History
      </Typography>

      <Paper elevation={3} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Fee (৳)</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.admissionHistory &&
              <TableRow >
                <TableCell>Dining of Nazrul Hall</TableCell>
                <TableCell>{data?.admissionHistory.amount}</TableCell>
                <TableCell>
                  <Chip label={data?.admissionHistory.paymentStatus === true? 'Successes' : 'Failed'} color={statusColor(data?.admissionHistory.paymentStatus === true? 'paid' : 'failed')} />
               
                </TableCell>
                <TableCell>{data?.admissionHistory?.paymentMethod?.toUpperCase()}</TableCell>
                <TableCell>{new Date(data?.admissionHistory.date).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" aria-label="view">
                  Invoice  <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default PaymentHistoryPage;
