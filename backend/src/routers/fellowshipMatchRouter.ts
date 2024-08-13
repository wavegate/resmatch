import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const fellowshipMatchRouter = express.Router();

// Create a new Fellowship Match entry
fellowshipMatchRouter.post("/", verifyToken, async (req, res) => {
  const { year, programId, matchData, anonymous } = req.body;
  const userId = req.user.id; // Get userId from the token

  if (!year || !programId || !matchData) {
    return res.status(400).json({
      error: "Year, Program ID, and match details are required",
    });
  }

  try {
    const newFellowshipMatch = await prisma.fellowshipMatch.create({
      data: {
        year,
        programId: Number(programId),
        userId: Number(userId),
        matchData,
        anonymous: anonymous ?? true, // Ensure 'linked' is false by default
      },
    });
    res.status(201).json(newFellowshipMatch);
  } catch (error) {
    console.error("Error creating Fellowship Match entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a Fellowship Match entry by ID
fellowshipMatchRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const fellowshipMatch = await prisma.fellowshipMatch.findUnique({
      where: { id: Number(id) },
      include: {
        program: {
          include: {
            institution: true, // Include institution in the program
          },
        },
        user: true,
      },
    });

    if (!fellowshipMatch) {
      return res.status(404).json({ error: "Fellowship Match not found" });
    }

    // Remove user data if linked is false
    if (fellowshipMatch.anonymous) {
      fellowshipMatch.user = undefined;
    }

    res.json(fellowshipMatch);
  } catch (error) {
    console.error("Error fetching Fellowship Match details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Fellowship Match entry by ID
fellowshipMatchRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedFellowshipMatch = await prisma.fellowshipMatch.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedFellowshipMatch);
  } catch (error) {
    console.error("Error updating Fellowship Match entry:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Fellowship Match not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Fellowship Match entry by ID
fellowshipMatchRouter.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.fellowshipMatch.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Fellowship Match entry with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting Fellowship Match entry:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Fellowship Match not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List Fellowship Match entries with Pagination
fellowshipMatchRouter.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.fellowshipMatch.count();

    const fellowshipMatches = await prisma.fellowshipMatch.findMany({
      skip: offset,
      take: 10,
      include: {
        program: {
          include: {
            institution: true, // Include institution in the program
          },
        },
        user: true,
      },
      orderBy: {
        year: "desc",
      },
    });

    // Remove user data if linked is false
    const processedMatches = fellowshipMatches.map((match) => {
      if (match.anonymous) {
        match.user = undefined;
      }
      return match;
    });

    res.json({ fellowshipMatches: processedMatches, totalCount });
  } catch (error) {
    console.error("Error fetching Fellowship Match entries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default fellowshipMatchRouter;
