import express, { Request, Response } from "express";
import cors from "cors";
import pg from "pg";
const { Pool } = pg;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

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
