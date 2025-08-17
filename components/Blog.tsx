

import React, { useState } from 'react';
import RichEditableField from './RichEditableField';
import type { Section, BlogContent, BlogPost } from '../types';
import MediaDisplay from './MediaDisplay';
import AnimatedCard from './AnimatedCard';
import { stripHtml } from '../utils';

interface BlogProps {
    isAdmin: boolean;
    section: Section<BlogContent>;
    onSectionChange: (newSection: Section<BlogContent>) => void;
}

const Blog: React.FC<BlogProps> = ({ isAdmin, section, onSectionChange }) => {
    const [visibleCount, setVisibleCount] = useState(3);

    if (!section?.content) {
        return null;
    }
    const { content, styles } = section;

    const onContentChange = (field: keyof BlogContent, value: any) => {
        onSectionChange({ ...section, content: { ...content, [field]: value } });
    };

    const handleItemChange = (index: number, field: keyof Omit<BlogPost, 'id' | 'comments' | 'author' | 'content'>, value: string) => {
        const newItems = (content.posts || []).map((item, i) => {
            if (i !== index) return item;
            return { ...item, [field]: value };
        });
        onContentChange('posts', newItems);
    };

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 3);
    };

    const displayedPosts = (content.posts || []).slice(0, visibleCount);

    return (
        <section id="blog" className="py-16 lg:py-20" style={{backgroundColor: styles.backgroundColor}}>
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
                    {displayedPosts.map((post, index) => {
                        if (!post) return null;
                        return (
                            <AnimatedCard
                                key={post.id}
                                animation="fade-up"
                                delay={index * 100}
                                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group"
                                hasHoverLight={true}
                            >
                                <div className="flex flex-col flex-grow">
                                    <div className="relative h-56 w-full overflow-hidden">
                                      <a href={`#/blog/${post.id}`} className="block w-full h-full">
                                        <MediaDisplay 
                                            src={post.image} 
                                            alt={stripHtml(post.title)} 
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                      </a>
                                    </div>
                                    <div className="p-6 text-left flex flex-col flex-grow">
                                        <div className="text-sm text-gray-500 mb-2">
                                            <span>{post.date}</span>
                                            {' '}| {post.comments} Comments
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold font-heading text-gray-800 mb-4 flex-grow min-h-[5rem]">
                                          <a href={`#/blog/${post.id}`} className="hover:text-primary transition-colors">
                                            <RichEditableField
                                                isAdmin={isAdmin}
                                                value={post.title}
                                                onChange={(newTitle) => handleItemChange(index, 'title', newTitle)}
                                            />
                                          </a>
                                        </h3>
                                        <div className="mt-auto pt-4 border-t border-gray-100">
                                            <a href={`#/blog/${post.id}`} className="font-semibold text-primary hover:text-secondary transition-colors duration-300 group inline-flex items-center p-2 -m-2 rounded-lg cursor-pointer">
                                                Learn More
                                                <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                                                    <span aria-hidden="true" className="group-hover:hidden">→</span>
                                                    <span aria-hidden="true" className="hidden group-hover:inline">👉</span>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedCard>
                        )
                    })}
                </div>
                {visibleCount < (content.posts || []).length && (
                    <div className="mt-16">
                        <button 
                            onClick={handleLoadMore}
                            className="bg-primary text-white font-bold py-3 px-8 rounded-full text-base sm:text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105"
                        >
                            Load More Articles
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Blog;