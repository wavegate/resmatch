import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const fameShameRouter = express.Router();

// Create a new FameShameUserInput (protected by verifyToken)
fameShameRouter.post("/", verifyToken, async (req, res) => {
  const { fame, shame, programId } = req.body;
  const userId = req.user.id;

  if (!fame || !shame || !programId) {
    return res
      .status(400)
      .json({ error: "Fame, shame, and programId are required" });
  }

  try {
    const newFameShame = await prisma.fameShameUserInput.create({
      data: {
        fame,
        shame,
        programId: Number(programId),
        userId: userId,
      },
    });
    res.status(201).json(newFameShame);
  } catch (error) {
    console.error("Error creating fame/shame input:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific FameShameUserInput by ID
fameShameRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const fameShameId = Number(id);
    if (isNaN(fameShameId)) {
      return res.status(400).json({ error: "Invalid fame/shame ID" });
    }

    const fameShame = await prisma.fameShameUserInput.findUnique({
      where: { id: fameShameId },
      include: {
        user: {
          select: {
            alias: true,
          },
        },
        program: true,
      },
    });

    if (!fameShame) {
      return res.status(404).json({ error: "Fame/Shame input not found" });
    }

    res.status(200).json(fameShame);
  } catch (error) {
    console.error("Error fetching fame/shame input:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a FameShameUserInput by ID (protected by verifyToken)
fameShameRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const fameShameId = Number(id);
  const { fame, shame, programId } = req.body;

  if (isNaN(fameShameId)) {
    return res.status(400).json({ error: "Invalid fame/shame ID" });
  }

  try {
    const updatedFameShame = await prisma.fameShameUserInput.update({
      where: { id: fameShameId },
      data: {
        fame,
        shame,
        programId: programId ? Number(programId) : undefined,
      },
    });

    if (!updatedFameShame) {
      return res.status(404).json({ error: "Fame/Shame input not found" });
    }

    res.status(200).json(updatedFameShame);
  } catch (error) {
    console.error("Error updating fame/shame input:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a FameShameUserInput by ID (protected by verifyToken)
fameShameRouter.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const fameShameId = Number(id);
    if (isNaN(fameShameId)) {
      return res.status(400).json({ error: "Invalid fame/shame ID" });
    }

    const deletedFameShame = await prisma.fameShameUserInput.delete({
      where: { id: fameShameId },
    });

    res.status(200).json({
      message: `Fame/Shame input with ID: ${fameShameId} deleted`,
      deletedFameShame,
    });
  } catch (error) {
    console.error("Error deleting fame/shame input:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Search FameShameUserInputs with pagination and optional filtering by programId
fameShameRouter.post("/search", async (req, res) => {
  const { programId, pageNum = 1 } = req.body;

  const offset = (pageNum - 1) * 10;

  try {
    const whereClause = programId ? { programId: Number(programId) } : {};

    const totalCount = await prisma.fameShameUserInput.count({
      where: whereClause,
    });

    const fameShameInputs = await prisma.fameShameUserInput.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      skip: offset,
      take: 10,
      include: {
        user: {
          select: {
            alias: true,
          },
        },
        program: {
          include: {
            institution: true,
          },
        },
      },
    });

    res.status(200).json({ fameShameInputs, totalCount });
  } catch (error) {
    console.error("Error searching fame/shame inputs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default fameShameRouter;
