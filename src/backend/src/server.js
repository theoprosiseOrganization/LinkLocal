const express = require("express");
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const Redis = require("ioredis"); // Use ioredis for Upstash
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const app = express();

// Setup redis client for Upstash
const redis = Redis.fromEnv();

// Set up session store
const store = new RedisStore({ client: redis });
app.use(
  session({
    store: store,
    secret: "secret-key", // Change in production!
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Middleware to parse json api calls
app.use(express.json());
app.use(
  cors({ credentials: true, origin: "https://linklocalsite.onrender.com" })
);

app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
