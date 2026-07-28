import { Moon, Sun, Baby } from "lucide-react";
import { useBabyStore } from "../store/babyStore";
import { formatClock } from "../shared/lib/time";

export default function Timeline() {
  const events = useBabyStore((state) => state.events);

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        История
      </h2>

      {events.length === 0 ? (
        <div className="bg-slate-900 rounded-[28px] p-6 text-center text-slate-400">
          Пока нет событий
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-slate-900 rounded-[28px] p-5 shadow-md"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {event.type === "sleep" && (
                    <Moon className="text-indigo-400" />
                  )}

                  {event.type === "wake" && (
                    <Sun className="text-yellow-400" />
                  )}

                  {event.type === "feed" && (
                    <Baby className="text-emerald-400" />
                  )}

                  <span className="font-semibold">
                    {event.title}
                  </span>
                </div>

                <span className="font-bold">
                  {formatClock(event.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}