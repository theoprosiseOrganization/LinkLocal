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
  createPlan,
  inviteUsers,
  listInvitations,
  getPlanById,
  joinPlan,
  shufflePlan,
} = require("../controllers/userController");

const router = express.Router();

router.use((req, res, next) => {
 fetch(`${process.env.LOGGING_SERVICE_URL}/log`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //Add console log data here
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

// Plan Endpoints
router.post("/:id/plans", createPlan); // Create a new plan
router.post("/:id/plans/:planId/invite", inviteUsers); // Invite users to a plan
router.get("/:id/invitations", listInvitations); // List invitations for the user
router.get("/:id/plans/:planId", getPlanById); // Get a specific plan by ID
router.post("/:id/plans/:planId/join", joinPlan); // Join a plan
router.post("/:id/plans/:planId/shuffle", shufflePlan); // Shuffle a plan

module.exports = router;
