import {
    UserLogin,
    UserLoginResponse,
    UserLoginTwoFactor,
    UserRegister,
    UserUpdate,
} from "../models/oauth_models";
import instance from "./base_axios";

const LoginApi = async (formData: UserLogin): Promise<UserLoginResponse> => {
    const response = await instance.post<UserLoginResponse>(
        "public/login/",
        formData
    );
    return response.data;
};

const LoginTwoFactorApi = async (
    formData: UserLoginTwoFactor
): Promise<UserLoginResponse> => {
    const response = await instance.post<UserLoginResponse>(
        "public/login/two-factor",
        formData
    );
    return response.data;
};

const RegisterApi = async (formData: UserRegister) => {
    const response = await instance.post("public/sign-up", formData);
    return response.data;
};

const UpdateUserApi = async (formData: UserUpdate) => {
    await instance.put("/user/update", formData);
};

export { LoginApi, LoginTwoFactorApi, RegisterApi, UpdateUserApi };
