import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new SecondLook
router.post("/", verifyToken, async (req, res) => {
  const { programId, userId, setting, date, bearingOnRank } = req.body;

  if (!programId || !userId) {
    return res
      .status(400)
      .json({ error: "Program ID and User ID are required" });
  }

  try {
    const newSecondLook = await prisma.secondLook.create({
      data: {
        programId: Number(programId),
        userId: Number(userId),
        setting,
        date: date ? new Date(date) : null,
        bearingOnRank,
      },
    });

    res.status(201).json(newSecondLook);
  } catch (error) {
    console.error("Error creating second look:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a SecondLook by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const secondLook = await prisma.secondLook.findUnique({
      where: { id: Number(id) },
      include: {
        program: true,
        user: true,
      },
    });

    if (!secondLook) {
      return res.status(404).json({ error: "Second Look not found" });
    }

    res.json(secondLook);
  } catch (error) {
    console.error("Error fetching second look details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a SecondLook by ID
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedSecondLook = await prisma.secondLook.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedSecondLook);
  } catch (error) {
    console.error("Error updating second look:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Second Look not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a SecondLook by ID
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.secondLook.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Second Look with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting second look:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Second Look not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List Second Looks with Pagination
router.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.secondLook.count();

    const secondLooks = await prisma.secondLook.findMany({
      skip: offset,
      take: 10,
      include: {
        program: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ secondLooks, totalCount });
  } catch (error) {
    console.error("Error fetching second looks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;