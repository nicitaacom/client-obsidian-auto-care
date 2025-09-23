// 1. Core business data used across the app (contact, hours, location, rating)
export const businessInfo = {
  name: "Obsidian Auto Care",
  yearsInBusiness: 1, // numeric for easy usage in UI
  yearsOfGuarantee: null, // for example guarantee for ceramic coating
  phone: "+44 795 526 56 63", // 38 41 it's her personal phone so she would like to receive SMS on 22 40
  timezone: "Europe/London",
  email: "info@obsidianautocare.com",
  websiteUrl: "https://obsidianautocare.com",
  logoUrl: "/logo.jpg",
  cta: "Contact us - get response in 2mins",

  // 2. Location / map
  address: {
    street: "Sheffield City Centre",
    city: "Sheffield",
    county: "South Yorkshire",
    postalCode: "S1",
    country: "United Kingdom",
  },
  coordinates: {
    latitude: 53.38297,
    longitude: -1.4659,
  },
  mapUrl:
    "https://www.google.com/maps/place/Obsidian+Auto+Care/@53.3957166,-1.3895480999999998,13.99z/data=!4m16!1m7!3m6!1s0xabe2cdad219f7c07:0xaf6d04c16ca11c!2sObsidian+Auto+Care!8m2!3d53.3957166!4d-1.3895480999999998!16s%2Fg%2F11ckvg1dmb!3m7!1s0xabe2cdad219f7c07:0xaf6d04c16ca11c!8m2!3d53.3957166!4d-1.3895480999999998!9m1!1b1!16s%2Fg%2F11ckvg1dmb?entry=ttu",

  // 3. Hours & service area
  businessHours: {
    monday: { opens: "17:00", closes: "22:00" },
    tuesday: { opens: "00:00", closes: "22:00" },
    wednesday: { opens: "00:00", closes: "22:00" },
    thursday: { opens: "00:00", closes: "23:00" },
    friday: { opens: "00:00", closes: "22:00" },
    saturday: { opens: "06:00", closes: "20:00" },
    sunday: { opens: "06:00", closes: "20:00" },
  },
  areasServed: ["Yorkshire and the Humber"],

  // 4. High-level services (used for meta / schema)
  primaryServices: [
    {
      name: "Machine Polishing",
      includes: [
        "Client chooses 1 stage or 2 stages",
        "Removes light swirls and scratches",
        "Enhances gloss and depth of paint",
        "Prepares surface for protection",
      ],
    },
    {
      name: "Paint Correction",
      includes: [
        "Deeper removal of scratches and swirl marks",
        "Restores true colour and clarity",
        "Machine compounding and refining",
        "Perfects finish before ceramic coating",
      ],
    },
    {
      name: "Ceramic Coating",
      includes: [
        "Surface prepped with polishing and correction",
        "Long-lasting hydrophobic protection",
        "Adds depth, gloss and slickness",
        "Protects from UV, dirt and chemicals",
      ],
    },
    {
      name: "Engine Cleaning",
      includes: [
        "Degreasing of engine bay components",
        "Agitation with brushes for plastics and metals",
        "Safe rinse or steam clean",
        "Drying with air or microfiber",
        "Dressing applied for protection",
      ],
    },
    {
      name: "Full Interior Detailing",
      includes: [
        "Deep vacuum (seats, carpets & boot)",
        "Dashboard, console & plastics cleaned",
        "Leather or fabric seats treated",
        "Glass cleaned inside",
        "Odour neutralisation",
      ],
    },
    {
      name: "Full Exterior Detailing",
      includes: [
        "Pre-wash and safe hand wash",
        "Wheels, arches & tyres deep cleaned",
        "Decontamination (iron & tar removal)",
        "Paint polished and protected",
        "Glass and trim detailed",
      ],
    },
  ],

  // 5. socials & business meta
  yellPagesUrl: "https://www.yell.com/biz/obsidian-autocare-rotherham-10929051//",
  facebookUrl: "https://www.facebook.com/people/Obsidian-Autocare/61567347456713/#",
  instagramUrl: "https://www.instagram.com/obsidian_autocare/",
  foundingYear: 2025,
  founders: ["Kallin"],
  priceRange: "££",
  guarantee: "Satisfaction Guarantee - If you’re not 100% satisfied, I’ll make it right before you leave.",

  // 6. Rating info (numbers, ready for structured data)
  rating: {
    average: 5,
    count: 25,
    googleMaps: 5,
    yelp: 5,
    max: 5,
  },
}
