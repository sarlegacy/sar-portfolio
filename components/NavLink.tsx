import React from 'react';
import { View } from './PortfolioApp';

interface NavLinkProps {
  viewName: View;
  activeView: View;
  onClick: (view: View) => void;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ viewName, activeView, onClick, children }) => {
  const isActive = activeView === viewName;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick(viewName);
  };

  return (
    <a
      href={`#${viewName}`}
      onClick={handleClick}
      className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-full duration-300 ${isActive ? 'text-mono-black bg-brand-green' : 'text-gray-500 dark:text-mono-light hover:text-gray-900 dark:hover:text-white'}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  );
};

export default React.memo(NavLink);