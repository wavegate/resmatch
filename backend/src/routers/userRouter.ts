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
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If the user's profile is not public and the current user is not the requested user
    if (!user.public && user.id !== currentUserId) {
      return res.json({ id: user.id });
    }

    const { password, ...rest } = user;

    res.json(rest);
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
