// data/careerSession.ts
// Core Electronics Career Guidance Session — Aug 2, 2026

export const cgEvent = {
  sessionName: "Demystifying the Myths of the Core Electronics Industry Career",
  date: "Sunday, August 2, 2026",
  dateISO: "2026-08-02T11:00:00+05:30",
  endISO: "2026-08-02T13:00:00+05:30",
  registrationClosesISO: "2026-08-01T23:59:59+05:30",
  time: "11:00 AM – 1:00 PM IST",
  format: "Live Online Session",
  price: 99,
  foundationValue: 999,
  checkoutUrl: "https://learn.etalvis.com/web/checkout/6a53b5028d2de3dfcd013426",
  whatsapp: "+91 9790873099",
  whatsappLink: "https://wa.me/919790873099",
  instructorLinkedin: "https://www.linkedin.com/in/balajeeseshadri/",
};

export const cgHero = {
  label: "LIVE ONLINE SESSION",
  headline: "Demystifying the Myths of the Core Electronics Industry Career",
  subhead: "Jobs, pay, specialization, internships, interviews, and AI. Straight talk, not motivation.",
  instructorLine:
    "Conducted by Balajee Seshadri. 40+ years in the Electronics Industry, including work in the USA, Germany, and Canada.",
  ctaLabel: "Register for the ₹99 Session",
  benefitLine:
    "One-time fee · 1-month recording access included · 1-month Electronics Foundation course access worth ₹999 included",
};

export const cgSection2 = {
  heading: "You Chose Electronics. What Should You Do Next?",
  paragraphs: [
    "If you're in final year, the pressure has already started. What matters now is understanding exactly what's missing and fixing it in the time you have left, not panicking.",
    "If you just finished 12th or you're in first year, you have the most time and the least idea of what to do with it. That's normal. It's also your biggest advantage if you use it.",
    "If you've already graduated, you're probably asking what you should have done two years earlier. That question is useful only if it leads to action now.",
    "If you're in second or third year, this is exactly when specialization decisions and internship prep should begin, not final year.",
    "What you do next depends on where you're standing right now.",
  ],
  ctaLabel: "Understand Your Next Step",
};

export type StageCard = {
  title: string;
  body: string;
  ctaLabel: string;
  icon: "target" | "graduationCap" | "book" | "briefcase" | "compass" | "clock" | "check";
};

export const cgStageCards: StageCard[] = [
  {
    title: "Final-Year Student",
    body: "Placements are close. Understand what's missing, fix it now.",
    ctaLabel: "Get a Clearer Direction",
    icon: "target",
  },
  {
    title: "Just Completed Class 12",
    body: "Understand the industry before you accept anyone else's opinion of it.",
    ctaLabel: "Begin With Clarity",
    icon: "graduationCap",
  },
  {
    title: "First-Year Student",
    body: "Fundamentals started now matter more than they'll seem to.",
    ctaLabel: "Start With the Right Direction",
    icon: "book",
  },
  {
    title: "Recent Graduate",
    body: "If calls aren't coming, there's usually a specific reason.",
    ctaLabel: "Identify What May Be Missing",
    icon: "briefcase",
  },
  {
    title: "Second-Year Student",
    body: "Connect what you've studied to real industry roles.",
    ctaLabel: "Understand Before Choosing",
    icon: "compass",
  },
  {
    title: "Third-Year Student",
    body: "Internships are close. Know where you stand first.",
    ctaLabel: "Prepare Before the Pressure",
    icon: "clock",
  },
  {
    title: "Internship or Job Seeker",
    body: "Make sure your preparation matches the role.",
    ctaLabel: "Prepare for the Right Opportunity",
    icon: "check",
  },
];

