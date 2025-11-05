import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/", router);

const PORT = Number(process.env.PORT) || 4002;

// Exporta app para poder testearlo si quieres con Supertest
export { app };

if (require.main === module) {
  app.listen(PORT, () => console.log(`svc-analytics on :${PORT}`));
}
