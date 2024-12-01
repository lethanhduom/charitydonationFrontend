import React, {useEffect, useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom"
import { MenuItem } from '@mui/material';
 import "../UserInfor/UserForm.css"
 import dayjs from 'dayjs';
 import  {createAccountUser}  from '../../../Service/AccountService';
import listRole from '../../../Service/RoleService';
import swal from 'sweetalert';
const InforAccount=()=>{
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const date = dayjs().format('YYYY/MM/DD');
   const accountCommon=JSON.parse(localStorage.getItem("commonInfor"));
   const userAccount=JSON.parse(localStorage.getItem("userInfor"))
   const employeeAccount=JSON.parse(localStorage.getItem("employeeInfor"));
    const navigate=useNavigate();
   
   
    function handleSubmit(event) {
       
        event.preventDefault();
        let user={};
        let employee={};
       
        swal({
            title: "Are you sure?",
            text: "Create the new account!",
            icon: "warning",
            buttons: [
              'Cancel Create!',
              'Create Account!'
            ],
            dangerMode: true,
          }).then(function(isConfirm) {
            if (isConfirm) {
             
                  if(accountCommon.getrole===3||accountCommon.getrole===4){
            user={
           
                idNumber:userAccount.idStudent,
                faculty:userAccount.Faculty,
                classUser:userAccount.Class,
                acadamyEndYear:userAccount.AcadamyEndYear,
                acadamyStartYear:userAccount.AcadamyStartYear,
                address:userAccount.Address,
                fullName:accountCommon.firstName+" "+accountCommon.lastName,
                email:accountCommon.email,
                dateOfBirth:accountCommon.dateOfBirth,
                phoneNumber:accountCommon.phoneNumber,
                gender:accountCommon.gender,
                accountDto:{
                       userName:username,
                       password:password,
                       createTime:date,
                       isActive:1,
                       roleDto:{
                        idRole:accountCommon.getrole
                       }
                }
    
             
            };
            console.log("USER"+user);
          
            createAccountUser(user).then((response)=>{
                // console.log("fdjk"+ response)
                alert(response.status);
            }).catch(error => {
                console.error('Error:', error.response?.data || error.message);
              });
        }else {
           employee={
          
               fullName:accountCommon.firstName+" "+accountCommon.lastName,
               email:accountCommon.email,
               dateOfBirth:accountCommon.dateOfBirth,
               gender:accountCommon.gender,
               phoneNumber:accountCommon.phoneNumber,
               faculty:employeeAccount.Faculty,
               address:employeeAccount.Address,
               idNumber:employeeAccount.IdEmployee,
               accountDto:{
                userName:username,
                password:password,
                createTime:date,
                isActive:1,
                roleDto:{
                 idRole:accountCommon.getrole
                }
         }
           }
        }
      }
              });
         
         
      
        
        
        
      
      //  navigate("/admin/account")
     
    }
 
    return (
       
        <div>
        
            <h2>Add User Form</h2>
            <div className='add-form-container'>
            <form  onSubmit={handleSubmit} action={<Link to="/" />}>
            <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="User Name"
                        onChange={e => setUserName(e.target.value)}
                        value={username}
                        fullWidth
                        required
                    />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="password"
                        variant='outlined'
                        color='secondary'
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        fullWidth
                        required
                    />
           </Stack>
           <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
              
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Enter Password Again"
                    onChange={e => setRePassword(e.target.value)}
                    value={rePassword}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
              </Stack>
                <Button variant="outlined" color="secondary" type="submit">Create</Button>
            </form>
            </div>
           
     
        </div>
    )
}

export default InforAccount