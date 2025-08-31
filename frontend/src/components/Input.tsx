export type InputProps = {
    label: string;
    type: React.HTMLInputTypeAttribute | 'textarea';
    id: string;
    name: string;
    className?: string | undefined;
    value: string | number | undefined;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error?: string | undefined;
    disabled?: boolean;
};

function Input({ label, disabled, className, type, id, name, value, error, onChange }: InputProps) {
    const colorVariants = {
        label: `text-gray-900 `,
        labelError: 'text-red-700',
        input: `${disabled? 'bg-white' : 'border border-gray-300 bg-gray-50 text-gray-900'}`,
        inputError: 'border border-red-700 bg-gray-50 text-red-700',
    };

    return (
        <div className={className}>
            <label
                htmlFor={id}
                className={`block mb-2 text-sm font-medium ${error ? colorVariants.labelError : colorVariants.label}`}
            >
                {label}
            </label>
            {type == 'textarea' ? (
                <textarea
                    name={name}
                    id={id}
                    className={`rounded-lg block w-full p-2.5 ${error ? colorVariants.inputError : colorVariants.input}`}
                    rows={4}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={'Enter description ...'}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    id={id}
                    className={`rounded-lg block w-full p-2.5 ${error ? colorVariants.inputError : colorVariants.input}`}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            )}
            <p>{error && <span className={`text-sm ${colorVariants.labelError}`}>{error}</span>}</p>
        </div>
    );
}

export default Input;
