import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  access_to: string[];
  iat?: number;
  exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const authorize =
  (requiredAccess: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      if (!decoded.access_to || !decoded.access_to.includes(requiredAccess)) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Guardamos info del usuario en req.user para otros middlewares/controladores
      (req as any).user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token", error });
    }
  };
