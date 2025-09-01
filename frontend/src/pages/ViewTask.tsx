import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router';
import { fetchTask } from '../store/tasks';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import type { TaskItem } from '../api/tasks';

function ViewTask() {
    const [task, setTask] = useState<TaskItem>();
    const dispatch = useDispatch<AppDispatch>();
    const { id: taskId } = useParams();

    useEffect(() => {
        dispatch(fetchTask(Number(taskId)))
            .unwrap()
            .then((res) => {
                setTask(res.data);
            });
    }, []);

    const handleDeleteTask = () => {};

    return (
        <div>
            <section className="container mx-auto">
                {task && (
                    <>
                        <div className="flex justify-end items-center py-2">
                            <div className="space-x-4 flex">
                                <NavLink
                                    to={`/tasks/${task.id}/edit`}
                                    className={'group block cursor-pointer shadow p-2 rounded-full hover:bg-orange-600'}
                                >
                                    <MdEdit size={20} className="text-orange-600 group-hover:text-white" />
                                </NavLink>

                                <button
                                    onClick={handleDeleteTask}
                                    className="group cursor-pointer shadow p-2 rounded-full hover:bg-red-600"
                                >
                                    <MdDeleteOutline size={20} className="text-red-600 group-hover:text-white" />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between my-2 space-x-4">
                            <div className="space-y-4 w-2/3">
                                <p className="bg-white w-full shadow p-2 rounded-lg text-center font-bold">
                                    {task.title}
                                </p>
                                <div className="bg-white p-3 w-full rounded-lg">
                                    <p>{task.description}</p>
                                </div>
                                <div className="text-sm text-gray-700 flex justify-between">
                                    <p>
                                        Created: <span>{new Date(task.createdAt).toLocaleString()}</span>
                                    </p>
                                    <p>
                                        Edited: <span>{new Date(task?.updatedAt).toLocaleString()}</span>
                                    </p>
                                </div>
                            </div>
                            {task.assignee && task.creator && (
                                <div className="w-1/3 bg-white p-4 rounded-lg space-y-4">
                                    <div>
                                        <div className="font-bold pb-2">Status</div>
                                        <button className="bg-gray-200 text-black font-bold p-2 px-5 w-full rounded-lg">
                                            {task.status}
                                        </button>
                                    </div>
                                    <div>
                                        <div className="font-bold pb-2">Assignee</div>
                                        <button className="bg-orange-300 text-black font-bold p-2 px-5 w-full rounded-lg">
                                            {task.assignee.username}
                                        </button>
                                    </div>
                                    <div>
                                        <div className="font-bold pb-2">Creator</div>
                                        <button className="bg-orange-600 text-white font-bold p-2 px-5 w-full rounded-lg">
                                            {task.creator.username}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}

export default ViewTask;
