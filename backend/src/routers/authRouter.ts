import express from "express";
import bcrypt from "bcrypt";
import prisma from "../prismaClient.js";
import { generateCodename } from "../utils/aliasGenerator.js";
import jwt, { Secret } from "jsonwebtoken";
import {
  AuthenticatedRequest,
  verifyToken,
} from "../middleware/authMiddleware.js";
import mg from "../mailClient.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (
      user &&
      user.isConfirmed &&
      (await bcrypt.compare(password, user.password))
    ) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });
      res.json({ token });
    } else if (user && !user.isConfirmed) {
      res
        .status(401)
        .json({ error: "Please confirm your email before logging in." });
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

  try {
    // Check if the email is already being used
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (!existingUser.isConfirmed) {
        // Update the password for the unconfirmed user
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
          where: { email },
          data: {
            password: hashedPassword,
          },
        });

        // Generate a new token for the unconfirmed user
        const token = jwt.sign(
          { id: existingUser.id },
          process.env.SECRET_KEY,
          {
            expiresIn: "1d", // Token expires in 1 day
          }
        );

        // Send confirmation email
        const confirmationUrl = `http://localhost:5173/confirm-email?token=${token}`;
        mg.messages
          .create("mail.residencymatch.net", {
            from: "admin@mail.residencymatch.net",
            to: [email],
            subject: "Confirm Your Email",
            text: `Click the link to confirm your email: ${confirmationUrl}`,
            html: `<h1>Confirm Your Email</h1><p>Click the link to confirm your email: <a href="${confirmationUrl}">${confirmationUrl}</a></p>`,
          })
          .then((msg) => console.log("Email sent:", msg))
          .catch((err) => console.error("Error sending email:", err));

        return res.status(400).json({
          error:
            "Email is already registered but not confirmed. Your password has been updated, and a new confirmation email has been sent.",
        });
      } else {
        return res.status(400).json({ error: "Email is already registered" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        alias: generateCodename(),
        isConfirmed: false, // Add a flag to track email confirmation
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1d", // Token expires in 1 day
    });

    // Send confirmation email
    const confirmationUrl = `http://localhost:5173/confirm-email?token=${token}`;
    mg.messages
      .create("mail.residencymatch.net", {
        from: "admin@mail.residencymatch.net",
        to: [email],
        subject: "Confirm Your Email",
        text: `Click the link to confirm your email: ${confirmationUrl}`,
        html: `<h1>Confirm Your Email</h1><p>Click the link to confirm your email: <a href="${confirmationUrl}">${confirmationUrl}</a></p>`,
      })
      .then((msg) => console.log("Email sent:", msg))
      .catch((err) => console.error("Error sending email:", err));

    res.status(201).json({
      message:
        "User registered successfully. Please check your email to confirm your registration.",
    });
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

authRouter.get("/confirm-email", async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    await prisma.user.update({
      where: { id: userId },
      data: { isConfirmed: true },
    });

    res.status(200).json({ message: "Email confirmed successfully!" });
  } catch (error) {
    console.error("Error confirming email:", error);
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

export default authRouter;