export const cgQuestions: string[] = [
  "What are the real job opportunities in Core Electronics?",
  "What's the actual starting pay?",
  "How do I choose the right specialization?",
  "How should I prepare for a Core Electronics job?",
  "What's the one skill the industry actually rewards?",
  "What CGPA do I need?",
  "Do I need private coaching?",
  "When should I start preparing?",
  "I'm in a Tier 3 college. Can I still get a Core Electronics job?",
  "I'm not fluent in English. Will that stop me?",
  "Will AI replace Core Electronics jobs?",
  "How is AI changing what Electronics Engineers actually do?",
  "Why am I not getting interview calls?",
  "Why do I get interviews but not offers?",
  "Are certificates enough?",
  "How much do projects actually matter?",
  "Is it too late for me to start now?",
];

export const cgInterviewSplit = {
  heading: "Getting an Interview and Clearing One Are Two Different Problems",
  columns: [
    {
      title: "Getting an Interview",
      body: "Some students never get called. Usually it comes down to the role they're targeting, the skills they're showing, their projects, their resume, or how relevant they look on paper.",
    },
    {
      title: "Clearing the Interview",
      body: "Some students get the call but don't convert it. Usually it comes down to fundamentals, practical understanding, problem solving, or the ability to explain what they actually know.",
    },
  ],
  supporting:
    "Being strong in Modern Electronics tends to get you the call. Being strong in Electronics Fundamentals tends to get you through the interview. Most students are solid in one and weak in the other. During the session, we'll walk through why both need separate preparation.",
  ctaLabel: "Understand How to Prepare for Both",
};

export const cgStages = ["First Year", "Second Year", "Third Year", "Final Year", "Recent Graduate"];

export const cgWhenToStart = {
  heading: "When Should You Start Preparing?",
  paragraphs: [
    "Different students are standing at different points. The right preparation can't look identical for all of them.",
    "You may have started early. You may have started late. The real question is what to do from exactly where you're standing now.",
  ],
  ctaLabel: "Find Your Next Step",
};

export const cgConfusions: string[] = [
  "Confusion about Core Electronics job opportunities",
  "Confusion about starting salary",
  "Confusion about choosing a specialization",
  "Confusion about how to prepare",
  "Confusion about CGPA requirements",
  "Confusion about Tier 3 college opportunities",
  "Confusion about English communication",
  "Confusion about whether coaching is necessary",
  "Confusion about internships",
  "Confusion about getting interview calls",
  "Confusion about clearing interviews",
  "Confusion about AI and future jobs",
  "Confusion about when to begin",
  "Confusion about what to do next",
];

export const cgInstructor = {
  name: "Balajee Seshadri",
  photo: "/images/balajee-formal.png",
  bio: [
    "40+ years in the Electronics Industry. Professional experience in India, plus work in the USA, Germany, and Canada.",
    "Balajee Seshadri writes regularly about Electronics careers, industry expectations, fundamentals, modern skills, internships, interviews, and the real problems students face.",
    "His guidance is direct. He doesn't hide the hard parts. He doesn't promise shortcuts. He asks students to understand where they actually stand, strengthen the fundamentals that matter, and prepare consistently from there.",
  ],
  ctaLabel: "Learn From 40+ Years of Industry Experience",
};

export const cgSessionNotFor = {
  heading: "This Session Isn't For Everyone",
  intro:
    "This session is built for people genuinely trying to understand a Core Electronics career, not for everyone.",
  subheading: "It's probably not for you if:",
  points: [
    "You're looking for a guaranteed job or placement promise.",
    "You want a quick certificate, not real understanding.",
    "You're not in, or planning to enter, ECE, EEE, EIE, BME, or Mechatronics.",
    "You're looking for motivation, not industry reality.",
  ],
  closing: "If none of that describes you, this session is exactly what you're looking for.",
};

// ---------- Merged slider: 8 topic-explainer cards + 8 student review cards ----------

export type ExplainerCard = {
  type: "explainer";
  heading: string;
  body: string;
  ctaLabel: string;
};

