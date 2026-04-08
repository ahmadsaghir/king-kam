import {
  Droplets,
  Sparkles,
  CircleDashed,
  Wrench,
  Armchair,
  CircleGauge,
  Layers,
  Palette,
  ClipboardCheck,
  Car,
  Stars,
  Lightbulb,
  Monitor,
  Gauge,
  Shield,
  PanelTop,
  LayoutTemplate,
  Frame,
  Paintbrush,
  Disc,
  Cog,
  FileWarning,
  TrendingUp,
  TrendingDown,
  Flame,
  Calculator,
  Receipt,
  Sun,
  Droplet,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory = "exterior" | "interior" | "wrapping" | "tech" | "sales" | "assessment";

export interface ServiceConfig {
  imagePath: string;
  description: { de: string; en: string };
  icon: LucideIcon;
  category: ServiceCategory;
}

export const CATEGORY_LABELS: Record<ServiceCategory, { de: string; en: string }> = {
  exterior: { de: "Außenpflege", en: "Exterior" },
  interior: { de: "Innenraum", en: "Interior" },
  wrapping: { de: "Folierung & Karosserie", en: "Wrapping & Body" },
  tech: { de: "Technik & Elektronik", en: "Tech & Electronics" },
  sales: { de: "Verkauf & Ankauf", en: "Sales & Acquisition" },
  assessment: { de: "Gutachten & Bewertung", en: "Assessment & Reports" },
};

export const CATEGORY_ORDER: ServiceCategory[] = ["exterior", "interior", "wrapping", "tech", "sales", "assessment"];

export const SERVICE_CONFIG: Record<string, ServiceConfig> = {
  "Car Washing": {
    imagePath: "/services/car-washing.webp",
    description: {
      de: "Vollständige Außenwäsche mit Premium-Shampoo und Spülung",
      en: "Full exterior wash with premium shampoo and rinse",
    },
    icon: Droplets,
    category: "exterior",
  },
  "Auto Detailing": {
    imagePath: "/services/auto-detailing.webp",
    description: {
      de: "Umfassende Lack- und Oberflächenaufbereitung",
      en: "Comprehensive paint and surface restoration treatment",
    },
    icon: Sparkles,
    category: "exterior",
  },
  "Waxing & Polishing": {
    imagePath: "/services/waxing-polishing.webp",
    description: {
      de: "Tiefenglanz-Wachsierung und maschinelle Politur für Showroom-Glanz",
      en: "Deep gloss wax and machine polishing for showroom shine",
    },
    icon: CircleDashed,
    category: "exterior",
  },
  "Scratch Removal": {
    imagePath: "/services/scratch-removal.webp",
    description: {
      de: "Professionelle Lackkorrektur für leichte Kratzer und Schleifringe",
      en: "Professional paint correction for light scratches and swirls",
    },
    icon: Wrench,
    category: "exterior",
  },
  "Wheel Cleaning": {
    imagePath: "/services/wheel-cleaning.webp",
    description: {
      de: "Bremsstaub-Entfernung und Felgenpolitur für alle Radtypen",
      en: "Brake dust removal and rim polish for all wheel types",
    },
    icon: CircleGauge,
    category: "exterior",
  },
  "Tire Service": {
    imagePath: "/services/tire-service.webp",
    description: {
      de: "Auswuchten, Rotation und Reifendruckoptimierung",
      en: "Balancing, rotation, and tire pressure optimisation",
    },
    icon: Layers,
    category: "exterior",
  },
  "Headlight Polishing": {
    imagePath: "/services/headlight-polishing.webp",
    description: {
      de: "Aufbereitung trüber oder vergilbter Scheinwerfergläser",
      en: "Restoration of cloudy or yellowed headlight lenses",
    },
    icon: Sun,
    category: "exterior",
  },
  "Paint Sealant": {
    imagePath: "/services/paint-sealant.webp",
    description: {
      de: "Keramik- oder Polymer-Lackversiegelung für dauerhaften Schutz",
      en: "Ceramic or polymer paint sealant for long-term protection",
    },
    icon: Droplet,
    category: "exterior",
  },
  "Interior Cleaning": {
    imagePath: "/services/interior-cleaning.webp",
    description: {
      de: "Vollständige Innenreinigung mit Absaugen, Abwischen und Polsterpflege",
      en: "Full interior vacuum, wipe-down and upholstery clean",
    },
    icon: Armchair,
    category: "interior",
  },
  "Starlight Headliner Installation": {
    imagePath: "/services/starlight-headliner.webp",
    description: {
      de: "LED-Glasfaser-Sternenhimmel-Dachhimmelinstallation",
      en: "LED fibre-optic starlight roof lining installation",
    },
    icon: Stars,
    category: "interior",
  },
  "Ambient Lighting": {
    imagePath: "/services/ambient-lighting.webp",
    description: {
      de: "Mehrzonige RGB-Ambientebeleuchtung für den Innenraum",
      en: "Multi-zone RGB ambient interior lighting setup",
    },
    icon: Lightbulb,
    category: "interior",
  },
  "Interior Roof Dyeing": {
    imagePath: "/services/interior-roof-dyeing.webp",
    description: {
      de: "Professionelle Stoff-Färbebehandlung für den Dachhimmel",
      en: "Professional fabric dye treatment for the interior headliner",
    },
    icon: Paintbrush,
    category: "interior",
  },
  "Interior Trim Wrapping": {
    imagePath: "/services/interior-trim-wrapping.webp",
    description: {
      de: "Folierung von Innenraum-Zierleisten und Verkleidungen",
      en: "Vinyl wrap applied to interior trim strips and panels",
    },
    icon: LayoutTemplate,
    category: "interior",
  },
  "Car Wrapping": {
    imagePath: "/services/car-wrapping.webp",
    description: {
      de: "Individuelle Vollfolierung in jeder Farbe und Oberflächenstruktur",
      en: "Custom vinyl wrap in any colour or finish",
    },
    icon: Palette,
    category: "wrapping",
  },
  "Roof Wrapping": {
    imagePath: "/services/roof-wrapping.webp",
    description: {
      de: "Voll- oder Teilfolierung des Dachs in jeder Farbe und Oberfläche",
      en: "Full or partial roof vinyl wrap in any colour or finish",
    },
    icon: PanelTop,
    category: "wrapping",
  },
  "Exterior Trim Wrapping": {
    imagePath: "/services/exterior-trim-wrapping.webp",
    description: {
      de: "Folierung von Chrom- und Kunststoffzierleisten außen",
      en: "Vinyl wrap for exterior chrome and plastic trim pieces",
    },
    icon: Frame,
    category: "wrapping",
  },
  "Body Kit Installation": {
    imagePath: "/services/body-kit.webp",
    description: {
      de: "Montage und Ausrichtung von Front-, Heck- und Seitenschweller-Kits",
      en: "Front, rear and side body kit fitting and alignment",
    },
    icon: Shield,
    category: "wrapping",
  },
  "Brake Caliper Painting": {
    imagePath: "/services/brake-caliper-painting.webp",
    description: {
      de: "Hochtemperatur-Lackierung der Bremssättel",
      en: "High-temperature paint finish on brake calipers",
    },
    icon: Disc,
    category: "wrapping",
  },
  "Rim Painting": {
    imagePath: "/services/rim-painting.webp",
    description: {
      de: "Individuelles Pulverbeschichten oder Lackieren von Alufelgen",
      en: "Custom colour powder coat or spray paint for alloy rims",
    },
    icon: Cog,
    category: "wrapping",
  },
  "Display & CarPlay Installation": {
    imagePath: "/services/display-carplay.webp",
    description: {
      de: "Nachgerüsteter Touchscreen mit Apple CarPlay / Android Auto",
      en: "Aftermarket touchscreen with Apple CarPlay / Android Auto",
    },
    icon: Monitor,
    category: "tech",
  },
  "Digital Cluster Installation": {
    imagePath: "/services/digital-cluster.webp",
    description: {
      de: "Upgrade auf volldigitales Kombiinstrument mit Kalibrierung",
      en: "Full-digital instrument cluster upgrade and calibration",
    },
    icon: Gauge,
    category: "tech",
  },
  "Vehicle Inspection": {
    imagePath: "/services/vehicle-inspection.webp",
    description: {
      de: "Gründliche Mehrpunkt-Sicherheits- und Zustandsprüfung",
      en: "Thorough multi-point safety and condition check",
    },
    icon: ClipboardCheck,
    category: "tech",
  },
  "Car Sales": {
    imagePath: "/services/car-sales.webp",
    description: {
      de: "Premium-Fahrzeuge aus unserem Showroom kaufen und verkaufen",
      en: "Browse and purchase premium vehicles from our showroom",
    },
    icon: Car,
    category: "sales",
  },
  "Accident Report": {
    imagePath: "/services/accident-report.webp",
    description: {
      de: "Professionelle Schadensbeurteilung und Unfallbericht",
      en: "Professional accident damage assessment and report",
    },
    icon: FileWarning,
    category: "assessment",
  },
  "Vehicle Valuation": {
    imagePath: "/services/vehicle-valuation.webp",
    description: {
      de: "Zertifizierte Marktwertbewertung für Ihr Fahrzeug",
      en: "Certified market value appraisal for your vehicle",
    },
    icon: TrendingUp,
    category: "assessment",
  },
  "Diminished Value Assessment": {
    imagePath: "/services/diminished-value.webp",
    description: {
      de: "Fachgutachten über den Wertverlust nach Unfallreparatur",
      en: "Expert evaluation of value loss after accident repair",
    },
    icon: TrendingDown,
    category: "assessment",
  },
  "Salvage Value & Total Loss": {
    imagePath: "/services/salvage-total-loss.webp",
    description: {
      de: "Restwertgutachten für Totalschadenfahrzeuge",
      en: "Residual value assessment for total loss vehicles",
    },
    icon: Flame,
    category: "assessment",
  },
  "Repair Cost Calculation": {
    imagePath: "/services/repair-cost-calculation.webp",
    description: {
      de: "Detaillierte Aufschlüsselung aller Reparaturkosten und Arbeitszeit",
      en: "Detailed breakdown of all repair costs and labour",
    },
    icon: Calculator,
    category: "assessment",
  },
  "Cost Estimate": {
    imagePath: "/services/cost-estimate.webp",
    description: {
      de: "Transparenter schriftlicher Kostenvoranschlag für gewünschte Leistungen",
      en: "Transparent written quote for requested services",
    },
    icon: Receipt,
    category: "assessment",
  },
};
