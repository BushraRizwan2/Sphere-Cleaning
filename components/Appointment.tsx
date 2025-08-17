

import React, { useState, useEffect } from 'react';
import RichEditableField from './RichEditableField';
import type { Section, AppointmentContent, Service } from '../types';
import MediaDisplay from './MediaDisplay';
import AnimatedCard from './AnimatedCard';
import { stripHtml } from '../utils';

interface AppointmentProps {
    isAdmin: boolean;
    section: Section<AppointmentContent>;
    onSectionChange: (newSection: Section<AppointmentContent>) => void;
    allServices?: Service[];
    phoneNumber?: string;
}

const Appointment: React.FC<AppointmentProps> = ({ isAdmin, section, onSectionChange, allServices = [], phoneNumber }) => {
  if (!section?.content) {
    return null;
  }
  const { content, styles } = section;
  const { title, subtitle, imageLayout, imageSrc } = content;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    // This effect pre-fills the service dropdown if a service ID is in the URL hash.
    const handleServicePreselection = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#/appointment?service=')) {
            const serviceId = hash.substring('#/appointment?service='.length);
            const selectedService = allServices.find(s => s.id === serviceId);
            if (selectedService) {
                setFormData(prev => ({ ...prev, service: stripHtml(selectedService.title) }));
            }
        }
    };

    handleServicePreselection();

    // Listen for hash changes to update the form if the user navigates while on the page.
    window.addEventListener('hashchange', handleServicePreselection);
    return () => window.removeEventListener('hashchange', handleServicePreselection);
  }, [allServices]);


  const onContentChange = (field: keyof AppointmentContent, value: string) => {
    onSectionChange({ ...section, content: { ...content, [field]: value } });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = { name: '', email: '', phone: '', service: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
        newErrors.name = 'Full Name is required.';
        isValid = false;
    }
    if (!formData.email.trim()) {
        newErrors.email = 'Email Address is required.';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email address is invalid.';
        isValid = false;
    }
    if (!formData.phone.trim()) {
        newErrors.phone = 'Phone Number is required.';
        isValid = false;
    }
    if (!formData.service) {
        newErrors.service = 'Please select a service.';
        isValid = false;
    }
    if (!formData.message.trim()) {
        newErrors.message = 'Message is required.';
        isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
          setIsSubmitted(true);
          // Don't clear form data immediately, user might want to see what they sent.
      }
  }

  const handleNewRequest = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  }
  
  const ImageComponent = () => (
    <AnimatedCard animation="fade-up" className="lg:w-1/2 w-full">
        <MediaDisplay 
            src={imageSrc || ''} 
            alt="Appointment visual" 
            className="rounded-lg shadow-2xl w-full h-auto object-cover max-h-[500px]"
        />
    </AnimatedCard>
  );

  return (
    <section className="py-16 lg:py-20 bg-cover bg-center" style={{...styles, backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-12">
            <RichEditableField
                isAdmin={isAdmin}
                value={title || ''}
                onChange={(newTitle) => onContentChange('title', newTitle)}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading leading-tight"
                style={{color: styles.textColor}}
            />
            <RichEditableField
                isAdmin={isAdmin}
                value={subtitle || ''}
                onChange={(newSubtitle) => onContentChange('subtitle', newSubtitle)}
                className="mt-4 text-base sm:text-lg max-w-3xl mx-auto"
                style={{color: styles.textColor, opacity: 0.8}}
            />
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
            {imageLayout === 'left' && <ImageComponent />}

            <div className={`w-full ${imageLayout !== 'none' ? 'lg:w-1/2' : 'max-w-2xl'}`}>
                <div className="bg-white p-8 rounded-lg shadow-2xl mx-auto">
                    {isSubmitted ? (
                        <div className="text-center">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Thank You!</h3>
                            <p className="text-gray-600 mb-6 text-sm sm:text-base">Your request has been sent. We will get back to you shortly.</p>
                            <button onClick={handleNewRequest} className="w-full bg-primary text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg hover:bg-opacity-90 transition-all duration-300">
                                Submit Another Request
                            </button>
                        </div>
                    ) : (
                    <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-left">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.name ? 'border-red-500' : 'border-gray-300'}`} placeholder="John Doe" />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder="you@example.com"/>
                             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                         <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} placeholder="(555) 123-4567"/>
                             {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                            <label htmlFor="service-type" className="block text-sm font-medium text-gray-700">Service Type</label>
                            <select id="service-type" name="service" value={formData.service} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.service ? 'border-red-500' : 'border-gray-300'}`}>
                                <option value="" disabled>Select a service...</option>
                                {(allServices || []).map(service => {
                                    if (!service || !service.id) return null;
                                    const serviceTitle = stripHtml(service.title);
                                    return (
                                        <option key={service.id} value={serviceTitle}>
                                            {serviceTitle}
                                        </option>
                                    )
                                })}
                                <option value="Other">Other</option>
                            </select>
                            {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.message ? 'border-red-500' : 'border-gray-300'}`} placeholder="Tell us about your cleaning needs..."></textarea>
                            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="w-full bg-secondary text-primary font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg hover:bg-yellow-400 transition-all duration-300 shadow-lg transform hover:scale-105">
                                Get a Free Quote
                            </button>
                        </div>
                    </form>
                    )}
                </div>

                {typeof phoneNumber === 'string' && phoneNumber && (
                    <p className="text-center mt-8 text-base sm:text-lg" style={{ color: styles.textColor, opacity: 0.9 }}>
                        Or call us at: <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="font-bold hover:underline">{phoneNumber}</a>
                    </p>
                )}
            </div>
            
            {imageLayout === 'right' && <ImageComponent />}
        </div>
      </div>
    </section>
  );
};

export default Appointment;