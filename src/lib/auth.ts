import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export interface AuthPayload {
  id: number;
  email: string;
}

export async function verifyToken(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { success: false, message: "Token tidak ada" };
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;

    return { success: true, user: decoded };
  } catch (error) {
    console.error("JWT verify error:", error);
    return { success: false, message: "Token tidak valid" };
  }
}
