/**
 * User Controller
 * Handles CRUD operations for users, including friends, events, and preferences.
 * Uses Prisma ORM for database interactions.
 *
 * Need to remove unused functions and clean up the code.
 *
 * @module userController
 */
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const RECOMMENDATION_SERVICE_URL = process.env.RECOMMENDATION_SERVICE_URL;

// User CRUD
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { tags: true },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    // Fetch user location
    const location = await getUserLocation(user.id);
    user.location = location; // will be null if not found
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const parsePoint = (point) => {
  // Parse a point in the format "POINT(lon lat)"
  const match = point.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
  return match;
};

const getUserLocation = async (userId) => {
  const result = await prisma.$queryRaw`
    SELECT "streetAddress", ST_AsText("location") AS location
    FROM "user_locations"
    WHERE "userId" = ${userId}::uuid`;
  if (!result || result.length === 0) return null;
  const { streetAddress, location } = result[0];
  // location is in format "POINT(lon lat)"
  const match = parsePoint(location);
  if (!match) return null;
  const [, longitude, latitude] = match;
  return {
    address: streetAddress,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };
};

const createUserLocation = async (userId, latitude, longitude, address) => {
  const point = `POINT(${longitude} ${latitude})`;
  await prisma.$executeRawUnsafe(
    `INSERT INTO "user_locations" ("userId", "streetAddress", "location")
     VALUES ($1::uuid, $2, ST_GeomFromText($3, 4326))`,
    userId,
    address,
    point
  );
};

const updateUserLocation = async (userId, latitude, longitude, address) => {
  const point = `POINT(${longitude} ${latitude})`;
  await prisma.$queryRaw`
    UPDATE "user_locations"
    SET "location" = ST_GeomFromText(${point}, 4326)
    , "streetAddress" = ${address}
    WHERE "userId" = ${userId}::uuid`;
};

exports.updateUser = async (req, res) => {
  const updateData = {};
  for (const key of Object.keys(req.body)) {
    if (key === "location" || key === "tags") continue; // handle location and tags separately
    if (req.body[key] !== undefined) updateData[key] = req.body[key];
  }

  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: updateData,
    });

    if (req.body.location) {
      await updateUserLocation(
        req.params.id,
        req.body.location.latitude,
        req.body.location.longitude,
        req.body.location.address
      );
    }

    if (req.body.tags) {
      // Upsert tags and collect their IDs
      const tagIds = [];
      for (const tagName of req.body.tags) {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
        tagIds.push({ id: tag.id });
      }
      // Set user's tags to the new set
      await prisma.user.update({
        where: { id: req.params.id },
        data: { tags: { set: tagIds } },
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addUserTag = async (userId, tagName) => {
  // Try to find the tag by name
  let tagRecord = await prisma.tag.findUnique({ where: { name: tagName } });
  // If not found, create it
  if (!tagRecord) {
    tagRecord = await prisma.tag.create({ data: { name: tagName } });
  }
  // Connect tag to user
  const user = await prisma.user.update({
    where: { id: userId },
    data: { tags: { connect: { id: tagRecord.id } } },
    include: { tags: true },
  });
};

exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Friends
exports.getUserFriends = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { friends: true },
    });
    // add user location to each friend
    await Promise.all(
      user.friends.map(async (friend) => {
        const location = await getUserLocation(friend.id);
        friend.location = location; // will be null if not found
      })
    );
    res.json(user?.friends || []);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addUserFriend = async (req, res) => {
  const { friendId } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { friends: { connect: { id: friendId } } },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeUserFriend = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { friends: { disconnect: { id: req.params.friend_id } } },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Preferences are yet to be implemented
// The implementation will depend on the challenge requirements
exports.getUserPreferences = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { preferences: true },
    });
    res.json(user?.preferences || {});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUserPreferences = async (req, res) => {
  const { preferences } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { preferences },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Events
exports.getUserCreatedEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: { userId: req.params.id },
    });
    // Attach location to each event (if not already a field)
    await Promise.all(
      events.map(async (event) => {
        const location = await getEventLocation(event.id);
        event.location = location; // will be null if not found
      })
    );
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEventLocation = async (eventId) => {
  const result = await prisma.$queryRaw`
    SELECT "streetAddress", ST_AsText("location") AS location
    FROM "event_locations"
    WHERE "eventId" = ${eventId}::uuid`;
  if (!result || result.length === 0) return null;
  const { streetAddress, location } = result[0];
  // location is in format "POINT(lon lat)"
  const match = parsePoint(location);
  if (!match) return null;
  const [, longitude, latitude] = match;
  return {
    address: streetAddress,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };
};

