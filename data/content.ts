export interface NavItem {
  label: string;
  href: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Classes", href: "/classes" },
  { label: "Trainers", href: "/trainers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const BRAND = {
  name: "GYM",
  subtitle: "Elite Fitness Club",
  tagline: "Strength, refined.",
  phone: "+91 98765 43210",
  email: "hello@gymfitness.com",
  address: "12 Ring Road, Surat, Gujarat 395007",
  hours: {
    weekdays: "Monday – Saturday: 5:00 AM – 11:00 PM",
    sunday: "Sunday: 6:00 AM – 8:00 PM",
  },
};

export const HERO_CONTENT = {
  headline: "Forge your strongest self.",
  subheadline:
    "A private training experience built around your body, your goals, and your pace. Science-led coaching in a space designed for serious work.",
  primaryCta: "Start your free trial",
  secondaryCta: "Explore classes",
  stats: [
    { value: 5000, suffix: "+", label: "Members" },
    { value: 40, suffix: "+", label: "Expert coaches" },
    { value: 120, suffix: "+", label: "Weekly classes" },
    { value: 12, suffix: " yrs", label: "Of excellence" },
  ],
};

export const MARQUEE_ITEMS = [
  "Strength",
  "Mobility",
  "Power",
  "Recovery",
  "Discipline",
  "Community",
];

export const ABOUT_CONTENT = {
  heading: "Not a gym. A standard.",
  paragraph1:
    "GYM was founded on one belief: serious training deserves a serious environment. No crowded floors, no guesswork, no shortcuts.",
  paragraph2:
    "Every member starts with a movement assessment and a plan built by a certified coach. From there, we track, adjust, and push you further every week.",
  badge: "12 years. 5,000+ members.",
  values: [
    {
      title: "Precision",
      description: "Data-backed programming that adapts to your progress.",
    },
    {
      title: "Discipline",
      description: "Structure and accountability that keep you consistent.",
    },
    {
      title: "Community",
      description: "A respectful, driven crowd that raises your standard.",
    },
  ],
};

export interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All levels";
  benefits: [string, string, string];
  image: string;
}

export const PROGRAMS: Program[] = [
  {
    id: "strength",
    title: "Strength Training",
    description: "Progressive barbell and machine programming for raw strength.",
    duration: "60 min",
    level: "Intermediate",
    benefits: ["Muscle growth", "Joint stability", "Measurable progress"],
    image: "/images/athletic/barbell-dark-gym.jpg",
  },
  {
    id: "fat-loss",
    title: "Fat Loss Lab",
    description: "Metabolic conditioning paired with nutrition guidance.",
    duration: "45 min",
    level: "Beginner",
    benefits: ["Higher energy", "Sustainable habits", "Body composition tracking"],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "functional",
    title: "Functional Fitness",
    description: "Move better in everyday life and sport.",
    duration: "50 min",
    level: "All levels",
    benefits: ["Balance", "Core strength", "Injury resilience"],
    image: "/images/athletic/kettlebell-close.jpg",
  },
  {
    id: "yoga",
    title: "Yoga & Mobility",
    description: "Restore range of motion and calm the nervous system.",
    duration: "60 min",
    level: "All levels",
    benefits: ["Flexibility", "Better posture", "Stress relief"],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "hiit",
    title: "HIIT Ignite",
    description: "Short, intense intervals that leave nothing in the tank.",
    duration: "30 min",
    level: "Advanced",
    benefits: ["Endurance", "Calorie burn", "Mental toughness"],
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "personal",
    title: "Personal Coaching",
    description: "One-on-one sessions built entirely around you.",
    duration: "60 min",
    level: "All levels",
    benefits: ["Custom plan", "Form correction", "Direct accountability"],
    image: "/images/athletic/chalk-hands.jpg",
  },
];

export interface MethodStep {
  step: number;
  title: string;
  description: string;
}

export const METHOD_STEPS: MethodStep[] = [
  {
    step: 1,
    title: "Assess",
    description: "A full movement and body composition scan on day one.",
  },
  {
    step: 2,
    title: "Plan",
    description: "Your coach builds a program around your goal and schedule.",
  },
  {
    step: 3,
    title: "Train",
    description: "Guided sessions with live feedback and progressive overload.",
  },
  {
    step: 4,
    title: "Evolve",
    description: "Monthly reviews adjust your plan as you improve.",
  },
];

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  certifications: string;
  image: string;
}

