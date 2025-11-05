import { z } from "zod";

const API_URL = import.meta.env.VITE_API_URL as string;

export const AppointmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  date: z.string(),       // ISO
  notes: z.string().optional()
});
export type Appointment = z.infer<typeof AppointmentSchema>;

export async function listAppointments(): Promise<Appointment[]> {
  const r = await fetch(`${API_URL}/core/appointments`);
  if (!r.ok) throw new Error("Error al listar citas");
  const data = await r.json();
  return z.array(AppointmentSchema).parse(data);
}

export async function createAppointment(input: Omit<Appointment, "id">) {
  const r = await fetch(`${API_URL}/core/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  if (!r.ok) {
    const err = await r.text();
    throw new Error(err || "Error al crear cita");
  }
  const data = await r.json();
  const parsed = AppointmentSchema.parse(data);

  // dispara analytics (no bloquea UI)
  fetch(`${API_URL}/analytics/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "appointment.created",
      app: "citas",
      payload: { id: parsed.id, email: parsed.email }
    })
  }).catch(() => {});

  return parsed;
}

export async function rescheduleAppointment(
  id: string,
  data: { date?: string; notes?: string }
) {
  const r = await fetch(`${API_URL}/core/appointments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error(await r.text() || "Error al reprogramar");
  const updated = await r.json();

  // Analytics (no bloquea)
  fetch(`${API_URL}/analytics/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "appointment.rescheduled",
      app: "citas",
      payload: { id, date: data.date }
    })
  }).catch(()=>{});

  return AppointmentSchema.parse(updated);
}

export async function cancelAppointment(id: string) {
  const r = await fetch(`${API_URL}/core/appointments/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error(await r.text() || "Error al cancelar");

  // Analytics
  fetch(`${API_URL}/analytics/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "appointment.cancelled",
      app: "citas",
      payload: { id }
    })
  }).catch(()=>{});

  return true;
}
