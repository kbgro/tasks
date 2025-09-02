export interface ApiResponse {
    statusCode: number;
    message?: string;
    status: string;
    data?: object;
}

export interface User {
    id: number;
    username: string;
}
