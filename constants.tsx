

import React from 'react';
import type { NavLink, Section, SectionType, GlobalStyles, HeroContent, HowItWorksContent, AboutContent, AppointmentContent, ServicesContent, WhyChooseUsContent, PricingContent, TeamContent, TestimonialsContent, BlogContent, Author, BlogPost, SiteConfig, Service, HowItWorksStep, Benefit, PricingPlan, TeamMember, Testimonial, FaqItem, KeyBenefit, Industry } from './types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  phoneNumber: '+92 322 6153093',
  emailAddress: 'bushrarizwan2@gmail.com',
  physicalAddress: '123 Clean St, Sparkle City, USA 12345',
  navLinks: [
    { id: 'nav-1', name: 'How It Works', href: '#how-it-works' },
    { id: 'nav-2', name: 'About', href: '#about' },
    { id: 'nav-3', name: 'Services', href: '#services' },
    { id: 'nav-4', name: 'Pricing', href: '#pricing' },
    { id: 'nav-5', name: 'Team', href: '#team' },
    { id: 'nav-6', name: 'Testimonials', href: '#testimonials' },
  ],
  socialLinks: [
    { id: 'fb', name: 'Facebook', url: 'https://www.facebook.com/BushraRizwanKhan/' },
    { id: 'tw', name: 'Twitter', url: 'https://x.com/bushra_rizwan' },
    { id: 'li', name: 'LinkedIn', url: 'https://www.linkedin.com/in/bushrarizwan/' },
    { id: 'ig', name: 'Instagram', url: 'https://www.instagram.com/bushrarizwankhan/' },
    { id: 'wa', name: 'WhatsApp', url: 'https://wa.me/923226153093' },
  ],
  headerBackgroundColor: '#FFFFFF',
  footerBackgroundColor: '#F3F4F6',
};


export const INITIAL_GLOBAL_STYLES: GlobalStyles = {
  colors: {
    primary: '#1E3A8A',
    secondary: '#FBBF24',
    text: '#4A4A4A',
    background: '#FFFFFF',
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  }
};

export const AVAILABLE_FONTS = [
  { name: 'Poppins', value: "'Poppins', sans-serif" },
  { name: 'Montserrat', value: "'Montserrat', sans-serif" },
  { name: 'Lato', value: "'Lato', sans-serif" },
  { name: 'Roboto', value: "'Roboto', sans-serif" },
];

export const AVAILABLE_ANIMATIONS = [
  { name: 'None', value: 'none' },
  { name: 'Fade In', value: 'fade-in' },
  { name: 'Fade Up', value: 'fade-up' },
  { name: 'Slide In Left', value: 'slide-in-left' },
  { name: 'Slide In Right', value: 'slide-in-right' },
  { name: 'Zoom In', value: 'zoom-in' },
];

// --- SVG ICONS ---
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const CleanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m-3-4l6-6m0 0l6 6m-6-6v12" /></svg>;
const RelaxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const QualityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const EcoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10s5 2 5 2a8 8 0 013.657 6.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.929 15.121A4.002 4.002 0 0014.878 10.17a4 4 0 00-4.95-4.95" /></svg>;
const CertifiedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;
const SupportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PlaceholderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;

export const ICONS: Record<string, React.FC> = {
  book: BookIcon,
  clean: CleanIcon,
  relax: RelaxIcon,
  quality: QualityIcon,
  eco: EcoIcon,
  certified: CertifiedIcon,
  support: SupportIcon,
  home: PlaceholderIcon,
  office: PlaceholderIcon,
  hospital: PlaceholderIcon,
  car: PlaceholderIcon,
  factory: PlaceholderIcon,
  kitchen: PlaceholderIcon,
  store: PlaceholderIcon,
  school: PlaceholderIcon,
  hotel: PlaceholderIcon,
  sofa: PlaceholderIcon,
  window: PlaceholderIcon,
  leaf: EcoIcon,
  helmet: PlaceholderIcon,
  mop: PlaceholderIcon,
  biohazard: PlaceholderIcon,
  pool: PlaceholderIcon,
  dumbbell: PlaceholderIcon,
  party: PlaceholderIcon,
  'air-duct': PlaceholderIcon,
  'water-gun': PlaceholderIcon,
  guarantee: QualityIcon,
  team: PlaceholderIcon,
  health: PlaceholderIcon,
  productivity: PlaceholderIcon,
  safety: PlaceholderIcon,
  'first-impression': PlaceholderIcon,
  compliance: PlaceholderIcon,
  value: PlaceholderIcon,
  'guest-satisfaction': PlaceholderIcon,
  lifespan: PlaceholderIcon,
  'curb-appeal': PlaceholderIcon,
  'property-protection': PlaceholderIcon,
  efficiency: PlaceholderIcon,
  time: PlaceholderIcon,
  tools: PlaceholderIcon,
  'peace-of-mind': RelaxIcon,
  sparkle: CleanIcon,
  check: QualityIcon,
};

const blogAuthors: Author[] = [
    {
      name: 'Bushra Rizwan',
      role: 'Lead Content Creator',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&auto=format&fit=crop&q=60',
    },
    {
      name: 'Burhan Rizwan',
      role: 'Technical Cleaning Specialist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&auto=format&fit=crop&q=60',
    },
    {
      name: 'Maryum Younus',
      role: 'Home Organization Expert',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop&q=60',
    },
    {
      name: 'Alex Johnson',
      role: 'Cleaning Expert & Content Lead',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&auto=format&fit=crop&q=60',
    }
];

export const blogAuthor: Author = blogAuthors[0];

// --- CONTENT DEFINITIONS ---

