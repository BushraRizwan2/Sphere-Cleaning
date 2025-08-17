

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Appointment from './components/Appointment';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Team from './components/Team';
import Blog from './components/Blog';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Chatbot from './components/Chatbot';
import SiteEditor from './components/SiteEditor';
import { INITIAL_SECTIONS, INITIAL_GLOBAL_STYLES, INITIAL_SITE_CONFIG } from './constants';
import type { Section, SectionType, GlobalStyles, Service, SiteConfig, BlogPost } from './types';
import AnimatedCard from './components/AnimatedCard';

import ResidentialCleaningPage from './components/service-pages/ResidentialCleaningPage';
import OfficeCleaningPage from './components/service-pages/OfficeCleaningPage';
import HospitalCleaningPage from './components/service-pages/HospitalCleaningPage';
import CarCleaningPage from './components/service-pages/CarCleaningPage';
import IndustrialCleaningPage from './components/service-pages/IndustrialCleaningPage';
import CommercialKitchenCleaningPage from './components/service-pages/CommercialKitchenCleaningPage';
import RetailStoreCleaningPage from './components/service-pages/RetailStoreCleaningPage';
import SchoolAndEducationalFacilityCleaningPage from './components/service-pages/SchoolAndEducationalFacilityCleaningPage';
import HotelAndHospitalityCleaningPage from './components/service-pages/HotelAndHospitalityCleaningPage';
import CarpetAndUpholsteryCleaningPage from './components/service-pages/CarpetAndUpholsteryCleaningPage';
import WindowCleaningPage from './components/service-pages/WindowCleaningPage';
import EcoFriendlyCleaningPage from './components/service-pages/EcoFriendlyCleaningPage';
import PostConstructionCleaningPage from './components/service-pages/PostConstructionCleaningPage';
import JanitorialServicesPage from './components/service-pages/JanitorialServicesPage';
import DisasterAndTraumaCleaningPage from './components/service-pages/DisasterAndTraumaCleaningPage';
import PoolAndSpaCleaningPage from './components/service-pages/PoolAndSpaCleaningPage';
import GymAndFitnessCenterCleaningPage from './components/service-pages/GymAndFitnessCenterCleaningPage';
import EventVenueCleaningPage from './components/service-pages/EventVenueCleaningPage';
import AirDuctAndHvacCleaningPage from './components/service-pages/AirDuctAndHvacCleaningPage';
import PressureWashingPage from './components/service-pages/PressureWashingPage';

import HowToStayCleanTidyDuringABusyWeekPage from './components/blog-pages/HowToStayCleanTidyDuringABusyWeekPage';
import TheSecretOfCleaningLessIsMorePage from './components/blog-pages/TheSecretOfCleaningLessIsMorePage';
import EcoFriendlyCleaningProductsYouCanMakeAtHomePage from './components/blog-pages/EcoFriendlyCleaningProductsYouCanMakeAtHomePage';
import TheUltimateGuideToDeclutteringYourOfficeSpacePage from './components/blog-pages/TheUltimateGuideToDeclutteringYourOfficeSpacePage';
import FiveMinuteCleaningHacksForASparklingKitchenPage from './components/blog-pages/5MinuteCleaningHacksForASparklingKitchenPage';
import HowOftenShouldYouReallyCleanEverythingARoomByRoomGuidePage from './components/blog-pages/HowOftenShouldYouReallyCleanEverythingARoomByRoomGuidePage';
import TheTop10BenefitsOfACleanAndOrganizedHomePage from './components/blog-pages/TheTop10BenefitsOfACleanAndOrganizedHomePage';
import SpringCleaningChecklistADeepCleanForEveryRoomPage from './components/blog-pages/SpringCleaningChecklistADeepCleanForEveryRoomPage';
import PostConstructionCleaningWhyItsBestLeftToProsPage from './components/blog-pages/PostConstructionCleaningWhyItsBestLeftToProsPage';
import MaximizingProductivityWithACleanWorkspacePage from './components/blog-pages/MaximizingProductivityWithACleanWorkspacePage';
import GreenCleaningProtectingYourFamilyAndThePlanetPage from './components/blog-pages/GreenCleaningProtectingYourFamilyAndThePlanetPage';
import HowToCleanAndDisinfectForAHealthierHomePage from './components/blog-pages/HowToCleanAndDisinfectForAHealthierHomePage';
import TheOverlookedImportanceOfWindowCleaningPage from './components/blog-pages/TheOverlookedImportanceOfWindowCleaningPage';
import RestoringYourGroutAndTileToTheirFormerGloryPage from './components/blog-pages/RestoringYourGroutAndTileToTheirFormerGloryPage';
import CarpetCare101ExtendingTheLifeOfYourCarpetsPage from './components/blog-pages/CarpetCare101ExtendingTheLifeOfYourCarpetsPage';
import PreparingYourHomeForAProfessionalCleaningServicePage from './components/blog-pages/PreparingYourHomeForAProfessionalCleaningServicePage';
import ThePsychologyOfCleanHowATidySpaceAffectsYourMoodPage from './components/blog-pages/ThePsychologyOfCleanHowATidySpaceAffectsYourMoodPage';
import CommercialCleaningVsResidentialWhatsTheDifferencePage from './components/blog-pages/CommercialCleaningVsResidentialWhatsTheDifferencePage';
import ChoosingTheRightCleaningServiceForYourBusinessPage from './components/blog-pages/ChoosingTheRightCleaningServiceForYourBusinessPage';
import MaintainingACleanAndHygienicRestaurantKitchenPage from './components/blog-pages/MaintainingACleanAndHygienicRestaurantKitchenPage';


