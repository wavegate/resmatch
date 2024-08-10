import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new InterviewImpression
router.post("/", verifyToken, async (req, res) => {
  const {
    programId,
    userId,
    positives,
    negatives,
    howInterviewDayAffectsRank,
    gift,
    timeGiftReceived,
  } = req.body;

  if (!programId || !userId) {
    return res
      .status(400)
      .json({ error: "Program ID and User ID are required" });
  }

  try {
    const newInterviewImpression = await prisma.interviewImpression.create({
      data: {
        programId: Number(programId),
        userId: Number(userId),
        positives,
        negatives,
        howInterviewDayAffectsRank,
        gift,
        timeGiftReceived,
      },
    });

    res.status(201).json(newInterviewImpression);
  } catch (error) {
    console.error("Error creating interview impression:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get an InterviewImpression by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const interviewImpression = await prisma.interviewImpression.findUnique({
      where: { id: Number(id) },
      include: {
        program: true,
        user: true,
        comments: true,
      },
    });

    if (!interviewImpression) {
      return res.status(404).json({ error: "Interview Impression not found" });
    }

    res.json(interviewImpression);
  } catch (error) {
    console.error("Error fetching interview impression details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an InterviewImpression by ID
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedInterviewImpression = await prisma.interviewImpression.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedInterviewImpression);
  } catch (error) {
    console.error("Error updating interview impression:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Interview Impression not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an InterviewImpression by ID
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.interviewImpression.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Interview Impression with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting interview impression:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Interview Impression not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List Interview Impressions with Pagination
router.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.interviewImpression.count();

    const interviewImpressions = await prisma.interviewImpression.findMany({
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

    res.json({ interviewImpressions, totalCount });
  } catch (error) {
    console.error("Error fetching interview impressions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
