// import React from "react";
// const Account=React.lazy(()=>import('../../Admin/Table/AccountTable'))
// const UserForm=React.lazy(()=>import('../../Admin/UserInfor/UserForm'))
// const RouteData=()=>[
//     {path:'/account',name:'Account',element:Account},
//     {path:'/account/create/user',name:'UserForm',element:UserForm}
// ]
// export default RouteData

import React from "react";
import AccountTable from "../../Admin/Table/AccountTable";
const Account=React.lazy(()=>import('../../Admin/Table/AccountTable'))
const UserForm=React.lazy(()=>import('../../Admin/UserInfor/UserForm'))
class RoutesConfig {
    static getRoutes() {
        return [
            {path:'/account',name:'Account',element:Account},
    {path:'/account/create/user',name:'UserForm',element:UserForm}
            
        ];
    }
}
export default RoutesConfig