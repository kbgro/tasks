import Input from '../components/Input';
import SelectTaskStatus, { type TaskState } from '../components/SelectTaskStatus';
import SelectUser from '../components/SelectUser';
import { MdEdit } from 'react-icons/md';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export type TaskEditItem = {
    title: string;
    description: string;
    status: TaskState;
    priority: number;
    assigneeId: number;
    creatorId?: number;
};

export type TaskItem = {
    id?: number;
    title: string;
    description: string;
    status: TaskState;
    priority: number;
    assignee?: string;
    assigneeId: number;
    creator?: string;
    creatorId?: number;
    createdAt: string;
};

export type Mode = 'New' | 'Edit' | 'View';
export type TaskProps = {
    mode: Mode;
    task: TaskEditItem;
    onModeChange?: (mode: Mode) => void;
};

const TaskSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    status: Yup.mixed<'Todo' | 'InProgress' | 'Done'>().oneOf(['Todo', 'InProgress', 'Done'], 'Invalid task state'),
    priority: Yup.number().positive().required('Required'),
    assigneeId: Yup.number().positive().required('Required'),
    creatorId: Yup.number().positive().required('Required'),
});

function Task({ task, mode, onModeChange }: TaskProps) {
    const formik = useFormik<TaskEditItem>({
        validationSchema: TaskSchema,
        initialValues: {
            title: task.title,
            description: task.description,
            status: task.status || 'Todo',
            priority: task.priority,
            assigneeId: task.assigneeId,
            creatorId: task.creatorId,
        },
        onSubmit: (values) => {
            console.log({ values });
        },
    });

    const handleModeChange = (newMode: Mode) => {
        onModeChange?.(newMode);
    };

    const handleTaskSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (mode == 'Edit') {
            handleModeChange('View');
        }
    };

    return (
        <div className="sm:w-full md:w-2/3 lg:w-1/2 mx-auto">
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
                <div className="bg-white rounded-lg shadow ">
                    <div className="p-6 space-y-4">
                        <Input
                            label={'Title'}
                            type={'text'}
                            id={'title'}
                            name={'title'}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.errors.title}
                            disabled={mode == 'View'}
                        />

                        <Input
                            label={'Description'}
                            type={'textarea'}
                            id={'description'}
                            name={'description'}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.errors.description}
                            disabled={mode == 'View'}
                        />

                        <SelectTaskStatus
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            disabled={mode == 'View'}
                            error={formik.errors.status}
                        />

                        <SelectUser
                            label={'Assignee'}
                            value={formik.values.assigneeId}
                            onChange={formik.handleChange}
                            disabled={mode == 'View'}
                            error={formik.errors.assigneeId}
                        />

                        <Input
                            label={'Priority'}
                            type={'number'}
                            id={'priority'}
                            name={'priority'}
                            value={formik.values.priority}
                            onChange={formik.handleChange}
                            error={formik.errors.priority}
                            disabled={mode == 'View'}
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-2 space-x-4">
                    {mode == 'View' && (
                        <button
                            type="button"
                            className="text-white bg-orange-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-1.5 text-center cursor-pointer hover:shadow-md flex items-center space-x-2"
                            onClick={() => handleModeChange('Edit')}
                        >
                            <span>Edit</span>
                            <MdEdit size={16} className="" />
                        </button>
                    )}
                    {mode == 'Edit' && (
                        <button
                            type="button"
                            className="text-black bg-white hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-1.5 text-center cursor-pointer hover:shadow-md"
                            onClick={() => handleModeChange('View')}
                        >
                            Cancel
                        </button>
                    )}
                    {(mode == 'Edit' || mode == 'New') && (
                        <button
                            type="submit"
                            className="text-white bg-orange-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-1.5 text-center cursor-pointer hover:shadow-md"
                        >
                            Save
                        </button>
                    )}
                </div>
            </form>
            {}
        </div>
    );
}

export default Task;
