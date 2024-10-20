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
        DATE("date") AS date,
        "graduateType",
        COUNT(*)::bigint AS totalInvites
      FROM "InterviewInvite"
      GROUP BY DATE("date"), "graduateType"
      ORDER BY DATE("date"), "graduateType";
    `;

    // Initialize an object to store data grouped by date
    const inviteDataByDate = {};

    rawData.forEach((entry) => {
      const formattedDate = entry.date;

      if (!inviteDataByDate[formattedDate]) {
        inviteDataByDate[formattedDate] = {
          date: formattedDate,
          US: 0,
          IMG: 0,
        };
      }

      // Increment totalUSInvites or totalIMGInvites based on graduateType
      if (entry.graduateType === "US") {
        inviteDataByDate[formattedDate].US = Number(entry.totalinvites);
      } else if (entry.graduateType === "IMG") {
        inviteDataByDate[formattedDate].IMG = Number(entry.totalinvites);
      }
    });

    // Convert the result object into an array
    const formattedData = Object.values(inviteDataByDate);

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error retrieving total invites over time:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

inviteRouter.get("/signals-over-time", async (req, res) => {
  try {
    const rawData = await prisma.$queryRaw`
      SELECT
        DATE_TRUNC('week', "date") AS week,
        "signalTier",
        COUNT(*)::bigint AS totalInvites
      FROM "InterviewInvite"
      GROUP BY DATE_TRUNC('week', "date"), "signalTier"
      ORDER BY DATE_TRUNC('week', "date"), "signalTier";
    `;

    // Initialize an object to store data grouped by week
    const inviteDataByWeek = {};

    rawData.forEach((entry) => {
      const formattedWeek = entry.week;

      if (!inviteDataByWeek[formattedWeek]) {
        inviteDataByWeek[formattedWeek] = {
          week: formattedWeek,
          totalNoSignalInvites: 0,
          totalSignalInvites: 0,
          totalGoldInvites: 0,
          totalSilverInvites: 0,
        };
      }

      // Increment based on signalTier, including handling null signalTier as NO_SIGNAL
      switch (entry.signalTier) {
        case "NO_SIGNAL":
        case null: // Handle null as NO_SIGNAL
          inviteDataByWeek[formattedWeek].totalNoSignalInvites = Number(
            entry.totalinvites
          );
          break;
        case "SIGNAL":
          inviteDataByWeek[formattedWeek].totalSignalInvites = Number(
            entry.totalinvites
          );
          break;
        case "GOLD":
          inviteDataByWeek[formattedWeek].totalGoldInvites = Number(
            entry.totalinvites
          );
          break;
        case "SILVER":
          inviteDataByWeek[formattedWeek].totalSilverInvites = Number(
            entry.totalinvites
          );
          break;
      }
    });

    // Convert the result object into an array
    const formattedData = Object.values(inviteDataByWeek);

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error retrieving total invites over time:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

inviteRouter.get("/program-competitiveness", async (req, res) => {
  try {
    const rawData = await prisma.$queryRaw`
      SELECT
        "programId",
        AVG("step2Score")::decimal AS avgStep2Score,
        COUNT(*) AS inviteCount
      FROM "InterviewInvite"
      WHERE "step2Score" IS NOT NULL
      GROUP BY "programId"
      HAVING COUNT(*) >= 10
      ORDER BY AVG("step2Score") DESC
      LIMIT 10;
    `;

    // Format the data
    const formattedData = rawData.map((entry) => ({
      programId: entry.programId,
      avgStep2Score: Number(entry.avgstep2score),
      inviteCount: Number(entry.invitecount), // Include invite count if you want to return it
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error retrieving program competitiveness:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

inviteRouter.get("/programs-with-most-invites", async (req, res) => {
  try {
    const rawData = await prisma.$queryRaw`
      SELECT
        "programId",
        COUNT(*)::bigint AS totalInvites
      FROM "InterviewInvite"
      GROUP BY "programId"
      ORDER BY totalInvites DESC
      LIMIT 10;
    `;

    // Format the data
    const formattedData = rawData.map((entry) => ({
      programId: entry.programId,
      totalInvites: Number(entry.totalinvites),
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error retrieving programs with most invites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

inviteRouter.get("/invites-by-graduate-type", async (req, res) => {
  try {
    const rawData = await prisma.$queryRaw`
      SELECT
        CASE 
          WHEN "medicalDegree" = 'MD' THEN 'MD'
          WHEN "medicalDegree" = 'DO' THEN 'DO'
          WHEN "img" = 'USIMG' THEN 'US IMG'
          WHEN "img" = 'NONUSIMG' THEN 'Non-US IMG'
          ELSE 'Unspecified'
        END AS inviteType,
        COUNT(*)::bigint AS inviteCount
      FROM "InterviewInvite"
      GROUP BY inviteType;
    `;

    // Format the data
    const formattedData = rawData.map((entry) => ({
      inviteType: entry.invitetype,
      inviteCount: Number(entry.invitecount),
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error retrieving invites by graduate type:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

inviteRouter.get("/invites-by-geographic-preference", async (req, res) => {
  try {
    const rawData = await prisma.$queryRaw`
      SELECT
        CASE 
          WHEN "geographicPreference" = true THEN 'Yes'
          ELSE 'No'
        END AS inviteType,
        COUNT(*)::bigint AS inviteCount
      FROM "InterviewInvite"
      GROUP BY inviteType;
    `;

    // Format the data
    const formattedData = rawData.map((entry) => ({
      inviteType: entry.invitetype,
      inviteCount: Number(entry.invitecount),
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error retrieving invites by geographic preference:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

inviteRouter.get("/invites-by-state", async (req, res) => {
  try {
    const rawData = await prisma.$queryRaw`
      SELECT
        "City"."state" AS state,
        COUNT("InterviewInvite".*)::bigint AS inviteCount
      FROM "InterviewInvite"
      JOIN "Program" ON "InterviewInvite"."programId" = "Program"."id"
      JOIN "City" ON "Program"."cityId" = "City"."id"
      GROUP BY "City"."state"
      ORDER BY inviteCount DESC;
    `;

    // Format the data
    const formattedData = rawData.map((entry) => ({
      state: entry.state,
      inviteCount: Number(entry.invitecount),
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error retrieving invites by state:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
inviteRouter.get("/programs-min-invite-spots", async (req, res) => {
  try {
    const rawData = await prisma.$queryRaw`
      SELECT DISTINCT ON ("programId")
        "programId",
        "id" AS inviteId,
        "numSpotsLeft" AS minSpotsLeft,
        "date"
      FROM "InterviewInvite"
      WHERE "numSpotsLeft" IS NOT NULL
      ORDER BY "programId", "numSpotsLeft" ASC, "date" ASC;
    `;

    // Format the data into a more readable structure
    const formattedData = rawData.map((entry) => ({
      programId: entry.programId,
      inviteId: entry.inviteid,
      minSpotsLeft: entry.minspotsleft,
      date: entry.date,
    }));

    // Sort the formatted data by the number of spots left in descending order (highest first)
    const sortedData = formattedData.sort(
      (a, b) => a.minSpotsLeft - b.minSpotsLeft
    );

    // Return the sorted data
    res.status(200).json(sortedData);
  } catch (error) {
    console.error("Error retrieving programs' min invite spots:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

inviteRouter.get("/last-10-programs", async (req, res) => {
  try {
    // Query to get the last 10 programs based on the most recent invites
    const rawData = await prisma.$queryRaw`
      SELECT "programId", MAX("date") AS latestInviteDate, MAX("createdAt") AS latestCreatedAt
      FROM "InterviewInvite"
      GROUP BY "programId"
      ORDER BY latestInviteDate DESC, latestCreatedAt DESC
      LIMIT 10;
    `;

    // Format the data into a simple array of programIds
    const programIds = rawData.map((entry) => entry.programId);

    res.status(200).json(programIds);
  } catch (error) {
    console.error("Error retrieving last 10 programs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

inviteRouter.get("/top-10-users-invites", async (req, res) => {
  try {
    const rawData = await prisma.$queryRaw`
      SELECT 
        "User"."id" AS userId, 
        "User"."alias" AS alias,
        COUNT("InterviewInvite".*)::bigint AS inviteCount
      FROM "InterviewInvite"
      JOIN "User" ON "InterviewInvite"."userId" = "User"."id"
      WHERE "InterviewInvite"."anonymous" IS NOT TRUE
      GROUP BY "User"."id", "User"."alias"
      ORDER BY inviteCount DESC
      LIMIT 10;
    `;

    // Format the data
    const formattedData = rawData.map((entry) => ({
      userId: entry.userid,
      alias: entry.alias,
      inviteCount: Number(entry.invitecount),
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error retrieving top users by invites:", error);
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
