export interface RegisterRequest {
    telefono: string
	password: string
	confirm_password: string
	country_id: number
	country_indicator: string
	father_code: string
}

export interface LoginRequest {
	telefono: string
	password: string
	country_indicator: string
}

export interface JwtResponse {
	access_token: string
	refresh_token: string
	expired_in: number
	role: string
	is_two_factor: boolean
}