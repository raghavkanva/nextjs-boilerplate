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
  badge: "10,000+ Students Already Enrolled",
  headlinePlain: "From Doubting Ohm's Law to",
  headlineAccent: "Building Real Embedded Systems",
  sublineBefore: "Online embedded systems course for beginners in India, 10 foundation courses, taught by a ",
  sublineHighlight: "40+ year industry veteran",
  sublineAfter: "",
  trustPoints: [
    "Watch anytime, pre-recorded Online Sessions",
    "Doubts cleared directly on WhatsApp",
  ],
  ctaLabel: "Enroll Today",
  seoSubhead:
    "Online embedded systems course for beginners in India, 10 foundation courses, taught by a 40+ year industry veteran.",
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
    name: "Swapnil Gade",
    title: "Senior Software Engineer, Cybersecurity, Danfoss Power Solutions",
    quote:
      "Balajee sir's teaching connects the fundamentals to how embedded systems actually work in the field, not just theory.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7451543195655581696/?skipRedirect=true",
  },
  {
    name: "Tarang Srivas",
    title: "M.Tech, VLSI Design & Embedded Systems, IIT Jammu, now Engineer 1 at Silicon Labs",
    quote:
      "I used to rely on high-level programming with Arduino, STM, and ESP boards, but your teachings helped me understand how things actually work under the hood.",
    link: "https://www.linkedin.com/in/tarang-srivas-b192ab213/",
  },
  {
    name: "Raghu Prakash",
    title: "Course graduate",
    quote:
      "Balajee sir delivered clear, well-organized online sessions that built a strong and practical understanding of C programming, electronics, and embedded concepts.",
    link: "https://www.linkedin.com/posts/raghu-prakash-775331380_i-successfully-completed-the-etalvis-c-activity-7416447756665270272-XWXK/?skipRedirect=true",
  },
  {
    name: "Adnan Huss",
    title: "Course graduate",
    quote:
      "From doubt to building a 4-byte RAM, this journey will change how you see electronics.",
    link: "https://www.linkedin.com/posts/adnanhuss53_electronicsengineering-careerinelectronics-ugcPost-7392646227038814208-_qIv/?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
];

