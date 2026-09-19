const { contextToText } = require("./assistantContext");

// Where each feature lives in the app. This is navigation guidance (how to get
// around the hub), not campus content — the content itself always comes from the
// database via the assistant context.
const FEATURE_GUIDE = [
  { keywords: ["lost", "found", "missing", "misplaced"], answer: "You can report or search for lost items on the Lost & Found page — it has a search box and a lost/found filter." },
  { keywords: ["book", "room", "study space", "classroom", "booking"], answer: "You can check room availability and request a booking on the Room Booking page. Administrative staff approve or reject requests." },
  { keywords: ["event", "what's on", "whats on"], answer: "Upcoming events are on the Events page, where you can also mark that you're interested." },
  { keywords: ["guest lecture", "workshop", "industry talk"], answer: "Guest lectures and workshops are on the Events page — use the category tabs to show only those." },
  { keywords: ["announcement", "news", "update"], answer: "Official announcements are on the Announcements page. You'll see university-wide notices plus anything targeted at your faculty, programme or year group." },
  { keywords: ["emergency", "urgent", "safety", "closure", "closed"], answer: "Emergency notices and closures are posted as urgent announcements on the Announcements page." },
  { keywords: ["calendar", "exam", "deadline", "semester", "add/drop", "term date"], answer: "Key term dates, exam periods and deadlines are on the Academic Calendar page." },
  { keywords: ["society", "societies", "club"], answer: "You can browse student societies and join them on the Societies page." },
  { keywords: ["support", "tutor", "tutoring", "mentor", "study group"], answer: "You can request a study group, peer tutoring or mentorship on the Academic Support page, and staff will respond there." },
  { keywords: ["facility", "maintenance", "broken", "repair", "leak"], answer: "You can report maintenance or facility problems on the Facility Issues page and track your own reports." },
  { keywords: ["textbook", "book exchange", "second-hand", "second hand"], answer: "Second-hand textbooks are on the Textbook Exchange page, and each listing shows who to contact." },
  { keywords: ["feedback", "complain", "suggestion"], answer: "You can send feedback or ask a question on the Feedback page — staff can reply and you'll see their response there." },
  { keywords: ["faq", "question"], answer: "Common questions are answered on the FAQ page, under Info & Resources." },
  { keywords: ["onboarding", "new student", "first year", "fresher"], answer: "Guidance for new and first-year students is on the Student Onboarding page, under Info & Resources." },
  { keywords: ["volunteer", "community"], answer: "Volunteering and community engagement opportunities are listed under Info & Resources." },
  { keywords: ["alumni", "graduate"], answer: "Alumni activities and opportunities are listed under Info & Resources." },
  { keywords: ["job", "internship", "placement", "career"], answer: "Part-time jobs, internships and placements are listed under Jobs & Internships in Info & Resources." },
  { keywords: ["staff directory", "contact", "lecturer contact", "department"], answer: "Staff and departmental contacts are in the Staff Directory, under Info & Resources." },
  { keywords: ["financial", "scholarship", "fee", "aid", "bursary"], answer: "Scholarship, financial aid and fee support information is under Financial Support in Info & Resources." },
  { keywords: ["sport", "gym", "recreation", "fitness"], answer: "Sports and recreation facility information is under Info & Resources." },
  { keywords: ["dining", "canteen", "cafeteria", "food", "menu"], answer: "Canteen menus and opening hours are under Dining Information in Info & Resources." },
  { keywords: ["print", "photocopy", "copying", "stationery"], answer: "Printing and copying services are listed under Info & Resources." },
  { keywords: ["wellbeing", "counsel", "mental health", "stress"], answer: "Wellbeing and counselling support information is under Info & Resources." },
  { keywords: ["it support", "wifi", "wi-fi", "password", "laptop", "network"], answer: "IT and technical support information is under Info & Resources." },
  { keywords: ["library", "borrow", "opening hours"], answer: "Library resources, opening hours and borrowing information are under Info & Resources." },
  { keywords: ["student life", "highlight", "achievement"], answer: "Past events and student achievements are under Student Life Highlights in Info & Resources." },
];

const matchesQuestion = (question, text) => {
  if (!text) return false;
  const haystack = String(text).toLowerCase();
  return question
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3)
    .some((word) => haystack.includes(word));
};

// Offline mode: answer from the real data we already loaded, then fall back to
// pointing the student at the right page.
const getFallbackAnswer = (question, context) => {
  if (context) {
    const hits = [];

    context.announcements
      .filter((a) => matchesQuestion(question, `${a.title} ${a.message}`))
      .slice(0, 2)
      .forEach((a) => hits.push(`Announcement — ${a.title}: ${a.message}`));

    context.events
      .filter((e) => matchesQuestion(question, `${e.title} ${e.category} ${e.guestName || ""} ${e.location || ""}`))
      .slice(0, 2)
      .forEach((e) =>
        hits.push(
          `Event — ${e.title}${e.date ? ` on ${new Date(e.date).toLocaleDateString("en-GB")}` : ""}${
            e.location ? ` at ${e.location}` : ""
          }`
        )
      );

    context.infoItems
      .filter((i) => matchesQuestion(question, `${i.category} ${i.title} ${i.body}`))
      .slice(0, 3)
      .forEach((i) => hits.push(`${i.title}: ${i.body}`));

    context.societies
      .filter((s) => matchesQuestion(question, `${s.name} ${s.description}`))
      .slice(0, 2)
      .forEach((s) => hits.push(`Society — ${s.name}: ${s.description || "No description yet."}`));

    if (hits.length) {
      return hits.join("\n\n");
    }
  }

  const lower = question.toLowerCase();
  const guide = FEATURE_GUIDE.find((entry) => entry.keywords.some((k) => lower.includes(k)));
  return guide
    ? guide.answer
    : "I couldn't find anything matching that in the hub yet. You can browse Announcements, the Academic Calendar, Events, Societies, Lost & Found, Room Booking, Academic Support, or the Info & Resources pages from the sidebar.";
};

const buildPrompt = (question, context) => {
  const contextText = context ? contextToText(context) : "";

  return [
    "You are the Campus Assistant for UCL Campus Hub, a student portal for Universal College Lanka.",
    "Answer the student's question using ONLY the campus information provided below.",
    "If the information below does not contain the answer, say so plainly and point them to the most relevant page in the hub (Announcements, Academic Calendar, Events, Societies, Lost & Found, Room Booking, Academic Support, Facility Issues, Textbook Exchange, Feedback, or Info & Resources).",
    "Never invent dates, names, room numbers or deadlines that are not listed below.",
    "Answer in at most 4 short sentences, in a friendly and direct tone.",
    "",
    "--- CAMPUS INFORMATION ---",
    contextText || "(No campus content has been published yet.)",
    "--- END CAMPUS INFORMATION ---",
    "",
    `Student question: ${question}`,
  ].join("\n");
};

const askAI = async (question, context = null) => {
  if (!process.env.AI_API_KEY) {
    return getFallbackAnswer(question, context);
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.AI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: buildPrompt(question, context) }] }],
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("AI API error:", response.status, data.error?.message || data);
      return getFallbackAnswer(question, context);
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || getFallbackAnswer(question, context);
  } catch (error) {
    console.error("AI API request failed:", error.message);
    return getFallbackAnswer(question, context);
  }
};

module.exports = { askAI };
