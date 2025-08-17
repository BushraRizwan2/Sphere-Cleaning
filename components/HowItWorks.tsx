
import React from 'react';
import RichEditableField from './RichEditableField';
import type { Section, HowItWorksContent, HowItWorksStep } from '../types';
import { ICONS } from '../constants';
import AnimatedCard from './AnimatedCard';

interface HowItWorksProps {
    isAdmin: boolean;
    section: Section<HowItWorksContent>;
    onSectionChange: (newSection: Section<HowItWorksContent>) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ isAdmin, section, onSectionChange }) => {
  if (!section?.content) {
    return null;
  }
  const { content, styles } = section;

  const onContentChange = (field: keyof HowItWorksContent, value: any) => {
    onSectionChange({ ...section, content: { ...content, [field]: value } });
  };

  const handleStepChange = (index: number, field: keyof Omit<HowItWorksStep, 'id' | 'icon'>, value: string) => {
    const newSteps = (content.steps || []).map((step, i) => {
        if (i !== index) return step;
        return { ...step, [field]: value };
    });
    onContentChange('steps', newSteps);
  };

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
            className="text-base sm:text-lg text-gray-500 mb-16 max-w-2xl mx-auto"
            style={{color: styles.textColor, opacity: 0.8}}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Dashed line connector for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5" style={{transform: 'translateY(-50%)'}}>
            <svg width="100%" height="100%">
              <line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="2" strokeDasharray="10 8" className="stroke-current text-gray-300"/>
            </svg>
          </div>
          {(content.steps || []).map((step, index) => {
            if (!step) return null;
            const IconComponent = ICONS[step.icon];
            return (
              <AnimatedCard
                key={step.id}
                animation="fade-up"
                delay={index * 150}
                className="relative flex flex-col items-center z-10 p-6 bg-white rounded-lg shadow-md"
                hasHoverLight={true}
              >
                <div className="flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full bg-primary/10 text-primary mb-6">
                  {IconComponent ? <IconComponent /> : null}
                </div>
                <RichEditableField
                    isAdmin={isAdmin}
                    value={step.title}
                    onChange={(newTitle) => handleStepChange(index, 'title', newTitle)}
                    className="text-lg sm:text-xl font-bold font-heading text-gray-800 mb-2"
                />
                <RichEditableField
                    isAdmin={isAdmin}
                    value={step.description}
                    onChange={(newDescription) => handleStepChange(index, 'description', newDescription)}
                    className="text-sm sm:text-base text-gray-600"
                />
              </AnimatedCard>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;