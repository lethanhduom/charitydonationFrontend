import axios from "axios"
import authHeaer from "./setAuth";
const REST_API_BASE_URL="http://localhost:8081/api/account";
const REST_API_CREATE_USER="http://localhost:8081/api/admin/createuser";
// axios.defaults.withCredentials = true;
const tokenadmin=sessionStorage.getItem("token");
const tokena=localStorage.getItem("saveToken")

 export const listAccount=(page,size)=>{
    return axios.get(REST_API_BASE_URL+"/getaccountactive"+"?page="+page+"&size="+size,{
        headers:{
      'Authorization':`Bearer ${tokenadmin}`,
        // crossDomain: true,
         "Content-Type": "application/json",
        //  "Cache-Control":"no-catche",
         "Access-Control-Allow-Origin":"*"
        },
        withCredentials: true,
      

    });
}
export const loginUser=(user)=>{
    return axios.post(REST_API_BASE_URL+"/login",user);
}
export const createAccountUser=(user)=>
    {
        return axios.post(REST_API_CREATE_USER,user,{
            headers:{
                Authorization: `Bearer ${tokenadmin}`
            }
        });

    }
export const createAccountEmployee=(employee)=> axios.post();
export const introspect=(token)=>axios.post("http://localhost:8081/api/account/introspect",(token));
export const getAccountByUserName=(userName)=>{
    return axios.get(REST_API_BASE_URL+"/getaccount/"+userName);
}
