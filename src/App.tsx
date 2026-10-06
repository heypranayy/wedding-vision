import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { BookingModal } from './components/BookingModal';
import { ExitIntentModal } from './components/ExitIntentModal';
import { SmoothScroll } from './components/SmoothScroll';
import { ArchLoader } from './components/ArchLoader';
import type { ServiceType, BookingPrefill } from './types';

// Route-level code splitting with React.lazy
const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage }))
);
const VenueConsultationPage = lazy(() =>
  import('./pages/VenueConsultationPage').then((m) => ({ default: m.VenueConsultationPage }))
);
const WeddingConsultationPage = lazy(() =>
  import('./pages/WeddingConsultationPage').then((m) => ({ default: m.WeddingConsultationPage }))
);
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);

// Fallback loader with heritage aesthetic
const RouteLoadingFallback: React.FC = () => (
  <div
    className="min-h-[60vh] flex flex-col items-center justify-center space-y-4"
    aria-label="Loading page content"
    role="status"
  >
    <div className="w-10 h-10 border-2 border-heritage-emerald/20 border-t-heritage-emerald rounded-full animate-spin" />
    <span className="text-[11px] font-mono uppercase tracking-luxury text-heritage-muted">
      Curating Weddings Vision
    </span>
  </div>
);

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App: React.FC = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeService, setActiveService] = useState<ServiceType>('venue');
  const [activePrefill, setActivePrefill] = useState<BookingPrefill | undefined>(undefined);

  const handleOpenBooking = (serviceType: ServiceType = 'venue', prefill?: BookingPrefill) => {
    setActiveService(serviceType);
    setActivePrefill(prefill);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setActivePrefill(undefined);
  };

  return (
    <SmoothScroll>
      <ScrollToTop />
      {/* Arch Portal Intro Loader */}
      <ArchLoader />

      <div className="min-h-screen flex flex-col bg-heritage-sand text-heritage-charcoal relative">
        {/* Navigation Header */}
        <Header onOpenBooking={handleOpenBooking} />

        {/* Main Content Router with Suspense */}
        <main className="flex-1">
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} />} />
              <Route
                path="/venue-consultation"
                element={<VenueConsultationPage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/wedding-consultation"
                element={<WeddingConsultationPage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/services"
                element={<ServicesPage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/about"
                element={<AboutPage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/contact"
                element={<ContactPage onOpenBooking={handleOpenBooking} />}
              />
              {/* Fallback */}
              <Route path="*" element={<HomePage onOpenBooking={handleOpenBooking} />} />
            </Routes>
          </Suspense>
        </main>

        {/* Global Footer */}
        <Footer onOpenBooking={handleOpenBooking} />

        {/* Mobile Sticky Thumb-Zone Action Bar */}
        <MobileActionBar onOpenBooking={handleOpenBooking} />

        {/* 5-Step Full-Screen Step Flow Consultation Engine */}
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={handleCloseBooking}
          initialService={activeService}
          prefill={activePrefill}
        />

        {/* Exit-Safe Lead Capture Modal */}
        <ExitIntentModal />
      </div>
    </SmoothScroll>
  );
};

export default App;
