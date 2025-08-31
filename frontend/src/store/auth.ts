import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPI, { type ApiResponse, type LoginRequest, type RegisterRequest, type User } from '../api/auth';


interface AuthState {
    loading: boolean;
    loggedIn: boolean;
    accessToken: string;
    api?: ApiResponse;
    users: Array<User>;
}

const initialState: AuthState = {
    loading: false,
    loggedIn: false,
    accessToken: '',
    api: undefined,
    users: [],
};

export const login = createAsyncThunk('auth/login', async (loginRequest: LoginRequest) => {
    const response = await authAPI.Login(loginRequest);
    console.log({response});
    return response;
});

export const register = createAsyncThunk('auth/register', async (registerRequest: RegisterRequest) => {
    const response = await authAPI.Register(registerRequest);
    return response;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.accessToken = action.payload.data.access_token;
            state.loading = false;
            state.loggedIn = true;
            state.api = action.payload;
        });

        builder.addCase(login.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(register.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(register.fulfilled, (state, action) => {
            state.api = action.payload;
            state.loading = false;
        });

        builder.addCase(register.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default authSlice.reducer;
