import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const tierListRouter = express.Router();

// Create a new Tier List
tierListRouter.post("/", verifyToken, async (req, res) => {
  const { title, img, bins, comments } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const newTierList = await prisma.tierList.create({
      data: {
        title,
        img: Boolean(img),
        bins: {
          create: bins.map((bin) => ({
            name: bin.name,
            programs: {
              connect: bin.programs.map((programId) => ({ id: programId })),
            },
          })),
        },
        comments: {
          create: comments.map((comment) => ({
            content: comment.content,
            user: {
              connect: { id: comment.userId },
            },
          })),
        },
      },
      include: {
        bins: {
          include: {
            programs: true,
          },
        },
        comments: true,
      },
    });
    res.status(201).json(newTierList);
  } catch (error) {
    console.error("Error creating Tier List:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a Tier List by ID
tierListRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tierList = await prisma.tierList.findUnique({
      where: { id: Number(id) },
      include: {
        bins: {
          include: {
            programs: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!tierList) {
      return res.status(404).json({ error: "Tier List not found" });
    }

    res.json(tierList);
  } catch (error) {
    console.error("Error fetching Tier List details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Tier List by ID
tierListRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, img, bins, comments } = req.body;

  try {
    const updatedTierList = await prisma.tierList.update({
      where: { id: Number(id) },
      data: {
        title,
        img: Boolean(img),
        bins: {
          deleteMany: {},
          create: bins.map((bin) => ({
            name: bin.name,
            programs: {
              connect: bin.programs.map((programId) => ({ id: programId })),
            },
          })),
        },
        comments: {
          deleteMany: {},
          create: comments.map((comment) => ({
            content: comment.content,
            user: {
              connect: { id: comment.userId },
            },
          })),
        },
      },
      include: {
        bins: {
          include: {
            programs: true,
          },
        },
        comments: true,
      },
    });

    res.json(updatedTierList);
  } catch (error) {
    console.error("Error updating Tier List:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Tier List not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Tier List by ID
tierListRouter.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tierList.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Tier List with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting Tier List:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Tier List not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List Tier Lists with Pagination
tierListRouter.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.tierList.count();

    const tierLists = await prisma.tierList.findMany({
      skip: offset,
      take: 10,
      include: {
        bins: {
          include: {
            programs: true,
          },
        },
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ tierLists, totalCount });
  } catch (error) {
    console.error("Error fetching Tier Lists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default tierListRouter;
