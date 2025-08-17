

import React, { useState } from 'react';
import type { FaqItem } from '../types';

interface FAQAccordionProps {
  faqs: FaqItem[];
}

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
);

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ease-in-out bg-gray-50">
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex justify-between items-center p-4 sm:p-5 text-left text-base sm:text-lg font-semibold text-gray-800 hover:bg-gray-100/50 active:bg-gray-200/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary focus:ring-opacity-50 transition-colors"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span>{faq.question}</span>
            <div className="flex-shrink-0 ml-4 text-primary">
                {openIndex === index ? <MinusIcon /> : <PlusIcon />}
            </div>
          </button>
          <div
            id={`faq-answer-${index}`}
            className={`grid transition-all duration-500 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
          >
             <div className="overflow-hidden">
                <div className="p-4 sm:p-5 text-gray-600 border-t border-gray-200">
                  <p className="text-sm sm:text-base">{faq.answer}</p>
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;