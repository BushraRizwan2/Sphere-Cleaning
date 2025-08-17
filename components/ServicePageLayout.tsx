

import React, { useState } from 'react';
import type { Service } from '../types';
import MediaDisplay from './MediaDisplay';
import { stripHtml } from '../utils';
import AnimatedCard from './AnimatedCard';


interface ServicePageLayoutProps {
    service: Service;
    allServices: Service[];
    children: React.ReactNode;
    phoneNumber?: string;
}

const ServiceCard = ({ service, delay }: { service: Service, delay: number }) => (
    <AnimatedCard
        animation={'fade-up'}
        delay={delay}
        className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col border border-gray-100"
        hasHoverLight={true}
    >
        <div className="relative h-48 w-full">
            <MediaDisplay src={service.image} alt={stripHtml(service.title)} className="w-full h-full object-cover"/>
        </div>
        <div className="p-6 text-left flex-grow flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold font-heading text-gray-800 mb-2">{stripHtml(service.title)}</h3>
            <div className="mt-auto pt-4 border-t border-gray-100">
                <a href={`#/service/${service.id}`} className="font-semibold text-primary hover:text-secondary active:text-yellow-500 transition-colors duration-300 group inline-flex items-center p-2 -m-2 rounded-lg cursor-pointer">
                    Learn More
                    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
            </div>
        </div>
    </AnimatedCard>
);

const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({ service, allServices = [], children }) => {
    const serviceTitle = stripHtml(service.title);
    const otherServicesList = allServices.filter(s => s.id !== service.id);

    // State for Desktop Carousel
    const [currentPage, setCurrentPage] = useState(0);
    const servicesPerPage = 4;
    const totalPages = Math.ceil(otherServicesList.length / servicesPerPage);
    const startIndex = currentPage * servicesPerPage;
    const currentServices = otherServicesList.slice(startIndex, startIndex + servicesPerPage);

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
    };
    const goToPrevPage = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    // State for Mobile "Load More"
    const [mobileVisibleCount, setMobileVisibleCount] = useState(4);
    const mobileVisibleServices = otherServicesList.slice(0, mobileVisibleCount);
    const handleLoadMore = () => {
        setMobileVisibleCount(prev => prev + 4);
    };

    return (
        <main className="bg-white">
            <AnimatedCard animation="fade-up">
                {/* Hero section */}
                <section className="relative bg-gray-800 text-white">
                    <div className="absolute inset-0">
                        <MediaDisplay src={service.image} alt={serviceTitle} className="w-full h-full object-cover opacity-30"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/40"></div>
                    </div>
                    <div className="relative container mx-auto px-6 py-24 sm:py-32 lg:py-40 max-w-7xl text-center z-10">
                        <div className="text-sm font-semibold uppercase tracking-wider mb-2">
                            <a href="#/" className="opacity-80 hover:opacity-100">Home</a>
                            <span className="mx-2 opacity-50">/</span>
                            <a href="#services" className="opacity-80 hover:opacity-100">Services</a>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-shadow-lg">{serviceTitle}</h1>
                        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto opacity-90">{service.shortIntro}</p>
                         <a href="#appointment" className="mt-8 inline-block bg-secondary text-primary font-bold py-2 px-6 text-base sm:py-3 sm:px-8 sm:text-lg rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95">
                            Get An Instant Quote
                        </a>
                    </div>
                </section>
            </AnimatedCard>
            
            <AnimatedCard animation="fade-up" delay={100}>
                {/* Custom Page Content */}
                {children}
            </AnimatedCard>
            
            <AnimatedCard animation="fade-up" delay={200}>
                {/* Other Services Section */}
                <section className="py-16 lg:py-20 bg-gray-50 relative z-20">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-12 text-center text-gray-800">Explore Our Other Services</h2>
                        
                        {/* Desktop Carousel View */}
                        <div className="hidden lg:block relative">
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {currentServices.map((s, index) => <ServiceCard key={s.id} service={s} delay={index * 100} />)}
                             </div>
                            {totalPages > 1 && (
                                <>
                                    <button
                                        onClick={goToPrevPage}
                                        disabled={currentPage === 0}
                                        className="absolute top-1/2 left-0 -translate-x-1/2 z-30 bg-white p-2 rounded-full shadow-lg text-primary hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 transform -translate-y-1/2 active:scale-90"
                                        aria-label="Previous services"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={goToNextPage}
                                        disabled={currentPage >= totalPages - 1}
                                        className="absolute top-1/2 right-0 translate-x-1/2 z-30 bg-white p-2 rounded-full shadow-lg text-primary hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 transform -translate-y-1/2 active:scale-90"
                                        aria-label="Next services"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                        
                        {/* Mobile "Load More" View */}
                        <div className="lg:hidden">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {mobileVisibleServices.map((s, index) => <ServiceCard key={s.id} service={s} delay={index * 100} /> )}
                            </div>
                            {mobileVisibleCount < otherServicesList.length && (
                                <div className="mt-12 text-center">
                                    <button
                                        onClick={handleLoadMore}
                                        className="bg-primary text-white font-bold py-3 px-8 rounded-full text-base sm:text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95"
                                    >
                                        Load More Services
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </AnimatedCard>
        </main>
    );
};

export default ServicePageLayout;