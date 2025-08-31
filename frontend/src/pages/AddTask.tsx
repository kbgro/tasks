import Task, { type Mode, type TaskEditItem, type TaskItem } from './Task';

function AddTask() {

    return (
        <div>
            <h1 className="text-2xl text-center font-medium my-4 text-orange-600">Create Task</h1>
            <Task
                className="mt-4"
                mode={'New'}
                onModeChange={function (mode: Mode): void {}}
                onSave={(task) => console.log({ task })}
            />
            ;
        </div>
    );
}

export default AddTask;
