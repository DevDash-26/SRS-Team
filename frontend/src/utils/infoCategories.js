// Presentation metadata for the info categories the backend already serves
// (INFO_CATEGORIES in backend/src/utils/constants.js). The entries themselves
// always come from the database.
export const INFO_CATEGORIES = [
  { slug: "faq", label: "FAQ", description: "Answers to the questions students ask most often." },
  { slug: "calendar", label: "Academic Calendar", description: "Term dates, exam periods and deadlines." },
  { slug: "onboarding", label: "Student Onboarding", description: "Getting started as a new or first-year student." },
  { slug: "volunteering", label: "Volunteering Opportunities", description: "Community engagement and volunteering." },
  { slug: "alumni", label: "Alumni Engagement", description: "Alumni activities and opportunities." },
  { slug: "jobs", label: "Jobs & Internships", description: "Part-time jobs, internships and placements." },
  { slug: "staff-directory", label: "Staff Directory", description: "Staff and departmental contacts." },
  { slug: "financial-support", label: "Financial Support", description: "Scholarships, financial aid and fee support." },
  { slug: "sports", label: "Sports & Recreation", description: "Facilities, clubs and how to access them." },
  { slug: "dining", label: "Dining Information", description: "Canteen menus and opening hours." },
  { slug: "printing", label: "Printing Services", description: "Printing, copying and stationery on campus." },
  { slug: "wellbeing", label: "Wellbeing Support", description: "Counselling and student wellbeing services." },
  { slug: "it-support", label: "IT Support", description: "Wi-Fi, accounts and technical help." },
  { slug: "library", label: "Library Resources", description: "Opening hours, borrowing and resources." },
  { slug: "student-life", label: "Student Life Highlights", description: "Past events and student achievements." },
];

export const getInfoCategory = (slug) => INFO_CATEGORIES.find((c) => c.slug === slug);
