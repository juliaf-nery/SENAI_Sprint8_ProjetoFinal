import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { findUserByIdentifier } from "../data/users";
import { JwtPayload, PublicUser, UserRecord } from "../types";

const JWT_SECRET: string = process.env.JWT_SECRET || "educonecta_dev_secret";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "1h";

export function toPublicUser(user: UserRecord): PublicUser {
  const { passwordHash, ...publicUser } = user;
  return publicUser;
}

export async function validateCredentials(
  identifier: string,
  senha: string
): Promise<UserRecord | null> {
  const user = findUserByIdentifier(identifier);
  if (!user) return null;

  const senhaConfere = await bcrypt.compare(senha, user.passwordHash);
  if (!senhaConfere) return null;

  return user;
}

export function generateToken(user: UserRecord): string {
  const payload: JwtPayload = {
    sub: user.id,
    identifier: user.identifier,
    nome: user.nome,
    role: user.role,
  };

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as unknown as JwtPayload;
}

export { JWT_EXPIRES_IN };
