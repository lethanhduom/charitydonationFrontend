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
export const getImage=(id)=>{
    return axios.get(REST_API_CAMPAIGN_BASE_URL+"/campaign/image/"+id);
}

export const changeStatusDetail=(form)=>{
    return axios.post(REST_API_CAMPAIGN_BASE_URL+"/campaign/changestatus",form,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    });
}

export const getImageRepresent=(id)=>{
    return axios.get(REST_API_CAMPAIGN_BASE_URL+"/campaign/getimagerepresent/"+id);
}

export const updateCurrentMoney=(form)=>{
    return axios.post(REST_API_CAMPAIGN_BASE_URL+"/campaign/updatecurrentmoney",form);
}

export const createCampaignFromUser =(form)=>{
    return axios.post(REST_API_CAMPAIGN_BASE_URL+"/campaign/usercreate",form);
}
export const getCampaignPageOngoing=(page,size)=>{
    return axios.get(REST_API_CAMPAIGN_BASE_URL+ "/admin/campaign/ongoing" + "?page="+page+"&size="+size,{
        headers:{

            // Authorization:`Bearer ${sessionStorage.getItem("token")}`,
            // withCredentials: true,
        }
    });
}

export const getCampaignPageDeny=(page,size)=>{
    return axios.get(REST_API_CAMPAIGN_BASE_URL+ "/admin/campaign/deny" + "?page="+page+"&size="+size,{
        headers:{

            // Authorization:`Bearer ${sessionStorage.getItem("token")}`,
            // withCredentials: true,
        }
    });
}

export const getCampaignPageSuccess=(page,size)=>{
    return axios.get(REST_API_CAMPAIGN_BASE_URL+ "/admin/campaign/success" + "?page="+page+"&size="+size,{
        headers:{

            // Authorization:`Bearer ${sessionStorage.getItem("token")}`,
            // withCredentials: true,
        }
    });
}
export const UpdateCampaign=(form)=>{
    return axios.put(REST_API_CAMPAIGN_BASE_URL+"/campaign/updateCampaign",form,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
}