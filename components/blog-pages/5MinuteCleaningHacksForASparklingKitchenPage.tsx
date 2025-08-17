

import React, { useState, useEffect, useRef } from 'react';
import type { BlogPost } from '../../types';
import MediaDisplay from '../MediaDisplay';
import { stripHtml } from '../../utils';
import AnimatedCard from '../AnimatedCard';

interface PageProps {
  post: BlogPost;
  allPosts: BlogPost[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const calculateReadTime = (htmlContent: string) => {
  const text = stripHtml(htmlContent);
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

const Page: React.FC<PageProps> = ({ post, allPosts }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeTocId, setActiveTocId] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    
    const headings = contentRef.current.querySelectorAll('h2, h3');
    const newTocItems: TocItem[] = [];
    
    headings.forEach((heading, index) => {
      const text = heading.textContent || '';
      const id = `heading-${index}-${stripHtml(text).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      heading.id = id;
      newTocItems.push({ id, text, level: heading.tagName === 'H2' ? 2 : 3 });
    });
    setTocItems(newTocItems);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -75% 0px', threshold: 0.1 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => headings.forEach((h) => observer.unobserve(h));

  }, [post.content]);

  const relatedPosts = allPosts.filter(p => p.id !== post.id).sort(() => 0.5 - Math.random()).slice(0, 3);
  const readTime = calculateReadTime(post.content);

  if (!post) return <div>Post not found</div>;

  return (
    <main className="bg-white">
      <AnimatedCard animation="fade-up">
        {/* New Hero Section */}
        <section className="relative bg-gray-800 text-white min-h-[450px] sm:min-h-[500px] flex flex-col justify-center items-center">
          <div className="absolute inset-0">
            <MediaDisplay src={post.image} alt={post.title} className="w-full h-full object-cover opacity-40"/>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-primary/30"></div>
          </div>
          <div className="relative container mx-auto px-6 py-24 sm:py-32 max-w-4xl text-center z-10">
            <nav aria-label="Breadcrumb" className="text-sm text-white/80 mb-4">
              <ol className="flex items-center justify-center space-x-2">
                <li><a href="#/" className="hover:text-secondary">Home</a></li>
                <li><span className="mx-2">/</span></li>
                <li><a href="#blog" className="hover:text-secondary">Blog</a></li>
              </ol>
            </nav>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-shadow-lg">{post.title}</h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto opacity-90">A quick guide to a spotless kitchen, because you have better things to do.</p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a href="#services" className="bg-secondary text-primary font-bold py-3 px-8 rounded-full text-base sm:text-lg hover:bg-yellow-400 transition-all duration-300 shadow-lg transform hover:scale-105">
                Our Services
              </a>
              <a href="#appointment" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full text-base sm:text-lg hover:bg-white hover:text-primary transition-all duration-300 shadow-md transform hover:scale-105">
                Get a Free Quote
              </a>
            </div>
          </div>
        </section>
      </AnimatedCard>

      <AnimatedCard animation="fade-up" delay={100}>
        <article>
          <div className="container mx-auto max-w-7xl px-6 py-12 lg:py-16">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
              
              <div className="lg:col-span-8 xl:col-span-9">
                  <div className="mb-8 flex items-center justify-start space-x-4 text-sm text-gray-500 border-b pb-4">
                    <MediaDisplay src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full"/>
                    <div>
                      <span>By <strong>{post.author.name}</strong></span>
                      <span className="hidden sm:inline"> | </span>
                      <br className="sm:hidden"/>
                      <span>{post.date}</span>
                      <span className="mx-2 hidden sm:inline">•</span>
                      <br className="sm:hidden"/>
                      <span>{readTime}</span>
                    </div>
                  </div>
                  
                  <div ref={contentRef} className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
                  
                  <hr className="my-12"/>
  
                  <NewsletterSignup />
  
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold font-heading mb-6">Comments</h2>
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                        <p className="text-gray-600">Comments are coming soon! We'd love to hear your thoughts.</p>
                        <button disabled className="mt-4 bg-gray-300 text-gray-500 font-bold py-2 px-6 rounded-full cursor-not-allowed">Login to Comment</button>
                    </div>
                  </div>
              </div>
  
              <aside className="lg:col-span-4 xl:col-span-3 mt-12 lg:mt-0">
                  <div className="sticky top-28 space-y-8">
                      <TableOfContents items={tocItems} activeId={activeTocId} />
                      <CallToAction />
                      <SocialShare url={window.location.href} title={post.title} />
                  </div>
              </aside>
            </div>
          </div>
        </article>
      </AnimatedCard>

      <AnimatedCard animation="fade-up" delay={200}>
        <RelatedArticles posts={relatedPosts} />
      </AnimatedCard>
    </main>
  );
};

const TableOfContents: React.FC<{items: TocItem[], activeId: string | null}> = ({ items, activeId }) => {
    if (items.length === 0) return null;
    return (
        <div className="p-6 bg-gray-50 rounded-lg border">
            <h3 className="font-bold font-heading text-gray-800">Table of Contents</h3>
            <ul className="mt-4 space-y-2 text-sm">
                {items.map(item => (
                    <li key={item.id}>
                        <a href={`#${item.id}`} className={`block transition-colors duration-200 ${item.level > 2 ? 'ml-4' : ''} ${activeId === item.id ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'}`}>{item.text}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const CallToAction: React.FC = () => (
    <div className="p-6 bg-primary/10 rounded-lg text-center border border-primary/20">
        <h3 className="font-bold font-heading text-gray-800">Ready for a Sparkling Clean Space?</h3>
        <p className="text-sm text-gray-600 mt-2">Let our professionals handle the work. Get your free, no-obligation quote today!</p>
        <a href="#appointment" className="mt-4 inline-block w-full bg-brand-purple text-white font-bold py-3 px-6 rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105">
            Book a Cleaning Service
        </a>
    </div>
);

const SocialShare: React.FC<{url: string, title: string}> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }, (err) => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg border">
       <h3 className="font-bold font-heading text-gray-800 text-center">Share This Article</h3>
       <div className="mt-4 flex justify-center space-x-3">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors" aria-label="Share on Facebook"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
            <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors" aria-label="Share on Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors" aria-label="Share on LinkedIn"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg></a>
            <button onClick={copyToClipboard} className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors" aria-label="Copy link"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></button>
       </div>
    </div>
  );
};

const NewsletterSignup: React.FC = () => (
    <div className="bg-secondary/20 p-8 rounded-lg text-center">
        <h3 className="text-2xl font-bold font-heading text-gray-800">Get Cleaning Tips in Your Inbox</h3>
        <p className="text-gray-600 mt-2 mb-6">Sign up for our newsletter for exclusive tips, offers, and a free downloadable cleaning checklist!</p>
        <form className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg sm:rounded-r-none sm:border-r-0 focus:outline-none focus:ring-2 focus:ring-primary" />
            <button type="submit" className="mt-2 sm:mt-0 bg-primary text-white font-bold px-6 py-3 rounded-lg sm:rounded-l-none hover:bg-opacity-90 transition-colors">Sign Up</button>
        </form>
    </div>
);

const RelatedArticles: React.FC<{posts: BlogPost[]}> = ({ posts }) => {
    if (posts.length === 0) return null;
    return (
        <section className="py-16 lg:py-20 bg-gray-50 border-t">
            <div className="container mx-auto max-w-7xl px-6">
                <h2 className="text-3xl font-bold font-heading text-center mb-12">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group card-light-hover">
                         <a href={`#/blog/${post.id}`} className="block overflow-hidden">
                            <MediaDisplay src={post.image} alt={post.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
                         </a>
                         <div className="p-6 flex flex-col flex-grow">
                             <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                             <h3 className="text-lg font-bold font-heading text-gray-800 flex-grow"><a href={`#/blog/${post.id}`} className="hover:text-primary transition-colors">{post.title}</a></h3>
                             <a href={`#/blog/${post.id}`} className="mt-4 font-semibold text-primary hover:text-secondary transition-colors duration-300 self-start">Read More →</a>
                         </div>
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
};

export default Page;