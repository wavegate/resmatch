import express from "express";
import prisma from "../prismaClient.js";

const programRouter = express.Router();

programRouter.post("/", (req, res) => {
  res.send("Program created");
});

programRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Program details for ID: ${id}`);
});

programRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Program with ID: ${id} updated`);
});

programRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Program with ID: ${id} deleted`);
});

programRouter.post("/search", async (req, res) => {
  try {
    const { searchTerm = "", pageNum = 1 } = req.body;

    const offset = (pageNum - 1) * 10;

    const totalCountResult = await prisma.$queryRaw`
      SELECT COUNT(*) FROM "Program" p
      JOIN "Institution" i ON p."institutionId" = i.id
      WHERE CONCAT(p.name, ' at ', i.name) ILIKE ${"%" + searchTerm + "%"}
    `;
    const totalCount = totalCountResult[0].count;

    const programs = await prisma.$queryRaw`
      SELECT 
        p.id AS program_id, 
        p.name AS program_name, 
        p."nrmpProgramCode" AS nrmp_program_code,
        i.id AS institution_id, 
        i.name AS institution_name,
        s.name AS specialty_name,
        (SELECT COUNT(*) FROM "InterviewInvite" ii WHERE ii."programId" = p.id) AS interview_invites
      FROM "Program" p
      JOIN "Institution" i ON p."institutionId" = i.id
      JOIN "Specialty" s ON p."specialtyId" = s.id
      WHERE CONCAT(p.name, ' at ', i.name) ILIKE ${"%" + searchTerm + "%"}
      LIMIT 10 OFFSET ${offset}
    `;

    const formattedPrograms = programs.map((program) => ({
      id: program.program_id,
      name: program.program_name,
      nrmpProgramCode: program.nrmp_program_code,
      institution: {
        id: program.institution_id,
        name: program.institution_name,
      },
      specialty: {
        name: program.specialty_name,
      },
      interviewInvites: program.interview_invites,
    }));

    res.json({ programs: formattedPrograms, totalCount });
  } catch (error) {
    console.error("Error searching programs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default programRouter;
