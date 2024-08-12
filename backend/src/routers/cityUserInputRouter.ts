import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const cityUserInputRouter = express.Router();

// Create a new CityUserInput
cityUserInputRouter.post("/", verifyToken, async (req, res) => {
  const {
    cityId,
    pros,
    cons,
    publicTransportation,
    weather,
    dating,
    lgbtq,
    diversity,
    safetyCrime,
    linked = false,
  } = req.body;

  const userId = req.user.id;

  if (!cityId || !userId) {
    return res.status(400).json({ error: "City ID and User ID are required." });
  }

  try {
    const newCityUserInput = await prisma.cityUserInput.create({
      data: {
        cityId: Number(cityId),
        userId: Number(userId),
        pros,
        cons,
        publicTransportation,
        weather,
        dating,
        lgbtq,
        diversity,
        safetyCrime,
        linked,
      },
    });

    res.status(201).json(newCityUserInput);
  } catch (error) {
    console.error("Error creating CityUserInput:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a CityUserInput by ID
cityUserInputRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cityUserInput = await prisma.cityUserInput.findUnique({
      where: { id: Number(id) },
      include: {
        city: true,
        user: true,
      },
    });

    if (!cityUserInput) {
      return res.status(404).json({ error: "CityUserInput not found" });
    }

    if (!cityUserInput.linked && cityUserInput.userId !== req.user.id) {
      return res.status(200).json({ id: cityUserInput.id });
    }

    res.status(200).json(cityUserInput);
  } catch (error) {
    console.error("Error fetching CityUserInput:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a CityUserInput by ID
cityUserInputRouter.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const {
    cityId,
    pros,
    cons,
    publicTransportation,
    weather,
    dating,
    lgbtq,
    diversity,
    safetyCrime,
    linked,
  } = req.body;

  try {
    const updatedCityUserInput = await prisma.cityUserInput.update({
      where: { id: Number(id) },
      data: {
        cityId: cityId ? Number(cityId) : undefined,
        pros,
        cons,
        publicTransportation,
        weather,
        dating,
        lgbtq,
        diversity,
        safetyCrime,
        linked,
      },
    });

    res.status(200).json(updatedCityUserInput);
  } catch (error) {
    console.error("Error updating CityUserInput:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "CityUserInput not found" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a CityUserInput by ID
cityUserInputRouter.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.cityUserInput.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `CityUserInput with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting CityUserInput:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "CityUserInput not found" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List CityUserInputs with Pagination
cityUserInputRouter.post("/search", async (req, res) => {
  const { pageNum = 1, userId, cityId } = req.body;

  const offset = (pageNum - 1) * 10;

  try {
    const whereClause = {
      ...(userId && { userId: Number(userId) }),
      ...(cityId && { cityId: Number(cityId) }),
    };

    const totalCount = await prisma.cityUserInput.count({
      where: whereClause,
    });

    const cityUserInputs = await prisma.cityUserInput.findMany({
      skip: offset,
      take: 10,
      where: whereClause,
      include: {
        city: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ cityUserInputs, totalCount });
  } catch (error) {
    console.error("Error searching CityUserInputs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default cityUserInputRouter;
