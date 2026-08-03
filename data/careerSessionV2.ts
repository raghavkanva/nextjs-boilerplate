// data/careerSessionV2.ts
// Core Electronics Career Guidance Session, white/green/yellow design system

export const cgEvent = {
  sessionName: "Demystifying the Myths of the Core Electronics Industry Career",
  price: 99,
  foundationValue: 999,
  // TODO: verify this is the correct checkout URL for the course-only purchase (was the session registration URL)
  checkoutUrl: "https://learn.etalvis.com/web/checkout/6a53b5028d2de3dfcd013426",
  whatsapp: "+91 9790873099",
  whatsappLink: "https://wa.me/919790873099",
  instructorLinkedin: "https://www.linkedin.com/in/balajeeseshadri/",
};

export const CTA_LABEL = "Enroll Now, Rs. 99";

export const cgHero = {
  headline: "Demystifying the Myths of the Core Electronics Industry Career",
  subhead: "Straight answers about core electronics careers. From 40+ years inside the industry.",
  instructorLine:
    "Balajee Seshadri. 40+ years in the electronics industry, work across India, USA, Germany, and Canada.",
  followersLine: "57,000+ followers on LinkedIn",
  benefitLine: [
    "Pre-recorded, self-paced",
    "All 10 Foundation Courses",
    "Doubts cleared directly on WhatsApp",
  ],
  microcopy: "One time payment. No subscription. No hidden charges.",
};

export const cgPainPoints = {
  heading: "Sounds Like You?",
  points: [
    "Everyone says core is dying, but what is the actual situation?",
    "I chose my specialization, but I'm not sure it fits where the core industry is going.",
    "I've applied to so many core companies. No calls. I don't know what I'm missing.",
    "I clear some core interviews, fail others, and I can't figure out the pattern.",
    "Core companies don't come to my college for placements. Do I still have a real chance?",
    "My English isn't great. Will that hold me back in core interviews?",
    "Will AI take over core electronics before I even get started?",
    "Nobody tells me when core job preparation is actually supposed to start.",
    "My friends are all moving to IT. I want core, but I don't have a plan for it.",
    "Everyone says \"build projects,\" but which projects does the core industry actually value?",
  ],
  bridge:
    "If even one of these sounds like you, you're not alone. This course is built to help you understand these exact questions, and more.",
  questionsSubheading: "What this course will help you understand",
};

export const cgQuestionGroups = [
  {
    heading: "Jobs and Salary",
    questions: [
      "What are the real job opportunities in core electronics?",
      "What's the actual starting pay?",
      "What's the one skill the industry actually rewards?",
      "I'm in a Tier 3 college. Can I still get a core electronics job?",
    ],
  },
  {
    heading: "Skills and Preparation",
    questions: [
      "How do I choose the right specialization?",
      "How should I prepare for a core electronics job?",
      "What CGPA do I need?",
      "Do I need private coaching?",
      "When should I start preparing?",
      "Are certificates enough?",
      "How much do projects actually matter?",
      "Is it too late to start now?",
    ],
  },
  {
    heading: "Interviews and Opportunities",
    questions: [
      "Why am I not getting interview calls?",
      "Why do I get interviews but not offers?",
    ],
  },
  {
    heading: "Communication, AI, and the Future",
    questions: [
      "I'm not fluent in English. Will that stop me?",
      "Will AI replace core electronics jobs?",
      "How is AI changing what electronics engineers actually do?",
    ],
  },
];

export const cgAudience = {
  heading: "Who Is This Course For?",
  subline:
    "For ECE, EEE, EIE, BME, Mechatronics, and related electronics branches, at any stage.",
  cards: [
    {
      stage: "1st Year",
      body: "Just joined? Learn how the industry works before confusion sets in.",
    },
    {
      stage: "2nd / 3rd Year",
      body: "Confused about specialization, projects, or internships? Get clear direction.",
    },
    {
      stage: "Final Year",
      body: "Placements coming? Find out what's missing before interviews start.",
    },
    {
      stage: "Graduated / Job Hunting",
      body: "No calls or offers? Understand why, and what to fix.",
    },
  ],
};

export const cgOutcomes = {
  heading: "What Will Become Clear in This Course?",
  items: [
    "The core electronics roles worth exploring",
    "Realistic salary and industry expectations",
    "How to actually evaluate a specialization",
    "Which fundamentals, tools, and projects deserve your time",
    "Why getting an interview and clearing one need different preparation",
    "What to prioritize, based on where you are right now",
  ],
  closing:
    "This course won't choose your career for you. It'll help you understand the decisions in front of you, and what preparing for them actually takes.",
};

export const cgInstructor = {
  name: "Balajee Seshadri",
  photo: "/images/balajee-formal.png",
  heading: "Guidance Backed by 40+ Years in the Electronics Industry",
  bio: "Balajee Seshadri guides students on electronics careers, fundamentals, internships, and interviews. Direct, fundamentals first, no shortcuts.",
  trustPoints: [
    "40+ years of industry experience",
    "Work across India, USA, Germany, and Canada",
    "57,000+ followers on LinkedIn",
    "No job promises, no shortcuts",
  ],
};

