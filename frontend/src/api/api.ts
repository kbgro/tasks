export interface ApiResponse {
    message?: string;
    status: string;
    data?: object;
}

export interface User {
    id: number;
    username: string;
}
