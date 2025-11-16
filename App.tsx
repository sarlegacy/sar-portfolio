
import React, { useState, useEffect, useRef } from 'react';
import PortfolioApp from './components/PortfolioApp';

const Logo = () => (
    <div className="flex items-center gap-2 text-gray-500 dark:text-mono-light transition-colors duration-500">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12L12 0L1.44 12L0 10.56L12 21.12L24 10.56L22.56 12Z" />
      </svg>
      <span className="font-display font-bold text-lg tracking-wider">SAR PORTFOLIO</span>
    </div>
)

export type Theme = 'light' | 'dark';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>('dark');
  
  useEffect(() => {
     // Set initial theme based on localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setLoading(false);
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500); 
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`min-h-screen w-full font-sans text-gray-800 dark:text-mono-white flex flex-col items-center justify-start p-4 sm:p-8 transition-opacity duration-500 relative ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <main className="w-full h-full flex-grow flex items-center justify-center">
            <div className="w-full max-w-screen-2xl">
              <PortfolioApp theme={theme} onThemeChange={handleThemeChange} />
            </div>
        </main>
        <footer className="mt-12 flex-shrink-0 flex flex-col items-center gap-2">
          <Logo />
          <p className="text-xs text-gray-500 dark:text-mono-light transition-colors duration-500">
            ALL RIGHTS RESERVED@2025. BUILD & DEVELOPED BY SAIFUL ALAM RAFI
          </p>
        </footer>
    </div>
  );
}