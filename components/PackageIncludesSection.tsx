

import React from 'react';
import { ICONS } from '../constants';
import { stripHtml } from '../utils';
import AnimatedCard from './AnimatedCard';
import MediaDisplay from './MediaDisplay';

interface PackageItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  image?: string;
}

interface PackageIncludesSectionProps {
  items: PackageItem[];
  title?: string;
  subtitle?: string;
}

const PackageIncludesSection: React.FC<PackageIncludesSectionProps> = ({ items, title, subtitle }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-gray-800">
            {title || "What's Included In Your Service"}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            {subtitle || "Our comprehensive service package covers all the essentials to leave your space spotless."}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <AnimatedCard
                key={item.id}
                animation="fade-up"
                delay={index * 100}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                hasHoverLight={true}
              >
                <div className="relative h-48 w-full">
                    {item.image ? (
                        <MediaDisplay src={item.image} alt={stripHtml(item.title)} className="w-full h-full object-cover"/>
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-primary">
                            {Icon && <Icon />}
                        </div>
                    )}
                </div>
                <div className="p-6 flex flex-col flex-grow text-left">
                    <h3 className="text-base sm:text-lg font-bold font-heading text-gray-900 mb-2">{stripHtml(item.title)}</h3>
                    {item.description && <p className="text-xs sm:text-sm text-gray-600 flex-grow">{stripHtml(item.description)}</p>}
                </div>
              </AnimatedCard>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default PackageIncludesSection;