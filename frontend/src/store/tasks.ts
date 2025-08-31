import { createSlice } from '@reduxjs/toolkit';

export type TaskState = 'Todo' | 'InProgress' | 'Done';

export interface Task {
    id?: number;
    title: string;
    description: string;
    status: TaskState;
    priority: number;
    assigneeId: number;
    creatorId?: number;
    createdAt: string;
};


interface taskState {
    tasks: Array<Task>;
}

const initialState: taskState = {
    tasks: [],
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
});

export default taskSlice.reducer;
