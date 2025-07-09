import os
from supabase import create_client, Client
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# need to create users with a unique id, unique name, and unique email
# I can send in the hashed "testtest" password
# random location can be sent


# Followers

# can send follower id to id for follows table

# tags

# can send tag id to column a and users tags to column b in usertags table


# This is how new users are created in the database
'''
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
'''