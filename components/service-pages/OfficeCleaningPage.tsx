

import React, { useState } from 'react';
import type { Service } from '../../types';
import ServicePageLayout from '../ServicePageLayout';
import { stripHtml } from '../../utils';
import PricingCalculator from '../PricingCalculator';
import FAQAccordion from '../FAQAccordion';
import MediaDisplay from '../MediaDisplay';
import { ICONS } from '../../constants';
import AnimatedCard from '../AnimatedCard';
import Lightbox from '../Lightbox';
import PackageIncludesSection from '../PackageIncludesSection';

interface PageProps {
  service: Service;
  phoneNumber?: string;
  allServices: Service[];
}

const OfficeCleaningPage: React.FC<PageProps> = ({ service, phoneNumber, allServices }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <ServicePageLayout service={service} allServices={allServices}>
      {/* Key Benefits Section */}
      {service.keyBenefits && service.keyBenefits.length > 0 && (
          <section className="py-12 sm:py-16 lg:py-20 bg-white">
              <div className="container mx-auto px-6 max-w-7xl">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                      {service.keyBenefits.map((benefit, index) => {
                          const Icon = ICONS[benefit.icon];
                          return (
                              <AnimatedCard
                                  key={benefit.id}
                                  animation="fade-up"
                                  delay={index * 100}
                                  className="group p-6 sm:p-8 text-center bg-gray-50 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                              >
                                  <div className="inline-block text-secondary bg-secondary/10 p-3 sm:p-4 rounded-full mb-4 sm:mb-6 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-[12deg]">
                                      {Icon && <Icon />}
                                  </div>
                                  <h3 className="text-lg sm:text-xl font-bold font-heading text-gray-800 mb-2">{benefit.title}</h3>
                                  <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
                              </AnimatedCard>
                          )
                      })}
                  </div>
              </div>
          </section>
      )}

      {/* Package Includes Section */}
      <PackageIncludesSection items={service.packageIncludes || []} />

      {/* In-Depth Look Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl space-y-16 sm:space-y-20">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-gray-800">An In-Depth Look at Our Services</h2>
              <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-3xl mx-auto">We go beyond the surface to ensure every corner of your workspace is immaculately clean and hygienic.</p>
            </div>

            {/* Alternating Grid 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-primary mb-4">Workstation & Common Area Care</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">We meticulously clean and disinfect all high-touch surfaces, including desks, chairs, phones, and keyboards, to create a healthier work environment. Common areas, lobbies, and break rooms are given special attention to maintain a welcoming and professional atmosphere for employees and visitors alike.</p>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Dusting and wiping all surfaces</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Disinfecting high-touch points</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Floor care including vacuuming and mopping</li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                 <MediaDisplay src={service.gallery?.[0] || ''} alt="Clean workstations" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* Alternating Grid 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="rounded-lg overflow-hidden shadow-xl md:order-last">
                 <MediaDisplay src={service.gallery?.[1] || ''} alt="Sanitized conference room" className="w-full h-auto object-cover" />
              </div>
              <div className="md:order-first">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-primary mb-4">Restroom & Kitchen Sanitization</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">Our team ensures that your restrooms and kitchenettes are not just visibly clean, but hygienically sanitized. We use hospital-grade disinfectants to thoroughly clean all fixtures, restock supplies, and ensure these critical areas are pristine and safe for everyone.</p>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Complete sanitization of toilets, sinks, and fixtures</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Restocking soap, paper towels, and other supplies</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Cleaning of kitchen appliances and countertops</li>
                </ul>
              </div>
            </div>
        </div>
      </section>

      {/* Our Recent Work Gallery Section */}
      {service.gallery && service.gallery.length > 0 && (
          <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 overflow-hidden">
              <div className="container mx-auto">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-12 text-center text-gray-800">Our Recent Work</h2>
                  <div className="scroller" data-speed="fast">
                      <ul className="scroller__inner">
                          {[...service.gallery, ...service.gallery].map((image, index) => (
                              <li key={index} className="w-48 sm:w-64 h-40 sm:h-56 flex-shrink-0">
                                  <button
                                      onClick={() => openLightbox(index % (service.gallery?.length || 1))}
                                      className="w-full h-full block cursor-pointer transition-transform duration-300 hover:scale-105 group relative"
                                      aria-label={`View image ${index % (service.gallery?.length || 1) + 1} in full screen`}
                                  >
                                      <MediaDisplay src={image} alt={`Recent work gallery image ${index + 1}`} className="w-full h-full object-cover rounded-lg shadow-md" />
                                       <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4" /></svg>
                                        </div>
                                  </button>
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
          </section>
      )}

      {/* Industries We Serve */}
      {service.industries && service.industries.length > 0 && (
          <section className="py-12 sm:py-16 lg:py-20 bg-white">
              <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-12">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-gray-800">Tailored Solutions for Every Industry</h2>
                  <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">We understand that every business is unique. We customize our services for a variety of sectors.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {service.industries.map(industry => {
                    const Icon = ICONS[industry.icon];
                    return (
                       <div key={industry.id} className="text-center flex flex-col items-center">
                         <div className="flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-primary/10 text-primary mb-4">
                            {Icon && <Icon />}
                         </div>
                         <p className="font-semibold text-gray-700 text-sm sm:text-base">{industry.name}</p>
                       </div>
                    )
                  })}
                </div>
              </div>
          </section>
      )}

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary">
        <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-6 text-white">Transparent Pricing</h2>
            <p className="text-base sm:text-lg text-white/80 mb-12">No hidden fees, no surprises. Get an estimate for your needs below or contact us for a custom quote.</p>
            <div className="max-w-md mx-auto">
                <PricingCalculator pricing={service.pricing} serviceId={service.id} />
            </div>
        </div>
      </section>
            
      {/* FAQ section */}
      {service.faqs && service.faqs.length > 0 && (
          <section className="py-12 sm:py-16 lg:py-20 bg-white">
              <div className="container mx-auto px-6 max-w-4xl">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-12 text-center text-gray-800">Frequently Asked Questions</h2>
                  <FAQAccordion faqs={service.faqs} />
              </div>
          </section>
      )}

      {lightboxOpen && service.gallery && (
        <Lightbox
          images={service.gallery}
          currentIndex={selectedImageIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setSelectedImageIndex(prev => (prev - 1 + (service.gallery?.length || 0)) % (service.gallery?.length || 1))}
          onNext={() => setSelectedImageIndex(prev => (prev + 1) % (service.gallery?.length || 1))}
          onSelect={(index) => setSelectedImageIndex(index)}
        />
      )}
    </ServicePageLayout>
  );
};

export default OfficeCleaningPage;