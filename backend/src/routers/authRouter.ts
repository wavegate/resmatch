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
import { FRONTEND_URL } from "../constants.js";

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
        const confirmationUrl = `${FRONTEND_URL}/confirm-email?token=${token}`;
        mg.messages
          .create("mail.residencymatch.net", {
            from: "admin@mail.residencymatch.net",
            to: [email],
            subject: "Confirm Your Email",
            text: `Click the link to confirm your email: ${confirmationUrl}. Please note that this link will expire in 1 day.`,
            html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h1 style="color: #333; text-align: center;">Confirm Your Email</h1>
        <p style="font-size: 16px; color: #555;">Hello,</p>
        <p style="font-size: 16px; color: #555;">
          Thank you for signing up for Residency Match! To complete your registration, please confirm your email address by clicking the link below:
        </p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${confirmationUrl}" style="display: inline-block; background-color: #1a73e8; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 5px;">
            Confirm Email
          </a>
        </p>
        <p style="font-size: 16px; color: #555;">
          Please note that this link will expire in 1 day.
        </p>
        <p style="font-size: 14px; color: #999; text-align: center;">
          If you did not create an account, please disregard this email.
        </p>
        <p style="font-size: 14px; color: #999; text-align: center;">
          Residency Match
        </p>
      </div>
    `,
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
    const confirmationUrl = `${FRONTEND_URL}/confirm-email?token=${token}`;
    mg.messages
      .create("mail.residencymatch.net", {
        from: "admin@mail.residencymatch.net",
        to: [email],
        subject: "Confirm Your Email",
        text: `Click the link to confirm your email: ${confirmationUrl}. Please note that this link will expire in 1 day.`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h1 style="color: #333; text-align: center;">Confirm Your Email</h1>
        <p style="font-size: 16px; color: #555;">Hello,</p>
        <p style="font-size: 16px; color: #555;">
          Thank you for signing up for Residency Match! To complete your registration, please confirm your email address by clicking the link below:
        </p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${confirmationUrl}" style="display: inline-block; background-color: #1a73e8; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 5px;">
            Confirm Email
          </a>
        </p>
        <p style="font-size: 16px; color: #555;">
          Please note that this link will expire in 1 day.
        </p>
        <p style="font-size: 14px; color: #999; text-align: center;">
          If you did not create an account, please disregard this email.
        </p>
        <p style="font-size: 14px; color: #999; text-align: center;">
          Residency Match
        </p>
      </div>
    `,
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

// Reset Password Endpoint
authRouter.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "User with this email does not exist" });
    }

    // Generate a reset token
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Send reset password email
    const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`;
    mg.messages
      .create("mail.residencymatch.net", {
        from: "admin@mail.residencymatch.net",
        to: [email],
        subject: "Reset Your Password",
        text: `Click the link to reset your password: ${resetUrl}`,
        html: `<h1>Reset Your Password</h1><p>Click the link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
      })
      .then((msg) => console.log("Password reset email sent:", msg))
      .catch((err) => console.error("Error sending email:", err));

    res.status(200).json({
      message:
        "Password reset email sent successfully. Please check your inbox.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Password Endpoint
authRouter.post("/update-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default authRouter;
