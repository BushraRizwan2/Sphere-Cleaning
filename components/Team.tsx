
import React, { useState } from 'react';
import RichEditableField from './RichEditableField';
import type { Section, TeamContent, TeamMember } from '../types';
import MediaDisplay from './MediaDisplay';
import AnimatedCard from './AnimatedCard';
import { stripHtml } from '../utils';

interface TeamProps {
    isAdmin: boolean;
    section: Section<TeamContent>;
    onSectionChange: (newSection: Section<TeamContent>) => void;
}

const Team: React.FC<TeamProps> = ({ isAdmin, section, onSectionChange }) => {
    if (!section?.content?.members || section.content.members.length === 0) {
        return null;
    }
    const { content, styles } = section;

    const [activeIndex, setActiveIndex] = useState(0);

    const onContentChange = (field: keyof TeamContent, value: any) => {
        onSectionChange({ ...section, content: { ...content, [field]: value } });
    };

    const handleItemChange = (index: number, field: keyof Omit<TeamMember, 'id'>, value: string) => {
        const newItems = (content.members || []).map((item, i) => {
            if (i !== index) return item;
            return { ...item, [field]: value };
        });
        onContentChange('members', newItems);
    };
    
    const activeMember = content.members[activeIndex];

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

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center min-h-[450px]">
                    {/* Left Side: Member Details */}
                    <AnimatedCard animation="fade-up" delay={100} key={activeMember ? activeMember.id : 'no-member'}>
                      {activeMember && (
                          <div className="team-details text-center lg:text-left">
                             <RichEditableField
                                  isAdmin={isAdmin}
                                  value={activeMember.name}
                                  onChange={(newName) => handleItemChange(activeIndex, 'name', newName)}
                                  className="text-2xl sm:text-3xl font-bold font-heading text-gray-800"
                              />
                              <RichEditableField
                                  isAdmin={isAdmin}
                                  value={activeMember.role}
                                  onChange={(newRole) => handleItemChange(activeIndex, 'role', newRole)}
                                  className="text-primary text-base sm:text-lg font-semibold mt-1"
                              />
                              <div className="w-16 h-1 bg-secondary mt-4 mb-6 mx-auto lg:mx-0"></div>
                              <RichEditableField
                                  isAdmin={isAdmin}
                                  value={activeMember.bio}
                                  onChange={(newBio) => handleItemChange(activeIndex, 'bio', newBio)}
                                  className="text-gray-600 text-sm sm:text-base"
                              />
                          </div>
                      )}
                    </AnimatedCard>

                    {/* Right Side: Image Gallery */}
                    <div className="team-image-container h-full lg:col-span-2">
                        {content.members.map((member, index) => {
                            if (!member) return null;
                            return (
                                <div
                                    key={member.id}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={`team-image-wrapper ${index === activeIndex ? 'is-active' : ''}`}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View details for ${stripHtml(member.name)}`}
                                >
                                    <MediaDisplay 
                                        className="team-member-avatar w-32 h-48 sm:w-40 sm:h-60 rounded-xl object-cover border-4 border-white transition-shadow duration-500"
                                        src={member.avatar} 
                                        alt={stripHtml(member.name)} 
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
