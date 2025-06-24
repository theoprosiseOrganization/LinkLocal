const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  if (password.length < 7) {
    return res
      .status(400)
      .json({ error: "Password must be at least 7 characters long." });
  }
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return res.status(400).json({ error: "Username already taken." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { username, password: hashedPassword },
  });
  res.status(201).json({ message: "User created successfully!" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    return res.status(400).json({ error: "Invalid username or password." });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ error: "Invalid username or password." });
  }
  res.json({ message: "Login successful!" });
};
