import React, { useState, useEffect } from 'react';
import RichEditableField from './RichEditableField';
import type { Section, HeroContent } from '../types';
import MediaDisplay from './MediaDisplay';

interface HeroProps {
    isAdmin: boolean;
    section: Section<HeroContent>;
    onSectionChange: (newSection: Section<HeroContent>) => void;
}

const Hero: React.FC<HeroProps> = ({ isAdmin, section, onSectionChange }) => {
    if (!section?.content) {
        return null;
    }
    const { content, styles } = section;
    const { layout, title, subtitle, sliderImages, backgroundImage } = content;

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (layout !== 'split-screen' || !sliderImages || sliderImages.length === 0) return;

        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
        }, 3000); // 3 seconds

        return () => clearTimeout(timer);
    }, [currentIndex, sliderImages, layout]);

    const handleFieldChange = (field: keyof HeroContent, value: string) => {
        onSectionChange({ ...section, content: { ...content, [field]: value } });
    };
    
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
      style={styles}
    >
      {/* Dynamic Background */}
      {layout === 'background-image' && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})`, zIndex: 0 }}
        />
      )}
      
      <div className="absolute inset-0 bg-primary/70" style={{ zIndex: 1, backgroundColor: `${styles.backgroundColor}bf` }}></div>

      {/* Bubbles */}
      <div className="bubble" style={{ width: '100px', height: '100px', top: '20%', left: '5%', animationDelay: '0s', zIndex: 2 }}></div>
      <div className="bubble" style={{ width: '50px', height: '50px', top: '50%', left: '20%', animationDelay: '3s', zIndex: 2 }}></div>
      <div className="bubble" style={{ width: '80px', height: '80px', top: '70%', left: '10%', animationDelay: '6s', zIndex: 2 }}></div>
      <div className="bubble" style={{ width: '40px', height: '40px', top: '30%', right: '15%', animationDelay: '2s', zIndex: 2 }}></div>
      <div className="bubble" style={{ width: '120px', height: '120px', top: '60%', right: '5%', animationDelay: '5s', zIndex: 2 }}></div>

      <div className="relative container mx-auto px-6 py-20 lg:py-0 max-w-7xl" style={{ zIndex: 3 }}>
        <div className={`flex flex-col lg:flex-row items-center ${layout === 'background-image' ? 'justify-center text-center' : 'justify-between'}`}>
          
          <div className={`${layout === 'background-image' ? 'w-full lg:w-3/4' : 'lg:w-1/2 text-left mb-12 lg:mb-0'}`}>
            <RichEditableField
                isAdmin={isAdmin}
                value={title}
                onChange={(newTitle) => handleFieldChange('title', newTitle)}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading leading-tight drop-shadow-lg"
                style={{ color: styles.textColor }}
            />
            <RichEditableField
                isAdmin={isAdmin}
                value={subtitle}
                onChange={(newSubtitle) => handleFieldChange('subtitle', newSubtitle)}
                className={`mt-6 text-base sm:text-lg md:text-xl drop-shadow-md max-w-lg ${layout === 'background-image' ? 'mx-auto' : ''}`}
                style={{ color: styles.textColor, opacity: 0.8 }}
            />
            <div className={`mt-10 flex flex-row flex-wrap items-center gap-4 ${layout === 'background-image' ? 'justify-center' : 'justify-start'}`}>
              <a href="#appointment" className="bg-secondary text-primary font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg hover:bg-yellow-400 transition-all duration-300 shadow-lg transform hover:scale-105 w-auto">
                Get a Quote
              </a>
              <a href="#services" className="bg-white/20 backdrop-blur-sm text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg hover:bg-white/30 transition-all duration-300 border border-white/40 shadow-md transform hover:scale-105 w-auto">
                Our Services
              </a>
            </div>
          </div>
          
          {layout === 'split-screen' && (
            <div className="lg:w-1/2 w-full flex justify-center lg:justify-end mt-8 lg:mt-0">
               <div className="relative w-full max-w-md lg:max-w-xl h-80 sm:h-96 lg:h-[500px] rounded-2xl shadow-2xl overflow-hidden bg-gray-200">
                {(sliderImages || []).map((imageSrc, index) => (
                    <MediaDisplay
                        key={index}
                        src={imageSrc}
                        alt={`Hero image slide ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;