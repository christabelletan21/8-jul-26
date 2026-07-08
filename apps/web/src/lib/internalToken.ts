import jwt from "jsonwebtoken";

const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET;

if (!INTERNAL_API_SECRET) {
  throw new Error("INTERNAL_API_SECRET is not set");
}

export function mintInternalToken(userId: string): string {
  return jwt.sign({ sub: userId }, INTERNAL_API_SECRET as string, { expiresIn: "5m" });
}
