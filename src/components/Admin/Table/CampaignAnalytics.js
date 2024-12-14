import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTable from './CustomeCampaignOnGoing';
import { getCampaignPageDeny } from '../../../Service/Campaign';
import { getCampaignPageOngoing } from '../../../Service/Campaign';
import { getCampaignPageSuccess } from '../../../Service/Campaign';
import CustomCampaignDeny from './CustomCampaignDeny';
import CustomCampaignSuccess from './CustomCampaignSuccess';
import { jwtDecode } from 'jwt-decode';
import { getAccountByUserName } from '../../../Service/AccountService';
import { getEmployeeByIdAccount } from '../../../Service/EmployeeService';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import axios from 'axios';
import Modal1 from '@mui/material/Modal';
import { Col, Row } from 'react-bootstrap';
import { IconButton, TextareaAutosize, TextField } from '@mui/material';
import Modal from './ModalDetailCampaign';
export default function BasicTabs() {
  const styles = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");



  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [value, setValue] = useState(0);
  const endDate = dayjs().format('YYYY/MM/DD');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const[listdeny,setListDeny]=useState([])
  const[listOngoing,setListOngoing]=useState([])
  const [listSuccess,setListSuccess]=useState([])
  const [currentPage, setCurrentPage] = useState(0);  // Trang hiện tại
const [pageSize, setPageSize] = useState(5);  // 
const [totalPages, setTotalPages] = useState(1);
const[open,setOpen]=useState(false);
  // Dữ liệu mẫu cho mỗi bảng
  const handleOngoing=(async)=>{
    getCampaignPageOngoing(currentPage,pageSize).then((res)=>{
        setListOngoing(res.data.content)
        setTotalPages(res.data.totalPages);
      console.log(res.data)
       })
   }

   const handleDeny=(async)=>{
    getCampaignPageDeny(currentPage,pageSize).then((res)=>{
        setListDeny(res.data.content)
        setTotalPages(res.data.totalPages);
      console.log(res.data)
       })
   }

   const handleSUccess=(async)=>{
    getCampaignPageSuccess(currentPage,pageSize).then((res)=>{
        setListSuccess(res.data.content)
        setTotalPages(res.data.totalPages);
      console.log(res.data)
       })
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
    //    setAccountPresent(response.data);
       if(response.data){
        const res=await getEmployeeByIdAccount(response.data.idAccount);
        // setEmployeePresent(res.data);
        if(res.data){
          const FormUpdate=new FormData();
          FormUpdate.append("status",3);
          FormUpdate.append("idEmployee",res.data.idEmployee);
          FormUpdate.append("id",idCampaign);
          FormUpdate.append("endDate",endDate)
          const resUpdate=await axios.post("http://localhost:8081/api/campaign/changestatus/success",FormUpdate,{
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

 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(()=>{
    getCampaignPageOngoing(currentPage,pageSize).then((res)=>{
     setListOngoing(res.data.content)
     setTotalPages(res.data.totalPages);
   console.log(res.data)
    })
   },[currentPage])
  const dataTab3 = [
    { id: 1, name: 'Item 3.1' },
    { id: 2, name: 'Item 3.2' },
  ];

  // Hàm xử lý hành động
  const handleAction = (id) => {
    setModalData(id); // Truyền dữ liệu
    setIsModalOpen(true);
 
  };

  

  return (
     
    <div>
    
  
    
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Campaign On-Going" onClick={()=>handleOngoing()}/>
        <Tab label="Deny Campaign" onClick={()=>handleDeny()} />
        <Tab label="Finished Campaign" onClick={()=>handleSUccess()} />
      </Tabs>
      
      <Box sx={{ p: 2 }}>
        {value === 0 && <CustomTable data={listOngoing} onAction={handleAction} currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange} onAccept={handleAccept} />}

{value === 1 && <CustomCampaignDeny data={listdeny} onAction={handleAction} currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange} />}

{value === 2 && <CustomCampaignSuccess data={listSuccess} onAction={handleAction} currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange} />}
        {/* {value === 1 && <CustomTable data={dataTab2} onAction={handleAction} />}
        {value === 2 && <CustomTable data={dataTab3} onAction={handleAction} />} */}
      </Box>
    </Box>
    
    {/* Hiển thị Modal nếu trạng thái mở */}
    {isModalOpen && <Modal onClose={handleCloseModal} data={modalData}  />}
    </div>
  );
}
