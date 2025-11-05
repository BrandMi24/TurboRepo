// apps/svc-analytics/src/schemas.ts
import { z } from "zod";

export const EventSchema = z.object({
  type: z.string().min(2),                 // ej: "checkout.completed"
  userId: z.string().optional(),           // id del usuario (si aplica)
  app: z.enum(["ventas", "inventario", "citas"]),
  // 👇 clave string y valor desconocido; default a objeto vacío
  payload: z.record(z.string(), z.unknown()).default({}),
  ts: z.number().optional()                // epoch ms; si no llega lo generamos
});

export type EventInput = z.infer<typeof EventSchema>;
