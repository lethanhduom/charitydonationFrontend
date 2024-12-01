import React, { useState } from "react";
import { redirect,Route,Navigate,useNavigate, Outlet  } from "react-router-dom";
import { introspect } from "../../../Service/AccountService";
import swal from 'sweetalert'
const ProtectRoute=()=>{
    const token=sessionStorage.getItem("token");

    const [getValid,setValid]=useState(false);

        introspect(token).then((response)=>{

            setValid(response.data.valid);
      
     
   
    })
       
        return true?<Outlet/>:<Navigate to="/admin/login"/>
}
export default ProtectRoute