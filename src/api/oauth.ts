import { UserLogin, JwtResponse, UserLoginTwoFactor, UserRegister, UserUpdate } from "../models/oauth_models";
import instance from "./base_axios";

const LoginApi = async (formData: UserLogin): Promise<JwtResponse> => {
    const response = await instance.post<JwtResponse>("public/login/", formData);
    return response.data;
};

const LoginTwoFactorApi = async (formData: UserLoginTwoFactor): Promise<JwtResponse> => {
    const response = await instance.post<JwtResponse>("public/login/two-factor", formData);
    return response.data;
};

const RegisterApi = async (formData: UserRegister) => {
    const response = await instance.post("public/sign-up/", formData);
    return response.data;
};

const UpdateUserApi = async (formData: UserUpdate) => {
    await instance.put("/user/update", formData);
};

const refreshToken = async (tokenRefresh: string): Promise<JwtResponse> => {
    const data = await instance.post<JwtResponse>("/auth/refresh", {
        refresh_token: tokenRefresh,
    });

    return data.data;
};

export { LoginApi, LoginTwoFactorApi, RegisterApi, UpdateUserApi, refreshToken };
