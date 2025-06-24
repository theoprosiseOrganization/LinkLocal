const express = require("express");
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventUserLikes,
  likeEvent,
  unlikeEvent,
} = require("../controllers/eventController");

const router = express.Router();

// Event endpoints
router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

// Likes
router.get("/:id/likes", getEventUserLikes);
router.post("/:id/likes", likeEvent);
router.delete("/:id/likes/:user_id", unlikeEvent);

module.exports = router;
