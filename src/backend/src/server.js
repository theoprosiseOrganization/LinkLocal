const express = require("express");
const cors = require("cors");
const session = require("express-session");

const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
