import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination } from '@mui/material';

const CustomTable = ({ data, onAction, currentPage, totalPages, onPageChange,onAccept}) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Header</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>TargetAmount</TableCell>
            <TableCell>Current Amount</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow key={row.idCampaign}>
              <TableCell>{row.campaignName}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>{row.targetAmount}</TableCell>
              <TableCell>{row.currentAmmout}</TableCell>
              <TableCell>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '8px' }}>
  <Button variant="contained" color="primary" onClick={() => onAccept(row.idCampaign)}>
    Accept
  </Button>
  <Button variant="contained" color="primary" onClick={() => onAction(row.idCampaign)}>
    Detail
  </Button>
</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={totalPages}                 // Tổng số trang
        page={currentPage + 1}             // Material-UI Pagination bắt đầu từ 1
        onChange={(event, page) => onPageChange(page - 1)}  // Chuyển về index từ 0
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </TableContainer>
  );
};

export default CustomTable;
