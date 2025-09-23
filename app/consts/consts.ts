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
      text: "Machine Polishing",
      iconSrc: "/how-do-we-work/polish-icon.png",
      steps: [
        {
          iconSrc: "/how-do-we-work/check.png",
          title: "Inspection",
          description: "Assess paintwork condition and choose 1 or 2 stage polish.",
        },
        {
          iconSrc: "/how-do-we-work/polish-icon.png",
          title: "Polishing",
          description: "Remove light swirls and scratches, refine surface clarity.",
        },
        {
          iconSrc: "/how-do-we-work/finish.png",
          title: "Gloss Enhancement",
          description: "Enhance depth, gloss, and paint reflection.",
        },
        {
          iconSrc: "/how-do-we-work/shield.png",
          title: "Protection",
          description: "Prepare surface for wax, sealant, or ceramic coating.",
        },
        {
          iconSrc: "/how-do-we-work/perfection.png",
          title: "Final Check",
          description: "Ensure finish is flawless across all panels.",
        },
      ],
    },
    {
      text: "Paint Correction",
      iconSrc: "/how-do-we-work/paint-correction.png",
      steps: [
        {
          iconSrc: "/how-do-we-work/check.png",
          title: "Assessment",
          description: "Identify deeper defects, scratches, and swirl marks.",
        },
        {
          iconSrc: "/how-do-we-work/decontamination.png",
          title: "Surface Prep",
          description: "Decontaminate paint for a clean correction base.",
        },
        {
          iconSrc: "/how-do-we-work/polish-icon.png",
          title: "Compounding",
          description: "Use machine compounds to remove scratches and defects.",
        },
        {
          iconSrc: "/how-do-we-work/finish.png",
          title: "Refinement",
          description: "Polish to restore full colour depth and clarity.",
        },
        {
          iconSrc: "/how-do-we-work/perfection.png",
          title: "Final Inspection",
          description: "Check corrected panels before moving to coating.",
        },
      ],
    },
    {
      text: "Ceramic Coating",
      iconSrc: "/how-do-we-work/tabs/ceramic-coating-icon.png",
      steps: [
        {
          iconSrc: "/how-do-we-work/check.png",
          title: "Preparation",
          description: "Ensure surface is polished and corrected beforehand.",
        },
        {
          iconSrc: "/how-do-we-work/shampoo.png",
          title: "Panel Wipe",
          description: "Remove oils and residues for coating adhesion.",
        },
        {
          iconSrc: "/how-do-we-work/shield.png",
          title: "Application",
          description: "Apply ceramic coating evenly across all panels.",
        },
        {
          iconSrc: "/how-do-we-work/time.png",
          title: "Curing",
          description: "Allow coating to bond and harden properly.",
        },
        {
          iconSrc: "/how-do-we-work/perfection.png",
          title: "Final Review",
          description: "Inspect gloss, slickness, and protection coverage.",
        },
      ],
    },
    {
      text: "Engine Cleaning",
      iconSrc: "/how-do-we-work/tabs/engine.png",
      steps: [
        {
          iconSrc: "/how-do-we-work/check.png",
          title: "Inspection",
          description: "Check engine bay and cover sensitive components.",
        },
        {
          iconSrc: "/how-do-we-work/shampoo.png",
          title: "Degreasing",
          description: "Apply degreaser to remove oil, grime, and dirt.",
        },
        {
          iconSrc: "/how-do-we-work/interior-detail.png",
          title: "Agitation",
          description: "Brush plastics, hoses, and tight engine areas.",
        },
        {
          iconSrc: "/how-do-we-work/exterior-wash.png",
          title: "Rinse & Dry",
          description: "Safe rinse or steam clean, then air/microfiber dry.",
        },
        {
          iconSrc: "/how-do-we-work/shield.png",
          title: "Dressing",
          description: "Protect rubber and plastic with dressing.",
        },
      ],
    },
    {
      text: "Full Interior Detailing",
      iconSrc: "/how-do-we-work/tabs/interior-detail.png",
      steps: [
        {
          iconSrc: "/how-do-we-work/vacuum.png",
          title: "Vacuum",
          description: "Deep vacuum of seats, carpets, mats, and boot.",
        },
        {
          iconSrc: "/how-do-we-work/vents.png",
          title: "Plastics & Vents",
          description: "Clean dashboard, vents, and console areas.",
        },
        {
          iconSrc: "/how-do-we-work/shampoo.png",
          title: "Seats & Fabrics",
          description: "Treat leather or fabric with cleaners and conditioners.",
        },
        {
          iconSrc: "/how-do-we-work/exterior-wash.png",
          title: "Glass",
          description: "Clean all interior glass surfaces streak-free.",
        },
        {
          iconSrc: "/how-do-we-work/perfection.png",
          title: "Finishing Touch",
          description: "Neutralise odours and check cabin freshness.",
        },
      ],
    },
    {
      text: "Full Exterior Detailing",
      iconSrc: "/how-do-we-work/exterior-wash.png",
      steps: [
        {
          iconSrc: "/how-do-we-work/check.png",
          title: "Pre-Wash",
          description: "Foam pre-wash to loosen dirt and contaminants.",
        },
        {
          iconSrc: "/how-do-we-work/exterior-wash.png",
          title: "Hand Wash",
          description: "Two-bucket safe wash of paintwork and wheels.",
        },
        {
          iconSrc: "/how-do-we-work/decontamination.png",
          title: "Decontamination",
          description: "Remove iron, tar, and bonded surface contaminants.",
        },
        {
          iconSrc: "/how-do-we-work/polish-icon.png",
          title: "Polish & Protect",
          description: "Polish paint and apply wax or sealant.",
        },
        {
          iconSrc: "/how-do-we-work/finish.png",
          title: "Final Finish",
          description: "Detail trims and glass for a flawless exterior.",
        },
      ],
    },
  ],
}
