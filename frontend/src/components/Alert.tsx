export type AlertProps = {
    message: string;
    variant: AlertVariant;
};

export type AlertVariant = 'Info' | 'Danger' | 'Success' | 'Warning' | 'Default';

function Alert({ message, variant }: AlertProps) {
    const colorVariants = {
        Info: 'text-blue-800',
        Danger: 'text-red-800',
        Success: 'text-green-800',
        Warning: 'text-yellow-800',
        Default: 'text-gray-800',
    };

    return (
        <div className={`w-full p-4 mb-4 text-sm rounded-lg bg-white ${colorVariants[variant]}`} role="alert">
            {message}
        </div>
    );
}

export default Alert;
