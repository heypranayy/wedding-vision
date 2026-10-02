# Content Placeholders & Verified Business Data Registry
**Weddings Vision (Jaipur)**
*Documenting verified business ground truth vs. required client data placeholders. No business facts are invented.*

---

## 1. Verified Ground Truth (Extracted from Live Site)

| Field | Verified Value | Source |
|---|---|---|
| **Legal / Brand Name** | Wedding Vision (Weddings Vision) | weddingsvision.com |
| **Brand Tagline** | *Rajasthani Heritage Meets Modern Design* / *Your Dream Wedding, Elegantly Crafted* | weddingsvision.com |
| **Physical Address** | 6th Floor, Mahima Trinity Mall, 603, Swej Farm Rd, Shiva Colony, Sodala, Jaipur, Rajasthan 302019 | Live Homepage & Contact Page |
| **Phone Number** | `+91 99292 52073` | Live Header & Footer |
| **WhatsApp Hotline** | `+91 99292 52073` | Live Chat Widget (`joinchat`) |
| **Official Email** | `info@weddingsvision.com` | Live Contact Page (Cloudflare Decoded) |
| **Verified Awards** | Winner: WeddingWire India Wedding Awards 2024 | Live Site Badge (`Wedding-Awards-2024-scaled.webp`) |
| **Verified Review Score** | WeddingWire 10 Reviews, Rated 5.0 / 5.0 Stars | Live Site Badge (`badge-rated-10.png`) |
| **Verified Review Link** | `https://www.weddingwire.in/wedding-planners/wedding-vision--e405719/reviews` | Live Site Widget Anchor |
| **Social Links** | Instagram: `https://www.instagram.com/weddingvisionbyrc/`<br/>Facebook: `https://www.facebook.com/weddingvisionbyrc/` | Live Site Links |
| **Core Services Listed** | 1. Full Wedding Planning<br/>2. Destination Weddings<br/>3. Event Design & Décor<br/>4. Guest Management<br/>5. Catering & Menu Planning<br/>6. Entertainment & Live Performances<br/>7. Vendor Coordination<br/>8. Budget Management | Live Services Page |
| **Brand Color (Evidence)** | Primary Emerald/Teal: `#1a484c`<br/>Title Dark Charcoal: `#242424`<br/>Neutral Body: `#4F4F4F` / `#777777`<br/>Gold / Champagne Accent: `#C5A880` / `#D4AF37` | Computed styles & SVGs |

---

## 2. Placeholders Required from Client (Marked Explicitly)

The following items are not published on the current live site and require official confirmation from Weddings Vision. They will use strictly marked placeholder tokens in the codebase:

### A. Paid Service Pricing (Razorpay INR)
- `[PLACEHOLDER_PRICE_VENUE_CONSULTATION]`
  - *Description:* Flat consultation fee for 60-min 1-on-1 Rajasthan Venue Advisory (e.g., ₹2,999 or ₹4,999).
  - *Current Working Baseline:* ₹2,999 (Subject to client confirmation).
- `[PLACEHOLDER_PRICE_WEDDING_CONSULTATION]`
  - *Description:* Flat consultation fee for 90-min Full Wedding Concept, Budget Modeling & Planning Blueprint.
  - *Current Working Baseline:* ₹4,999 (Subject to client confirmation).

### B. Venue Catalog & Capacity Details
- `[PLACEHOLDER_FEATURED_VENUES]`
  - Real Rajasthan palace/resort partnerships to showcase in the Venue Advisory portfolio (e.g. Rambagh Palace, Fairmont Jaipur, Samode Palace, Alila Fort Bishangarh, Suryagarh Jaisalmer).
  - *Note:* Until certified by the client, venue case studies will display verified architectural imagery and marked advisory scopes without inventing false commercial contract claims.

### C. Client Testimonial Quotes & Couple Photography
- `[PLACEHOLDER_TESTIMONIAL_COUPLE_1]` - Full quote, couple names, venue, wedding date.
- `[PLACEHOLDER_TESTIMONIAL_COUPLE_2]` - Full quote, couple names, venue, wedding date.
- `[PLACEHOLDER_TESTIMONIAL_COUPLE_3]` - Full quote, couple names, venue, wedding date.
- *Verified Public Fallback:* Link to verified WeddingWire reviews (10 reviews, 5.0 rating).

### D. Booking Slot Availability
- `[PLACEHOLDER_CONSULTATION_CALENDAR]`
  - Available calendar days/times per week for consultations (e.g., Tue-Sun, 11:00 AM - 7:00 PM IST).
