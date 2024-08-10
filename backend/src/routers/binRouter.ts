import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const binRouter = express.Router();

// Create a new Bin
binRouter.post("/", verifyToken, async (req, res) => {
  const { name, tierListId, programIds } = req.body;

  if (!name || !tierListId) {
    return res
      .status(400)
      .json({ error: "Name and Tier List ID are required" });
  }

  try {
    const newBin = await prisma.bin.create({
      data: {
        name,
        tierList: {
          connect: { id: tierListId },
        },
        programs: {
          connect: programIds.map((programId) => ({ id: programId })),
        },
      },
      include: {
        programs: true,
      },
    });
    res.status(201).json(newBin);
  } catch (error) {
    console.error("Error creating Bin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a Bin by ID
binRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const bin = await prisma.bin.findUnique({
      where: { id: Number(id) },
      include: {
        programs: true,
        tierList: true,
      },
    });

    if (!bin) {
      return res.status(404).json({ error: "Bin not found" });
    }

    res.json(bin);
  } catch (error) {
    console.error("Error fetching Bin details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Bin by ID
binRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, programIds } = req.body;

  try {
    const updatedBin = await prisma.bin.update({
      where: { id: Number(id) },
      data: {
        name,
        programs: {
          set: programIds.map((programId) => ({ id: programId })), // Clears existing programs and sets new ones
        },
      },
      include: {
        programs: true,
      },
    });

    res.json(updatedBin);
  } catch (error) {
    console.error("Error updating Bin:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Bin not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Bin by ID
binRouter.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.bin.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Bin with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting Bin:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Bin not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List Bins with Pagination (optional, depending on your use case)
binRouter.post("/search", async (req, res) => {
  try {
    const { tierListId, pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.bin.count({
      where: { tierListId },
    });

    const bins = await prisma.bin.findMany({
      where: { tierListId },
      skip: offset,
      take: 10,
      include: {
        programs: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    res.json({ bins, totalCount });
  } catch (error) {
    console.error("Error fetching Bins:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default binRouter;
