import express from "express";
import prisma from "../prismaClient.js";

const userRouter = express.Router();

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, ...rest } = user;

    res.json(rest);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: formData,
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

userRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} deleted`);
});

userRouter.post("/search", async (req, res) => {
  try {
    const { searchTerm = "", pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCountResult = await prisma.$queryRaw`
  SELECT COUNT(*) FROM "User"
  WHERE "alias" ILIKE ${"%" + searchTerm + "%"}
`;
    const totalCount = Number(totalCountResult[0].count);

    const usersWithPassword = await prisma.$queryRaw`
  SELECT * FROM "User"
  WHERE "alias" ILIKE ${"%" + searchTerm + "%"}
  LIMIT 10 OFFSET ${offset}
`;

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
