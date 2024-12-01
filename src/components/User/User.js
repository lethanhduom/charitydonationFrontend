import React from "react";
import Header from "./Header/Header";
import "../User/User.css"
import SlideShow from "./SlideShow/SlideShow";
import Card from "./Content/Card";
import Section from "./Content/Section";
const User=()=>{
    return(
        <div id="user_page">
            <Header/>
            <SlideShow/>
            <Section/>
            <Card/>
        </div>
    )
}
export default User