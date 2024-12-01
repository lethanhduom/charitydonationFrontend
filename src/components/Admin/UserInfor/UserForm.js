import React, {useEffect, useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom"
import { MenuItem } from '@mui/material';
 import "../UserInfor/UserForm.css"
 import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import listRole from '../../../Service/RoleService';
import { act } from 'react';
const UserForm = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [phoneNumber, setPassword] = useState('')
    const[getrole,setrole]=useState('')
    const[gender,setgender]=useState('')
    const [roles,setRole]=useState([]);
  
    const navigate=useNavigate();
  
    useEffect(()=>{
        listRole().then((respone)=>
        {
            setRole(respone.data);
        }).catch(error=>console.error(error));
        
    },[])
    function handleSubmit(event) {
       
        event.preventDefault();
        // const history = useHistory();
    
        const commonForm={firstName,lastName,email,dateOfBirth,gender,getrole,phoneNumber};
        localStorage.setItem("commonInfor",JSON.stringify(commonForm));
        getrole===3?navigate("user"):navigate("employee");
      

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
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="Phone Number"
                    onChange={e => setPassword(e.target.value)}
                    value={phoneNumber}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                <TextField
                        select
                        label="Gender"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onChange={e=>setgender(e.target.value)}
                        required
                        sx={{ mb: 4 }}>
    
                <MenuItem  value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                </TextField>
                <TextField
                    type="date"
                    variant='outlined'
                    color='secondary'
                    onChange={e => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                </Stack>
              
                <TextField
                        select
                        label="Role"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        required
                        onChange={e=>setrole(e.target.value)}
                        sx={{ mb: 4 }}>
                 {roles.map((role)=>(
                    <MenuItem  value={role.idRole}>{role.roleName}</MenuItem>
                 ))}
                {/* <MenuItem  value="option1"></MenuItem>
                <MenuItem value="option2"></MenuItem> */}
                </TextField>
                <Button  variant="outlined" color="secondary" type="submit">Next <ArrowForwardOutlinedIcon/></Button>
            </form>
            </div>
           
     
        </div>
    )
}
 
export default UserForm;
