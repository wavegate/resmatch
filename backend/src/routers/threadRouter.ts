import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const threadRouter = express.Router();

// Create a new thread (protected by verifyToken)
threadRouter.post("/", verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Assuming the user ID is available from the verified token

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const newThread = await prisma.thread.create({
      data: {
        title,
        content,
        userId,
      },
    });
    res.status(201).json(newThread);
  } catch (error) {
    console.error("Error creating thread:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific thread by ID
threadRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const threadId = Number(id);
    if (isNaN(threadId)) {
      return res.status(400).json({ error: "Invalid thread ID" });
    }

    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
      include: {
        user: true, // Include the user who created the thread
        replies: {
          include: {
            user: true, // Include the user who created the reply
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json(thread);
  } catch (error) {
    console.error("Error fetching thread details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a thread by ID (protected by verifyToken)
threadRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const threadId = Number(id);
  const { title, content } = req.body;

  if (isNaN(threadId)) {
    return res.status(400).json({ error: "Invalid thread ID" });
  }

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const updatedThread = await prisma.thread.update({
      where: { id: threadId },
      data: {
        title,
        content,
      },
    });

    if (!updatedThread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json(updatedThread);
  } catch (error) {
    console.error("Error updating thread:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a thread by ID (protected by verifyToken)
threadRouter.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const threadId = Number(id);
    if (isNaN(threadId)) {
      return res.status(400).json({ error: "Invalid thread ID" });
    }

    const deletedThread = await prisma.thread.delete({
      where: { id: threadId },
    });

    res
      .status(200)
      .json({ message: `Thread with ID: ${threadId} deleted`, deletedThread });
  } catch (error) {
    console.error("Error deleting thread:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Search and paginate threads based on date
threadRouter.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;

    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.thread.count();

    const threads = await prisma.thread.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: offset,
      take: 10,
      include: {
        user: {
          select: {
            alias: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                alias: true,
              },
            },
          },
        },
      },
    });

    res.json({ threads, totalCount });
  } catch (error) {
    console.error("Error fetching threads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default threadRouter;
