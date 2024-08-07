import express from "express";
import prisma from "../prismaClient.js";

const userRouter = express.Router();

userRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`User details for ID: ${id}`);
});

userRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} updated`);
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

    const users = await prisma.$queryRaw`
      SELECT 
        id AS user_id, 
        alias AS user_alias
      FROM "User"
      WHERE "alias" ILIKE ${"%" + searchTerm + "%"}
      LIMIT 10 OFFSET ${offset}
    `;

    const formattedUsers = users.map((user) => ({
      id: user.user_id,
      alias: user.user_alias,
    }));

    res.json({ users: formattedUsers, totalCount });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default userRouter;
