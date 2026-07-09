// All content below reflects facts and copy confirmed directly.
// No numbers, quotes, or claims here were invented.

export const site = {
  domain: "courses.etalvis.com",
  brandTagline: "We make Electronics Student's Talent Visible to Industry!",
  whatsapp: "+91 9790873099",
  whatsappLink: "https://wa.me/919790873099",
  linkedin: "https://www.linkedin.com/in/balajeeseshadri/",
};

export const hero = {
  headline: "Not Just a Course. A Turning Point.",
  subline:
    "From doubt to building a 4-byte RAM, this journey will change how you see electronics.",
  trustPoints: [
    "Watch anytime, pre-recorded",
    "Doubts cleared directly on WhatsApp",
  ],
  ctaLabel: "Enroll Today",
};

export type Testimonial = {
  name: string;
  title: string;
  quote: string;
  link: string;
  context?: string;
};

export const testimonialsTop: Testimonial[] = [
  {
    name: "Adnan Huss",
    title: "Not Just a Course, A Turning Point",
    quote:
      "From doubt to building a 4-byte RAM, this journey will change how you see electronics.",
    link:
      "https://www.linkedin.com/posts/adnanhuss53_electronicsengineering-careerinelectronics-ugcPost-7392646227038814208-_qIv/?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
  {
    name: "B. Chandana",
    title: "Do You Really Understand Ohm's Law?",
    quote:
      "He knew the formula V equals IR, but couldn't solve real problems. This journey reveals why true understanding goes beyond memorizing laws.",
    link:
      "https://www.linkedin.com/posts/b-chandana-2885a2333_ohms-law-activity-7454177004234612736-vl5_?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
];

export const testimonialsBottom: Testimonial[] = [
  {
    name: "IECC BIT Sathy",
    title: "A Roadmap Every Embedded Engineer Needs",
    quote:
      "An insightful session that gave students a clear roadmap, practical skills, and real-world direction to build a successful career in embedded systems.",
    context: "Session feedback, BIT Sathy",
    link:
      "https://www.linkedin.com/posts/iecc-bit_bitsathy-ieccbit-bitsathy-activity-7450584649317154816-dbIZ?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
  {
    name: "Monicka Balaji",
    title: "Learning from 40+ Years of Industry Excellence",
    quote:
      "An inspiring interaction with a highly experienced industry expert, offering students real-world insights and clear direction for their future careers.",
    context: "ECE, semiconductor, and embedded systems session feedback",
    link:
      "https://www.linkedin.com/posts/monicka-balaji-314a96326_ece-semiconductor-embeddedsystems-share-7448544821004353536-Dnu8/?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
];

export const instructor = {
  name: "Balajee Seshadri",
  photoFormal: "/images/balajee-formal.png",
  photoCasual: "/images/balajee-casual.png",
  yearsExperience: "40+",
  followers: "55,000+",
  studentsEnrolled: "10,000+",
  linkedin: site.linkedin,
  bio: "Balajee Seshadri is a seasoned Embedded Systems Engineer with over 40 years of expertise in the Electronics Industry. Driven by a passion for mentorship and knowledge sharing, he supports ECE students in building specialized skills and overcoming the challenges of securing core positions in the field. Through his comprehensive, free Embedded Systems Programming course, as well as his contributions on Quora, LinkedIn, and online learning platforms, Balajee has become a trusted resource in Embedded Systems Education.",
  tagline: "Day ONE Productivity of Interns, YGTs, and Employees",
};

export const platformFeatures = {
  heading: "Our Platform Features",
  subline: "Join us on our path towards learning using the known to unknown method.",
  features: [
    {
      name: "Electronic",
      description:
        "We're focused on providing you with the most important, well curated courses on Modern Electronics.",
    },
    {
      name: "Talent",
      description:
        "We know you all have talent. With consistent practice and involvement in our course content, your talent can be honed to fit your interests and the industry's needs.",
    },
    {
      name: "Visibility",
      description:
        "We want to make sure your talent is visible to the industry. Our course is carefully designed to make sure you understand the basics of electronics, and have the confidence to ace any interview.",
    },
  ],
};

export const coursesIntro =
  "Master skills at your own pace with our expertly designed individual courses. Each course is focused, practical, and built to give you real-world knowledge that you can apply immediately. Learn what you need, when you need it. No distractions, just results.";

export type Course = {
  number: number;
  tag: string;
  title: string;
  sections: string[];
  note?: string;
};

export const courses: Course[] = [
  {
    number: 1,
    tag: "Electronics",
    title: "Electronics Foundation Course",
    sections: [
      "Electrical Fundamentals",
      "Electronics Fundamentals",
      "Number Systems",
      "Digital Electronics",
    ],
  },
  {
    number: 2,
    tag: "Programming",
    title: "C Programming Foundation Course",
    sections: [
      "Introduction to Programming",
      "Introduction to C Programming",
      "Simple Programming Practice",
      "Decision Making and Loops",
      "Arrays, Strings, and Pointers",
      "Structures",
      "Storage Class",
    ],
    note: "200+ problems to solve",
  },
  {
    number: 3,
    tag: "Hardware",
    title: "Embedded Hardware Foundation Course",
    sections: [
      "Microprocessor",
      "Memory Map",
      "Controller",
      "Microcontroller",
      "Introduction to Embedded Systems",
    ],
  },
  {
    number: 4,
    tag: "GPIO",
    title: "Embedded Software Foundation Course, GPIO",
    sections: [
      "Introduction",
      "Controlling LEDs",
      "Controlling 7 Segment Displays",
      "Monitoring Push Button Switches",
      "Reading Keypad Matrix",
      "Controlling Dot-Matrix",
    ],
  },
  {
    number: 5,
    tag: "Controllers",
    title: "Embedded Software Foundation Course, Controllers",
    sections: [
      "LED Controller",
      "LCD Controller",
      "Timer Controller",
      "Interrupt Controller",
      "DMA, DAC, ADC Controllers",
      "PWM",
      "Controlling Relays and Motors",
    ],
    note: "18 chapters in total",
  },
  {
    number: 6,
    tag: "Protocols",
    title: "Embedded Software Foundation Course, Interface Protocols",
    sections: ["Introduction to BUS", "UART", "I2C", "SPI"],
  },
  {
    number: 7,
    tag: "Internals",
    title: "Microprocessor Internals Foundation Course",
    sections: [
      "Internals of the microprocessor",
      "How an instruction is decoded",
    ],
    note: "Exclusive to the eTalVis platform, 2.5 hours, fully animated",
  },
  {
    number: 8,
    tag: "Microprocessor",
    title: "8085 Microprocessor Foundation Course",
    sections: [
      "8085 Introduction",
      "8085 Software",
      "8085 Peripheral Interface",
      "Assessment",
    ],
  },
  {
    number: 9,
    tag: "ARM",
    title: "ARM Controller Foundation Course",
    sections: [
      "Why the ARM Processor came to be",
      "ARM Microprocessor",
      "ARM Microcontroller",
    ],
  },
  {
    number: 10,
    tag: "Networking",
    title: "Networking Concepts Foundation Course",
    sections: [
      "Serial Communication",
      "Synchronous Communication",
      "Introduction to Ethernet",
      "PHY, MAC, IP, TCP",
      "Hub, Switch, Router, Gateway",
      "ARP and NAT",
    ],
  },
];

export const prerequisites = [
  "Basic Addition, Subtraction, Multiplication, and Division",
  "Basic English Reading Skills and Understanding Skills",
];

export const planFeatures = [
  "All 10 foundation courses included",
  "Pre-recorded, watch anytime, at your own pace",
  "Hands-on practice exercises",
  "Doubts cleared directly by Balajee sir on WhatsApp",
];

export type Plan = {
  name: string;
  code: string;
  price: number;
  duration: string;
  tag: "Best Seller" | "Best Value" | null;
  checkoutUrl: string;
};

export const plans: Plan[] = [
  {
    name: "1 Month",
    code: "EF-01",
    price: 999,
    duration: "1 month access",
    tag: "Best Seller",
    checkoutUrl: "https://learn.etalvis.com/web/checkout/69dc8903dd89f7865bd71d26",
  },
  {
    name: "6 Months",
    code: "EF-06",
    price: 2999,
    duration: "6 months access",
    tag: null,
    checkoutUrl: "https://learn.etalvis.com/web/checkout/6a49ecd60fd4ddf81d3f24ca",
  },
  {
    name: "12 Months",
    code: "EF-12",
    price: 4999,
    duration: "12 months access",
    tag: null,
    checkoutUrl: "https://learn.etalvis.com/web/checkout/6a439983717f947846a80a40",
  },
  {
    name: "Lifetime",
    code: "EF-99",
    price: 9999,
    duration: "Lifetime access",
    tag: "Best Value",
    checkoutUrl: "https://learn.etalvis.com/web/checkout/69cc63a722f6a817da84251e",
  },
];

export const whoIsThisFor = [
  {
    emoji: "🎓",
    title: "College Students",
  },
  {
    emoji: "💼",
    title: "Actively Job Searching",
    note: "This course does not guarantee or provide employment",
  },
  {
    emoji: "🔄",
    title: "Professionals Switching Careers to Embedded Systems",
  },
  {
    emoji: "🏫",
    title: "Higher Secondary Students",
  },
  {
    emoji: "🎒",
    title: "Students Who Just Finished Schooling",
  },
];

export const faqs = [
  {
    q: "How long do I have access to the course?",
    a: "Depends on the plan you choose, 1 month, 6 months, 12 months, or lifetime. All plans unlock the same 10 courses.",
  },
  {
    q: "Do I need prior programming experience?",
    a: "No. Just basic arithmetic and basic English reading skills. The courses are built to take you from the start.",
  },
  {
    q: "How do doubts get cleared?",
    a: "Directly with Balajee sir over WhatsApp. No ticket system, no waiting for a scheduled call.",
  },
  {
    q: "Are the classes live or recorded?",
    a: "Pre-recorded. Watch anytime, rewatch anytime, at whatever pace fits your schedule.",
  },
];

export const assessmentNote =
  "Embrace the opportunity to tackle your assessments on your own, without relying on the internet or outside assistance. This is a valuable chance for you to demonstrate your skills and knowledge. If you find yourself needing support, remember that we're just a message away to help you navigate any challenges. You have what it takes, and we believe in your potential.";

export const audienceSegments = [
  { label: "College Students" },
  { label: "Final-Year Students" },
  { label: "Recent Graduates" },
  {
    label: "Actively Job-Searching",
    disclaimer:
      "This course builds skills, it does not provide placement or guaranteed employment.",
  },
  { label: "Higher Secondary Students" },
  { label: "Students Who Just Finished Schooling" },
  { label: "Professionals Planning to Switch Their Career to Embedded Systems" },
];

export const promoOffer = {
  headline: "Your First Month, Rs. 99",
  subline: "Regular price Rs. 999. Use the code below at checkout.",
  promoCode: "ETALVIS_PROMO",
  regularPrice: 999,
  offerPrice: 99,
  expiryText: "Offer ends July 31",
  checkoutUrl: "https://learn.etalvis.com/web/checkout/69dc8903dd89f7865bd71d26",
  steps: [
    "Click Enroll Now below",
    "On the checkout page, enter the code ETALVIS_PROMO in the coupon field",
    "Your total updates to Rs. 99",
  ],
};

export const finalCta = {
  heading: "10,000+ students already enrolled. Your turning point starts today.",
  subline:
    "Pre-recorded, so you begin the moment you enroll. Doubts cleared directly by Balajee sir on WhatsApp, not a support queue.",
  ctaLabel: "Enroll Today",
};
