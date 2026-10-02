import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowUpRight, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';
import type { ServiceType } from '../types';

interface ContactPageProps {
  onOpenBooking: (serviceType?: ServiceType) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    dates: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
          Direct Liaison
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-heritage-charcoal font-light leading-tight">
          Connect with Our Jaipur Office
        </h1>
        <p className="text-heritage-muted text-base sm:text-lg max-w-2xl font-light leading-relaxed">
          Whether you are exploring palace venues across Rajasthan or planning a grand multi-day destination wedding, our senior planners are here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Contact Information & Map (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-6 border border-heritage-emerald/15 space-y-5">
            <h2 className="font-serif text-2xl text-heritage-emerald">
              Headquarters
            </h2>
            <div className="space-y-4 text-xs text-heritage-charcoal">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-heritage-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-heritage-charcoal">Jaipur Office:</strong>
                  <span className="text-heritage-muted leading-relaxed">
                    6th Floor, Mahima Trinity Mall, 603, Swej Farm Rd, Shiva Colony, Sodala, Jaipur, Rajasthan 302019
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-heritage-gold shrink-0" />
                <div>
                  <strong className="block text-heritage-charcoal">Direct Line:</strong>
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-heritage-emerald hover:underline">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-heritage-gold shrink-0" />
                <div>
                  <strong className="block text-heritage-charcoal">Official Email:</strong>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="text-heritage-emerald hover:underline">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-heritage-sand-dark flex flex-col gap-2">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-700 text-white py-3 text-xs uppercase tracking-luxury font-medium flex items-center justify-center gap-2 hover:bg-emerald-800 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Inquiry</span>
              </a>

              <button
                type="button"
                onClick={() => onOpenBooking('venue')}
                className="w-full bg-heritage-emerald text-heritage-sand py-3 text-xs uppercase tracking-luxury font-medium flex items-center justify-center gap-2 hover:bg-heritage-emerald-deep transition-colors"
              >
                <span>Book Paid Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-heritage-gold" />
              </button>
            </div>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="border border-heritage-emerald/20 overflow-hidden shadow-sm aspect-video bg-heritage-sand-dark">
            <iframe
              title="Weddings Vision Mahima Trinity Mall Jaipur"
              src="https://maps.google.com/maps?q=wedding%20vision%206th%20Floor%2C%20Mahima%20Trinity%20Mall%2C%20603%2C%20Swej%20Farm%20Rd%2C%20Shiva%20Colony%2C%20Sodala%2C%20Jaipur%2C%20Rajasthan%20302019&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>

        {/* General Inquiry Message Form (7 cols) */}
        <div className="md:col-span-7 bg-white p-8 border border-heritage-emerald/15 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-luxury text-heritage-gold font-bold block">
              General Inquiries
            </span>
            <h2 className="font-serif text-2xl text-heritage-charcoal">
              Send a Direct Message
            </h2>
            <p className="text-xs text-heritage-muted leading-relaxed">
              If you have general inquiries or vendor partnership queries, send us a message below. For dedicated planning advice, we recommend booking a paid 1-on-1 consultation session.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-heritage-sand-dark text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-heritage-emerald mx-auto" />
              <h3 className="font-serif text-xl text-heritage-emerald">
                Message Received
              </h3>
              <p className="text-xs text-heritage-muted">
                Our planning team will review your message and reply via WhatsApp/Email within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-heritage-charcoal mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Ananya Rathore"
                  className="w-full bg-heritage-sand/40 border border-heritage-emerald/20 px-3 py-2.5 text-xs text-heritage-charcoal focus:outline-none focus:border-heritage-emerald"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-heritage-charcoal mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-heritage-sand/40 border border-heritage-emerald/20 px-3 py-2.5 text-xs text-heritage-charcoal focus:outline-none focus:border-heritage-emerald"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-heritage-charcoal mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full bg-heritage-sand/40 border border-heritage-emerald/20 px-3 py-2.5 text-xs text-heritage-charcoal focus:outline-none focus:border-heritage-emerald"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-heritage-charcoal mb-1">
                  Expected Celebration Dates / Season
                </label>
                <input
                  type="text"
                  value={form.dates}
                  onChange={(e) => setForm({ ...form, dates: e.target.value })}
                  placeholder="e.g. December 2026, Jaipur"
                  className="w-full bg-heritage-sand/40 border border-heritage-emerald/20 px-3 py-2.5 text-xs text-heritage-charcoal focus:outline-none focus:border-heritage-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-heritage-charcoal mb-1">
                  Message / Inquiries
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your wedding vision, guest count, and any specific venues you are considering..."
                  className="w-full bg-heritage-sand/40 border border-heritage-emerald/20 px-3 py-2 text-xs text-heritage-charcoal focus:outline-none focus:border-heritage-emerald resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-heritage-emerald text-heritage-sand py-3.5 text-xs uppercase tracking-luxury font-semibold hover:bg-heritage-emerald-deep transition-colors shadow flex items-center justify-center gap-2"
              >
                <span>Submit Inquiry</span>
                <Send className="w-3.5 h-3.5 text-heritage-gold" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
