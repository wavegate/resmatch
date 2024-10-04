import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const notificationRouter = express.Router();

notificationRouter.get("/current", verifyToken, async (req, res) => {
  const userId = req.user.id; // Get the authenticated user's ID

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        comment: {
          select: {
            id: true,
          },
        }, // Include details about the original comment
        replyComment: {
          select: {
            id: true,
            user: true,
            anonymous: true, // Include the anonymous field to check for anonymity
          },
        }, // Include details about the reply comment
      },
      orderBy: {
        createdAt: "desc", // Order notifications by creation date, most recent first
      },
    });

    // Loop through notifications to remove user if replyComment is anonymous
    const sanitizedNotifications = notifications.map((notification) => {
      if (notification.replyComment?.anonymous) {
        // If replyComment is anonymous, remove the user information
        const { replyComment, ...rest } = notification;
        return {
          ...rest,
          replyComment: {
            ...replyComment,
            user: null, // Remove user info
          },
        };
      }
      return notification;
    });

    res.json(sanitizedNotifications);
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

notificationRouter.put("/:id", verifyToken, async (req, res) => {
  const userId = req.user.id; // Get the authenticated user's ID
  const { id } = req.params; // Get the notification ID from the URL
  const { isRead } = req.body; // Get the read status from the request body

  if (typeof isRead !== "boolean") {
    return res.status(400).json({ error: "isRead must be a boolean" });
  }

  try {
    // Find the notification to ensure it belongs to the current user
    const notification = await prisma.notification.findUnique({
      where: {
        id: Number(id),
      },
    });

    // Check if the notification exists and belongs to the current user
    if (!notification || notification.userId !== Number(userId)) {
      return res
        .status(404)
        .json({ error: "Notification not found or not owned by the user" });
    }

    // Update the notification read status
    const updatedNotification = await prisma.notification.update({
      where: {
        id: Number(id), // Only update based on the unique notification ID
      },
      data: {
        read: isRead, // Set the read status
      },
    });

    res.json({
      message: "Notification status updated successfully",
      updatedNotification,
    });
  } catch (error) {
    console.error("Error updating notification read status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default notificationRouter;
