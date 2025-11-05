import { Router } from "express";
import { EventSchema } from "./schemas";
import { store } from "./store";

export const router = Router();

// POST /events -> ingesta de eventos
router.post("/events", (req, res) => {
  const parsed = EventSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { ts, ...rest } = parsed.data;
  const saved = store.add({ ...rest, ts: ts ?? Date.now() });
  return res.status(201).json(saved);
});

// GET /metrics -> métricas agregadas
router.get("/metrics", (_req, res) => {
  return res.json(store.metrics());
});

// GET /events?app=ventas -> listar (simple)
router.get("/events", (req, res) => {
  const app = req.query.app as "ventas" | "inventario" | "citas" | undefined;
  const data = app ? store.byApp(app) : store.all();
  return res.json(data);
});
