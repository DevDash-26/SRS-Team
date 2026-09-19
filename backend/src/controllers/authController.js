const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { sendPasswordResetEmail } = require("../utils/emailClient");
const { isValidEmail } = require("../utils/validators");

const RESET_CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// Sends a 6-digit reset code to the user's email. Always responds the same way
// whether or not the email is registered, so this can't be used to enumerate accounts.
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: "A valid email is required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      const code = String(crypto.randomInt(100000, 1000000));
      user.resetCode = await bcrypt.hash(code, 10);
      user.resetCodeExpires = new Date(Date.now() + RESET_CODE_TTL_MS);
      await user.save();
      await sendPasswordResetEmail(user.email, code);
    }

    res.json({ message: "If that email is registered, a reset code has been sent." });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: "Email, code and new password are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.resetCode || !user.resetCodeExpires || user.resetCodeExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired reset code" });
    }

    const codeMatches = await bcrypt.compare(code, user.resetCode);
    if (!codeMatches) {
      return res.status(400).json({ message: "Invalid or expired reset code" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful. You can now sign in." });
  } catch (error) {
    next(error);
  }
};