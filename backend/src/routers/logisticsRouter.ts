import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new InterviewLogistics
router.post("/", verifyToken, async (req, res) => {
  const {
    sortType,
    userId,
    programId,
    schedulerPlatform,
    ivFormat,
    timeSlots,
    ivPlatform,
    openIVDates,
    interviewInviteId,
  } = req.body;

  if (!sortType || !userId || !programId || !interviewInviteId) {
    return res
      .status(400)
      .json({
        error:
          "Sort Type, User ID, Program ID, and Interview Invite ID are required",
      });
  }

  try {
    const newInterviewLogistics = await prisma.interviewLogistics.create({
      data: {
        sortType,
        userId: Number(userId),
        programId: Number(programId),
        schedulerPlatform,
        ivFormat,
        timeSlots,
        ivPlatform,
        openIVDates: openIVDates
          ? openIVDates.map((date) => new Date(date))
          : [],
        interviewInviteId: Number(interviewInviteId),
      },
    });

    res.status(201).json(newInterviewLogistics);
  } catch (error) {
    console.error("Error creating interview logistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get an InterviewLogistics by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const interviewLogistics = await prisma.interviewLogistics.findUnique({
      where: { id: Number(id) },
      include: {
        program: true,
        user: true,
        interviewInvite: true,
      },
    });

    if (!interviewLogistics) {
      return res.status(404).json({ error: "Interview Logistics not found" });
    }

    res.json(interviewLogistics);
  } catch (error) {
    console.error("Error fetching interview logistics details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an InterviewLogistics by ID
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedInterviewLogistics = await prisma.interviewLogistics.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedInterviewLogistics);
  } catch (error) {
    console.error("Error updating interview logistics:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Interview Logistics not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an InterviewLogistics by ID
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.interviewLogistics.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Interview Logistics with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting interview logistics:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Interview Logistics not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List Interview Logistics with Pagination
router.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.interviewLogistics.count();

    const interviewLogistics = await prisma.interviewLogistics.findMany({
      skip: offset,
      take: 10,
      include: {
        program: true,
        user: true,
        interviewInvite: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ interviewLogistics, totalCount });
  } catch (error) {
    console.error("Error fetching interview logistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;