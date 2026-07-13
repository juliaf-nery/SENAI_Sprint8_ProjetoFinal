# Login API — EduConecta (SENAI Sprint 8)

API de autenticação em **Node.js + TypeScript**, com login por **Matrícula ou CPF** (campo `identifier`, somente números) + senha, e geração de **token JWT**.

## Estrutura

```
login-api/
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── server.ts               # bootstrap do Express
    ├── types.ts                # tipos/contratos da API
    ├── data/users.ts           # 5 usuários mock (em memória)
    ├── services/authService.ts # validação de credenciais + geração/verificação de JWT
    ├── middleware/authMiddleware.ts # protege rotas exigindo Bearer token
    ├── routes/authRoutes.ts    # POST /login e GET /me
    └── utils/validators.ts     # validação do identifier (somente dígitos)
```

## 1. Instalação

```bash
cd login-api
npm install
```

Copie o `.env.example` para `.env` (opcional, já há valores padrão):

```bash
cp .env.example .env
```

## 2. Gerar os arquivos .js (build)

O TypeScript é compilado da pasta `src/` (.ts) para `dist/` (.js) usando o compilador `tsc`, conforme configurado em `tsconfig.json` (`outDir: "./dist"`).

```bash
npm run build
```

Isso vai gerar, por exemplo, `dist/server.js`, `dist/routes/authRoutes.js`, etc.

## 3. Executar a API compilada (.js)

```bash
npm start
```

Isso executa `node dist/server.js`. A API sobe em `http://localhost:3001`.

> Atalho para build + start em um único comando: `npm run start:prod`

### Modo desenvolvimento (opcional, sem precisar compilar manualmente)

```bash
npm run dev
```

## 4. Usuários mock disponíveis

| Perfil (role)   | identifier (Matrícula/CPF) | senha       |
|-----------------|-----------------------------|-------------|
| Administrador   | 111111                       | mudar123    |
| Direção Escolar | 222222                       | mudar123    |
| Professor       | 333333                       | mudar123    |
| Aluno           | 444444                       | mudar123    |
| Responsável     | 555555                       | mudar123    |

As senhas são armazenadas com **hash bcrypt** (nunca em texto puro), gerado em tempo de execução a partir da senha padrão.

## 5. Endpoints

### `POST /login`

**Body:**
```json
{
  "identifier": "111111",
  "senha": "mudar123"
}
```

**Resposta 200 (sucesso):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": "1h",
  "user": {
    "id": 1,
    "identifier": "111111",
    "nome": "Administrador Geral",
    "email": "administrador@educonecta.com",
    "role": "administrador"
  }
}
```

**Resposta 400** — `identifier` vazio ou com caracteres não numéricos.
**Resposta 401** — matrícula/CPF ou senha incorretos.

### `GET /me` (rota protegida, exemplo)

Header: `Authorization: Bearer <token>`

Retorna os dados do usuário autenticado, validando o token JWT.

### `GET /health`

Checagem simples de status da API.

## 6. Integração com o front-end (Angular — pasta `SENAI_Sprint8_ProjetoFinal`)

O front-end já foi ajustado para consumir esta API:

- `src/app/services/login.service.ts` → envia `{ identifier, senha }` para `http://localhost:3001/login` e guarda `token`, `nome` e `role` no `sessionStorage`.
- `src/app/pages/types/user.ts` → tipos atualizados (`PublicUser`, `LoginResponse`).
- `src/app/components/login-form/login-form.component.html` → formulário agora vinculado ao Reactive Form (`[formGroup]`, `formControlName`, `(ngSubmit)`), pois antes os campos não estavam conectados ao componente.
- `src/app/guards/home.guard.ts` → passa a validar a sessão pelo `token` armazenado.

Para rodar o front junto:

```bash
# Terminal 1 — API
cd login-api
npm install
npm run build
npm start

# Terminal 2 — Angular
cd SENAI_Sprint8_ProjetoFinal
npm install
npm start   # ng serve, http://localhost:4200
```

Acesse `http://localhost:4200/login` e utilize qualquer um dos identificadores da tabela acima com a senha `mudar123`.

## 7. Segurança (observações)

- Senhas nunca são armazenadas em texto puro (bcrypt).
- `identifier` é validado com regex `^\d+$` (estritamente numérico).
- JWT assinado com segredo via variável de ambiente (`JWT_SECRET`) e expiração configurável (`JWT_EXPIRES_IN`).
- Em produção, troque `JWT_SECRET` por um valor forte e mantenha-o fora do controle de versão.
