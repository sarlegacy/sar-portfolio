
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { SunIcon, MoonIcon, ArrowUpIcon } from './icons/Icons';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import AboutMeModal from './AboutMeModal';
import Sidebar from './Sidebar';
import NavLink from './NavLink';
import { Theme } from '../App';
import { View } from '../types';
import { useMultiIntersectionObserver } from './hooks/useIntersectionObserver';
import TrackingPage from './pages/TrackingPage';
import { ScrollContainerProvider } from './context/ScrollContext';
import AIAssistant from './AIAssistant';
import MobileNavBar from './MobileNavBar';
import { smoothScrollTo } from '../utils/scroll';
import AnimatedBackground from './AnimatedBackground';

interface PortfolioAppProps {
    theme: Theme;
    onThemeChange: (newTheme: Theme) => void;
}

const PortfolioApp: React.FC<PortfolioAppProps> = ({ theme, onThemeChange }) => {
  const [visibleSection, setVisibleSection] = useState<View>('home');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); 
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleTheme = useCallback(() => {
    onThemeChange(theme === 'dark' ? 'light' : 'dark');
  }, [theme, onThemeChange]);
  
  const intersectionOptions = useMemo(() => ({
    root: null, 
    threshold: 0.3 
  }), []);

  useMultiIntersectionObserver((entry) => {
    if (entry.isIntersecting) {
      setVisibleSection(entry.target.id as View);
      entry.target.classList.add('is-visible');
    }
  }, intersectionOptions, mainContentRef);


  useEffect(() => {
    const handleScroll = () => {
        if (mainContentRef.current) {
            setShowBackToTop(mainContentRef.current.scrollTop > 300);
        }
    };
    const currentRef = mainContentRef.current;
    currentRef?.addEventListener('scroll', handleScroll);
    return () => currentRef?.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const handleNavClick = useCallback((view: View) => {
    const section = document.getElementById(view) as HTMLElement | null;
    const container = mainContentRef.current;
    if (section && container) {
      const containerRect = container.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const targetPosition = sectionRect.top - containerRect.top + container.scrollTop;
      
      smoothScrollTo(container, targetPosition);
    } else if (isMobile && section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isMobile]);

  const handleBackToTop = useCallback(() => {
    if (mainContentRef.current) {
      smoothScrollTo(mainContentRef.current, 0);
    } else {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <ScrollContainerProvider value={{ scrollContainerRef: mainContentRef }}>
      <AnimatedBackground />

      <div className="bg-gray-100/50 dark:bg-mono-dark/80 p-0 sm:p-1 lg:p-2 rounded-none sm:rounded-3xl w-full transition-colors duration-500 h-[100dvh] sm:h-[95vh] flex flex-col backdrop-blur-sm relative shadow-2xl shadow-black/20">
        {/* Main Card Wrapper */}
        <div className="relative bg-white/80 dark:bg-mono-dark/90 rounded-none sm:rounded-[1.25rem] transition-colors duration-500 overflow-hidden h-full flex flex-col border border-white/50 dark:border-white/5">
          
          {/* Header */}
          <header className="relative flex items-center justify-between p-4 sm:px-6 sm:py-5 border-b border-gray-200/50 dark:border-white/5 transition-colors duration-500 flex-shrink-0 z-20 bg-white/60 dark:bg-mono-dark/60 backdrop-blur-xl sticky top-0 sm:relative">
            <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-green rounded-full inline-block animate-pulse"></span>
                SAR Portfolio
            </h3>
             <div className="flex items-center gap-4">
                <nav className="hidden lg:flex items-center gap-1 p-1 bg-gray-100/50 dark:bg-white/5 rounded-full border border-gray-200/50 dark:border-white/5 backdrop-blur-md">
                  <NavLink viewName="home" activeView={visibleSection} onClick={handleNavClick}>Home</NavLink>
                  <NavLink viewName="projects" activeView={visibleSection} onClick={handleNavClick}>Projects</NavLink>
                  <NavLink viewName="experience" activeView={visibleSection} onClick={handleNavClick}>Experience</NavLink>
                  <NavLink viewName="tracking" activeView={visibleSection} onClick={handleNavClick}>Live Tracking</NavLink>
                  <NavLink viewName="contact" activeView={visibleSection} onClick={handleNavClick}>Contact</NavLink>
                </nav>
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-full text-gray-500 dark:text-mono-light hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 focus:outline-none active:scale-90"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                </button>
            </div>
          </header>

          <div 
            ref={isMobile ? mainContentRef : null}
            className={`grid grid-cols-1 lg:grid-cols-[minmax(280px,25%)_1fr] gap-0 sm:gap-6 lg:gap-8 xl:gap-10 p-0 sm:p-6 flex-grow relative ${isMobile ? 'overflow-y-auto scroll-smooth' : 'overflow-hidden'}`}
          >
            <div className="flex flex-col">
                <div className="w-full max-w-2xl mx-auto lg:max-w-none lg:mx-0 h-full">
                    <Sidebar onAboutClick={() => setIsAboutModalOpen(true)} />
                </div>
            </div>
            <main 
              ref={!isMobile ? mainContentRef : null} 
              className={`relative ${isMobile ? 'h-auto overflow-visible pb-32' : 'h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth pb-6'}`}
            >
                <div className="w-full max-w-5xl mx-auto lg:max-w-none space-y-16 sm:space-y-24">
                  <HomePage />
                  <ProjectsPage />
                  <ExperiencePage />
                  <TrackingPage />
                  <ContactPage />
                </div>
              
              <button
                  onClick={handleBackToTop}
                  className={`fixed ${isMobile ? 'bottom-24 right-4' : 'bottom-8 right-8'} z-30 bg-white/80 dark:bg-mono-mid/80 backdrop-blur-md border border-gray-200 dark:border-mono-mid p-3 rounded-full text-gray-900 dark:text-mono-white hover:bg-brand-green hover:text-mono-black dark:hover:bg-brand-green dark:hover:text-mono-black transition-all duration-300 shadow-lg ${showBackToTop ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}
                  aria-label="Back to top"
              >
                  <ArrowUpIcon className="w-5 h-5" />
              </button>
            </main>
          </div>

          {isMobile && (
            <MobileNavBar visibleSection={visibleSection} onNavClick={handleNavClick} />
          )}

        </div>
      </div>
      <AboutMeModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      <AIAssistant />
    </ScrollContainerProvider>
  );
};

export default PortfolioApp;
