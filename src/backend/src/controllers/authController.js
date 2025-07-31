const { PrismaClient } = require("../../generated/prisma");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const express = require("express");
const joi = require("joi");
const LOGGING_SERVICE_URL = process.env.LOGGING_SERVICE_URL;

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(7).max(80).required(),
  location: joi
    .object({
      latitude: joi.number().required(),
      longitude: joi.number().required(),
      address: joi.string().required(),
    })
    .required(),
});

exports.signup = async (req, res) => {
  const { name, email, password, location } = req.body;
  // Validate input using Joi schema
  const { error } = userSchema.validate({
    name,
    email,
    password,
    location,
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return res.status(400).json({ error: "Email already taken." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      avatar: "",
      preferences: "",
    },
  });
  // Create user location
  await createUserLocation(
    newUser.id,
    location.latitude,
    location.longitude,
    location.address
  );
  req.session.userId = newUser.id;
  res.status(201).json({ message: "User created successfully!" });
};

// Create user location in the database using raw SQL
const createUserLocation = async (userId, latitude, longitude, address) => {
  const point = `POINT(${longitude} ${latitude})`;
  const id = uuidv4();
  await prisma.$executeRawUnsafe(
    `INSERT INTO "user_locations" ("id", "userId", "streetAddress", "location")
     VALUES ($1::uuid, $2::uuid, $3, ST_GeomFromText($4, 4326))`,
    id,
    userId,
    address,
    point
  );
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password." });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ error: "Invalid email or password." });
  }
  req.session.userId = user.id;
  res.json({ message: "Login successful!" });
};

exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed." });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful!" });
  });
};

// Check if the user is logged in
exports.me = async (req, res) => {
  if (req.session && req.session.userId) {
    res.json({ userId: req.session.userId });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

exports.isAdmin = async (req, res) => {
  if (req.session && req.session.userId) {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
    });
    if (user && user.email === "admin@admin.com") {
      res.json({ isAdmin: true });
    } else {
      res.json({ isAdmin: false });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Get user logs
exports.getLogs = async (req, res) => {
  try {
    await fetch(`${process.env.LOGGING_SERVICE_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 100,
        offset: 0,
      }),
    });
    res.json({ message: "Logs fetched successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
