import { FaPlus } from 'react-icons/fa';
import { MdDeleteOutline, MdEdit, MdOutlineFilterList } from 'react-icons/md';
import { useNavigate } from 'react-router';
import SelectTaskStatus from '../components/SelectTaskStatus';
import SelectUser from '../components/SelectUser';
import type { ChangeEvent } from 'react';

function Tasks() {
    const navigate = useNavigate();

    const handleAddTask = () => {
        navigate('/tasks/new');
    };

    const taskData = {
        status: ['Todo', 'InProgress', 'Done'],
        assignees: ['user', 'admin'],
        tasks: [
            {
                id: 1,
                title: 'Dishes',
                description: 'Clean them',
                status: 'Todo',
                priority: 2,
                assignee: 'user',
                creator: 'admin',
                createdAt: '',
            },
            {
                id: 2,
                title: 'Curtain',
                description: 'fix them',
                status: 'Todo',
                priority: 2,
                assignee: 'admin',
                creator: 'admin',
                createdAt: '',
            },
        ],
    };

    return (
        <section className="container mx-auto">
            <div className="flex justify-between items-center my-2">
                <h1 className="text-2xl mb-2.5">Tasks</h1>
                <button
                    type="submit"
                    className="text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center cursor-pointer flex items-center"
                    onClick={handleAddTask}
                >
                    Add Task <FaPlus className="ms-2" />
                </button>
            </div>

            <div id="task-filter" className="my-2 flex items-center space-x-2">
                <MdOutlineFilterList size={22} />
                <SelectTaskStatus labelSrOnly value={undefined} onChange={function (event: ChangeEvent<HTMLSelectElement>): void {}} />
                <SelectUser
                    value={''}
                    label={''}
                    labelSrOnly
                    onChange={function (event: ChangeEvent<HTMLSelectElement>): void {}}
                />
            </div>

            <div id="task-list" className="space-y-2">
                {taskData.tasks.map((task) => (
                    <div
                        className="task-item block p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm w-full "
                        key={task.id}
                    >
                        <div className="flex justify-between items-center">
                            <p>Dishes</p>
                            <div className="space-x-4">
                                <button className="group cursor-pointer shadow p-2 rounded-full hover:bg-orange-600">
                                    <MdEdit size={20} className="text-orange-600 group-hover:text-white" />
                                </button>
                                <button className="group cursor-pointer shadow p-2 rounded-full hover:bg-red-600">
                                    <MdDeleteOutline size={20} className="text-red-600 group-hover:text-white" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">
                                created at: <span>17/05/25 12:45</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Tasks;
