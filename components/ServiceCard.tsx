import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
    service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const Icon = service.icon;
    return (
        <div className="bg-gray-100 dark:bg-mono-dark p-6 rounded-xl border border-gray-200 dark:border-mono-mid text-center flex flex-col items-center h-full group transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-2xl dark:hover:shadow-black/75">
            <div className="mb-4 text-gray-800 dark:text-brand-green transition-transform duration-300 group-hover:scale-110">
                <Icon className="w-10 h-10" />
            </div>
            <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500">{service.title}</h4>
            <p className="text-sm text-gray-600 dark:text-mono-light flex-grow transition-colors duration-500">{service.description}</p>
        </div>
    );
};

export default ServiceCard;