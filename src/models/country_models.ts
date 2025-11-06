export interface Indicative {
    indicative: string;
}

export interface CountryModel {
    name: string;
    flag: string;
    id: number;
    indicatives: Indicative[];
    language: string;
}
