import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new InterviewWithdrawal
router.post("/", verifyToken, async (req, res) => {
  const { programId, userId, date, reason } = req.body;

  if (!programId || !userId || !date) {
    return res
      .status(400)
      .json({ error: "Program ID, User ID, and Date are required" });
  }

  try {
    const newInterviewWithdrawal = await prisma.interviewWithdrawal.create({
      data: {
        programId: Number(programId),
        userId: Number(userId),
        date: new Date(date),
        reason,
      },
    });

    res.status(201).json(newInterviewWithdrawal);
  } catch (error) {
    console.error("Error creating interview withdrawal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get an InterviewWithdrawal by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const interviewWithdrawal = await prisma.interviewWithdrawal.findUnique({
      where: { id: Number(id) },
      include: {
        program: true,
        user: true,
      },
    });

    if (!interviewWithdrawal) {
      return res.status(404).json({ error: "Interview Withdrawal not found" });
    }

    res.json(interviewWithdrawal);
  } catch (error) {
    console.error("Error fetching interview withdrawal details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an InterviewWithdrawal by ID
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedInterviewWithdrawal = await prisma.interviewWithdrawal.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedInterviewWithdrawal);
  } catch (error) {
    console.error("Error updating interview withdrawal:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Interview Withdrawal not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an InterviewWithdrawal by ID
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.interviewWithdrawal.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Interview Withdrawal with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting interview withdrawal:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Interview Withdrawal not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List Interview Withdrawals with Pagination
router.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.interviewWithdrawal.count();

    const interviewWithdrawals = await prisma.interviewWithdrawal.findMany({
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

    res.json({ interviewWithdrawals, totalCount });
  } catch (error) {
    console.error("Error fetching interview withdrawals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
