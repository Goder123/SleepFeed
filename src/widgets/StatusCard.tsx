import { Moon, Sun, Pencil, Plus } from "lucide-react";

import useStatusCard from "../shared/hooks/useStatusCard";

export default function StatusCard() {
  const { sleeping, duration, startedAtLabel } = useStatusCard();

  return (
    <section className="rounded-[32px] bg-slate-900 p-6 shadow-xl">
      <div className="flex items-start justify-between">
        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-sky-500 hover:text-white"
            title="Редактировать сон"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-emerald-500 hover:text-white"
            title="Добавить сон"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="-mt-4 flex flex-col items-center">
        {sleeping ? (
          <Moon
            size={64}
            className="text-indigo-400"
          />
        ) : (
          <Sun
            size={64}
            className="text-yellow-400"
          />
        )}

        <h2 className="mt-4 text-3xl font-bold">
          {sleeping ? "Спит" : "Бодрствует"}
        </h2>

        <div className="mt-6 text-5xl font-bold">
          {duration}
        </div>

        <div className="mt-4 text-slate-400">
          {startedAtLabel}
        </div>
      </div>
    </section>
  );
}