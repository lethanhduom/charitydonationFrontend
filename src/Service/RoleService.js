import axios from "axios";
const REST_API_BASE_URL_ROLE="http://localhost:8081/api/role/listrole";
const token=sessionStorage.getItem("token");
const listRole=()=>{
    return axios.get(REST_API_BASE_URL_ROLE,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
}
export default listRole