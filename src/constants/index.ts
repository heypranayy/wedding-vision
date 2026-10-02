import type { ConsultationPackage } from '../types';

export const BUSINESS_INFO = {
  name: 'Weddings Vision',
  tagline: 'Rajasthani Heritage Meets Modern Design',
  founded: 'Over a decade of excellence in Jaipur',
  address: {
    line1: '6th Floor, Mahima Trinity Mall, 603, Swej Farm Rd',
    line2: 'Shiva Colony, Sodala, Jaipur, Rajasthan 302019',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302019',
    country: 'India',
  },
  phone: '+91 99292 52073',
  phoneRaw: '+919929252073',
  whatsappUrl: 'https://wa.me/919929252073?text=Hello%20Weddings%20Vision%20team,%20I%20am%20planning%20a%20wedding%20in%20Rajasthan%20and%20would%20like%20to%20consult%20with%20your%20planning%20team.',
  email: 'info@weddingsvision.com',
  awards: {
    weddingWire2024: 'Winner, WeddingWire India Wedding Awards 2024',
    weddingWireRating: '5.0 / 5.0 Stars (10 Verified Client Reviews)',
    weddingWireUrl: 'https://www.weddingwire.in/wedding-planners/wedding-vision--e405719/reviews',
    badgeAwardImg: '/assets/Wedding-Awards-2024-scaled.webp',
    badgeRatingImg: '/assets/badge-rated-10.png',
  },
  socials: {
    instagram: 'https://www.instagram.com/weddingvisionbyrc/',
    facebook: 'https://www.facebook.com/weddingvisionbyrc/',
  },
};

// Verified Consultation Services
export const CONSULTATION_PACKAGES: Record<string, ConsultationPackage> = {
  venue: {
    id: 'venue',
    title: 'Rajasthan Venue Advisory Session',
    subtitle: 'Palace, Fort & Heritage Resort Scouting Intelligence',
    duration: '60 Minutes (1-on-1 Video Session)',
    durationMinutes: 60,
    priceINR: 2999, // [PLACEHOLDER_PRICE_VENUE_CONSULTATION]
    priceFormatted: '₹2,999',
    badge: 'High Impact • Save Lakhs on Hidden Venue Costs',
    description: 'Direct consultation with our senior Jaipur wedding planner to identify, evaluate, and navigate Rajasthan’s most sought-after palaces, havelis, and luxury resorts without falling into broker traps or surprise curfews.',
    deliverables: [
      'Unbiased shortlist of 3-5 verified heritage venues matching your exact guest count (50 to 1,000+ pax) and budget tier.',
      'Comprehensive hidden cost breakdown: power generation, royalty fees, sound curfew restrictions, and external vendor penalties.',
      'F&B minimum spend analysis & liquor licensing protocol in Rajasthan.',
      'Venue Negotiation Blueprint: specific clauses to insist on before signing high-value deposits.',
      'Post-session Executive PDF Summary + direct vetted sales POCs at each shortlisted venue.',
    ],
    idealFor: 'Couples and families considering Jaipur, Udaipur, Jodhpur, Pushkar, or Samode who need impartial insider clarity before committing lakhs in venue advances.',
    guarantee: '100% consultation fee credited towards our Full Wedding Planning service if engaged within 45 days.',
  },
  wedding: {
    id: 'wedding',
    title: 'Comprehensive Wedding Planning Blueprint',
    subtitle: 'Full Concept, Budget Modeling & 12-Month Execution Roadmap',
    duration: '90 Minutes (Deep Strategy Video Session)',
    durationMinutes: 90,
    priceINR: 4999, // [PLACEHOLDER_PRICE_WEDDING_CONSULTATION]
    priceFormatted: '₹4,999',
    badge: 'Master Blueprint • Architectural Planning',
    description: 'An exhaustive masterplanning session designed to transform vague ideas into a rigorous, budget-accountable wedding masterplan. We translate Rajasthani royal traditions into sleek, contemporary celebration architecture.',
    deliverables: [
      'Itemized Rajasthan Wedding Budget Model (realistic allocations for decor, catering, production, artist curation, and guest logistics).',
      'Thematic Creative Direction: cohesive color palettes, mandap architecture concepts, and lighting designs marrying heritage motifs with modern minimalism.',
      '12-Month Milestone Roadmap: what to book when, payment schedules, and critical path deadlines.',
      'Artist & Vendor Evaluation: live recommendations for photographers, makeup artists, mehendi artists, and heritage folk/live performers.',
      'Post-call Comprehensive Strategy Dossier customized to your family’s priorities.',
    ],
    idealFor: 'NRI and out-of-station couples wanting complete structural clarity, uncompromised aesthetics, and peace of mind before executing their Rajasthan wedding.',
    guarantee: '100% consultation fee credited towards our Full Wedding Planning service if engaged within 45 days.',
  }
};


