import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const commentRouter = express.Router();

// Create a new comment
commentRouter.post("/", verifyToken, async (req, res) => {
  const {
    content,
    parentId,
    rankListId,
    postIVCommunicationId,
    scheduleDetailsId,
    m4InternImpressionId,
    malignantId,
    lOIResponseId,
    interviewImpressionId,
    tierListId,
    pstp = false,
    report = false,
    main = false,
    linked = false,
  } = req.body;

  const userId = req.user.id;

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        userId: Number(userId),
        parentId: parentId ? Number(parentId) : null,
        rankListId: rankListId ? Number(rankListId) : null,
        postIVCommunicationId: postIVCommunicationId
          ? Number(postIVCommunicationId)
          : null,
        scheduleDetailsId: scheduleDetailsId ? Number(scheduleDetailsId) : null,
        m4InternImpressionId: m4InternImpressionId
          ? Number(m4InternImpressionId)
          : null,
        malignantId: malignantId ? Number(malignantId) : null,
        lOIResponseId: lOIResponseId ? Number(lOIResponseId) : null,
        interviewImpressionId: interviewImpressionId
          ? Number(interviewImpressionId)
          : null,
        tierListId: tierListId ? Number(tierListId) : null,
        pstp,
        report,
        main,
        linked,
      },
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
    if (!comment.linked) {
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
  const {
    main = false,
    pstp = false,
    report = false,
    rankListId,
    postIVCommunicationId,
    scheduleDetailsId,
    m4InternImpressionId,
    malignantId,
    lOIResponseId,
    interviewImpressionId,
    tierListId,
    pageNum = 1,
  } = req.body;
  const PAGE_SIZE = 10; // Example page size

  try {
    const totalCount = await prisma.comment.count({
      where: {
        parentId: null,
        main,
        pstp,
        report,
        rankListId: rankListId ? Number(rankListId) : undefined,
        postIVCommunicationId: postIVCommunicationId
          ? Number(postIVCommunicationId)
          : undefined,
        scheduleDetailsId: scheduleDetailsId
          ? Number(scheduleDetailsId)
          : undefined,
        m4InternImpressionId: m4InternImpressionId
          ? Number(m4InternImpressionId)
          : undefined,
        malignantId: malignantId ? Number(malignantId) : undefined,
        lOIResponseId: lOIResponseId ? Number(lOIResponseId) : undefined,
        interviewImpressionId: interviewImpressionId
          ? Number(interviewImpressionId)
          : undefined,
        tierListId: tierListId ? Number(tierListId) : undefined,
      },
    });

    let comments = await prisma.comment.findMany({
      where: {
        parentId: null,
        main,
        pstp,
        report,
        rankListId: rankListId ? Number(rankListId) : undefined,
        postIVCommunicationId: postIVCommunicationId
          ? Number(postIVCommunicationId)
          : undefined,
        scheduleDetailsId: scheduleDetailsId
          ? Number(scheduleDetailsId)
          : undefined,
        m4InternImpressionId: m4InternImpressionId
          ? Number(m4InternImpressionId)
          : undefined,
        malignantId: malignantId ? Number(malignantId) : undefined,
        lOIResponseId: lOIResponseId ? Number(lOIResponseId) : undefined,
        interviewImpressionId: interviewImpressionId
          ? Number(interviewImpressionId)
          : undefined,
        tierListId: tierListId ? Number(tierListId) : undefined,
      },
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

    // Process comments to remove user information if linked is not true
    comments = comments.map((comment) => {
      if (!comment.linked) {
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