export type ReviewCard = {
  type: "review";
  name: string;
  designation: string;
  shortSummary: string;
  fullSummary: string;
  image: string;
  url: string;
};

export type SliderCard = ExplainerCard | ReviewCard;

const explainerCards: ExplainerCard[] = [
  {
    type: "explainer",
    heading: "Is AI Going to Take Your Job Before You Even Start?",
    body: "AI is changing engineering work, but not the way most students fear. The session covers which skills matter more, not less.",
    ctaLabel: "Understand the Future Without the Fear",
  },
  {
    type: "explainer",
    heading: "Which Specialization Is Right for You?",
    body: "Not every Electronics student needs the same path. The right call depends on your interest, ability, and time to prepare, not a trend.",
    ctaLabel: "Choose With Understanding",
  },
  {
    type: "explainer",
    heading: "Electronics Fundamentals, Modern Electronics, and Your Career",
    body: "Fundamental, Traditional, Modern, and Advanced Electronics all matter, but in a specific order. The session covers what to learn first.",
    ctaLabel: "Understand the Correct Learning Direction",
  },
  {
    type: "explainer",
    heading: "What Does the Industry Actually Reward?",
    body: "Knowledge, problem solving, programming, communication. The session covers which of these actually gets rewarded, and why.",
    ctaLabel: "Discover What the Industry Values",
  },
  {
    type: "explainer",
    heading: "Can a Tier 3 College Student Get a Core Electronics Job?",
    body: "Your college's tier shouldn't decide your entire career. The session covers what extra effort actually helps.",
    ctaLabel: "Don't Let Your College's Tier End Your Hope",
  },
  {
    type: "explainer",
    heading: "I'm Not Fluent in English",
    body: "Clearly explaining a technical idea matters more than how polished it sounds. The session covers what companies actually expect.",
    ctaLabel: "Understand What Companies Actually Expect",
  },
  {
    type: "explainer",
    heading: "Is Private Coaching Necessary?",
    body: "Some coaching genuinely helps. Some is just a certificate. The session covers what to check before you pay for another course.",
    ctaLabel: "Understand Before Choosing a Course",
  },
  {
    type: "explainer",
    heading: "Internship, or Just an Internship Certificate?",
    body: "An internship should give you more than a piece of paper. The session covers how to prepare, choose, and use one properly.",
    ctaLabel: "Prepare for a Meaningful Internship",
  },
];

