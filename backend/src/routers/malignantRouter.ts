import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new Malignant record
router.post("/", verifyToken, async (req, res) => {
  const { programId, userId, malignant, source, explanation } = req.body;

  if (!programId || !userId || !malignant) {
    return res
      .status(400)
      .json({
        error: "Program ID, User ID, and Malignant status are required",
      });
  }

  try {
    const newMalignant = await prisma.malignant.create({
      data: {
        programId: Number(programId),
        userId: Number(userId),
        malignant,
        source,
        explanation,
      },
    });

    res.status(201).json(newMalignant);
  } catch (error) {
    console.error("Error creating malignant record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a Malignant record by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const malignant = await prisma.malignant.findUnique({
      where: { id: Number(id) },
      include: {
        program: true,
        user: true,
        comments: true,
      },
    });

    if (!malignant) {
      return res.status(404).json({ error: "Malignant record not found" });
    }

    res.json(malignant);
  } catch (error) {
    console.error("Error fetching malignant details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Malignant record by ID
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedMalignant = await prisma.malignant.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedMalignant);
  } catch (error) {
    console.error("Error updating malignant record:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Malignant record not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Malignant record by ID
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.malignant.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Malignant record with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting malignant record:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Malignant record not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List Malignant records with Pagination
router.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.malignant.count();

    const malignants = await prisma.malignant.findMany({
      skip: offset,
      take: 10,
      include: {
        program: true,
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ malignants, totalCount });
  } catch (error) {
    console.error("Error fetching malignant records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
