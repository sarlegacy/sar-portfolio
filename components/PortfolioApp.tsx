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
import { ScrollContainerProvider } from './context/ScrollContext';
import AIAssistant from './AIAssistant';
import MobileNavBar from './MobileNavBar';
import { smoothScrollTo } from '../utils/scroll';
import AnimatedBackground from './AnimatedBackground';
import ResumeModal from './ResumeModal';
import FullPageResume from './FullPageResume';

interface PortfolioAppProps {
    theme: Theme;
    onThemeChange: (newTheme: Theme) => void;
}

const PortfolioApp: React.FC<PortfolioAppProps> = ({ theme, onThemeChange }) => {
  const [visibleSection, setVisibleSection] = useState<View>('home');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); 
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isFullResumeOpen, setIsFullResumeOpen] = useState(false);
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

  // Refactored Navigation Logic for unified smooth scrolling
  const handleNavClick = useCallback((view: View) => {
    const section = document.getElementById(view) as HTMLElement | null;
    const container = mainContentRef.current;
    
    if (section && container) {
      const containerRect = container.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      
      // Calculate offset to ensure title isn't flush with top/header
      // Mobile needs more offset due to visual stacking
      const offset = isMobile ? 80 : 30;

      const targetPosition = sectionRect.top - containerRect.top + container.scrollTop - offset;
      
      // Use custom smooth scroll for premium feel on all devices
      smoothScrollTo(container, Math.max(0, targetPosition), 800);
    }
  }, [isMobile]);

  const handleBackToTop = useCallback(() => {
    if (mainContentRef.current) {
      smoothScrollTo(mainContentRef.current, 0, 800);
    } else {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // If Full Resume is open, render that instead
  if (isFullResumeOpen) {
      return <FullPageResume onClose={() => setIsFullResumeOpen(false)} />;
  }

  return (
    <ScrollContainerProvider value={{ scrollContainerRef: mainContentRef }}>
      {/* Main App (Hidden on print) */}
      <div className="print:hidden">
          <AnimatedBackground />

          <div className="bg-gray-100/50 dark:bg-mono-dark/80 p-0 sm:p-1 lg:p-2 rounded-none sm:rounded-3xl w-full transition-colors duration-500 h-[100dvh] sm:h-[95vh] flex flex-col backdrop-blur-sm relative shadow-2xl shadow-black/20">
            {/* Main Card Wrapper */}
            <div className="relative bg-white/80 dark:bg-mono-dark/90 rounded-none sm:rounded-[1.25rem] transition-all duration-500 overflow-hidden h-full flex flex-col border border-white/50 dark:border-white/5 hover:border-brand-green/40 dark:hover:border-brand-green/30 hover:shadow-[0_0_50px_-10px_rgba(160,219,36,0.15)] dark:hover:shadow-[0_0_50px_-10px_rgba(160,219,36,0.1)] group/main">
              
              {/* Header */}
              <header className="relative flex items-center justify-between p-4 sm:px-6 sm:py-5 border-b border-gray-200/50 dark:border-white/5 transition-all duration-500 flex-shrink-0 z-20 bg-white/60 dark:bg-mono-dark/60 backdrop-blur-xl sticky top-0 sm:relative group-hover/main:border-gray-200/80 dark:group-hover/main:border-white/10">
                <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-green rounded-full inline-block animate-pulse"></span>
                    SAR Portfolio
                </h3>
                 <div className="flex items-center gap-4">
                    <nav className="hidden lg:flex items-center gap-1 p-1 bg-gray-100/50 dark:bg-white/5 rounded-full border border-gray-200/50 dark:border-white/5 backdrop-blur-md transition-colors duration-300 hover:border-brand-green/30">
                      <NavLink viewName="home" activeView={visibleSection} onClick={handleNavClick}>Home</NavLink>
                      <NavLink viewName="projects" activeView={visibleSection} onClick={handleNavClick}>Projects</NavLink>
                      <NavLink viewName="experience" activeView={visibleSection} onClick={handleNavClick}>Experience</NavLink>
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
                        <Sidebar 
                            onAboutClick={() => setIsAboutModalOpen(true)} 
                            onViewResume={() => setIsResumeModalOpen(true)}
                        />
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
          <ResumeModal 
            isOpen={isResumeModalOpen} 
            onClose={() => setIsResumeModalOpen(false)} 
            onOpenFull={() => {
                setIsResumeModalOpen(false);
                setIsFullResumeOpen(true);
            }}
          />
          <AIAssistant />
      </div>
    </ScrollContainerProvider>
  );
};

export default PortfolioApp;