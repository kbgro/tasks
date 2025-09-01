import type { ApiResponse, User } from "./api";

const API_URL = 'https://localhost:7230/api'


export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}


export interface LoginResponse extends ApiResponse {
    data: { access_token: string };
}

export interface UserResponse extends ApiResponse {
    data: User[];
}

export async function Users(): Promise<UserResponse> {
    const res = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });

    const data = await res.json();

    return { message: data.message, status: res.status == 200 ? 'success' : 'failed', data: data };
}

export async function Register(registerRequest: RegisterRequest): Promise<ApiResponse> {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerRequest),
    });

    const data = await res.json();

    return { message: data.message, status: res.status == 200 ? 'success' : 'failed' };
}

export async function Login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginRequest),
    });

    const data = await res.json();

    return {
        message: data.message,
        status: res.status == 200 ? 'success' : 'failed',
        data: { access_token: data.access_token },
    };
}

export default {
    Register,
    Login,
    Users,
};
