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
      anonymous: formData.anonymous ?? false,
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

inviteRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Invite details for ID: ${id}`);
});

inviteRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Invite with ID: ${id} updated`);
});

inviteRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Invite with ID: ${id} deleted`);
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

    const interviewInvites = await prisma.interviewInvite.findMany({
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

    res.json({ totalCount, interviewInvites });
  } catch (error) {
    console.error("Error searching interview invites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default inviteRouter;