export const CORE_SERVICES = [
  {
    title: 'Full Wedding Planning',
    description: 'End-to-end stewardship from the initial moodboard to the final bidaai. Complete vendor procurement, contract enforcement, and timeline synchronization.',
    scope: 'Concept to Execution'
  },
  {
    title: 'Destination Weddings',
    description: 'Comprehensive destination logistics across Jaipur, Udaipur, Jodhpur, and Kumbhalgarh. Flight concierge, charter buses, room allocation, and guest welcomes.',
    scope: 'Rajasthan-Wide Logistics'
  },
  {
    title: 'Event Design & Royal Décor',
    description: 'Architectural mandap design, bespoke floral installations, antique brass accents, and subtle ambient illumination honoring historic Rajasthani aesthetics.',
    scope: 'Bespoke Production'
  },
  {
    title: 'Guest Hospitality & Protocol',
    description: 'Traditional Rajasthani dhol, nagada, and garland welcomes paired with digital guest RSVP management, luggage handling, and 24/7 concierge helpdesks.',
    scope: 'White-Glove Hospitality'
  },
  {
    title: 'Catering & Culinary Curation',
    description: 'Coordination between royal Rajasthani halwais (Dal Baati Churma, Ker Sangri, Ghevar counters) and international gourmet banquet chefs.',
    scope: 'Menu Engineering'
  },
  {
    title: 'Entertainment & Heritage Artistry',
    description: 'Curated royal Kalbelia dancers, Sufi ensembles, Manganiyar vocalists, Bollywood live bands, and celebrity DJ setups with legal sound permits.',
    scope: 'Live Curation'
  },
  {
    title: 'Vendor Coordination & Quality Audit',
    description: 'Strict quality control over photographers, cinematographers, sound technicians, and florists with zero undisclosed agency kickbacks.',
    scope: 'Transparent Audits'
  },
  {
    title: 'Budget Allocation & Cost Control',
    description: 'Line-by-line financial tracking to eliminate budget creep, sudden generator overages, or duplicate vendor charges.',
    scope: 'Financial Discipline'
  }
];

export const RAJASTHAN_REGIONS = [
  {
    name: 'Jaipur',
    subtitle: 'The Pink City',
    description: 'Grand royal palaces, expansive lawns, and heritage boutique havelis just 4 hours from Delhi.',
    venuesSample: 'Palaces, Forts & Heritage Resorts (Rambagh, Fairmont, Samode, Leela)',
  },
  {
    name: 'Udaipur',
    subtitle: 'The City of Lakes',
    description: 'Romantic water-front palaces, private boat ghat arrivals, and panoramic Aravalli mountain backdrops.',
    venuesSample: 'Island Palaces, Lakefront Mansions & Luxury Resorts',
  },
  {
    name: 'Jodhpur',
    subtitle: 'The Blue City',
    description: 'Dramatic sandstone fortress backdrops, desert sunsets, and monumental royal courtyards.',
    venuesSample: 'Historic Fort View Havelis & Sandstone Luxury Palaces',
  },
  {
    name: 'Pushkar & Kumbhalgarh',
    subtitle: 'Sacred Sands & Untamed Fortresses',
    description: 'Intimate boho-regal gatherings, desert dunes, and fortress walls for couples seeking exclusivity.',
    venuesSample: 'Desert Glamping Resorts & Hilltop Heritage Castles',
  }
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    question: 'Why should I pay for a consultation before hiring a planner?',
    answer: 'Most venue decisions are made under high sales pressure from venue sales managers, resulting in lakhs lost to hidden power backup charges, mandatory vendor list lock-ins, and sound curfew fines. Our paid consultations are completely independent: we do not take hidden broker cuts from venues. You get 100% objective insider intelligence. Plus, the consultation fee is 100% credited toward your full planning package if you book with us.'
  },
  {
    question: 'How do sound curfew laws affect weddings in Rajasthan?',
    answer: 'The Supreme Court and Rajasthan state guidelines strictly enforce outdoor sound limits after 10:00 PM. Unprepared couples face sudden police shutdowns during their sangeet or jaimala. During our consultation, we audit the exact indoor vs outdoor transition capability of every venue you are considering to ensure your celebration continues uninterrupted in compliant indoor ballrooms.'
  },
  {
    question: 'Can you work with couples planning from the US, UK, or UAE?',
    answer: 'Yes. Over 60% of our luxury clientele are NRIs or out-of-state couples. All consultations are hosted via high-definition video calls scheduled in your local time zone (EST, GMT, GST, IST), followed by executive PDF dossiers and transparent WhatsApp synchronization.'
  },
  {
    question: 'What is your fee structure for full wedding planning?',
    answer: 'We operate with complete radical transparency. Unlike traditional brokers who charge kickbacks behind your back, we operate on a fixed transparent management fee based on the scale and complexity of the event. All vendor bills and venue contracts are settled directly at actual cost.'
  },
  {
    question: 'What happens immediately after I book and pay for a consultation?',
    answer: 'You will immediately receive an instant calendar invite with the video link, a WhatsApp confirmation from our senior planning coordinator, and a short 4-question pre-call briefing form so our team can research specific venue dates and budget tiers before we hop on the call.'
  }
];
