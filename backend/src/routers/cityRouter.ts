import express from "express";
import prisma from "../prismaClient.js";

const cityRouter = express.Router();

// Create a new city
cityRouter.post("/", async (req, res) => {
  const { name, state } = req.body;

  try {
    const newCity = await prisma.city.create({
      data: {
        name,
        state,
      },
    });
    res.status(201).json(newCity);
  } catch (error) {
    console.error("Error creating city:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a city by ID
cityRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cityId = Number(id);
    if (isNaN(cityId)) {
      return res.status(400).json({ error: "Invalid city ID" });
    }

    const city = await prisma.city.findUnique({
      where: { id: cityId },
      include: {
        userInputs: true, // Include related CityUserInput if needed
        programs: true, // Include related programs if needed
      },
    });

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json(city);
  } catch (error) {
    console.error("Error fetching city details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a city by ID
cityRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const cityId = Number(id);
  const { name, state } = req.body;

  if (isNaN(cityId)) {
    return res.status(400).json({ error: "Invalid city ID" });
  }

  try {
    const updatedCity = await prisma.city.update({
      where: { id: cityId },
      data: {
        name,
        state,
      },
    });

    if (!updatedCity) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json(updatedCity);
  } catch (error) {
    console.error("Error updating city:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a city by ID
cityRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const cityId = Number(id);

  if (isNaN(cityId)) {
    return res.status(400).json({ error: "Invalid city ID" });
  }

  try {
    const deletedCity = await prisma.city.delete({
      where: { id: cityId },
    });

    res
      .status(200)
      .json({ message: `City with ID: ${deletedCity.id} deleted` });
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Search cities with sorting by name
cityRouter.post("/search", async (req, res) => {
  try {
    const { searchTerm = "", pageNum = 1 } = req.body;

    const offset = (pageNum - 1) * 10;

    // Count total number of cities matching the search term
    const totalCountResult = await prisma.$queryRaw`
      SELECT COUNT(*) FROM "City"
      WHERE "name" ILIKE ${"%" + searchTerm + "%"}
    `;

    const totalCount = Number(totalCountResult[0].count);

    // Fetch cities with sorting by name
    const cities = await prisma.$queryRaw`
      SELECT 
        id AS city_id, 
        name AS city_name, 
        state AS city_state
      FROM "City"
      WHERE "name" ILIKE ${"%" + searchTerm + "%"}
      ORDER BY name ASC 
      LIMIT 10 OFFSET ${offset}
    `;

    const formattedCities = cities.map((city) => ({
      id: city.city_id,
      name: city.city_name,
      state: city.city_state,
    }));

    res.json({ cities: formattedCities, totalCount });
  } catch (error) {
    console.error("Error searching cities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default cityRouter;
