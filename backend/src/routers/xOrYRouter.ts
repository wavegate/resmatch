import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const xOrYRouter = express.Router();

// Create a new XorY entry
xOrYRouter.post("/", verifyToken, async (req, res) => {
  const { programXId, programYId, question, userId } = req.body;

  if (!programXId || !programYId || !question || !userId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newXorY = await prisma.xorY.create({
      data: {
        programXId: Number(programXId),
        programYId: Number(programYId),
        question,
        userId: Number(userId),
      },
    });

    res.status(201).json(newXorY);
  } catch (error) {
    console.error("Error creating XorY entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get an XorY entry by ID
xOrYRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const xOrY = await prisma.xorY.findUnique({
      where: { id: Number(id) },
      include: {
        programX: true,
        programY: true,
        comments: true,
      },
    });

    if (!xOrY) {
      return res.status(404).json({ error: "XorY entry not found" });
    }

    res.json(xOrY);
  } catch (error) {
    console.error("Error fetching XorY entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an XorY entry by ID
xOrYRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { programXId, programYId, question } = req.body;

  try {
    const updatedXorY = await prisma.xorY.update({
      where: { id: Number(id) },
      data: {
        programXId: programXId ? Number(programXId) : undefined,
        programYId: programYId ? Number(programYId) : undefined,
        question,
      },
    });

    res.json(updatedXorY);
  } catch (error) {
    console.error("Error updating XorY entry:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "XorY entry not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an XorY entry by ID
xOrYRouter.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.xOrY.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `XorY entry with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting XorY entry:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "XorY entry not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List XorY entries with Pagination
xOrYRouter.post("/search", async (req, res) => {
  const { pageNum = 1 } = req.body;
  const PAGE_SIZE = 10; // Example page size

  try {
    const totalCount = await prisma.xorY.count();

    const xOrYEntries = await prisma.xorY.findMany({
      skip: (pageNum - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        programX: true,
        programY: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ xOrYEntries, totalCount });
  } catch (error) {
    console.error("Error fetching XorY entries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default xOrYRouter;
