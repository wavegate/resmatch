import express from "express";
import bcrypt from "bcrypt";
import prisma from "../prismaClient.js";
import { generateCodename } from "../utils/aliasGenerator.js";
import jwt, { Secret } from "jsonwebtoken";
import {
  AuthenticatedRequest,
  verifyToken,
} from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user.id },
        process.env.SECRET_KEY as Secret,
        {
          expiresIn: "30d",
        }
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

authRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        alias: generateCodename(),
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as Secret, {
      expiresIn: "30d",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

authRouter.get(
  "/current",
  verifyToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user.id,
        email: user.email,
        alias: user.alias,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default authRouter;
