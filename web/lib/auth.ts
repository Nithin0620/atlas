import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'atlas_super_secret_jwt_key_development_2026';

export interface AuthTokenPayload {
  userId: string;
  email: string;
  name: string;
}

export function signJwt(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwt(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch (error) {
    return null;
  }
}

export function getAuthUser(req: NextRequest): AuthTokenPayload | null {
  // 1. Try cookie
  const cookieToken = req.cookies.get('atlas_token')?.value;
  if (cookieToken) {
    const verified = verifyJwt(cookieToken);
    if (verified) return verified;
  }

  // 2. Try Authorization header
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const headerToken = authHeader.split(' ')[1];
    if (headerToken) {
      const verified = verifyJwt(headerToken);
      if (verified) return verified;
    }
  }

  return null;
}
