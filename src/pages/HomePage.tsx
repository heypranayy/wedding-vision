import React from 'react';
import type { ServiceType, BookingPrefill } from '../types';
import {
  HeroSection,
  TwoPathsSection,
  HowItWorksSection,
  ProofStripSection,
  ServicesSection,
  VenueShowcaseSection,
  RealWeddingsSection,
  FaqSection,
  FinalCtaSection,
} from '../sections';
import { Skiper72 } from '../components/ui/skiper72';

interface HomePageProps {
  onOpenBooking: (serviceType?: ServiceType, prefill?: BookingPrefill) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  return (
    <div className="overflow-x-clip">
      <HeroSection onOpenBooking={(type, prefill) => onOpenBooking(type, prefill)} />
      <Skiper72 />
      <ServicesSection onOpenBooking={(type) => onOpenBooking(type)} />
      <TwoPathsSection onOpenBooking={(type) => onOpenBooking(type)} />
      <HowItWorksSection onOpenBooking={(type) => onOpenBooking(type)} />
      <ProofStripSection />
      <VenueShowcaseSection onOpenBooking={(type, prefill) => onOpenBooking(type, prefill)} />
      {/* <RealWeddingsSection onOpenBooking={(type, prefill) => onOpenBooking(type, prefill)} /> */}
      <FaqSection />
      <FinalCtaSection onOpenBooking={(type) => onOpenBooking(type)} />
    </div>
  );
};
