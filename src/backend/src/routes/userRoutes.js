const express = require("express");
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserFriends,
  addUserFriend,
  removeUserFriend,
  getUserPreferences,
  updateUserPreferences,
  getUserCreatedEvents,
  createUserEvent,
  likeEvent,
  getUserLikedEvents,
  unlikeEvent,
  searchUsers,
  followUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowing,
  getAllTags,
  getSuggestedUsers,
} = require("../controllers/userController");

const router = express.Router();

// User endpoints
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/search", searchUsers);

// Friends
router.get("/:id/friends", getUserFriends);
router.post("/:id/friends", addUserFriend);
router.delete("/:id/friends/:friend_id", removeUserFriend);

// Preferences
router.get("/:id/preferences", getUserPreferences);
router.put("/:id/preferences", updateUserPreferences);
router.get("/preferences/tags", getAllTags);
router.get("/:id/suggested", getSuggestedUsers);

// Events
router.get("/:id/events", getUserCreatedEvents);
router.post("/:id/events", createUserEvent);

// Liked Events
router.get("/:id/liked_events", getUserLikedEvents);
router.post("/:id/liked_events", likeEvent);
router.delete("/:id/liked_events/:event_id", unlikeEvent);

// Follow endpoints
router.post("/:id/following", followUser); // follow user
router.delete("/:id/following/:following_id", unfollowUser); // unfollow user
router.get("/:id/followers", getUserFollowers); // get followers
router.get("/:id/following", getUserFollowing); // get following users

module.exports = router;
