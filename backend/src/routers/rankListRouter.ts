import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const rankListRouter = express.Router();

// Create a new RankList (protected by verifyToken)
rankListRouter.post("/", verifyToken, async (req, res) => {
  const {
    graduateType,
    numberOfProgramsApplied,
    numberOfInvites,
    numberOfInterviewsAttended,
    programs,
    matchedProgramId,
    doneWithInterviews,
    whyNumberOne,
    prioritiesWhenRanking,
    hardestPartOfRanking,
    medicalDegree,
  } = req.body;

  const userId = req.user.id; // Assuming the user ID is available from the verified token

  try {
    const newRankList = await prisma.rankList.create({
      data: {
        graduateType,
        numberOfProgramsApplied,
        numberOfInvites,
        numberOfInterviewsAttended,
        programs: {
          connect: programs.map((programId) => ({ id: programId })),
        },
        matchedProgramId,
        doneWithInterviews,
        whyNumberOne,
        prioritiesWhenRanking,
        hardestPartOfRanking,
        medicalDegree,
        userId, // Assuming RankList is associated with a user
      },
    });
    res.status(201).json(newRankList);
  } catch (error) {
    console.error("Error creating RankList:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific RankList by ID
rankListRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const rankListId = Number(id);
    if (isNaN(rankListId)) {
      return res.status(400).json({ error: "Invalid RankList ID" });
    }

    const rankList = await prisma.rankList.findUnique({
      where: { id: rankListId },
      include: {
        programs: true,
        matchedProgram: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!rankList) {
      return res.status(404).json({ error: "RankList not found" });
    }

    res.status(200).json(rankList);
  } catch (error) {
    console.error("Error fetching RankList details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a RankList by ID (protected by verifyToken)
rankListRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const rankListId = Number(id);
  const {
    graduateType,
    numberOfProgramsApplied,
    numberOfInvites,
    numberOfInterviewsAttended,
    programs,
    matchedProgramId,
    doneWithInterviews,
    whyNumberOne,
    prioritiesWhenRanking,
    hardestPartOfRanking,
    medicalDegree,
  } = req.body;

  if (isNaN(rankListId)) {
    return res.status(400).json({ error: "Invalid RankList ID" });
  }

  try {
    const updatedRankList = await prisma.rankList.update({
      where: { id: rankListId },
      data: {
        graduateType,
        numberOfProgramsApplied,
        numberOfInvites,
        numberOfInterviewsAttended,
        programs: {
          set: [], // Clear existing relations
          connect: programs.map((programId) => ({ id: programId })), // Reconnect new programs
        },
        matchedProgramId,
        doneWithInterviews,
        whyNumberOne,
        prioritiesWhenRanking,
        hardestPartOfRanking,
        medicalDegree,
      },
    });

    res.status(200).json(updatedRankList);
  } catch (error) {
    console.error("Error updating RankList:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a RankList by ID (protected by verifyToken)
rankListRouter.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const rankListId = Number(id);
    if (isNaN(rankListId)) {
      return res.status(400).json({ error: "Invalid RankList ID" });
    }

    const deletedRankList = await prisma.rankList.delete({
      where: { id: rankListId },
    });

    res.status(200).json({
      message: `RankList with ID: ${rankListId} deleted`,
      deletedRankList,
    });
  } catch (error) {
    console.error("Error deleting RankList:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Search RankLists with pagination and optional filtering
rankListRouter.post("/search", async (req, res) => {
  const { pageNum = 1 } = req.body;

  const offset = (pageNum - 1) * 10;

  try {
    // Get the total count for pagination
    const totalCount = await prisma.rankList.count();

    // Get the paginated rank lists
    const rankLists = await prisma.rankList.findMany({
      skip: offset,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            alias: true,
          },
        },
      },
    });

    res.status(200).json({ rankLists, totalCount });
  } catch (error) {
    console.error("Error searching rank lists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default rankListRouter;
