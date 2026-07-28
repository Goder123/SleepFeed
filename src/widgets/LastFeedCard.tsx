import { Baby } from "lucide-react";
import { useBabyStore } from "../store/babyStore";
import { formatClock } from "../shared/lib/time";

export default function LastFeedCard() {
  const lastFeedAt = useBabyStore((state) => state.lastFeedAt);

  return (
    <section className="bg-slate-900 rounded-[32px] p-5 mt-5 shadow-lg">
      <div className="flex items-center gap-2 text-slate-400">
        <Baby size={20} />
        <span>Последнее кормление</span>
      </div>

      <div className="text-3xl font-bold mt-4">
        {lastFeedAt ? formatClock(lastFeedAt) : "--:--"}
      </div>

      <div className="text-slate-400 mt-2">
        {lastFeedAt ? "Сегодня" : "Кормлений пока нет"}
      </div>
    </section>
  );
}