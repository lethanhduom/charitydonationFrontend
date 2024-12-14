import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import swal from 'sweetalert';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from './AppTheme';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import ColorModeSelect from './ColorModeSelect';
import { useState } from 'react';
import { getSpecializedById } from '../../../Service/SpecializedService';
import { getFaculty } from '../../../Service/FacultyService';
import { MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import { createAccountUser } from '../../../Service/AccountService';
import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  overflow:"scroll",
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));


const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  const [listspecialized,setListSpecialized]=useState([])
const [listfaculty,setListFaculty]=useState([])
const [faculty,setFaculty]=useState();
   const [specialized,setSpecialized]=useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] =useState('');
  const[fullname,setFullName]=useState('');
  const [class_user,setClassUser]=useState('');
  const [phoneNumber,setPhoneNumber]=useState();
  const [idNumber,setIdNumber]=useState();
  const [address,setAddress]=useState();
  const [gender,setGender]=useState();
  const [password,setPassword]=useState();
  const [email,setEmail]=useState();
  const [userName,setUserName]=useState();
  const [endDate,setEndDate]=useState();
  const [startDate,setStartDate]=useState();
  const [birthDate,setBirthDate]=useState();
    const date = dayjs().format('YYYY/MM/DD');
    const navigate=useNavigate();
  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');
   

    let isValid = true;
   
   

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  React.useEffect(()=>{
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
  const HandleSignUp=()=>{
    alert(faculty)
    const user={
           
      idNumber:idNumber,
      facultyDto:{
          idFaculty:faculty
      },
      specializedDto:{
          idSpecialized:specialized
      },
      classUser:class_user,
      acadamyEndYear:endDate,
      acadamyStartYear:startDate,
      address:address,
      fullName:fullname,
      email:email,
      dateOfBirth:birthDate,
      phoneNumber:phoneNumber,
      gender:gender,
      accountDto:{
             userName:userName,
             password:password,
             createTime:date,
             isActive:1,
             roleDto:{
              idRole:3
             }
      }
  };
createAccountUser(user).then((response)=>{
  swal({
    title: "UPdate ̣Success!",
    icon: "success",
  });
  navigate("/login");
            }).catch(error => {
                console.error('Error:', error.response?.data || error.message);
              });

  }

  return (
    
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={HandleSignUp}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Nguyen Van A"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
                onChange={e=>setFullName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="id_number">Id Number</FormLabel>
              <TextField
                autoComplete="id_number"
                name="id_number"
                required
                fullWidth
                id="name"
                placeholder="3122345335"
                onChange={e=>setIdNumber(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="address">Address</FormLabel>
              <TextField
                autoComplete="address"
                name="addressaddress"
                required
                fullWidth
                id="address"
                placeholder="TP HCM"
                onChange={e=>setAddress(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
              <TextField
                autoComplete="phone_number"
                name="phone_number"
                required
                fullWidth
                id="phone_number"
                placeholder="076556577"
               onChange={e=>setPhoneNumber(e.target.value)}
              />
            </FormControl>

            <FormControl>
            <FormLabel htmlFor="gender"> Gender</FormLabel>
       <TextField
      
                        select
                      
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onChange={e=>setGender(e.target.value)}
                    
                        required
                        sx={{ mb: 4 }}>
                 
                <MenuItem  value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                </TextField>
        
         
            </FormControl>


            <FormControl>
            <FormLabel htmlFor="faculty">Faculty</FormLabel>
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
        
         
            </FormControl>
            <FormControl>
            <FormLabel htmlFor="name"> Specialized</FormLabel>
       
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
          
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="class">Class</FormLabel>
              <TextField
                autoComplete="class"
                name="class"
                required
                fullWidth
                id="class"
                placeholder="DCT1233"
               onChange={e=>setClassUser(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="start_year">Acadamy Start Year</FormLabel>
              <TextField
                autoComplete="start_year"
                name="start_year"
                required
                fullWidth
                id="start_year"
                placeholder="2021"
               onChange={e=>setStartDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="end_year">Acadamy End Year</FormLabel>
              <TextField

                autoComplete="end_year"
                name="end_year"
                required
                fullWidth
                id="end_year"
                placeholder="2025"
               onChange={e=>setEndDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="birthDate">Date of Birth</FormLabel>
              <TextField
              type='date'
                autoComplete="birthDate"
                name="birthDate"
                required
                fullWidth
                id="birthDate"
                placeholder="2021"
               onChange={e=>setBirthDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                onChange={e=>setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="username">User Name</FormLabel>
              <TextField
                required
                fullWidth
                id="username"
                placeholder="UserName"
                name="username"
                onChange={e=>setUserName(e.target.value)}
              />
            </FormControl>
            

            
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                onChange={e=>setPassword(e.target.value)}
              />
            </FormControl>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
           
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
                
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}