export interface Steps {
    step: string;
    minimun_selections: number;
    selection_minimun_count: number;
    selection_maximun_count: number;
    maximun_lose: number;
    maximun_lose_daily: number;
    benefit_target: number;
    time_limit: string;
}

export interface PriceChallenges {
    id: number;
    grow: number;
    price: number;
    steps: Steps[];
}

export interface ChallengeResponse {
    name: string;
    description: string;
    price_challenge: PriceChallenges[];
}
