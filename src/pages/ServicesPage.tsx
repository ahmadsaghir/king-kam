import React, { useState, useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { SiInstagram, SiTiktok } from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/i18n/translations";
import {
  SERVICE_CONFIG,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type ServiceCategory,
} from "@/config/services";
import BookingModal from "@/components/BookingModal";

function LazyServiceImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={loaded ?? undefined}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

export default function ServicesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string | null>(null);

  const openBooking = (serviceName: string) => {
    setBookingService(serviceName);
    setBookingOpen(true);
  };

  const { lang, toggleLanguage } = useLanguage();
  const nav = translations.nav;
  const footer = translations.footer;
  const contact = translations.contact;
  const sp = translations.servicesPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const getServiceLabel = (enKey: string): string => {
    const idx = translations.booking.services.en.indexOf(enKey);
    if (idx >= 0) return t(translations.booking.services, lang)[idx];
    const extraIdx = translations.booking.extraServices.en.indexOf(enKey);
    if (extraIdx >= 0) return t(translations.booking.extraServices, lang)[extraIdx];
    return enKey;
  };

  const grouped: Record<ServiceCategory, Array<{ name: string } & typeof SERVICE_CONFIG[string]>> =
    {} as Record<ServiceCategory, Array<{ name: string } & typeof SERVICE_CONFIG[string]>>;

  for (const cat of CATEGORY_ORDER) {
    grouped[cat] = [];
  }
  for (const [name, cfg] of Object.entries(SERVICE_CONFIG)) {
    grouped[cfg.category].push({ name, ...cfg });
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-black/80 backdrop-blur-sm py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src={`${import.meta.env.BASE_URL}kam_logo.webp`}
              alt="The King Kam Logo"
              className="h-12 w-auto object-contain rounded"
              loading="lazy"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 text-sm font-semibold tracking-widest uppercase">
            <Link
              href="/services"
              data-testid="nav-services"
              className="text-primary hover:text-primary transition-colors"
            >
              {t(nav.services, lang)}
            </Link>
            <Link
              href="/#offers"
              data-testid="nav-offers"
              className="hover:text-primary transition-colors"
            >
              {t(nav.offers, lang)}
            </Link>
            <Link
              href="/#about"
              data-testid="nav-about"
              className="hover:text-primary transition-colors"
            >
              {t(nav.about, lang)}
            </Link>
            <Link
              href="/#contact"
              data-testid="nav-contact"
              className="hover:text-primary transition-colors"
            >
              {t(nav.contact, lang)}
            </Link>
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
              className="text-left text-primary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(nav.services, lang)}
            </Link>
            <Link
              href="/#offers"
              data-testid="nav-mobile-offers"
              className="text-left hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(nav.offers, lang)}
            </Link>
            <Link
              href="/#about"
              data-testid="nav-mobile-about"
              className="text-left hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(nav.about, lang)}
            </Link>
            <Link
              href="/#contact"
              data-testid="nav-mobile-contact"
              className="text-left hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(nav.contact, lang)}
            </Link>
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

      {/* Page Header */}
      <section className="pt-36 pb-16 px-6 md:px-12 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center space-x-2 text-primary font-bold tracking-widest uppercase mb-4"
            >
              <span className="w-12 h-[2px] bg-primary"></span>
              <span>{t(nav.services, lang)}</span>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold uppercase leading-tight mb-4"
            >
              {t(sp.title, lang)}
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-xl text-gray-400 font-medium max-w-2xl border-l-2 border-primary pl-4 py-1"
            >
              {t(sp.subtitle, lang)}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services by Category */}
      <section className="pb-24 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto space-y-20">
          {CATEGORY_ORDER.map((cat) => {
            const services = grouped[cat];
            if (!services || services.length === 0) return null;
            return (
              <div key={cat}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeIn}
                  className="mb-10"
                >
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="w-8 h-[2px] bg-primary"></span>
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-primary">
                      {t(CATEGORY_LABELS[cat], lang)}
                    </h2>
                  </div>
                  <div className="w-full h-px bg-white/5 mt-4"></div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={staggerContainer}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {services.map((service) => (
                    <motion.div
                      key={service.name}
                      variants={fadeIn}
                      className="group bg-card border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col"
                    >
                      <div className="relative h-48 overflow-hidden bg-[#111]">
                        <LazyServiceImage
                          src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}${service.imagePath}`}
                          alt={service.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-bold uppercase tracking-wide mb-2 group-hover:text-primary transition-colors duration-300">
                          {getServiceLabel(service.name)}
                        </h3>
                        <p className="text-gray-400 text-sm font-medium flex-1">
                          {t(service.description, lang)}
                        </p>
                        <button
                          onClick={() => openBooking(service.name)}
                          className="mt-4 flex items-center space-x-1 text-xs font-bold uppercase tracking-widest text-primary hover:text-yellow-400 transition-colors"
                        >
                          <span>{t(sp.bookNow, lang)}</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer
        id="about"
        className="bg-[#050505] border-t border-white/10 pt-20 pb-10 px-6 md:px-12 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5 flex flex-col items-start">
              <Link href="/">
                <img
                  src={`${import.meta.env.BASE_URL}kam_logo.webp`}
                  alt="The King Kam Logo"
                  className="h-16 w-auto object-contain mb-6 grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </Link>
              <p className="text-gray-500 font-medium text-lg max-w-sm mb-8">
                {t(footer.tagline, lang)}
              </p>
              <div className="flex flex-row space-x-4">
                <a
                  href="https://www.instagram.com/kam.autoaufbereitung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-white hover:text-primary transition-colors duration-300 group"
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

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} initialOffer={null} initialService={bookingService} />
    </div>
  );
}
