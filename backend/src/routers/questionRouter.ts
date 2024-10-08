import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new Question
router.post("/", verifyToken, async (req, res) => {
  const { programId, questions, anonymous = true } = req.body;

  const userId = req.user.id;

  if (!programId || !questions) {
    return res
      .status(400)
      .json({ error: "Program ID and Questions are required" });
  }

  try {
    const newQuestion = await prisma.question.create({
      data: {
        programId: Number(programId),
        userId: Number(userId),
        questions: questions, // expecting an array of strings
        anonymous: Boolean(anonymous), // Ensure linked is stored as a boolean
      },
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a Question by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const question = await prisma.question.findUnique({
      where: { id: Number(id) },
      include: {
        program: {
          include: {
            institution: true, // Include the institution in the response
          },
        },
        user: true,
      },
    });

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Remove user data if the linked field is not true
    if (question.anonymous) {
      question.user = undefined;
    }

    res.json(question);
  } catch (error) {
    console.error("Error fetching question details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Question by ID
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedQuestion = await prisma.question.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedQuestion);
  } catch (error) {
    console.error("Error updating question:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Question by ID
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.question.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Question with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting question:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List Questions with Pagination
router.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.question.count();

    const questions = await prisma.question.findMany({
      skip: offset,
      take: 10,
      include: {
        program: {
          include: {
            institution: true, // Include the institution in the search results
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Remove user data if the linked field is not true
    const processedQuestions = questions.map((question) => {
      if (question.anonymous) {
        question.user = undefined; // Remove user data
      }
      return question;
    });

    res.json({ questions: processedQuestions, totalCount });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
