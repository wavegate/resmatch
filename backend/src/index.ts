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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
