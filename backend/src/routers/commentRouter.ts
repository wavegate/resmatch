import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const commentRouter = express.Router();

// Create a new comment
commentRouter.post("/", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // Extract all values from req.body and add userId to the data object
    const data = {
      ...req.body,
      userId: Number(userId),
    };

    // Create a new comment with the dynamically constructed data object
    const newComment = await prisma.comment.create({
      data,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single comment by ID
commentRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the comment with the user and replies included, ordered by createdAt
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
      include: {
        user: true, // Include the user information
        replies: {
          orderBy: {
            createdAt: "desc", // Order replies by createdAt, latest first
          },
        },
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the comment is not linked, if so, remove the user data
    if (comment.anonymous) {
      delete comment.user;
    }

    res.json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a comment by ID
commentRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { content },
    });

    res.json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a comment by ID
commentRouter.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.comment.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Comment with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting comment:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

commentRouter.post("/search", verifyToken, async (req, res) => {
  const { pageNum = 1, ...queryParams } = req.body;
  const PAGE_SIZE = 10; // Example page size

  try {
    // Construct the where clause dynamically using req.body
    const whereClause = {
      parentId: null,
      ...queryParams, // Spread all properties from req.body
    };

    // Convert specific fields to numbers if needed
    for (const key in whereClause) {
      if (typeof whereClause[key] === "string" && !isNaN(whereClause[key])) {
        whereClause[key] = Number(whereClause[key]);
      }
    }

    const totalCount = await prisma.comment.count({
      where: whereClause,
    });

    let comments = await prisma.comment.findMany({
      where: whereClause,
      include: {
        replies: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc", // Order by createdAt in descending order
      },
      skip: (pageNum - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    // Process comments to remove user information if anonymous is true
    comments = comments.map((comment) => {
      if (comment.anonymous) {
        comment.user = null; // Remove user information
      }
      return comment;
    });

    res.json({ totalCount, comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default commentRouter;
