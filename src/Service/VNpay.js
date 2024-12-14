import axios from "axios";

const API_URL_BASE_VNPAY="http://localhost:8081/api/vnpay";
export const CreateVNpay=(amount)=>{
return axios.post(API_URL_BASE_VNPAY+"/create",amount,{
    headers: {
        'Content-Type': 'text/plain' // Đặt kiểu dữ liệu là text
      }
});
}