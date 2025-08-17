
import React from 'react';
import RichEditableField from './RichEditableField';
import type { Section, PricingContent, PricingPlan } from '../types';
import AnimatedCard from './AnimatedCard';

const CheckIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-green flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

interface PricingProps {
    isAdmin: boolean;
    section: Section<PricingContent>;
    onSectionChange: (newSection: Section<PricingContent>) => void;
}

const Pricing: React.FC<PricingProps> = ({ isAdmin, section, onSectionChange }) => {
  if (!section?.content) {
    return null;
  }
  const { content, styles } = section;

  const onContentChange = (field: keyof PricingContent, value: any) => {
    onSectionChange({ ...section, content: { ...content, [field]: value } });
  };
  
  const handlePlanChange = (planIndex: number, field: keyof Omit<PricingPlan, 'id' | 'features'>, value: string | boolean) => {
    const newItems = (content.items || []).map((plan, i) => {
        if (i !== planIndex) return plan;
        return { ...plan, [field]: value };
    });
    onContentChange('items', newItems);
  };
  
  const handleFeatureChange = (planIndex: number, featureIndex: number, value: string) => {
    const newItems = (content.items || []).map((plan, i) => {
        if (i !== planIndex) return plan;

        const newFeatures = (plan.features || []).map((feature, j) => {
            if (j !== featureIndex) return feature;
            return { ...feature, text: value };
        });

        return { ...plan, features: newFeatures };
    });
    onContentChange('items', newItems);
  };

  return (
    <section className="py-16 lg:py-20" style={{backgroundColor: styles.backgroundColor}}>
      <div className="container mx-auto px-6 text-center max-w-7xl">
        <RichEditableField isAdmin={isAdmin} value={content.title} onChange={newVal => onContentChange('title', newVal)} className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-4" style={{color: styles.textColor}} />
        <RichEditableField isAdmin={isAdmin} value={content.subtitle} onChange={newVal => onContentChange('subtitle', newVal)} className="text-base sm:text-lg text-gray-500 mb-16 max-w-2xl mx-auto" style={{color: styles.textColor, opacity: 0.8}} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch justify-center">
          {(content.items || []).map((plan, planIndex) => {
            if (!plan) return null;
            return (
              <AnimatedCard
                key={plan.id}
                animation="fade-up"
                delay={planIndex * 100}
                className={`rounded-xl border flex flex-col transition-all duration-300 ${plan.isPopular ? 'border-brand-purple shadow-2xl lg:scale-105 bg-white' : 'border-gray-200 shadow-lg bg-gray-50'}`}
                hasHoverLight={true}
              >
                {plan.isPopular && <div className="bg-brand-purple text-white text-sm font-bold uppercase tracking-wider py-1.5 rounded-t-xl">Most Popular</div>}
                <div className="p-8 flex flex-col flex-grow">
                  <RichEditableField isAdmin={isAdmin} value={plan.name} onChange={newVal => handlePlanChange(planIndex, 'name', newVal)} className="text-xl sm:text-2xl font-bold font-heading text-gray-800" />
                  <div className="mt-4 mb-6 flex items-baseline justify-center">
                    <span className="text-4xl sm:text-5xl font-extrabold text-gray-900">$
                      <RichEditableField as="span" isAdmin={isAdmin} value={plan.price} onChange={newVal => handlePlanChange(planIndex, 'price', newVal)} />
                    </span>
                    <RichEditableField as="span" isAdmin={isAdmin} value={plan.frequency} onChange={newVal => handlePlanChange(planIndex, 'frequency', newVal)} className="text-base sm:text-lg font-medium text-gray-500" />
                  </div>
                  <ul className="space-y-4 text-left text-sm sm:text-base text-gray-600 mb-8 flex-grow">
                    {(plan.features || []).map((feature, featureIndex) => {
                      if (!feature) return null;
                      return (
                        <li key={feature.id} className="flex items-start">
                          <CheckIcon />
                          <RichEditableField as="span" isAdmin={isAdmin} value={feature.text} onChange={newVal => handleFeatureChange(planIndex, featureIndex, newVal)} className="ml-3 flex-1" />
                        </li>
                      )
                    })}
                  </ul>
                  <a href="#appointment" className={`w-full text-center font-bold py-3 px-8 rounded-full text-base sm:text-lg transition-all duration-300 mt-auto ${plan.isPopular ? 'bg-brand-purple text-white hover:bg-purple-700' : 'bg-primary text-white hover:bg-opacity-90'}`}>
                    Choose Plan
                  </a>
                </div>
              </AnimatedCard>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;