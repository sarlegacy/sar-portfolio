
import React, { useState, useEffect, useCallback } from 'react';
import PortfolioApp from './components/PortfolioApp';
import { Footer } from './components/Footer';

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

  const handleThemeChange = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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
    <div className={`min-h-screen w-full font-sans text-gray-800 dark:text-mono-white flex flex-col items-center justify-start p-0 sm:p-4 transition-opacity transition-colors duration-500 relative ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <main className="w-full h-full flex-grow flex items-center justify-center">
            <div className="w-full max-w-[1800px]">
              <PortfolioApp theme={theme} onThemeChange={handleThemeChange} />
            </div>
        </main>
        <div className="hidden sm:block">
            <Footer />
        </div>
    </div>
  );
}
