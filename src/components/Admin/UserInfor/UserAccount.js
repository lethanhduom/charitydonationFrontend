import React, {useEffect, useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom"
import { MenuItem } from '@mui/material';
 import "../UserInfor/UserForm.css"
import listRole from '../../../Service/RoleService';
import { getFaculty } from '../../../Service/FacultyService';
import { getSpecializedById } from '../../../Service/SpecializedService';

 const UserAccount=()=>{
    const [AcadamyEndYear, setAcadamyEndYear] = useState('')
    const [AcadamyStartYear, setAcadamyStartYear] = useState('')
    const [Faculty,setFaculty] = useState('')
    const [idStudent, setIdStudent] = useState('')
    const [Class, setClass] = useState('')
    const[Address,setAddress]=useState('')
    const[listFaculty,setListFaculty]=useState([]);
    const [listSpecialized,setListSpecialized]=useState([])
    const [specialized,setSpecialized]=useState()
    const navigate=useNavigate();

  // Gọi lại dữ liệu từ localStorage
const commonInfor = JSON.parse(localStorage.getItem("commonInfor"));
console.log(commonInfor);
  
useEffect(()=>{
    getFaculty().then(response=>{
      setListFaculty(response.data)
      console.log(response.data
        
      )
    }).catch(error=>console.error(error))
  },[])
  
  const HandleSelectFaculty=(id)=>{
    setFaculty(id);
    getSpecializedById(id).then((response)=>{
      alert(id);
      setListSpecialized(response.data);
    },[id])
  }
    function handleSubmit(event) {
       
        event.preventDefault();
        // const history = useHistory();
        console.log(Faculty,specialized, Class, AcadamyEndYear, AcadamyStartYear, idStudent,Address) ;
        const UserInfor={Faculty,specialized, Class,AcadamyEndYear,AcadamyStartYear,idStudent,Address};
        localStorage.setItem("userInfor",JSON.stringify(UserInfor));
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
        onChange={e=>HandleSelectFaculty(e.target.value)}
         required
      sx={{ mb: 4 }}>
        {
        listFaculty.map((faculty)=>(
        <MenuItem  value={faculty.idFaculty}>{faculty.nameFaculty}</MenuItem>
        ))
}

                    </TextField>
                    <TextField
      
      select
      label="Faculty"
      variant="outlined"
      color="secondary"
      fullWidth
      onChange={e=>setSpecialized(e.target.value)}
       required
    sx={{ mb: 4 }}>
      {
      listSpecialized.map((specialized)=>(
      <MenuItem  value={specialized.idSpecialized}>{specialized.nameSpecialized}</MenuItem>
      ))
}

                  </TextField>
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                <TextField
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="Acadamy Start Year"
                    onChange={e => setAcadamyStartYear(e.target.value)}
                    value={AcadamyStartYear}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="Acadamy End Year"
                    onChange={e => setAcadamyEndYear(e.target.value)}
                    value={AcadamyEndYear}
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
                        onChange={e=>setIdStudent(e.target.value)}
                        value={idStudent}
                        required
                        sx={{ mb: 4 }}>
    
               
                </TextField>
                <TextField
                    type="text"
                    variant='outlined'
                    label="Class"
                    color='secondary'
                    onChange={e => setClass(e.target.value)}
                    value={Class}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                </Stack>
                <TextField
                    type="text"
                    variant='outlined'
                    label="Address"
                    color='secondary'
                    onChange={e => setAddress(e.target.value)}
                    value={Address}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
              
              
                <Button variant="outlined" color="secondary" type="submit">Next</Button>
            </form>
            </div>
           
     
        </div>
    )
 }
 export default UserAccount