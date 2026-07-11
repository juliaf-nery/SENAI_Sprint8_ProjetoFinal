import { Router, Request, Response } from "express";
import {
  generateToken,
  JWT_EXPIRES_IN,
  toPublicUser,
  validateCredentials,
} from "../services/authService";
import { isNonEmptyString, isNumericIdentifier } from "../utils/validators";
import {
  ErrorResponse,
  LoginRequestBody,
  LoginSuccessResponse,
} from "../types";
import { authMiddleware } from "../middleware/authMiddleware";
import { findUserByIdentifier } from "../data/users";

const router = Router();

router.post(
  "/login",
  async (
    req: Request<{}, {}, Partial<LoginRequestBody>>,
    res: Response<LoginSuccessResponse | ErrorResponse>
  ) => {
    const { identifier, senha } = req.body;

    const errors: string[] = [];

    if (!isNonEmptyString(identifier)) {
      errors.push("O campo 'identifier' (Matrícula ou CPF) é obrigatório.");
    } else if (!isNumericIdentifier(identifier)) {
      errors.push(
        "O campo 'identifier' deve conter estritamente números (Matrícula ou CPF)."
      );
    }

    if (!isNonEmptyString(senha)) {
      errors.push("O campo 'senha' é obrigatório.");
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: "Dados inválidos.", errors });
    }

    const user = await validateCredentials(identifier as string, senha as string);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Matrícula/CPF ou senha incorretos." });
    }

    const token = generateToken(user);

    return res.status(200).json({
      token,
      expiresIn: JWT_EXPIRES_IN,
      user: toPublicUser(user),
    });
  }
);

router.get("/me", authMiddleware, (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Não autenticado." });
  }

  const user = findUserByIdentifier(req.user.identifier);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  return res.status(200).json({ user: toPublicUser(user) });
});

export default router;
