import React from 'react';

/**
 * A reusable logo component for CleanSphere.
 * This centralizes the brand logo for consistency and maintainability.
 * Navigation is handled by a global click listener in `App.tsx`.
 */
const Logo: React.FC = () => (
  <a href="#/" className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m11.314-12.686a2 2 0 012.828 0l1.414 1.414a2 2 0 010 2.828l-1.172 1.172M12 21v-4m0-11V3m0 0a9 9 0 000 18v0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
          </svg>
      </div>
      <span className="text-xl sm:text-2xl font-bold font-heading text-gray-800">CleanSphere</span>
  </a>
);

export default Logo;
