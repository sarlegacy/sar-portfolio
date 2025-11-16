import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, XIcon, ArrowUpIcon, SunIcon, MoonIcon } from './icons/Icons';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import AboutMeModal from './AboutMeModal';
import Sidebar from './Sidebar';
import NavLink from './NavLink';
import { Theme } from '../App';

export type View = 'home' | 'projects' | 'experience' | 'contact';

interface PortfolioAppProps {
    theme: Theme;
    onThemeChange: (newTheme: Theme) => void;
}

const PortfolioApp: React.FC<PortfolioAppProps> = ({ theme, onThemeChange }) => {
  const [visibleSection, setVisibleSection] = useState<View>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    onThemeChange(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id as View);
            if (!entry.target.classList.contains('is-visible')) {
              entry.target.classList.add('is-visible');
            }
          }
        });
      },
      {
        root: mainContentRef.current,
        threshold: 0.5, 
      }
    );
     const currentRef = mainContentRef.current;
    if (!currentRef) return;

    const sections = currentRef.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
        if (mainContentRef.current) {
            setShowBackToTop(mainContentRef.current.scrollTop > 200);
        }
    };

    const currentRef = mainContentRef.current;
    currentRef?.addEventListener('scroll', handleScroll);
    return () => currentRef?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: View) => {
    document.getElementById(view)?.scrollIntoView({ behavior: 'smooth' });
    if(isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleBackToTop = () => {
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <>
      <div className="bg-white/60 dark:bg-mono-dark/60 backdrop-blur-xl p-0.5 rounded-2xl w-full shadow-2xl shadow-black/50 transition-colors duration-500">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-mono-white dark:to-mono-light rounded-2xl animate-border-glow blur opacity-20"></div>
        <div className="relative bg-gray-50/80 dark:bg-mono-dark/80 rounded-2xl transition-colors duration-500">
          <header className="relative flex items-center justify-between p-4 border-b border-gray-200 dark:border-mono-mid/30 transition-colors duration-500">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-500">Portfolio</h3>
             <div className="flex items-center gap-2">
                <nav className="hidden md:flex items-center gap-2">
                  <NavLink viewName="home" activeView={visibleSection} onClick={handleNavClick}>Home</NavLink>
                  <NavLink viewName="projects" activeView={visibleSection} onClick={handleNavClick}>Projects</NavLink>
                  <NavLink viewName="experience" activeView={visibleSection} onClick={handleNavClick}>Experience</NavLink>
                  <NavLink viewName="contact" activeView={visibleSection} onClick={handleNavClick}>Contact</NavLink>
                </nav>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-500 dark:text-mono-light hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-mono-mid transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                </button>
                <button className="md:hidden text-gray-500 dark:text-mono-light" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle mobile menu">
                  {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
                </button>
            </div>
          </header>

          {isMobileMenuOpen && (
            <nav className="relative md:hidden flex flex-col items-center gap-4 p-4 border-b border-gray-200 dark:border-mono-mid/30 transition-colors duration-500">
              <NavLink viewName="home" activeView={visibleSection} onClick={handleNavClick}>Home</NavLink>
              <NavLink viewName="projects" activeView={visibleSection} onClick={handleNavClick}>Projects</NavLink>
              <NavLink viewName="experience" activeView={visibleSection} onClick={handleNavClick}>Experience</NavLink>
              <NavLink viewName="contact" activeView={visibleSection} onClick={handleNavClick}>Contact</NavLink>
            </nav>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
            <div className="lg:col-span-1">
                <Sidebar onAboutClick={() => setIsAboutModalOpen(true)} />
            </div>
            <main 
              ref={mainContentRef} 
              className="lg:col-span-3 h-[calc(100vh-19rem)] sm:h-[calc(100vh-21rem)] overflow-y-scroll snap-y snap-mandatory scroll-smooth relative"
            >
              <HomePage />
              <ProjectsPage />
              <ExperiencePage />
              <ContactPage />

               {showBackToTop && (
                <button
                    onClick={handleBackToTop}
                    className="absolute bottom-4 right-4 z-20 bg-gray-300/70 dark:bg-mono-mid/70 backdrop-blur-sm p-3 rounded-full text-gray-800 dark:text-mono-white hover:bg-gray-800 hover:text-white dark:hover:bg-mono-white dark:hover:text-mono-black transition-all duration-300 animate-fade-in"
                    aria-label="Back to top"
                >
                    <ArrowUpIcon className="w-5 h-5" />
                </button>
              )}
            </main>
          </div>
        </div>
      </div>
      <AboutMeModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </>
  );
};

export default PortfolioApp;