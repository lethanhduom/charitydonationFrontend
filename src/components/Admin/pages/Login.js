import React, { useState } from "react";
import Logo from "../imgs/logocharity.png"
import axios from "axios";
import "../pages/Login.css"
import { json, Link, Navigate, NavLink, useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { loginAdmin } from "../../../Service/EmployeeService";
import { height, Stack } from "@mui/system";
import { TextField } from "@mui/material";
import swal from 'sweetalert'
const Login=()=>{
  const navigate=useNavigate();

  
  const [userName,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [message,setMessage]=useState('');
  const HandleLogin= async()=>{
    // e.preventDefault();
 
        let adminAccount={
          "userName":userName,
          "password":password
       
        }
       
        // console.log(JSON.stringify ({
        //   "userName":"HoangNghia",
        //   "password":"12345"
        // }))

      //   axios({
      //     url:'/api/admin/login',
      //     data:adminAccount,
      //     method:"POST",
      //     mode: 'no-cors',
      //     headers:{
      //         "Content-Type": "application/json",
      //       "Access-Control-Allow-Origin": "*",
      //         "Access-Control-Request-Headers": 'Content-Type, Authorization'
  
      //     }
      // })
      // .then(res => {
      //     console.log(res);
          
      // })
      // .catch(err =>{
      //     console.log(err);
          
      // })
      const form=new FormData();
      form.append("userName",userName);
      form.append("password",password);
      
     try{
        const response = await axios.post("http://localhost:8081/api/admin/login",(adminAccount),{
          headers:{
            // 'Content-Type': 'application/json'
          }
        });
       
        console.log(response.data)
        if(response.data.authenticated===true){
          swal({
            title: "Login Success!",
            icon: "success",
          });
          navigate("/admin")
          // <Navigate to ="/admin"/>
          localStorage.setItem("saveToken",response.data.token);
          sessionStorage.setItem('token', response.data.token);
           console.log(localStorage.getItem("saveToken"));
          console.log({
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          });
       
          
        }else {
          swal({
            title: "Login Failed!",
            text: response.data.errorcode,
            icon: "error",
          });
        }
        // alert(1)
     }catch (error) {
      alert(2)
      console.error(error);
  }
      // try{
      //  loginAdmin(adminAccount).then((response)=>{
      //     console.log(response);
      //     alert(1)
      //   }).catch(error=>{
      //     console.error("Error:",error.response?.data);
      //     alert(2)
      //   })
      // }catch(error){
      //   console.error("ERROR:"+error);
      // }
      // const data = {
      //   username: 'admin',
      //   password: 'password123'
      // };

      // try {
      //   const response = await axios.post('http://localhost:8081/api/admin/login', data, {
      //     headers: {
      //       'Content-Type': 'application/json',  // Đảm bảo đúng Content-Type
      //     },
      //   });
      //   console.log('Login successful:', response.data);
      // } catch (error) {
      //   console.error('Login failed:', error.response ? error.response.data : error.message);
      // }

      // const account = {
      //   "userName": "HoangNghia",
      //   "password": "12345"
      // };
    
      // try {
      //   // Gửi yêu cầu POST với axios
      //   const response =  axios.post('http://localhost:8081/api/admin/login', account, {
      //     headers: {
      //       'Content-Type': 'application/json',  // Đảm bảo header là application/json
      //     },
      //   });
    
      //   // Xử lý dữ liệu phản hồi từ server
      //   console.log('Login successful:', response.data);
      // } catch (error) {
      //   console.error('Error:', error.response ? error.response.data : error.message);
      // }
    


        
 
  }
  return (
    <>
      <section class="h-100 gradient-form" style={{backgroundColor:'#eee'}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-3 text-black">
          <div class="row g-0">
            <div class="col-lg-6">
              <div class="card-body p-md-5 mx-md-4">

                <div class="text-center">
                  <img src={Logo}
                    style={{width: 100, height:100 }} alt="logo"/>
                  <h4 class="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                </div>

                <form>
                  <p>Please login to your account</p>

                
                  <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField type="text" 
                      placeholder="Username" 
                      variant="outlined"
                      label="UserName"
                      onChange={e=>setUsername(e.target.value)}
                      fullWidth
                        required
                      />
                      </Stack>
          
      
                      <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField type="password"
                    variant="outlined"
                    label="Password"
                    onChange={e=>setPassword(e.target.value)}
                    fullWidth
                    required
                     />
                     </Stack>
                     
              

                  <div class="text-center pt-1 mb-5 pb-1">
                  <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-danger" onClick={HandleLogin}>Login</button>
                  <br></br>  <a class="text-muted" href="#!">Forgot password?</a>
                  </div>


                </form>

              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 class="mb-4">A journey of knowledge, a connection of hearts</h4>
                <p class="small mb-0">Bringing hope and changing lives, we are dedicated to creating a world where compassion and generosity transform the future. Our mission is to uplift those in need, inspire kindness, and foster a community united by the power of giving. Join us as we strive to make a meaningful difference, one act of care at a time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}
export default Login