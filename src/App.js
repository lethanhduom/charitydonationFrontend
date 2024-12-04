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
import AddCampaign from './components/User/Content/AddCampaign'


function App() {
  const token = sessionStorage.getItem("token");
  const [checkout, setCheckOut] = useState(false);
  return (

    <BrowserRouter>

      <Routes>
        <Route path='admin/login' element={<Login />}></Route>
        <Route element={<ProtectRoute />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/account" element={<AccountTable />} />
            <Route path="/admin/account/create" element={<UserForm />} />
            <Route path="/admin/account/create/employee" element={<EmployeeAccount />} />
            <Route
              path="/admin/account/create/user/add" element={<InforAccount />} />
            <Route
              path="/admin/account/create/employee/add" element={<InforAccount />} />
            <Route
              path="/admin/campaign" element={<CampaignTable />} />
            <Route
              path="/admin/account/create/user" element={<UserAccount />} />
          </Route>
        </Route>
        <Route path='/' element={<User />}>

        </Route>
        <Route path='/login' element={<SignIn />}></Route>

        {/* <Route path="/payment" element={<PaymentPage/>}/> */}
        {/* <Route path="/payment/success" element={<SuccessPage/>}/> */}
        {/* <Route path="/payment/cancel" element={<CancelPage/>}/> */}
        {/* <Route path="/payment" element={<Paypal/>}/> */}
        {/* </Route>  */}
        {/* <Route path='/payment' element={<PayPalButton/>}>

 </Route> */}
        <Route path='/addCampaign' element={<AddCampaign />} ></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
