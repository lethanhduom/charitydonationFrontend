import React, { useState } from "react";
import "../../Admin/Sidebar/Sidebar.css";
import Logo from "../imgs/logocharity.png";
// import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data.js";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <NavLink to ={item.link}
              className={selected === index ? "menuItem admin_menu" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
             {item.heading}
              {/* <span><NavLink to={item.link}></NavLink></span> */}
            </NavLink>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem">
          {/* <UilSignOutAlt /> */}
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
