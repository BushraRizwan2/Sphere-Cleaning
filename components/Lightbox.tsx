import React, { useEffect, useRef } from 'react';
import MediaDisplay from './MediaDisplay';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, onPrev, onNext, onSelect }) => {
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeThumbnail = thumbnailContainerRef.current.children[currentIndex] as HTMLElement;
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [currentIndex]);


  return (
    <div
      className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center p-0 transition-opacity duration-300 ease-in-out animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-opacity z-20 p-2 bg-black/30 rounded-full"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      {/* Main Image Viewer */}
      <div className="relative w-full flex-grow flex items-center justify-center overflow-hidden p-4" onClick={(e) => e.stopPropagation()}>
         <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="block max-w-full max-h-full object-contain rounded-lg shadow-2xl"
         />

        {/* Prev/Next Buttons */}
        <button
          className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:bg-black/30 p-3 rounded-full transition-all z-10"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:bg-black/30 p-3 rounded-full transition-all z-10"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div
        className="flex-shrink-0 h-[100px] w-full bg-black/30 backdrop-blur-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={thumbnailContainerRef} className="h-full w-full overflow-x-auto flex items-center justify-start sm:justify-center px-4 space-x-3 whitespace-nowrap">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden transition-all duration-200 border-2 ${currentIndex === index ? 'border-secondary' : 'border-transparent opacity-60 hover:opacity-100'}`}
              aria-label={`Go to image ${index + 1}`}
            >
              <MediaDisplay src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;