export const TRAINERS: Trainer[] = [
  {
    id: "aarav",
    name: "Aarav Mehta",
    role: "Head Strength Coach",
    experience: "11 years",
    bio: "Former national powerlifter who coaches with patience and precision.",
    certifications: "NSCA-CSCS, Precision Nutrition L1",
    image: "/images/athletic/coach-aarav.jpg",
  },
  {
    id: "riya",
    name: "Riya Shah",
    role: "Mobility & Yoga Lead",
    experience: "9 years",
    bio: "Blends yoga, physiotherapy principles, and breathwork.",
    certifications: "RYT-500, FRC Mobility",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "kabir",
    name: "Kabir Nair",
    role: "Performance & HIIT Coach",
    experience: "8 years",
    bio: "Builds explosive athletes and confident beginners alike.",
    certifications: "ACE-CPT, CrossFit L2",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "sana",
    name: "Sana Kapoor",
    role: "Nutrition & Fat Loss Coach",
    experience: "7 years",
    bio: "Turns complicated nutrition into simple daily habits.",
    certifications: "ISSN-SNS, Precision Nutrition L2",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=900&auto=format&fit=crop",
  },
];

export interface Facility {
  id: string;
  title: string;
  description: string;
  image: string;
  colSpan?: string;
}

export const FACILITIES: Facility[] = [
  {
    id: "strength-zone",
    title: "Strength Zone",
    description: "Olympic platforms, calibrated plates, and premium machines.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    id: "cardio-deck",
    title: "Cardio Deck",
    description: "Skyline-facing treadmills, rowers, and air bikes.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    id: "recovery-lounge",
    title: "Recovery Lounge",
    description: "Compression boots, foam rolling, and guided stretching.",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    id: "steam-sauna",
    title: "Steam & Sauna",
    description: "Reset after training in private heat rooms.",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    id: "lockers",
    title: "Luxury Locker Rooms",
    description: "Private showers, towels, and complimentary amenities.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    id: "nutrition-bar",
    title: "Nutrition Bar",
    description: "Protein shakes and clean meals made fresh daily.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  plan: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The most professional gym I've trained at. Clean, quiet, and every coach knows your name.",
    author: "Neha P.",
    plan: "Performance member",
  },
  {
    quote: "The assessment on day one changed how I train. I finally have a clear plan.",
    author: "Karan S.",
    plan: "Essential member",
  },
  {
    quote: "Recovery lounge plus personal coaching is worth every rupee.",
    author: "Meera D.",
    plan: "Elite member",
  },
  {
    quote: "Classes are tough but the coaches keep it safe and motivating.",
    author: "Arjun T.",
    plan: "Performance member",
  },
];

export const RESULTS_STORIES = [
  {
    name: "Rohan",
    duration: "12 weeks",
    focus: "Strength",
    quote: "I stopped guessing and started following a plan. My lifts went up every single week.",
  },
  {
    name: "Ishita",
    duration: "16 weeks",
    focus: "Fat Loss",
    quote: "The coaching and nutrition support made it feel achievable, not punishing.",
  },
  {
    name: "Devansh",
    duration: "10 weeks",
    focus: "Performance",
    quote: "My stamina and posture changed faster than I expected.",
  },
];

export const NUTRITION_RECOVERY = [
  {
    title: "Nutrition Coaching",
    description: "Personalized macronutrient guidance and meal pacing designed around your metabolism.",
    linkText: "Book now",
  },
  {
    title: "Recovery Sessions",
    description: "Normatec compression therapy, hyperice percussion, and guided mobility protocols.",
    linkText: "Book now",
  },
  {
    title: "Body Composition Scans",
    description: "Medical-grade bioimpedance scans tracking visceral fat, skeletal muscle, and symmetry.",
    linkText: "Book now",
  },
];

export const FAQS = [
  {
    question: "Do I need experience to join?",
    answer: "No. Every member starts with an assessment and a plan matched to their level.",
  },
  {
    question: "What is included in the free trial?",
    answer: "Three days of gym access, one group class, and a movement assessment.",
  },
  {
    question: "Can I freeze my membership?",
    answer: "Yes. Freeze for up to 60 days per year at no cost.",
  },
  {
    question: "How do I cancel?",
    answer: "Give 30 days' notice at the front desk or through the app.",
  },
  {
    question: "Are personal trainers included?",
    answer: "Personal training is included in Elite and available as an add-on for other plans.",
  },
  {
    question: "What are your opening hours?",
    answer: "Monday to Saturday 5:00 AM to 11:00 PM, Sunday 6:00 AM to 8:00 PM.",
  },
  {
    question: "Is parking available?",
    answer: "Yes, free member parking is available on site.",
  },
  {
    question: "Do you offer student or corporate rates?",
    answer: "Yes. Contact us for student and team memberships.",
  },
];
