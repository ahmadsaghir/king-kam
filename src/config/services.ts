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
  Wind,
  ChevronsUp,
  Camera,
  ScanEye,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory = "exterior" | "interior" | "wrapping" | "tech" | "sales" | "assessment";

export interface ServiceConfig {
  imagePath: string;
  description: { de: string; en: string };
  icon: LucideIcon;
  category: ServiceCategory;
  price?: { amount: number; unit: "fixed" | "from"; currency: string };
  label?: { de: string; en: string };
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
    imagePath: "/service-images/car-washing.webp",
    description: {
      de: "Vollständige Außenwäsche mit Premium-Shampoo und Spülung",
      en: "Full exterior wash with premium shampoo and rinse",
    },
    icon: Droplets,
    category: "exterior",
    label: { de: "ab 15€", en: "from €15" },
  },
  "Auto Detailing": {
    imagePath: "/service-images/auto-detailing.webp",
    description: {
      de: "Umfassende Lack- und Oberflächenaufbereitung",
      en: "Comprehensive paint and surface restoration treatment",
    },
    icon: Sparkles,
    category: "exterior",
    label: { de: "ab €50", en: "from €50" },
  },
  "Waxing & Polishing": {
    imagePath: "/service-images/waxing-polishing.webp",
    description: {
      de: "Tiefenglanz-Wachsierung und maschinelle Politur für Showroom-Glanz",
      en: "Deep gloss wax and machine polishing for showroom shine",
    },
    icon: CircleDashed,
    category: "exterior",
    price: { amount: 150, unit: "from", currency: "€" },
  },
  "Scratch Removal": {
    imagePath: "/service-images/scratch-removal.webp",
    description: {
      de: "Professionelle Lackkorrektur für leichte Kratzer und Schleifringe",
      en: "Professional paint correction for light scratches and swirls",
    },
    icon: Wrench,
    category: "exterior",
    price: { amount: 50, unit: "from", currency: "€" },
  },
  "Wheel Cleaning": {
    imagePath: "/service-images/wheel-cleaning.webp",
    description: {
      de: "Bremsstaub-Entfernung und Felgenpolitur für alle Radtypen",
      en: "Brake dust removal and rim polish for all wheel types",
    },
    icon: CircleGauge,
    category: "exterior",
    price: { amount: 50, unit: "from", currency: "€" },
  },
  "Tire Service": {
    imagePath: "/service-images/tire-service.webp",
    description: {
      de: "Auswuchten, Rotation und Reifendruckoptimierung",
      en: "Balancing, rotation, and tire pressure optimisation",
    },
    icon: Layers,
    category: "exterior",
    price: { amount: 100, unit: "fixed", currency: "€" },
  },
  "Headlight Polishing": {
    imagePath: "/service-images/headlight-polishing.webp",
    description: {
      de: "Aufbereitung trüber oder vergilbter Scheinwerfergläser",
      en: "Restoration of cloudy or yellowed headlight lenses",
    },
    icon: Sun,
    category: "exterior",
    price: { amount: 50, unit: "fixed", currency: "€" },
  },
  "Paint Sealant": {
    imagePath: "/service-images/paint-sealant.webp",
    description: {
      de: "Keramik- oder Polymer-Lackversiegelung für dauerhaften Schutz",
      en: "Ceramic or polymer paint sealant for long-term protection",
    },
    icon: Droplet,
    category: "exterior",
    price: { amount: 65, unit: "fixed", currency: "€" },
  },
  "Interior Cleaning": {
    imagePath: "/service-images/interior-cleaning.webp",
    description: {
      de: "Vollständige Innenreinigung mit Absaugen, Abwischen und Polsterpflege",
      en: "Full interior vacuum, wipe-down and upholstery clean",
    },
    icon: Armchair,
    category: "interior",
    price: { amount: 50, unit: "from", currency: "€" },
  },
  "Starlight Headliner Installation": {
    imagePath: "/service-images/starlight-headliner.webp",
    description: {
      de: "LED-Glasfaser-Sternenhimmel-Dachhimmelinstallation",
      en: "LED fibre-optic starlight roof lining installation",
    },
    icon: Stars,
    category: "interior",
    label: { de: "1€ Pro Stern | ab 400 Sterne", en: "€1 per star | from 400 stars" },
  },
  "Ambient Lighting": {
    imagePath: "/service-images/ambient-lighting.webp",
    description: {
      de: "Mehrzonige RGB-Ambientebeleuchtung für den Innenraum",
      en: "Multi-zone RGB ambient interior lighting setup",
    },
    icon: Lightbulb,
    category: "interior",
    price: { amount: 400, unit: "from", currency: "€" },
  },
  "Interior Roof Dyeing": {
    imagePath: "/service-images/interior-roof-dyeing.webp",
    description: {
      de: "Professionelle Stoff-Färbebehandlung für den Dachhimmel",
      en: "Professional fabric dye treatment for the interior headliner",
    },
    icon: Paintbrush,
    category: "interior",
    price: { amount: 300, unit: "from", currency: "€" },
  },
  "Interior Trim Wrapping": {
    imagePath: "/service-images/interior-trim-wrapping.webp",
    description: {
      de: "Folierung von Innenraum-Zierleisten und Verkleidungen",
      en: "Vinyl wrap applied to interior trim strips and panels",
    },
    icon: LayoutTemplate,
    category: "interior",
    price: { amount: 150, unit: "from", currency: "€" },
  },
  "Car Wrapping": {
    imagePath: "/service-images/car-wrapping.webp",
    description: {
      de: "Individuelle Vollfolierung in jeder Farbe und Oberflächenstruktur",
      en: "Custom vinyl wrap in any colour or finish",
    },
    icon: Palette,
    category: "wrapping",
    price: { amount: 2000, unit: "from", currency: "€" },
  },
  "Roof Wrapping": {
    imagePath: "/service-images/roof-wrapping.webp",
    description: {
      de: "Voll- oder Teilfolierung des Dachs in jeder Farbe und Oberfläche",
      en: "Full or partial roof vinyl wrap in any colour or finish",
    },
    icon: PanelTop,
    category: "wrapping",
    price: { amount: 200, unit: "from", currency: "€" },
  },
  "Exterior Trim Wrapping": {
    imagePath: "/service-images/exterior-trim-wrapping.webp",
    description: {
      de: "Folierung von Chrom- und Kunststoffzierleisten außen",
      en: "Vinyl wrap for exterior chrome and plastic trim pieces",
    },
    icon: Frame,
    category: "wrapping",
    price: { amount: 150, unit: "from", currency: "€" },
  },
  "Body Kit Installation": {
    imagePath: "/service-images/body-kit.webp",
    description: {
      de: "Montage und Ausrichtung von Front-, Heck- und Seitenschweller-Kits",
      en: "Front, rear and side body kit fitting and alignment",
    },
    icon: Shield,
    category: "wrapping",
  },
  "Brake Caliper Painting": {
    imagePath: "/service-images/brake-caliper-painting.webp",
    description: {
      de: "Hochtemperatur-Lackierung der Bremssättel",
      en: "High-temperature paint finish on brake calipers",
    },
    icon: Disc,
    category: "wrapping",
    price: { amount: 100, unit: "fixed", currency: "€" },
  },
  "Rim Painting": {
    imagePath: "/service-images/rim-painting.webp",
    description: {
      de: "Individuelles Pulverbeschichten oder Lackieren von Alufelgen",
      en: "Custom colour powder coat or spray paint for alloy rims",
    },
    icon: Cog,
    category: "wrapping",
    price: { amount: 150, unit: "from", currency: "€" },
  },
  "Display & CarPlay Installation": {
    imagePath: "/service-images/display-carplay.webp",
    description: {
      de: "Nachgerüsteter Touchscreen mit Apple CarPlay / Android Auto",
      en: "Aftermarket touchscreen with Apple CarPlay / Android Auto",
    },
    icon: Monitor,
    category: "tech",
    price: { amount: 150, unit: "from", currency: "€" },
  },
  "Digital Cluster Installation": {
    imagePath: "/service-images/digital-cluster.webp",
    description: {
      de: "Upgrade auf volldigitales Kombiinstrument mit Kalibrierung",
      en: "Full-digital instrument cluster upgrade and calibration",
    },
    icon: Gauge,
    category: "tech",
    price: { amount: 500, unit: "from", currency: "€" },
  },
  "Vehicle Inspection": {
    imagePath: "/service-images/vehicle-inspection.webp",
    description: {
      de: "Gründliche Mehrpunkt-Sicherheits- und Zustandsprüfung",
      en: "Thorough multi-point safety and condition check",
    },
    icon: ClipboardCheck,
    category: "tech",
    price: { amount: 50, unit: "from", currency: "€" },
  },
  "Car Sales": {
    imagePath: "/service-images/car-sales.webp",
    description: {
      de: "Premium-Fahrzeuge aus unserem Showroom kaufen und verkaufen",
      en: "Browse and purchase premium vehicles from our showroom",
    },
    icon: Car,
    category: "sales",
  },
  "Accident Report": {
    imagePath: "/service-images/accident-report.webp",
    description: {
      de: "Professionelle Schadensbeurteilung und Unfallbericht",
      en: "Professional accident damage assessment and report",
    },
    icon: FileWarning,
    category: "assessment",
  },
  "Vehicle Valuation": {
    imagePath: "/service-images/vehicle-valuation.webp",
    description: {
      de: "Zertifizierte Marktwertbewertung für Ihr Fahrzeug",
      en: "Certified market value appraisal for your vehicle",
    },
    icon: TrendingUp,
    category: "assessment",
  },
  "Diminished Value Assessment": {
    imagePath: "/service-images/diminished-value.webp",
    description: {
      de: "Fachgutachten über den Wertverlust nach Unfallreparatur",
      en: "Expert evaluation of value loss after accident repair",
    },
    icon: TrendingDown,
    category: "assessment",
  },
  "Salvage Value & Total Loss": {
    imagePath: "/service-images/salvage-total-loss.webp",
    description: {
      de: "Restwertgutachten für Totalschadenfahrzeuge",
      en: "Residual value assessment for total loss vehicles",
    },
    icon: Flame,
    category: "assessment",
  },
  "Repair Cost Calculation": {
    imagePath: "/service-images/repair-cost-calculation.webp",
    description: {
      de: "Detaillierte Aufschlüsselung aller Reparaturkosten und Arbeitszeit",
      en: "Detailed breakdown of all repair costs and labour",
    },
    icon: Calculator,
    category: "assessment",
  },
  "Cost Estimate": {
    imagePath: "/service-images/cost-estimate.webp",
    description: {
      de: "Transparenter schriftlicher Kostenvoranschlag für gewünschte Leistungen",
      en: "Transparent written quote for requested services",
    },
    icon: Receipt,
    category: "assessment",
  },
  "Engine Wash": {
    imagePath: "/service-images/engine-wash.png",
    description: {
      de: "Professionelle Motorwäsche mit Hochdruckreinigung und Entfetter",
      en: "Professional engine bay cleaning with high-pressure wash and degreaser",
    },
    icon: Wind,
    category: "exterior",
    price: { amount: 85, unit: "from", currency: "€" },
  },
  "Car Lift Rental": {
    imagePath: "/service-images/car-lift-rental.png",
    description: {
      de: "Hebebühnenvermietung inklusive verschiedener Werkzeuge für DIY-Arbeiten",
      en: "Car lift rental including various tools for DIY maintenance work",
    },
    icon: ChevronsUp,
    category: "tech",
    label: { de: "ab 60 € / Stunde", en: "from €60 / hour" },
  },
  "Dash Cam Installation": {
    imagePath: "/service-images/dashcam-installation.png",
    description: {
      de: "Professionelle Dashcam-Montage mit sauberer Kabelverlegung",
      en: "Professional dash cam fitting with clean cable routing",
    },
    icon: Camera,
    category: "tech",
    price: { amount: 100, unit: "from", currency: "€" },
  },
  "Backup Camera Installation": {
    imagePath: "/service-images/backup-camera-installation.png",
    description: {
      de: "Einbau einer Rückfahrkamera mit Display-Integration",
      en: "Backup camera installation with display integration",
    },
    icon: ScanEye,
    category: "tech",
    price: { amount: 75, unit: "from", currency: "€" },
  },
};