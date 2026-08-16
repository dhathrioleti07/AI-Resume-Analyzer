const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function tokenFor(user) {
  return jwt.sign(
    { id: user._id.toString(), email: user.email, name: user.name },
    process.env.JWT_SECRET || "development-secret",
    { expiresIn: "7d" }
  );
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must contain at least 6 characters." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: "An account with this email already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), password: hashedPassword });

    res.status(201).json({
      message: "Registration successful.",
      token: tokenFor(user),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.json({
      message: "Login successful.",
      token: tokenFor(user),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch {
    res.status(500).json({ message: "Login failed. Please try again." });
  }
}

module.exports = { register, login };
