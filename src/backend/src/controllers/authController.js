const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const express = require("express");

exports.signup = async (req, res) => {
  const { name, email, password, location } = req.body;
  if (!name || !email || !password || !location) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (password.length < 7) {
    return res
      .status(400)
      .json({ error: "Password must be at least 7 characters long." });
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
      location,
      preferences: {},
    },
  });
  res.status(201).json({ message: "User created successfully!" });
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
  // Implementation of logout logic can vary based on how sessions or tokens are managed
  // This will depend on further featuring
  res.json({ message: "Logout successful!" });
};
