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

export interface UserLoginResponse {
    access_token: string;
    expired_in: number;
    is_two_factor: boolean;
    refresh_token: string;
    role: string;
}

export interface UserLoginTwoFactor {
    email: string;
    code: string;
    rememberMe?: boolean;
}

export interface UserRegister {
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    country: string;
    countryId: number;
    cellphone: string;
    gender: string;
    callingCode: string;
    parent_code: string;
    parent_leg: string;
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
