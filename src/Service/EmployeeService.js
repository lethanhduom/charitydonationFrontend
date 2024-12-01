import axios from "axios";
const REST_API_EMPLOYEE_BASE_URL="http://localhost:8081/api/account/employee";
const REST_API_LOGIN_ADMIN="http://localhost:8081/api/admin/login";
const apiClient = axios.create({
    // baseURL: 'http://localhost:8081',  // URL của Spring Boot API
    headers: {
      'Content-Type': 'application/json',  // Đảm bảo là application/json
    },
    // withCredentials: true,  // Cần nếu sử dụng cookie xác thực
  });
  
export const getEmployee=(id)=>{
    return axios.get(REST_API_EMPLOYEE_BASE_URL+"/"+id)
}
export const loginAdmin=(accountAdmin)=>{
    return apiClient.post(REST_API_LOGIN_ADMIN,accountAdmin)
}
