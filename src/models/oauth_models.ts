export interface RegisterRequest {
    telefono: string;
    password: string;
    confirm_password: string;
    country_id: number;
    country_indicator: string;
    father_code: string;
}

export interface LoginRequest {
    telefono: string;
    password: string;
    country_indicator: string;
}

export interface JwtResponse {
    access_token: string;
    refresh_token: string;
    expired_in: number;
    role: string;
    is_two_factor: boolean;
}
export interface UserLogin {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface UserLoginTwoFactor {
    email: string;
    code: string;
    rememberMe?: boolean;
}

export interface UserRegister {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    country_id?: number;
    indicative?: string;
    cellphone: string;
}

export interface UserUpdate {
    first_name: string;
    last_name: string;
    gender: string;
    wallet: string;

    cellphone: string;
    calling_code: string;
    country_id: number;
    country: string;
}