const reviewCards: ReviewCard[] = [
  {
    type: "review",
    name: "Tarang Srivas",
    designation: "M.Tech, VLSI Design & Embedded Systems, IIT Jammu, now Engineer 1 at Silicon Labs",
    shortSummary: "On moving from high-level board programming to real hardware understanding.",
    fullSummary:
      "I used to rely on high-level programming with Arduino, STM, and ESP boards, but your teachings helped me understand how things actually work under the hood.",
    image: "/images/student-linkedin-1.png",
    url: "https://www.linkedin.com/posts/tarang-srivas-b192ab213_siliconlabs-embeddedsystems-engineer-activity-7481286507979255809-nY98",
  },
  {
    type: "review",
    name: "IECC BIT Sathy",
    designation: "Session feedback, BIT Sathy",
    shortSummary: "On the clear roadmap and real-world direction the session gave students.",
    fullSummary:
      "An insightful session that gave students a clear roadmap, practical skills, and real-world direction to build a successful career in embedded systems.",
    image: "/images/student-linkedin-2.png",
    url: "https://www.linkedin.com/posts/iecc-bit_bitsathy-ieccbit-bitsathy-share-7450584647996035073-XmY7/",
  },
  {
    type: "review",
    name: "Monicka Balaji",
    designation: "ECE, semiconductor, and embedded systems session feedback",
    shortSummary: "On the real-world insights and clear career direction from the session.",
    fullSummary:
      "An inspiring interaction with a highly experienced industry expert, offering students real-world insights and clear direction for their future careers.",
    image: "/images/student-linkedin-3.png",
    url: "https://www.linkedin.com/posts/monicka-balaji-314a96326_ece-semiconductor-embeddedsystems-share-7448544821004353536-Dnu8/",
  },
  {
    type: "review",
    name: "Arivenkkataram ASJ",
    designation: "Course graduate",
    shortSummary: "On the spark to explore embedded systems beyond ready-made libraries.",
    fullSummary:
      "The Balajee Seshadri embedded systems course gave me the initial spark to explore embedded systems more deeply and to start thinking beyond ready-made libraries.",
    image: "/images/student-linkedin-4.png",
    url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7418715680449122304/",
  },
  {
    type: "review",
    name: "Swapnil Gade",
    designation: "Senior Software Engineer, Cybersecurity, Danfoss Power Solutions",
    shortSummary: "On how the teaching connects fundamentals to real field work.",
    fullSummary:
      "Balajee sir's teaching connects the fundamentals to how embedded systems actually work in the field, not just theory.",
    image: "/images/student-linkedin-5.png",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7451543195655581696/",
  },
  {
    type: "review",
    name: "Raghu Prakash",
    designation: "Course graduate",
    shortSummary: "On completing the eTalVis C Programming course.",
    fullSummary:
      "Shared his experience completing the eTalVis C Programming course, describing clear, well-organized sessions that built a practical understanding of C, electronics, and embedded concepts.",
    image: "/images/student-linkedin-6.png",
    url: "https://www.linkedin.com/posts/raghuprakash56_i-successfully-completed-the-etalvis-c-ugcPost-7416447755549687808-nHlb/",
  },
  {
    type: "review",
    name: "Adnan Hussain",
    designation: "Course graduate",
    shortSummary: "On going from doubt to building a 4-byte RAM.",
    fullSummary:
      "Posted about going from doubt to building a 4-byte RAM, describing it as a turning point in how he saw electronics.",
    image: "/images/student-linkedin-7.png",
    url: "https://www.linkedin.com/posts/adnanhuss53_electronicsengineering-careerinelectronics-ugcPost-7392646227038814208-_qIv/?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
  {
    type: "review",
    name: "B. Chandana",
    designation: "Course graduate",
    shortSummary: "On the gap between memorizing a formula and real understanding.",
    fullSummary:
      "Wrote about knowing the formula for Ohm's Law but not being able to solve real problems, and how the course revealed the gap between memorizing and understanding.",
    image: "/images/student-linkedin-8.png",
    url: "https://www.linkedin.com/posts/b-chandana-2885a2333_ohms-law-ugcPost-7454177003034791936-fki5/?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
];

export const cgSliderCards: SliderCard[] = [...explainerCards, ...reviewCards];

// ---------- Merged offer + foundation courses section ----------

export const cgWhatYouGet = {
  heading: "What You ",
  headingHighlight: "Get",
  headingAfter: " For This Session",
  items: [
    {
      title: "Live Webinar",
      body: "A live, doubt-clearing session with Balajee Seshadri, covering jobs, salary, specialization, interviews, and AI, straight from industry experience.",
    },
    {
      title: "Foundation Course Access",
      body: "Only attendees receive one month of Electronics Foundation course access, worth ₹999, sent by email after the session.",
    },
  ],
  subsectionHeading: "Why Are the Foundation Courses Needed?",
  subsectionBody:
    "This session helps you understand what matters for your career. But motivation alone doesn't take you anywhere after it ends. The Foundation courses give you a real next step, so you can start reviewing the fundamentals right away instead of waiting for a Monday that never comes.",
  ctaLabel: "Get the Session and Course Access for ₹99",
};

export const cgTrustStatement = {
  heading: "This Is Not a Job Promise",
  paragraphs: [
    "This is a career guidance and preparation session. It is not a placement program.",
    "It does not guarantee a job. It does not guarantee an internship. It does not guarantee a high salary. It does not guarantee an interview call. It does not guarantee selection at any company. No certificate here replaces actual skill.",
    "The purpose of this session is to help you understand the industry and prepare with a clearer direction, nothing more, nothing less.",
  ],
  ctaLabel: "Register if You're Ready to Understand and Prepare",
};

export const cgHowToRegister = [
  "Click the registration button.",
  "Complete the ₹99 payment.",
  "Get your registration confirmation.",
  "Receive the live session joining details.",
  "Attend the session on Sunday, August 2, 2026, 11:00 AM–1:00 PM IST.",
  "Receive the recording and Foundation course access as announced.",
];

export const cgFaqs = [
  {
    q: "Who can attend?",
    a: "Students entering first year, students anywhere from first year to final year, recent graduates, internship seekers, and Core Electronics job seekers.",
  },
  {
    q: "Which branches can attend?",
    a: "ECE, EEE, EIE, BME, Mechatronics, and other related Electronics branches.",
  },
  {
    q: "Can someone who just finished Class 12 attend?",
    a: "Yes. It'll help you understand the industry before you even begin your degree.",
  },
  {
    q: "Can final-year students attend?",
    a: "Yes. It can help you understand your present gaps and what to do about them.",
  },
  {
    q: "Can recent graduates attend?",
    a: "Yes, especially if you're actively searching for Core Electronics opportunities.",
  },
  { q: "Will the session cover starting salary?", a: "Yes." },
  { q: "Will it cover CGPA requirements?", a: "Yes." },
  { q: "Will it address Tier 3 college students specifically?", a: "Yes." },
  { q: "Will it address English communication concerns?", a: "Yes." },
  { q: "Will it discuss private coaching?", a: "Yes." },
  { q: "Will it explain how to choose a specialization?", a: "Yes." },
  {
    q: "Will it cover getting interview calls and clearing interviews?",
    a: "Yes. Both are treated as separate problems.",
  },
  { q: "Will it address internships?", a: "Yes." },
  { q: "Will it address AI and Core Electronics jobs?", a: "Yes." },
  { q: "Will I get the recording?", a: "Yes, for one month." },
  {
    q: "What exactly is included with the ₹99 registration?",
    a: "The live session, one month of recording access, and one month of Electronics Foundation course access worth ₹999.",
  },
  {
    q: "Does this guarantee a job or internship?",
    a: "No. This is a career guidance and preparation session, not a placement program.",
  },
  {
    q: "How will I get the joining link?",
    a: "You'll receive it by WhatsApp and email after registration.",
  },
];

export const cgWhySessionExists = {
  heading: "Why This Session Exists",
  openingStatement:
    "Most Electronics students don't get a clear picture of the industry until it's too late to act on it. This session exists to close that gap early, with real industry perspective, not motivation.",
  stageLines: [
    { before: "You may be in your ", underline: "final year", after: ", feeling the pressure already." },
    { before: "You may have ", underline: "just finished 12th", after: " and chosen an Electronics branch." },
    { before: "You may have ", underline: "graduated", after: " and be searching for your first real opportunity." },
    { before: "You may be in ", underline: "second or third year", after: ", still deciding your path." },
  ],
  intro: "Wherever you are, you still need to understand the industry, understand where you stand, and understand what to do next.",
  reassuranceLines: [
    { before: "Don't lose hope because of your ", underline: "college's tier", after: "." },
    { before: "Don't lose hope because your ", underline: "English isn't perfect", after: "." },
    { before: "Don't lose hope because you ", underline: "started late", after: "." },
    { before: "Don't make a random decision just because ", underline: "AI is changing the industry", after: "." },
  ],
  closingBefore: "Understand first. Then ",
  closingHighlight1: "choose",
  closingMid: ". Then ",
  closingHighlight2: "prepare",
  closingAfter: ". Here's what that looks like, depending on where you are.",
  ctaLabel: "See Where You Stand",
};