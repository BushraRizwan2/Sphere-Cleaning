import React from 'react';

interface MediaDisplayProps {
  src: string;
  alt: string;
  className?: string;
}

const MediaDisplay: React.FC<MediaDisplayProps> = ({ src, alt, className }) => {
  // Defensively check if src is a valid, non-empty string.
  if (typeof src !== 'string' || !src) {
    // If src is missing, null, undefined, or empty, render a placeholder.
    // This prevents crashes from trying to call methods on non-strings and avoids broken image icons.
    return (
      <div className={`${className || ''} bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center`}>
        <span className="text-gray-500 text-xs p-2 text-center" aria-label={alt}>
          Image missing
        </span>
      </div>
    );
  }

  // Now we know src is a valid string, we can safely call methods on it.
  if (src.startsWith('data:video/')) {
    return <video src={src} className={className} autoPlay loop muted playsInline aria-label={alt} />;
  }
  
  return <img src={src} alt={alt} className={className} loading="lazy" />;
};

export default MediaDisplay;