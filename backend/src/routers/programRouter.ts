import express from "express";
import prisma from "../prismaClient.js";

const programRouter = express.Router();

programRouter.get("/all", async (req, res) => {
  try {
    // Fetch all programs with necessary relations and ordering by state and city
    const programs = await prisma.program.findMany({
      orderBy: [
        {
          city: {
            state: "asc",
          },
        },
        {
          city: {
            name: "asc",
          },
        },
      ],
      include: {
        institution: true,
        specialty: true,
        city: true,
      },
    });

    // Send response directly
    res.json({ programs });
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

programRouter.get("/", async (req, res) => {
  try {
    const programs = await prisma.program.findMany({
      select: {
        id: true,
        name: true,
        nrmpProgramCode: true,
        institution: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        institution: {
          name: "asc",
        },
      },
    });

    res.status(200).json(programs);
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

programRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const programId = Number(id);
    if (isNaN(programId)) {
      return res.status(400).json({ error: "Invalid program ID" });
    }

    const program = await prisma.program.findUnique({
      where: { id: programId },
      include: {
        institution: true,
      },
    });

    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }

    res.status(200).json(program);
  } catch (error) {
    console.error("Error fetching program details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// programRouter.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const programId = Number(id);
//   const { name, image, cityId } = req.body;

//   if (isNaN(programId)) {
//     return res.status(400).json({ error: "Invalid program ID" });
//   }

//   try {
//     const updatedProgram = await prisma.program.update({
//       where: { id: programId },
//       data: {
//         name,
//         image,
//         cityId: cityId ? Number(cityId) : undefined,
//       },
//     });

//     if (!updatedProgram) {
//       return res.status(404).json({ error: "Program not found" });
//     }

//     res.status(200).json(updatedProgram);
//   } catch (error) {
//     console.error("Error updating program:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// programRouter.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   res.send(`Program with ID: ${id} deleted`);
// });

programRouter.post("/search", async (req, res) => {
  try {
    const {
      searchTerm = "",
      pageNum = 1,
      state = "",
      cityName = "",
      nrmpProgramCode = "",
    } = req.body;

    const PAGE_SIZE = 10;
    const offset = (pageNum - 1) * PAGE_SIZE;

    // Construct the query filters
    const filters = {
      AND: [
        {
          OR: [
            {
              institution: {
                name: {
                  contains: searchTerm,
                  mode: "insensitive", // Case-insensitive search
                },
              },
            },
            {
              name: {
                contains: searchTerm,
                mode: "insensitive", // Case-insensitive search
              },
            },
          ],
        },
        {
          nrmpProgramCode: {
            contains: nrmpProgramCode,
            mode: "insensitive", // Case-insensitive search
          },
        },
      ],
    };

    if (state || cityName) {
      filters["city"] = {
        AND: [
          state
            ? {
                state: {
                  contains: state,
                  mode: "insensitive",
                },
              }
            : {},
          cityName
            ? {
                name: {
                  contains: cityName,
                  mode: "insensitive",
                },
              }
            : {},
        ],
      };
    }

    // Count total number of programs matching the search criteria
    const totalCount = await prisma.program.count({
      where: filters,
    });

    // Fetch programs with sorting by institution name and including city information
    const programs = await prisma.program.findMany({
      where: filters,
      orderBy: {
        institution: {
          name: "asc",
        },
      },
      skip: offset,
      take: PAGE_SIZE,
      include: {
        institution: true,
        specialty: true,
        city: true,
      },
    });

    const formattedPrograms = programs.map((program) => ({
      id: program.id,
      name: program.name,
      image: program.image,
      nrmpProgramCode: program.nrmpProgramCode,
      acgmeCode: program.acgmeCode,
      institution: {
        id: program.institution.id,
        name: program.institution.name,
      },
      specialty: {
        name: program.specialty.name,
      },
      city: program.city
        ? {
            name: program.city.name,
            state: program.city.state,
          }
        : null,
    }));

    res.json({ programs: formattedPrograms, totalCount });
  } catch (error) {
    console.error("Error searching programs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default programRouter;
