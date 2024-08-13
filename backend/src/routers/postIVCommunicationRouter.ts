import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new PostIVCommunication
router.post("/", verifyToken, async (req, res) => {
  const {
    programId,
    communicationReceived,
    thankYouLetterPolicy,
    rankImpact,
    source,
    anonymous = true, // Default linked to false
  } = req.body;

  const userId = req.user.id;

  if (!programId) {
    return res.status(400).json({ error: "Program ID is required" });
  }

  try {
    const newPostIVCommunication = await prisma.postIVCommunication.create({
      data: {
        userId: Number(userId),
        programId: Number(programId),
        communicationReceived,
        thankYouLetterPolicy,
        rankImpact,
        source,
        anonymous: Boolean(anonymous), // Ensure linked is stored as a boolean
      },
    });

    res.status(201).json(newPostIVCommunication);
  } catch (error) {
    console.error("Error creating Post-IV communication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get PostIVCommunication by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postIVCommunication = await prisma.postIVCommunication.findUnique({
      where: { id: Number(id) },
      include: {
        program: {
          include: {
            institution: true, // Include institution in the response
          },
        },
        user: true,
        comments: true,
      },
    });

    if (!postIVCommunication) {
      return res.status(404).json({ error: "Post-IV Communication not found" });
    }

    // Remove user data if the linked field is not true
    if (postIVCommunication.anonymous) {
      postIVCommunication.user = undefined;
    }

    res.json(postIVCommunication);
  } catch (error) {
    console.error("Error fetching Post-IV communication details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update PostIVCommunication by ID
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedPostIVCommunication = await prisma.postIVCommunication.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedPostIVCommunication);
  } catch (error) {
    console.error("Error updating Post-IV communication:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Post-IV Communication not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete PostIVCommunication by ID
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.postIVCommunication.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Post-IV Communication with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting Post-IV communication:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Post-IV Communication not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List PostIVCommunications with Pagination
router.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.postIVCommunication.count();

    const postIVCommunications = await prisma.postIVCommunication.findMany({
      skip: offset,
      take: 10,
      include: {
        program: {
          include: {
            institution: true, // Include institution in the search results
          },
        },
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Remove user data if the linked field is not true
    const processedCommunications = postIVCommunications.map(
      (communication) => {
        if (communication.anonymous) {
          communication.user = undefined; // Remove user data
        }
        return communication;
      }
    );

    res.json({ postIVCommunications: processedCommunications, totalCount });
  } catch (error) {
    console.error("Error fetching Post-IV communications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
