import React from 'react';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    id: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({ label, id, className = '', ...props }) => {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
                {label}
            </label>
            <textarea
                id={id}
                className={`w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl p-3.5 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20 resize-none ${className}`}
                {...props}
            />
        </div>
    );
};

export default FormTextarea;