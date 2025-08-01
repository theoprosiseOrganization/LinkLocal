const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
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
    const events = await fetchEventsWithinPolygon(polygon);
    if (!events || events.length === 0) {
      return res.status(404).json({ error: "No events found within polygon" });
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function fetchEventsWithinPolygon(polygon) {
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

    const eventIdToLoc = new Map(eventsIds.map((e) => [e.eventId, e]));

    for (const event of events) {
      const loc = eventIdToLoc.get(event.id);
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
          event.location = null;
        }
      }
    }
    return events;
  } catch (error) {
    throw error;
  }
}

exports.fetchEventsWithinPolygon = fetchEventsWithinPolygon;

exports.getEventsWithinRadius = async (req, res) => {
  const { latitude, longitude, radius } = req.body;

  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    typeof radius !== "number"
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }
  try {
    const eventsIds = await prisma.$queryRawUnsafe(`
      SELECT id, "eventId", "streetAddress", ST_AsText(location) AS location
      FROM event_locations
      WHERE ST_DWithin(
        location::geography,
        ST_MakePoint(${longitude}, ${latitude})::geography,
        ${radius}
      )
    `);
    const events = await prisma.event.findMany({
      where: { id: { in: eventsIds.map((e) => e.eventId) } },
      include: { tags: true },
    });

    const eventIdToLoc = new Map(eventsIds.map((e) => [e.eventId, e]));

    for (const event of events) {
      const loc = eventIdToLoc.get(event.id);
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
          event.location = null;
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
    const { start, events, transportType } = req.body;
    if (!start || !events || events.length === 0) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const data = await fetchOptimalRoute(start, events, transportType);
    return res.json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

async function fetchOptimalRoute(start, events, transportType) {
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
    travelMode: transportType,
    optimizeWaypointOrder: "true",
    computeAlternativeRoutes: true,
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
  const json = await response.json();

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Failed to fetch route");
  }
  return json;
}

exports.fetchOptimalRoute = fetchOptimalRoute;

/**
 * Vector search setup for events in Supabase:
 *
 * 1. Make sure the trigram extension is available
 *    create extension if not exists pg_trgm;
 *
 * 2. Add GIN-trigram indexes for fast prefix and similarity searches
 *    create index if not exists idx_event_title_trgm
 *      on "Event" using gin (title gin_trgm_ops);
 *
 *    create index if not exists idx_event_text_trgm
 *      on "Event" using gin ("textDescription" gin_trgm_ops);
 *
 * 3. Create (or replace) the RPC for ranked search
 *    CREATE OR REPLACE FUNCTION public.search_events_fuzzy(
 *      query_text text,
 *      max_results integer DEFAULT 3,
 *      sim_threshold real DEFAULT 0.3  -- tune between 0.2–0.5
 *    )
 *    RETURNS TABLE (
 *      id uuid,
 *      title text,
 *      "textDescription" text,
 *      rank real
 *    )
 *    LANGUAGE sql
 *    AS $$
 *      WITH base AS (
 *        SELECT
 *          e.id,
 *          e.title,
 *          e."textDescription",
 *          -- full‑text rank (0 if typo kills it) + trigram similarity
 *          ts_rank(e.search_idx, websearch_to_tsquery('english', query_text)) 
 *            + GREATEST(
 *                similarity(e.title, query_text),
 *                similarity(e."textDescription", query_text)
 *              ) AS rank
 *        FROM "Event" e
 *        WHERE
 *          (
 *            length(query_text) < 3
 *            AND (
 *              e.title    ILIKE query_text || '%'
 *              OR e."textDescription" ILIKE query_text || '%'
 *            )
 *          )
 *          OR (
 *            length(query_text) >= 3
 *            AND (
 *              e.search_idx @@ websearch_to_tsquery('english', query_text)
 *              OR similarity(e.title, query_text) > sim_threshold
 *              OR similarity(e."textDescription", query_text) > sim_threshold
 *            )
 *          )
 *      )
 *      SELECT id, title, "textDescription", rank
 *      FROM base
 *      ORDER BY rank DESC, title
 *      LIMIT max_results;
 *    $$;
 */

exports.searchEvents = async (req, res) => {
  const supabase = createClient(supabaseUrl, supabaseKey);
  let { query } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Invalid search query" });
  }
  if (query.length > 100) {
    return res.status(400).json({ error: "Search query too long" });
  }
  query = query.trim().toLowerCase();
  try {
    const { data: events, error } = await supabase
      .rpc("search_events_fuzzy", { query_text: query, max_results: 4, sim_threshold: 0.3 })
      .select("*");
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
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
