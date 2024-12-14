import React from "react"
import "../Admin/Header.css"
import {LoginOutlined } from "@ant-design/icons"
import { DownOutlined } from '@ant-design/icons';
// import  { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd'
const Header =()=>{
    
    return (
        <div className="header-container">
        <div className="login">
        <LoginOutlined className="loginicon"/>
      
        </div>
         
        </div>
    )
}
export default Header