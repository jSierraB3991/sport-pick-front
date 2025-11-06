import { Languages } from "./generic";

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

export interface OutComesWs {
    data: string;
    data_english: string;
    line: number | null;
    odds: number;
    odds_american: string;
    odds_fractional: string;
    status: string;
}

export interface BestOffersWs {
    best_offer_type: Languages;
    closed_time_string: string;
    cash_out_status: string;
    closed_time: Date;
    criterium: Languages;
    outcomes: OutComesWs[];
}
export interface MatchScoreWs {
    score_away: string;
    score_home: string;
}

export interface LiveStadisticWs {
    match_score: MatchScoreWs;
}

export interface LiveDataMatchWs {
    away_name: string;
    best_offers: BestOffersWs[];
    group: string;
    home_name: string;
    id: number;
    live_odd_count: number;
    match_english_name: string;
    match_name: string;
    match_start: string;
    match_start_string: string;
    match_state: string;
    non_live_odd_count: string;
    stadistics: LiveStadisticWs;
}

export interface CategoriesMatchWs {
    name: string;
    english_name: string;
    id: number;
}
export interface LiveDataMacthDataWs {
    liva_data: LiveDataMatchWs[];
    categories_match: CategoriesMatchWs[];
}
export interface LiveMatchBetResponseWs {
    status: string | null;
    message: string | null;
    data: LiveDataMacthDataWs | null;
}
