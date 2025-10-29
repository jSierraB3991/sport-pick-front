export interface PpalLeagues {
    name: string;
    english_name: string;
    term_key: string;
}

export interface PPalLeaguesByCountry {
    contry_name: string;
    english_name: string;
    term_key: string;
    ppal_leagues: PpalLeagues[] | null;
}

export interface BetDataHome {
    name: string;
    term_key: string;
    sport: string;
    ppal_leagues_by_country: PPalLeaguesByCountry[];
}
