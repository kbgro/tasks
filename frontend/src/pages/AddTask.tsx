import Header from '../components/Header';
import Task, { type Mode, type TaskEditItem, type TaskItem } from './Task';

function AddTask() {
    /*const task = {
        id: 1,
        title: 'Dishes',
        description: 'Clean them',
        status: 'Todo',
        priority: 3,
        assignee: 'user',
        assigneeId: 2,
        creator: 'admin',
        creatorId: 1,
        createdAt: '',
    };*/

    const task:TaskEditItem = {
        title: 'Dishes',
        description: 'Clean them',
        status: 'Todo',
        priority: 3,
        assigneeId: 1,
        creatorId: 1,
    };

    return (
        <>
            <Header />
            <Task mode={'New'} task={task} onModeChange={function (mode: Mode): void {}} />
        </>
    );
}

export default AddTask;
