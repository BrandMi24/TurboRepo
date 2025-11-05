import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listAppointments, rescheduleAppointment, cancelAppointment } from "../api";
import type { Appointment } from "../api";

import { format } from "date-fns";
import { useState } from "react";

export default function Home() {
  const { data, isLoading, error } = useQuery({ queryKey: ["appointments"], queryFn: listAppointments });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMsg msg={(error as Error).message} />;

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold tracking-tight">Mis citas</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Consulta y administra tus próximas reservas.
        </p>
      </header>

      {!data?.length ? <EmptyState /> : (
        <ul className="grid gap-4 sm:max-w-2xl">
          {data.map(a => <AppointmentItem key={a.id} a={a} />)}
        </ul>
      )}
    </section>
  );
}

function AppointmentItem({ a }: { a: Appointment }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [newDate, setNewDate] = useState("");

  const resched = useMutation({
    mutationFn: (payload: { date: string }) => rescheduleAppointment(a.id!, payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["appointments"] }); setOpen(false); }
  });

  const cancel = useMutation({
    mutationFn: () => cancelAppointment(a.id!),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["appointments"] })
  });

  return (
    <li className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm
                   dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Cliente</p>
          <p className="font-medium">{a.name}</p>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{a.email}</div>
          {a.notes && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{a.notes}</p>}
        </div>
        <span className="rounded-full bg-blue-50 text-blue-700 text-xs px-2.5 py-1 shrink-0
                         dark:bg-blue-950/40 dark:text-blue-300">
          {format(new Date(a.date), "yyyy-MM-dd HH:mm")}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => { setOpen(true); setNewDate(a.date.slice(0,16)); }}
          className="px-3 py-1.5 text-sm rounded-md ring-1 ring-slate-200 hover:bg-slate-50
                     dark:ring-slate-700 dark:hover:bg-slate-800"
        >
          Reprogramar
        </button>
        <button
          onClick={() => {
            if (confirm("¿Cancelar esta cita?")) cancel.mutate();
          }}
          className="px-3 py-1.5 text-sm rounded-md bg-rose-600 text-white hover:bg-rose-700
                     dark:bg-rose-600 dark:hover:bg-rose-500"
        >
          {cancel.isPending ? "Cancelando..." : "Cancelar"}
        </button>
      </div>

      {/* Mini-modal simple */}
      {open && (
        <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-xl flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-4 shadow
                          dark:border-slate-800 dark:bg-slate-900">
            <h4 className="font-medium">Reprogramar cita</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Elige nueva fecha y hora.</p>
            <input
              type="datetime-local"
              value={newDate}
              onChange={e => setNewDate(e.target.value)}
              className="w-full rounded-md border-slate-300 bg-white text-slate-900
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <div className="mt-4 flex gap-2 justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1.5 text-sm rounded-md ring-1 ring-slate-200
                           dark:ring-slate-700"
              >
                Cerrar
              </button>
              <button
                onClick={() => resched.mutate({ date: newDate })}
                className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700
                           dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                {resched.isPending ? "Guardando..." : "Guardar"}
              </button>
            </div>
            {resched.error && (
              <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">
                Error: {(resched.error as Error).message}
              </p>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center
                    dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto h-10 w-10 rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 flex items-center justify-center">
        <span className="text-blue-700 dark:text-blue-300 text-lg">🗓️</span>
      </div>
      <h3 className="mt-4 font-medium">Sin citas todavía</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Ve a <span className="font-semibold text-slate-700 dark:text-slate-200">“Agendar”</span> para crear tu primera cita.
      </p>
    </div>
    
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-6
                    dark:border-slate-800 dark:bg-slate-900">
      <div className="h-4 w-40 bg-slate-200 rounded dark:bg-slate-700" />
      <div className="mt-4 h-3 w-full bg-slate-100 rounded dark:bg-slate-800" />
      <div className="mt-2 h-3 w-5/6 bg-slate-100 rounded dark:bg-slate-800" />
    </div>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-700 p-4
                    dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300">
      {msg}
    </div>
  );
}
