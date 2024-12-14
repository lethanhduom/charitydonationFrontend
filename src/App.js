import { BrowserRouter, Routes, Route, Router, Outlet } from 'react-router-dom'
import Admin from './components/Admin/Admin';
import AccountTable from './components/Admin/Table/AccountTable';
import Header from './components/User/Header/Header';
import User from './components/User/User';
import Login from './components/Admin/pages/Login';
import UserForm from './components/Admin/UserInfor/UserForm';
import EmployeeAccount from './components/Admin/UserInfor/EmployeeAccount';
import InforAccount from './components/Admin/UserInfor/UsernamePassword';
import CampaignTable from './components/Admin/Table/CampaignTable';
import UserAccount from './components/Admin/UserInfor/UserAccount';
import ProtectRoute from './components/Admin/Route/ProtectRoute';
import { introspect } from './Service/AccountService';
import PayPalButton from './components/User/PayPal/PayPalButton';
import { useState } from 'react';
import Paypal from './components/User/PayPal/PayPal';
import PaymentPage from './components/User/PayPal/PaymentPage';
import CancelPage from './components/User/PayPal/CancelPage';
import SuccessPage from './components/User/PayPal/SuccessPage';
import SignIn from './components/User/Sign-In/SignIn';
import Authenticate from './components/User/Sign-In/Authenticate';
import CampaignDetail from './components/User/Content/CampaignDetail';
import PaymentSuccess from './components/User/Content/PaymentSuccess';
import AddCampaign from './components/User/Content/AddCampaign'
import BasicTabs from './components/Admin/Table/CampaignAnalytics';
import DetailPage from './components/User/Campaign/DetailCampaign';
import CampaignUserPage from './components/User/Campaign/Index';
import AboutUs from './components/User/AboutUs/AboutUs';
import SignUp from './components/User/Sign-Up/SignUp';


function App() {
  const token = sessionStorage.getItem("token");
  const [checkout, setCheckOut] = useState(false);
  return (

    <BrowserRouter>


    <Routes>
    <Route path='admin/login' element={<Login/>}></Route>
    <Route element={<ProtectRoute/>}>
    <Route path="/admin" element={<Admin/>}>
      <Route path="/admin/account" element={<AccountTable/>}/>
      <Route path="/admin/account/create" element={<UserForm/>}/>
      <Route path="/admin/account/create/employee" element={<EmployeeAccount/>}/>
      <Route
               path="/admin/account/create/user/add" element={<InforAccount/>}/>
              <Route
               path="/admin/account/create/employee/add" element={<InforAccount/>}/>
                  <Route
                path="/admin/campaign" element={<CampaignTable/>}/>
                <Route
               path="/admin/account/create/user" element={<UserAccount/>}/>
               <Route
               path="/admin/detailCampaign"element={<BasicTabs/>}/>
    </Route> 
    </Route>
    <Route path='/' element={<User/>}>
    <Route path ="campaign/:id" element={<CampaignDetail/>}/>
    </Route>
    <Route path='/vnp/payment-success' element={<PaymentSuccess/>}></Route>
    
    <Route path='/login' element={<SignIn/>}></Route>
    <Route path='/sign-up' element={<SignUp/>}></Route>
    <Route path='/detailcampaign' element={<CampaignUserPage/>}></Route>
    <Route path='/about' element={<AboutUs/>}></Route>
        <Route path='/addCampaign' element={<AddCampaign />} ></Route>
      </Routes>
      
     

    </BrowserRouter>
  );
}

export default App;