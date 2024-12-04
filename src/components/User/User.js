import React from "react";
import Header from "./Header/Header";
import "../User/User.css"
import SlideShow from "./SlideShow/SlideShow";
import Card from "./Content/Card";
import Section from "./Content/Section";
import { Outlet } from "react-router-dom";
const User=()=>{
    return(
        <div id="user_page">
            <div >
            <Header/>
            <SlideShow/>
            <Section/>
            
            </div>
            <div>
            <Outlet/>
            <Card/>
            </div>
        </div>
       
    )
}
export default User