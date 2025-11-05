import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="max-w-lg rounded-xl border border-green-200 bg-green-50 p-6">
      <h2 className="text-xl font-semibold text-green-800">¡Cita agendada!</h2>
      <p className="mt-1 text-sm text-green-700">
        Recibirás confirmación por correo (demo). Puedes ver tu lista de citas en el inicio.
      </p>

      <div className="mt-4">
        <Link
          to="/"
          className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Ir a mis citas
        </Link>
      </div>
    </div>
  );
}
