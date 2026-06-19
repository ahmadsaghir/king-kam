import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/i18n/translations";

interface NavbarProps {
  page: "home" | "services";
}

export default function Navbar({ page }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLanguage } = useLanguage();
  const nav = translations.nav;
  const isHome = page === "home";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItemClass = (mobile?: boolean) =>
    `hover:text-primary transition-colors${mobile ? " text-left" : ""}`;

  const NavItem = ({
    sectionId,
    href,
    label,
    testId,
    mobile,
  }: {
    sectionId: string;
    href: string;
    label: string;
    testId: string;
    mobile?: boolean;
  }) =>
    isHome ? (
      <button
        onClick={() => scrollToSection(sectionId)}
        data-testid={testId}
        className={navItemClass(mobile)}
      >
        {label}
      </button>
    ) : (
      <Link
        href={href}
        data-testid={testId}
        className={navItemClass(mobile)}
        onClick={mobile ? () => setMobileMenuOpen(false) : undefined}
      >
        {label}
      </Link>
    );

  const servicesActiveClass = !isHome ? "text-primary " : "";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/10 py-3"
          : `${isHome ? "bg-black/40" : "bg-black/80"} backdrop-blur-sm py-5`
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center">
          {isHome ? (
            <img
              src={`${import.meta.env.BASE_URL}kam_logo.webp`}
              alt="The King Kam Logo"
              className="h-12 w-auto object-contain rounded"
              loading="lazy"
            />
          ) : (
            <Link href="/" className="flex items-center">
              <img
                src={`${import.meta.env.BASE_URL}kam_logo.webp`}
                alt="The King Kam Logo"
                className="h-12 w-auto object-contain rounded"
                loading="lazy"
              />
            </Link>
          )}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-semibold tracking-widest uppercase">
          <Link
            href="/services"
            data-testid="nav-services"
            className={`${servicesActiveClass}hover:text-primary transition-colors`}
          >
            {t(nav.services, lang)}
          </Link>
          <NavItem sectionId="offers" href="/#offers" label={t(nav.offers, lang)} testId="nav-offers" />
          <NavItem sectionId="about" href="/#about" label={t(nav.about, lang)} testId="nav-about" />
          <NavItem sectionId="contact" href="/#contact" label={t(nav.contact, lang)} testId="nav-contact" />
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
            className={`text-left ${servicesActiveClass}hover:text-primary transition-colors`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t(nav.services, lang)}
          </Link>
          <NavItem sectionId="offers" href="/#offers" label={t(nav.offers, lang)} testId="nav-mobile-offers" mobile />
          <NavItem sectionId="about" href="/#about" label={t(nav.about, lang)} testId="nav-mobile-about" mobile />
          <NavItem sectionId="contact" href="/#contact" label={t(nav.contact, lang)} testId="nav-mobile-contact" mobile />
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
  );
}
