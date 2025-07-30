const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { createClient } = require("redis");
const { RedisStore } = require("connect-redis");

const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

const allowedOrigins = [
  "https://linklocalsite.onrender.com",
];

// Setup redis client for Upstash
const redisClient = createClient({
  url: process.env.UPSTASH_REDIS_REST_URL,
});
redisClient.connect().catch(console.error);

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Session expiration (1 day)
    },
  })
);

// Middleware to parse JSON API calls
app.use(express.json());

// CORS setup
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Routes
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