export type ReviewCard = {
  name: string;
  designation: string;
  shortSummary: string;
  fullSummary: string;
  image: string;
  url: string;
};

export const cgReviewCards: ReviewCard[] = [
  {
    name: "Tarang Srivas",
    designation: "M.Tech, VLSI Design and Embedded Systems, IIT Jammu, now Engineer 1 at Silicon Labs",
    shortSummary: "On moving from high level board programming to real hardware understanding.",
    fullSummary:
      "I used to rely on high level programming with Arduino, STM, and ESP boards, but your teachings helped me understand how things actually work under the hood.",
    image: "/images/student-linkedin-1.png",
    url: "https://www.linkedin.com/posts/tarang-srivas-b192ab213_siliconlabs-embeddedsystems-engineer-activity-7481286507979255809-nY98",
  },
  {
    name: "IECC BIT Sathy",
    designation: "Session feedback, BIT Sathy",
    shortSummary: "On the clear roadmap and real world direction the session gave students.",
    fullSummary:
      "An insightful session that gave students a clear roadmap, practical skills, and real world direction to build a successful career in embedded systems.",
    image: "/images/student-linkedin-2.png",
    url: "https://www.linkedin.com/posts/iecc-bit_bitsathy-ieccbit-bitsathy-share-7450584647996035073-XmY7/",
  },
  {
    name: "Monicka Balaji",
    designation: "ECE, semiconductor, and embedded systems session feedback",
    shortSummary: "On the real world insights and clear career direction from the session.",
    fullSummary:
      "An inspiring interaction with a highly experienced industry expert, offering students real world insights and clear direction for their future careers.",
    image: "/images/student-linkedin-3.png",
    url: "https://www.linkedin.com/posts/monicka-balaji-314a96326_ece-semiconductor-embeddedsystems-share-7448544821004353536-Dnu8/",
  },
  {
    name: "Arivenkkataram ASJ",
    designation: "Course graduate",
    shortSummary: "On the spark to explore embedded systems beyond ready made libraries.",
    fullSummary:
      "The Balajee Seshadri embedded systems course gave me the initial spark to explore embedded systems more deeply and to start thinking beyond ready made libraries.",
    image: "/images/student-linkedin-4.png",
    url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7418715680449122304/",
  },
  {
    name: "Swapnil Gade",
    designation: "Senior Software Engineer, Cybersecurity, Danfoss Power Solutions",
    shortSummary: "On how the teaching connects fundamentals to real field work.",
    fullSummary:
      "Balajee sir's teaching connects the fundamentals to how embedded systems actually work in the field, not just theory.",
    image: "/images/student-linkedin-5.png",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7451543195655581696/",
  },
  {
    name: "Raghu Prakash",
    designation: "Course graduate",
    shortSummary: "On completing the eTalVis C Programming course.",
    fullSummary:
      "Shared his experience completing the eTalVis C Programming course, describing clear, well organized sessions that built a practical understanding of C, electronics, and embedded concepts.",
    image: "/images/student-linkedin-6.png",
    url: "https://www.linkedin.com/posts/raghuprakash56_i-successfully-completed-the-etalvis-c-ugcPost-7416447755549687808-nHlb/",
  },
  {
    name: "Adnan Hussain",
    designation: "Course graduate",
    shortSummary: "On going from doubt to building a 4 byte RAM.",
    fullSummary:
      "Posted about going from doubt to building a 4 byte RAM, describing it as a turning point in how he saw electronics.",
    image: "/images/student-linkedin-7.png",
    url: "https://www.linkedin.com/posts/adnanhuss53_electronicsengineering-careerinelectronics-ugcPost-7392646227038814208-_qIv/?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
  {
    name: "B. Chandana",
    designation: "Course graduate",
    shortSummary: "On the gap between memorizing a formula and real understanding.",
    fullSummary:
      "Wrote about knowing the formula for Ohm's Law but not being able to solve real problems, and how the course revealed the gap between memorizing and understanding.",
    image: "/images/student-linkedin-8.png",
    url: "https://www.linkedin.com/posts/b-chandana-2885a2333_ohms-law-ugcPost-7454177003034791936-fki5/?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
];

export const cgOffer = {
  heading: "Everything Included With Your Rs. 999 Enrollment",
  items: [
    {
      title: "All 10 Foundation Courses",
      body: "Full access to every course covering electronics, C programming, embedded hardware, embedded software, protocols, microprocessor internals, ARM, 8085, and networking.",
    },
    {
      title: "Self-Paced Format",
      body: "Learn at your own pace. No fixed schedule, no live deadlines.",
    },
    {
      title: "Direct Doubt Clearing on WhatsApp",
      body: "Ask your questions directly and get answers from Balajee Seshadri.",
    },
  ],
  price: 999,
};

export const cgTrustStatement = {
  heading: "Career Guidance, Not a Job Promise",
  intro:
    "This course helps you understand the core electronics industry, spot the gaps in your preparation, and choose a clearer next step.",
  subheading: "It does not provide:",
  points: [
    "A guaranteed job or internship",
    "A guaranteed interview",
    "A guaranteed salary",
    "A placement promise",
    "A certificate that replaces real skill",
    "Results without consistent effort",
  ],
  closing: "Enroll if you want an honest industry perspective, not a shortcut.",
};

export const cgFaqs = [
  {
    q: "Who is this course for?",
    a: "ECE, EEE, EIE, BME, Mechatronics, and related electronics branches. Students from first year to final year, recent graduates, and core electronics job seekers.",
  },
  {
    q: "How long do I have access to the course?",
    a: "Access duration is based on the plan you purchase. Check the plans section on the main site for current durations.",
  },
  {
    q: "Is this self-paced or live?",
    a: "Fully self-paced. You can watch at your own schedule, pause and revisit sections, and move at whatever pace suits your preparation.",
  },
  {
    q: "Can I ask doubts after enrolling?",
    a: "Yes. Doubts are cleared directly on WhatsApp by Balajee Seshadri.",
  },
  {
    q: "Does this guarantee a job or internship?",
    a: "No. This is a career guidance and fundamentals course, not a placement program. It helps you understand the industry and prepare more clearly.",
  },
  {
    q: "What is included in the Rs. 999 enrollment?",
    a: "All 10 Foundation Courses, self-paced access, and direct doubt clearing on WhatsApp.",
  },
];

export const cgFinalCta = {
  heading: "Stop Building Your Career Around Unanswered Questions",
  body: "Get an honest explanation of the core electronics industry from Balajee Seshadri. Understand what to learn, how to prepare, and what to do next.",
  recap: [
    "17 important career questions covered",
    "Pre-recorded, self-paced format",
    "40+ years of industry perspective",
    "All 10 Foundation Courses",
    "Direct doubt clearing on WhatsApp",
    "Course fee: Rs. 999",
  ],
};

export type FoundationCourse = {
  number: number;
  tag: string;
  title: string;
  topics: string[];
  highlight?: string;
};

export const cgFoundationCourses: FoundationCourse[] = [
  {
    number: 1,
    tag: "Electronics",
    title: "Electronics Foundation Course",
    topics: ["Electrical Fundamentals", "Electronics Fundamentals", "Number Systems", "Digital Electronics"],
  },
  {
    number: 2,
    tag: "Programming",
    title: "C Programming Foundation Course",
    topics: [
      "Intro to Programming",
      "Intro to C",
      "Programming Practice",
      "Decision Making and Loops",
      "Arrays",
      "Strings",
      "Pointers",
      "Structures",
      "Storage Class",
    ],
    highlight: "200+ problems to solve",
  },
  {
    number: 3,
    tag: "Hardware",
    title: "Embedded Hardware Foundation Course",
    topics: ["Microprocessor", "Memory Map", "Controller", "Microcontroller", "Intro to Embedded Systems"],
  },
  {
    number: 4,
    tag: "GPIO",
    title: "Embedded Software Foundation Course, GPIO",
    topics: [
      "Controlling LEDs",
      "7 Segment Displays",
      "Push Button Switches",
      "Keypad Matrix",
      "Dot Matrix",
    ],
  },
  {
    number: 5,
    tag: "Controllers",
    title: "Embedded Software Foundation Course, Controllers",
    topics: [
      "LED Controller",
      "LCD Controller",
      "Timer",
      "Interrupts",
      "DMA",
      "DAC and ADC",
      "PWM",
      "Relays and Motors",
    ],
    highlight: "18 chapters in total",
  },
  {
    number: 6,
    tag: "Protocols",
    title: "Embedded Software Foundation Course, Interface Protocols",
    topics: ["Intro to BUS", "UART", "I2C", "SPI"],
  },
  {
    number: 7,
    tag: "Internals",
    title: "Microprocessor Internals Foundation Course",
    topics: ["Microprocessor Internals", "How an Instruction Is Decoded"],
    highlight: "2.5 hours, fully animated, eTalVis exclusive",
  },
  {
    number: 8,
    tag: "Microprocessor",
    title: "8085 Microprocessor Foundation Course",
    topics: ["8085 Introduction", "8085 Software", "Peripheral Interface", "Assessment"],
  },
  {
    number: 9,
    tag: "ARM",
    title: "ARM Controller Foundation Course",
    topics: ["Why ARM Came to Be", "ARM Microprocessor", "ARM Microcontroller"],
  },
  {
    number: 10,
    tag: "Networking",
    title: "Networking Concepts Foundation Course",
    topics: [
      "Serial Communication",
      "Synchronous Communication",
      "Ethernet",
      "PHY, MAC, IP, TCP",
      "Hub, Switch, Router, Gateway",
      "ARP and NAT",
    ],
  },
];