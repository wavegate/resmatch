import express, { Request, Response } from "express";
import cors from "cors";
import pg from "pg";
const { Pool } = pg;

const app = express();
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

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
