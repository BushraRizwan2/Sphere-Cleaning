

import type { ReactNode } from 'react';

export interface NavLink {
  id: string;
  name: string;
  href: string;
}

export interface SiteConfig {
  phoneNumber: string;
  emailAddress: string;
  physicalAddress: string;
  navLinks: NavLink[];
  socialLinks: {
    id: string;
    name: 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram' | 'WhatsApp';
    url: string;
  }[];
  headerBackgroundColor: string;
  footerBackgroundColor: string;
}

export interface SectionStyles {
  backgroundColor: string;
  textColor: string;
  animation?: string;
}

export interface GlobalStyles {
    colors: {
        primary: string;
        secondary: string;
        text: string;
        background: string;
    };
    fonts: {
        heading: string;
        body: string;
    };
}

// Content Types for Sections
export interface HeroContent {
    layout: 'background-image' | 'split-screen';
    title: string; // HTML
    subtitle: string; // HTML
    sliderImages: string[]; // for split screen
    backgroundImage: string; // for background image layout
}

export interface HowItWorksStep {
  id: string;
  icon: string;
  title: string; // HTML
  description: string; // HTML
}
export interface HowItWorksContent {
    title: string; // HTML
    subtitle: string; // HTML
    steps: HowItWorksStep[];
}

export interface AboutContent {
    title: string; // HTML
    subtitle: string; // HTML
    paragraph: string; // HTML
    stats: { id: string; value: string; label: string; }[];
    image: string;
}

export interface AppointmentContent {
    title: string; // HTML
    subtitle: string; // HTML
    imageLayout?: 'none' | 'left' | 'right';
    imageSrc?: string;
}

export interface ContactContent {
    title: string;
    subtitle: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingInfo {
  type: 'fixed' | 'per_unit' | 'quote';
  basePrice?: number;
  unitName?: string;
}

export interface KeyBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Industry {
  id: string;
  icon: string;
  name: string;
}

export interface Service {
  id: string; // URL-friendly slug
  image: string;
  title: string; // HTML
  shortIntro: string; // A short, one-sentence hook for the hero.
  description: string; // HTML for the card
  detailedDescription: string; // HTML for the detail page
  gallery?: string[]; // Optional array of image URLs
  pricing: PricingInfo;
  faqs: FaqItem[];
  packageIncludes?: { id: string; icon: string; title: string; description: string; }[];
  keyBenefits?: KeyBenefit[];
  industries?: Industry[];
}
export interface ServicesContent {
    title: string; // HTML
    subtitle: string; // HTML
    items: Service[];
}

export interface Benefit {
  id:string;
  icon: string;
  title:string; // HTML
  description: string; // HTML
}
export interface WhyChooseUsContent {
    title: string; // HTML
    subtitle: string; // HTML
    items: Benefit[];
    image: string;
}

export interface PricingPlan {
  id: string;
  name: string; // HTML
  price: string;
  frequency: string;
  features: { id: string; text: string }[]; // HTML features
  isPopular: boolean;
}
export interface PricingContent {
    title: string; // HTML
    subtitle: string; // HTML
    items: PricingPlan[];
}

export interface TeamMember {
  id: string;
  name: string; // HTML
  role: string; // HTML
  avatar: string;
  bio: string; // HTML
}
export interface TeamContent {
    title: string; // HTML
    subtitle: string; // HTML
    members: TeamMember[];
}

export interface Testimonial {
  id: string;
  quote: string; // HTML
  name: string; // HTML
  company: string; // HTML
  avatar: string;
}
export interface TestimonialsContent {
    title: string; // HTML
    subtitle: string; // HTML
    items: Testimonial[];
}

export interface Author {
    name: string;
    role: string;
    avatar: string;
}

export interface BlogPost {
    id: string;
    image: string;
    title: string; // HTML
    date: string;
    comments: number;
    author: Author;
    content: string; // Full HTML content
}
export interface BlogContent {
    title: string; // HTML
    subtitle: string; // HTML
    posts: BlogPost[];
}


// Generic Section Type
export type SectionType = 'hero' | 'how-it-works' | 'about' | 'services' | 'why-us' | 'appointment' | 'pricing' | 'team' | 'testimonials' | 'blog';

export interface Section<T> {
    id: string;
    type: SectionType;
    content: T;
    styles: SectionStyles;
}

// Chatbot types
export interface ChatMessage {
    id: string;
    role: 'user' | 'model' | 'system';
    text: string;
}