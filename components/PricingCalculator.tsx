
import React, { useState, useEffect, useMemo } from 'react';
import type { PricingInfo } from '../types';

interface PricingCalculatorProps {
    pricing: PricingInfo;
    serviceId: string;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ pricing, serviceId }) => {
    const [quantity, setQuantity] = useState(1000);

    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => Math.max(0, prev + amount));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
        setQuantity(isNaN(value) ? 0 : value);
    };
    
    const calculatedPrice = useMemo(() => {
        if (pricing.type === 'per_unit' && pricing.basePrice && quantity > 0) {
            return (quantity * pricing.basePrice).toFixed(2);
        }
        return null;
    }, [pricing, quantity]);

    const ActionButton = ({ href, text }: { href: string, text: string }) => (
        <a href={href} className="mt-6 w-full block bg-secondary text-primary text-center font-bold py-3 px-8 rounded-full text-base sm:text-lg hover:bg-yellow-400 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95">
            {text}
        </a>
    );

    return (
        <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/30 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-gray-800 mb-6 text-center">Get an Instant Estimate</h3>

            {pricing.type === 'fixed' && (
                <div className="text-center">
                    <p className="text-gray-600">Starting From:</p>
                    <p className="text-4xl sm:text-5xl font-extrabold text-primary my-2">${pricing.basePrice}</p>
                    <p className="text-sm text-gray-500">for a standard service package.</p>
                    <ActionButton href={`#appointment?service=${serviceId}`} text="Book Now" />
                </div>
            )}
            
            {pricing.type === 'per_unit' && pricing.unitName && (
                <div className="space-y-4">
                    <label htmlFor="unit-input" className="block text-center font-medium text-gray-700 capitalize">
                        Enter your {pricing.unitName}
                    </label>
                    <div className="flex items-center justify-center space-x-2">
                         <button onClick={() => handleQuantityChange(-100)} className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-300 active:bg-gray-400 transition-colors">-</button>
                        <input
                            type="text"
                            id="unit-input"
                            value={quantity}
                            onChange={handleInputChange}
                            className="w-24 h-10 text-xl sm:w-28 sm:h-12 sm:text-2xl text-center font-bold border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                         <button onClick={() => handleQuantityChange(100)} className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-300 active:bg-gray-400 transition-colors">+</button>
                    </div>
                     {calculatedPrice !== null && (
                        <div className="text-center bg-primary/10 p-4 rounded-lg transition-all duration-300">
                            <p className="text-gray-600 text-sm">Estimated Price:</p>
                            <p className="text-3xl sm:text-4xl font-extrabold text-primary">${calculatedPrice}</p>
                        </div>
                    )}
                    <ActionButton href={`#appointment?service=${serviceId}`} text="Book Now" />
                </div>
            )}

            {pricing.type === 'quote' && (
                <div className="text-center">
                    <p className="text-sm sm:text-base text-gray-600 mb-4">This service requires a custom evaluation for accurate pricing to meet your specific needs.</p>
                    <ActionButton href={`#appointment?service=${serviceId}`} text="Request a Free Quote" />
                </div>
            )}
        </div>
    );
};

export default PricingCalculator;