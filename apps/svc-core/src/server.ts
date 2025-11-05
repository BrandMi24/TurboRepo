// 👇 ya lo tienes arriba:
import { z } from "zod";
import { randomUUID } from "crypto";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

/* ------- citas -------- */
const AppointmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  date: z.string(),               // ISO
  notes: z.string().optional()
});
type Appointment = z.infer<typeof AppointmentSchema>;

const db: { appointments: Appointment[] } = { appointments: [] };

app.get("/appointments", (_req, res) => {
  res.json(db.appointments);
});

app.post("/appointments", (req, res) => {
  const parsed = AppointmentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const row: Appointment = { ...parsed.data, id: randomUUID() };
  db.appointments.push(row);
  return res.status(201).json(row);
});

// ✅ Reprogramar (actualiza fecha y/o notas)
const ReprogSchema = z.object({
  date: z.string().optional(),
  notes: z.string().optional()
}).refine(d => !!d.date || !!d.notes, { message: "Nada que actualizar" });

app.patch("/appointments/:id", (req, res) => {
  const parsed = ReprogSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const idx = db.appointments.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).send("Not found");

  db.appointments[idx] = { ...db.appointments[idx], ...parsed.data };
  return res.json(db.appointments[idx]);
});

// ✅ Cancelar (eliminar)
app.delete("/appointments/:id", (req, res) => {
  const idx = db.appointments.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).send("Not found");
  const removed = db.appointments.splice(idx, 1)[0];
  return res.json(removed);
});

/* ------- health ------- */
app.get("/health", (_req, res) => res.json({ ok: true }));

export { app };

if (require.main === module) {
  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => console.log(`svc-core on :${PORT}`));
}
