
// import { Table } from "@mui/material"
import "../Admin/Admin.css"
import Header from "./Header"
import Sidebar from "./Sidebar/SideBar"
import AccountTable from "./Table/AccountTable"
import {BrowserRouter,Routes,Route, Outlet} from 'react-router-dom'
import UserForm from "./UserInfor/UserForm"
import RouteData from "./Route/Route"
// import rootShouldForwardProp from "@mui/material/styles/rootShouldForwardProp"
import UserAccount from "./UserInfor/UserAccount"
import InforAccount from "./UserInfor/UsernamePassword"
import EmployeeAccount from "./UserInfor/EmployeeAccount"
// import ModelTemp from "./Table/ModelTempm"
import CampaignTable from "./Table/CampaignTable"
import Login from "./pages/Login"
import { Breadcrumb } from "antd"





// import Temp from "./Table/Temp12"
// import BasicTable from "./Table/Table"
// import User from "./UserInfor/User"
const Admin =()=>{
   
    return (
      <>
      {/* <BrowserRouter> */}

     <div id="admin_page">
  <div className="admin-container">
        <Sidebar/>
       
          <div className="wrapper d-flex flex-column min-vh-100">
    
        <Header/>
        <Breadcrumb/>
        <div className="body flex-grow-1">
     
        <Outlet/>
       

        {/* <Outlet/>
        <Routes>
        <Route path="admin/account" element={<AccountTable/>}
        >
               </Route>
               <Route
               path="/admin/account/create" element={<UserForm/>}
               >
               </Route>

               <Route
               path="/admin/account/create/user" element={<UserAccount/>}
               >
               </Route>
               <Route
               path="/admin/account/create/employee" element={<EmployeeAccount/>}
               >
               </Route>
               <Route
               path="/admin/account/create/user/add" element={<InforAccount/>}
               >
               </Route>
               <Route
               path="/admin/account/create/employee/add" element={<InforAccount/>}
               >
               </Route>
               <Route
                path="/admin/campaign" element={<CampaignTable/>}
               >
               
               </Route> 
       </Routes> */}
      
   
        
        
      
        </div>
      </div>
        </div>
        </div>
        {/* </BrowserRouter> */}
      </>
      
    )
}
export default Admin