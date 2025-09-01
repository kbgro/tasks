import { FaPlus } from 'react-icons/fa';
import { MdDeleteOutline, MdEdit, MdOutlineFilterList } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router';
import SelectTaskStatus from '../components/SelectTaskStatus';
import SelectUser from '../components/SelectUser';
import { useEffect, type ChangeEvent } from 'react';
import { useAppSelector } from '../store/hooks';
import { useDispatch } from 'react-redux';
import { deleteTask, fetchTasks, filterTasks } from '../store/tasks';
import type { AppDispatch } from '../store/store';
import type { TaskState } from '../api/tasks';

function Tasks() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, filter } = useAppSelector((s) => s.tasks);

    const handleDeleteTask = async (taskId: number) => {
        dispatch(deleteTask(taskId));
    };

    const handleAddTask = () => {
        navigate('/tasks/new');
    };

    useEffect(() => {
        dispatch(fetchTasks(filter));
    }, []);

    return (
        <section className="container mx-auto">
            <div className="flex justify-between items-center my-2">
                <h1 className="text-2xl mb-2.5">Tasks</h1>
                <button
                    type="submit"
                    className="text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-1.5 text-center cursor-pointer flex items-center"
                    onClick={handleAddTask}
                >
                    Add Task <FaPlus className="ms-2" />
                </button>
            </div>

            <div id="task-filter" className="my-2 flex items-center space-x-2">
                <MdOutlineFilterList size={22} />
                <SelectTaskStatus
                    labelSrOnly
                    value={filter.status as TaskState}
                    onChange={function (event: ChangeEvent<HTMLSelectElement>): void {
                        dispatch(filterTasks({ ...filter, status: event.target.value }));
                    }}
                />
                <SelectUser
                    value={filter.assignee}
                    label={'Assignee'}
                    labelSrOnly
                    onChange={function (event: ChangeEvent<HTMLSelectElement>): void {
                        dispatch(filterTasks({ ...filter, assignee: event.target.value }));
                    }}
                />
            </div>

            <div id="task-list" className="space-y-2">
                {tasks &&
                    tasks.map((task) => (
                        <div
                            className="task-item block p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm w-full "
                            key={task.id}
                        >
                            <div className="flex justify-between items-center">
                                <p>{task.title}</p>
                                <div className="space-x-4 flex">
                                    <NavLink
                                        to={`/tasks/${task.id}/edit`}
                                        className={
                                            'group block cursor-pointer shadow p-2 rounded-full hover:bg-orange-600'
                                        }
                                    >
                                        <MdEdit size={20} className="text-orange-600 group-hover:text-white" />
                                    </NavLink>

                                    <button
                                        onClick={() => handleDeleteTask(task.id as number)}
                                        className="group cursor-pointer shadow p-2 rounded-full hover:bg-red-600"
                                    >
                                        <MdDeleteOutline size={20} className="text-red-600 group-hover:text-white" />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">
                                    created at: <span>{new Date(task.createdAt).toLocaleString()}</span>
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
}

export default Tasks;
