
import React, { useState, useCallback } from 'react';
import type { NavLink, SiteConfig } from '../types';
import Logo from './Logo';

interface HeaderProps {
    isAdmin: boolean;
    isEditorOpen: boolean;
    onLogout: () => void;
    onAdminLoginClick: () => void;
    onToggleEditor: () => void;
    siteConfig: SiteConfig;
}

const Header: React.FC<HeaderProps> = ({ isAdmin, isEditorOpen, onLogout, onAdminLoginClick, onToggleEditor, siteConfig }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navLinks, headerBackgroundColor } = siteConfig;
  
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-[60] shadow-sm" style={{ backgroundColor: headerBackgroundColor }}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
        <Logo />

        <nav className="hidden lg:flex space-x-8">
          {navLinks.map((link: NavLink) => (
            <a key={link.id} href={link.href} className="text-gray-600 font-medium hover:text-primary transition-colors duration-300">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
            <a href="#appointment" className="hidden sm:inline-block bg-secondary text-primary font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-sm transform hover:scale-105">
                Appointment
            </a>
            {isAdmin && (
               <button onClick={onToggleEditor} className={`hidden lg:flex font-bold py-2 px-4 rounded-full text-sm transition-all duration-300 ${isEditorOpen ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
                   {isEditorOpen ? 'Close Editor' : 'Edit Site'}
               </button>
            )}
            {isAdmin ? (
                <button onClick={onLogout} title="Logout" aria-label="Logout" className="hidden lg:flex bg-red-600 text-white font-medium p-2 rounded-full hover:bg-red-700 transition-all duration-300 shadow-sm">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414l-2 2a1 1 0 000 1.414l2 2zM9 10a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" clipRule="evenodd" />
                   </svg>
                </button>
            ): (
                 <button onClick={onAdminLoginClick} title="Admin Login" aria-label="Admin Login" className="hidden lg:flex text-gray-600 hover:text-primary transition-colors duration-300 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </button>
            )}
        
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-primary focus:outline-none" aria-controls="mobile-menu" aria-expanded={isMenuOpen}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="lg:hidden shadow-lg absolute top-full left-0 w-full" style={{ backgroundColor: headerBackgroundColor }}>
          <nav className="flex flex-col items-center space-y-4 py-4 px-6">
            {navLinks.map((link: NavLink) => (
              <a key={link.id} href={link.href} onClick={closeMenu} className="text-gray-600 hover:text-primary transition-colors duration-300">
                {link.name}
              </a>
            ))}
            <a href="#appointment" onClick={closeMenu} className="bg-secondary text-primary font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-sm w-full text-center">
                Appointment
            </a>
             {isAdmin && (
               <button onClick={() => { onToggleEditor(); closeMenu(); }} className={`font-bold py-2 px-4 rounded-lg text-sm transition-all duration-300 w-full ${isEditorOpen ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
                   {isEditorOpen ? 'Close Editor' : 'Edit Site'}
               </button>
            )}
            {isAdmin ? (
                <button onClick={() => { onLogout(); closeMenu(); }} className="bg-red-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-sm w-full">
                    Logout
                </button>
            ) : (
                 <button onClick={() => { onAdminLoginClick(); closeMenu(); }} className="text-gray-600 hover:text-primary transition-colors duration-300 py-2 w-full flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Admin Login</span>
                </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;