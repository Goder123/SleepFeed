import { Moon, Sun } from "lucide-react";
import { useBabyStore } from "../store/babyStore";
import { formatClock, formatDuration } from "../shared/lib/time";
import { useNow } from "../shared/hooks/useNow";

export default function StatusCard() {
  const status = useBabyStore((state) => state.status);
  const sleepStartedAt = useBabyStore((state) => state.sleepStartedAt);

  const now = useNow();

  const sleeping = status === "sleeping";

  const duration =
    sleeping && sleepStartedAt
      ? formatDuration(now - sleepStartedAt)
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

        {sleeping && (
          <div className="text-5xl font-bold mt-6 text-indigo-300">
            {duration}
          </div>
        )}

        <div className="text-slate-400 mt-4">
          {sleeping && sleepStartedAt
            ? `С ${formatClock(sleepStartedAt)}`
            : "Ребенок не спит"}
        </div>
      </div>
    </section>
  );
}