export type Language = "de" | "en";

export const translations = {
  nav: {
    services: { de: "Leistungen", en: "Services" },
    offers: { de: "Angebote", en: "Offers" },
    about: { de: "Über uns", en: "About Us" },
    contact: { de: "Kontakt", en: "Contact Us" },
  },
  hero: {
    badge: {
      de: "The King Kam Autoaufbereitung",
      en: "The King Kam Auto Detailing",
    },
    headline1: { de: "Ihr Auto", en: "Your Car" },
    headline2: {
      de: "Verdient Royales Treatment",
      en: "Deserves Royalty",
    },
    subtext: {
      de: "Professionelle Aufbereitung in Bad Pyrmont",
      en: "Professional Detailing in Bad Pyrmont",
    },
    cta: { de: "Via WhatsApp buchen", en: "Book via WhatsApp" },
    perfectionBadge: { de: "Perfektion garantiert", en: "Perfection Guaranteed" },
  },
  services: [
    {
      title: { de: "Außenwäsche", en: "Exterior Wash" },
      desc: { de: "Premium Handwäsche & Trocknung", en: "Premium hand wash & dry" },
    },
    {
      title: { de: "Aufbereitung", en: "Auto Detailing" },
      desc: { de: "Tiefenreinigung innen & außen", en: "Deep interior & exterior clean" },
    },
    {
      title: { de: "Autofolierung", en: "Car Wrapping" },
      desc: { de: "Individuelle Farbfolierungen", en: "Custom vinyl color changes" },
    },
    {
      title: { de: "Kratzerentfernung", en: "Scratch Removal" },
      desc: { de: "Lackkorrektur & Politur", en: "Paint correction & polishing" },
    },
  ],
  offers: {
    sectionLabel: { de: "Sonderangebote", en: "Special Offers" },
    sectionTitle: { de: "Aktuelle Aktionen", en: "Current Promotions" },
    included: { de: "Enthalten", en: "Included" },
    optionalExtras: { de: "Optionale Extras", en: "Optional Extras" },
    validVehicleTypes: { de: "Gültige Fahrzeugtypen", en: "Valid Vehicle Types" },
    bookNow: { de: "Jetzt buchen", en: "Book Now" },
    popular: { de: "Beliebt", en: "Popular" },
    availableFrom: {
      de: "Verfügbar ab 1. April 2026",
      en: "Available from April 1, 2026",
    },
    card1: {
      title: {
        de: "Innen- und Außenreinigung komplett",
        en: "Interior & Exterior Cleaning Package",
      },
      included: {
        de: [
          "Komplette Außenwäsche",
          "Felgen- und Reifenreinigung",
          "Gründliche Innenreinigung (Sitze & Boden)",
          "Staubsaugen",
          "Reinigung von Armaturenbrett & Kunststoffen",
          "Fahrzeugduft / Lufterfrischer",
        ],
        en: [
          "Complete exterior wash",
          "Wheel and tire cleaning",
          "Thorough interior cleaning (seats & floor)",
          "Vacuuming",
          "Cleaning of dashboard & plastics",
          "Car scenting / Air freshener",
        ],
      },
      extras: {
        de: [
          "Entfernung hartnäckiger Flecken",
          "Tiefenreinigung mit Dampf",
          "Professionelle Lackpolitur",
          "Lederpflege",
        ],
        en: [
          "Removal of stubborn stains",
          "Deep steam cleaning",
          "Professional paint polishing",
          "Leather conditioning",
        ],
      },
    },
    card2: {
      title: {
        de: "Premium 3-Schicht-Politur",
        en: "Premium 3-Layer Car Polishing",
      },
      included: {
        de: ["Kratzer entfernen", "Tiefenglanz", "Hochglanzfinish"],
        en: ["Remove scratches", "Deep shine", "High-gloss finish"],
      },
      vehicleTypes: {
        de: ["Kombi", "Limousine", "Coupé"],
        en: ["Station Wagon", "Sedan", "Coupe"],
      },
    },
    card3: {
      title: {
        de: "Komplett-Folierung Special",
        en: "Complete Car Wrapping Special",
      },
      included: {
        de: ["Komplettfolierung"],
        en: ["Full Car Wrap"],
      },
      vehicleTypes: {
        de: ["Kombi", "Limousine", "Coupé"],
        en: ["Station Wagon", "Sedan", "Coupe"],
      },
    },
  },
  loyalty: {
    headline: {
      de: "3x Waschen, 4x gratis",
      en: "Get 3 Washes, 4th is FREE",
    },
    subtext: {
      de: "Unsere Art, treue Kunden zu belohnen.",
      en: "Our way of rewarding loyal customers.",
    },
  },
  contact: {
    title: { de: "Kontakt", en: "Contact" },
    address: { de: "Adresse", en: "Address" },
    phone: { de: "Telefon", en: "Phone" },
  },
  footer: {
    tagline: {
      de: "The King Kam Autoaufbereitung. Jedes Auto wie Royalty behandelt – mit Präzision, Power und Prestige.",
      en: "The King Kam Autoaufbereitung. Treating every car like royalty with precision, power, and prestige.",
    },
    rights: { de: "Alle Rechte vorbehalten.", en: "All rights reserved." },
    detailing: {
      de: "Premium Fahrzeugaufbereitung",
      en: "Premium Auto Detailing",
    },
  },
  servicesPage: {
    title: { de: "Unsere Leistungen", en: "Our Services" },
    subtitle: {
      de: "Alles rund ums Fahrzeug – professionell, präzise und mit Leidenschaft.",
      en: "Everything for your vehicle – professional, precise, and with passion.",
    },
    viewAll: { de: "Alle Leistungen ansehen →", en: "View All Services →" },
    bookNow: { de: "Jetzt buchen", en: "Book Now" },
  },
  booking: {
    stepOf: { de: "Schritt", en: "Step" },
    of: { de: "von", en: "of" },
    stepTitles: {
      de: [
        "Ihr Name",
        "Automarke & Modell",
        "Karosserietyp",
        "Anzahl der Sitze",
        "Haben Sie ein Angebot im Sinn?",
        "Leistungen auswählen",
        "Datum & Uhrzeit",
        "Buchungsübersicht",
      ],
      en: [
        "Your Name",
        "Car Brand & Model",
        "Body Type",
        "Number of Seats",
        "Do you have an offer in mind?",
        "Select Services",
        "Preferred Date & Time",
        "Booking Summary",
      ],
    },
    fullName: { de: "Vollständiger Name", en: "Full Name" },
    carBrand: { de: "Automarke", en: "Car Brand" },
    carModel: { de: "Automodell", en: "Car Model" },
    bodyType: { de: "Karosserietyp auswählen", en: "Select Body Type" },
    seats: { de: "Anzahl der Sitze", en: "Number of Seats" },
    selectServices: {
      de: "Einen oder mehrere Dienste auswählen",
      en: "Select one or more services",
    },
    servicesSelected: { de: "Dienst(e) ausgewählt", en: "service(s) selected" },
    preferredDate: { de: "Wunschdatum", en: "Preferred Date" },
    preferredTime: { de: "Wunschuhrzeit", en: "Preferred Time" },
    selected: { de: "Ausgewählt", en: "Selected" },
    hour: { de: "Stunde", en: "Hour" },
    minute: { de: "Minute", en: "Minute" },
    reviewDetails: {
      de: "Buchungsdetails überprüfen",
      en: "Review your booking details",
    },
    summaryLabels: {
      name: { de: "Name", en: "Name" },
      car: { de: "Auto", en: "Car" },
      bodyType: { de: "Karosserietyp", en: "Body Type" },
      seats: { de: "Sitze", en: "Seats" },
      date: { de: "Datum", en: "Date" },
      time: { de: "Uhrzeit", en: "Time" },
      services: { de: "Leistungen", en: "Services" },
      offer: { de: "Angebot", en: "Offer" },
    },
    offerNoOffer: {
      de: "Kein Angebot, ich wähle manuell",
      en: "No offer, I'll choose my services manually",
    },
    offerPrices: {
      de: ["ab €50", "€120", "€1.599"],
      en: ["from €50", "€120", "€1,599"],
    },
    back: { de: "Zurück", en: "Back" },
    next: { de: "Weiter", en: "Next" },
    sendWhatsApp: { de: "Via WhatsApp senden", en: "Send via WhatsApp" },
    placeholderName: { de: "z.B. Max Mustermann", en: "e.g. Max Mustermann" },
    placeholderBrand: { de: "z.B. BMW", en: "e.g. BMW" },
    placeholderModel: { de: "z.B. 4er Serie", en: "e.g. 4 Series" },
    from: { de: "ab", en: "from" },
    services: {
      de: [
        "Außenwäsche",
        "Aufbereitung",
        "Wachsen & Polieren",
        "Kratzerentfernung",
        "Innenreinigung",
        "Felgenreinigung",
        "Reifenservice",
        "Autofolierung",
        "Fahrzeuginspektion",
        "Autoverkauf",
        "Sternenhimmel-Installation",
        "Ambientebeleuchtung",
        "Display & CarPlay Installation",
        "Digital-Tacho-Installation",
        "Bodykit-Installation",
        "Dachfolieren",
        "Innenraum Leisten folieren",
        "Außenleisten folieren",
        "Innenraum Dach färben",
        "Bremsen lackieren",
        "Felgen lackieren",
        "Scheinwerfer polieren",
        "Versiegelung",
      ],
      en: [
        "Car Washing",
        "Auto Detailing",
        "Waxing & Polishing",
        "Scratch Removal",
        "Interior Cleaning",
        "Wheel Cleaning",
        "Tire Service",
        "Car Wrapping",
        "Vehicle Inspection",
        "Car Sales",
        "Starlight Headliner Installation",
        "Ambient Lighting",
        "Display & CarPlay Installation",
        "Digital Cluster Installation",
        "Body Kit Installation",
        "Roof Wrapping",
        "Interior Trim Wrapping",
        "Exterior Trim Wrapping",
        "Interior Roof Dyeing",
        "Brake Caliper Painting",
        "Rim Painting",
        "Headlight Polishing",
        "Paint Sealant",
      ],
    },
    extraServices: {
      label: { de: "Extraleistungen", en: "Extra Services" },
      de: [
        "Unfallgutachten",
        "Fahrzeugbewertung",
        "Merkantiler Minderwert",
        "Restwert & Totalschaden",
        "Reparaturkostenkalkulation",
        "Kostenvoranschlag",
      ],
      en: [
        "Accident Report",
        "Vehicle Valuation",
        "Diminished Value Assessment",
        "Salvage Value & Total Loss",
        "Repair Cost Calculation",
        "Cost Estimate",
      ],
    },
    bodyTypes: {
      de: ["Limousine", "SUV", "Coupé", "Schrägheck", "Van", "Cabrio"],
      en: ["Sedan", "SUV", "Coupe", "Hatchback", "Van", "Convertible"],
    },
    whatsappMessage: {
      de: (data: {
        name: string;
        carBrand: string;
        carModel: string;
        bodyType: string;
        seats: string;
        offer: string | null;
        services: string[];
        date: string;
        time: string;
      }) =>
        [
          `Hallo! Ich möchte einen Termin buchen.`,
          ``,
          `Name: ${data.name}`,
          `Auto: ${data.carBrand} ${data.carModel}`,
          `Karosserietyp: ${data.bodyType}`,
          `Sitze: ${data.seats}`,
          ...(data.offer ? [`Angebot: ${data.offer}`] : []),
          `Leistungen:`,
          ...data.services.map((s, i) => `${i + 1}. ${s}.`),
          `Datum: ${data.date}`,
          `Uhrzeit: ${data.time}`,
        ].join("\n"),
      en: (data: {
        name: string;
        carBrand: string;
        carModel: string;
        bodyType: string;
        seats: string;
        offer: string | null;
        services: string[];
        date: string;
        time: string;
      }) =>
        [
          `Hello! I'd like to book a service.`,
          ``,
          `Name: ${data.name}`,
          `Car: ${data.carBrand} ${data.carModel}`,
          `Body Type: ${data.bodyType}`,
          `Seats: ${data.seats}`,
          ...(data.offer ? [`Offer: ${data.offer}`] : []),
          `Services:`,
          ...data.services.map((s, i) => `${i + 1}. ${s}.`),
          `Date: ${data.date}`,
          `Time: ${data.time}`,
        ].join("\n"),
    },
  },
};

export type Translations = typeof translations;

export function t<T>(obj: { de: T; en: T }, lang: Language): T {
  return obj[lang];
}
