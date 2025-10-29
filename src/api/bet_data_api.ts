import { BetDataHome } from "../models/bet_dat_models";
import instance from "./base_axios";

const BetDataSportsApi = async (): Promise<BetDataHome[]> => {
    const response = await instance.get<BetDataHome[]>("public/bet/home");
    return response.data;
};

export { BetDataSportsApi };
