import axios from "axios";
const   REST_API_USER_BASE_URL="http://localhost:8081/api/user";
export const _getUserByIdAccount=(id)=>{
    return axios.get(REST_API_USER_BASE_URL+"/"+id);

}
export const CampaginDisplayUser=(page,size)=>{
    return axios.get(REST_API_USER_BASE_URL+"/display/campaignpermit"+"?page="+page+"&size="+size);
}
