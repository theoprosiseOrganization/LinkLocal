const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");
const joi = require("joi");
const ROUTES_API_ENDPOINT =
  "https://routes.googleapis.com/directions/v2:computeRoutes";
const FIELD_MASK = [
  "routes.viewport",
  "routes.legs",
  "routes.polyline",
  "routes.optimizedIntermediateWaypointIndex",
].join(",");

const eventSchema = joi.object({
  userId: joi.string().uuid().required(),
  images: joi.array().items(joi.string().uri()).required(),
  location: joi
    .object({
      latitude: joi.number().required(),
      longitude: joi.number().required(),
      address: joi.string().required(),
    })
    .required(),
  textDescription: joi.string().required(),
  title: joi.string().required(),
  startTime: joi.date().iso().required(),
  endTime: joi.date().iso().required(),
});

exports.getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({ include: { tags: true } });
    await Promise.all(
      events.map(async (event) => {
        const location = await getEventLocation(event.id);
        event.location = location; // will be null if not found
      })
    );
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: { tags: true },
    });
    if (!event) return res.status(404).json({ error: "Not Found" });
    const location = await getEventLocation(event.id);
    event.location = location;
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const parsePoint = (point) => {
  // Parse a point in the format "POINT(lon lat)"
  const match = point.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
  return match;
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

exports.createEvent = async (req, res) => {
  const {
    userId,
    images,
    location,
    textDescription,
    title,
    startTime,
    endTime,
  } = req.body;
  // Validate input using Joi schema
  const { error } = eventSchema.validate({
    userId,
    images,
    location,
    textDescription,
    title,
    startTime,
    endTime,
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const event = await prisma.event.create({
      data: {
        userId,
        images,
        textDescription,
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });
    await createEventLocation(
      event.id,
      location.latitude,
      location.longitude,
      location.address
    );
    await addEventTags(event.id, req.body.tags);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addEventTags = async (eventId, tags) => {
  if (!tags || tags.length === 0) {
    // If tags is empty, remove all tags from the event
    await prisma.event.update({
      where: { id: eventId },
      data: { tags: { set: [] } },
    });
    return;
  }
  // Upsert each tag and collect their IDs
  const tagIds = [];
  for (const tagName of tags) {
    const tag = await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    });
    tagIds.push({ id: tag.id });
  }
  // Set event's tags to the new set (removes old, adds new)
  await prisma.event.update({
    where: { id: eventId },
    data: { tags: { set: tagIds } },
  });
};

const createEventLocation = async (eventId, latitude, longitude, address) => {
  const point = `POINT(${longitude} ${latitude})`;
  const id = uuidv4();
  await prisma.$executeRawUnsafe(
    `INSERT INTO "event_locations" ("id", "eventId", "streetAddress", "location")
     VALUES ($1::uuid, $2::uuid, $3, ST_GeomFromText($4, 4326))`,
    id,
    eventId,
    address,
    point
  );
};

exports.updateEvent = async (req, res) => {
  const { images, location, textDescription } = req.body;
  try {
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: { images, location, textDescription },
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } });
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getEventUserLikes = async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: { likes: true },
    });
    res.json(event?.likes || []);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Like an event (add user to event.likes)
exports.likeEvent = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "userId required" });
  try {
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: { likes: { connect: { id: userId } } },
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Unlike an event (remove user from event.likes)
exports.unlikeEvent = async (req, res) => {
  try {
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: { likes: { disconnect: { id: req.params.user_id } } },
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getEventsWithinPolygon = async (req, res) => {
  const { polygon } = req.body; // GeoJSON Polygon
  if (!polygon || polygon.type !== "Polygon") {
    return res.status(400).json({ error: "Invalid polygon" });
  }
  try {
    const eventsIds = await prisma.$queryRawUnsafe(`
      SELECT id, "eventId", "streetAddress", ST_AsText(location) AS location
      FROM event_locations
      WHERE ST_Contains(
        ST_GeomFromGeoJSON('${JSON.stringify(polygon)}'),
        location
      )
    `);
    const events = await prisma.event.findMany({
      where: { id: { in: eventsIds.map((e) => e.eventId) } },
      include: { tags: true },
    });
    // Add location to each event
    for (const event of events) {
      const loc = eventsIds.find((e) => e.eventId === event.id);
      if (loc) {
        const match = parsePoint(loc.location);
        if (match) {
          const [, longitude, latitude] = match;
          event.location = {
            address: loc.streetAddress,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          };
        } else {
          event.location = null; // No valid location found
        }
      }
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get optimal route using Google Maps Directions API
// This function calculates the optimal route starting from a given location,
// visiting multiple events, and returning to the starting point.
exports.getOptimalRoute = async (req, res) => {
  try {
    const { start, events } = req.body;
    if (!start || !events || events.length === 0) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const routeRequest = {
      origin: {
        location: {
          latLng: {
            latitude: start.lat,
            longitude: start.lng,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: start.lat,
            longitude: start.lng,
          },
        },
      },
      intermediates: events.map((event) => ({
        location: {
          latLng: {
            latitude: event.lat,
            longitude: event.lng,
          },
        },
      })),
      travelMode: "DRIVE",
      optimizeWaypointOrder: "true",
      computeAlternativeRoutes: false,
      units: "METRIC",
    };

    const url = new URL(ROUTES_API_ENDPOINT);
    url.searchParams.set("fields", FIELD_MASK);

    const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY;
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
      },
      body: JSON.stringify(routeRequest),
    });
    if (!response.ok) {
      const errorText = await response.text();
      return res
        .status(response.status)
        .json({ error: "Failed to fetch route" });
    }
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
