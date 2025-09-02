import { useDispatch } from 'react-redux';
import Task, { type Mode } from './Task';
import { saveTask } from '../store/tasks';
import { useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router';
import type { TaskRequest, TaskResponse } from '../api/tasks';
import type { AppDispatch } from '../store/store';

function AddTask() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading } = useAppSelector((s) => s.tasks);

    const handleSave = async (task: TaskRequest) => {
        try {
            const res = await dispatch(saveTask(task));
            navigate(`/tasks/${(res.payload as TaskResponse).data.id}`);
        } catch {}
    };

    return (
        <div>
            <h1 className="text-2xl text-center font-medium my-4 text-orange-600">Create Task</h1>
            <Task
                className="mt-4"
                mode={'New'}
                onModeChange={function (mode: Mode): void {}}
                loading={loading}
                onSave={handleSave}
            />
            ;
        </div>
    );
}

export default AddTask;
