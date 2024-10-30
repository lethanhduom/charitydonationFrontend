import React, {useEffect, useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom"
import { MenuItem } from '@mui/material';
 import "../UserInfor/UserForm.css"
import listRole from '../../../Service/RoleService';

 const UserAccount=()=>{
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [password, setPassword] = useState('')
    const[getrole,setrole]=useState('')
    const[gender,setgender]=useState('')
    const [roles,setRole]=useState([]);

    const navigate=useNavigate();
  // Gọi lại dữ liệu từ localStorage
const commonInfor = JSON.parse(localStorage.getItem("commonInfor"));
console.log(commonInfor);
 
    useEffect(()=>{
        listRole().then((respone)=>
        {
            setRole(respone.data);
        }).catch(error=>console.error(error));
        
    },[])
    function handleSubmit(event) {
       
        event.preventDefault();
        // const history = useHistory();
        console.log(firstName, lastName, email, dateOfBirth, password,gender,getrole) ;

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
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Class"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                <TextField
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="Acadamy Start Year"
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
                    label="Acadamy End Year"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                <TextField
                       type='number'
                        label="Id Student"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onChange={e=>setgender(e.target.value)}
                        required
                        sx={{ mb: 4 }}>
    
               
                </TextField>
                <TextField
                    type="text"
                    variant='outlined'
                    label="Address"
                    color='secondary'
                    onChange={e => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                </Stack>
              
              
                <Button variant="outlined" color="secondary" type="submit">Next Step</Button>
            </form>
            </div>
           
     
        </div>
    )
 }
 export default UserAccount