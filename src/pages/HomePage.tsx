import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Car,
  SprayCan,
  Wrench,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Link } from "wouter";
import carHeroImg from "@assets/bmw.webp";
import BookingModal from "@/components/BookingModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { fadeIn, staggerContainer } from "@/lib/animations";
import type { Language } from "@/i18n/translations";

/* ─── Offer Card ─────────────────────────────────────────────────────────── */

interface OfferCardProps {
  price: { de: string; en: string };
  title: { de: string; en: string };
  included: { de: string[]; en: string[] };
  popular?: boolean;
  testId: string;
  bookNowLabel: string;
  includedLabel: string;
  popularLabel: string;
  lang: Language;
  onBook: () => void;
}

function OfferCard({
  price,
  title,
  included,
  popular = false,
  testId,
  bookNowLabel,
  includedLabel,
  popularLabel,
  lang,
  onBook,
}: OfferCardProps) {
  return (
    <motion.div
      variants={fadeIn}
      className={`bg-[#1a1a1a] p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 relative ${
        popular
          ? "border border-primary/30 hover:border-primary/70"
          : "border border-white/5 hover:border-primary/40"
      }`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold uppercase tracking-widest px-3 py-1">
          {popularLabel}
        </div>
      )}

      <div className={`mb-6 ${popular ? "mt-4" : ""}`}>
        <span
          className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4 ${
            popular
              ? "border border-primary/50 text-primary"
              : "bg-primary text-black"
          }`}
        >
          {t(price, lang)}
        </span>
        <h3 className="text-2xl font-bold uppercase leading-tight">
          {t(title, lang)}
        </h3>
      </div>

      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
          {includedLabel}
        </p>
        <ul className="space-y-2">
          {t(included, lang).map((item, i) => (
            <li key={i} className="flex items-start space-x-3 text-sm font-medium text-gray-300">
              <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={16} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={onBook}
          data-testid={testId}
          className="w-full bg-primary text-black py-4 text-sm font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors"
        >
          {bookNowLabel}
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

const SERVICE_ICONS = [
  <Droplets size={36} />,
  <Car size={36} />,
  <SprayCan size={36} />,
  <Wrench size={36} />,
];

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingOffer, setBookingOffer] = useState<string | null>(null);

  const openBooking = (offer: string | null = null) => {
    setBookingOffer(offer);
    setBookingOpen(true);
  };

  const { lang } = useLanguage();
  const hero = translations.hero;
  const offers = translations.offers;
  const stagger15 = staggerContainer(0.15);

  const offerSharedProps = {
    bookNowLabel: t(offers.bookNow, lang),
    includedLabel: t(offers.included, lang),
    popularLabel: t(offers.popular, lang),
    lang,
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-primary selection:text-black">
      <Navbar page="home" />

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center pt-24 pb-12 px-6 md:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#141414] z-0">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-black to-black pointer-events-none"></div>
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger15}
            className="flex flex-col items-start"
          >
            <motion.div
              variants={fadeIn}
              className="inline-block px-3 py-1 border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6 rounded-sm"
            >
              {t(hero.badge, lang)}
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.9] tracking-tight mb-6"
            >
              {t(hero.headline1, lang)} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">
                {t(hero.headline2, lang)}
              </span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-gray-400 font-medium mb-10 max-w-lg border-l-2 border-primary pl-4 py-1"
            >
              {t(hero.subtext, lang)}
            </motion.p>
            <motion.button
              variants={fadeIn}
              onClick={() => openBooking()}
              data-testid="cta-hero-whatsapp"
              className="group flex items-center justify-center space-x-3 bg-primary text-black px-8 py-5 text-xl font-bold uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_40px_rgba(255,215,0,0.3)] hover:shadow-[0_0_60px_rgba(255,215,0,0.5)]"
            >
              <span>{t(hero.cta, lang)}</span>
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative h-[260px] md:h-[400px] lg:h-[600px] w-full"
          >
            <div className="absolute inset-0 rounded-2xl border border-white/5 bg-card overflow-hidden group">
              <img
                src={carHeroImg}
                alt="Yellow performance car with carbon fibre details"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
            <div className="hidden lg:block absolute lg:-bottom-6 lg:-left-6 bg-card border border-white/10 lg:p-6 shadow-2xl backdrop-blur-xl">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">
                {t(hero.perfectionBadge, lang)}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Strip */}
      <section id="services" className="py-24 px-6 md:px-12 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger15}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {translations.services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="group bg-card border border-white/5 p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-0 group-hover:bg-primary/20 transition-colors duration-500"></div>
                <div className="text-white group-hover:text-primary transition-colors duration-300 mb-6 relative z-10">
                  {SERVICE_ICONS[index]}
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-wide mb-2 relative z-10">
                  {t(service.title, lang)}
                </h3>
                <p className="text-gray-400 font-medium text-sm relative z-10">
                  {t(service.desc, lang)}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="mt-12 flex justify-center"
          >
            <Link
              href="/services"
              data-testid="cta-view-all-services"
              className="group flex items-center space-x-2 border border-primary/50 text-primary px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all duration-300"
            >
              <span>{t(translations.servicesPage.viewAll, lang)}</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section id="offers" className="py-24 px-6 md:px-12 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-14"
          >
            <div className="inline-flex items-center space-x-2 text-primary font-bold tracking-widest uppercase mb-4">
              <span className="w-12 h-[2px] bg-primary"></span>
              <span>{t(offers.sectionLabel, lang)}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold uppercase leading-tight">
              {t(offers.sectionTitle, lang)}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger15}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8"
          >
            <OfferCard
              {...offerSharedProps}
              price={offers.card1.price}
              title={offers.card1.title}
              included={offers.card1.included}
              testId="cta-offer-1-whatsapp"
              onBook={() => openBooking(translations.offers.card1.title.en)}
            />
            <OfferCard
              {...offerSharedProps}
              price={offers.card2.price}
              title={offers.card2.title}
              included={offers.card2.included}
              testId="cta-offer-2-whatsapp"
              onBook={() => openBooking(translations.offers.card2.title.en)}
            />
            <OfferCard
              {...offerSharedProps}
              price={offers.card3.price}
              title={offers.card3.title}
              included={offers.card3.included}
              popular
              testId="cta-offer-3-whatsapp"
              onBook={() => openBooking(translations.offers.card3.title.en)}
            />
            <OfferCard
              {...offerSharedProps}
              price={offers.card4.price}
              title={offers.card4.title}
              included={offers.card4.included}
              testId="cta-offer-4-whatsapp"
              onBook={() => openBooking(translations.offers.card4.title.en)}
            />
          </motion.div>
        </div>
      </section>

      <Footer className="mt-12" />

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialOffer={bookingOffer}
      />
    </div>
  );
}
