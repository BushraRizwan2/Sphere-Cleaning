

import React from 'react';
import type { BlogPost } from '../../types';
import MediaDisplay from '../MediaDisplay';
import { stripHtml } from '../../utils';
import AnimatedCard from '../AnimatedCard';

interface BlogPostLayoutProps {
  post: BlogPost;
  allPosts: BlogPost[];
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ post, allPosts }) => {
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id)
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, 3); // Take first 3

  return (
    <main className="bg-gray-50">
      <AnimatedCard animation="fade-up">
        {/* Hero Section */}
        <section className="relative h-80 md:h-96">
          <div className="absolute inset-0">
            <MediaDisplay
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </div>
          <div className="relative container mx-auto px-6 max-w-4xl h-full flex flex-col justify-end pb-12 text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading drop-shadow-2xl">
              {post.title}
            </h1>
          </div>
        </section>
      </AnimatedCard>

      <AnimatedCard animation="fade-up" delay={100}>
        {/* Main Content */}
        <div className="container mx-auto px-6 max-w-7xl py-12 lg:py-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Article Content */}
            <article className="lg:col-span-8">
              <div className="prose lg:prose-lg xl:prose-xl max-w-none bg-white p-6 sm:p-8 rounded-lg shadow-sm">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 mt-12 lg:mt-0">
              <div className="sticky top-28 space-y-8">
                {/* Author Box */}
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <MediaDisplay
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-bold text-lg text-gray-800">{post.author.name}</h3>
                  <p className="text-sm text-gray-500">{post.author.role}</p>
                  <p className="text-sm text-gray-600 mt-2">Published on {post.date}</p>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold font-heading mb-4 text-gray-800">Related Posts</h3>
                    <div className="space-y-4">
                      {relatedPosts.map(related => (
                        <a key={related.id} href={`#/blog/${related.id}`} className="group flex items-center space-x-4">
                          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                             <MediaDisplay src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"/>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-700 group-hover:text-primary transition-colors text-sm">{related.title}</h4>
                             <p className="text-xs text-gray-500 mt-1">{related.date}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </AnimatedCard>
    </main>
  );
};

export default BlogPostLayout;