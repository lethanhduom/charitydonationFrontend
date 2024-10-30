import axios from "axios";
const REST_API_BASE_URL_ROLE="http://localhost:8081/api/role/listrole";
const listRole=()=>{
    return axios.get(REST_API_BASE_URL_ROLE);
}
export default listRole