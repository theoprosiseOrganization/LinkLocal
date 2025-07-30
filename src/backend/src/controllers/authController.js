const { PrismaClient } = require("../../generated/prisma");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const express = require("express");
const joi = require("joi");

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
    console.log("User ID from session:", req.session.userId);
    console.log("Session data:", req.session);
    res.json({ userId: req.session.userId });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
