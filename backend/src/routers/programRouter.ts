import express from "express";
import prisma from "../prismaClient.js";
import { optionalVerifyToken } from "../middleware/authMiddleware.js";

const processAnonymous = (items, userId) => {
  return items.map((item) => {
    if (item.anonymous) {
      item.user = undefined; // Modify directly
      if (item.userId !== userId) {
        item.userId = undefined;
      }
    }
    return item;
  });
};

const programRouter = express.Router();

programRouter.get("/all", async (req, res) => {
  try {
    // Fetch all programs with necessary relations and ordering by state and city
    const programs = await prisma.program.findMany({
      orderBy: [
        {
          city: {
            state: "asc",
          },
        },
        {
          city: {
            name: "asc",
          },
        },
        {
          institution: {
            name: "asc",
          },
        },
        {
          nrmpProgramCode: "asc",
        },
      ],
      include: {
        institution: true,
        specialty: true,
        city: true,
      },
    });

    // Send response directly
    res.json({ programs });
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

programRouter.get("/", async (req, res) => {
  try {
    const programs = await prisma.program.findMany({
      select: {
        id: true,
        name: true,
        nrmpProgramCode: true,
        institution: {
          select: {
            name: true,
          },
        },
        city: true,
      },
      orderBy: {
        institution: {
          name: "asc",
        },
      },
    });

    res.status(200).json(programs);
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

programRouter.get("/:id", optionalVerifyToken, async (req, res) => {
  const userId = req.user?.id;
  const { id } = req.params;

  try {
    const programId = Number(id);
    if (isNaN(programId)) {
      return res.status(400).json({ error: "Invalid program ID" });
    }

    const program = await prisma.program.findUnique({
      where: { id: programId },
      include: {
        institution: {
          select: {
            id: true,
            name: true,
          },
        },
        city: {
          select: {
            name: true,
            state: true,
            userInputs: {
              include: {
                city: true,
                user: {
                  select: {
                    id: true,
                    alias: true,
                  },
                },
              },
            },
          },
        },
        interviewInvites: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        fameShames: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        PostIVCommunication: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        ScheduleDetails: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        InterviewLogistics: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        InterviewRejection: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        SecondLook: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        M4InternImpression: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        Malignant: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        LOIResponse: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        InterviewImpression: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        Question: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        Dropped: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        asProgramX: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
            programX: {
              select: {
                name: true,
                institution: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            programY: {
              select: {
                name: true,
                institution: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        asProgramY: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
            programX: {
              select: {
                name: true,
                institution: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            programY: {
              select: {
                name: true,
                institution: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        FellowshipMatch: {
          include: {
            user: {
              select: {
                id: true,
                alias: true,
              },
            },
          },
        },
        binAssignments: {
          include: {
            bin: {
              include: {
                tierList: true,
              },
            },
          },
        },
        followingUsers: {
          select: {
            id: true,
          },
        },
      },
    });

    if (program) {
      program.interviewInvites = processAnonymous(
        program.interviewInvites,
        userId
      );
      program.fameShames = processAnonymous(program.fameShames, userId);
      program.PostIVCommunication = processAnonymous(
        program.PostIVCommunication,
        userId
      );
      program.ScheduleDetails = processAnonymous(
        program.ScheduleDetails,
        userId
      );
      program.InterviewLogistics = processAnonymous(
        program.InterviewLogistics,
        userId
      );
      program.InterviewRejection = processAnonymous(
        program.InterviewRejection,
        userId
      );
      program.SecondLook = processAnonymous(program.SecondLook, userId);
      program.M4InternImpression = processAnonymous(
        program.M4InternImpression,
        userId
      );
      program.Malignant = processAnonymous(program.Malignant, userId);
      program.LOIResponse = processAnonymous(program.LOIResponse, userId);
      program.InterviewImpression = processAnonymous(
        program.InterviewImpression,
        userId
      );
      program.Question = processAnonymous(program.Question, userId);
      program.Dropped = processAnonymous(program.Dropped, userId);
      program.asProgramX = processAnonymous(program.asProgramX, userId);
      program.asProgramY = processAnonymous(program.asProgramY, userId);
      program.FellowshipMatch = processAnonymous(
        program.FellowshipMatch,
        userId
      );
    }

    const combinedList = [
      ...(program?.city?.userInputs?.map((item) => ({
        ...item,
        type: "cityUserInput",
      })) ?? []),
      ...(program?.interviewInvites?.map((item) => ({
        ...item,
        type: "interviewInvite",
      })) ?? []),
      ...(program?.fameShames?.map((item) => ({
        ...item,
        type: "fameShame",
      })) ?? []),
      ...(program?.PostIVCommunication?.map((item) => ({
        ...item,
        type: "postIVCommunication",
      })) ?? []),
      ...(program?.ScheduleDetails?.map((item) => ({
        ...item,
        type: "scheduleDetails",
      })) ?? []),
      ...(program?.InterviewLogistics?.map((item) => ({
        ...item,
        type: "interviewLogistics",
      })) ?? []),
      ...(program?.InterviewRejection?.map((item) => ({
        ...item,
        type: "interviewRejection",
      })) ?? []),
      ...(program?.M4InternImpression?.map((item) => ({
        ...item,
        type: "m4InternImpression",
      })) ?? []),
      ...(program?.Malignant?.map((item) => ({ ...item, type: "malignant" })) ??
        []),
      ...(program?.LOIResponse?.map((item) => ({
        ...item,
        type: "lOIResponse",
      })) ?? []),
      ...(program?.InterviewImpression?.map((item) => ({
        ...item,
        type: "interviewImpression",
      })) ?? []),
      ...(program?.SecondLook?.map((item) => ({
        ...item,
        type: "secondLook",
      })) ?? []),
      ...(program?.Question?.map((item) => ({ ...item, type: "question" })) ??
        []),
      ...(program?.Dropped?.map((item) => ({ ...item, type: "dropped" })) ??
        []),
      ...(program?.asProgramX?.map((item) => ({ ...item, type: "xorY" })) ??
        []),
      ...(program?.asProgramY?.map((item) => ({ ...item, type: "xorY" })) ??
        []),
      ...(program?.FellowshipMatch?.map((item) => ({
        ...item,
        type: "fellowshipMatch",
      })) ?? []),
    ];

    combinedList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }

    const {
      interviewInvites,
      fameShames,
      PostIVCommunication,
      ScheduleDetails,
      InterviewLogistics,
      InterviewRejection,
      SecondLook,
      M4InternImpression,
      Malignant,
      LOIResponse,
      InterviewImpression,
      Question,
      Dropped,
      asProgramX,
      asProgramY,
      FellowshipMatch,
      ...remainingProgramFields
    } = program;

    // const responseEndTime = Date.now();
    // console.log(`Response sent in ${responseEndTime - responseStartTime} ms`);

    // const totalTime = Date.now() - startTime;
    // console.log(`Total time for request: ${totalTime} ms`);

    // Return the response with only the remaining fields and the combinedList
    res.status(200).json({
      ...remainingProgramFields, // Send the rest of the program fields (excluding the ones we extracted)
      combinedList, // Add the combined list with the desired fields
    });
  } catch (error) {
    console.error("Error fetching program details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// programRouter.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const programId = Number(id);
//   const { name, image, cityId } = req.body;

//   if (isNaN(programId)) {
//     return res.status(400).json({ error: "Invalid program ID" });
//   }

//   try {
//     const updatedProgram = await prisma.program.update({
//       where: { id: programId },
//       data: {
//         name,
//         image,
//         cityId: cityId ? Number(cityId) : undefined,
//       },
//     });

//     if (!updatedProgram) {
//       return res.status(404).json({ error: "Program not found" });
//     }

//     res.status(200).json(updatedProgram);
//   } catch (error) {
//     console.error("Error updating program:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// programRouter.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   res.send(`Program with ID: ${id} deleted`);
// });

programRouter.post("/search", async (req, res) => {
  try {
    const {
      searchTerm = "",
      pageNum = 1,
      state = "",
      cityName = "",
      nrmpProgramCode = "",
    } = req.body;

    const PAGE_SIZE = 10;
    const offset = (pageNum - 1) * PAGE_SIZE;

    // Construct the query filters
    const filters = {
      AND: [
        {
          OR: [
            {
              institution: {
                name: {
                  contains: searchTerm,
                  mode: "insensitive", // Case-insensitive search
                },
              },
            },
            {
              name: {
                contains: searchTerm,
                mode: "insensitive", // Case-insensitive search
              },
            },
          ],
        },
        {
          nrmpProgramCode: {
            contains: nrmpProgramCode,
            mode: "insensitive", // Case-insensitive search
          },
        },
      ],
    };

    if (state || cityName) {
      filters["city"] = {
        AND: [
          state
            ? {
                state: {
                  contains: state,
                  mode: "insensitive",
                },
              }
            : {},
          cityName
            ? {
                name: {
                  contains: cityName,
                  mode: "insensitive",
                },
              }
            : {},
        ],
      };
    }

    // Count total number of programs matching the search criteria
    const totalCount = await prisma.program.count({
      where: filters,
    });

    // Fetch programs with sorting by institution name and including city information
    const programs = await prisma.program.findMany({
      where: filters,
      orderBy: {
        institution: {
          name: "asc",
        },
      },
      skip: offset,
      take: PAGE_SIZE,
      include: {
        institution: true,
        specialty: true,
        city: true,
      },
    });

    const formattedPrograms = programs.map((program) => ({
      id: program.id,
      name: program.name,
      image: program.image,
      nrmpProgramCode: program.nrmpProgramCode,
      acgmeCode: program.acgmeCode,
      institution: {
        id: program.institution.id,
        name: program.institution.name,
      },
      specialty: {
        name: program.specialty.name,
      },
      city: program.city
        ? {
            name: program.city.name,
            state: program.city.state,
          }
        : null,
    }));

    res.json({ programs: formattedPrograms, totalCount });
  } catch (error) {
    console.error("Error searching programs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default programRouter;