const SectionComponents: Record<SectionType, React.FC<any>> = {
  hero: Hero,
  'how-it-works': HowItWorks,
  about: About,
  services: Services,
  'why-us': WhyChooseUs,
  appointment: Appointment,
  pricing: Pricing,
  team: Team,
  testimonials: Testimonials,
  blog: Blog,
};

const ServicePageComponents: Record<string, React.FC<any>> = {
  'residential-cleaning': ResidentialCleaningPage,
  'office-cleaning': OfficeCleaningPage,
  'hospital-cleaning': HospitalCleaningPage,
  'car-cleaning': CarCleaningPage,
  'industrial-cleaning': IndustrialCleaningPage,
  'commercial-kitchen-cleaning': CommercialKitchenCleaningPage,
  'retail-store-cleaning': RetailStoreCleaningPage,
  'school-and-educational-facility-cleaning': SchoolAndEducationalFacilityCleaningPage,
  'hotel-and-hospitality-cleaning': HotelAndHospitalityCleaningPage,
  'carpet-and-upholstery-cleaning': CarpetAndUpholsteryCleaningPage,
  'window-cleaning': WindowCleaningPage,
  'eco-friendly-cleaning': EcoFriendlyCleaningPage,
  'post-construction-cleaning': PostConstructionCleaningPage,
  'janitorial-services': JanitorialServicesPage,
  'disaster-and-trauma-cleaning': DisasterAndTraumaCleaningPage,
  'pool-and-spa-cleaning': PoolAndSpaCleaningPage,
  'gym-and-fitness-center-cleaning': GymAndFitnessCenterCleaningPage,
  'event-venue-cleaning': EventVenueCleaningPage,
  'air-duct-and-hvac-cleaning': AirDuctAndHvacCleaningPage,
  'pressure-washing': PressureWashingPage,
};

