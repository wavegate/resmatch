import express from "express";
import prisma from "../prismaClient.js";

const programRouter = express.Router();

// programRouter.post("/", (req, res) => {
//   res.send("Program created");
// });

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
    const { searchTerm = "", pageNum = 1 } = req.body;

    const offset = (pageNum - 1) * 10;

    // Count total number of programs matching the search term
    const totalCountResult = await prisma.$queryRaw`
      SELECT COUNT(*) FROM "Program" p
      JOIN "Institution" i ON p."institutionId" = i.id
      LEFT JOIN "City" c ON i."cityId" = c.id
      WHERE CONCAT(p.name, ' at ', i.name) ILIKE ${"%" + searchTerm + "%"}
    `;

    const totalCount = Number(totalCountResult[0].count);

    // Fetch programs with sorting by institution name and including city information
    const programs = await prisma.$queryRaw`
      SELECT 
        p.id AS program_id, 
        p.name AS program_name, 
        p.image AS program_image,
        p."nrmpProgramCode" AS nrmp_program_code,
        i.id AS institution_id, 
        i.name AS institution_name,
        s.name AS specialty_name,
        c.name AS city_name,
        c.state AS city_state
      FROM "Program" p
      JOIN "Institution" i ON p."institutionId" = i.id
      JOIN "Specialty" s ON p."specialtyId" = s.id
      LEFT JOIN "City" c ON i."cityId" = c.id
      WHERE CONCAT(p.name, ' at ', i.name) ILIKE ${"%" + searchTerm + "%"}
      ORDER BY i.name ASC 
      LIMIT 10 OFFSET ${offset}
    `;

    const formattedPrograms = programs.map((program) => ({
      id: program.program_id,
      name: program.program_name,
      image: program.program_image,
      nrmpProgramCode: program.nrmp_program_code,
      institution: {
        id: program.institution_id,
        name: program.institution_name,
        city: program.city_name
          ? {
              name: program.city_name,
              state: program.city_state,
            }
          : null,
      },
      specialty: {
        name: program.specialty_name,
      },
    }));

    res.json({ programs: formattedPrograms, totalCount });
  } catch (error) {
    console.error("Error searching programs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default programRouter;
