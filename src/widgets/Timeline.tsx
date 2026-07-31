import { Link } from "react-router-dom";

import { buildTimeline } from "../shared/lib/timeline";
import { useBabyStore } from "../store/babyStore";

import TimelineItemCard from "./TimelineItemCard";

export default function Timeline() {
  const events = useBabyStore((state) => state.events);

  const timeline = buildTimeline(events);

  const latestItems = timeline
    .flatMap((day) => day.items)
    .slice(0, 5);

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          История
        </h2>

        <Link
          to="/history"
          className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Все →
        </Link>
      </div>

      {latestItems.length === 0 ? (
        <div className="rounded-[28px] bg-slate-900 p-6 text-center text-slate-400">
          Пока нет событий
        </div>
      ) : (
        <div className="space-y-4">
          {latestItems.map((item) => (
            <TimelineItemCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}
    </section>
  );
}