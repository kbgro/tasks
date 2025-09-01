import { useEffect, useState } from 'react';
import Task, { type Mode } from './Task';
import { useAppSelector } from '../store/hooks';
import { useLocation, useNavigate, useParams } from 'react-router';
import { fetchTask, updateTask } from '../store/tasks';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';

function EditTask() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [mode, setMode] = useState<Mode>('View');
    const { id: taskId } = useParams();
    const { loading, task} = useAppSelector((s) => s.tasks);

    useEffect(() => {
        dispatch(fetchTask(Number(taskId)));
        if (pathname.includes('edit')) setMode('Edit');
    }, []);

    return (
        <div>
            <h1 className="text-2xl text-center font-medium my-4 text-orange-600">Edit Task</h1>
            {task && (
                <Task
                    className="mt-4"
                    mode={mode}
                    onModeChange={(m: Mode) => {
                        setMode(m);
                    }}
                    task={task}
                    loading={loading}
                    onUpdate={(newTask) => {
                        dispatch(updateTask({ id: Number(taskId), data: newTask }));
                        navigate(`/tasks/${task?.id}`);
                    }}
                />
            )}
        </div>
    );
}

export default EditTask;