// Services
const allServices: Service[] = [
    { 
        id: 'residential-cleaning', 
        image: 'https://images.unsplash.com/photo-1585435465945-bef5a93f8e49?auto=format&fit=crop&w=1200&q=80', 
        title: 'Residential Cleaning', 
        shortIntro: 'A pristine home environment, tailored to your needs.', 
        description: '<p>Comprehensive cleaning for homes, apartments, and condos. We ensure your living space is a sanctuary of cleanliness.</p>', 
        detailedDescription: '<h2>A Sanctuary of Cleanliness, Tailored for You</h2><p>Your home is your sanctuary, a place of comfort and relaxation. At CleanSphere, we\'re dedicated to preserving that peace with our meticulous residential cleaning services. Our trained professionals go beyond the surface, using eco-friendly products and a detailed checklist to ensure every room is hygienically clean and refreshingly tidy. From sparkling kitchens and bathrooms to dust-free living areas and pristine bedrooms, we handle the details so you can enjoy your home to the fullest. Whether you need a one-time deep clean or regular maintenance, we customize our services to fit your lifestyle and specific needs, giving you back valuable time and peace of mind.</p>', 
        pricing: { type: 'per_unit', basePrice: 0.15, unitName: 'sq. ft.' }, 
        gallery: [
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687932-e3a728263724?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1595428774223-ef9252c872c5?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1560185010-254585c54099?auto=format&fit=crop&w=1200&q=80'
        ],
        faqs: [
            { id: 'rc-faq-1', question: 'Do I need to be home for the cleaning?', answer: 'No, you do not need to be home. Most of our clients provide us with a key or code for access. Our team is fully vetted and insured for your peace of mind.' },
            { id: 'rc-faq-2', question: 'Do you bring your own supplies and equipment?', answer: 'Yes, we arrive with all the necessary high-quality, eco-friendly cleaning supplies and professional-grade equipment to get the job done right.' },
            { id: 'rc-faq-3', question: 'Can I request special attention to certain areas?', answer: 'Absolutely! We encourage you to let us know of any specific areas or tasks you\'d like us to focus on. We can customize the cleaning plan to meet your needs.' }
        ], 
        packageIncludes: [
            { id: 'rc-pi-1', icon: 'kitchen', title: 'Kitchen Cleaning', description: 'Countertops, sink, appliance exteriors, floors.', image: 'https://images.unsplash.com/photo-1600585152220-01629c74D38c?auto=format&fit=crop&w=600&q=60' },
            { id: 'rc-pi-2', icon: 'mop', title: 'Bathroom Sanitization', description: 'Toilets, showers, sinks, and floors scrubbed and disinfected.', image: 'https://images.unsplash.com/photo-1581622323338-232def4142b9?auto=format&fit=crop&w=600&q=60' },
            { id: 'rc-pi-3', icon: 'sofa', title: 'Living Areas', description: 'Dusting all surfaces, vacuuming carpets, tidying up.', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=60' },
            { id: 'rc-pi-4', icon: 'window', title: 'Bedroom Tidying', description: 'Making beds, dusting furniture, vacuuming or mopping.', image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16da31?auto=format&fit=crop&w=600&q=60' }
        ],
        keyBenefits: [
            { id: 'rc-kb-1', icon: 'time', title: 'More Free Time', description: 'Reclaim your weekends and spend more time on what you love.' },
            { id: 'rc-kb-2', icon: 'health', title: 'Healthier Environment', description: 'Our deep cleaning removes allergens, dust, and bacteria.' },
            { id: 'rc-kb-3', icon: 'peace-of-mind', title: 'Stress-Free Living', description: 'Enjoy the peace of mind that comes with a consistently clean home.' }
        ],
        industries: [],
    },
    { 
        id: 'office-cleaning', 
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
        title: 'Office Cleaning', 
        shortIntro: 'A clean workspace to boost productivity and professionalism.', 
        description: '<p>Customized cleaning plans for corporate offices, co-working spaces, and small businesses to maintain a pristine work environment.</p>',
        detailedDescription: '',
        pricing: { type: 'quote' },
        gallery: [
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80'
        ],
        faqs: [
            { id: 'oc-faq-1', question: 'Can you clean during our business hours?', answer: 'We offer flexible scheduling, including after-hours and weekend services, to ensure our cleaning process never disrupts your business operations.' },
            { id: 'oc-faq-2', question: 'Are your cleaning services insured?', answer: 'Yes, CleanSphere is fully licensed, bonded, and insured, providing complete protection and peace of mind for your business.' },
            { id: 'oc-faq-3', question: 'Do you offer customized cleaning checklists?', answer: 'Absolutely. We work with each client to develop a customized cleaning plan that meets the specific needs, schedule, and budget of their facility.' }
        ],
        packageIncludes: [
            { id: 'oc-pi-1', icon: 'office', title: 'Workstation Sanitization', description: 'Desks, chairs, and high-touch surfaces.', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=60' },
            { id: 'oc-pi-2', icon: 'clean', title: 'Common Area Cleaning', description: 'Lobbies, kitchens, and break rooms.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=60' },
            { id: 'oc-pi-3', icon: 'mop', title: 'Restroom Hygiene', description: 'Thorough cleaning and restocking.', image: 'https://images.unsplash.com/photo-1590726489223-38f203883a9e?auto=format&fit=crop&w=600&q=60' },
            { id: 'oc-pi-4', icon: 'window', title: 'Trash & Recycling', description: 'Daily removal and liner replacement.', image: 'https://images.unsplash.com/photo-1574974671999-d5b95b8a4a4d?auto=format&fit=crop&w=600&q=60' }
        ],
        keyBenefits: [
            { id: 'oc-kb-1', icon: 'productivity', title: 'Increased Productivity', description: 'A clean environment minimizes distractions and boosts employee focus.' },
            { id: 'oc-kb-2', icon: 'first-impression', title: 'Positive First Impression', description: 'Impress clients and visitors with a consistently clean and professional space.' },
            { id: 'oc-kb-3', icon: 'health', title: 'Healthier Workplace', description: 'Reduce sick days by minimizing the spread of germs and allergens.' }
        ],
        industries: [
            { id: 'ind-corp', icon: 'office', name: 'Corporate Offices' },
            { id: 'ind-tech', icon: 'support', name: 'Tech Startups' },
            { id: 'ind-law', icon: 'book', name: 'Law Firms' },
            { id: 'ind-real', icon: 'home', name: 'Real Estate' },
        ],
    },
    { 
        id: 'hospital-cleaning', 
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
        title: 'Hospital & Healthcare Cleaning', 
        shortIntro: 'Specialized sanitation for healthcare environments.',
        description: '<p>HIPAA-compliant cleaning services for hospitals, clinics, and labs, focusing on infection control and patient safety.</p>',
        detailedDescription: '',
        pricing: { type: 'quote' },
        gallery: [],
        faqs: [],
        packageIncludes: [],
        keyBenefits: [],
        industries: [],
    },
    { 
        id: 'car-cleaning', 
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
        title: 'Auto Detailing', 
        shortIntro: 'Meticulous interior and exterior car cleaning.',
        description: '<p>Restore your vehicle\'s shine with our professional detailing services, from interior vacuuming to exterior wax and polish.</p>',
        detailedDescription: '',
        pricing: { type: 'fixed', basePrice: 150 },
        gallery: [],
        faqs: [],
        packageIncludes: [],
        keyBenefits: [],
        industries: [],
    },
    { 
        id: 'industrial-cleaning', 
        image: 'https://images.unsplash.com/photo-1621905252472-942b083b9dd6?auto=format&fit=crop&w=1200&q=80', 
        title: 'Industrial Cleaning', 
        shortIntro: 'Heavy-duty cleaning solutions for manufacturing and industrial facilities.', 
        description: '<p>Specialized cleaning for factories, warehouses, and power plants, ensuring safety, compliance, and operational efficiency.</p>',
        detailedDescription: '<h2>Maintaining Safety and Efficiency in Demanding Environments</h2><p>Industrial facilities require a level of cleaning that goes far beyond a standard commercial service. CleanSphere offers specialized, heavy-duty cleaning solutions designed to meet the rigorous demands of manufacturing plants, warehouses, and distribution centers. Our certified team is trained in industrial safety protocols and equipped with advanced machinery to handle everything from degreasing heavy equipment and concrete floors to high-level dusting and hazardous material cleanup. We work to minimize downtime and ensure your facility not only meets but exceeds OSHA and other regulatory standards, creating a safer, more productive, and compliant operational environment.</p>',
        pricing: { type: 'quote' },
        gallery: [
            'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1579751381907-2a47e1953874?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1621905252472-942b083b9dd6?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1581092917113-d12a38a164d4?auto=format&fit=crop&w=1200&q=80'
        ],
        faqs: [
            { id: 'ic-faq-1', question: 'Are your staff trained for industrial environments?', answer: 'Yes, our teams undergo rigorous training, including OSHA safety standards, equipment operation, and handling of industrial-grade cleaning chemicals.' },
            { id: 'ic-faq-2', question: 'Can you handle hazardous materials?', answer: 'We are equipped and certified to handle specific types of non-toxic and certain regulated material cleanups. Please contact us to discuss the specific needs of your facility.' },
            { id: 'ic-faq-3', question: 'Can you work around our production schedule?', answer: 'Absolutely. We specialize in creating flexible cleaning schedules, including shutdowns, weekends, and overnight shifts, to minimize disruption to your operations.' }
        ],
        packageIncludes: [
            { id: 'ic-pi-1', icon: 'factory', title: 'Heavy Equipment Cleaning', description: 'Degreasing and detailing of machinery.' },
            { id: 'ic-pi-2', icon: 'mop', title: 'Concrete Floor Care', description: 'Scrubbing, sealing, and polishing.' },
            { id: 'ic-pi-3', icon: 'helmet', title: 'High-Level Dusting', description: 'Cleaning of rafters, pipes, and ceilings.' },
            { id: 'ic-pi-4', icon: 'biohazard', title: 'Warehouse & Plant Sweeping', description: 'Large-scale debris and dust removal.' }
        ],
        keyBenefits: [
            { id: 'ic-kb-1', icon: 'safety', title: 'Enhanced Safety', description: 'Reduce slips, trips, and fire hazards with a professionally cleaned facility.' },
            { id: 'ic-kb-2', icon: 'compliance', title: 'Regulatory Compliance', description: 'Meet and exceed OSHA, EPA, and other industry standards with confidence.' },
            { id: 'ic-kb-3', icon: 'lifespan', title: 'Asset Longevity', description: 'Proper cleaning and maintenance extends the life of your expensive equipment.' }
        ],
        industries: [],
    },
    { 
        id: 'commercial-kitchen-cleaning', 
        image: 'https://images.unsplash.com/photo-1556911220-e1af84793e36?auto=format&fit=crop&w=1200&q=80', 
        title: 'Commercial Kitchen Cleaning', 
        shortIntro: 'Deep cleaning and sanitization for restaurants and food service establishments.', 
        description: '<p>Ensure health code compliance and a safe, hygienic environment with our certified kitchen deep cleaning services.</p>',
        detailedDescription: '<h2>Exceeding Health Standards for a Flawless Kitchen</h2><p>A pristine commercial kitchen is the backbone of any successful food establishment. CleanSphere provides certified deep cleaning services that target the tough grease, grime, and bacteria that daily cleaning can miss. Our experts are trained to dismantle, clean, and sanitize all cooking equipment, from fryers and grills to ovens and exhaust hoods. We follow strict health code protocols to ensure every surface is hygienically clean, reducing fire hazards and ensuring a safe environment for your staff and patrons. Partner with us to pass health inspections with flying colors and maintain a kitchen that reflects the quality of your cuisine.</p>',
        pricing: { type: 'quote' },
        gallery: [
            'https://images.unsplash.com/photo-1600565193348-f74d3c2723a9?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1556911220-e1af84793e36?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1623961734796-030f2145b2c7?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1581352163970-5b591b6f8f53?auto=format&fit=crop&w=1200&q=80'
        ],
        faqs: [
            { id: 'ckc-faq-1', question: 'How often should a commercial kitchen be deep cleaned?', answer: 'We recommend a full deep clean quarterly, with more frequent cleaning of high-use equipment like exhaust hoods, which should be cleaned according to NFPA 96 standards.' },
            { id: 'ckc-faq-2', question: 'Are your cleaning products food-safe?', answer: 'Yes, we use industry-approved, food-safe degreasers, sanitizers, and cleaning agents to ensure your kitchen is safe for food preparation immediately after our service.' },
            { id: 'ckc-faq-3', question: 'Do you provide a certificate of cleaning?', answer: 'Yes, upon completion of a full kitchen deep clean, especially for exhaust systems, we provide a certificate that you can use for insurance and health inspection purposes.' }
        ],
        packageIncludes: [
            { id: 'ckc-pi-1', icon: 'kitchen', title: 'Exhaust Hood & Duct Degreasing', description: 'Complete cleaning to NFPA 96 standards.' },
            { id: 'ckc-pi-2', icon: 'mop', title: 'Cooking Equipment Detailing', description: 'Deep cleaning of fryers, grills, ovens, and ranges.' },
            { id: 'ckc-pi-3', icon: 'clean', title: 'Floor & Wall Cleaning', description: 'Degreasing and sanitizing all surfaces.' },
            { id: 'ckc-pi-4', icon: 'office', title: 'Appliance & Counter Sanitization', description: 'Stainless steel polishing and surface disinfection.' }
        ],
        keyBenefits: [
            { id: 'ckc-kb-1', icon: 'compliance', title: 'Health Code Compliance', description: 'Ensure you pass every health inspection with our thorough, documented cleaning.' },
            { id: 'ckc-kb-2', icon: 'safety', title: 'Fire Prevention', description: 'Regularly removing grease buildup from exhaust systems is critical for fire safety.' },
            { id: 'ckc-kb-3', icon: 'health', title: 'Food Safety', description: 'Eliminate cross-contamination risks and ensure a hygienic food preparation area.' }
        ],
        industries: [],
    },
    { 
        id: 'retail-store-cleaning', 
        image: 'https://images.unsplash.com/photo-1557142646-3e6df110315c?auto=format&fit=crop&w=1200&q=80', 
        title: 'Retail Store Cleaning', 
        shortIntro: 'Creating an inviting shopping experience for your customers.', 
        description: '<p>From pristine floors to sparkling clean windows and fitting rooms, we help your retail space shine and attract more customers.</p>',
        detailedDescription: '',
        pricing: { type: 'quote' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
    { 
        id: 'school-and-educational-facility-cleaning', 
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80', 
        title: 'School & University Cleaning', 
        shortIntro: 'A safe and healthy learning environment for students and staff.', 
        description: '<p>Specialized cleaning for classrooms, hallways, gyms, and cafeterias, focusing on disinfection and student well-being.</p>',
        detailedDescription: '',
        pricing: { type: 'quote' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
    { 
        id: 'hotel-and-hospitality-cleaning', 
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80', 
        title: 'Hotel & Hospitality Cleaning', 
        shortIntro: 'Impeccable cleanliness to ensure outstanding guest experiences.', 
        description: '<p>Comprehensive cleaning services for lobbies, guest rooms, common areas, and back-of-house to uphold your brand\'s reputation.</p>',
        detailedDescription: '',
        pricing: { type: 'quote' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
    { 
        id: 'carpet-and-upholstery-cleaning', 
        image: 'https://images.unsplash.com/photo-1605400323980-336c5737b019?auto=format&fit=crop&w=1200&q=80', 
        title: 'Carpet & Upholstery Cleaning', 
        shortIntro: 'Revitalize your fabrics and extend their life.', 
        description: '<p>Deep steam cleaning and stain removal for carpets, rugs, sofas, and office chairs, removing dirt, allergens, and odors.</p>',
        detailedDescription: '',
        pricing: { type: 'per_unit', basePrice: 0.40, unitName: 'sq. ft.' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
    { 
        id: 'window-cleaning', 
        image: 'https://images.unsplash.com/photo-1600880292212-ff5a9b4f7678?auto=format&fit=crop&w=1200&q=80', 
        title: 'Window Cleaning', 
        shortIntro: 'Streak-free clarity for a brighter view.', 
        description: '<p>Professional interior and exterior window washing for residential and commercial buildings of all sizes.</p>',
        detailedDescription: '',
        pricing: { type: 'per_unit', basePrice: 8, unitName: 'window pane' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
    { 
        id: 'eco-friendly-cleaning', 
        image: 'https://images.unsplash.com/photo-1583947215259-38e34be8751f?auto=format&fit=crop&w=1200&q=80', 
        title: 'Eco-Friendly "Green" Cleaning', 
        shortIntro: 'Effective cleaning that\'s safe for your family and the planet.', 
        description: '<p>Our commitment to sustainability, using certified green products and methods that are powerful yet non-toxic.</p>',
        detailedDescription: '',
        pricing: { type: 'quote' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
    { 
        id: 'post-construction-cleaning', 
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80', 
        title: 'Post-Construction Cleaning', 
        shortIntro: 'The final touch to make your new build or renovation shine.', 
        description: '<p>Detailed cleanup of dust, debris, and residues to make your newly constructed space move-in ready.</p>',
        detailedDescription: '',
        pricing: { type: 'quote' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
    { 
        id: 'janitorial-services', 
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80', 
        title: 'Janitorial Services', 
        shortIntro: 'Reliable, ongoing maintenance for your facility.', 
        description: '<p>Daily, weekly, or monthly janitorial contracts to keep your commercial property consistently clean and well-maintained.</p>',
        detailedDescription: '',
        pricing: { type: 'quote' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
    { 
        id: 'disaster-and-trauma-cleaning', 
        image: 'https://images.unsplash.com/photo-1615715877413-c24654e929c8?auto=format&fit=crop&w=1200&q=80', 
        title: 'Disaster & Trauma Cleaning', 
        shortIntro: 'Discreet and professional cleanup for sensitive situations.', 
        description: '<p>Certified and compassionate services for biohazard remediation, water damage, and fire restoration cleanup.</p>',
        detailedDescription: '',
        pricing: { type: 'quote' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
    { 
        id: 'pool-and-spa-cleaning', 
        image: 'https://images.unsplash.com/photo-1562798453-6b458d7c4613?auto=format&fit=crop&w=1200&q=80', 
        title: 'Pool & Spa Cleaning', 
        shortIntro: 'Crystal clear water for your home or facility.', 
        description: '<p>Comprehensive pool and spa maintenance, including water testing, chemical balancing, and tile cleaning.</p>',
        detailedDescription: '',
        pricing: { type: 'quote' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
    { 
        id: 'gym-and-fitness-center-cleaning', 
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80', 
        title: 'Gym & Fitness Center Cleaning', 
        shortIntro: 'A hygienic environment for a healthy workout.', 
        description: '<p>Specialized cleaning of workout equipment, locker rooms, and high-traffic areas to prevent the spread of germs.</p>',
        detailedDescription: '',
        pricing: { type: 'quote' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
    { 
        id: 'event-venue-cleaning', 
        image: 'https://images.unsplash.com/photo-1599819199347-797f748f572e?auto=format&fit=crop&w=1200&q=80', 
        title: 'Event Venue Cleaning', 
        shortIntro: 'Pre and post-event cleaning for a flawless occasion.', 
        description: '<p>Fast and efficient cleanup for concert halls, wedding venues, and conference centers, ensuring a spotless space for every event.</p>',
        detailedDescription: '',
        pricing: { type: 'quote' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
    { 
        id: 'air-duct-and-hvac-cleaning', 
        image: 'https://images.unsplash.com/photo-1615655406009-6d8123654f57?auto=format&fit=crop&w=1200&q=80', 
        title: 'Air Duct & HVAC Cleaning', 
        shortIntro: 'Improve air quality and system efficiency.', 
        description: '<p>Thorough cleaning of your HVAC system and ductwork to remove dust, allergens, and contaminants for healthier indoor air.</p>',
        detailedDescription: '',
        pricing: { type: 'quote' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
    { 
        id: 'pressure-washing', 
        image: 'https://images.unsplash.com/photo-1594025341389-234399b3a3c3?auto=format&fit=crop&w=1200&q=80', 
        title: 'Pressure Washing', 
        shortIntro: 'Instantly boost your property\'s curb appeal.', 
        description: '<p>Powerful and safe pressure washing for building exteriors, sidewalks, driveways, and decks to remove grime, mold, and stains.</p>',
        detailedDescription: '',
        pricing: { type: 'per_unit', basePrice: 0.25, unitName: 'sq. ft.' },
        gallery: [], faqs: [], packageIncludes: [], keyBenefits: [], industries: [],
    },
];

const allPosts: BlogPost[] = [
    { 
        id: 'how-to-stay-clean-tidy-during-a-busy-week',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        title: 'How to Stay Clean & Tidy During a Busy Week',
        date: 'October 26, 2023',
        comments: 12,
        author: blogAuthors[0],
        content: '',
    },
    { 
        id: 'the-secret-of-cleaning-less-is-more',
        image: 'https://images.unsplash.com/photo-1596637311746-85f5b6f00f1c?auto=format&fit=crop&w=1200&q=80',
        title: 'The Secret of Cleaning: Less Is More',
        date: 'October 24, 2023',
        comments: 8,
        author: blogAuthors[1],
        content: `
            <h2>The "Less is More" Philosophy in Cleaning</h2>
            <p>In a world that often glorifies "more" – more stuff, more activities, more hustle – the concept of "less is more" can feel revolutionary. When applied to cleaning, this philosophy isn't about neglecting your home; it's about being smarter and more intentional with your efforts. It’s about creating systems that prevent messes from getting out of control, allowing you to spend less time cleaning overall while enjoying a consistently tidier space.</p>
            <p>The core idea is to shift from reactive deep-cleaning marathons to proactive, small, and consistent habits. Instead of letting clutter and dirt pile up until it becomes an overwhelming weekend project, you integrate tiny cleaning tasks into your daily routine. This approach reduces stress, saves time, and makes cleaning a manageable part of life rather than a dreaded chore.</p>
            
            <h2>Strategy 1: The "One-Touch" Rule</h2>
            <p>The One-Touch Rule is simple but incredibly effective: whenever you pick something up, put it away in its designated home immediately. Don't just move it from the coffee table to the counter. If it's a dish, take it to the dishwasher. If it's a piece of mail, open it, sort it, and discard the junk. This prevents "clutter migration," where items are shuffled from one surface to another, creating a constant state of untidiness.</p>
            <blockquote>By handling an item just once, you eliminate the mental and physical energy required to deal with it multiple times later. It's a powerful habit for maintaining a clutter-free environment with minimal effort.</blockquote>
            
            <img src="https://images.unsplash.com/photo-1528823793188-a14d48a15879?auto=format&fit=crop&w=1000&q=80" alt="Organized home entryway with items in their designated places." />

            <h2>Strategy 2: The 5-Minute Tidy-Up</h2>
            <p>You would be astonished at what can be accomplished in just five minutes. The 5-Minute Tidy-Up is a daily ritual that acts as a reset button for your home. Set a timer for five minutes at a consistent time each day – perhaps right before bed or after dinner – and tackle one high-traffic area.</p>
            <ul>
                <li><strong>Living Room:</strong> Fluff pillows, fold blankets, clear surfaces, and put away remotes.</li>
                <li><strong>Kitchen:</strong> Wipe down counters, put away any stray dishes, and sweep the floor.</li>
                <li><strong>Bedroom:</strong> Make the bed (if you didn't in the morning) and put away clothes.</li>
            </ul>
            <p>This isn't about deep cleaning. It's a quick, focused burst of activity that prevents daily clutter from accumulating. It keeps your home in a state of "ready," making it feel more peaceful and welcoming.</p>

            <h2>Strategy 3: Optimize Your Cleaning Caddy</h2>
            <p>How much time do you waste gathering cleaning supplies from under different sinks and closets? The secret to efficient cleaning is having the right tools ready to go. Create a centralized, portable cleaning caddy with your essential multi-purpose supplies.</p>
            <h3>Your Caddy Essentials:</h3>
            <ol>
                <li><strong>All-Purpose Cleaner:</strong> A good quality spray for surfaces, countertops, and spills.</li>
                <li><strong>Microfiber Cloths:</strong> Have a few on hand for dusting, wiping, and polishing.</li>
                <li><strong>Glass Cleaner:</strong> For mirrors and windows.</li>
                <li><strong>A Good Scrub Brush:</strong> For tackling tougher spots in the kitchen or bathroom.</li>
            </ol>
            <p>With a ready-to-go caddy, you can address messes the moment they happen, turning a potential chore into a 30-second task. To take it a step further, consider keeping a small set of basic supplies (like wipes) in each bathroom and the kitchen for immediate access.</p>
            <p>By adopting these simple, strategic habits, you'll find that you can maintain a cleaner, more organized home with significantly less time and stress. It’s not about doing more; it’s about doing less, more often. If you need a professional deep clean to get started, don't hesitate to <a href="#appointment">contact us at CleanSphere</a>!</p>
        `,
    },
    { 
        id: 'eco-friendly-cleaning-products-you-can-make-at-home',
        image: 'https://images.unsplash.com/photo-1616422285435-745275525927?auto=format&fit=crop&w=1200&q=80',
        title: 'Eco-Friendly Cleaning Products You Can Make at Home',
        date: 'October 21, 2023',
        comments: 15,
        author: blogAuthors[2],
        content: '',
    },
    { 
        id: 'the-ultimate-guide-to-decluttering-your-office-space',
        image: 'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=1200&q=80',
        title: 'The Ultimate Guide to Decluttering Your Office Space',
        date: 'October 18, 2023',
        comments: 5,
        author: blogAuthors[3],
        content: '',
    },
    { 
        id: '5-minute-cleaning-hacks-for-a-sparkling-kitchen',
        image: 'https://images.unsplash.com/photo-1600585152220-01629c74D38c?auto=format&fit=crop&w=1200&q=80',
        title: '5-Minute Cleaning Hacks for a Sparkling Kitchen',
        date: 'October 15, 2023',
        comments: 22,
        author: blogAuthors[0],
        content: '',
    },
    { 
        id: 'how-often-should-you-really-clean-everything-a-room-by-room-guide',
        image: 'https://images.unsplash.com/photo-1527515637462-c0b4c8d2873b?auto=format&fit=crop&w=1200&q=80',
        title: 'How Often Should You Really Clean Everything? A Room-by-Room Guide',
        date: 'October 12, 2023',
        comments: 18,
        author: blogAuthors[1],
        content: '',
    },
    { 
        id: 'the-top-10-benefits-of-a-clean-and-organized-home',
        image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80',
        title: 'The Top 10 Benefits of a Clean and Organized Home',
        date: 'October 9, 2023',
        comments: 25,
        author: blogAuthors[2],
        content: '',
    },
    { 
        id: 'spring-cleaning-checklist-a-deep-clean-for-every-room',
        image: 'https://images.unsplash.com/photo-1585435465945-bef5a93f8e49?auto=format&fit=crop&w=1200&q=80',
        title: 'Spring Cleaning Checklist: A Deep Clean for Every Room',
        date: 'October 5, 2023',
        comments: 11,
        author: blogAuthors[3],
        content: '',
    },
    { 
        id: 'post-construction-cleaning-why-its-best-left-to-pros',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
        title: 'Post-Construction Cleaning: Why It\'s Best Left to Pros',
        date: 'October 2, 2023',
        comments: 7,
        author: blogAuthors[0],
        content: '',
    },
    { 
        id: 'maximizing-productivity-with-a-clean-workspace',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
        title: 'Maximizing Productivity with a Clean Workspace',
        date: 'September 28, 2023',
        comments: 14,
        author: blogAuthors[1],
        content: '',
    },
    { 
        id: 'green-cleaning-protecting-your-family-and-the-planet',
        image: 'https://images.unsplash.com/photo-1583947215259-38e34be8751f?auto=format&fit=crop&w=1200&q=80',
        title: 'Green Cleaning: Protecting Your Family and the Planet',
        date: 'September 25, 2023',
        comments: 19,
        author: blogAuthors[2],
        content: '',
    },
    { 
        id: 'how-to-clean-and-disinfect-for-a-healthier-home',
        image: 'https://images.unsplash.com/photo-1584433144853-1ffae2426f54?auto=format&fit=crop&w=1200&q=80',
        title: 'How to Clean and Disinfect for a Healthier Home',
        date: 'September 21, 2023',
        comments: 21,
        author: blogAuthors[3],
        content: '',
    },
    { 
        id: 'the-overlooked-importance-of-window-cleaning',
        image: 'https://images.unsplash.com/photo-1600880292212-ff5a9b4f7678?auto=format&fit=crop&w=1200&q=80',
        title: 'The Overlooked Importance of Window Cleaning',
        date: 'September 18, 2023',
        comments: 9,
        author: blogAuthors[0],
        content: '',
    },
    { 
        id: 'restoring-your-grout-and-tile-to-their-former-glory',
        image: 'https://images.unsplash.com/photo-1603712725038-9535114a5598?auto=format&fit=crop&w=1200&q=80',
        title: 'Restoring Your Grout and Tile to Their Former Glory',
        date: 'September 14, 2023',
        comments: 13,
        author: blogAuthors[1],
        content: '',
    },
    { 
        id: 'carpet-care-101-extending-the-life-of-your-carpets',
        image: 'https://images.unsplash.com/photo-1566475456233-5c8e3bf55787?auto=format&fit=crop&w=1200&q=80',
        title: 'Carpet Care 101: Extending the Life of Your Carpets',
        date: 'September 11, 2023',
        comments: 16,
        author: blogAuthors[2],
        content: '',
    },
    { 
        id: 'preparing-your-home-for-a-professional-cleaning-service',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        title: 'Preparing Your Home for a Professional Cleaning Service',
        date: 'September 7, 2023',
        comments: 10,
        author: blogAuthors[3],
        content: '',
    },
    { 
        id: 'the-psychology-of-clean-how-a-tidy-space-affects-your-mood',
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
        title: 'The Psychology of Clean: How a Tidy Space Affects Your Mood',
        date: 'September 4, 2023',
        comments: 28,
        author: blogAuthors[0],
        content: '',
    },
    { 
        id: 'commercial-cleaning-vs-residential-whats-the-difference',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
        title: 'Commercial Cleaning vs. Residential: What\'s the Difference?',
        date: 'August 31, 2023',
        comments: 6,
        author: blogAuthors[1],
        content: '',
    },
    { 
        id: 'choosing-the-right-cleaning-service-for-your-business',
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
        title: 'Choosing the Right Cleaning Service for Your Business',
        date: 'August 28, 2023',
        comments: 10,
        author: blogAuthors[2],
        content: '',
    },
    { 
        id: 'maintaining-a-clean-and-hygienic-restaurant-kitchen',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80',
        title: 'Maintaining a Clean and Hygienic Restaurant Kitchen',
        date: 'August 24, 2023',
        comments: 17,
        author: blogAuthors[3],
        content: '',
    },
];


const heroContent: HeroContent = {
  layout: 'split-screen',
  title: '<span class="text-white">Sparkling Clean,</span><br><span class="text-secondary">Surprisingly Simple.</span>',
  subtitle: '<p class="text-white/80">From busy homes to thriving businesses, CleanSphere delivers professional, reliable, and eco-friendly cleaning services tailored to your unique needs.</p>',
  sliderImages: [
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  ],
  backgroundImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80',
};

const howItWorksContent: HowItWorksContent = {
  title: '<h2>Our Simple 3-Step Process</h2>',
  subtitle: '<p>Getting a sparkling clean space has never been easier. We\'ve streamlined our process to be as convenient and transparent as possible for you.</p>',
  steps: [
    { id: 'step-1', icon: 'book', title: '<h3>1. Book Online</h3>', description: '<p>Choose your desired service and schedule a time that works for you, all from the comfort of your home or office.</p>' },
    { id: 'step-2', icon: 'clean', title: '<h3>2. We Clean</h3>', description: '<p>Our professional, vetted, and friendly team arrives on time with all the necessary supplies to make your space shine.</p>' },
    { id: 'step-3', icon: 'relax', title: '<h3>3. You Relax</h3>', description: '<p>Enjoy your pristine environment and the extra free time. It\'s that simple! Satisfaction guaranteed.</p>' },
  ],
};

const aboutContent: AboutContent = {
  title: '<h2>Your Trusted Partner in Clean</h2>',
  subtitle: '<p>More than just a cleaning company, we are a team of professionals dedicated to creating healthier, happier environments for our clients.</p>',
  paragraph: '<p>Founded on the principles of reliability, quality, and customer satisfaction, CleanSphere has grown to be a leading provider of cleaning services for both residential and commercial clients. Our mission is to take the hassle out of cleaning, providing you with a pristine space so you can focus on what truly matters. We use eco-friendly products and state-of-the-art equipment to deliver exceptional results every time.</p>',
  stats: [
    { id: 'stat-1', value: '10+', label: 'Years of Experience' },
    { id: 'stat-2', value: '500+', label: 'Happy Clients' },
    { id: 'stat-3', value: '98%', label: 'Satisfaction Rate' },
  ],
  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
};

const servicesContent: ServicesContent = {
  title: '<h2>Comprehensive Cleaning Solutions</h2>',
  subtitle: '<p>We offer a wide range of professional cleaning services to meet the diverse needs of our clients, from homes to large-scale industrial facilities.</p>',
  items: allServices,
};

const whyChooseUsContent: WhyChooseUsContent = {
  title: '<h2>Why Choose CleanSphere?</h2>',
  subtitle: '<p>We\'re not just cleaners; we are partners in maintaining a clean, healthy, and productive environment for you, your family, or your business.</p>',
  items: [
    { id: 'benefit-1', icon: 'quality', title: '<h3>Quality Guarantee</h3>', description: '<p>We stand by our work. If you\'re not 100% satisfied, we\'ll come back and make it right.</p>' },
    { id: 'benefit-2', icon: 'eco', title: '<h3>Eco-Friendly</h3>', description: '<p>We use non-toxic, biodegradable cleaning products that are safe for your family, pets, and the planet.</p>' },
    { id: 'benefit-3', icon: 'certified', title: '<h3>Vetted Professionals</h3>', description: '<p>Our team is fully insured, bonded, and rigorously trained to provide a consistent, high-quality service.</p>' },
    { id: 'benefit-4', icon: 'support', title: '<h3>Reliable Support</h3>', description: '<p>Our friendly customer support team is always ready to assist you with scheduling and any questions.</p>' },
  ],
  image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
};

const appointmentContent: AppointmentContent = {
  title: '<h2>Get Your Free, No-Obligation Quote Today!</h2>',
  subtitle: '<p>Ready for a cleaner space? Fill out the form below, and one of our friendly team members will get back to you shortly with a personalized estimate.</p>',
  imageLayout: 'left',
  imageSrc: 'https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&w=1200&q=80'
};

const pricingContent: PricingContent = {
  title: '<h2>Transparent & Fair Pricing</h2>',
  subtitle: '<p>Choose a plan that fits your needs and budget. No hidden fees, no long-term contracts. Just sparkling clean results.</p>',
  items: [
    { id: 'plan-1', name: '<h3>Basic Clean</h3>', price: '120', frequency: '/visit', features: [
        {id: 'p1f1', text: 'Standard kitchen cleaning'},
        {id: 'p1f2', text: 'Bathroom essentials'},
        {id: 'p1f3', text: 'Vacuuming and mopping'},
        {id: 'p1f4', text: 'Dusting all surfaces'}
    ], isPopular: false },
    { id: 'plan-2', name: '<h3>Deep Clean</h3>', price: '250', frequency: '/visit', features: [
        {id: 'p2f1', text: 'Everything in Basic Clean'},
        {id: 'p2f2', text: 'Inside oven & fridge'},
        {id: 'p2f3', text: 'Interior window cleaning'},
        {id: 'p2f4', text: 'Baseboard & door washing'}
    ], isPopular: true },
    { id: 'plan-3', name: '<h3>Business Tier</h3>', price: 'Custom', frequency: '', features: [
        {id: 'p3f1', text: 'Customized office cleaning'},
        {id: 'p3f2', text: 'Flexible scheduling'},
        {id: 'p3f3', text: 'Janitorial services'},
        {id: 'p3f4', text: 'Dedicated account manager'}
    ], isPopular: false },
  ],
};

const teamContent: TeamContent = {
  title: '<h2>Our Dedicated Team</h2>',
  subtitle: '<p>Meet the skilled and friendly professionals who are committed to making your space shine. Our team is the heart of CleanSphere.</p>',
  members: [
    { id: 'member-1', name: '<h3>Sarah Chen</h3>', role: '<p>Founder & CEO</p>', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=300&auto=format&fit=crop', bio: '<p>With over 15 years in the industry, Sarah founded CleanSphere with a vision to provide exceptional, reliable, and eco-conscious cleaning services.</p>' },
    { id: 'member-2', name: '<h3>Michael Rodriguez</h3>', role: '<p>Operations Manager</p>', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&auto=format&fit=crop', bio: '<p>Michael ensures that every cleaning job runs smoothly and meets our rigorous standards of quality and efficiency. He\'s the logistical genius behind our success.</p>' },
    { id: 'member-3', name: '<h3>Jessica Williams</h3>', role: '<p>Lead Cleaning Technician</p>', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=300&auto=format&fit=crop', bio: '<p>Jessica leads our field teams with expertise and a passion for perfection. Her attention to detail ensures every client receives the highest quality service.</p>' },
  ],
};

const testimonialsContent: TestimonialsContent = {
  title: '<h2>What Our Clients Say</h2>',
  subtitle: '<p>We are proud of our commitment to excellence, but don\'t just take our word for it. Here\'s what our happy clients have to say.</p>',
  items: [
    { id: 'test-1', quote: '<p>"CleanSphere transformed our office. The team is professional, punctual, and incredibly thorough. Our workspace has never looked better!"</p>', name: '<h3>David Lee</h3>', company: '<p>CEO, Innovate Inc.</p>', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&auto=format&fit=crop&q=60' },
    { id: 'test-2', quote: '<p>"As a busy mom, having CleanSphere handle our home cleaning has been a lifesaver. I can trust them to do an amazing job every time."</p>', name: '<h3>Emily Carter</h3>', company: '<p>Residential Client</p>', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&auto=format&fit=crop&q=60' },
    { id: 'test-3', quote: '<p>"The attention to detail is what sets them apart. They consistently go above and beyond. Highly recommend for any business."</p>', name: '<h3>Mark Johnson</h3>', company: '<p>Facility Manager, TechCorp</p>', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&auto=format&fit=crop&q=60' },
  ],
};

const blogContent: BlogContent = {
    title: '<h2>From Our Blog</h2>',
    subtitle: '<p>Explore our latest articles for cleaning tips, tricks, and insights from our team of experts.</p>',
    posts: allPosts,
};


export const INITIAL_SECTIONS: Section<any>[] = [
    { id: 'hero', type: 'hero', content: heroContent, styles: { backgroundColor: '#1E3A8A', textColor: '#FFFFFF' } },
    { id: 'how-it-works', type: 'how-it-works', content: howItWorksContent, styles: { backgroundColor: '#F9FAFB', textColor: '#4A4A4A' } },
    { id: 'about', type: 'about', content: aboutContent, styles: { backgroundColor: '#FFFFFF', textColor: '#4A4A4A' } },
    { id: 'services', type: 'services', content: servicesContent, styles: { backgroundColor: '#F9FAFB', textColor: '#4A4A4A' } },
    { id: 'why-us', type: 'why-us', content: whyChooseUsContent, styles: { backgroundColor: '#FFFFFF', textColor: '#4A4A4A' } },
    { id: 'appointment', type: 'appointment', content: appointmentContent, styles: { backgroundColor: '#F3F4F6', textColor: '#4A4A4A' } },
    { id: 'pricing', type: 'pricing', content: pricingContent, styles: { backgroundColor: '#FFFFFF', textColor: '#4A4A4A' } },
    { id: 'team', type: 'team', content: teamContent, styles: { backgroundColor: '#F9FAFB', textColor: '#4A4A4A' } },
    { id: 'testimonials', type: 'testimonials', content: testimonialsContent, styles: { backgroundColor: '#1E3A8A', textColor: '#FFFFFF' } },
    { id: 'blog', type: 'blog', content: blogContent, styles: { backgroundColor: '#F3F4F6', textColor: '#4A4A4A' } },
];

// Helper function to create new section templates with unique IDs
export const SECTION_TEMPLATES: Record<SectionType, () => Section<any>> = {
  hero: () => ({ id: crypto.randomUUID(), type: 'hero', content: heroContent, styles: { backgroundColor: '#1E3A8A', textColor: '#FFFFFF' } }),
  'how-it-works': () => ({ id: crypto.randomUUID(), type: 'how-it-works', content: howItWorksContent, styles: { backgroundColor: '#F9FAFB', textColor: '#4A4A4A' } }),
  about: () => ({ id: crypto.randomUUID(), type: 'about', content: aboutContent, styles: { backgroundColor: '#FFFFFF', textColor: '#4A4A4A' } }),
  services: () => ({ id: crypto.randomUUID(), type: 'services', content: servicesContent, styles: { backgroundColor: '#F9FAFB', textColor: '#4A4A4A' } }),
  'why-us': () => ({ id: crypto.randomUUID(), type: 'why-us', content: whyChooseUsContent, styles: { backgroundColor: '#FFFFFF', textColor: '#4A4A4A' } }),
  appointment: () => ({ id: crypto.randomUUID(), type: 'appointment', content: appointmentContent, styles: { backgroundColor: '#F3F4F6', textColor: '#4A4A4A' } }),
  pricing: () => ({ id: crypto.randomUUID(), type: 'pricing', content: pricingContent, styles: { backgroundColor: '#FFFFFF', textColor: '#4A4A4A' } }),
  team: () => ({ id: crypto.randomUUID(), type: 'team', content: teamContent, styles: { backgroundColor: '#F9FAFB', textColor: '#4A4A4A' } }),
  testimonials: () => ({ id: crypto.randomUUID(), type: 'testimonials', content: testimonialsContent, styles: { backgroundColor: '#1E3A8A', textColor: '#FFFFFF' } }),
  blog: () => ({ id: crypto.randomUUID(), type: 'blog', content: blogContent, styles: { backgroundColor: '#FFFFFF', textColor: '#4A4A4A' } }),
};