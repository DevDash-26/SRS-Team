const Announcement = require("../models/Announcement");
const Event = require("../models/Event");
const InfoContent = require("../models/InfoContent");
const Society = require("../models/Society");
const Room = require("../models/Room");
const { buildAnnouncementFilter } = require("./audienceFilter");

const truncate = (text, max = 240) => {
  if (!text) return "";
  const clean = String(text).replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max)}...` : clean;
};

// Pulls a snapshot of what is actually in the database right now, so the assistant
// answers from real campus content instead of guessing. Announcements are filtered
// through the same audience rules the Announcements page uses.
const buildAssistantContext = async (user) => {
  const [announcements, events, infoItems, societies, rooms] = await Promise.all([
    Announcement.find(buildAnnouncementFilter(user)).sort({ createdAt: -1 }).limit(8),
    Event.find({}).sort({ date: 1 }).limit(8),
    InfoContent.find({}).sort({ date: 1, createdAt: -1 }).limit(40),
    Society.find({}).sort({ name: 1 }).limit(20),
    Room.find({}).sort({ name: 1 }).limit(20),
  ]);

  return {
    announcements: announcements.map((a) => ({
      title: a.title,
      message: truncate(a.message),
      type: a.type,
      audience: !a.audienceType || a.audienceType === "university-wide" ? "University-wide" : a.audienceValue,
      date: a.createdAt,
    })),
    events: events.map((e) => ({
      title: e.title,
      category: e.category,
      guestName: e.guestName,
      date: e.date,
      location: e.location,
      organizer: e.organizer,
    })),
    infoItems: infoItems.map((i) => ({
      category: i.category,
      title: i.title,
      body: truncate(i.body),
      date: i.date,
    })),
    societies: societies.map((s) => ({ name: s.name, description: truncate(s.description, 140) })),
    rooms: rooms.map((r) => ({ name: r.name, capacity: r.capacity, location: r.location, available: r.available })),
  };
};

const formatDate = (value) => (value ? new Date(value).toLocaleDateString("en-GB") : "date TBC");

// Turns the snapshot into compact text the model can read.
const contextToText = (context) => {
  const sections = [];

  if (context.announcements.length) {
    sections.push(
      `ANNOUNCEMENTS (most recent first):\n${context.announcements
        .map((a) => `- [${a.type}] ${a.title} (for ${a.audience}, ${formatDate(a.date)}): ${a.message}`)
        .join("\n")}`
    );
  }

  if (context.events.length) {
    sections.push(
      `EVENTS (soonest first):\n${context.events
        .map(
          (e) =>
            `- ${e.title} [${e.category || "event"}${e.guestName ? `, guest: ${e.guestName}` : ""}] on ${formatDate(e.date)}${
              e.location ? ` at ${e.location}` : ""
            }${e.organizer ? `, organised by ${e.organizer}` : ""}`
        )
        .join("\n")}`
    );
  }

  if (context.infoItems.length) {
    sections.push(
      `CAMPUS INFORMATION PAGES:\n${context.infoItems
        .map((i) => `- (${i.category}) ${i.title}${i.date ? ` [${formatDate(i.date)}]` : ""}: ${i.body}`)
        .join("\n")}`
    );
  }

  if (context.societies.length) {
    sections.push(
      `SOCIETIES:\n${context.societies.map((s) => `- ${s.name}: ${s.description || "No description yet"}`).join("\n")}`
    );
  }

  if (context.rooms.length) {
    sections.push(
      `BOOKABLE ROOMS:\n${context.rooms
        .map((r) => `- ${r.name} (capacity ${r.capacity}${r.location ? `, ${r.location}` : ""}) — ${r.available ? "available" : "currently busy"}`)
        .join("\n")}`
    );
  }

  return sections.join("\n\n");
};

module.exports = { buildAssistantContext, contextToText };
