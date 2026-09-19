const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { ALL_ROLES, FACULTIES, YEAR_GROUPS, PROGRAMMES } = require("../utils/constants");
const { isValidEmail } = require("../utils/validators");

exports.getMe = async (req, res) => {
  res.json(req.user);
};

// Admin-only: list every account, so the Users tab has something to show
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin-only: create any account with any role.
// This is the ONLY place a new account can be created in the whole system.
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, faculty, programme, yearGroup } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Name, email, password and role are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!ALL_ROLES.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Students and academic staff belong to a faculty; students also need a programme and year group
    if ((role === "student" || role === "academic") && !FACULTIES.includes(faculty)) {
      return res.status(400).json({ message: "A valid faculty is required" });
    }
    if (role === "student" && !PROGRAMMES.includes(programme)) {
      return res.status(400).json({ message: "A valid programme is required" });
    }
    if (role === "student" && !YEAR_GROUPS.includes(yearGroup)) {
      return res.status(400).json({ message: "A valid year group is required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      faculty: role === "student" || role === "academic" ? faculty : undefined,
      programme: role === "student" ? programme : undefined,
      yearGroup: role === "student" ? yearGroup : undefined,
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      faculty: user.faculty,
      programme: user.programme,
      yearGroup: user.yearGroup,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};