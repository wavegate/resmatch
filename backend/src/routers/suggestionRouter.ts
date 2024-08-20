import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const suggestionRouter = express.Router();

// Create a new Suggestion
suggestionRouter.post("/", verifyToken, async (req, res) => {
  const { content, tierListId, anonymous } = req.body;
  const userId = req.user.id; // Assuming the user ID is available from the verified token

  if (!content || !tierListId) {
    return res
      .status(400)
      .json({ error: "Content and Tier List ID are required" });
  }

  try {
    const newSuggestion = await prisma.suggestion.create({
      data: {
        content,
        anonymous,
        tierList: {
          connect: { id: tierListId },
        },
        user: {
          connect: { id: userId },
        },
      },
      include: {
        tierList: true,
        user: true,
      },
    });

    res.status(201).json(newSuggestion);
  } catch (error) {
    console.error("Error creating Suggestion:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a Suggestion by ID
suggestionRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const suggestion = await prisma.suggestion.findUnique({
      where: { id: Number(id) },
      include: {
        tierList: true,
        user: true,
      },
    });

    if (!suggestion) {
      return res.status(404).json({ error: "Suggestion not found" });
    }

    res.json(suggestion);
  } catch (error) {
    console.error("Error fetching Suggestion details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Suggestion by ID
suggestionRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  // Fetch the item to verify ownership
  const item = await prisma.suggestion.findUnique({
    where: { id: Number(req.params.id) }, // Assuming `id` is the primary key
    select: { userId: true }, // Adjust based on your model's fields
  });

  if (!item) {
    return res.status(404).json({ error: `suggestion not found` });
  }

  // Check if the current user is the owner of the item
  if (item.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You do not have permission to update this item" });
  }
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const updatedSuggestion = await prisma.suggestion.update({
      where: { id: Number(id) },
      data: { content },
    });

    res.json(updatedSuggestion);
  } catch (error) {
    console.error("Error updating Suggestion:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Suggestion not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Suggestion by ID
suggestionRouter.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const item = await prisma.suggestion.findUnique({
    where: { id: Number(req.params.id) }, // Assuming `id` is the primary key
    select: { userId: true }, // Adjust based on your model's fields
  });

  if (!item) {
    return res.status(404).json({ error: `suggestion not found` });
  }

  // Check if the current user is the owner of the item
  if (item.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You do not have permission to update this item" });
  }

  try {
    await prisma.suggestion.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Suggestion with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting Suggestion:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Suggestion not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List Suggestions with Pagination
suggestionRouter.post("/search", async (req, res) => {
  try {
    const { tierListId } = req.body;

    const totalCount = await prisma.suggestion.count({
      where: { tierListId },
    });

    const suggestions = await prisma.suggestion.findMany({
      where: { tierListId },
      include: {
        user: {
          select: {
            id: true,
            alias: true, // Assuming the User model has an 'alias' field
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Process suggestions to remove user field if the suggestion is anonymous
    const processedSuggestions = suggestions.map((suggestion) => {
      if (suggestion.anonymous) {
        // Remove the user field if anonymous
        const { user, ...rest } = suggestion;
        return rest;
      }
      return suggestion;
    });

    res.json({ suggestions: processedSuggestions, totalCount });
  } catch (error) {
    console.error("Error fetching Suggestions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default suggestionRouter;
