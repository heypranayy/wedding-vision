import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

const routes = [
  {
    path: '/',
    title: 'Weddings Vision | Luxury Wedding Planning & Heritage Venue Consultation | Jaipur, Rajasthan',
    description: 'Weddings Vision is Jaipur’s premier wedding planning consultancy. Rajasthani heritage meets modern design. Book 1-on-1 Rajasthan Venue Consultation and full wedding planning.',
    heading: 'Rajasthani heritage meets modern design.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WeddingPlanningService',
      'name': 'Weddings Vision',
      'image': 'https://weddingsvision.com/assets/Wedding-Awards-2024-scaled.webp',
      'telephone': '+91-99292-52073',
      'email': 'info@weddingsvision.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '6th Floor, Mahima Trinity Mall, 603, Swej Farm Rd, Shiva Colony, Sodala',
        'addressLocality': 'Jaipur',
        'addressRegion': 'Rajasthan',
        'postalCode': '302019',
        'addressCountry': 'IN'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '5.0',
        'reviewCount': '10'
      },
      'priceRange': '₹₹₹₹'
    }
  },
  {
    path: '/venue-consultation',
    title: 'Rajasthan Palace & Heritage Venue Consultation | Weddings Vision Jaipur',
    description: '60-Minute 1-on-1 strategic venue advisory with senior Jaipur wedding planners. Avoid hidden sound curfews, generator markups, and vendor penalties before signing palace deposits.',
    heading: 'Rajasthan Palace & Heritage Venue Advisory',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Rajasthan Palace & Heritage Venue Consultation',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Weddings Vision Jaipur'
      },
      'offers': {
        '@type': 'Offer',
        'price': '2999',
        'priceCurrency': 'INR'
      }
    }
  },
  {
    path: '/wedding-consultation',
    title: 'Comprehensive Wedding Planning Blueprint (90-Min Strategy) | Weddings Vision',
    description: '90-Minute architectural planning session. We model your exact wedding budget, design an authentic heritage aesthetic, and provide a 12-month milestone timeline.',
    heading: 'Comprehensive Wedding Planning Blueprint',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Comprehensive Wedding Planning Blueprint',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Weddings Vision Jaipur'
      },
      'offers': {
        '@type': 'Offer',
        'price': '4999',
        'priceCurrency': 'INR'
      }
    }
  },
  {
    path: '/services',
    title: 'All 8 Wedding Planning Services | Full Management & Production | Weddings Vision',
    description: 'Full wedding planning, destination logistics, royal decor design, guest hospitality, catering curation, entertainment, and budget management across Rajasthan.',
    heading: 'Our Wedding Planning Services'
  },
  {
    path: '/about',
    title: 'Heritage & Leadership | Hemraj & Team | Weddings Vision Jaipur',
    description: 'Over a decade of luxury wedding planning in Jaipur. Learn about our commitment to zero secret broker markups and radical commercial transparency.',
    heading: 'Crafting celebrations where Rajasthani heritage meets modern design.'
  },
  {
    path: '/contact',
    title: 'Contact Jaipur Office | Mahima Trinity Mall, Sodala | Weddings Vision',
    description: 'Visit our Jaipur office at Mahima Trinity Mall, Sodala, or call +91 99292 52073 for destination wedding and palace venue inquiries.',
    heading: 'Connect with Our Jaipur Office'
  }
];

routes.forEach((route) => {
  let html = template;

  // Replace Title & Description
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
  html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${route.description}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${route.description}" />`);

  // Inject Structured Data if available
  if (route.structuredData) {
    const jsonLd = `\n    <script type="application/ld+json">${JSON.stringify(route.structuredData, null, 2)}</script>`;
    html = html.replace('</head>', `${jsonLd}\n  </head>`);
  }

  // Inject initial pre-rendered semantic HTML inside root for fast LCP & SEO
  const initialMarkup = `
    <div id="static-seo-root" style="display:none">
      <h1>${route.heading}</h1>
      <p>${route.description}</p>
      <nav>
        <a href="/">Home</a>
        <a href="/venue-consultation">Venue Advisory</a>
        <a href="/wedding-consultation">Wedding Planning</a>
        <a href="/services">Services</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  `;
  html = html.replace('<div id="root"></div>', `<div id="root">${initialMarkup}</div>`);

  // Target directory
  if (route.path === '/') {
    fs.writeFileSync(templatePath, html, 'utf8');
    console.log('Pre-rendered: / (index.html)');
  } else {
    const targetDir = path.join(distDir, route.path.replace(/^\//, ''));
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
    console.log(`Pre-rendered: ${route.path} -> ${route.path}/index.html`);
  }
});

console.log('✅ Static pre-rendering of all 6 marketing routes completed successfully!');
