
import React from 'react';
import RichEditableField from './RichEditableField';
import type { Section, AboutContent } from '../types';
import MediaDisplay from './MediaDisplay';
import AnimatedCard from './AnimatedCard';

interface AboutProps {
    isAdmin: boolean;
    section: Section<AboutContent>;
    onSectionChange: (newSection: Section<AboutContent>) => void;
}

const About: React.FC<AboutProps> = ({ isAdmin, section, onSectionChange }) => {
    if (!section?.content) {
        return null;
    }
    const { content, styles } = section;

    const onContentChange = (field: keyof AboutContent, value: any) => {
        onSectionChange({ ...section, content: { ...content, [field]: value } });
    };
    
    const handleStatChange = (index: number, field: 'value' | 'label', value: string) => {
        const newStats = (content.stats || []).map((stat, i) => {
            if (i !== index) return stat;
            return { ...stat, [field]: value };
        });
        onContentChange('stats', newStats);
    };

    return (
        <section className="py-16 lg:py-20" style={{backgroundColor: styles.backgroundColor}}>
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-12 lg:gap-20">
                    <AnimatedCard animation="fade-up" className="lg:w-1/2 w-full">
                        <MediaDisplay src={content.image} alt="Team meeting in a clean office" className="rounded-lg shadow-2xl w-full h-auto object-cover"/>
                    </AnimatedCard>
                    <AnimatedCard animation="fade-up" delay={200} className="lg:w-1/2 w-full text-center lg:text-left">
                         <RichEditableField
                            isAdmin={isAdmin}
                            value={content.title}
                            onChange={(newValue) => onContentChange('title', newValue)}
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-4"
                            style={{color: styles.textColor}}
                        />
                         <RichEditableField
                            isAdmin={isAdmin}
                            value={content.subtitle}
                            onChange={(newValue) => onContentChange('subtitle', newValue)}
                            className="text-base sm:text-lg text-gray-500 mb-6"
                             style={{color: styles.textColor, opacity: 0.8}}
                        />
                        <RichEditableField
                            isAdmin={isAdmin}
                            value={content.paragraph}
                            onChange={(newValue) => onContentChange('paragraph', newValue)}
                            className="mb-8 text-sm sm:text-base"
                            style={{color: styles.textColor}}
                        />
                        <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
                            {(content.stats || []).map((stat, index) => {
                                if (!stat) return null;
                                return (
                                    <div key={stat.id}>
                                        <RichEditableField as="span" isAdmin={isAdmin} value={stat.value} onChange={val => handleStatChange(index, 'value', val)} className="text-3xl sm:text-4xl font-bold text-primary" />
                                        <RichEditableField as="p" isAdmin={isAdmin} value={stat.label} onChange={val => handleStatChange(index, 'label', val)} className="text-sm sm:text-base text-gray-500 mt-1" style={{color: styles.textColor, opacity: 0.8}} />
                                    </div>
                                )
                            })}
                        </div>
                         <div className="mt-8">
                            <a href="#services" className="bg-secondary text-primary font-bold py-3 px-8 rounded-full text-base sm:text-lg hover:bg-yellow-400 transition-all duration-300 shadow-lg transform hover:scale-105 inline-block">
                                Learn More
                            </a>
                        </div>
                    </AnimatedCard>
                </div>
            </div>
        </section>
    );
};

export default About;