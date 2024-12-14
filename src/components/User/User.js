import React from "react";
import Header from "./Header/Header";
import "../User/User.css"
import SlideShow from "./SlideShow/SlideShow";
import Card from "./Content/Card";
import Section from "./Content/Section";
import { Outlet, useNavigate } from "react-router-dom";
import HomeIntroduce from "./Content/HomeIntroduce";
import Footer from "./Footer/Footer";
import { useState } from "react";
const User=()=>{
  
    return (
        <div id="user_page">
        <div>
            <Header />
            <SlideShow />
            <Section />
            <Card />
            <HomeIntroduce />
            <Footer/>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}
export default User