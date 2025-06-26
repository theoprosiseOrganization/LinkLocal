const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

exports.getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
    });
    if (!event) return res.status(404).json({ error: "Not Found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createEvent = async (req, res) => {
  const { userId, images, location, textDescription, title } = req.body;
  if (!userId || !images || !location || !textDescription || !title) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const event = await prisma.event.create({
      data: { userId, images, location, textDescription, title },
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
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