export const testimonialsBottom: Testimonial[] = [
  {
    name: "IECC BIT Sathy",
    title: "Session feedback, BIT Sathy",
    quote:
      "An insightful session that gave students a clear roadmap, practical skills, and real-world direction to build a successful career in embedded systems.",
    context: "Session feedback, BIT Sathy",
    link: "https://www.linkedin.com/posts/iecc-bit_bitsathy-ieccbit-bitsathy-activity-7450584649317154816-dbIZ?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
  {
    name: "Monicka Balaji",
    title: "ECE, semiconductor, and embedded systems session feedback",
    quote:
      "An inspiring interaction with a highly experienced industry expert, offering students real-world insights and clear direction for their future careers.",
    context: "ECE, semiconductor, and embedded systems session feedback",
    link: "https://www.linkedin.com/posts/monicka-balaji-314a96326_ece-semiconductor-embeddedsystems-share-7448544821004353536-Dnu8/?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
  {
    name: "B. Chandana",
    title: "Course graduate",
    quote:
      "He knew the formula V equals IR, but couldn't solve real problems. This journey reveals why true understanding goes beyond memorizing laws.",
    link: "https://www.linkedin.com/posts/b-chandana-2885a2333_ohms-law-activity-7454177004234612736-vl5_?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
  {
    name: "Arivenkkataram ASJ",
    title: "Course graduate",
    quote:
      "The Balajee Seshadri embedded systems course gave me the initial spark to explore embedded systems more deeply and to start thinking beyond ready-made libraries.",
    link: "https://www.linkedin.com/in/arivenkkataram-asj/",
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
  description?: string;
  sections: string[];
  note?: string;
};

export const courses: Course[] = [
  {
    number: 1,
    tag: "Electronics",
    title: "Electronics Foundation Course",
    description:
      "Covers electrical and electronics fundamentals, number systems, and digital electronics to build a base for embedded systems work.",
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
    description:
      "Teaches C programming from the basics through arrays, structures, and storage classes, with 200+ practice problems.",
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
    description:
      "Introduces microprocessors, memory maps, controllers, and microcontrollers as the hardware foundation for embedded systems.",
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
    description:
      "Covers GPIO programming, including controlling LEDs, displays, push buttons, keypads, and dot-matrix modules.",
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
    description:
      "Covers LED, LCD, timer, interrupt, DMA, DAC, ADC, and PWM controllers, plus controlling relays and motors, across 18 chapters.",
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
    description:
      "Introduces communication protocols including BUS, UART, I2C, and SPI used in embedded systems.",
    sections: ["Introduction to BUS", "UART", "I2C", "SPI"],
  },
  {
    number: 7,
    tag: "Internals",
    title: "Microprocessor Internals Foundation Course",
    description:
      "A fully animated, exclusive course explaining the internal workings of a microprocessor and how instructions are decoded.",
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
    description:
      "Covers the 8085 microprocessor, its software, peripheral interfacing, and includes an assessment.",
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
    description:
      "Explains why the ARM processor was developed and covers ARM microprocessor and microcontroller fundamentals.",
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
    description:
      "Covers serial and synchronous communication, Ethernet, PHY, MAC, IP, TCP, and core networking hardware concepts.",
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

export type Plan = {
  name: string;
  code: string;
  price: number;
  duration: string;
  tag: "Popular" | "Best Value" | null;
  checkoutUrl: string;
  features: string[];
  highlights?: { title: string; subtitle: string }[];
};


export const plans: Plan[] = [
  {
    name: "Starter",
    code: "EF-01",
    price: 999,
    duration: "1 month access",
    tag: null,
    checkoutUrl: "https://learn.etalvis.com/web/checkout/6a5da2d97296ab39d9404518",
    features: [
      "All 10 foundation courses included",
      "Pre-recorded online sessions, watch anytime, at your own pace",
      "Practice exercises",
    ],
  },
  {
    name: "Semester",
    code: "EF-06",
    price: 2999,
    duration: "6 months access",
    tag: "Popular",
    checkoutUrl: "https://learn.etalvis.com/web/checkout/6a49ecd60fd4ddf81d3f24ca",
    features: [
      "2 free online monthly meetup sessions",
    ],
    highlights: [
      {
        title: "Doubts cleared directly by Balajee sir on WhatsApp",
        subtitle: "Direct access to Balajee sir, not a support ticket queue",
      },
      {
        title: "No-cost EMI available",
        subtitle: "Split your payment with no added cost",
      },
    ],
  },
  {
    name: "Annual",
    code: "EF-12",
    price: 4999,
    duration: "12 months access",
    tag: null,
    checkoutUrl: "https://learn.etalvis.com/web/checkout/6a439983717f947846a80a40",
    features: [
      "6 free online monthly meetup sessions",
    ],
        highlights: [
      {
        title: "One Time Resume Preparation Help",
        subtitle: "A one-time service to structure and polish your resume."
      },
      {
        title: "15 Minutes Career Guidance Session",
        subtitle: "One time 15 minutes Career Guidance session by Balajee Seshadri",
      },
    ],
  },
  {
    name: "Lifetime",
    code: "EF-99",
    price: 9999,
    duration: "Lifetime access",
    tag: "Best Value",
    checkoutUrl: "https://learn.etalvis.com/web/checkout/69cc63a722f6a817da84251e",
    features: [
      "10 free online monthly meetup sessions",
      "Two - Times Resume Preparation Help",
      "Extra Courses Offered",
    ],
    highlights: [
      {
        title: "1 Mock Interview",
        subtitle: "A single mock interview to practice under real pressure and get honest feedback afterward."
      }
    ]
  },
];

export const whoIsThisFor = [
  {
    emoji: "🎓",
    title: "College Students",
    line: "Build a real foundation in electronics, not just what your syllabus covers.",
  },
  {
    emoji: "📘",
    title: "Final-Year Students",
    line: "Understand how the concepts you've studied actually work in practice.",
  },
  {
    emoji: "🎓",
    title: "Recent Graduates",
    line: "Close the gap between textbook electronics and how systems are actually built.",
  },
  {
    emoji: "💼",
    title: "Actively Job Searching",
    line: "Strengthen your grip on the fundamentals at your own pace.",
    note: "This course does not guarantee or provide employment",
  },
  {
    emoji: "🏫",
    title: "Higher Secondary Students",
    line: "Start electronics early, with a real foundation instead of just theory.",
  },
  {
    emoji: "🎒",
    title: "Students Who Just Finished Schooling",
    line: "Use this time to build a genuine understanding of electronics.",
  },
  {
    emoji: "🔄",
    title: "Professionals Switching Careers to Embedded Systems",
    line: "Learn the fundamentals embedded systems work actually depends on.",
  },
];

export const faqs = [
  {
    q: "How long do I have access to the course?",
    a: "Depends on the plan you choose, Starter, Semester, Annual, or Lifetime. All plans unlock the same 10 courses.",
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
  {
    q: "Is EMI available?",
    a: "Yes, no-cost EMI is available starting from the Semester plan onward.",
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
  checkoutUrl: "https://learn.etalvis.com/web/checkout/6a5da2d97296ab39d9404518",
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

export const sessionDetails = [
  { label: "Date", value: "July 26, 2026, Sunday" },
  { label: "Time", value: "11 AM – 1 PM" },
  { label: "Format", value: "Live online session" },
  { label: "Registration closes", value: "July 26, 10 AM" },
  { label: "Who it's for", value: "EEE, ECE, EIE, BME, and Mechatronics students, any year, and recent graduates" },
];

export type Myth = {
  myth: string;
  reality: string;
};

export const coreMyths: Myth[] = [
  {
    myth: "Core jobs are vanishing, everyone ends up in IT",
    reality: "Demand for hardware engineers is rising with IoT, AI chips, and EVs.",
  },
  {
    myth: "You need a Master's degree to get a core job",
    reality: "Many top hardware companies actively hire skilled Bachelor's graduates with strong project experience.",
  },
  {
    myth: "Electronics is strictly hardware, CSE is strictly software",
    reality: "Core engineers regularly write code for chip design and embedded systems.",
  },
  {
    myth: "Core salaries are stagnant and lower than IT",
    reality: "Specialized domains like VLSI, analog/RF design, and semiconductor engineering command premium pay that scales with experience.",
  },
  {
    myth: "Core jobs don't exist in India",
    reality: "India has a booming hardware ecosystem with major government investment and global companies setting up R&D and manufacturing here.",
  },
];

export const sessionOffer = {
  title: "Demystifying the Myths of the Core Electronics Industry Career",
  price: 99,
  checkoutUrl: "https://learn.etalvis.com/web/checkout/6a53b5028d2de3dfcd013426",
  starterPlanValue: 999,
};

export const sessionHeroContent = {
  headlinePlain: "Demystifying the Myths of the",
  headlineAccent: "Core Electronics Industry Career",
  badge: "Get Clarity on Core Industry",
  ctaLabel: "Register Now, Rs. 99",
  ctaHref: "#register",
};

export const sessionAudience = [
  {
    emoji: "🎓",
    title: "Incoming EEE/ECE/EIE/BME/Mechatronics Students",
    line: "Get a head start before your first year even begins.",
  },
  {
    emoji: "📘",
    title: "Current Core Branch Students, Any Year",
    line: "Whether you're in 1st year or final year, get real direction now.",
  },
  {
    emoji: "🎓",
    title: "Recent Graduates from Core Branches",
    line: "Understand what companies are actually looking for.",
  },
  {
    emoji: "💼",
    title: "Anyone Planning a Core Electronics Career",
    line: "Start preparing with a clear, practical roadmap.",
  },
];

export const sessionFaqs = [
  {
    q: "Is this session really Rs. 99?",
    a: "Yes. Registration is Rs. 99, and it includes a free Starter plan worth Rs. 999.",
  },
  {
    q: "What if I can't attend the live session?",
    a: "You'll get access to the full recorded session from July 27, 2026, for one month.",
  },
  {
    q: "Do I need to already be in a core branch to join?",
    a: "No. This is for incoming, current, and recently graduated EEE, ECE, EIE, BME, and Mechatronics students.",
  },
  {
    q: "How do I get the free Starter plan access?",
    a: "It's activated automatically for everyone who registers for the session.",
  },
  {
    q: "How long can I access the recording?",
    a: "The recorded session is available for one month from July 27, 2026.",
  },
];