import express from "express";
import prisma from "../prismaClient.js";
import { Prisma } from "@prisma/client";
import {
  AuthenticatedRequest,
  verifyToken,
} from "../middleware/authMiddleware.js";
import { removeUndefinedValues } from "../utils/various.js";

const inviteRouter = express.Router();

inviteRouter.get("/total-invites-over-time", async (req, res) => {
  try {
    const rawData = await prisma.$queryRaw`
      SELECT
        DATE("inviteDateTime") AS date,
        COUNT(*)::bigint AS totalInvites
      FROM "InterviewInvite"
      GROUP BY DATE("inviteDateTime")
      ORDER BY DATE("inviteDateTime");
    `;

    const formattedData = rawData.map((entry) => ({
      date: entry.date,
      totalInvites: Number(entry.totalinvites),
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error retrieving total invites over time:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

inviteRouter.post("/", verifyToken, async (req: AuthenticatedRequest, res) => {
  try {
    const formData = req.body;
    const userId = req.user.id;

    const data = removeUndefinedValues({
      anonymous: formData.anonymous ?? true,
      programId: formData.programId ? parseInt(formData.programId) : undefined,
      inviteDateTime: formData.inviteDateTime
        ? new Date(formData.inviteDateTime)
        : undefined,
      signal: formData.signal,
      geographicPreference: formData.geographicPreference,
      locationState: formData.locationState,
      additionalComments: formData.additionalComments,
      step1ScorePass: formData.step1ScorePass,
      step1Score: formData.step1Score
        ? parseInt(formData.step1Score)
        : undefined,
      step2Score: formData.step2Score
        ? parseInt(formData.step2Score)
        : undefined,
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

    const newInvite = await prisma.interviewInvite.create({ data });

    res.status(201).json(newInvite);
  } catch (error) {
    console.error("Error creating interview invite:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get an Invite by ID
inviteRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const invite = await prisma.interviewInvite.findUnique({
      where: { id: Number(id) },
      include: {
        program: true,
        user: true,
      },
    });

    if (!invite) {
      return res.status(404).json({ error: "Invite not found" });
    }

    res.json(invite);
  } catch (error) {
    console.error("Error fetching invite details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an Invite by ID
inviteRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedInvite = await prisma.interviewInvite.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedInvite);
  } catch (error) {
    console.error("Error updating invite:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Invite not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an Invite by ID
inviteRouter.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.interviewInvite.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Invite with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting invite:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Invite not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

inviteRouter.post("/search", async (req, res) => {
  try {
    const { programId, userId, startDate, endDate, pageNum } = req.body;

    const page = pageNum ? parseInt(pageNum, 10) : 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const conditions: Prisma.InterviewInviteWhereInput = {};

    if (programId) {
      conditions.programId = programId;
    }

    if (userId) {
      conditions.userId = userId;
    }

    if (startDate || endDate) {
      conditions.inviteDateTime = {};
      if (startDate) {
        conditions.inviteDateTime.gte = new Date(startDate);
      }
      if (endDate) {
        conditions.inviteDateTime.lte = new Date(endDate);
      }
    }

    const totalCount = await prisma.interviewInvite.count({
      where: conditions,
    });

    let interviewInvites = await prisma.interviewInvite.findMany({
      where: conditions,
      include: {
        program: {
          include: {
            institution: true,
          },
        },
        user: true,
      },
      orderBy: {
        inviteDateTime: "desc",
      },
      skip,
      take: pageSize,
    });

    // Process interviewInvites to remove user data if the linked field is false
    interviewInvites = interviewInvites.map((invite) => {
      if (invite.anonymous) {
        // Replace 'linked' with the correct field if necessary
        invite.user = undefined; // Remove user data
      }
      return invite;
    });

    res.json({ totalCount, interviewInvites });
  } catch (error) {
    console.error("Error searching interview invites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default inviteRouter;
