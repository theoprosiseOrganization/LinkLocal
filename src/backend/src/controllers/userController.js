const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

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
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ error: "User not found" });
    // Fetch user location
    const location = await getUserLocation(user.id);
    user.location = location; // will be null if not found
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserLocation = async (userId) => {
  const result = await prisma.$queryRaw`
    SELECT "streetAddress", ST_AsText("location") AS location
    FROM "user_locations"
    WHERE "userId" = ${userId}::uuid`;
  if (!result || result.length === 0) return null;
  const { streetAddress, location } = result[0];
  // location is in format "POINT(lon lat)"
  const match = location.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
  if (!match) return null;
  const [, longitude, latitude] = match;
  return {
    address: streetAddress,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };
};

exports.createUser = async (req, res) => {
  // location stores { address, latitude, longitude }
  const { name, email, password, avatar, location, preferences } = req.body;
  if (!name || !email || !password || !location || !preferences) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }
  try {
    const user = await prisma.user.create({
      data: { name, email, password, avatar, preferences },
    });
    // Wait for the user to be created before creating the location
    await createUserLocation(
      user.id,
      location.latitude,
      location.longitude,
      location.address
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
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
  if (req.body.name !== undefined) updateData.name = req.body.name;
  if (req.body.email !== undefined) updateData.email = req.body.email;
  if (req.body.avatar !== undefined) updateData.avatar = req.body.avatar;
  if (req.body.preferences !== undefined)
    updateData.preferences = req.body.preferences;

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

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
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
  const match = location.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
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
