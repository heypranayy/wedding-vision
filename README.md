# Weddings Vision Redesign
**Jaipur-based Luxury Wedding Planning & Heritage Venue Consultancy**  
*Brand Positioning: "Rajasthani Heritage Meets Modern Design"*  
*Live Site Benchmark: [weddingsvision.com](https://weddingsvision.com/)*

---

## 1. Project Overview & Business Outcomes

This codebase is a ground-up redesign of **Weddings Vision**, engineered to replace a legacy WordPress/Elementor template with an editorial, high-performance web application.

- **Primary Business Outcome (#1):** Direct **PAID bookings** for two high-margin advisory services:
  1. **Rajasthan Venue Advisory Session** (`₹2,999` / 60 Min) — Palace & heritage scouting intelligence, hidden cost audit, and curfew navigation.
  2. **Comprehensive Wedding Planning Blueprint** (`₹4,999` / 90 Min) — Line-item budget modeling (200–800 pax), mandap/decor creative direction, and 12-month execution roadmap.
  - *Guarantee:* 100% of the consultation fee is credited back towards full wedding planning services if engaged within 45 days.
- **Secondary Business Outcome:** High-intent, qualified WhatsApp and telephone leads directly connecting prospects with senior planners in Jaipur.

---

## 2. Technical Stack

- **Frontend Core:** React 18 (`react@^18.3.1`, `react-dom@^18.3.1`) + TypeScript 5 + Vite 6
- **Routing:** React Router v6 (`react-router-dom@^6.28.0`)
- **Styling:** Tailwind CSS (`tailwindcss@^3.4.17`) configured with evidence-based Rajasthani heritage design tokens
- **Smooth Inertial Scroll:** Lenis (`lenis@^1.1.18`) for luxury, tactile browsing
- **Animation & Transitions:** Framer Motion (`framer-motion@^11.15.0`) for progressive modal state transitions
- **Static Pre-Rendering (SSG):** Custom SSG engine (`scripts/prerender.js`) pre-generating static HTML files for all 6 marketing routes with Schema.org `WeddingPlanningService` JSON-LD structured data for instant LCP and SEO
- **Payments:** Razorpay Checkout SDK (INR, UPI-first with Google Pay, PhonePe, Paytm, Netbanking, and Cards)
- **Serverless API Layer:** Vercel / Netlify serverless functions (`api/create-order.ts`, `api/verify-payment.ts`)

---

## 3. Evidence-Based Design System Tokens

Extracted from live computed styles and original vector assets (`public/assets/Untitled-design-4.svg`):

| Token Name | Hex Code | Usage |
|---|---|---|
| `heritage.emerald` | `#1a484c` | Primary brand color (headers, primary buttons, accents) |
| `heritage.emerald-deep` | `#0f292c` | Dark palatial surfaces, footer, evening sections |
| `heritage.sand` | `#FAF7F2` | Warm ivory/sand base background (eliminates harsh pure white) |
| `heritage.sand-dark` | `#EFE9DE` | Card backgrounds and secondary surface highlights |
| `heritage.gold` | `#C5A880` | Warm champagne gold (borders, metadata, icons) |
| `heritage.gold-antique` | `#D4AF37` | Antique gold highlights and award badges |
| `heritage.charcoal` | `#242424` | Primary high-contrast typography |

### Typography Hierarchy
- **Regal Display Serif:** `Cormorant Garamond` / `Playfair Display` (Headings and italic accents)
- **Contemporary Luxury Sans:** `Plus Jakarta Sans` (Body copy, forms, buttons)
- **Archival Metadata:** `JetBrains Mono` (Uppercase tracking labels, durations, price figures)

---

## 4. Getting Started Locally

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Start the Vite local development server
npm run dev
# The application will be running at http://localhost:5173/
```

### Building for Production & Static Pre-Rendering
```bash
# Compiles TypeScript, runs Vite production build, and executes SSG pre-rendering:
npm run build
```

This generates the `dist/` directory containing:
- `dist/index.html` (Homepage pre-rendered)
- `dist/venue-consultation/index.html` (Venue Advisory pre-rendered)
- `dist/wedding-consultation/index.html` (Planning Blueprint pre-rendered)
- `dist/services/index.html` (All 8 services pre-rendered)
- `dist/about/index.html` (About & Team pre-rendered)
- `dist/contact/index.html` (Contact & Maps pre-rendered)

---

## 5. Razorpay Payments Setup

### Test Mode (Active by Default)
The application is pre-configured with client-side test parameters and fallback order mocks, allowing you to test the complete 3-step booking flow without real monetary charges.

### Switching to Live Production Mode
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Retrieve your live API keys from the [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys):
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_live_yourLiveKeyId
   RAZORPAY_KEY_ID=rzp_live_yourLiveKeyId
   RAZORPAY_KEY_SECRET=yourLiveKeySecret
   ```
3. Set these environment variables in your Vercel or Netlify project settings.

---

## 6. Business Data Registry & Placeholders

In accordance with strict project rules, zero business facts have been fabricated.
- **Verified Data:** Jaipur headquarters address (Mahima Trinity Mall, Sodala), phone/WhatsApp (`+91 99292 52073`), decoded email (`info@weddingsvision.com`), WeddingWire India 2024 Wedding Award Winner status, and 10 verified 5.0 star reviews.
- **Placeholders Registry:** All parameters requiring client confirmation (such as exact pricing updates, real couple photo releases, or specific venue partnerships) are cataloged in [`content/PLACEHOLDERS.md`](content/PLACEHOLDERS.md).

---

## 7. Deployment Guidelines

### Deploying to Vercel
This repository includes a production-ready `vercel.json`:
1. Push repository to GitHub/GitLab.
2. Import the project in Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add environment variables (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`).
7. Deploy.

### Deploying to Netlify
This repository includes a production-ready `netlify.toml`:
1. Link repository to Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Functions directory: `api`.
5. Add environment variables.
6. Deploy.

---

## 8. Anti-Template Compliance Checklist

- [x] **No generic SaaS gradients:** Curated palette of Rajasthani Heritage Emerald, Sand, and Champagne Gold.
- [x] **No glassmorphism / heavy blur cards:** Precision hairline borders (`border-heritage-emerald/15`).
- [x] **No cartoon emoji or circled icon rows:** Restrained Lucide icons paired with architectural typography.
- [x] **No repeated 3-equal-column grids:** Asymmetric 60/40 layouts with editorial rhythm.
- [x] **No Inter/Roboto-only typography:** Cormorant Garamond italic serif paired with Plus Jakarta Sans and JetBrains Mono.
- [x] **No dark patterns:** Explicit pricing, zero fake timers, zero fake view counts.
- [x] **Mobile First (360px):** Tested and verified down to 360px screens with persistent 48px thumb-zone action bar.
