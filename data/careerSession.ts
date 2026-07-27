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
  subhead:
    "Job opportunities, starting pay, choosing a specialization, getting an internship, clearing interviews, and where Artificial Intelligence fits in. Straight talk, not motivation.",
  audienceLine:
    "For final-year students, students who just finished 12th and chose ECE, EEE, EIE, BME or Mechatronics, recent graduates, and 2nd and 3rd year students.",
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
};

export const cgStageCards: StageCard[] = [
  {
    title: "Final-Year Student",
    body: "Placements are close. Before you collect one more certificate or panic over one more rejection, understand what's actually missing and what can still be fixed in the time you have.",
    ctaLabel: "Get a Clearer Direction",
  },
  {
    title: "Just Completed Class 12",
    body: "You've chosen an Electronics branch. Before you accept everyone else's opinion about whether that was the right call, understand the industry you're actually walking into.",
    ctaLabel: "Begin With Clarity",
  },
  {
    title: "First-Year Student",
    body: "You don't need to learn everything on day one. But you should understand why fundamentals and daily practice, started now, matter more than they'll seem to for the next three years.",
    ctaLabel: "Start With the Right Direction",
  },
  {
    title: "Recent Graduate",
    body: "If interview calls aren't coming, or interviews aren't converting, there's usually a specific reason. Understand what it might be before you send out another hundred resumes.",
    ctaLabel: "Identify What May Be Missing",
  },
  {
    title: "Second-Year Student",
    body: "You've finished a few semesters. Understand how what you've studied connects to actual industry roles, and how to choose a specialization without guessing.",
    ctaLabel: "Understand Before Choosing",
  },
  {
    title: "Third-Year Student",
    body: "Internships and placements are approaching fast. Understand where you actually stand before joining a random course or collecting another certificate that won't help.",
    ctaLabel: "Prepare Before the Pressure",
  },
  {
    title: "Internship or Job Seeker",
    body: "Understand whether you're applying to the right kind of roles, and whether your preparation actually matches what those roles expect.",
    ctaLabel: "Prepare for the Right Opportunity",
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

export const cgSpecialization = {
  heading: "Which Specialization Is Right for You?",
  paragraphs: [
    "Not every Electronics student needs to walk the same path. What works for one student may not work for another.",
    "A trending topic on social media shouldn't decide your specialization. A training institute's ad shouldn't decide it either. Neither should your friend's choice.",
    "The right call depends on the kind of work you want, the fundamentals you'll need, your interest, your ability, and how much time you actually have to prepare.",
    "This session will help you start choosing with real understanding, not a guess.",
  ],
  ctaLabel: "Choose With Understanding",
};

export const cgFundamentals = {
  heading: "Electronics Fundamentals, Modern Electronics, and Your Career",
  paragraphs: [
    "Students hear a lot of technical terms thrown around. What's harder to find is a clear answer on what to learn first.",
    "Balajee Seshadri regularly breaks this down into four levels: Fundamental Electronics, Traditional Electronics, Modern Electronics, and Advanced Electronics.",
    "Why do some students clear tough subjects but fail basic interview questions? Why do some students finish advanced courses and still aren't ready for industry work? What should be learned first? What should be practiced daily?",
    "These get addressed in the session, not fully answered here.",
  ],
  ctaLabel: "Understand the Correct Learning Direction",
};

export const cgRewardedSkill = {
  heading: "What Does the Industry Actually Reward?",
  paragraphs: [
    "Students are told to learn every tool, finish every course, collect every certificate.",
    "But what does the industry actually pay for? Is it knowledge? Problem solving? Programming? Circuit understanding? Debugging? Communication? The ability to learn fast and become useful quickly?",
    "The session addresses which of these actually gets rewarded, and why it's worth practicing early instead of later.",
  ],
  ctaLabel: "Discover What the Industry Values",
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

export const cgTier3 = {
  heading: "Can a Tier 3 College Student Get a Core Electronics Job?",
  paragraphs: [
    "A lot of students lose confidence because of their college's name. Maybe there's no strong placement support. Maybe there's little industry exposure. Maybe it feels like good Core Electronics opportunities only go to students from top-tier colleges.",
    "Should your college's tier decide your entire career? What extra effort does a Tier 3 student actually need to put in? How do you become visible to companies beyond your campus placement drive?",
    "This gets addressed honestly in the session.",
  ],
  ctaLabel: "Don't Let Your College's Tier End Your Hope",
};

export const cgEnglish = {
  heading: "I'm Not Fluent in English",
  paragraphs: [
    "Plenty of students understand the technical material fine but lose confidence the moment an interview starts. Some believe they need flawless English or a certain accent to land a good job.",
    "What level of communication does the industry actually expect? How much does clearly explaining a technical idea matter, compared to how polished it sounds? Can you improve this alongside your technical prep, not instead of it?",
    "This gets addressed in the session.",
  ],
  ctaLabel: "Understand What Companies Actually Expect",
};

export const cgCoaching = {
  heading: "Is Private Coaching Necessary?",
  paragraphs: [
    "Every other ad online is a different course claiming to be the only path to a Core Electronics job. Some of them genuinely offer structure and feedback. Some offer a certificate and not much else.",
    "When is coaching actually worth it? When is disciplined self-study enough? What should you check before paying for any course?",
    "This session will help you think it through before your next training decision.",
  ],
  ctaLabel: "Understand Before Choosing a Course",
};

export const cgInternship = {
  heading: "Internship, or Just an Internship Certificate?",
  paragraphs: [
    "A lot of students look for an internship purely for the certificate. But an internship is supposed to give you more than a piece of paper.",
    "How should you prepare before joining one? When are you actually ready? How do you pick the right one, and use it properly once you're in it?",
    "Balajee Seshadri has written about this directly, pointing out that many students approach companies asking for an internship without knowing how to show they're ready for real industry experience, not just theory. The session will unpack this in more detail.",
  ],
  ctaLabel: "Prepare for a Meaningful Internship",
};

export const cgAI = {
  heading: "Will AI Replace Core Electronics Jobs?",
  paragraphs: [
    "AI is changing engineering work. Some tasks get faster. Some things get automated. What's expected from a fresh graduate is shifting too.",
    "But what does this actually mean for you? Which jobs are likely to change? Which skills become more valuable, not less? Should you be learning to use AI tools yourself? Can AI replace strong Electronics fundamentals and real engineering judgment?",
    "Balajee Seshadri will address this from the perspective of someone who's actually worked in the industry, not from a headline.",
  ],
  ctaLabel: "Understand the Future Without the Fear",
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
  photo: "/images/balajee-casual.png",
  bio: [
    "40+ years in the Electronics Industry. Professional experience in India, plus work in the USA, Germany, and Canada.",
    "Balajee Seshadri writes regularly about Electronics careers, industry expectations, fundamentals, modern skills, internships, interviews, and the real problems students face.",
    "His guidance is direct. He doesn't hide the hard parts. He doesn't promise shortcuts. He asks students to understand where they actually stand, strengthen the fundamentals that matter, and prepare consistently from there.",
  ],
  ctaLabel: "Learn From 40+ Years of Industry Experience",
};

export type LinkedInProofPost = {
  summary: string;
  url: string;
};

export const cgInstructorLinkedInPosts: LinkedInProofPost[] = [
  {
    summary:
      "On getting the interview versus clearing it: students need to be strong in Modern Electronics to get an interview call, and strong in Electronics Fundamentals to actually clear it. Most students are only good at one of the two, rarely both.",
    url: "https://www.linkedin.com/posts/balajeeseshadri_dear-electronics-students-please-work-activity-7467906373364649984-XXyA",
  },
  {
    summary:
      "On Fundamental, Traditional, Modern, and Advanced Electronics: breaking the field into Board Design, Chip Design, Software Development, and Signal Processing, and why students waste time mastering the wrong mix for the job they actually want.",
    url: "https://www.linkedin.com/posts/balajeeseshadri_dear-electronics-students-every-electronics-activity-7454765093902491650-ogIN",
  },
  {
    summary:
      "On internships: many students approach him asking for an internship purely on the basis of theory and college projects, without understanding what real industry experience actually requires.",
    url: "https://www.linkedin.com/posts/balajeeseshadri_dear-electronics-students-many-electronics-activity-7387401474684805120-XL32",
  },
];

// Student LinkedIn proof (separate section from general testimonials)
export const cgStudentLinkedInProof = [
  {
    name: "Raghu Prakash",
    summary:
      "Shared his experience completing the eTalVis C Programming course, describing clear, well-organized sessions that built a practical understanding of C, electronics, and embedded concepts.",
    url: "https://www.linkedin.com/posts/raghu-prakash-775331380_i-successfully-completed-the-etalvis-c-activity-7416447756665270272-XWXK/?skipRedirect=true",
  },
  {
    name: "Adnan Huss",
    summary:
      "Posted about going from doubt to building a 4-byte RAM, describing it as a turning point in how he saw electronics.",
    url: "https://www.linkedin.com/posts/adnanhuss53_electronicsengineering-careerinelectronics-ugcPost-7392646227038814208-_qIv/?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
  {
    name: "B. Chandana",
    summary:
      "Wrote about knowing the formula for Ohm's Law but not being able to solve real problems, and how the course revealed the gap between memorizing and understanding.",
    url: "https://www.linkedin.com/posts/b-chandana-2885a2333_ohms-law-activity-7454177004234612736-vl5_?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
];

export const cgTestimonials = [
  {
    name: "Tarang Srivas",
    title: "M.Tech, VLSI Design & Embedded Systems, IIT Jammu, now Engineer 1 at Silicon Labs",
    quote:
      "I used to rely on high-level programming with Arduino, STM, and ESP boards, but your teachings helped me understand how things actually work under the hood.",
    link: "https://www.linkedin.com/in/tarang-srivas-b192ab213/",
  },
  {
    name: "IECC BIT Sathy",
    title: "Session feedback, BIT Sathy",
    quote:
      "An insightful session that gave students a clear roadmap, practical skills, and real-world direction to build a successful career in embedded systems.",
    link: "https://www.linkedin.com/posts/iecc-bit_bitsathy-ieccbit-bitsathy-activity-7450584649317154816-dbIZ?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
  {
    name: "Monicka Balaji",
    title: "ECE, semiconductor, and embedded systems session feedback",
    quote:
      "An inspiring interaction with a highly experienced industry expert, offering students real-world insights and clear direction for their future careers.",
    link: "https://www.linkedin.com/posts/monicka-balaji-314a96326_ece-semiconductor-embeddedsystems-share-7448544821004353536-Dnu8/?utm_source=share&utm_medium=member_android&rcm=ACoAAACrmmAB1CnpWBfLMw9RgOnMilkUlTLbRts",
  },
  {
    name: "Arivenkkataram ASJ",
    title: "Course graduate",
    quote:
      "The Balajee Seshadri embedded systems course gave me the initial spark to explore embedded systems more deeply and to start thinking beyond ready-made libraries.",
    link: "https://www.linkedin.com/in/arivenkkataram-asj/",
  },
  {
    name: "Swapnil Gade",
    title: "Senior Software Engineer, Cybersecurity, Danfoss Power Solutions",
    quote:
      "Balajee sir's teaching connects the fundamentals to how embedded systems actually work in the field, not just theory.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7451543195655581696/?skipRedirect=true",
  },
];

export const cgOffer = {
  heading: "What You'll Receive for ₹99",
  items: [
    "Live online Core Electronics Career Guidance Session",
    "Answers to real questions about jobs, salary, specialization, CGPA, English, coaching, internships, and AI",
    "Guidance from someone with 40+ years of industry experience",
    "1-month recorded session access",
    "1-month Electronics Foundation course access, worth ₹999",
  ],
  ctaLabel: "Register for ₹99",
};

export const cgWhyFoundation = {
  heading: "Why Are the Foundation Courses Included?",
  paragraphs: [
    "This session will help you understand what matters for your career. But after the session, motivation alone doesn't take you anywhere. You need a next step.",
    "That's why registered students also get one month of access to the Electronics Foundation courses, so you can start reviewing the fundamentals right away instead of waiting for a Monday that never comes.",
  ],
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

export const cgFinalCta = {
  heading: "Understand the Industry Before Choosing Your Next Step",
  paragraphs: [
    "You may be in your final year, feeling the pressure already.",
    "You may have just finished 12th and chosen an Electronics branch.",
    "You may have graduated and be searching for your first real opportunity.",
    "You may be in second or third year, still deciding your path.",
    "Wherever you are, you still need to understand the industry, understand where you stand, and understand what to do next.",
    "Don't lose hope because of your college's tier. Don't lose hope because your English isn't perfect. Don't lose hope because you started late. Don't make a random decision just because AI is changing the industry.",
    "Understand first. Then choose. Then prepare.",
  ],
  ctaLabel: "Register Now for ₹99",
};

// Foundation courses for the slider (reusing existing course data structure)
export const cgFoundationCourses = [
  {
    number: 1,
    tag: "Electronics",
    title: "Electronics Foundation Course",
    description:
      "Electrical Fundamentals, Electronics Fundamentals, Number Systems, Digital Electronics.",
  },
  {
    number: 2,
    tag: "Programming",
    title: "C Programming Foundation Course",
    description:
      "Introduction to Programming, Introduction to C Programming, Simple Programming Practice, Decision Making and Loops, Arrays, Strings, and Pointers, Structures, Storage Class. 200+ problems to solve.",
  },
  {
    number: 3,
    tag: "Hardware",
    title: "Embedded Hardware Foundation Course",
    description:
      "Microprocessor, Memory Map, Controller, Microcontroller, Introduction to Embedded Systems.",
  },
  {
    number: 4,
    tag: "GPIO",
    title: "Embedded Software Foundation Course, GPIO",
    description:
      "Introduction, Controlling LEDs, Controlling 7 Segment Displays, Monitoring Push Button Switches, Reading Keypad Matrix, Controlling Dot-Matrix.",
  },
  {
    number: 5,
    tag: "Controllers",
    title: "Embedded Software Foundation Course, Controllers",
    description:
      "LED Controller, LCD Controller, Timer Controller, Interrupt Controller, DMA, DAC, ADC Controllers, PWM, Controlling Relays and Motors. 18 chapters in total.",
  },
  {
    number: 6,
    tag: "Protocols",
    title: "Embedded Software Foundation Course, Interface Protocols",
    description: "Introduction to BUS, UART, I2C, SPI.",
  },
  {
    number: 7,
    tag: "Internals",
    title: "Microprocessor Internals Foundation Course",
    description:
      "Internals of the microprocessor, How an instruction is decoded. Exclusive to the eTalVis platform, 2.5 hours, fully animated.",
  },
  {
    number: 8,
    tag: "Microprocessor",
    title: "8085 Microprocessor Foundation Course",
    description: "8085 Introduction, 8085 Software, 8085 Peripheral Interface, Assessment.",
  },
  {
    number: 9,
    tag: "ARM",
    title: "ARM Controller Foundation Course",
    description: "Why the ARM Processor came to be, ARM Microprocessor, ARM Microcontroller.",
  },
  {
    number: 10,
    tag: "Networking",
    title: "Networking Concepts Foundation Course",
    description:
      "Serial Communication, Synchronous Communication, Introduction to Ethernet, PHY, MAC, IP, TCP, Hub, Switch, Router, Gateway, ARP and NAT.",
  },
];