import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new Schedule Details
router.post("/", verifyToken, async (req, res) => {
  const {
    programId,
    longOvernightCall,
    scheduleContinuity,
    locations,
    emr,
    startDateOrientation,
    visaInfo,
    union,
    midlevel,
    ancillary,
    teamRatios,
    internCap,
    admittingSystem,
    icuHours,
    nightFloat,
    sickCallSystem,
    moonlighting,
    stayUntilSignout,
    didactics,
    vacationHolidays,
    gym,
    food,
    salary,
  } = req.body;

  const userId = req.user.id;

  if (!programId) {
    return res.status(400).json({ error: "Program ID is required" });
  }

  try {
    const newScheduleDetails = await prisma.scheduleDetails.create({
      data: {
        userId: Number(userId),
        programId: Number(programId),
        longOvernightCall,
        scheduleContinuity,
        locations,
        emr,
        startDateOrientation: startDateOrientation
          ? new Date(startDateOrientation)
          : null,
        visaInfo,
        union,
        midlevel,
        ancillary,
        teamRatios,
        internCap,
        admittingSystem,
        icuHours,
        nightFloat,
        sickCallSystem,
        moonlighting,
        stayUntilSignout,
        didactics,
        vacationHolidays,
        gym,
        food,
        salary,
        linked: false,
      },
    });

    res.status(201).json(newScheduleDetails);
  } catch (error) {
    console.error("Error creating schedule details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Schedule Details by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const scheduleDetails = await prisma.scheduleDetails.findUnique({
      where: { id: Number(id) },
      include: {
        program: {
          include: {
            institution: true,
          },
        },
        user: true,
      },
    });

    if (!scheduleDetails) {
      return res.status(404).json({ error: "Schedule details not found" });
    }

    if (!scheduleDetails.linked) {
      scheduleDetails.user = undefined;
    }

    res.json(scheduleDetails);
  } catch (error) {
    console.error("Error fetching schedule details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Schedule Details by ID
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedScheduleDetails = await prisma.scheduleDetails.update({
      where: { id: Number(id) },
      data: formData,
    });

    res.json(updatedScheduleDetails);
  } catch (error) {
    console.error("Error updating schedule details:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Schedule details not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Schedule Details by ID
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.scheduleDetails.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `Schedule details with ID: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting schedule details:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Schedule details not found" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List Schedule Details with Pagination
router.post("/search", async (req, res) => {
  try {
    const { pageNum = 1 } = req.body;
    const offset = (pageNum - 1) * 10;

    const totalCount = await prisma.scheduleDetails.count();

    const scheduleDetailsList = await prisma.scheduleDetails.findMany({
      skip: offset,
      take: 10,
      include: {
        program: {
          include: {
            institution: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const processedList = scheduleDetailsList.map((details) => {
      if (!details.linked) {
        details.user = undefined;
      }
      return details;
    });

    res.json({ scheduleDetailsList: processedList, totalCount });
  } catch (error) {
    console.error("Error fetching schedule details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
