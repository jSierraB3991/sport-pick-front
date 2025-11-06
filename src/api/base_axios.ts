import axios from "axios";
import { getToken } from "../libs/token_data";
import { TENAT_APP_KEY } from "../libs/constants";

const apiUrl = "https://sport-picks.onrender.com/";

const instance = axios.create({
    baseURL: apiUrl,
    withCredentials: false,
});

instance.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `Bearer ${getToken()}`;
        config.headers["X-Tenant-ID"] = TENAT_APP_KEY;
        return config;
    },
    (error) => {
        console.log(error);
    }
);

export default instance;
