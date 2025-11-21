import React from 'react';
import { Testimonial } from '../types';
import { QuoteIcon } from './icons/Icons';

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    return (
        <div className="bg-white dark:bg-mono-dark p-6 rounded-xl border border-gray-200/50 dark:border-mono-mid flex flex-col h-full group transition-all duration-300 ease-out-expo hover:shadow-lg dark:hover:shadow-black/50 hover:-translate-y-1 hover:scale-[1.02] relative overflow-hidden">
             {/* Decorative background quote */}
            <div className="absolute top-2 right-4 text-brand-green/10 dark:text-brand-green/5 transform scale-[3] rotate-12 pointer-events-none transition-transform duration-500 ease-out-expo group-hover:rotate-0 group-hover:scale-[3.5]">
                <QuoteIcon className="w-16 h-16" />
            </div>
            
            <QuoteIcon className="w-8 h-8 text-brand-green mb-4 relative z-10" />
            <p className="text-gray-600 dark:text-mono-light text-sm mb-6 flex-grow transition-colors duration-500 relative z-10 italic leading-relaxed">
                "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-4 mt-auto relative z-10">
                <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    loading="lazy" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-mono-mid transition-colors duration-300 group-hover:border-brand-green" 
                />
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-brand-green">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
