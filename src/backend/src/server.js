// const express = require("express");
// const cors = require("cors");
// const session = require("express-session");
// const { createClient } = require("redis");
// const { RedisStore } = require("connect-redis");

// const userRoutes = require("./routes/userRoutes");
// const eventRoutes = require("./routes/eventRoutes");
// const authRoutes = require("./routes/authRoutes");
// const uploadRoutes = require("./routes/uploadRoutes");

// const app = express();

// const allowedOrigins = [
//   "https://linklocalsite.onrender.com",
//   "https://linklocal-02n7.onrender.com",
// ];
// // Setup redis client for Upstash
// const redisClient = createClient({
//   url: process.env.UPSTASH_REDIS_REST_URL,
// });
// redisClient.connect().catch(console.error);

// app.set('trust proxy', 1)
// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       sameSite: "none",
//       secure: true, // Set to true if using HTTPS
//       maxAge: 1000 * 60 * 60 * 24, // Session expiration (1 day)
//     },
//   })
// );

// // Middleware to parse JSON API calls
// app.use(express.json());

// // CORS setup
// app.use(
//   cors({
//     credentials: true,
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like curl, Postman, or same-origin)
//       if (!origin || allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

// // Routes
// app.use("/users", userRoutes);
// app.use("/events", eventRoutes);
// app.use("/auth", authRoutes);
// app.use("/upload", uploadRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const redisStore = require("connect-redis");
const createClient = require("redis").createClient;

const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// Middleware to handle CORS and sessions - change secret key in production
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Middleware to parse json api calls
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
