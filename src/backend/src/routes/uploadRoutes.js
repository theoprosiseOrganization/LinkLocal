const express = require("express");
const multer = require("multer");
const { uploadEventImages, uploadProfileImage } = require("../controllers/uploadController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

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

// POST /upload/event-images (expects eventId in form-data, and up to 5 images)
router.post("/event-images", upload.array("images", 5), uploadEventImages);

// POST /upload/user-profile (expects userId in form-data, and one profile image)
router.post("/user-profile", upload.single("profileImage"), uploadProfileImage);

module.exports = router;
