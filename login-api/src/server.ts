import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:4200", // origem padrão do Angular (ng serve)
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use("/", authRoutes);

// 404
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

// Handler de erros genérico
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Login API rodando em http://localhost:${PORT}`);
});
