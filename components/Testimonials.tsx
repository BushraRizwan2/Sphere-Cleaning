
import React from 'react';
import RichEditableField from './RichEditableField';
import type { Section, TestimonialsContent, Testimonial } from '../types';
import MediaDisplay from './MediaDisplay';
import AnimatedCard from './AnimatedCard';
import { stripHtml } from '../utils';

interface TestimonialsProps {
    isAdmin: boolean;
    section: Section<TestimonialsContent>;
    onSectionChange: (newContent: Section<TestimonialsContent>) => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ isAdmin, section, onSectionChange }) => {
  if (!section?.content) {
    return null;
  }
  const { content, styles } = section;

  const onContentChange = (field: keyof TestimonialsContent, value: any) => {
    onSectionChange({ ...section, content: { ...content, [field]: value } });
  };

  const handleItemChange = (index: number, field: keyof Omit<Testimonial, 'id'>, value: string) => {
    const newItems = (content.items || []).map((item, i) => {
        if (i !== index) return item;
        return { ...item, [field]: value };
    });
    onContentChange('items', newItems);
  };

  return (
    <section className="py-16 lg:py-20" style={styles}>
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
            className="text-base sm:text-lg mb-12"
            style={{color: styles.textColor, opacity: 0.8}}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(content.items || []).map((testimonial, index) => {
            if (!testimonial) return null;
            return (
              <AnimatedCard
                key={testimonial.id}
                animation="fade-up"
                delay={index * 100}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg flex flex-col text-left"
                hasHoverLight={true}
              >
                <div className="flex-grow text-sm sm:text-base">
                  <RichEditableField
                      isAdmin={isAdmin}
                      value={testimonial.quote}
                      onChange={(newQuote) => handleItemChange(index, 'quote', newQuote)}
                      className="italic mb-6"
                      style={{color: styles.textColor, opacity: 0.9}}
                  />
                </div>
                <div className="flex items-center mt-auto pt-6 border-t border-white/20">
                  <div className="relative w-12 h-12 mr-4">
                      <MediaDisplay src={testimonial.avatar} alt={stripHtml(testimonial.name)} className="w-full h-full rounded-full object-cover border-2 border-secondary" />
                  </div>
                  <div>
                    <RichEditableField
                        isAdmin={isAdmin}
                        value={testimonial.name}
                        onChange={(newName) => handleItemChange(index, 'name', newName)}
                        className="font-bold text-left text-sm sm:text-base"
                        style={{color: styles.textColor}}
                    />
                    <RichEditableField
                        isAdmin={isAdmin}
                        value={testimonial.company}
                        onChange={(newCompany) => handleItemChange(index, 'company', newCompany)}
                        className="text-xs sm:text-sm text-left"
                        style={{color: styles.textColor, opacity: 0.8}}
                    />
                  </div>
                </div>
              </AnimatedCard>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;