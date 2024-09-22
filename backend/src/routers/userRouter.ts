import express from "express";
import prisma from "../prismaClient.js";
import {
  optionalVerifyToken,
  verifyToken,
} from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/:id", optionalVerifyToken, async (req, res) => {
  const { id } = req.params;
  const currentUserId = req.user?.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        interviewInvites: {
          include: {
            program: {
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
        fameShames: {
          include: {
            program: {
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
        PostIVCommunication: {
          include: {
            program: {
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
        ScheduleDetails: {
          include: {
            program: {
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
        InterviewLogistics: {
          include: {
            program: {
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
        InterviewRejection: {
          include: {
            program: {
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
        SecondLook: {
          include: {
            program: {
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
        M4InternImpression: {
          include: {
            program: {
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
        Malignant: {
          include: {
            program: {
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
        LOIResponse: {
          include: {
            program: {
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
        InterviewImpression: {
          include: {
            program: {
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
        Question: {
          include: {
            program: {
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
        Dropped: {
          include: {
            program: {
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
        XorY: {
          include: {
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
            program: {
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
      },
    });

    const combinedList = [
      ...(user?.interviewInvites
        ?.filter((item) => !item.anonymous)
        .map((item) => ({
          ...item,
          type: "interviewInvite",
        })) ?? []),
      ...(user?.fameShames
        ?.filter((item) => !item.anonymous)
        .map((item) => ({
          ...item,
          type: "fameShame",
        })) ?? []),
      ...(user?.PostIVCommunication?.filter((item) => !item.anonymous).map(
        (item) => ({
          ...item,
          type: "postIVCommunication",
        })
      ) ?? []),
      ...(user?.ScheduleDetails?.filter((item) => !item.anonymous).map(
        (item) => ({
          ...item,
          type: "scheduleDetails",
        })
      ) ?? []),
      ...(user?.InterviewLogistics?.filter((item) => !item.anonymous).map(
        (item) => ({
          ...item,
          type: "interviewLogistics",
        })
      ) ?? []),
      ...(user?.InterviewRejection?.filter((item) => !item.anonymous).map(
        (item) => ({
          ...item,
          type: "interviewRejection",
        })
      ) ?? []),
      ...(user?.M4InternImpression?.filter((item) => !item.anonymous).map(
        (item) => ({
          ...item,
          type: "m4InternImpression",
        })
      ) ?? []),
      ...(user?.Malignant?.filter((item) => !item.anonymous).map((item) => ({
        ...item,
        type: "malignant",
      })) ?? []),
      ...(user?.LOIResponse?.filter((item) => !item.anonymous).map((item) => ({
        ...item,
        type: "lOIResponse",
      })) ?? []),
      ...(user?.InterviewImpression?.filter((item) => !item.anonymous).map(
        (item) => ({
          ...item,
          type: "interviewImpression",
        })
      ) ?? []),
      ...(user?.SecondLook?.filter((item) => !item.anonymous).map((item) => ({
        ...item,
        type: "secondLook",
      })) ?? []),
      ...(user?.Question?.filter((item) => !item.anonymous).map((item) => ({
        ...item,
        type: "question",
      })) ?? []),
      ...(user?.Dropped?.filter((item) => !item.anonymous).map((item) => ({
        ...item,
        type: "dropped",
      })) ?? []),
      ...(user?.XorY?.filter((item) => !item.anonymous).map((item) => ({
        ...item,
        type: "xorY",
      })) ?? []),
      ...(user?.FellowshipMatch?.filter((item) => !item.anonymous).map(
        (item) => ({
          ...item,
          type: "fellowshipMatch",
        })
      ) ?? []),
    ];

    combinedList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If the user's profile is not public and the current user is not the requested user
    if (!user.public && user.id !== currentUserId) {
      return res.json({ id: user.id });
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
      FellowshipMatch,
      password,
      XorY,
      ...remainingUserFields
    } = user;

    res.json({
      ...remainingUserFields,
      combinedList,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { alias, programIdToAdd, programIdToRemove, ...formData } = req.body;

  // Check if the current user is the owner of the item
  if (Number(id) !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You do not have permission to update this item" });
  }

  try {
    // Check if alias already exists in another user
    if (alias) {
      const existingUser = await prisma.user.findUnique({
        where: { alias },
      });

      if (existingUser && existingUser.id !== Number(id)) {
        return res.status(400).json({ error: "Alias already in use" });
      }
    }

    let updateData = { alias, ...formData };

    if (programIdToAdd) {
      const existingProgram = await prisma.program.findUnique({
        where: { id: Number(programIdToAdd) },
      });

      if (!existingProgram) {
        return res.status(404).json({ error: "Program not found" });
      }

      updateData = {
        ...updateData,
        followedPrograms: {
          connect: { id: Number(programIdToAdd) },
        },
      };
    }

    if (programIdToRemove) {
      const existingProgram = await prisma.program.findUnique({
        where: { id: Number(programIdToRemove) },
      });

      if (!existingProgram) {
        return res.status(404).json({ error: "Program not found" });
      }

      updateData = {
        ...updateData,
        followedPrograms: {
          disconnect: { id: Number(programIdToRemove) },
        },
      };
    }

    // Update the user with the provided formData
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        followedPrograms: {
          select: { id: true },
        },
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  // Check if the current user is the owner of the item
  if (id !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You do not have permission to update this item" });
  }
  res.send(`User with ID: ${id} deleted`);
});

userRouter.post("/search", async (req, res) => {
  try {
    const { searchTerm = "", graduateType = "", pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    // Construct the where clause based on searchTerm and graduateType
    const whereClause = {
      alias: {
        contains: searchTerm,
        mode: "insensitive", // Case-insensitive search
      },
      public: true,
    };

    if (graduateType) {
      whereClause.graduateType = graduateType;
    }

    // Total count query
    const totalCount = await prisma.user.count({
      where: whereClause,
    });

    // Users query
    const usersWithPassword = await prisma.user.findMany({
      where: whereClause,
      skip: offset,
      take: 1000,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Remove password from results
    const users = usersWithPassword.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json({ users, totalCount });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default userRouter;
