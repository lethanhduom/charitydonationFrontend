import axios from "axios";

const  API_URL_DONATION_BASE_URL="http://localhost:8081/api/donation";
export const createDonation=(donation)=>{
    return axios.post(API_URL_DONATION_BASE_URL+"/create",donation);
}