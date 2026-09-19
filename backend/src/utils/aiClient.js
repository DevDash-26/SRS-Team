// Simple keyword-based fallback so the assistant works immediately,
// even before a real AI API key is added.
const FALLBACK_ANSWERS = [
  { keywords: ["lost", "found"], answer: "You can report or search for lost items on the Lost & Found page." },
  { keywords: ["book", "room", "study"], answer: "You can check room availability and request a booking on the Room Booking page." },
  { keywords: ["event"], answer: "You can see upcoming events and mark your interest on the Events page." },
  { keywords: ["financial", "scholarship", "fee"], answer: "Financial support information is listed under Financial Support in the info section." },
  { keywords: ["society", "club"], answer: "You can browse and join student societies on the Societies page." },
  { keywords: ["library"], answer: "Library resources and opening hours are listed under Library Resources." },
  { keywords: ["wellbeing", "counsel"], answer: "Wellbeing support information is listed under Wellbeing Support." },
  { keywords: ["textbook", "book exchange"], answer: "You can browse or list second-hand textbooks on the Textbook Exchange page." },
];

const getFallbackAnswer = (question) => {
  const lower = question.toLowerCase();
  const match = FALLBACK_ANSWERS.find((entry) => entry.keywords.some((k) => lower.includes(k)));
  return match
    ? match.answer
    : "I'm running in offline mode right now (no AI key set), but you can find most campus information from the sidebar — Announcements, Events, Lost & Found, Room Booking, and the info pages.";
};

const askAI = async (question) => {
  if (!process.env.AI_API_KEY) {
    return getFallbackAnswer(question);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant for UCL Campus Hub, a student portal. Answer briefly and helpfully.",
          },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || getFallbackAnswer(question);
  } catch (error) {
    return getFallbackAnswer(question);
  }
};

module.exports = { askAI };
