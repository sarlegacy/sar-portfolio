
import React, { useRef, useState } from 'react';
import { XIcon, DownloadIcon, ExternalLinkIcon } from './icons/Icons';
import { useFocusTrap } from './hooks/useFocusTrap';
import ResumeTemplate from './ResumeTemplate';
import { profileData } from '../constants';
import { generatePDF } from '../utils/pdfGenerator';

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenFull: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onOpenFull }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    
    useFocusTrap({
        trapRef: modalRef,
        isActive: isOpen,
        onDeactivate: onClose,
        disableBodyScroll: true
    });

    const handleDownload = async () => {
        setIsDownloading(true);
        const safeName = profileData.name.replace(/\s+/g, '_');
        const fileName = `${safeName}_Resume`;

        await generatePDF('resume-print-view', fileName);
        
        setIsDownloading(false);
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-0 sm:p-4 transition-opacity duration-300 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                ref={modalRef}
                className="w-full h-full sm:h-[90vh] max-w-5xl flex flex-col bg-gray-100 dark:bg-black/50 sm:rounded-2xl overflow-hidden relative shadow-2xl animate-stagger-in"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                {/* Toolbar */}
                <div className="flex justify-between items-center p-4 bg-white dark:bg-mono-dark border-b border-gray-200 dark:border-white/10 z-10 flex-shrink-0">
                    <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                        Resume Preview
                        <span className="text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full border border-gray-200 dark:border-white/5">A4 Format</span>
                    </h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onOpenFull}
                            className="hidden sm:flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-brand-green dark:hover:text-brand-green font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
                        >
                            <ExternalLinkIcon />
                            <span>Full View</span>
                        </button>
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="flex items-center gap-2 bg-brand-green text-mono-black font-bold py-2 px-4 rounded-lg hover:brightness-110 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-wait"
                        >
                            <DownloadIcon />
                            <span className="hidden sm:inline">{isDownloading ? 'Generating...' : 'Download PDF'}</span>
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-lg text-gray-600 dark:text-white transition-colors"
                            aria-label="Close preview"
                        >
                            <XIcon />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-grow overflow-y-auto bg-gray-200 dark:bg-[#0f0f0f] p-4 sm:p-8 flex justify-center custom-scrollbar">
                    {/* Resume Container - Scaled to fit nicely */}
                    <div className="origin-top transform transition-transform duration-300 max-w-[210mm] w-full bg-white dark:bg-mono-mid shadow-2xl">
                        <ResumeTemplate />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeModal;
