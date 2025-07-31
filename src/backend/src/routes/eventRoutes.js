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
  getEventsWithinPolygon,
  getOptimalRoute,
  getEventsWithinRadius,
  searchEvents,
} = require("../controllers/eventController");

const router = express.Router();

router.use((req, res, next) => {
 fetch(`${process.env.LOGGING_SERVICE_URL}/log`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        query: req.query,
        params: req.params,
        body: req.body,
      }),
    });
  next();
});

// Event endpoints
router.get("/", getEvents);
router.post("/within-radius", getEventsWithinRadius);
router.post("/search", searchEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.post("/within-polygon", getEventsWithinPolygon);
router.post("/optimal-route", getOptimalRoute);

// Likes
router.get("/:id/likes", getEventUserLikes);
router.post("/:id/likes", likeEvent);
router.delete("/:id/likes/:user_id", unlikeEvent);

module.exports = router;
