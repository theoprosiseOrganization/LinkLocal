const express = require("express");
const multer = require("multer");
const { uploadEventImages } = require("../controllers/uploadController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /upload/event-images (expects eventId in form-data, and up to 5 images)
router.post("/event-images", upload.array("images", 5), uploadEventImages);

module.exports = router;
