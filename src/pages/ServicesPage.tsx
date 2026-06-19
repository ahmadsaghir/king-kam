import React, { useState, useEffect, useRef } from "react";
import { m } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/i18n/translations";
import {
  SERVICE_CONFIG,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type ServiceCategory,
} from "@/config/services";
import BookingModal from "@/components/BookingModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeIn, staggerContainer } from "@/lib/animations";

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
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string | null>(null);

  const openBooking = (serviceName: string) => {
    setBookingService(serviceName);
    setBookingOpen(true);
  };

  const { lang } = useLanguage();
  const nav = translations.nav;
  const sp = translations.servicesPage;

  const stagger08 = staggerContainer(0.08);

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
      <Navbar page="services" />

      {/* Page Header */}
      <section className="pt-36 pb-16 px-6 md:px-12 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
        <div className="max-w-7xl mx-auto">
          <m.div
            initial="hidden"
            animate="visible"
            variants={stagger08}
          >
            <m.div
              variants={fadeIn}
              className="inline-flex items-center space-x-2 text-primary font-bold tracking-widest uppercase mb-4"
            >
              <span className="w-12 h-[2px] bg-primary"></span>
              <span>{t(nav.services, lang)}</span>
            </m.div>
            <m.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold uppercase leading-tight mb-4"
            >
              {t(sp.title, lang)}
            </m.h1>
            <m.p
              variants={fadeIn}
              className="text-xl text-gray-400 font-medium max-w-2xl border-l-2 border-primary pl-4 py-1"
            >
              {t(sp.subtitle, lang)}
            </m.p>
          </m.div>
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
                <m.div
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
                </m.div>

                <m.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={stagger08}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {services.map((service) => (
                    <m.div
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
                        <p className="mt-3 text-sm font-bold text-primary tracking-wide">
                          {service.label
                            ? t(service.label, lang)
                            : service.price
                            ? service.price.unit === "from"
                              ? `${t(translations.booking.from, lang)} ${service.price.currency}${service.price.amount}`
                              : `${service.price.currency}${service.price.amount}`
                            : t(translations.booking.askForPrice, lang)}
                        </p>
                        <button
                          onClick={() => openBooking(service.name)}
                          className="mt-4 flex items-center space-x-1 text-xs font-bold uppercase tracking-widest text-primary hover:text-yellow-400 transition-colors"
                        >
                          <span>{t(sp.bookNow, lang)}</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </m.div>
                  ))}
                </m.div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialOffer={null}
        initialService={bookingService}
      />
    </div>
  );
}
