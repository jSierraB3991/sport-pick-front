import { UserResponse } from "../models/user_models";
import instance from "./base_axios";

const getUserDataApi = async (): Promise<UserResponse> => {
    const result = await instance.get<UserResponse>("/user/");
    return result.data;
};

export { getUserDataApi };
