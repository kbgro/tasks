import { useState } from "react";
import Header from "../components/Header";
import Task, { type Mode } from "./Task";
import type { TaskState } from "../components/SelectTaskStatus";

function ViewTask() {
    const [mode, setMode] = useState<Mode>("View");

    const task = {
        id: 1,
        title: 'Dishes',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        status: 'Todo',
        priority: 3,
        assignee: 'user',
        assigneeId: 2,
        creator: 'admin',
        creatorId: 1,
        createdAt: '',
    };

    return (
        <>
            <Header />
            <Task mode={mode} task={task} onModeChange={(mode)=>{setMode(mode)}} />
        </>
    );
}

export default ViewTask;
