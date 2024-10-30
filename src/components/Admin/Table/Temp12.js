import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel,
  TablePagination, Paper
} from '@mui/material';

// Dữ liệu mẫu cho bảng
const initialData = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Sam Green', age: 40 },
  { id: 4, name: 'Alice Brown', age: 35 },
  { id: 5, name: 'Bob White', age: 28 },
  // ... thêm dữ liệu mẫu nếu cần
];

export default function Temp() {
  const [data, setData] = useState(initialData);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Hàm sắp xếp dữ liệu
  const handleSort = (property) => {
    const isAscending = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);

    const sortedData = [...data].sort((a, b) => {
      if (a[property] < b[property]) return isAscending ? 1 : -1;
      if (a[property] > b[property]) return isAscending ? -1 : 1;
      return 0;
    });
    setData(sortedData);
  };

  // Hàm chuyển trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Hàm thay đổi số hàng trên mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Chọn hàng để hiển thị dựa trên trang hiện tại và số hàng trên mỗi trang
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? orderDirection : 'asc'}
                  onClick={() => handleSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? orderDirection : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'age'}
                  direction={orderBy === 'age' ? orderDirection : 'asc'}
                  onClick={() => handleSort('age')}
                >
                  Age
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Paper>
  );
}
