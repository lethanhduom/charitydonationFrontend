import React, {useEffect, useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom"
import { MenuItem } from '@mui/material';
 import "../UserInfor/UserForm.css"
import listRole from '../../../Service/RoleService';
const InforAccount=()=>{
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
       navigate("/account")
        //  history.pushState("/account");
        //  props.setUserCollect(
        //     {
        //         ...props.userCollect||{},
        //         idNumber:firstName
        //     }
        //  )
        //  console.log(props.userCollect.idNumber);
        //  console.log(props.userCollect);
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
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
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
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
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
                    onChange={e => setEmail(e.target.value)}
                    value={email}
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