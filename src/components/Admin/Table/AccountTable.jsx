import React , {useEffect,useState} from "react";
import {listAccount} from "../../../Service/AccountService";
import { TableSortLabel } from "@mui/material";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { getEmployee } from "../../../Service/EmployeeService";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { MenuItem } from '@mui/material';
import { TextField  } from '@mui/material';
import { _getUserByIdAccount, _getUserByIdAccountgetUserByIdAccount } from "../../../Service/UserService";
import '../Table/AccountTable.css'
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Paper
  } from '@mui/material';
import { NavLink } from "react-router-dom";
import axios from "axios";

 
const AccountTable= ()=>{
  const [accounts,setAccounts]=useState([])
  const [lenth,setLenth]=useState();
  const [pageCount,setPageCount]=useState();
  const [itemOffset, setItemOffset] = useState(0);
 const[currentPage,setCurrentPage]=useState(0);
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(()=>{
    listAccount(page,rowsPerPage).then((response)=>{
        setAccounts(response.data.content);
        setLenth(response.data.totalElements)
        setPageCount(response.data.totalPages);
        // alert(response.headers);
        // alert(rowsPerPage);

    }).catch(error=>console.error(error))

  },[])
  const token=sessionStorage.getItem("token");
 



  const payload = JSON.parse(atob(token.split(".")[1]));
  // console.log(payload); 
  console.log(sessionStorage.getItem("token"))

  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  //  update account





const [getIdRole,setIdRole]=useState();
const [getUserByIdAccount,setUserByIdAccount]=useState();
const [getEmployeeByIdAccount,setEmployeeByIdAccount]=useState();
  

const [getIdAccount,setIdAccount]=useState('');
const getData=(idAccount,idRole)=>{
  setIdAccount(idAccount);
  setIdRole(idRole);
  // alert(getIdRole);
  if(idRole===3){
    setModalShow(true);
 
  }
 

}
const getAccountData=(idAccount,idRole) =>{
  setIdAccount(idAccount);
  setIdRole(idRole);
  if(idRole===3){
    _getUserByIdAccount(idAccount).then((response)=>{
      setUserByIdAccount(response.data)
      console.log(getUserByIdAccount);
    }).catch(error=>{
      console.error(error);
    },[getIdAccount])
    setModalShow(true);
 
  }
  
   
    }

    

  
   


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
   
    listAccount(newPage,rowsPerPage).then((response)=>{
      setAccounts(response.data.content);
      console.log(response.data.content);
      

  }).catch(error=>console.error(error))
    setPage(newPage);
  };

  // Hàm thay đổi số hàng trên mỗi trang
  const handleChangeRowsPerPage = (event) => {
    
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    alert(event.target.value);
    listAccount(0,event.target.value).then((response)=>{
      setAccounts(response.data.content);
      console.log(response.data.content);
      

  }).catch(error=>console.error(error))
  };
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Chọn hàng để hiển thị dựa trên trang hiện tại và số hàng trên mỗi trang
  // const paginatedData = accounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const [modalShow, setModalShow] = useState(false);

  return (
   

    

   <div className="container">
     <h3>List Account</h3>
     <NavLink class="navButton" to ="create">
     <button  type="button" className="btn btn-outline-warning" id="addButton">Add Account</button>
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
{getUserByIdAccount&&(

<Modal show={modalShow} aria-labelledby="contained-modal-title-vcenter">
    <Modal.Header closeButton onClick={()=>setModalShow(false)}>
      <Modal.Title id="contained-modal-title-vcenter">
       Detail Information
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="grid-example">
      <Container>
        <Row>
          <Col xs={12} md={12}>
          FullName
          <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        value={getUserByIdAccount.fullName}
                        fullWidth
                        onChange={e=>setUserByIdAccount(preData=>({
                          ...preData,
                        fullName:e.target.value
                        }))}
                        required
                    />
          </Col>
       
          </Row>
        <Row>

        <Col xs={12} md={12}>
           
        Id Student Number
            <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        value={getUserByIdAccount.idNumber}
                        onChange={e=>setUserByIdAccount(preData=>({
                          ...preData,
                          idNumber:e.target.value
                        }))}
                        fullWidth
                        required
                    />
          </Col>
        </Row>
         
      
       
       <Row>
       <Col xs={12} md={12}>
    Gender
       <TextField
      
                        select
                      
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        value={getUserByIdAccount.gender}
                        onChange={e=>setUserByIdAccount(preData=>({
                          ...preData,
                          gender:e.target.value
                        }))}
                        required
                        sx={{ mb: 4 }}>
    
                <MenuItem  value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                </TextField>
           </Col>
       </Row>
        <Row>
          <Col xs={8} md={4}>
            Start Year
            <TextField
                        type="number"
                        variant='outlined'
                        color='secondary'
                        value={getUserByIdAccount.acadamyStartYear}
                        onChange={e=>setUserByIdAccount(preData=>({
                          ...preData,
                          acadamyStartYear:e.target.value
                        }))}
                        fullWidth
                        required
                    />

                
          </Col>
       
          <Col xs={8} md={4}>
          End Year
          <TextField
                        type="number"
                        variant='outlined'
                        color='secondary'
                        value={getUserByIdAccount.acadamyEndYear}
                        onChange={e=>setUserByIdAccount(preData=>({
                          ...preData,
                          acadamyEndYear:e.target.value
                        }))}
                        fullWidth
                        required
                    />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            Adress
            <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        value={getUserByIdAccount.address}
                        onChange={e=>setUserByIdAccount(preData=>({
                          ...preData,
                          address:e.target.value
                        }))}
                        fullWidth
                        required
                    />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            date of birth
            <TextField
                        type="date"
                        variant='outlined'
                        color='secondary'
                        value={getUserByIdAccount.dateOfBirth}
                        onChange={e=>setUserByIdAccount(preData=>({
                          ...preData,
                          dateOfBirth:e.target.value
                        }))}
                        fullWidth
                        required
                    />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            Faculty
            <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        value={getUserByIdAccount.faculty}
                        onChange={e=>setUserByIdAccount(preData=>({
                          ...preData,
                          faculty:e.target.value
                        }))}
                        fullWidth
                        required
                    />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            Email
            <TextField
                        type="email"
                        variant='outlined'
                        color='secondary'
                        value={getUserByIdAccount.email}
                        onChange={e=>setUserByIdAccount(preData=>({
                          ...preData,
                          email:e.target.value
                        }))}
                        fullWidth
                        required
                    />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            UserName
            <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        value={getUserByIdAccount.accountDto.userName}
                        
                        fullWidth
                        required
                    />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            Password
            <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        value={getUserByIdAccount.accountDto.password}
                        fullWidth
                        required
                    />
                    {console.log(getUserByIdAccount)}
          </Col>
        </Row>
      </Container>
    </Modal.Body>
    <Modal.Footer>
    <Button >Update</Button>
      <Button onClick={()=>setModalShow(false) }>Close</Button>
    
    </Modal.Footer>
  </Modal>
)}

{/* --------------------------------------- */}
  
     <Paper>
    <TableContainer style={{maxHeight:300}}>
        <Table >
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
                Role
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
          
            {accounts.map((row,index) => (
              <TableRow key={row.idAccount}>
                <TableCell>{(rowsPerPage*page)+index+1}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.createTime}</TableCell>
                <TableCell>{row.roleDto.roleName}</TableCell>
                <TableCell>{row.isActive===1? <AiOutlineCheck/> :<AiOutlineClose/>}</TableCell>
                <TableCell>{ <Button  onClick={() => getAccountData(row.idAccount,row.roleDto.idRole)} variant="outlined">Detail</Button>}</TableCell>
            
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={lenth}
        pageCount={pageCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
     
{/* **************************************** */}



{/* <Button onClick={onBtnClick}>Show modal</Button> */}


    </Paper>
 

   
   </div>
  )
  
}
export default AccountTable