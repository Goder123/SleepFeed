import { Moon, Sun } from "lucide-react";

import { useBabyStore } from "../store/babyStore";
import useNow from "../shared/hooks/useNow";
import { formatClock, formatDuration } from "../shared/lib/time";

export default function StatusCard() {
  const status = useBabyStore((state) => state.status);

  const sleepStartedAt = useBabyStore((state) => state.sleepStartedAt);

  const awakeStartedAt = useBabyStore((state) => state.awakeStartedAt);

  const now = useNow();

  const sleeping = status === "sleeping";

  const startedAt = sleeping ? sleepStartedAt : awakeStartedAt;

  const duration =
    startedAt !== null
      ? formatDuration(now - startedAt)
      : "00:00:00";

  return (
    <section className="bg-slate-900 rounded-[32px] p-6 shadow-xl">
      <div className="text-slate-400 text-sm">
        👶 Артем
      </div>

      <div className="flex flex-col items-center mt-6">
        {sleeping ? (
          <Moon size={64} className="text-indigo-400" />
        ) : (
          <Sun size={64} className="text-yellow-400" />
        )}

        <h2 className="text-3xl font-bold mt-4">
          {sleeping ? "Спит" : "Бодрствует"}
        </h2>

        <div className="text-5xl font-bold mt-6">
          {duration}
        </div>

        <div className="text-slate-400 mt-4">
          {startedAt
            ? `С ${formatClock(startedAt)}`
            : "—"}
        </div>
      </div>
    </section>
  );
}