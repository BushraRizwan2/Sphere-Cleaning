
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { SiteConfig } from '../types';
import Logo from './Logo';

interface FooterProps {
    siteConfig: SiteConfig;
}

const Footer: React.FC<FooterProps> = ({ siteConfig }) => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { footerBackgroundColor } = siteConfig;

  const handleNewsletterSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubscribing) {
      alert('Please enter a valid email address.');
      return;
    }
    
    if (typeof process === 'undefined' || !process.env || !process.env.API_KEY) {
        alert(`Thank you for subscribing with ${email}!`);
        setEmail('');
        return;
    }

    setIsSubscribing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const prompt = `You are a witty copywriter for CleanSphere, a cleaning company. A user just subscribed to the newsletter with the email: ${email}. Write a short, fun, and welcoming confirmation message for them. For example: "Thanks for joining the CleanSphere family, ${email}! Get ready for sparkling tips and shiny offers."`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      
      alert(response.text);
      setEmail('');
    } catch (error) {
      console.error("Newsletter AI error:", error);
      alert(`Thank you for subscribing, ${email}! We'll be in touch.`);
    } finally {
      setIsSubscribing(false);
    }
  }, [email, isSubscribing]);

  const socialIcons = {
    Facebook: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>,
    Twitter: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    LinkedIn: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>,
    Instagram: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c2.72 0 3.05.01 4.12.06 1.06.05 1.79.22 2.42.47.65.25 1.13.59 1.62 1.08.49.49.83.97 1.08 1.62.25.63.42 1.36.47 2.42.05 1.07.06 1.4.06 4.12s-.01 3.05-.06 4.12c-.05 1.06-.22 1.79-.47 2.42-.25.65-.59 1.13-1.08 1.62-.49.49-.97.83-1.62 1.08-.63.25-1.36.42-2.42.47-1.07.05-1.4.06-4.12.06s-3.05-.01-4.12-.06c-1.06-.05-1.79-.22-2.42-.47-.65-.25-1.13-.59-1.62-1.08-.49-.49-.83-.97-1.08-1.62-.25-.63-.42-1.36-.47-2.42-.05-1.07-.06-1.4-.06-4.12s.01-3.05.06-4.12c.05-1.06.22-1.79.47-2.42.25-.65.59-1.13 1.08-1.62.49-.49.97-.83 1.62-1.08.63-.25 1.36-.42 2.42-.47C8.95 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-1.02.05-1.58.22-2.02.4-.44.18-.76.41-1.08.73-.32.32-.55.64-.73 1.08-.18.44-.35.99-.4 2.02-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.05 1.02.22 1.58.4 2.02.18.44.41.76.73 1.08.32.32.64.55 1.08.73.44.18.99.35 2.02.4.98.05 1.37.06 4.04.06s3.06-.01 4.04-.06c1.02-.05 1.58-.22 2.02-.4.44-.18.76-.41 1.08-.73.32-.32-.55-.64.73-1.08.18-.44.35-.99.4-2.02.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.05-1.02-.22-1.58-.4-2.02-.18-.44-.41-.76-.73-1.08-.32-.32-.64-.55-1.08-.73-.44-.18-.99-.35-2.02-.4C15.06 3.81 14.67 3.8 12 3.8zm0 3.6c-2.48 0-4.48 2-4.48 4.48s2 4.48 4.48 4.48 4.48-2 4.48-4.48-2-4.48-4.48-4.48zm0 7.16c-1.48 0-2.68-1.2-2.68-2.68s1.2-2.68 2.68-2.68 2.68 1.2 2.68 2.68-1.2 2.68-2.68-2.68zm5.22-7.81c0 .59-.48 1.06-1.06 1.06s-1.06-.47-1.06-1.06.48-1.06 1.06-1.06 1.06.47 1.06 1.06z"/></svg>,
    WhatsApp: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.11 4.9a9.88 9.88 0 0 0-13.99 0A9.88 9.88 0 0 0 4.9 19.11L2 22l2.89-2.12a9.88 9.88 0 0 0 14.22-14.99zM12 18.01a6.01 6.01 0 0 1-3.21-.9L8.36 17l-1.54.92.35-1.78a5.98 5.98 0 0 1-1.19-3.13 6.01 6.01 0 0 1 12.02 0c0 3.32-2.69 6.01-6.02 6.01zm3.31-4.85c-.2-.11-1.17-.58-1.35-.65-.18-.07-.31-.11-.44.11-.13.22-.51.65-.63.78-.12.13-.24.15-.44.04s-.85-.31-1.62-1a6.8 6.8 0 0 1-1.13-1.28c-.14-.23-.01-.36.1-.47.1-.11.23-.28.34-.41.11-.13.15-.22.22-.36.07-.15.04-.28-.02-.38s-.44-1.06-.6-1.45c-.16-.39-.33-.33-.45-.34-.12-.01-.26-.01-.39-.01s-.32.05-.48.26c-.16.22-.64.78-.64 1.9c0 1.12.65 2.2.74 2.34.09.14 1.27 1.94 3.08 2.72.42.18.76.29 1.03.37.49.15.89.13 1.22.08.37-.06 1.17-.48 1.33-.92s.16-.83.11-.92c-.04-.08-.15-.13-.33-.23z"/></svg>,
  };

  return (
    <footer className="border-t border-gray-200" style={{ backgroundColor: footerBackgroundColor }}>
      <div className="container mx-auto px-6 py-12 md:py-16 max-w-7xl pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Info */}
          <div className="col-span-1">
            <Logo />
            <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-sm">Your trusted partner for creating cleaner, healthier, and more productive environments.</p>
             <div className="flex space-x-4 mt-6">
                {siteConfig.socialLinks.map(link => (
                    <a key={link.id} href={link.url} title={link.name} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                        <span className="sr-only">{link.name}</span>
                        {socialIcons[link.name]}
                    </a>
                ))}
            </div>
          </div>
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm sm:text-base">
              {siteConfig.navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="text-gray-500 hover:text-primary transition-colors duration-300">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Official Info</h3>
             <ul className="mt-4 space-y-2 text-sm sm:text-base text-gray-500">
                <li className="flex items-start"><span className="mr-2 mt-1">&#9906;</span> {siteConfig.physicalAddress}</li>
                <li className="flex items-start"><span className="mr-2 mt-1">&#9993;</span> <a href={`mailto:${siteConfig.emailAddress}`} className="hover:text-primary transition-colors duration-300">{siteConfig.emailAddress}</a></li>
                <li className="flex items-start"><span className="mr-2 mt-1">&#9742;</span> <a href={`tel:${siteConfig.phoneNumber.replace(/\s/g, '')}`} className="hover:text-primary transition-colors duration-300">{siteConfig.phoneNumber}</a></li>
            </ul>
          </div>
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Newsletter</h3>
            <p className="mt-4 text-sm sm:text-base text-gray-500">Sign up for our newsletter to get the latest news and offers.</p>
            <form onSubmit={handleNewsletterSubmit} className="mt-4 flex flex-col sm:flex-row">
              <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md sm:rounded-r-none sm:border-r-0 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base" />
              <button type="submit" aria-label="Submit newsletter" disabled={isSubscribing} className="bg-primary text-white px-3 py-2 rounded-md sm:rounded-l-none mt-2 sm:mt-0 hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-wait">
                {isSubscribing ? '...' : <>&rarr;</>}
              </button>
            </form>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-300 pt-8 text-center text-xs sm:text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CleanSphere Inc. All rights reserved. | Powered by Bushra Rizwan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
