export interface AdminSports {
    id: number;
    is_available: boolean;
    image: string;
    name: string;
    description: string;
}

export interface AdminSportUpdate {
    id: number;
    is_available: boolean;
}
