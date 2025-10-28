import axios from "axios";
import { getToken } from "../libs/token_data";

const apiUrl = "http://localhost:1323/";

const instance = axios.create({
    baseURL: apiUrl,
    withCredentials: false,
});

instance.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `Bearer ${getToken()}`;
        config.headers["X-Tenant-ID"] = "sport-pick-app";
        return config;
    },
    (error) => {
        console.log(error);
    }
);

export default instance;
