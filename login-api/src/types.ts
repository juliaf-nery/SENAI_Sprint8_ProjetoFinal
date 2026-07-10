export type UserRole =
  | "administrador"
  | "direcao"
  | "professor"
  | "aluno"
  | "responsavel";

/**
 * Representa o usuário como armazenado internamente (inclui o hash da senha).
 * Esse tipo NUNCA deve ser retornado diretamente nas respostas da API.
 */
export interface UserRecord {
  id: number;
  identifier: string; // Matrícula ou CPF (somente números)
  nome: string;
  email: string;
  role: UserRole;
  passwordHash: string;
}

/**
 * Dados públicos do usuário, seguros para retornar ao front-end.
 */
export interface PublicUser {
  id: number;
  identifier: string;
  nome: string;
  email: string;
  role: UserRole;
}

export interface LoginRequestBody {
  identifier: string;
  senha: string;
}

export interface LoginSuccessResponse {
  token: string;
  expiresIn: string;
  user: PublicUser;
}

export interface ErrorResponse {
  message: string;
  errors?: string[];
}

export interface JwtPayload {
  sub: number;
  identifier: string;
  nome: string;
  role: UserRole;
}
