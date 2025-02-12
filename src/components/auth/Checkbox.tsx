import React from 'react';

const Checkbox = ({
    id,
    checked,
    onCheckedChange,
    children
}) => {
    return (
        <label
            htmlFor={id}
            className="flex items-center cursor-pointer relative"
        >
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onCheckedChange(e.target.checked)}
                className="sr-only"
            />
            <div
                className={`w-5 h-5 border rounded transition-colors ${checked
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-transparent border-white/20'
                    }`}
            >
                {checked && (
                    <svg
                        className="w-4 h-4 text-white mx-auto mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                )}
            </div>
            <span className="ml-2">{children}</span>
        </label>
    );
};

export default Checkbox;