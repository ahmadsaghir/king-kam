import React from "react";
import { Link } from "wouter";
import { SiInstagram, SiTiktok } from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/i18n/translations";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const { lang } = useLanguage();
  const footer = translations.footer;
  const contact = translations.contact;

  return (
    <footer
      id="about"
      className={`bg-[#050505] border-t border-white/10 pt-20 pb-10 px-6 md:px-12 relative z-10 ${className}`}
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
                data-testid="social-instagram"
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
                data-testid="social-tiktok"
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
                <a href="tel:01792170895" className="hover:text-primary transition-colors">
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
  );
}
