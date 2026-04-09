import React, { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Droplets,
  Car,
  SprayCan,
  Wrench,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { SiInstagram, SiTiktok } from "react-icons/si";
import { Link } from "wouter";
import carHeroImg from "@assets/bmw.webp";
import BookingModal from "@/components/BookingModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/i18n/translations";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingOffer, setBookingOffer] = useState<string | null>(null);

  const openBooking = (offer: string | null = null) => {
    setBookingOffer(offer);
    setBookingOpen(true);
  };
  const { lang, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const nav = translations.nav;
  const hero = translations.hero;
  const offers = translations.offers;
  const loyalty = translations.loyalty;
  const contact = translations.contact;
  const footer = translations.footer;

  const serviceIcons = [
    <Droplets size={36} />,
    <Car size={36} />,
    <SprayCan size={36} />,
    <Wrench size={36} />,
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-primary selection:text-black">
      {/* 1. Sticky Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-black/40 backdrop-blur-sm py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={`${import.meta.env.BASE_URL}kam_logo.webp`}
              alt="The King Kam Logo"
              className="h-12 w-auto object-contain rounded"
              loading="lazy"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 text-sm font-semibold tracking-widest uppercase">
            <Link
              href="/services"
              data-testid="nav-services"
              className="hover:text-primary transition-colors"
            >
              {t(nav.services, lang)}
            </Link>
            <button
              onClick={() => scrollToSection("offers")}
              data-testid="nav-offers"
              className="hover:text-primary transition-colors"
            >
              {t(nav.offers, lang)}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              data-testid="nav-about"
              className="hover:text-primary transition-colors"
            >
              {t(nav.about, lang)}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              data-testid="nav-contact"
              className="hover:text-primary transition-colors"
            >
              {t(nav.contact, lang)}
            </button>
            <button
              onClick={toggleLanguage}
              data-testid="lang-toggle"
              className="hover:text-primary transition-colors border border-white/20 hover:border-primary px-3 py-1 text-xs"
            >
              {lang === "de" ? "EN" : "DE"}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-b border-white/10 py-6 px-6 flex flex-col space-y-6 text-lg font-bold tracking-wider uppercase">
            <Link
              href="/services"
              data-testid="nav-mobile-services"
              className="text-left hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(nav.services, lang)}
            </Link>
            <button
              onClick={() => scrollToSection("offers")}
              data-testid="nav-mobile-offers"
              className="text-left hover:text-primary transition-colors"
            >
              {t(nav.offers, lang)}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              data-testid="nav-mobile-about"
              className="text-left hover:text-primary transition-colors"
            >
              {t(nav.about, lang)}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              data-testid="nav-mobile-contact"
              className="text-left hover:text-primary transition-colors"
            >
              {t(nav.contact, lang)}
            </button>
            <button
              onClick={toggleLanguage}
              data-testid="lang-toggle-mobile"
              className="text-left hover:text-primary transition-colors"
            >
              {lang === "de" ? "EN" : "DE"}
            </button>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
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
            variants={staggerContainer}
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
              <ChevronRight
                size={24}
                className="group-hover:translate-x-1 transition-transform"
              />
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

      {/* 3. Services Strip */}
      <section
        id="services"
        className="py-24 px-6 md:px-12 bg-black border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
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
                  {serviceIcons[index]}
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

      {/* 4. Special Offers Section */}
      <section
        id="offers"
        className="py-24 px-6 md:px-12 bg-[#0d0d0d] relative overflow-hidden"
      >
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
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Card 1 – Interior & Exterior Cleaning Package */}
            <motion.div
              variants={fadeIn}
              className="bg-[#1a1a1a] border border-white/5 p-8 flex flex-col hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-6">
                <span className="inline-block bg-primary text-black text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4">
                  {t(translations.booking.from, lang)} €50
                </span>
                <h3 className="text-2xl font-bold uppercase leading-tight">
                  {t(offers.card1.title, lang)}
                </h3>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                  {t(offers.included, lang)}
                </p>
                <ul className="space-y-2">
                  {t(offers.card1.included, lang).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start space-x-3 text-sm font-medium text-gray-300"
                    >
                      <CheckCircle2
                        className="text-primary mt-0.5 shrink-0"
                        size={16}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  {t(offers.optionalExtras, lang)}
                </p>
                <ul className="space-y-2">
                  {t(offers.card1.extras, lang).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start space-x-3 text-sm font-medium text-gray-500"
                    >
                      <ChevronRight
                        className="text-primary/60 mt-0.5 shrink-0"
                        size={16}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-8">
                <button
                  onClick={() => openBooking(translations.offers.card1.title.en)}
                  data-testid="cta-offer-1-whatsapp"
                  className="w-full bg-primary text-black py-4 text-sm font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors"
                >
                  {t(offers.bookNow, lang)}
                </button>
              </div>
            </motion.div>

            {/* Card 2 – Premium 3-Layer Car Polishing */}
            <motion.div
              variants={fadeIn}
              className="bg-[#1a1a1a] border border-primary/30 p-8 flex flex-col hover:border-primary/70 transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold uppercase tracking-widest px-3 py-1">
                {t(offers.popular, lang)}
              </div>
              <div className="mb-6 mt-4">
                <span className="inline-block border border-primary/50 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4">
                  €120
                </span>
                <h3 className="text-2xl font-bold uppercase leading-tight">
                  {t(offers.card2.title, lang)}
                </h3>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mt-2">
                  {t(offers.availableFrom, lang)}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                  {t(offers.included, lang)}
                </p>
                <ul className="space-y-2">
                  {t(offers.card2.included, lang).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start space-x-3 text-sm font-medium text-gray-300"
                    >
                      <CheckCircle2
                        className="text-primary mt-0.5 shrink-0"
                        size={16}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  {t(offers.validVehicleTypes, lang)}
                </p>
                <ul className="space-y-2">
                  {t(offers.card2.vehicleTypes, lang).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start space-x-3 text-sm font-medium text-gray-500"
                    >
                      <ChevronRight
                        className="text-primary/60 mt-0.5 shrink-0"
                        size={16}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-8">
                <button
                  onClick={() => openBooking(translations.offers.card2.title.en)}
                  data-testid="cta-offer-2-whatsapp"
                  className="w-full bg-primary text-black py-4 text-sm font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors"
                >
                  {t(offers.bookNow, lang)}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. Loyalty Card Banner */}
      <section className="py-24 px-6 md:px-12 bg-black relative">
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-primary/30 bg-card/80 backdrop-blur-sm p-12 md:p-20 text-center relative overflow-hidden group hover:border-primary transition-colors duration-500"
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary"></div>

            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-primary mb-6 leading-tight">
              {t(loyalty.headline, lang)}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-medium uppercase tracking-widest">
              {t(loyalty.subtext, lang)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer
        id="about"
        className="bg-[#050505] border-t border-white/10 pt-20 pb-10 px-6 md:px-12 mt-12 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5 flex flex-col items-start">
              <img
                src={`${import.meta.env.BASE_URL}kam_logo.webp`}
                alt="The King Kam Logo"
                className="h-16 w-auto object-contain mb-6 grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
              <p className="text-gray-500 font-medium text-lg max-w-sm mb-8">
                {t(footer.tagline, lang)}
              </p>
              <div className="flex flex-row space-x-4">
                <a
                  href="https://www.instagram.com/kam.autoaufbereitung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-white hover:text-primary transition-colors duration-300 group"
                  data-testid="social-instagram"
                >
                  <div className="w-10 h-10 bg-card border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300 shrink-0">
                    <SiInstagram size={20} />
                  </div>
                </a>
                <a
                  href="https://www.tiktok.com/@kam.auto1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-white hover:text-primary transition-colors duration-300 group"
                  data-testid="social-tiktok"
                >
                  <div className="w-10 h-10 bg-card border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300 shrink-0">
                    <SiTiktok size={20} />
                  </div>
                </a>
              </div>
            </div>

            <div className="md:col-span-3"></div>

            <div id="contact" className="md:col-span-4">
              <h4 className="text-2xl font-bold uppercase tracking-wider mb-6 text-white">
                {t(contact.title, lang)}
              </h4>
              <ul className="space-y-4 text-gray-400 font-medium text-lg">
                <li className="flex items-start">
                  <span className="font-bold text-white uppercase tracking-wider w-24">
                    {t(contact.address, lang)}
                  </span>
                  <span>
                    Am Bruche 44,
                    <br /> 31812 Bad Pyrmont
                  </span>
                </li>
                <li className="flex items-center border-t border-white/10 pt-4 mt-4">
                  <span className="font-bold text-white uppercase tracking-wider w-24">
                    {t(contact.phone, lang)}
                  </span>
                  <a
                    href="tel:01792170895"
                    className="hover:text-primary transition-colors"
                  >
                    0179 217 08 95
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-semibold text-gray-600 uppercase tracking-widest">
            <p>
              &copy; {new Date().getFullYear()} The King Kam Autoaufbereitung.{" "}
              {t(footer.rights, lang)}
            </p>
            <p className="mt-4 md:mt-0">{t(footer.detailing, lang)}</p>
          </div>
        </div>
      </footer>

      {/* Global CSS for custom animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `,
        }}
      />

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} initialOffer={bookingOffer} />
    </div>
  );
}
