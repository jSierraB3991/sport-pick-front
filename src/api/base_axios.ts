import axios from "axios"
import { getToken } from "../libs/token_data";


const apiUrl = import.meta.env.VITE_BACK_API_URL as string;

const instance = axios.create({
    baseURL: apiUrl,
    withCredentials: false,
  });
  
  
// Interceptor para las solicitudes
instance.interceptors.request.use(
  
  (config) => {
      config.headers['Authorization'] = `Bearer ${getToken()}`;
      return config;
    },(error) => {
    console.log(error)
  }
);

export default instance;
