import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../store/auth';
import type { AppDispatch } from '../store/store';

export type SelectUserProps = {
    value: string | number;
    label: string;
    disabled?: boolean;
    labelSrOnly?: boolean;
    error?: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

function SelectUser({ label, error, disabled, value, labelSrOnly, onChange }: SelectUserProps) {
    const users = useAppSelector((s) => s.users.users);
    const dispatch = useDispatch<AppDispatch>();
    const colorVariants = {
        label: `text-gray-900`,
        labelError: 'text-red-700',
        input: `${disabled ? '' : 'border border-gray-300 bg-gray-50 text-gray-900'}`,
        inputError: 'border border-red-700 bg-gray-50 text-red-700',
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <div>
            <label
                htmlFor="assigneeId"
                className={`block mb-2 text-sm font-medium ${error ? colorVariants.labelError : colorVariants.label} ${labelSrOnly ? 'sr-only' : ''}`}
            >
                {label}
            </label>
            <select
                id="assigneeId"
                name="assigneeId"
                className={`text-gray-900 text-sm rounded-lg block w-full py-2.5 p-2.5 ${error ? colorVariants.inputError : colorVariants.input}`}
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                <option value={""}>select {label.toLowerCase()}</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.username}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectUser;
