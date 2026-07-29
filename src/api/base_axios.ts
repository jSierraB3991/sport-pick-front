import axios from "axios";
import { getRefreshToken, getToken, logOutUser, saveDataUser } from "../libs/token_data";
import { TENAT_APP_KEY } from "../libs/constants";
import { refreshToken } from "./oauth";
import { JwtResponse } from "../models/oauth_models";

const apiUrl = "http://localhost:1323/";

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

let refreshPromise: Promise<JwtResponse> | null = null;

instance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        console.log("Token expired, refreshing token...");
        originalRequest._retry = true;

        try {
            if (!refreshPromise) {
                refreshPromise = refreshToken(getRefreshToken());
            }

            const token = await refreshPromise;

            refreshPromise = null;

            saveDataUser(token);

            originalRequest.headers.Authorization = `Bearer ${token}`;

            return instance(originalRequest);
        } catch (e) {
            refreshPromise = null;

            logOutUser();

            window.location.href = "/login";

            return Promise.reject(e);
        }
    }
);

export default instance;
