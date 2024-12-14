import axios from "axios";

const  API_URL_DONATION_BASE_URL="http://localhost:8081/api/donation";
export const createDonation=(donation)=>{
    return axios.post(API_URL_DONATION_BASE_URL+"/create",donation);
}

export const getListDonation=(form)=>{
    return axios.post(API_URL_DONATION_BASE_URL+"/getdonation",form
    
    );

  
}

export const getListDonationbyId=(id)=>{
    return axios.get(API_URL_DONATION_BASE_URL+"/getDonation/"+id);
}

export const getListShowDonationUser=(form)=>{
    return axios.post(API_URL_DONATION_BASE_URL+"/showcampaign",form);
}