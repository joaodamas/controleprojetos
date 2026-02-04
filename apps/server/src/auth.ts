import jwt, { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export type AuthenticatedRequest = Request & { userId: string };

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.path === "/health") {
    return next();
  }

  const authHeader = req.header("authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }

  const token = authHeader.slice("Bearer ".length).trim();
  const jwtPublicKey = process.env.JWT_PUBLIC_KEY;

  if (!jwtPublicKey) {
    return res.status(500).json({ error: "JWT_PUBLIC_KEY_MISSING" });
  }

  try {
    const issuer = process.env.JWT_ISSUER;
    const payload = jwt.verify(token, jwtPublicKey, {
      algorithms: ["RS256"],
      issuer: issuer ? [issuer] : undefined
    }) as JwtPayload;

    if (!payload.sub || typeof payload.sub !== "string") {
      return res.status(401).json({ error: "INVALID_TOKEN" });
    }

    (req as AuthenticatedRequest).userId = payload.sub;
    return next();
  } catch (_err) {
    return res.status(401).json({ error: "INVALID_TOKEN" });
  }
}
