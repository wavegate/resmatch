import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

interface JwtPayload {
  id: string;
}
export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing" });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.SECRET_KEY as Secret
    ) as JwtPayload;
    (req as AuthenticatedRequest).user = payload;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

export const optionalVerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return next(); // If no token, proceed without setting req.user
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.SECRET_KEY as Secret
    ) as JwtPayload;
    (req as AuthenticatedRequest).user = payload;
  } catch (error) {
    console.warn("Invalid token, proceeding without authentication");
  }

  next();
};
