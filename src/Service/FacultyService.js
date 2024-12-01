import axios from "axios";

const REST_API_BASE_URL_FACULTY="http://localhost:8081/api/faculty/getfaculty";
export const getFaculty =()=>{
    return axios.get(REST_API_BASE_URL_FACULTY);
}