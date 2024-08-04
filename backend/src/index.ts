import "module-alias/register.js";
import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pg from "pg";
import dotenv from "dotenv";
import { authenticateToken } from "./middleware/authMiddleware.js";
import { faker } from "@faker-js/faker";
const { Pool } = pg;

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://resmatch.vercel.app",
  "https://residencymatch.net",
  "https://www.residencymatch.net",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the incoming origin is allowed
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
  optionsSuccessStatus: 200, // For legacy browser support
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

function generateCodename() {
  // Generate two random nouns
  const noun1 = faker.word.noun();
  const noun2 = faker.word.noun();

  // Generate a random number between 1 and 999
  const number = faker.string.numeric(3); // Generates a string of 3 numeric digits

  // Combine the nouns and number to form the codename
  const codename = `${capitalize(noun1)}${capitalize(noun2)}${number}`;

  return codename;
}

// Helper function to capitalize the first letter of each word
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

app.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        alias: generateCodename(),
      },
    });

    // Generate a JWT token for the new user
    const token = jwt.sign(
      { id: user.id }, // Payload
      process.env.SECRET_KEY, // Secret key
      { expiresIn: "1h" } // Token expiration time
    );

    // Return the token to the client
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login endpoint
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    res.json({ time: result.rows[0].now });
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to database");
  }
});

app.get("/specialties", async (req: Request, res: Response) => {
  try {
    const specialties = await prisma.specialty.findMany();
    res.json(specialties);
  } catch (error) {
    console.error("Error fetching specialties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/first-user", async (req, res) => {
  try {
    const user = await prisma.user.findFirst();
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.error("Error fetching the first user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/programs", async (req: Request, res: Response) => {
  try {
    // Fetch all programs along with their associated institution and specialty
    const programs = await prisma.program.findMany({
      take: 10,
      include: {
        institution: true,
        specialty: true,
      },
    });
    res.json(programs);
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/interview-invites", async (req: Request, res: Response) => {
  try {
    // Fetch the first 10 interview invites
    const interviewInvites = await prisma.interviewInvite.findMany({
      take: 10,
      include: {
        user: true, // Include related user information
        program: {
          include: {
            institution: true,
          },
        }, // Include related program information
      },
    });

    res.json(interviewInvites);
  } catch (error) {
    console.error("Error fetching interview invites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/interview-invites", authenticateToken, async (req, res) => {
  try {
    const {
      anonymous,
      programId,
      inviteDateTime,
      signal,
      geographicPreference,
      locationState,
      additionalComments,
      step1ScorePass,
      step1Score,
      step2Score,
      comlex1ScorePass,
      comlex2Score,
      visaRequired,
      subI,
      home,
      yearOfGraduation,
      greenCard,
      away,
      graduateType,
      img,
      medicalDegree,
    } = req.body;

    // Get user ID from authMiddleware
    const userId = req.user.id;

    // Dynamically construct the data object, including only defined values
    const data = {
      anonymous: anonymous ?? false,
      ...(programId !== undefined && { programId: parseInt(programId, 10) }), // Ensure programId is an integer
      ...(inviteDateTime !== undefined && {
        inviteDateTime: new Date(inviteDateTime),
      }),
      ...(signal !== undefined && { signal }),
      ...(geographicPreference !== undefined && { geographicPreference }),
      ...(locationState !== undefined && { locationState }),
      ...(additionalComments !== undefined && { additionalComments }),
      ...(step1ScorePass !== undefined && { step1ScorePass }),
      ...(step1Score !== undefined && { step1Score }),
      ...(step2Score !== undefined && { step2Score }),
      ...(comlex1ScorePass !== undefined && { comlex1ScorePass }),
      ...(comlex2Score !== undefined && { comlex2Score }),
      ...(visaRequired !== undefined && { visaRequired }),
      ...(subI !== undefined && { subI }),
      ...(home !== undefined && { home }),
      ...(yearOfGraduation !== undefined && { yearOfGraduation }),
      ...(greenCard !== undefined && { greenCard }),
      ...(away !== undefined && { away }),
      ...(graduateType !== undefined && { graduateType }),
      ...(img !== undefined && { img }),
      ...(medicalDegree !== undefined && { medicalDegree }),
      userId, // Always include userId as it comes from authMiddleware
    };

    // Create new interview invite
    const newInvite = await prisma.interviewInvite.create({
      data,
    });

    // Respond with the created invite
    res.status(201).json(newInvite);
  } catch (error) {
    console.error("Error creating interview invite:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user-info", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the decoded token
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the user's information, excluding sensitive fields like password
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      // Include other fields as necessary
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/programs/search", async (req, res) => {
  try {
    const { searchTerm } = req.body;

    // Ensure the searchTerm is provided
    if (searchTerm === undefined) {
      return res.status(400).json({ error: "Search term is required." });
    }

    const programs = await prisma.$queryRaw`
    SELECT 
      p.id AS program_id, 
      p.name AS program_name, 
      i.id AS institution_id, 
      i.name AS institution_name
    FROM "Program" p
    JOIN "Institution" i ON p."institutionId" = i.id
    WHERE CONCAT(p.name, ' at ', i.name) ILIKE ${"%" + searchTerm + "%"}
    LIMIT 10
  `;

    // Format the result to include institution information
    const formattedPrograms = programs.map((program) => ({
      id: program.program_id,
      name: program.program_name,
      institution: {
        id: program.institution_id,
        name: program.institution_name,
      },
    }));

    // Send the programs as the response
    res.json(formattedPrograms);
  } catch (error) {
    console.error("Error searching programs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/interview-invites/search", async (req, res) => {
  try {
    const { programId, userId, startDate, endDate, pageNum } = req.body;

    // Default to page 1 if pageNum is not provided
    const page = pageNum ? parseInt(pageNum, 10) : 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Build the query conditions based on provided parameters
    const conditions = {};

    if (programId) {
      conditions.programId = programId;
    }

    if (userId) {
      conditions.userId = userId;
    }

    if (startDate || endDate) {
      conditions.inviteDateTime = {};
      if (startDate) {
        conditions.inviteDateTime.gte = new Date(startDate);
      }
      if (endDate) {
        conditions.inviteDateTime.lte = new Date(endDate);
      }
    }

    const totalCount = await prisma.interviewInvite.count({
      where: conditions,
    });

    // Fetch interview invites based on conditions, sorted by inviteDateTime in descending order
    const interviewInvites = await prisma.interviewInvite.findMany({
      where: conditions,
      include: {
        program: {
          include: {
            institution: true,
          },
        },
        user: true,
      },
      orderBy: {
        inviteDateTime: "desc", // Order by inviteDateTime descending
      },
      skip: skip, // Skip records for pagination
      take: pageSize, // Limit the number of records returned
    });

    // Send the retrieved interview invites as the response
    res.json({ totalCount, interviewInvites });
  } catch (error) {
    console.error("Error searching interview invites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
