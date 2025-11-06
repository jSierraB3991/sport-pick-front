import { AdminCountry, AdminSports, AdminSportUpdate } from "../models/admin_data";
import instance from "./base_axios";

const getSportsApi = async (): Promise<AdminSports[]> => {
    const data = await instance.get<AdminSports[]>("/admin/config/sports/");
    return data.data;
};
const getCountriesBySportApi = async (sport: number): Promise<AdminCountry[]> => {
    const data = await instance.get<AdminCountry[]>("/admin/config/countries/" + sport);
    return data.data;
};
const updateSportApi = async (sportChanges: AdminSportUpdate[]): Promise<null> => {
    const data = await instance.put<null>("/admin/config/sports/", sportChanges);
    return data.data;
};

export { getSportsApi, updateSportApi, getCountriesBySportApi };
