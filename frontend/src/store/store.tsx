import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { taskListenerMiddleware } from './tasks';
import authReducer from './auth';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        users: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(taskListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
