import { useState } from "react";
import { z } from "zod";
import { AppointmentSchema } from "../api";

const FormSchema = AppointmentSchema.omit({ id: true });
type FormData = z.infer<typeof FormSchema>;

export default function AppointmentForm({ onSubmit }: { onSubmit: (d: FormData)=>void }) {
  const [form, setForm] = useState<FormData>({ name: "", email: "", date: "", notes: "" });
  const [err, setErr] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = FormSchema.safeParse(form);
    if (!parsed.success) {
      setErr("Revisa los campos (Nombre ≥ 2, Email válido, Fecha/Hora).");
      return;
    }
    setErr(null);
    onSubmit(parsed.data);
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-xl space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm
                 dark:border-slate-800 dark:bg-slate-900"
    >
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nombre</label>
        <input
          name="name"
          className="mt-1 w-full rounded-md border-slate-300 bg-white text-slate-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          placeholder="Juan Pérez"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
        <input
          name="email"
          type="email"
          className="mt-1 w-full rounded-md border-slate-300 bg-white text-slate-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          placeholder="correo@ejemplo.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Fecha y hora</label>
        <input
          name="date"
          type="datetime-local"
          className="mt-1 w-full rounded-md border-slate-300 bg-white text-slate-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Notas (opcional)</label>
        <textarea
          name="notes"
          rows={3}
          className="mt-1 w-full rounded-md border-slate-300 bg-white text-slate-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          placeholder="Detalles de la cita…"
          value={form.notes || ""}
          onChange={handleChange}
        />
      </div>

      {err && <p className="text-sm text-rose-600 dark:text-rose-400">{err}</p>}

      <div className="pt-2">
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700
                     dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Agendar
        </button>
      </div>
    </form>
  );
}
