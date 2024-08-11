import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new LOIResponse
router.post("/", verifyToken, async (req, res) => {
  const {
    programId,
    intent = false, // Default intent to false
    sentTo,
    dateSent,
    response,
    responseTone,
    timeBetweenSentAndResponse,
    mentionedTopChoice,
    linked = false, // Default linked to false
  } = req.body;

  const userId = req.user.id;

  if (!programId) {
    return res.status(400).json({ error: "Program ID is required" });
  }

  try {
    const newLOIResponse = await prisma.lOIResponse.create({
      data: {
        programId: Number(programId),
        userId: Number(userId),
        intent,
        sentTo,
        dateSent: dateSent ? new Date(dateSent) : null,
        response,
        responseTone,
        timeBetweenSentAndResponse,
        mentionedTopChoice,
        linked: Boolean(linked), // Ensure linked is stored as a boolean
      },
    });

    res.status(201).json(newLOIResponse);
  } catch (error) {
    console.error("Error creating LOI response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get an LOIResponse by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const loiResponse = await prisma.lOIResponse.findUnique({
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

    if (!loiResponse) {
      return res.status(404).json({ error: "LOI Response not found" });
    }

    // Remove user data if the linked field is not true
    if (!loiResponse.linked) {
      loiResponse.user = undefined;
    }

    res.json(loiResponse);
  } catch (error) {
    console.error("Error fetching LOI response details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an LOIResponse by ID
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedLOIResponse = await prisma.lOIResponse.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedLOIResponse);
  } catch (error) {
    console.error("Error updating LOI response:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "LOI Response not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an LOIResponse by ID
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.lOIResponse.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `LOI Response with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting LOI response:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "LOI Response not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List LOI Responses with Pagination
router.post("/search", async (req, res) => {
  try {
    const { pageNum = 1, intent } = req.body; // Add intent to the request body
    const offset = (pageNum - 1) * 10;

    const conditions = {}; // Initialize conditions object

    if (typeof intent !== "undefined") {
      conditions.intent = intent; // Add intent condition if provided
    }

    const totalCount = await prisma.lOIResponse.count({
      where: conditions, // Apply conditions to the count query
    });

    const loiResponses = await prisma.lOIResponse.findMany({
      skip: offset,
      take: 10,
      where: conditions, // Apply conditions to the findMany query
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
    const processedResponses = loiResponses.map((response) => {
      if (!response.linked) {
        response.user = undefined; // Remove user data
      }
      return response;
    });

    res.json({ loiResponses: processedResponses, totalCount });
  } catch (error) {
    console.error("Error fetching LOI responses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
