import React from 'react';

export const Logo = () => (
    <div className="flex items-center gap-2 text-gray-500 dark:text-mono-light transition-colors duration-500">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12L12 0L1.44 12L0 10.56L12 21.12L24 10.56L22.56 12Z" />
      </svg>
      <span className="font-display font-bold text-lg tracking-wider">SAR PORTFOLIO</span>
    </div>
);
