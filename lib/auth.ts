import jwt from 'jsonwebtoken';

export function getTokenFromHeader(authHeader: string | null) {
    if (!authHeader) return null;
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) return null;
    return token;
  }
  
export function verifyToken(token: string) {
try {
    return jwt.verify(token, process.env.JWT_SECRET!);
} catch {
    return null;
}
}