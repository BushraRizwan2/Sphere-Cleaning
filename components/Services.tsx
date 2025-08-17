

import React, { useState } from 'react';
import RichEditableField from './RichEditableField';
import type { Section, ServicesContent, Service } from '../types';
import MediaDisplay from './MediaDisplay';
import AnimatedCard from './AnimatedCard';
import { stripHtml } from '../utils';

interface ServicesProps {
    isAdmin: boolean;
    section: Section<ServicesContent>;
    onSectionChange: (newContent: Section<ServicesContent>) => void;
}

const Services: React.FC<ServicesProps> = ({ isAdmin, section, onSectionChange }) => {
  if (!section?.content) {
    return null;
  }
  const { content, styles } = section;
  const [visibleCount, setVisibleCount] = useState(3);

  const onContentChange = (field: keyof ServicesContent, value: any) => {
    onSectionChange({ ...section, content: { ...content, [field]: value } });
  }

  const handleItemChange = (index: number, field: keyof Omit<Service, 'id'>, value: string) => {
    const newItems = (content.items || []).map((item, i) => {
        if (i !== index) return item;
        return { ...item, [field]: value };
    });
    onContentChange('items', newItems);
  };

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  const visibleServices = (content.items || []).slice(0, visibleCount);

  return (
    <section className="py-16 lg:py-20" style={{backgroundColor: styles.backgroundColor}}>
      <div className="container mx-auto px-6 text-center max-w-7xl">
        <RichEditableField
            isAdmin={isAdmin}
            value={content.title}
            onChange={(newTitle) => onContentChange('title', newTitle)}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-4"
            style={{color: styles.textColor}}
        />
        <RichEditableField
            isAdmin={isAdmin}
            value={content.subtitle}
            onChange={(newSubtitle) => onContentChange('subtitle', newSubtitle)}
            className="text-base sm:text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
            style={{color: styles.textColor, opacity: 0.8}}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleServices.map((service, index) => {
            if (!service) return null;
            return (
              <AnimatedCard
                key={service.id}
                animation="fade-up"
                delay={index * 100}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                hasHoverLight={true}
              >
                <div className="relative h-48 w-full">
                  <MediaDisplay src={service.image} alt={stripHtml(service.title)} className="w-full h-full object-cover"/>
                </div>
                <div className="p-6 text-left flex-grow flex flex-col">
                    <div className="flex-grow">
                      <RichEditableField
                          isAdmin={isAdmin}
                          value={service.title}
                          onChange={(newTitle) => handleItemChange(index, 'title', newTitle)}
                          className="text-lg sm:text-xl font-bold font-heading text-gray-800 mb-2"
                      />
                      <RichEditableField
                          isAdmin={isAdmin}
                          value={service.description}
                          onChange={(newDescription) => handleItemChange(index, 'description', newDescription)}
                          className="text-sm sm:text-base text-gray-600"
                      />
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <a href={`#/service/${service.id}`} className="font-semibold text-primary hover:text-secondary transition-colors duration-300 group inline-flex items-center p-2 -m-2 rounded-lg cursor-pointer">
                            Learn More
                            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                                <span aria-hidden="true" className="group-hover:hidden">→</span>
                                <span aria-hidden="true" className="hidden group-hover:inline">👉</span>
                            </span>
                        </a>
                    </div>
                </div>
              </AnimatedCard>
            )
          })}
        </div>
        {visibleCount < (content.items || []).length && (
            <div className="mt-16">
                <button 
                    onClick={handleLoadMore}
                    className="bg-primary text-white font-bold py-3 px-8 rounded-full text-base sm:text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                    Load More
                </button>
            </div>
        )}
      </div>
    </section>
  );
};

export default Services;