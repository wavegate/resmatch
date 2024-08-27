import express from "express";
import prisma from "../prismaClient.js";

const cityRouter = express.Router();

// // Create a new city
// cityRouter.post("/", async (req, res) => {
//   const { name, state } = req.body;

//   try {
//     const newCity = await prisma.city.create({
//       data: {
//         name,
//         state,
//       },
//     });
//     res.status(201).json(newCity);
//   } catch (error) {
//     console.error("Error creating city:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

cityRouter.get("/states", async (req, res) => {
  try {
    // Fetch distinct states from the City model
    const states = await prisma.city.findMany({
      distinct: ["state"],
      select: {
        state: true,
      },
      orderBy: {
        state: "asc", // Optional: order states alphabetically
      },
    });

    res.json(states);
  } catch (error) {
    console.error("Error fetching states:", error);
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

// // Update a city by ID
// cityRouter.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const cityId = Number(id);
//   const { name, state } = req.body;

//   if (isNaN(cityId)) {
//     return res.status(400).json({ error: "Invalid city ID" });
//   }

//   try {
//     const updatedCity = await prisma.city.update({
//       where: { id: cityId },
//       data: {
//         name,
//         state,
//       },
//     });

//     if (!updatedCity) {
//       return res.status(404).json({ error: "City not found" });
//     }

//     res.status(200).json(updatedCity);
//   } catch (error) {
//     console.error("Error updating city:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Delete a city by ID
// cityRouter.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   const cityId = Number(id);

//   if (isNaN(cityId)) {
//     return res.status(400).json({ error: "Invalid city ID" });
//   }

//   try {
//     const deletedCity = await prisma.city.delete({
//       where: { id: cityId },
//     });

//     res
//       .status(200)
//       .json({ message: `City with ID: ${deletedCity.id} deleted` });
//   } catch (error) {
//     console.error("Error deleting city:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

cityRouter.post("/search", async (req, res) => {
  try {
    const { searchTerm = "", pageNum = 1 } = req.body;
    const PAGE_SIZE = 10;
    const offset = (pageNum - 1) * PAGE_SIZE;

    // Count total number of cities matching the search term
    const totalCount = await prisma.city.count({
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive", // Case-insensitive search
        },
      },
    });

    // Fetch cities with sorting by name and include related CityUserInput and Program data
    const cities = await prisma.city.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive", // Case-insensitive search
        },
      },
      orderBy: {
        name: "asc",
      },
      skip: offset,
      take: PAGE_SIZE,
      include: {
        userInputs: true, // Include related CityUserInput data
        programs: {
          include: {
            institution: true, // Include related Institution data for each Program
          },
        },
      },
    });

    // Combine user inputs for each city
    const formattedCities = cities.map((city) => {
      const combinedUserInputs = city.userInputs.reduce(
        (acc, input) => {
          if (input.pros) acc.pros.push(input.pros);
          if (input.cons) acc.cons.push(input.cons);
          if (input.publicTransportation)
            acc.publicTransportation.push(input.publicTransportation);
          if (input.weather) acc.weather.push(input.weather);
          if (input.dating) acc.dating.push(input.dating);
          if (input.lgbtq) acc.lgbtq.push(input.lgbtq);
          if (input.diversity) acc.diversity.push(input.diversity);
          if (input.safetyCrime) acc.safetyCrime.push(input.safetyCrime);
          return acc;
        },
        {
          pros: [],
          cons: [],
          publicTransportation: [],
          weather: [],
          dating: [],
          lgbtq: [],
          diversity: [],
          safetyCrime: [],
        }
      );

      return {
        id: city.id,
        name: city.name,
        state: city.state,
        userInputs: combinedUserInputs,
        programs: city.programs.map((program) => ({
          id: program.id,
          name: program.name,
          institution: program.institution,
        })),
      };
    });

    res.json({ cities: formattedCities, totalCount });
  } catch (error) {
    console.error("Error searching cities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default cityRouter;
