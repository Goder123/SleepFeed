import { Moon, Sun } from "lucide-react";

import useStatusCard from "../shared/hooks/useStatusCard";

export default function StatusCard() {
  const { sleeping, duration, startedAtLabel } = useStatusCard();

  return (
    <section className="rounded-[32px] bg-slate-900 p-6 shadow-xl">
      <div className="text-sm text-slate-400">
        👶 Артем
      </div>

      <div className="mt-6 flex flex-col items-center">
        {sleeping ? (
          <Moon size={64} className="text-indigo-400" />
        ) : (
          <Sun size={64} className="text-yellow-400" />
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