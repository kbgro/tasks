export type TaskState = 'Todo' | 'InProgress' | 'Done';

export type SelectTaskStatusProps = {
    disabled?: boolean;
    error?: string;
    value?: TaskState;
    labelSrOnly?: boolean;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

function SelectTaskStatus({ value, error, disabled, labelSrOnly, onChange }: SelectTaskStatusProps) {
    const colorVariants = {
        label: `text-gray-900`,
        labelError: 'text-red-700',
        input: `${disabled ? '' : 'border border-gray-300 bg-gray-50 text-gray-900'}`,
        inputError: 'border border-red-700 bg-gray-50 text-red-700',
    };

    const taskStatus = ['Todo', 'InProgress', 'Done'];

    return (
        <div>
            <label
                htmlFor="status"
                className={`block mb-2 text-sm font-medium ${error ? colorVariants.labelError : colorVariants.label} ${labelSrOnly ? 'sr-only' : ''}`}
            >
                Status
            </label>
            <select
                id="status"
                name="status"
                className={`text-gray-900 text-sm rounded-lg block w-full py-2.5 p-2.5 ${error ? colorVariants.inputError : colorVariants.input}`}
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                <option>select status</option>
                {taskStatus.map((s, idx) => (
                    <option key={`${s}-${idx}`} value={s}>
                        {s}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectTaskStatus;


