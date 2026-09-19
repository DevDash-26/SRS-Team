// One-time helper to put a few starter rooms and info items in the
// database so Room Booking and the info pages have something to show
// while you build the real staff-facing "create" screens for them.
// Run with: npm run seed  (from the backend folder)
require("dotenv").config();
const mongoose = require("mongoose");
const Room = require("../src/models/Room");
const InfoContent = require("../src/models/InfoContent");

const rooms = [
  { name: "Study Room 4B", capacity: 6, location: "Library Wing", available: true },
  { name: "Group Room 2A", capacity: 10, location: "Block C", available: true },
  { name: "Seminar Hall 1", capacity: 40, location: "Main Block", available: false },
  { name: "Study Pod 1", capacity: 2, location: "Library Wing", available: true },
];

const infoItems = [
  { category: "faq", title: "How do I reset my student portal password?", body: "Visit the IT Support desk in Block A or email itsupport@ucl.lk." },
  { category: "library", title: "Library opening hours", body: "Open 8:00 AM to 8:00 PM on weekdays, 9:00 AM to 4:00 PM on Saturdays." },
  { category: "dining", title: "Cafeteria hours", body: "The main cafeteria serves breakfast, lunch and dinner from 7:30 AM to 7:00 PM." },
  { category: "it-support", title: "Wi-Fi connection issues", body: "Connect to the 'UCL-Student' network using your student email and password." },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Room.deleteMany({});
  await Room.insertMany(rooms);

  await InfoContent.deleteMany({});
  await InfoContent.insertMany(infoItems);

  console.log("Seed data inserted: rooms and sample info content.");
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});
