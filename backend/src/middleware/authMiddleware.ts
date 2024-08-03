import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Access denied, token missing" });

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
    req.user = payload; // Attach payload to the request object
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
