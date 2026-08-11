import { ChallengeResponse } from "../models/challenges_models";
import { CountryModel, Indicative } from "../models/country_models";
import instance from "./base_axios";

const getCountriesApi = async (nameCountry: string): Promise<CountryModel[]> => {
    const result = await instance.get<CountryModel[]>("/public/countries/?name=" + nameCountry);
    return result.data;
};

const getIndicativesByCountryApi = async (countryId: number): Promise<Indicative[]> => {
    const result = await instance.get<Indicative[]>("/public/indicatives/" + countryId.toString());
    return result.data;
};

const getChallengeHome = async (): Promise<ChallengeResponse[]> => {
    const result = await instance.get<ChallengeResponse[]>("/public/home");
    return result.data;
};

export { getCountriesApi, getIndicativesByCountryApi, getChallengeHome };
