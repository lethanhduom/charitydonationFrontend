import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IconButton, MenuItem, TableSortLabel, TextareaAutosize, TextField } from "@mui/material";
import Row from 'react-bootstrap/Row';
import { getCampaignPage, getLengthCampaign } from '../../../Service/Campaign';
import swal from 'sweetalert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal1 from '@mui/material/Modal';
import { getSpecialized } from '../../../Service/SpecializedService';
import { getSpecializedById } from '../../../Service/SpecializedService';
import { getFaculty } from '../../../Service/FacultyService';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Paper
  } from '@mui/material';
  import { getDetailCampaign } from '../../../Service/Campaign';
  import { NavLink } from "react-router-dom";
  import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import BasicBreadcrumbs from '../breadcrumbs/Breadcrumbs';
import { getImage } from '../../../Service/Campaign';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { jwtDecode } from "jwt-decode";
import { getEmployeeByIdAccount } from '../../../Service/EmployeeService';
import { getAccountByUserName } from '../../../Service/AccountService';
import { changeStatusDetail } from '../../../Service/Campaign';
import axios from 'axios';
import dayjs from 'dayjs';
const CampaignTable=()=>{
  //**Modal ****** */
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const[openDateSelect,setOpenDateSelect]=useState(false);
  const handleOpen = () => {
    setOpen(true);

  }
  const handleClose = () => setOpen(false);
  

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(true);

  }
  const handleCloseUpdate = () => setOpenUpdate(false);
  
  
  //**Close Modal */
    const [orderDirection, setOrderDirection] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [campaign,setCampaign]=useState([]);
    const [totalPage,setTotalPage]=useState();
    const [length,setLenth]=useState();
    const[campaignName,setCampaignName]=useState('');
    const[campaignContent,setCampaignContent]=useState("");
    const[targetAmount,setTargetAmount]=useState('');
    const[endDateExpect,setEndDateExpect]=useState('');
    const[studentName,setStudentName]=useState('');
    const [studentNumber,setStudentNumber]=useState('');
    const [faculty,setFaculty]=useState();
    const [specialized,setSpecialized]=useState('');
    const [classStudent,setClassStudent]=useState('');
    const [startYear,setStartYear]=useState('');
    const [endYear,setEndYear]=useState('');
    const [listspecialized,setListSpecialized]=useState([])
   const [listfaculty,setListFaculty]=useState([])
   const [detailCampaign,setDetailCampaign]=useState([])
   const [detailRecipient,setDetailRecipient]=useState([])
   const [detailFaculty,setDetailFaculty]=useState([])
   const [detailSpecialized,setDetailSpecialized]=useState([])
   const [detailImageCampaign,setDetailImageCampaign]=useState([])
   const [accountPresent,setAccountPresent]=useState([])
   const [employeePresent,setEmployeePresent]=useState([])
   const[idCampaignAccept,setIdCampaignAccept]=useState();
   const [dateAccept,setDateAccept]=useState();
   const startDate = dayjs().format('YYYY/MM/DD');
    // useEffect(()=>{

    //   getSpecialized().then(response=>{
    //     setListSpecialized(response.data)
    //     console.log(response.data)
    //   }).catch(error=>console.error(error))
    // },[])
    useEffect(()=>{
      getFaculty().then(response=>{
        setListFaculty(response.data)
        console.log(response.data
          
        )
      }).catch(error=>console.error(error))
    },[])
 

    // Hàm chuyển trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Hàm thay đổi số hàng trên mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(()=>{
    getCampaignPage(page,rowsPerPage).then(response=>{
        setCampaign(response.data.content);
        setTotalPage(response.data.totalPages);
        setLenth(response.data.totalElements)
    }).catch(error=>console.error(error));
},[page,rowsPerPage])


  // useEffect(()=>{
  //   getLengthCampaign().then(response=>{
  //       setLenth(response.data);
  //   }).catch(error=>console.error(error))
  // },[])
  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };
  const handleDeny=async(idCampaign)=>{
    alert(idCampaign)
    const token=sessionStorage.getItem("token");
    if (token){
      const willCreate = await swal({
        title: "Are you sure?",
        text: "Do you want to Accept this Campaign?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if(willCreate){  
      try {
        const decodedToken = jwtDecode(token);
       const response=await getAccountByUserName(decodedToken.sub);
       setAccountPresent(response.data);
       if(response.data){
        const res=await getEmployeeByIdAccount(response.data.idAccount);
        setEmployeePresent(res.data);
        if(res.data){
          const FormUpdate=new FormData();
          FormUpdate.append("status",2);
          FormUpdate.append("idEmployee",res.data.idEmployee);
          FormUpdate.append("id",idCampaign);
          const resUpdate=await axios.post("http://localhost:8081/api/campaign/changestatus",FormUpdate,{
            headers:{
               "Authorization":`Bearer ${token}`
            }
          })
         if(resUpdate){
          swal("Good job!", "This Campaign has been dinied!", "success");
         }
        }
      

       }

      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }
  }
  const handleAcceptFirst=(id)=>{
    setOpenDateSelect(true);
    setDetailImageCampaign(id);

  }
  const handleAccept= async(idCampaign)=>{
    alert(idCampaign)
    const token=sessionStorage.getItem("token");
    if (token){
      const willCreate = await swal({
        title: "Are you sure?",
        text: "Do you want to Accept this Campaign?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if(willCreate){  
      try {
        const decodedToken = jwtDecode(token);
       const response=await getAccountByUserName(decodedToken.sub);
       setAccountPresent(response.data);
       if(response.data){
        const res=await getEmployeeByIdAccount(response.data.idAccount);
        setEmployeePresent(res.data);
        if(res.data){
          const FormUpdate=new FormData();
          FormUpdate.append("status",1);
          FormUpdate.append("idEmployee",res.data.idEmployee);
          FormUpdate.append("id",idCampaign);
          FormUpdate.append("startDate",startDate)
          const resUpdate=await axios.post("http://localhost:8081/api/campaign/changestatus",FormUpdate,{
            headers:{
               "Authorization":`Bearer ${token}`
            }
          })
          if(resUpdate){
            swal("Good job!", "This Campaign has been approved!", "success");
          }
        }
      

       }

      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }

  }
  const HandleSelectFaculty=(id)=>{
    setFaculty(id);
    getSpecializedById(id).then((response)=>{
      alert(id);
      setListSpecialized(response.data);
    },[id])
  }
  const [files, setFiles] = useState([]);
  const HandleDetail=(id)=>{

   getDetailCampaign(id).then((response)=>{
    setDetailCampaign(response.data);
    
    setDetailFaculty(response.data.recipientDto.facultyDto);
    setDetailSpecialized(response.data.recipientDto.specializedDto);
    setDetailRecipient(response.data.recipientDto);
    alert(detailRecipient.acadamyEndYear)
    console.log(response.data);
    
   
   }).catch((error) => {
    console.error("Error fetching campaign data:", error);
  },[id])

  getImage(id).then((res)=>{
     setDetailImageCampaign(res.data);
  
  })
  setOpenUpdate(true);
  }
  
  const HandleCreateCampaign=()=>{
    // let campaign={
    //   "campaignName":"Campaign 2",
    //   "content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod feugiat dolor sit amet malesuada. Aenean sit amet fermentum magna. Maecenas vitae tellus vitae felis lobortis ultrices. Vestibulum tincidunt aliquam metus vitae consequat. Duis rutrum vehicula odio eget feugiat. Suspendisse varius suscipit erat, sit amet consequat eros rhoncus at. Nulla pretium, risus eu lobortis consectetur, ipsum mauris lacinia eros, sed rhoncus orci lorem a orci. Praesent posuere risus erat, at pellentesque nulla molestie id. Vivamus tempus dolor vitae ligula condimentum, sit amet sagittis nulla eleifend. Praesent iaculis, diam at bibendum ultricies, lectus erat aliquam quam, sit amet blandit augue orci a nulla. Fusce quis finibus diam, nec blandit lacus.",
    //   "targetAmount":20000000,
    //   "currentAmmout":1000000,
    //   "startDate":"2024-09-08",
    //   "endDateExpect":"2024-12-12",
    //   "status":0

    // }
    const form=new FormData();
    form.append("campaignName",campaignName);
    form.append("content",campaignContent);
    form.append("targetAmount",parseFloat(targetAmount));
    form.append("currentAmount",parseFloat(0.00));
    form.append("faculty",parseInt(faculty));
    form.append("specialized",parseInt(specialized));
    form.append("fullName",studentName);
    form.append("classRecipient",classStudent);
    form.append("endYear",endYear);
    form.append("startYear",startYear);
   form.append("numberStudent",studentNumber);
    form.append("endDateExpect",endDateExpect);
    form.append("status",0);

    for(let i=0;i<files.length;i++){
      form.append("files",files[i]);
    }
    swal({
      title: "Are you sure?",
      text: "Do you want to create the new Campaign?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willCreate) => {
      if (willCreate) {
        axios.post("http://localhost:8081/api/campaign/create",form).then((response)=>{
          swal("Campaign has been created", {
            icon: "success",
          });
        })
       
      } else {
        swal("You don't want to create the new campaign !");
      }
    });
    

    for (let [key, value] of form.entries()) {
      console.log("files:", value);
    }
    
  }
    
   return(
    <div className="container">

    {/* Modal */}
    {/* {true&&( */}
      <Modal1
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // maxHeight="700px"
        centered
      >
        <Box 
        // sx={style
        sx={{
          
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800, // Điều chỉnh kích thước ở đây
            bgcolor: "background.paper",
            boxShadow: 24,
          maxHeight:"500px",
          overflowY:"auto",
            p: 4,
            borderRadius: "8px",
          }}
        // }
        >
        
          <Row>

        <Col xs={12} md={12}>
           
        Campaign Name
            <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                       onChange={e=>setCampaignName(e.target.value)}
                        fullWidth
                        required
                    />
          </Col>
        </Row>
        <Row>

        <Col xs={12} md={12}>
           
        Content
            <TextareaAutosize
             minRows={3} // Số dòng tối thiểu
             maxRows={3} 
             style={{
          width: "100%", // Chiều rộng
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
                        type="text"
                        variant='outlined'
                        color='secondary'
                       onChange={e=>setCampaignContent(e.target.value)}
                        fullWidth
                        required
                    />
          </Col>
        
          
        </Row>
         
      <Row>
        <Col xs={12} md={6}>
        Target Money
          <TextField
            type="number"
                        variant='outlined'
                        color='secondary'
                        onChange={e=>setTargetAmount(e.target.value)}
                        fullWidth
                        required
          />
        </Col>
        <Col xs={12} md={6}>
        End Date Expect
          <TextField
            type="date"
                        variant='outlined'
                        color='secondary'
                       onChange={e=>setEndDateExpect(e.target.value)}
                        fullWidth
                        required
          />
        </Col>
      </Row>
       
      <Row>
        <Col xs={12} md={6}>
        Student Name
          <TextField
            type="text"
                        variant='outlined'
                        color='secondary'
                       onChange={e=>setStudentName(e.target.value)}
                        fullWidth
                        required
          />
        </Col>
        <Col xs={12} md={6}>
        Student Number
          <TextField
            type="numbers"
                        variant='outlined'
                        color='secondary'
                       onChange={e=>setStudentNumber(e.target.value)}
                        fullWidth
                        required
          />
        </Col>
      </Row>

       <Row>
       <Col xs={12} md={6}>
        Faculty
       <TextField
      
                        select
                      
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onChange={e=>HandleSelectFaculty(e.target.value)}
                    
                        required
                        sx={{ mb: 4 }}>
                 {
                  listfaculty.map((faculty)=>(
                    <MenuItem  value={faculty.idFaculty}>{faculty.nameFaculty}</MenuItem>
                ))
                 }
                {/* <MenuItem  value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem> */}
                </TextField>
           </Col>
           <Col xs={12} md={6}>
        Specialized
       <TextField
      
                        select
                      
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onChange={e=>setSpecialized(e.target.value)}
                        required
                        sx={{ mb: 4 }}>
             {
              listspecialized.map((spec)=>(
                <MenuItem  value={spec.idSpecialized}>{spec.nameSpecialized}</MenuItem>
              ))
             }
                {/* <MenuItem  value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem> */}
                </TextField>
           </Col>
           <Row>
          <Col xs={12} md={4}>
            Class
            <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                       onChange={e=>setClassStudent(e.target.value)}
                        fullWidth
                        required
                    />

                
          </Col>
          <Col xs={12} md={4}>
          Start Year
          <TextField
                        type="number"
                        variant='outlined'
                        color='secondary'
                         onChange={e=>setStartYear(e.target.value)}
                        fullWidth
                        required
                    />
          </Col>
          <Col xs={12} md={4}>
          End Year
          <TextField
                        type="number"
                        variant='outlined'
                        color='secondary'
                        onChange={e=>setEndYear(e.target.value)}
                        fullWidth
                        required
                    />
          </Col>
        </Row>
           <Row>
           Select Image
           <Col xs={12} md={12}>
         
           <input required type="file" multiple onChange={handleFileChange}  />
           </Col>
          
           </Row>
       </Row>
       <Row   className="d-flex justify-content-end align-items-center">
       <Col xs="auto">
       <button onClick={handleClose} type="button" className="btn btn-outline-success">Close</button>
       
       </Col>
       <Col xs="auto">
       
       <button onClick={HandleCreateCampaign} type="submit" className="btn btn-outline-warning">Create</button>
       </Col>
       </Row>
      
      
        </Box>
       
      </Modal1>
    {/* )} */}

  
      {/* endModal */}

      {/* open Modal detail */}
      {openUpdate&&
      <Modal1
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // maxHeight="700px"
        centered
      >
        <Box 
        // sx={style
        sx={{
          
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800, // Điều chỉnh kích thước ở đây
            bgcolor: "background.paper",
            boxShadow: 24,
          maxHeight:"500px",
          overflowY:"auto",
            p: 4,
            borderRadius: "8px",
          }}
        // }
        >
        
          <Row>

        <Col xs={12} md={12}>
           
        Campaign Name
            <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                       onChange={e=>setDetailCampaign(preData=>({
                        ...preData,
                        campaignName:e.target.value
                       }))}
                        fullWidth
                        value={detailCampaign.campaignName}
                        required
                    />
          </Col>
        </Row>
        <Row>

        <Col xs={12} md={12}>
           
        Content
            <TextareaAutosize
             minRows={3} // Số dòng tối thiểu
             maxRows={3} 
             style={{
          width: "100%", // Chiều rộng
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
                        type="text"
                        variant='outlined'
                        color='secondary'
                       onChange={e=>setDetailCampaign(preData=>({
                        ...preData,
                        content:e.target.value
                       }))}
                        fullWidth
                        value={detailCampaign.content}
                        required
                    />
          </Col>
        
          
        </Row>
         
      <Row>
        <Col xs={12} md={6}>
        Target Money
          <TextField
            type="number"
                        variant='outlined'
                        color='secondary'
                        onChange={e=>setDetailCampaign(preData=>({
                          ...preData,
                          targetAmount:e.target.value
                        }))}
                        fullWidth
                        value={detailCampaign.targetAmount }
                        required
          />
        </Col>
        <Col xs={12} md={6}>
        End Date Expect
          <TextField
            type="date"
                        variant='outlined'
                        color='secondary'
                       onChange={e=>setDetailCampaign(preData=>({
                        ...preData,
                        endDateExpect:e.target.value
                       }))}
                        fullWidth
                        value={detailCampaign.endDateExpect}
                        required
          />
        </Col>
      </Row>
       
      <Row>
        <Col xs={12} md={6}>
        Student Name
          <TextField
            type="text"
                        variant='outlined'
                        color='secondary'
                       onChange={e=>setDetailRecipient(preData=>({
                        ...preData,
                        fullName:e.target.value
                       }))}
                        fullWidth
                        value={detailRecipient.fullName}
                        required
          />
        </Col>
        <Col xs={12} md={6}>
        Student Number
          <TextField
            type="numbers"
                        variant='outlined'
                        color='secondary'
                       onChange={e=>setDetailRecipient(preData=>({
                        ...preData,
                        numberStudent:e.target.value
                       }))}
                       value={detailRecipient.numberStudent}
                        fullWidth
                        required
          />
        </Col>
      </Row>

       <Row>
       {/* <Col xs={12} md={6}>
        Faculty
       <TextField
      
                        select
                      
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onChange={e=>HandleSelectFaculty(e.target.value)}
                        value={detailCampaign.recipientDto.facultyDto.idFaculty}
                      
                        required
                        sx={{ mb: 4 }}>
                 {
                  listfaculty.map((faculty)=>(
                    <MenuItem  value={faculty.idFaculty}>{faculty.nameFaculty}</MenuItem>
                ))
                 }
                
                </TextField>
           </Col>
           <Col xs={12} md={6}>
        Specialized
       <TextField
      
                        select
                      
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onChange={e=>setSpecialized(e.target.value)}
                        //  value={1}
                        required
                        sx={{ mb: 4 }}>
             {
              listspecialized.map((spec)=>(
                <MenuItem  value={spec.idSpecialized}>{spec.nameSpecialized}</MenuItem>
              ))
             }
                
                </TextField>
           </Col> */}
           <Row>
          <Col xs={12} md={4}>
            Class
            <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                       onChange={e=>setDetailRecipient(preData=>({
                        ...preData,
                        classRecipient:e.target.value
                       }))}
                       value={detailRecipient.classRecipient}
                        fullWidth
                        required
                    />

                
          </Col>
          <Col xs={12} md={4}>
          Start Year
          <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                         onChange={e=>setDetailRecipient(preData=>({
                          ...preData,
                          acadamyStartYear:e.target.value
                         }))}
                         value={detailRecipient.acadamyStartYear}
                        fullWidth
                        required
                    />
          </Col>
          <Col xs={12} md={4}>
          End Year
          <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        onChange={e=>setDetailRecipient(preData=>({
                          ...preData,
                          acadamyEndYear:e.target.value
                        }))}
                         value={detailRecipient.acadamyEndYear}
                        fullWidth
                        required
                    />
          </Col>
        </Row>
           <Row>
           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {detailImageCampaign.map((image, index) => (
              <Box key={index} sx={{ position: 'relative' }}>
                <img src={image.urlImage} alt={`img-${index}`} width={100} height={100} style={{ objectFit: 'cover' }} />
                <IconButton 
                  // onClick={() => handleDeleteImage(index)} 
                  sx={{ position: 'absolute', top: -10, right: -10, color: 'red' }}
                >
                  <ClearOutlinedIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
           Select Image
           <Col xs={12} md={12}>
         
           <input required type="file" multiple onChange={handleFileChange}  />
           </Col>
          
           </Row>
       </Row>
       <Row   className="d-flex justify-content-end align-items-center">
       <Col xs="auto">
       <button onClick={handleClose} type="button" className="btn btn-outline-success">Close</button>
       
       </Col>
       <Col xs="auto">
       
       <button onClick={HandleCreateCampaign} type="submit" className="btn btn-outline-warning">Create</button>
       </Col>
       </Row>
      
      
        </Box>
       
      </Modal1>
      }
      {/* close Modal detail */}
      {/* Modal Select date */}
     {openDateSelect&& <Modal1
  open={true}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <Row>
          <Col xs={12} md={12}>
            Select Expire Date
            <TextField
                        type="date"
                        variant='outlined'
                        color='secondary'
                        onChange={e=>setDateAccept(e.target.value)}
                        fullWidth
                        required
                    />

                
          </Col>
          </Row>
          <Row   className="d-flex justify-content-end align-items-center">
       <Col xs="auto">
       <button type="button" className="btn btn-outline-success">Close</button>
       
       </Col>
       <Col xs="auto">
       
       <button type="submit" onClick={()=>handleAccept(idCampaignAccept)} className="btn btn-outline-warning">Accept</button>
       </Col>
       </Row>
  </Box>
</Modal1>
     }
      {/* Close Modal Select date */}
     {/* <h3>List Account</h3> */}
     {BasicBreadcrumbs("admin","campaign",)}
     {/* <NavLink to ="create"> */}
     <button  type="button"  onClick={handleOpen} className="btn btn-outline-warning">Add Campaign</button>
     {/* </NavLink> */}
   
       
       <Paper>
        <TableContainer style={{maxHeight:350}}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                     
                    >
                      STT
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      
                    >
                      Campaign Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                     
                    >
                     Campaign Content
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                  Action
                  </TableCell>
                
                  
                
               
                </TableRow>
              </TableHead>
              <TableBody>
              
                {campaign.map((row,index) => (
                  <TableRow key={row.idCampaign}>
                    <TableCell>{(rowsPerPage*page)+index+1}</TableCell>
                    <TableCell>{row.campaignName}</TableCell>
                    <TableCell>{row.content}</TableCell>
                    {/* <TableCell>{row.roleDto.roleName}</TableCell> */}
                    {/* <TableCell>{row.status===0? <Button variant="outlined" color='primary'>Pending</Button>:
                        <button  type="button" className="btn btn-outline-error"></button>}
                        </TableCell> */}
                        <TableCell >
                        <Box display="flex" justifyContent="center" gap={2}>
                          <Button onClick={()=>handleAccept(row.idCampaign)}  variant="outlined">Accept</Button>
                          <Button onClick={()=>handleDeny(row.idCampaign)} variant="outlined" color="error">Deny</Button>
                        </Box>  
                        </TableCell>
                         
                         <TableCell>
                         <Button onClick={()=>HandleDetail(row.idCampaign)}  variant="outlined" >
                                        Detail
                                           </Button>
                         </TableCell>
                    
                  
                 
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={length}
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
export default CampaignTable