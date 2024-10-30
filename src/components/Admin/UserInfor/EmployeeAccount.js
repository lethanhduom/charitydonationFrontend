import React, {useEffect, useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom"
import { MenuItem } from '@mui/material';
 import "../UserInfor/UserForm.css"
import listRole from '../../../Service/RoleService';

const EmployeeAccount=()=>{
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [password, setPassword] = useState('')
    const[getrole,setrole]=useState('')
    const[gender,setgender]=useState('')
    const [roles,setRole]=useState([]);
  
    const navigate=useNavigate();
        // useEffect(()=>{
    //     CollectUser.then((respone)=>{
    //          setcollect(respone.data);
    //     }).catch(error=>console.error(error))
    // })

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
                 
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                <TextField
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="ID Employee"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
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
                        onChange={e=>setgender(e.target.value)}
                        required
                        sx={{ mb: 4 }}>
    
              
                </TextField>
                
                </Stack>
              
              
                <Button variant="outlined" color="secondary" type="submit">Next Step</Button>
            </form>
            </div>
           
     
        </div>
    )
}
export default EmployeeAccount