
// import { Table } from "@mui/material"
import "../Admin/Admin.css"
import Header from "./Header"
import Sidebar from "./Sidebar/SideBar"
import AccountTable from "./Table/AccountTable"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserForm from "./UserInfor/UserForm"
import RouteData from "./Route/Route"
import rootShouldForwardProp from "@mui/material/styles/rootShouldForwardProp"
import UserAccount from "./UserInfor/UserAccount"
import InforAccount from "./UserInfor/UsernamePassword"
import EmployeeAccount from "./UserInfor/EmployeeAccount"



// import Temp from "./Table/Temp12"
// import BasicTable from "./Table/Table"
// import User from "./UserInfor/User"
const Admin =()=>{
  const routes=RouteData.getRoutes();
    return (
      <>
      <BrowserRouter>

     
  <div className="admin-container">
        <Sidebar/>
       
          <div className="wrapper d-flex flex-column min-vh-100">
    
        <Header/>
       
        <div className="body flex-grow-1">
      
        <Routes>
        <Route path="/account" element={<AccountTable/>}
        >
               </Route>
               <Route
               path="/account/create" element={<UserForm/>}
               >
               </Route>

               <Route
               path="/account/create/user" element={<UserAccount/>}
               >
               </Route>
               <Route
               path="/account/create/employee" element={<EmployeeAccount/>}
               >
               </Route>
               <Route
               path="/account/create/user/add" element={<InforAccount/>}
               >
               </Route>
               <Route
               path="/account/create/employee/add" element={<InforAccount/>}
               >
               </Route>
       </Routes>
        
        </div>
      </div>
        </div>
        </BrowserRouter>
      </>
      
    )
}
export default Admin