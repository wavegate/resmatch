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
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as RedditStrategy } from "passport-reddit";
import { Strategy as DiscordStrategy } from "passport-discord";

const authRouter = express.Router();

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await prisma.user.findUnique({
          where: { email: profile.emails[0].value },
        });

        if (user) {
          if (!user.googleId) {
            await prisma.user.update({
              where: { email: profile.emails[0].value },
              data: { googleId: profile.id },
            });
          }
          // If the user exists, pass the user object
          return done(null, user);
        } else {
          // If the user does not exist, create a new user
          const newUser = await prisma.user.create({
            data: {
              email: profile.emails[0].value,
              alias: generateCodename(),
              isConfirmed: true, // Google OAuth users are automatically confirmed
              googleId: profile.id,
            },
          });
          return done(null, newUser);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  new RedditStrategy(
    {
      clientID: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      callbackURL: "/auth/reddit/callback",
      scope: ["identity"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await prisma.user.findUnique({
          where: { redditId: profile.id }, // Reddit provides `profile.id`
        });

        if (user) {
          return done(null, user);
        } else {
          // If the user does not exist, create a new user
          const newUser = await prisma.user.create({
            data: {
              redditId: profile.id,
              redditUsername: profile.name,
              alias: generateCodename(),
              isConfirmed: true, // Reddit OAuth users are automatically confirmed
            },
          });
          return done(null, newUser);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: "/auth/discord/callback",
      scope: ["identify"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await prisma.user.findUnique({
          where: { discordId: profile.id },
        });

        if (user) {
          return done(null, user);
        } else {
          // If the user does not exist, create a new user
          const newUser = await prisma.user.create({
            data: {
              discordId: profile.id,
              discordUsername: profile.username,
              discordDiscriminator: profile.discriminator,
              alias: generateCodename(),
              isConfirmed: true, // Discord OAuth users are automatically confirmed
            },
          });
          return done(null, newUser);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Case 1: User exists and has a Google account (no password set)
    if (user && user.googleId && !user.password) {
      return res.status(400).json({
        error:
          "This account is registered with Google. Please log in using Google.",
      });
    }

    // Case 2: Traditional login with email and password
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
      // Case 3: User exists but has not confirmed their email
      res
        .status(401)
        .json({ error: "Please confirm your email before logging in." });
    } else {
      // Case 4: Invalid email or password
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

    if (existingUser && existingUser.googleId && !existingUser.password) {
      return res.status(400).json({
        error:
          "This email is already registered with Google. Please log in using Google.",
      });
    }

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
        include: {
          followedPrograms: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user.id,
        email: user.email,
        alias: user.alias,
        followedPrograms: user.followedPrograms,
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

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  async (req, res) => {
    try {
      // At this point, req.user is already populated by Passport's GoogleStrategy
      const token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, {
        expiresIn: "30d", // Token expires in 30 days
      });

      // Redirect to the frontend with the JWT token
      res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
    } catch (error) {
      console.error("Error during Google OAuth callback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

authRouter.get(
  "/reddit",
  passport.authenticate("reddit", { scope: ["identity"] }) // Reddit uses "identity" scope
);

authRouter.get(
  "/reddit/callback",
  passport.authenticate("reddit", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  async (req, res) => {
    try {
      // At this point, req.user is already populated by Passport's RedditStrategy
      const token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, {
        expiresIn: "30d", // Token expires in 30 days
      });

      // Redirect to the frontend with the JWT token
      res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
    } catch (error) {
      console.error("Error during Reddit OAuth callback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

authRouter.get(
  "/discord",
  passport.authenticate("discord", { scope: ["identify"] })
);

// Route to handle the callback after Discord authentication
authRouter.get(
  "/discord/callback",
  passport.authenticate("discord", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  async (req, res) => {
    try {
      // At this point, req.user is already populated by Passport's DiscordStrategy
      const token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, {
        expiresIn: "30d", // Token expires in 30 days
      });

      // Redirect to the frontend with the JWT token
      res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
    } catch (error) {
      console.error("Error during Discord OAuth callback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default authRouter;
