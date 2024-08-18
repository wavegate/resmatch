import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const rankListRouter = express.Router();

// Get a tally of ranks for all programs across all RankLists
rankListRouter.get("/program-rank-tally", async (req, res) => {
  try {
    // Fetch all rank lists with their ranked programs
    const rankLists = await prisma.rankList.findMany({
      include: {
        RankedProgram: {
          include: {
            program: {
              include: {
                institution: true,
              },
            },
          },
        },
      },
    });

    // Initialize a tally object
    const programRankTally = {};

    rankLists.forEach((rankList) => {
      rankList.RankedProgram.forEach((rankedProgram) => {
        const programId = rankedProgram.program.id;
        let rank = rankedProgram.rank;
        if (rank >= 6) {
          rank = 6;
        }

        if (!programRankTally[programId]) {
          programRankTally[programId] = {
            program: rankedProgram.program,
            rankTally: {},
            totalRankLists: 0,
          };
        }

        // Tally the rank for this program
        if (!programRankTally[programId].rankTally[rank]) {
          programRankTally[programId].rankTally[rank] = 0;
        }
        programRankTally[programId].rankTally[rank]++;

        // Increment the total number of rank lists this program appears in
        programRankTally[programId].totalRankLists++;
      });
    });

    // Convert the result into an array of objects
    const result = Object.values(programRankTally);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching program rank tally:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new RankList (protected by verifyToken)
rankListRouter.post("/", verifyToken, async (req, res) => {
  const {
    graduateType,
    numberOfProgramsApplied,
    numberOfInvites,
    numberOfInterviewsAttended,
    programs, // Array of { programId, rank }
    matchedProgramId,
    doneWithInterviews,
    whyNumberOne,
    prioritiesWhenRanking,
    hardestPartOfRanking,
    medicalDegree,
    anonymous = false,
  } = req.body;

  const userId = req.user.id;

  try {
    const newRankList = await prisma.rankList.create({
      data: {
        graduateType,
        numberOfProgramsApplied,
        numberOfInvites,
        numberOfInterviewsAttended,
        matchedProgramId,
        doneWithInterviews,
        whyNumberOne,
        prioritiesWhenRanking,
        hardestPartOfRanking,
        medicalDegree,
        userId,
        anonymous,
        RankedProgram: {
          create: programs.map((program, index) => ({
            rank: program.rank,
            program: { connect: { id: program.programId } },
          })),
        },
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
        RankedProgram: {
          orderBy: { rank: "asc" }, // Ensure programs are ordered
          include: {
            program: {
              include: {
                institution: true,
              },
            },
          },
        },
        matchedProgram: {
          include: {
            institution: true,
          },
        },
        user: true,
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

    // Remove user data if linked is not true
    if (rankList.anonymous) {
      rankList.user = undefined;
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
    programs, // Array of { programId, rank }
    matchedProgramId,
    doneWithInterviews,
    whyNumberOne,
    prioritiesWhenRanking,
    hardestPartOfRanking,
    medicalDegree,
    anonymous = true,
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
        matchedProgramId,
        doneWithInterviews,
        whyNumberOne,
        prioritiesWhenRanking,
        hardestPartOfRanking,
        medicalDegree,
        anonymous,
        RankedProgram: {
          deleteMany: {}, // Clear existing relations
          create: programs.map((program) => ({
            rank: program.rank,
            program: { connect: { id: program.programId } },
          })),
        },
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
  const { pageNum = 1, graduateType, medicalDegree } = req.body;
  const offset = (pageNum - 1) * 10;

  try {
    // Define the filters object based on provided graduateType and medicalDegree
    const filters = {};

    if (graduateType) {
      filters.graduateType = graduateType;
    }

    if (medicalDegree) {
      filters.medicalDegree = medicalDegree;
    }

    // Get the total count for pagination with filters applied
    const totalCount = await prisma.rankList.count({
      where: filters,
    });

    // Get the paginated rank lists with filters and relationships
    const rankLists = await prisma.rankList.findMany({
      skip: offset,
      take: 10,
      where: filters,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        RankedProgram: {
          orderBy: { rank: "asc" }, // Ensure programs are ordered
          include: {
            program: {
              include: {
                institution: true,
              },
            },
          },
        },
        comments: true,
        matchedProgram: {
          include: {
            institution: true,
          },
        },
      },
    });

    // Remove user data if linked is not true
    const processedRankLists = rankLists.map((rankList) => {
      if (rankList.anonymous) {
        rankList.user = undefined;
      }
      return rankList;
    });

    res.status(200).json({ rankLists: processedRankLists, totalCount });
  } catch (error) {
    console.error("Error searching rank lists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default rankListRouter;
