import styled from "styled-components";
import image from "../Images/logo_user_page.png";
import { useState } from "react";
import { createAccountUser, introspect } from "../../../Service/AccountService";
import swal from 'sweetalert'
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getToken } from "../../../Service/localStorageService";
import { getAccountByUserName } from "../../../Service/AccountService";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
const Header = (props) => {

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [userName,setUserName]=useState();
  const getUserDetails = async (accessToken) => {

    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    );
    const data = await response.json();
    
    setUserDetails(data);
  };
  const getUserName=async(token)=>{
    const decodedToken = jwtDecode(token);
    setUserName(decodedToken.sub)
  }
  const getUserNameGoogle=async(accessToken)=>{
     getUserDetails(accessToken);
     setUserName(userDetails.name)
  }
const handleLogOut=()=>{

  localStorage.removeItem('accessToken')
  localStorage.removeItem("userToken");
}
  const [checkToken, setcheckToken] = useState(false);
  const token = localStorage.getItem("userToken");
  const token_google=sessionStorage.getItem("accessToken");
  const date = dayjs().format('YYYY/MM/DD');
  
  useEffect(()=>{
   
    const accessToken = getToken();
    if(accessToken===null&&token===null){
      return;
    }
    if (accessToken !== null) {
      setcheckToken(true);  
      getUserDetails(accessToken); 
      getUserNameGoogle(accessToken);
      // setUserName(getUserDetails(accessToken).name)
    }
    if (token !== null) {
      introspect(token).then((response) => {
        setcheckToken(response.data.valid);
        getUserName(token);
        if(response.data.valid===false){
          localStorage.removeItem("userToken")
        }
        // const decodedToken = jwtDecode(token);
      //  setUserName(decodedToken.sub);
      });
    }
  
   
},[navigate])

  

 
  // useEffect(()=>{
   
        // if(token!==null&&response.data.valid===false){
        //   swal({
        //     title: 'Phiên Đăng Nhập của bạn hết!',
        //     text: 'Vui lòng đăng nhập lại.',
        //     timer: 2000
        //   })
          // Navigate(to)
        // }
      //  })

  //  

  return (
    <Container>
      <Logo>
        <a href="/">

          <img src={image} alt="" />
        </a>
      </Logo>
      <NavMenu>

        <a href="/">
          <span>Tường nhân ái</span>
        </a>
        <a href="/about">
          <span>Về chúng tôi</span>
        </a>
        <a href="/contact">
          <span>Liên hệ</span>
        </a>
        <a href="/addCampaign">
          <span> Gây quỹ</span>
        </a>
      </NavMenu>
      <Wrap></Wrap>
      {checkToken ? <Login>
        <a href="/" onClick={()=>handleLogOut()}>Đăng xuất</a>
      </Login> :
        <Login>
          <a href="/login" >Đăng nhập</a>
        </Login>
      }
      {checkToken&&
        <Login>
          <a href="/detailAccount" >{userDetails.name}</a>
        </Login>
      }
    </Container>
  );
};

//Styled-Components

const Container = styled.div`
  position: fixed;
  background-color:   #FFF;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;
  z-index: 1000;
`;

const Logo = styled.a`
  /* padding: 0; */
  width: 80px;
  /* font-size: 0; */
  /* display: inline-block; */
  align-items: center;

  a {
    cursor: auto;
    img {
      /* display: flex; */
      width: 90%;
      border-radius: 50px;
      /* align-items: center; */
    }
  }
`;

const Wrap = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  margin-right: auto;
  margin-left: auto;
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  position: relative;
  margin-right: auto;
  margin-left: 30px;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0 12px;

    span {
      /* color: rgb(249, 249, 249); */
      color: #000;
      font-size: 18px;
      letter-spacing: 1px;
      line-height: 1.08;
      padding: 1px 0;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0 0 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0;
        opacity: 0;
        position: absolute;
        right: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
    
        opacity: 1 !important;

      }
     
    }
  }

  @media (max-width: 548px) {
    display: none;
  }
`;

const Login = styled.a`
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px 16px;
  margin-right: 45px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

export default Header;