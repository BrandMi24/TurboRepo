import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../api";
import AppointmentForm from "../components/AppointmentForm";

export default function NewAppointment() {
  const nav = useNavigate();
  const qc = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["appointments"] })
  });

  async function handleSubmit(data: Parameters<typeof createAppointment>[0]) {
    await mutateAsync(data);
    nav("/exito");
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold tracking-tight">Agendar cita</h2>
        <p className="text-sm text-slate-500">Completa la información para reservar tu espacio.</p>
      </header>

      <AppointmentForm onSubmit={handleSubmit} />

      {isPending && <p className="text-sm text-slate-500">Guardando…</p>}
      {error && <p className="text-sm text-rose-600">Error: {(error as Error).message}</p>}
    </section>
  );
}