const BlogPostPageComponents: Record<string, React.FC<any>> = {
    'how-to-stay-clean-tidy-during-a-busy-week': HowToStayCleanTidyDuringABusyWeekPage,
    'the-secret-of-cleaning-less-is-more': TheSecretOfCleaningLessIsMorePage,
    'eco-friendly-cleaning-products-you-can-make-at-home': EcoFriendlyCleaningProductsYouCanMakeAtHomePage,
    'the-ultimate-guide-to-decluttering-your-office-space': TheUltimateGuideToDeclutteringYourOfficeSpacePage,
    '5-minute-cleaning-hacks-for-a-sparkling-kitchen': FiveMinuteCleaningHacksForASparklingKitchenPage,
    'how-often-should-you-really-clean-everything-a-room-by-room-guide': HowOftenShouldYouReallyCleanEverythingARoomByRoomGuidePage,
    'the-top-10-benefits-of-a-clean-and-organized-home': TheTop10BenefitsOfACleanAndOrganizedHomePage,
    'spring-cleaning-checklist-a-deep-clean-for-every-room': SpringCleaningChecklistADeepCleanForEveryRoomPage,
    'post-construction-cleaning-why-its-best-left-to-pros': PostConstructionCleaningWhyItsBestLeftToProsPage,
    'maximizing-productivity-with-a-clean-workspace': MaximizingProductivityWithACleanWorkspacePage,
    'green-cleaning-protecting-your-family-and-the-planet': GreenCleaningProtectingYourFamilyAndThePlanetPage,
    'how-to-clean-and-disinfect-for-a-healthier-home': HowToCleanAndDisinfectForAHealthierHomePage,
    'the-overlooked-importance-of-window-cleaning': TheOverlookedImportanceOfWindowCleaningPage,
    'restoring-your-grout-and-tile-to-their-former-glory': RestoringYourGroutAndTileToTheirFormerGloryPage,
    'carpet-care-101-extending-the-life-of-your-carpets': CarpetCare101ExtendingTheLifeOfYourCarpetsPage,
    'preparing-your-home-for-a-professional-cleaning-service': PreparingYourHomeForAProfessionalCleaningServicePage,
    'the-psychology-of-clean-how-a-tidy-space-affects-your-mood': ThePsychologyOfCleanHowATidySpaceAffectsYourMoodPage,
    'commercial-cleaning-vs-residential-whats-the-difference': CommercialCleaningVsResidentialWhatsTheDifferencePage,
    'choosing-the-right-cleaning-service-for-your-business': ChoosingTheRightCleaningServiceForYourBusinessPage,
    'maintaining-a-clean-and-hygienic-restaurant-kitchen': MaintainingACleanAndHygienicRestaurantKitchenPage,
};


