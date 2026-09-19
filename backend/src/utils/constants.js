const STAFF_ROLES = ["academic", "administrative", "society", "system-admin"];

const ALL_ROLES = ["student", ...STAFF_ROLES];

const FACULTIES = [
  "Faculty of Computing",
  "Faculty of Business",
  "Faculty of Engineering",
  "Faculty of Humanities & Social Sciences",
  "Faculty of Law",
];

const YEAR_GROUPS = ["Year 1", "Year 2", "Year 3", "Year 4"];

const PROGRAMMES = [
  "BSc (Hons) Computer Science",
  "BSc (Hons) Software Engineering",
  "BBA (Hons) Business Management",
  "BEng (Hons) Civil Engineering",
  "LLB (Hons) Law",
  "BA (Hons) Psychology",
];

// Who an announcement is delivered to. "university-wide" reaches everyone;
// the others are matched against the viewing student's own faculty/yearGroup/programme.
const AUDIENCE_TYPES = ["university-wide", "faculty", "year-group", "programme"];

const INFO_CATEGORIES = [
  "faq",
  "calendar",
  "onboarding",
  "volunteering",
  "alumni",
  "jobs",
  "staff-directory",
  "financial-support",
  "sports",
  "dining",
  "printing",
  "wellbeing",
  "it-support",
  "library",
  "student-life",
];

module.exports = { STAFF_ROLES, ALL_ROLES, INFO_CATEGORIES, FACULTIES, YEAR_GROUPS, PROGRAMMES, AUDIENCE_TYPES };