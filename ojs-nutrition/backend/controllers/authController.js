const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../models");
const sendVerificationEmail = require("../utils/emailUtils"); // utils/emailUtils.js dosyasını doğru yoldan import edin

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, last_name, email, password, role } = req.body;
  console.log("register", req.body);

  try {
    let user = await db.User.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await db.User.create({
      name: name,
      lastName: last_name,
      email: email,
      password: hashedPassword,
      role: role,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await sendVerificationEmail(user); // E-posta doğrulama maili gönderiliyor
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcıyı e-posta ile bul
    const user = await db.User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = { userId: user.id };
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
const me = async (req, res) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.User.findByPk(decoded.id);
    console.log("first", user);
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    await db.User.update({ isVerified: true }, { where: { id: user.id } });

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  me,
  verifyEmail,
};