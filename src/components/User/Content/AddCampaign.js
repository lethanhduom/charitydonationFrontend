import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import Header from "../Header/Header";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import imageSgu from '../../User/Images/sgu.jpg'
import { useState } from 'react';
import swal from 'sweetalert';
import { getFaculty } from '../../../Service/FacultyService';
import { useEffect } from 'react';
import {getSpecializedById } from '../../../Service/SpecializedService';
import { introspect } from '../../../Service/AccountService';
import { jwtDecode } from 'jwt-decode';
import { createCampaignFromUser } from '../../../Service/Campaign';
export default function AddCampaign() {
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        sector: '',
        class: '',
        description: '',
    });
    const[fullname,setFullName]=useState();
    const[numberStudent,setNumberStudent]=useState();
    const[startYear,setStartYeaar]=useState();
    const[endYear,setEndYear]=useState();
    const[faculty,setFaculty]=useState();
    const[specialized,setSpecialized]=useState();
    const[classStudent,setClassStudent]=useState();
    const[header,setHeader]=useState();
    const[content,setContent]=useState();
    const[moneyExpect,setMoneyExpect]=useState();
    const[dateExpect,setDateExpect]=useState();
    const [files, setFiles] = useState([]);
    const[listFaculty,setListFaculty]=useState([])
    const[listSpecialized,setListSpecialized]=useState([])
    const[userAccountName,setUserAccountName]=useState()
    const handleFileChange = (event) => {
        setFiles(event.target.files);
      };

    // const handleChange = (field) => (event) => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         [field]: event.target.value,
    //     }));
    // };

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
          setListSpecialized(response.data);
        },[id])
      }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const token =localStorage.getItem('userToken');
        const res=await introspect(token);
        console.log(res.data)
        if(res.data.valid!==false){
            const decodedToken = jwtDecode(token);
             setUserAccountName(decodedToken.sub);

            const form=new FormData();
            form.append("campaignName",header);
            form.append("content",content);
            form.append("targetAmount",parseFloat(moneyExpect));
            form.append("currentAmount",parseFloat(0.00));
            form.append("faculty",parseInt(faculty));
            form.append("specialized",parseInt(specialized));
            form.append("fullName",fullname);
            form.append("classRecipient",classStudent);
            form.append("endYear",endYear);
            form.append("startYear",startYear);
           form.append("numberStudent",numberStudent);
            form.append("endDateExpect",dateExpect);
            form.append("userNameAccount",userAccountName);
            form.append("status",0);
            for(let i=0;i<files.length;i++){
              form.append("files",files[i]);
            }
            swal({
                title: "Are you sure?",
                text: "Do you want to create the new Campaign?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willCreate) => {
                if (willCreate) {
                  createCampaignFromUser(form).then((response)=>{
                    swal("Campaign has been created", {
                      icon: "success",
                    });
                  })
                 
                } else {
                  swal("You don't want to create the new campaign !");
                }
              });
        
           
        }
     
    };

    

    return (
        <>
            <Header />
            <Grid container
                direction={{ xs: 'column', md: 'row' }}
                sx={{
                    marginTop: 15,
                    marginBottom: '2%',
                    width: '100%',
                    flexGrow: 1
                }}
            >
                <Grid
                    item
                    size={6}
                    sx={
                        {
                            display: 'flex',
                            flexDirection: 'column',
                        }
                    }
                >
                    <Box
                        sx={{ width: '100%', display: 'grid', justifyContent: 'center', gap: 3, paddingTop: '5%' }}
                    >

                        <FormControl required >
                            <FormLabel sx={{ marginBottom: 1, fontSize: '18px' }}>Tên người thụ hưởng</FormLabel>
                            <StyledInput
                                placeholder="Họ và tên người thụ hưởng"
                                // value={formData.name}
                                onChange={e=>setFullName(e.target.value)} />
                            <HelperText />
                        </FormControl>
                        <FormControl required >
                            <FormLabel sx={{ marginBottom: 1, fontSize: '18px' }}>Mã số sinh viên</FormLabel>
                            <StyledInput
                                placeholder="0123456789"
                                // value={formData.phone}
                                onChange={e=>setNumberStudent(e.target.value)} />
                            <HelperText />
                        </FormControl>
                        <FormControl required >
                            <FormLabel sx={{ marginBottom: 1, fontSize: '18px' }}>Năm học</FormLabel>
                            
                            <StyledInput
                                placeholder="2021"
                                // value={formData.phone}
                                onChange={e=>setStartYeaar(e.target.value)} />
                                
                                
                        </FormControl>
                        <FormControl>
                        <StyledInput
                                placeholder="2025"
                                // value={formData.phone}
                                onChange={e=>setEndYear(e.target.value)} />
                          
                        </FormControl>
                        <FormControl required >
                            <FormLabel sx={{ marginBottom: 1, fontSize: '18px' }}>Khoa của người thụ hưởng</FormLabel>
                            <FormControl fullWidth>
  
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                fullWidth
                                onChange={e=>HandleSelectFaculty(e.target.value)}
                            >
                            {listFaculty.map((f,index)=>(
                                <MenuItem value={f.idFaculty}>{f.nameFaculty}</MenuItem>
                            ))}
                           
                                {/* <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                            </FormControl>
                            <HelperText />
                        </FormControl>

                        <FormControl required >
                            <FormLabel sx={{ marginBottom: 1, fontSize: '18px' }}>Ngành của người thụ hưởng</FormLabel>
                            <FormControl fullWidth>
  
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                fullWidth
                                onChange={e=>setSpecialized(e.target.value)}
                            >
                            {
                                listSpecialized.map((spec,index)=>(
                                    <MenuItem value={spec.idSpecialized}>{spec.nameSpecialized}</MenuItem>
                                ))
                            }
                                {/* <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                            </FormControl>
                            <HelperText />
                        </FormControl>


                        <FormControl required>
                            <FormLabel sx={{ marginBottom: 1, fontSize: '18px' }}>Lớp của người thụ hưởng</FormLabel>
                            <StyledInput
                                placeholder="DCT1218"
                                // value={formData.class}
                                onChange={e=>setClassStudent(e.target.value)} />
                            <HelperText />
                        </FormControl>
                        <FormControl required>
                            <FormLabel sx={{ marginBottom: 1, fontSize: '18px' }}>Tiêu đề</FormLabel>
                            <TextField
                                placeholder="Nhập tiêu đề ở đây..."
                               
                                rows={4}
                                fullWidth
                                // value={formData.description}
                                onChange={e=>setHeader(e.target.value)}
                                sx={{
                                    maxWidth: '350px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    },
                                }}
                            />
                            <HelperText />
                        </FormControl>
                        <FormControl required>
                            <FormLabel sx={{ marginBottom: 1, fontSize: '18px' }}>Mô tả thông tin</FormLabel>
                            <TextField
                                placeholder="Nhập mô tả chi tiết ở đây..."
                                multiline
                                rows={4}
                                fullWidth
                                // value={formData.description}
                                onChange={e=>setContent(e.target.value)}
                                sx={{
                                    maxWidth: '350px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    },
                                }}
                            />
                            <HelperText />

                        </FormControl>

                        <FormControl required>
                            <FormLabel sx={{ marginBottom: 1, fontSize: '18px' }}>Số tiền mong muốn</FormLabel>
                            <TextField
                                placeholder="số tiền mong muốn"
                               
                                rows={4}
                                fullWidth
                                // value={formData.description}
                                onChange={e=>setMoneyExpect(e.target.value)}
                                sx={{
                                    maxWidth: '350px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    },
                                }}
                            />
                            <HelperText />
                        </FormControl>
                   
                        <FormControl required fullWidth>
                        <FormLabel sx={{ marginBottom: 1, fontSize: '18px' }}>Ngày kết thúc mong muốn</FormLabel>
                        <TextField type="date" fullWidth
                        onChange={e=>setDateExpect(e.target.value)}
                         />
                        </FormControl>

                        <FormControl>
                        <input
                type="file"
                onChange={handleFileChange}
                multiple  // Cho phép chọn nhiều file
              
                style={{ marginBottom: '10px' }} // Tùy chỉnh thêm CSS nếu cần
            />
                        </FormControl>
                        <Box
                            textAlign="center"
                            sx={{
                                marginTop: 2
                            }}
                        >
                            <Button
                                sx={
                                    {
                                        backgroundColor: '#fdecec',
                                        color: '#df7171',
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        marginTop: 5,
                                    }
                                }
                                variant="contained"
                                type="submit"
                                onClick={handleSubmit

                                }
                            >
                                Gửi đề xuất
                            </Button>
                        </Box>
                    </Box>

                </Grid>
                <Grid
                    size={5}
                    sx={
                        {
                            backgroundColor: '#fdecec'
                        }
                    }
                >
                    <Box
                        sx={{
                            width: '100%'
                        }}
                    >
                        <Typography sx={{
                            ml: 2,
                            flex: 1,
                            textAlign: 'center',
                            fontFamily: 'monospace',
                            maxWidth: '800px',
                            marginTop: '5%',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal'
                        }} variant="h6" component="div">
                            Cùng trường Đại học Sài Gòn chung tay xây dựng cộng đồng sinh viên hạnh phúc, bảo vệ và hỗ trợ lẫn nhau các bạn nhé!
                        </Typography>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'center', padding: '2%', maxHeight:700 }}>   
                            <img src={imageSgu} />
                           
                            {/* </img> */}
                        </Box>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'center', padding: '2%', maxHeight:700 }}>   
                            <img src={imageSgu} />
                           
                            {/* </img> */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>


        </>
    )
}



const StyledInput = styled(Input)(
    ({ theme }) => `
  
    .${inputClasses.input} {
      width: 320px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
      &:hover {
        border-color: ${blue[400]};
      }
  
      &:focus {
        outline: 0;
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      }
    }
  `,
);

const HelperText = styled((props) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
        if (formControlContext?.filled) {
            setDirty(true);
        }
    }, [formControlContext]);

    if (formControlContext === undefined) {
        return null;
    }

    const { required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
  `;

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};