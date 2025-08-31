import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasks';
import authReducer from './auth';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        users: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
