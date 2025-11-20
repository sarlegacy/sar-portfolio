import React from 'react';
import { Logo } from './Logo';

export const Footer = () => (
    <footer className="mt-12 flex-shrink-0 flex flex-col items-center gap-2">
      <Logo />
      <p className="text-xs text-gray-500 dark:text-mono-light transition-colors duration-500">
        ALL RIGHTS RESERVED@2025. BUILD & DEVELOPED BY SAIFUL ALAM RAFI
      </p>
    </footer>
);
