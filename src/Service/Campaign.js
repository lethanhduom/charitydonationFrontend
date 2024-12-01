import axios from "axios";
const REST_API_CAMPAIGN_BASE_URL="http://localhost:8081/api"
const token=sessionStorage.getItem("token");
export const getCampaignPage=(page,size)=>{
    return axios.get(REST_API_CAMPAIGN_BASE_URL+ "/admin/campaign" + "?page="+page+"&size="+size,{
        headers:{

            // Authorization:`Bearer ${sessionStorage.getItem("token")}`,
            // withCredentials: true,
        }
    });
}
export const getLengthCampaign=()=>{
   return axios.get(REST_API_CAMPAIGN_BASE_URL+"/admin/count",{
    headers:{
        "Authorization":`Bearer ${token}`
    }
   });
}
export const getDisplayCampaignUser=(page,size)=>{
    return axios.get(REST_API_CAMPAIGN_BASE_URL+"user/display/campaignpermit"+"?page="+page+"&size="+size);
}

export const getDetailCampaign=(id)=>{
    return axios.get(REST_API_CAMPAIGN_BASE_URL+"/campaign/"+id);
}
