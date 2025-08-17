
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ICONS } from '../constants';
import { stripHtml } from '../utils';

interface PackageItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface PackageIncludesSliderProps {
  items: PackageItem[];
}

const PackageIncludesSlider: React.FC<PackageIncludesSliderProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length),
      5000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, items.length, resetTimeout]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  
  if (!items || items.length === 0) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative h-[22rem] sm:h-80 overflow-hidden rounded-lg bg-primary/5 border border-primary/10 p-8">
        {items.map((item, index) => {
          const IconComponent = ICONS[item.icon];
          return (
            <div
              key={item.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center h-full text-center sm:text-left">
                  {IconComponent && (
                    <div className="flex-shrink-0 text-primary mb-4 sm:mb-0 sm:mr-8 p-4 bg-primary/10 rounded-full">
                        <IconComponent />
                    </div>
                  )}
                  <div className="sm:max-w-md">
                      <h3 className="text-2xl font-bold font-heading text-gray-800 mb-2">
                          {stripHtml(item.title)}
                      </h3>
                      <p className="text-gray-600">
                          {stripHtml(item.description)}
                      </p>
                  </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center mt-6 space-x-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === index ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PackageIncludesSlider;
