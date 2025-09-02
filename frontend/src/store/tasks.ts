import { createAsyncThunk, createListenerMiddleware, type PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import TaskAPI, { type TaskItem, type TaskRequest } from '../api/tasks';
import type { ApiResponse } from '../api/api';
import { fetchUsers, login, logout } from './auth';

export interface TaskUpdate {
    id: number;
    data: TaskRequest;
}

export interface TaskFilter {
    status: string;
    assignee: string;
}

interface taskState {
    tasks: Array<TaskItem>;
    task?: TaskItem;
    loading: boolean;
    api?: ApiResponse;
    filter: TaskFilter;
}

const initialState: taskState = {
    filter: { assignee: '', status: '' },
    loading: false,
    tasks: [],
};

export const fetchTask = createAsyncThunk('api/tasks/{id}', async (taskId: number, { dispatch }) => {
    const response = await TaskAPI.GetTask(taskId);
    if (response.statusCode == 401) dispatch(logout());
    return response;
});

export const fetchTasks = createAsyncThunk('api/tasks?', async (taskFilter: TaskFilter, { dispatch }) => {
    const response = await TaskAPI.FilterTasks(taskFilter.status, taskFilter.assignee);
    if (response.statusCode == 401) dispatch(logout());
    return response;
});

export const saveTask = createAsyncThunk('api/tasks', async (taskRequest: TaskRequest, { dispatch }) => {
    const response = await TaskAPI.SaveTask(taskRequest);
    if (response.statusCode == 401) dispatch(logout());
    return response;
});

export const updateTask = createAsyncThunk('api/tasks/update', async (taskUpdate: TaskUpdate, { dispatch }) => {
    const response = await TaskAPI.UpdateTask(taskUpdate.id, taskUpdate.data);
    if (response.statusCode == 401) dispatch(logout());
    return response;
});

export const deleteTask = createAsyncThunk('api/tasks/delete', async (taskId: number, { dispatch }) => {
    const response = await TaskAPI.DeleteTask(taskId);
    if (response.statusCode == 401) dispatch(logout());
    return response;
});

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        filterTasks: (state, action: PayloadAction<TaskFilter>) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action.payload.data;
            state.loading = false;
        });

        builder.addCase(fetchTasks.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(saveTask.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(saveTask.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(saveTask.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(fetchTask.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchTask.fulfilled, (state, action) => {
            state.task = action.payload.data;
            state.loading = false;
        });

        builder.addCase(fetchTask.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(updateTask.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(updateTask.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(updateTask.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { filterTasks } = taskSlice.actions;

export const taskListenerMiddleware = createListenerMiddleware();

taskListenerMiddleware.startListening({
    actionCreator: saveTask.fulfilled,
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState();
        listenerApi.dispatch(fetchTasks(state.tasks.filter));
    },
});

taskListenerMiddleware.startListening({
    actionCreator: updateTask.fulfilled,
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState();
        listenerApi.dispatch(fetchTasks(state.tasks.filter));
    },
});

taskListenerMiddleware.startListening({
    actionCreator: deleteTask.fulfilled,
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState();
        listenerApi.dispatch(fetchTasks(state.tasks.filter));
    },
});

taskListenerMiddleware.startListening({
    actionCreator: login.fulfilled,
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState();
        listenerApi.dispatch(fetchTasks(state.tasks.filter));
        listenerApi.dispatch(fetchUsers());
    },
});

taskListenerMiddleware.startListening({
    actionCreator: filterTasks,
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState();
        listenerApi.dispatch(fetchTasks(state.tasks.filter));
    },
});

export default taskSlice.reducer;
