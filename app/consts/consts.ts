// 1. UI constants that reference businessInfo to avoid duplication
import { businessInfo } from "./businessInfo"

export const consts = {
  // 1. small derived values for UI (no duplicates — derive from businessInfo)
  yoe: businessInfo.yearsInBusiness,
  yog: businessInfo.yearsOfGuarantee,
  notificationBarOffer1: `Satisfaction guarantee${businessInfo.yearsOfGuarantee ? `${businessInfo.yearsOfGuarantee} — year${businessInfo.yearsOfGuarantee > 1 ? "s" : ""}` : ""}`,
  notificationBarOffer2: businessInfo.cta,

  // 2. map + socials (re-using references is OK)
  mapUrl: businessInfo.mapUrl,
  social: { facebook: businessInfo.facebookUrl, instagram: businessInfo.instagramUrl },

  // 3. Services (images + labels) for listing cards / grid
  ourServices: [
    { imgUrl: "/services/img-1.jpg", serviceName: "Machine Polishing" },
    { imgUrl: "/services/img-2.jpg", serviceName: "Paint Correction" },
    { imgUrl: "/services/img-3.jpg", serviceName: "Full Exterior Detailing" },
    { imgUrl: "/services/img-4.jpg", serviceName: "Engine cleaning" },
    { imgUrl: "/services/img-5.jpg", serviceName: "Ceramic Coating" },
    { imgUrl: "/services/img-6.jpg", serviceName: "Full Interior Detailing" },
  ],

  // 4. Reviews (UI-ready)
  reviews: [
    {
      usrAvatarUrl: "/reviews/user-1.png",
      username: "Addi",
      date: "12.04.2025",
      reviewMessage:
        "Can't recommend Obsidian enough! Cody is so large and polite and did a fantastic job at getting my 9 year old car to look completely brand new again! The price was great for how much detail and care went into the clean and I will definitely be back in the future.",
      amountOfStars: 5,
    },
    {
      usrAvatarUrl: "/reviews/user-2.png",
      username: "Nichola Hamblett",
      date: "05.01.2025",
      reviewMessage:
        "My red JCW looks lush. I can’t stop looking at her. Ceramic coating finish after an inside and out valet has restored her mirror shine paintwork, the alloys and tyres look brand new and inside looks like she just rolled out of the factory.  Money well spent, highly recommended and will book again. Thank you Cody - very happy customer",
      amountOfStars: 5,
    },
    {
      usrAvatarUrl: "/reviews/user-3.png",
      username: "Nigel Mercer",
      date: "19.03.2025",
      reviewMessage:
        "Lads did a great job. Came recommend by a neighbour who has them regularly. Very punctual and polite and did a thoroughly professional job. Would highly recommend them and will definitely be using them on both cars again.",
      amountOfStars: 5,
    },
    {
      usrAvatarUrl: "/reviews/user-4.png",
      username: "Brooke Foster",
      date: "13.06.2025",
      reviewMessage:
        "Can’t thank the guys enough for making my 12 year old clio look sparkly and new again, lovely chaps and great communication! Couldn’t recommend enough! Thanks guys ❤️",
      amountOfStars: 5,
    },
    {
      usrAvatarUrl: "/reviews/user-5.png",
      username: "Ismail Kartout",
      date: "15.05.2025",
      reviewMessage: "Arrived on time and did a good job can’t complain.",
      amountOfStars: 5,
    },
    {
      usrAvatarUrl: "/reviews/user-6.png",
      username: "Christine Hodgkinson",
      date: "25.07.2025",
      reviewMessage:
        "A very professional job!  I contacted them and received a response very quickly.  Two very approachable young men who couldn't do enough to ensure I received the best service.  Inside and out was spotless and I couldn't be happier with the end result.  In fact I have booked my other car in for a full valet on sunday!  I would highly recommend these two as they start out on their new business together.",
      amountOfStars: 5,
    },
    {
      usrAvatarUrl: "/reviews/user-7.png",
      username: "Alex Wood",
      date: "20.12.2024",
      reviewMessage:
        "Excellent service and very professional! They did a very thorough job, and my car was left spotless inside and out. Will 100 percent come here in the future, and I can’t recommend them enough.",
      amountOfStars: 5,
    },
    {
      usrAvatarUrl: "/reviews/user-8.png",
      username: "Mel Stubbs",
      date: "25.12.2024",
      reviewMessage: `I cannot recommend Obsidian Auto Care enough!
My car has never looked so good as when they had finished with it.
Fabulous service, no hesitation in recommending them.`,
      amountOfStars: 5,
    },
  ],

  // 5. How-we-work tabs (flow steps used on services pages)
  howWeWorkTabs: [
    {
      text: "Full Valet",
      iconSrc: "/how-do-we-work/tabs/magic.png",
      steps: [
        {
          iconSrc: "/how-do-we-work/check.png",
          title: "Initial Check",
          description: "We inspect your vehicle and note areas needing special attention.",
        },
        {
          iconSrc: "/how-do-we-work/exterior-wash.png",
          title: "Exterior Wash & Wax",
          description: "Safe exterior wash including wheels, arches, and tyre dressing.",
        },
        {
          iconSrc: "/how-do-we-work/interior-detail.png",
          title: "Interior Clean",
          description: "Vacuum seats, carpets, and boot; clean dashboard & console.",
        },
        {
          iconSrc: "/how-do-we-work/polish-icon.png",
          title: "Light Polish & Finish",
          description: "Polish paintwork lightly and dress trims for a showroom look.",
        },
        {
          iconSrc: "/how-do-we-work/100.png",
          title: "Final Walkthrough",
          description: "We review the valet with you to ensure 100% satisfaction.",
        },
      ],
    },
    {
      text: "Leather Treatment",
      iconSrc: "/how-do-we-work/tabs/interior-detail.png",
      steps: [
        {
          iconSrc: "/how-do-we-work/vacuum.png",
          title: "Leather Clean",
          description: "Deep clean leather surfaces to remove dirt, oils, and stains.",
        },
        {
          iconSrc: "/how-do-we-work/shampoo.png",
          title: "Conditioning",
          description: "Apply high-quality conditioner to keep leather soft and supple.",
        },
        {
          iconSrc: "/how-do-we-work/streeing-wheel.png",
          title: "Protection",
          description: "UV and anti-crack protection applied to prolong leather life.",
        },
        {
          iconSrc: "/how-do-we-work/vents.png",
          title: "Matte Finish",
          description: "Restore factory finish without a shiny or greasy look.",
        },
        {
          iconSrc: "/how-do-we-work/perfection.png",
          title: "Final Check",
          description: "Inspect leather surfaces and ensure perfect treatment results.",
        },
      ],
    },
    {
      text: "Engine Bay Cleaning",
      iconSrc: "/how-do-we-work/tabs/engine.png",
      steps: [
        {
          iconSrc: "/how-do-we-work/check.png",
          title: "Initial Inspection",
          description: "Assess engine bay for sensitive components and areas needing attention.",
        },
        {
          iconSrc: "/how-do-we-work/exterior-wash.png",
          title: "Degreasing",
          description: "Apply safe degreaser to lift oil, grime, and road dirt.",
        },
        {
          iconSrc: "/how-do-we-work/interior-detail.png",
          title: "Brushing & Agitation",
          description: "Brush tight areas, hoses, plastics, and metal parts carefully.",
        },
        {
          iconSrc: "/how-do-we-work/polish-icon.png",
          title: "Rinse & Dry",
          description: "Low-pressure rinse or steam clean followed by drying with air/microfiber.",
        },
        {
          iconSrc: "/how-do-we-work/100.png",
          title: "Final Dressing",
          description: "Apply rubber & plastic dressing for a clean, protected finish.",
        },
      ],
    },
  ],
}
