
import React from 'react';
import { ICONS } from '../constants';
import { stripHtml } from '../utils';
import AnimatedCard from './AnimatedCard';

interface PackageItem {
  id: string;
  icon: string;
  title: string;
  description: string;
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
                className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                hasHoverLight={true}
              >
                <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary/10 text-primary mb-6">
                  {Icon && <Icon />}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-gray-900 mb-2">{stripHtml(item.title)}</h3>
                {item.description && <p className="text-xs sm:text-sm text-gray-600 mt-1 flex-grow">{stripHtml(item.description)}</p>}
              </AnimatedCard>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default PackageIncludesSection;
