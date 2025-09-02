import type { ApiResponse, User } from './api';

const API_URL = 'https://localhost:7230/api';

export type TaskState = 'Todo' | 'InProgress' | 'Done';

export interface TaskRequest {
    id?: number;
    title: string;
    description: string;
    status: TaskState;
    priority: number;
    assigneeId: number;
}

export interface TaskItem {
    id?: number;
    title: string;
    description: string;
    status: TaskState;
    priority: number;
    assigneeId: number;
    creatorId?: number;
    createdAt: string;
    updatedAt: string;
    assignee: User;
    creator: User;
}

export interface TaskResponse extends ApiResponse {
    data: TaskItem;
}

export interface TasksResponse extends ApiResponse {
    data: TaskItem[];
}

async function FilterTasks(status: string, assignee: string): Promise<TasksResponse> {
    const res = await fetch(`${API_URL}/tasks?status=${status}&assignee=${assignee}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });

    let data;
    if (res.ok) data = await res.json();

    return {
        message: data.message,
        status: res.ok ? 'success' : 'failed',
        data: data,
        statusCode: res.status,
    };
}

async function SaveTask(task: TaskRequest): Promise<TaskResponse> {
    const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(task),
    });

    let data;
    if (res.ok) data = await res.json();

    return {
        message: data.message,
        status: res.ok ? 'success' : 'failed',
        data: data,
        statusCode: res.status,
    };
}

async function GetTask(taskId: number): Promise<TaskResponse> {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });

    let data;
    if (res.ok) data = await res.json();

    return {
        message: data.message,
        status: res.ok ? 'success' : 'failed',
        data: data,
        statusCode: res.status,
    };
}

async function UpdateTask(taskId: number, task: TaskRequest): Promise<TaskResponse> {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(task),
    });

    let data;
    if (res.ok) data = await res.json();

    return {
        message: data.message,
        status: res.ok ? 'success' : 'failed',
        data: data,
        statusCode: res.status,
    };
}

async function DeleteTask(taskId: number): Promise<ApiResponse> {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });

    return {
        message: '',
        status: res.ok ? 'success' : 'failed',
        statusCode: res.status,
    };
}

export const TaskAPI = { FilterTasks, SaveTask, GetTask, UpdateTask, DeleteTask };

export default TaskAPI;
