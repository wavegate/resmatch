import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new Dropped record
router.post("/", verifyToken, async (req, res) => {
  const { userId, programId, reason, date } = req.body;

  if (!userId || !programId || !date) {
    return res
      .status(400)
      .json({ error: "User ID, Program ID, and Date are required" });
  }

  try {
    const newDropped = await prisma.dropped.create({
      data: {
        userId: Number(userId),
        programId: Number(programId),
        reason,
        date: new Date(date),
      },
    });

    res.status(201).json(newDropped);
  } catch (error) {
    console.error("Error creating dropped record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a Dropped record by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const dropped = await prisma.dropped.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        program: true,
      },
    });

    if (!dropped) {
      return res.status(404).json({ error: "Dropped record not found" });
    }

    res.json(dropped);
  } catch (error) {
    console.error("Error fetching dropped record details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Dropped record by ID
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedDropped = await prisma.dropped.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedDropped);
  } catch (error) {
    console.error("Error updating dropped record:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Dropped record not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Dropped record by ID
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.dropped.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Dropped record with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting dropped record:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Dropped record not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List Dropped records with Pagination
router.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.dropped.count();

    const droppedRecords = await prisma.dropped.findMany({
      skip: offset,
      take: 10,
      include: {
        user: true,
        program: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ droppedRecords, totalCount });
  } catch (error) {
    console.error("Error fetching dropped records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
