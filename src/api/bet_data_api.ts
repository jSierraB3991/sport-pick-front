import { BetDataHome, MatchesByLeague } from "../models/bet_dat_models";
import instance from "./base_axios";

const BetDataSportsApi = async (): Promise<BetDataHome[]> => {
    const response = await instance.get<BetDataHome[]>("public/bet/home");
    return response.data;
};

const betSearchByLeagueApi = async (sport: string, country: string, league: string): Promise<MatchesByLeague> => {
    const response = await instance.get<MatchesByLeague>(`public/bet/league/?query=${sport}/${country}/${league}`);
    return response.data;
};

export { BetDataSportsApi, betSearchByLeagueApi };
