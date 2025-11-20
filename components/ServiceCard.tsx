
import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
    service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const Icon = service.icon;
    return (
        <div className="bg-white dark:bg-mono-dark p-6 rounded-xl border border-gray-200/50 dark:border-mono-mid text-center flex flex-col items-center h-full group transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-2xl dark:hover:shadow-black/75 hover:border-brand-green/30 relative overflow-hidden">
            {/* Subtle background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 text-gray-800 dark:text-brand-green transition-transform duration-300 group-hover:scale-110 group-hover:text-brand-green">
                    <Icon className="w-10 h-10" />
                </div>
                <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500">{service.title}</h4>
                <p className="text-sm text-gray-600 dark:text-mono-light flex-grow transition-colors duration-500 leading-relaxed">{service.description}</p>
            </div>
        </div>
    );
};

export default ServiceCard;
