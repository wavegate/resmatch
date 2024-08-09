import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const replyRouter = express.Router();

// Create a reply to a specific thread (protected by verifyToken)
replyRouter.post("/:threadId", verifyToken, async (req, res) => {
  const { threadId } = req.params;
  const { content } = req.body;
  const userId = req.user.id; // Assuming user ID is available from authentication middleware

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const threadIdInt = Number(threadId);
    if (isNaN(threadIdInt)) {
      return res.status(400).json({ error: "Invalid thread ID" });
    }

    const newReply = await prisma.reply.create({
      data: {
        content,
        threadId: threadIdInt,
        userId,
      },
    });

    res.status(201).json(newReply);
  } catch (error) {
    console.error("Error creating reply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all replies for a specific thread
replyRouter.get("/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const threadIdInt = Number(threadId);
    if (isNaN(threadIdInt)) {
      return res.status(400).json({ error: "Invalid thread ID" });
    }

    const replies = await prisma.reply.findMany({
      where: { threadId: threadIdInt },
      include: {
        user: true, // Include the user who created the reply
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json(replies);
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a specific reply by ID (protected by verifyToken)
replyRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const replyId = Number(id);
    if (isNaN(replyId)) {
      return res.status(400).json({ error: "Invalid reply ID" });
    }

    const updatedReply = await prisma.reply.update({
      where: { id: replyId },
      data: { content },
    });

    res.status(200).json(updatedReply);
  } catch (error) {
    console.error("Error updating reply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a specific reply by ID (protected by verifyToken)
replyRouter.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const replyId = Number(id);
    if (isNaN(replyId)) {
      return res.status(400).json({ error: "Invalid reply ID" });
    }

    const deletedReply = await prisma.reply.delete({
      where: { id: replyId },
    });

    res
      .status(200)
      .json({ message: `Reply with ID: ${replyId} deleted`, deletedReply });
  } catch (error) {
    console.error("Error deleting reply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default replyRouter;
