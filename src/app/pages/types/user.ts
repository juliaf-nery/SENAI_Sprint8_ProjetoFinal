export type UserRole =
    | "administrador"
    | "direcao"
    | "professor"
    | "aluno"
    | "responsavel";

export type PublicUser = {
    id: number;
    identifier: string;
    nome: string;
    email: string;
    role: UserRole;
}

export type LoginResponse = {
    token: string;
    expiresIn: string;
    user: PublicUser;
}

export type UserInfo = PublicUser;