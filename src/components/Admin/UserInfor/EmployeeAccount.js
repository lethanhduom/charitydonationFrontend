import React, {useEffect, useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { json, Link, Navigate, NavLink, useNavigate } from "react-router-dom"
import { MenuItem } from '@mui/material';
 import "../UserInfor/UserForm.css"
import listRole from '../../../Service/RoleService';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
const EmployeeAccount=()=>{
    const [Faculty, setFaculty] = useState('')
    const [IdEmployee, setIdEmployee] = useState('')
    const [Address, setAddress] = useState('')
     
    const navigate=useNavigate();
 


    function handleSubmit(event) {
       
        event.preventDefault();
        const employeeInfor=(Faculty,Address,IdEmployee);
        localStorage.setItem("employeeInfor", JSON.stringify(employeeInfor));
        console.log(Faculty,Address,IdEmployee) ;
       navigate("add")
       
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
                        label="Faculty"
                        onChange={e => setFaculty(e.target.value)}
                        value={Faculty}
                        fullWidth
                        required
                    />
                 
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                <TextField
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="ID Employee"
                    onChange={e => setIdEmployee(e.target.value)}
                    value={IdEmployee}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                <TextField
                        type='text'
                        label="Address"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onChange={e=>setAddress(e.target.value)}
                        value={Address}
                        required
                        sx={{ mb: 4 }}>
    
              
                </TextField>
                
                </Stack>
              
              
                <Button variant="outlined" color="secondary" type="submit">Next <ArrowForwardOutlinedIcon/></Button>
            </form>
            </div>
           
     
        </div>
    )
}
export default EmployeeAccount