import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "abcdefghijklmnopqrstuvwxyz0123456789";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3h";

export function signToken(payload: object) { 
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }); 
}

export function verifyToken(token: string): { id: string; email: string } {
    return jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string };
}