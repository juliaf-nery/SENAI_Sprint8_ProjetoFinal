import bcrypt from "bcryptjs";
import { UserRecord } from "../types";

// const SENHA_PADRAO = "mudar123";
const SENHA_DIRECAO = "direcao123";
const SENHA_PROFESSOR = "professor123";
const SENHA_ALUNO = "aluno123";
const SENHA_RESPONSAVEL = "responsavel123";
const SALT_ROUNDS = 10;

function hash(senha: string): string {
  return bcrypt.hashSync(senha, SALT_ROUNDS);
}

export const users: UserRecord[] = [
  {
    id: 1,
    identifier: "20260759312",
    nome: "Direção Escolar",
    email: "direcao@educonecta.com",
    role: "direcao",
    passwordHash: hash(SENHA_DIRECAO),
  },
  {
    id: 2,
    identifier: "2026091112",
    nome: "Professor(a)",
    email: "professor@educonecta.com",
    role: "professor",
    passwordHash: hash(SENHA_PROFESSOR),
  },
  {
    id: 3,
    identifier: "2026106379",
    nome: "Aluno(a)",
    email: "aluno@educonecta.com",
    role: "aluno",
    passwordHash: hash(SENHA_ALUNO),
  },
  {
    id: 4,
    identifier: "111111",
    nome: "Responsável",
    email: "responsavel@educonecta.com",
    role: "responsavel",
    passwordHash: hash(SENHA_RESPONSAVEL),
  },
];

export function findUserByIdentifier(identifier: string): UserRecord | undefined {
  return users.find((u) => u.identifier === identifier);
}
