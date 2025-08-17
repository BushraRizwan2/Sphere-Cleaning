

import React from 'react';
import RichEditableField from './RichEditableField';
import type { Section, WhyChooseUsContent, Benefit } from '../types';
import MediaDisplay from './MediaDisplay';
import { ICONS } from '../constants';
import AnimatedCard from './AnimatedCard';

interface WhyChooseUsProps {
    isAdmin: boolean;
    section: Section<WhyChooseUsContent>;
    onSectionChange: (newSection: Section<WhyChooseUsContent>) => void;
    phoneNumber?: string;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ isAdmin, section, onSectionChange, phoneNumber }) => {
  if (!section?.content) {
    return null;
  }
  const { content, styles } = section;

  const onContentChange = (field: keyof WhyChooseUsContent, value: any) => {
    onSectionChange({ ...section, content: { ...content, [field]: value } });
  };
  
  const handleItemChange = (index: number, field: keyof Omit<Benefit, 'id' | 'icon'>, value: string) => {
    const newItems = (content.items || []).map((item, i) => {
        if (i !== index) return item;
        return { ...item, [field]: value };
    });
    onContentChange('items', newItems);
  };

  return (
    <section className="py-16 lg:py-20" style={{backgroundColor: styles.backgroundColor}}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
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
                className="text-base sm:text-lg text-gray-500 max-w-3xl mx-auto"
                 style={{color: styles.textColor, opacity: 0.8}}
            />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {(content.items || []).map((benefit, index) => {
                    if (!benefit) return null;
                    const IconComponent = ICONS[benefit.icon];
                    return (
                        <AnimatedCard
                            key={benefit.id}
                            animation="fade-up"
                            delay={index * 100}
                            className="p-6 bg-white rounded-lg shadow-md"
                            hasHoverLight={true}
                        >
                            <div className="flex items-center mb-4">
                                {IconComponent ? <IconComponent /> : null}
                                <RichEditableField
                                    isAdmin={isAdmin}
                                    value={benefit.title}
                                    onChange={(newTitle) => handleItemChange(index, 'title', newTitle)}
                                    className="text-lg sm:text-xl font-bold font-heading ml-4 text-gray-800"
                                />
                            </div>
                            <RichEditableField
                                isAdmin={isAdmin}
                                value={benefit.description}
                                onChange={(newDescription) => handleItemChange(index, 'description', newDescription)}
                                className="text-sm sm:text-base text-gray-600"
                            />
                        </AnimatedCard>
                    )
                })}
            </div>
             <AnimatedCard animation="fade-up" delay={200} className="lg:w-1/2">
                <MediaDisplay src={content.image} alt="Happy cleaning team" className="rounded-lg shadow-2xl w-full h-auto object-cover"/>
             </AnimatedCard>
        </div>
        <div className="text-center mt-12">
          {typeof phoneNumber === 'string' && phoneNumber && (
            <p className="text-base sm:text-lg" style={{color: styles.textColor}}>
              Please Call Us For A Free Estimate: <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="font-bold text-secondary hover:underline">{phoneNumber}</a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;