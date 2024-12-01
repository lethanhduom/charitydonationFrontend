import axios from "axios";

const REST_API_BASE_URL_SPECIALIZED="http://localhost:8081/api/specialized/getspecialized";
export const getSpecialized=()=>{
return axios.get(REST_API_BASE_URL_SPECIALIZED);
}
export const getSpecializedById=(id)=>{
    return axios.get(REST_API_BASE_URL_SPECIALIZED+"/"+id);
}