function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [sections, setSections] = useState<Section<any>[]>(INITIAL_SECTIONS);
  const [globalStyles, setGlobalStyles] = useState<GlobalStyles>(INITIAL_GLOBAL_STYLES);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  // Centralized navigation handler
  useEffect(() => {
    const navigate = (path: string) => {
      setCurrentPath(path);
      
      setTimeout(() => {
        if (path.startsWith('#/service/') || path.startsWith('#/blog/')) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (path.startsWith('#/appointment')) {
          const element = document.getElementById('appointment');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else if (path.startsWith('#') && !path.startsWith('#/')) {
          const targetId = path.substring(1);
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else { // Handles '#/' for homepage
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    };

    const handleClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest('a');
      const href = link?.getAttribute('href');
      
      if (!link || !href || (!href.startsWith('#') && href !== '/')) {
        return;
      }
      
      event.preventDefault();
      const targetHash = href === '/' ? '#/' : href;
      
      if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      } else {
        navigate(targetHash);
      }
    };

    const handleHashChange = () => {
      navigate(window.location.hash || '#/');
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('hashchange', handleHashChange);
    
    handleHashChange();

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const styleSheet = document.getElementById('global-theme-styles');
    if (styleSheet) {
      const { colors, fonts } = globalStyles;
      styleSheet.innerHTML = `
        :root {
          --color-primary: ${colors.primary};
          --color-secondary: ${colors.secondary};
          --color-text: ${colors.text};
          --color-background: ${colors.background};
          --font-heading: '${fonts.heading}', sans-serif;
          --font-body: '${fonts.body}', sans-serif;
        }
      `;
    }
  }, [globalStyles]);

  const handleLoginSuccess = useCallback(() => {
    setIsAdmin(true);
    setLoginModalOpen(false);
    setEditorOpen(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAdmin(false);
    setEditorOpen(false);
    setSelectedSectionId(null);
  }, []);

  const handleSectionUpdate = useCallback((updatedSection: Section<any>) => {
    setSections(prevSections =>
      prevSections.map(s => (s.id === updatedSection.id ? updatedSection : s))
    );
  }, []);

  const handleSelectSection = useCallback((id: string) => {
    setSelectedSectionId(id);
    if (!isEditorOpen) {
      setEditorOpen(true);
    }
  }, [isEditorOpen]);
  
  const servicesSection = sections.find(s => s.type === 'services');
  const allServices: Service[] = servicesSection?.content?.items || [];
  
  const blogSection = sections.find(s => s.type === 'blog');
  const allPosts: BlogPost[] = blogSection?.content?.posts || [];

  const blogPostsMap = useMemo(() => {
    const map = new Map<string, BlogPost>();
    allPosts.forEach(post => {
      map.set(post.id, post);
    });
    return map;
  }, [allPosts]);
  
  const phoneNumber = siteConfig.phoneNumber;

  const renderPage = () => {
      const NotFound = () => (
          <main className="flex-grow container mx-auto px-6 py-20 text-center">
              <h1 className="text-4xl font-bold font-heading">Page Not Found</h1>
              <p className="mt-4 text-lg text-gray-600">The page you are looking for does not exist.</p>
              <a href="#/" className="mt-8 inline-block bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
                  Back to Homepage
              </a>
          </main>
      );

    if (currentPath.startsWith('#/service/')) {
      const serviceId = currentPath.substring('#/service/'.length);
      const service = allServices.find(s => s.id === serviceId);
      const ServicePageComponent = ServicePageComponents[serviceId];

      if (service && ServicePageComponent) {
          return <ServicePageComponent service={service} phoneNumber={phoneNumber} allServices={allServices} />;
      }
      return <NotFound />;
    }
    
    if (currentPath.startsWith('#/blog/')) {
        const blogId = currentPath.substring('#/blog/'.length);
        const PostPageComponent = BlogPostPageComponents[blogId];
        const post = blogPostsMap.get(blogId);

        if (PostPageComponent && post) {
            return <PostPageComponent post={post} allPosts={allPosts} />;
        }
        return <NotFound />;
    }

    return (
      <main>
        {sections.map((section, index) => {
          if (!section) return null;
          const Component = SectionComponents[section.type];
          if (!Component) return null;
          
          const isSelected = isAdmin && selectedSectionId === section.id;

          return (
            <AnimatedCard key={section.id} animation="fade-up" delay={index * 50}>
              <div
                id={section.id}
                onClick={isAdmin ? () => handleSelectSection(section.id) : undefined}
                className={`relative outline-offset-[-2px] transition-all duration-200 scroll-mt-20 ${isAdmin ? 'cursor-pointer' : ''} ${isSelected ? 'outline-2 outline-blue-500 outline-dashed' : 'outline-2 outline-transparent'}`}
              >
                <Component
                  section={section}
                  onSectionChange={handleSectionUpdate}
                  isAdmin={isAdmin}
                  isSelected={isSelected}
                  allServices={section.type === 'appointment' ? allServices : undefined}
                  phoneNumber={section.type === 'why-us' || section.type === 'appointment' ? phoneNumber : undefined}
                />
              </div>
            </AnimatedCard>
          );
        })}
      </main>
    );
  };

  return (
    <div className="bg-content-bg text-content-text font-sans antialiased">
      <Header
        isAdmin={isAdmin}
        isEditorOpen={isEditorOpen}
        onLogout={handleLogout}
        onAdminLoginClick={() => setLoginModalOpen(true)}
        onToggleEditor={() => setEditorOpen(!isEditorOpen)}
        siteConfig={siteConfig}
      />
      
      {renderPage()}

      <Footer siteConfig={siteConfig} />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <Chatbot />
      {isAdmin && (
        <SiteEditor
          sections={sections}
          setSections={setSections}
          globalStyles={globalStyles}
          setGlobalStyles={setGlobalStyles}
          siteConfig={siteConfig}
          setSiteConfig={setSiteConfig}
          selectedSectionId={selectedSectionId}
          setSelectedSectionId={setSelectedSectionId}
          onClose={() => setEditorOpen(false)}
          isOpen={isEditorOpen}
        />
      )}
    </div>
  );
}

export default App;