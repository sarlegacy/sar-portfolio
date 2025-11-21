import React, { useState } from 'react';
import ResumeTemplate from './ResumeTemplate';
import { DownloadIcon, HomeIcon } from './icons/Icons';
import AnimatedBackground from './AnimatedBackground';
import { profileData } from '../constants';
import { generatePDF } from '../utils/pdfGenerator';

interface FullPageResumeProps {
    onClose: () => void;
}

const FullPageResume: React.FC<FullPageResumeProps> = ({ onClose }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        const safeName = profileData.name.replace(/\s+/g, '_');
        const fileName = `${safeName}_Resume`;

        await generatePDF('resume-print-view', fileName);
        
        setIsDownloading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-gray-50 dark:bg-neutral-900 overflow-auto animate-fade-in flex flex-col">
            <AnimatedBackground />
            
            {/* Toolbar */}
            <div className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 p-4 flex justify-between items-center z-50 print:hidden">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={onClose}
                        className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-brand-green dark:hover:text-brand-green transition-colors bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-lg"
                    >
                        <HomeIcon className="w-4 h-4" />
                        <span>Back to Portfolio</span>
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="flex items-center gap-2 bg-brand-green text-mono-black font-bold py-2 px-6 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-brand-green/20 text-sm disabled:opacity-50 disabled:cursor-wait"
                    >
                        <DownloadIcon />
                        <span>{isDownloading ? 'Saving...' : 'Download PDF'}</span>
                    </button>
                </div>
            </div>

            {/* Content Wrapper */}
            <div className="flex-grow pt-24 pb-12 px-4 flex justify-center">
                <div className="w-full max-w-[210mm] animate-stagger-in" style={{ animationDuration: '0.5s' }}>
                    <div className="bg-white dark:bg-neutral-800 shadow-2xl rounded-xl overflow-hidden transform transition-all">
                        <ResumeTemplate />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullPageResume;