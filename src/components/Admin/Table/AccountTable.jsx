import React , {useEffect,useState} from "react";
import listAccount from "../../../Service/AccountService";
import { TableSortLabel } from "@mui/material";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import '../Table/AccountTable.css'
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Paper
  } from '@mui/material';
import { NavLink } from "react-router-dom";
 
const AccountTable= ()=>{
  const [accounts,setAccounts]=useState([])

  useEffect(()=>{
    listAccount().then((response)=>{
        setAccounts(response.data);
    }).catch(error=>console.error(error))

  },[])

  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

   // Hàm sắp xếp dữ liệu
   const handleSort = (property) => {
    const isAscending = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
    const sortedData = [...accounts].sort((a, b) => {
        if (a[property] < b[property]) return isAscending ? 1 : -1;
        if (a[property] > b[property]) return isAscending ? -1 : 1;
        return 0;
      });
      setAccounts(sortedData);
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
  const [status,setStatus]=useState(true)
  const handleAddAccount=()=>{
     setStatus(!status)
  }

  // Chọn hàng để hiển thị dựa trên trang hiện tại và số hàng trên mỗi trang
  const paginatedData = accounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (

   <div className="container">
     <h3>List Account</h3>
     <NavLink to ="create">
     <button  type="button" className="btn btn-outline-warning">Add Account</button>
     </NavLink>
   
  
{/* --------------------------------------- */}
{/* <div class="btn-group">
  <button type="button" class="btn btn-outline-Info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
   Add Account
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="acount/create/employee">Add Employee</a></li>
    <li><a class="dropdown-item" href="account/create/user">Add Other User</a></li>
   
    
  </ul>
</div> */}
{/* --------------------------------------- */}
  
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
                  STT
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
                  Create Time
                </TableSortLabel>
              </TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell>
             Detail
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
            {paginatedData.map((row,index) => (
              <TableRow key={row.idAccount}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.createTime}</TableCell>
                <TableCell>{row.isActive===1? <AiOutlineCheck/> :<AiOutlineClose/>}</TableCell>
                <TableCell>{ <Button variant="outlined">Detail</Button>}</TableCell>
            
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={accounts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
     
    </Paper>

   </div>
  )
}
export default AccountTable