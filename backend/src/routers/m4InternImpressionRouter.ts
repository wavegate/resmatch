import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new M4InternImpression
router.post("/", verifyToken, async (req, res) => {
  const { programId, positiveImpression, negativeImpression, anonymous } =
    req.body;

  const userId = req.user.id; // Get userId from the authenticated user

  if (!programId) {
    return res.status(400).json({ error: "Program ID is required" });
  }

  try {
    const newM4InternImpression = await prisma.m4InternImpression.create({
      data: {
        programId: Number(programId),
        userId: Number(userId),
        positiveImpression,
        negativeImpression,
        anonymous,
      },
    });

    res.status(201).json(newM4InternImpression);
  } catch (error) {
    console.error("Error creating M4 intern impression:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get an M4InternImpression by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const m4InternImpression = await prisma.m4InternImpression.findUnique({
      where: { id: Number(id) },
      include: {
        program: {
          include: {
            institution: true, // Include institution in the program
          },
        },
        user: true,
        comments: true,
      },
    });

    if (!m4InternImpression) {
      return res.status(404).json({ error: "M4 Intern Impression not found" });
    }

    // Remove user data if the impression is not linked
    if (m4InternImpression.anonymous) {
      m4InternImpression.user = undefined;
    }

    res.json(m4InternImpression);
  } catch (error) {
    console.error("Error fetching M4 intern impression details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an M4InternImpression by ID
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedM4InternImpression = await prisma.m4InternImpression.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedM4InternImpression);
  } catch (error) {
    console.error("Error updating M4 intern impression:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "M4 Intern Impression not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an M4InternImpression by ID
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.m4InternImpression.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `M4 Intern Impression with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting M4 intern impression:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "M4 Intern Impression not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List M4InternImpressions with Pagination
router.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.m4InternImpression.count();

    const m4InternImpressions = await prisma.m4InternImpression.findMany({
      skip: offset,
      take: 10,
      include: {
        program: {
          include: {
            institution: true, // Include institution in the program
          },
        },
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Remove user data if the impression is not linked
    const processedImpressions = m4InternImpressions.map((impression) => {
      if (impression.anonymous) {
        impression.user = undefined;
      }
      return impression;
    });

    res.json({ m4InternImpressions: processedImpressions, totalCount });
  } catch (error) {
    console.error("Error fetching M4 intern impressions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
