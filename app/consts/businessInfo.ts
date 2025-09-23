// 1. Core business data used across the app (contact, hours, location, rating)
export const businessInfo = {
  name: "Obsidian Auto Care",
  yearsInBusiness: 1, // numeric for easy usage in UI
  yearsOfGuarantee: null, // satisfaction guarantee in years
  phone: "+44 795 526 56 63", // 38 41 it's her personal phone so she would like to receive SMS on 22 40
  timezone: "Europe/London",
  email: "info@obsidianautocare.com",
  websiteUrl: "https://obsidianautocare.com",
  logoUrl: "/logo.jpg",
  cta: "Contact us - get response in 2mins",

  // 2. Location / map
  address: {
    street: "Pasture View, Kingswood",
    city: "Hull",
    county: "East Riding of Yorkshire",
    postalCode: "HU7 3AH",
    country: "United Kingdom",
  },
  coordinates: {
    latitude: 53.799588,
    longitude: -0.347902,
  },
  mapUrl:
    "https://www.google.com/maps/place/Hydrowax+Mobile+Valeting/@53.8742525,-0.4773261,13.99z/data=!4m16!1m7!3m6!1s0xa18c5587c123c57d:0x8c5c0eaee3e2766b!2sHydrowax+Mobile+Valeting!8m2!3d53.8742525!4d-0.4773261!16s%2Fg%2F11ckvg1dmb!3m7!1s0xa18c5587c123c57d:0x8c5c0eaee3e2766b!8m2!3d53.8742525!4d-0.4773261!9m1!1b1!16s%2Fg%2F11ckvg1dmb?entry=ttu",

  // 3. Hours & service area
  businessHours: {
    monday: { opens: "00:00", closes: "23:59" },
    tuesday: { opens: "00:00", closes: "23:59" },
    wednesday: { opens: "00:00", closes: "23:59" },
    thursday: { opens: "00:00", closes: "23:59" },
    friday: { opens: "00:00", closes: "23:59" },
    saturday: { opens: "00:00", closes: "23:59" },
    sunday: { opens: "00:00", closes: "23:59" },
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
