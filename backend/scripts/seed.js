// One-time helper: puts a few starter rooms and info items in the
// database, and creates the single System Administrator account from
// ADMIN_EMAIL / ADMIN_PASSWORD in .env (skipped if it already exists).
// Run with: npm run seed  (from the backend folder)
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Room = require("../src/models/Room");
const InfoContent = require("../src/models/InfoContent");
const User = require("../src/models/User");

const rooms = [
  { name: "Study Room 4B", capacity: 6, location: "Library Wing", available: true },
  { name: "Group Room 2A", capacity: 10, location: "Block C", available: true },
  { name: "Seminar Hall 1", capacity: 40, location: "Main Block", available: false },
  { name: "Study Pod 1", capacity: 2, location: "Library Wing", available: true },
];

const infoItems = [
  { category: "faq", title: "How do I reset my student portal password?", body: "Contact your administrator to have your password reset." },
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

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        name: "System Administrator",
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "system-admin",
      });
      console.log("Admin account created:", process.env.ADMIN_EMAIL);
    } else {
      console.log("Admin account already exists, skipped.");
    }
  } else {
    console.log("ADMIN_EMAIL/ADMIN_PASSWORD not set in .env — no admin created.");
  }

  console.log("Seed data inserted: rooms and sample info content.");
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});