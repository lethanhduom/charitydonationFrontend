import React, {useEffect, useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { json, Link, Navigate, NavLink, useNavigate } from "react-router-dom"
import { MenuItem } from '@mui/material';
 import "../UserInfor/UserForm.css"
import listRole from '../../../Service/RoleService';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { getFaculty } from '../../../Service/FacultyService';
const EmployeeAccount=()=>{
    const [Faculty, setFaculty] = useState([])
    const [IdEmployee, setIdEmployee] = useState('')
    const [Address, setAddress] = useState('')
    const [getvalueFaculty,setvalueFaculty]=useState()
     
    const navigate=useNavigate();
   
    useEffect(()=>{
        getFaculty().then((res)=>{
            setFaculty(res.data);
        })
    },[Faculty])


    function handleSubmit(event) {
       
        event.preventDefault();
        const employeeInfor=(getvalueFaculty,Address,IdEmployee);
        localStorage.setItem("employeeInfor", JSON.stringify(employeeInfor));
        console.log(getvalueFaculty,Address,IdEmployee) ;
       navigate("add")
       
    }
 
    return (
       
        <div>
        
            <h2>Add User Form</h2>
            <div className='add-form-container'>
            <form  onSubmit={handleSubmit} action={<Link to="/" />}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>

                  <TextField
      
                        select
                       label="Faculty"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                       onChange={e=>setvalueFaculty(e.target.value)}
                    
                        required
                        sx={{ mb: 4 }}>
                 {
                  Faculty.map((faculty)=>(
                    <MenuItem  value={faculty.idFaculty}>{faculty.nameFaculty}</MenuItem>
                ))
                 }
                {/* <MenuItem  value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem> */}
                </TextField>
                 
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