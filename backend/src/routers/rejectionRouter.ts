import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { removeUndefinedValues } from "../utils/various.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const formData = req.body;
  const userId = req.user.id;

  const data = removeUndefinedValues({
    anonymous: formData.anonymous ?? true,
    programId: formData.programId ? parseInt(formData.programId) : undefined,
    date: formData.date ? new Date(formData.date) : undefined,
    signal: formData.signal,
    geographicPreference: formData.geographicPreference,
    locationState: formData.locationState,
    additionalComments: formData.additionalComments,
    step1ScorePass: formData.step1ScorePass,
    step1Score: formData.step1Score ? parseInt(formData.step1Score) : undefined,
    step2Score: formData.step2Score ? parseInt(formData.step2Score) : undefined,
    comlex1ScorePass: formData.comlex1ScorePass,
    comlex2Score: formData.comlex2Score,
    visaRequired: formData.visaRequired,
    subI: formData.subI,
    home: formData.home,
    yearOfGraduation: formData.yearOfGraduation
      ? parseInt(formData.yearOfGraduation)
      : undefined,
    greenCard: formData.greenCard,
    away: formData.away,
    graduateType: formData.graduateType,
    img: formData.img,
    medicalDegree: formData.medicalDegree,
    userId,
  });

  try {
    const newInterviewRejection = await prisma.interviewRejection.create({
      data,
    });

    res.status(201).json(newInterviewRejection);
  } catch (error) {
    console.error("Error creating interview rejection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get an InterviewRejection by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const interviewRejection = await prisma.interviewRejection.findUnique({
      where: { id: Number(id) },
      include: {
        program: true,
        user: true,
      },
    });

    if (!interviewRejection) {
      return res.status(404).json({ error: "Interview Rejection not found" });
    }

    res.json(interviewRejection);
  } catch (error) {
    console.error("Error fetching interview rejection details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an InterviewRejection by ID
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedInterviewRejection = await prisma.interviewRejection.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedInterviewRejection);
  } catch (error) {
    console.error("Error updating interview rejection:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Interview Rejection not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an InterviewRejection by ID
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.interviewRejection.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Interview Rejection with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting interview rejection:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Interview Rejection not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.interviewRejection.count();

    const interviewRejections = await prisma.interviewRejection.findMany({
      skip: offset,
      take: 10,
      include: {
        program: {
          include: {
            institution: true,
          },
        },
        user: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    // Process the interviewRejections to remove user data if linked is not true
    const processedRejections = interviewRejections.map((rejection) => {
      if (rejection.anonymous) {
        rejection.user = undefined;
      }
      return rejection;
    });

    res.json({ interviewRejections: processedRejections, totalCount });
  } catch (error) {
    console.error("Error fetching interview rejections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