exports.createUserEvent = async (req, res) => {
  const { images, location, textDescription } = req.body;
  try {
    const event = await prisma.event.create({
      data: {
        userId: req.params.id,
        images,
        location,
        textDescription,
      },
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Liked Events
exports.getUserLikedEvents = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { likedEvents: true },
    });
    res.json(user?.likedEvents || []);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.likeEvent = async (req, res) => {
  const { eventId } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { likedEvents: { connect: { id: eventId } } },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.unlikeEvent = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { likedEvents: { disconnect: { id: req.params.event_id } } },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchUsers = async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required." });
  }
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });
    // Get location for each user
    await Promise.all(
      users.map(async (user) => {
        const location = await getUserLocation(user.id);
        user.location = location; // will be null if not found
      })
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Follow another user
exports.followUser = async (req, res) => {
  const followerId = req.params.id; // current user
  const { followingId } = req.body; // user to follow
  if (!followingId) {
    return res.status(400).json({ error: "followingId is required" });
  }
  if (followerId === followingId) {
    return res.status(400).json({ error: "You cannot follow yourself" });
  }
  try {
    // Create a Follows record
    await prisma.follows.create({
      data: {
        followerId,
        followingId,
      },
    });
    await fetch(`${process.env.RECOMMENDATION_SERVICE_URL}/add_follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followerId,
        followingId,
      }),
    });
    res.json({ message: "User followed" });
  } catch (error) {
    if (error.code === "P2002") {
      // Unique constraint failed (already following)
      return res.status(409).json({ error: "Already following this user" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  const followerId = req.params.id;
  const followingId = req.params.following_id;
  try {
    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    res.json({ message: "User unfollowed" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserFollowers = async (req, res) => {
  const userId = req.params.id;
  try {
    const followers = await prisma.follows.findMany({
      where: { followingId: userId },
      include: { follower: true }, // Include follower details
    });
    // Get location for each follower
    await Promise.all(
      followers.map(async (follow) => {
        const location = await getUserLocation(follow.follower.id);
        follow.follower.location = location; // will be null if not found
      })
    );
    res.json(followers.map((f) => f.follower));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserFollowing = async (req, res) => {
  const userId = req.params.id;
  try {
    const following = await prisma.follows.findMany({
      where: { followerId: userId },
      include: { following: true }, // Include following details
    });

    // Get location for each following user
    await Promise.all(
      following.map(async (follow) => {
        const location = await getUserLocation(follow.following.id);
        follow.following.location = location; // will be null if not found
      })
    );
    res.json(following.map((f) => f.following));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllTags = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSuggestedUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const recRes = await fetch(
      `${RECOMMENDATION_SERVICE_URL}/recommendation/${userId}`
    );
    if (!recRes.ok) {
      const error = await recRes.text();
      return res
        .status(502)
        .json({ error: `Recommendation service error: ${error}` });
    }
    const recommendations = await recRes.json();
    if (!recommendations || recommendations.length === 0) {
      return res.status(404).json({ message: "No recommendations found" });
    }

    const suggestedIds = recommendations.map((rec) => rec.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: suggestedIds } },
      include: { tags: true },
    });
    await Promise.all(
      users.map(async (user) => {
        const location = await getUserLocation(user.id);
        user.location = location; // will be null if not found
      })
    );
    const usersById = Object.fromEntries(users.map((u) => [u.id, u]));
    const orderedUsers = suggestedIds
      .map((id) => usersById[id])
      .filter(Boolean);
    res.json(orderedUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createPlan = async (req, res) => {
  try{
    const ownerId = req.params.id;
    const { title, events, routeData } = req.body;
    const {data, error} = await supabase
      .from("plans")
      .insert([{ owner_id: ownerId, title, event_ids: events, route_data: routeData }])
      .select()
      .single();
      if (error) {
        console.error("Error plan:", error);
        return res.status(500).json({ error: `Failed to create plan: ${error.message}` });
      }
      console.log("Plan created:", data);
      res.json(data);

  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ error: `Failed to create plan: ${error.message}` });

  }
}


exports.inviteUsers = async (req, res) => {
  try{
    const {planId} = req.params
    const {recipientIds} = req.body;
    if (!recipientIds || recipientIds.length === 0) {
      return res.status(400).json({ error: "No recipients provided" });
    }
    const rows = recipientIds.map((recipientId) => ({
      plan_id: planId,
      recipient_id: recipientId,
    }));
    const { data, error } = await supabase
      .from("invitations")
      .insert(rows)
      .select();
    if (error) throw new Error(`Failed to create invitations: ${error.message}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: `Failed to create invitations: ${error.message}` });
  }
};

exports.listInvitations = async (req, res) => {
  try {
    const recipientId = req.params.id;
    const { data, error } = await supabase
      .from("invitations")
      .select(`id, plan_id, plans(title)`)
      .eq("recipient_id", recipientId);
    if (error) {
      return res.status(500).json({ error: `Failed to list invitations: ${error.message}` });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: `Failed to list invitations: ${error.message}` });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const planId = req.params.planId;
    const { data, error } = await supabase
      .from("plans")
      .select("*")
      .eq("id", planId)
      .single();
    if (error) {
      return res.status(404).json({ error: `Plan not found: ${error.message}` });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: `Failed to get plan: ${error.message}` });
  }
}