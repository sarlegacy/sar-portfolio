
import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
    service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const Icon = service.icon;
    return (
        <div className="bg-white dark:bg-mono-dark p-6 rounded-xl border border-gray-200/50 dark:border-mono-mid text-center flex flex-col items-center h-full group transition-all duration-300 ease-out-expo hover:-translate-y-2 hover:scale-[1.02] shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-2xl dark:hover:shadow-brand-green/10 hover:border-brand-green/40 relative overflow-hidden">
            {/* Subtle background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 p-3 rounded-full bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-brand-green transition-all duration-300 ease-out-expo group-hover:scale-110 group-hover:rotate-3 group-hover:bg-brand-green group-hover:text-mono-black shadow-sm group-hover:shadow-md">
                    <Icon className="w-8 h-8" />
                </div>
                <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-brand-green/90 dark:group-hover:text-brand-green">{service.title}</h4>
                <p className="text-sm text-gray-600 dark:text-mono-light flex-grow transition-colors duration-300 leading-relaxed">{service.description}</p>
            </div>
        </div>
    );
};

export default ServiceCard;
