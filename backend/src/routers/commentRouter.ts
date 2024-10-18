import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import prisma from "../prismaClient.js";
import { modelNames } from "../modelNames.js";

const commentRouter = express.Router();

// Create a new comment
commentRouter.post("/", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // Extract all values from req.body and add userId to the data object
    const { parentId, ...rest } = req.body; // Extract parentId separately
    const data = {
      ...rest,
      userId: Number(userId),
      parentId: parentId ? Number(parentId) : null, // Include parentId if it exists
    };

    // Create a new comment
    const newComment = await prisma.comment.create({
      data,
    });

    // Check if there is a parentId (indicating this is a reply to a comment)
    if (parentId) {
      // Find the parent comment
      const parentComment = await prisma.comment.findUnique({
        where: {
          id: Number(parentId),
        },
        include: {
          user: true, // Get the user of the parent comment
        },
      });

      if (!parentComment) {
        return res.status(404).json({ error: "Parent comment not found" });
      }

      // Create a notification for the user of the parent comment
      await prisma.notification.create({
        data: {
          userId: parentComment.userId, // User who created the parent comment
          notificationType: "COMMENT_REPLY", // Notification type
          commentId: parentComment.id, // The parent comment
          replyCommentId: newComment.id, // The new comment (reply)
        },
      });
    } else {
      for (const modelName of modelNames) {
        const modelNameIdKey = `${modelName}Id`;
        if (req.body[modelNameIdKey]) {
          const modelNameId = req.body[modelNameIdKey];

          // Find the user for the model (assumes each model has a `userId`)
          const modelRecord = await prisma[modelName].findUnique({
            where: { id: Number(modelNameId) },
            select: { userId: true },
          });

          if (!modelRecord) {
            return res
              .status(404)
              .json({ error: `${modelName} record not found` });
          }

          // Create a notification for the user related to this model
          await prisma.notification.create({
            data: {
              userId: modelRecord.userId, // User for the related model record
              [`${modelName}Id`]: Number(modelNameId), // Related model's ID
              notificationType: "POST_COMMENT", // Notification type
              replyCommentId: newComment.id, // The new comment (reply)
            },
          });
        }
      }
    }

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
          select: {
            id: true,
          },
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
  const { content, category } = req.body;

  // Fetch the item to verify ownership
  const item = await prisma.comment.findUnique({
    where: { id: Number(req.params.id) }, // Assuming `id` is the primary key
    select: { userId: true }, // Adjust based on your model's fields
  });

  if (!item) {
    return res.status(404).json({ error: `comment not found` });
  }

  // Check if the current user is the owner of the item
  if (item.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You do not have permission to update this item" });
  }

  try {
    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { content, category },
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

  // Fetch the item to verify ownership
  const item = await prisma.comment.findUnique({
    where: { id: Number(req.params.id) }, // Assuming `id` is the primary key
    select: { userId: true }, // Adjust based on your model's fields
  });

  if (!item) {
    return res.status(404).json({ error: `comment not found` });
  }

  // Check if the current user is the owner of the item
  if (item.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You do not have permission to update this item" });
  }

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

commentRouter.post("/search", async (req, res) => {
  const {
    pageNum = 1,
    selectedCommentCategories,
    searchValue,
    ...queryParams
  } = req.body;
  const PAGE_SIZE = 10; // Example page size

  try {
    // Construct the where clause dynamically using req.body
    const whereClause = {
      parentId: null,
      category:
        selectedCommentCategories.length > 0
          ? {
              in: selectedCommentCategories, // 'in' operator to find matching categories
            }
          : undefined,
      content: searchValue
        ? {
            contains: searchValue,
            mode: "insensitive",
          }
        : undefined,
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
      select: {
        id: true,
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
