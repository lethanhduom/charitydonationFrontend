import React from "react";
import Header from "./Header/Header";
import "../User/User.css"
import SlideShow from "./SlideShow/SlideShow";
import Card from "./Content/Card";
import Section from "./Content/Section";
import HomeIntroduce from "./Content/HomeIntroduce";
import Footer from "./Footer/Footer";
const User = () => {
    return (
        <div id="user_page">
            <Header />
            <SlideShow />
            <Section />
            <Card />
            <HomeIntroduce />
            <Footer />
        </div>
    )
}
export default User