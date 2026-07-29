import { Moon, Sun, Baby, Trash2 } from "lucide-react";
import { useBabyStore } from "../store/babyStore";
import { formatClock } from "../shared/lib/time";

export default function Timeline() {
  const events = useBabyStore((state) => state.events);
  const deleteEvent = useBabyStore((state) => state.deleteEvent);

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Удалить это событие?\n\nЭто действие нельзя отменить."
    );

    if (!confirmed) return;

    deleteEvent(id);
  };

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">История</h2>

      {events.length === 0 ? (
        <div className="bg-slate-900 rounded-[28px] p-6 text-center text-slate-400">
          Пока нет событий
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-slate-900 rounded-[28px] p-5 shadow-md hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {event.type === "sleep" && (
                    <Moon className="text-indigo-400" size={22} />
                  )}

                  {event.type === "wake" && (
                    <Sun className="text-yellow-400" size={22} />
                  )}

                  {event.type === "feed" && (
                    <Baby className="text-emerald-400" size={22} />
                  )}

                  <span className="font-semibold text-white">
                    {event.title}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-300">
                    {formatClock(event.timestamp)}
                  </span>

                  <button
                    onClick={() => handleDelete(event.id)}
                    className="rounded-lg p-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
                    title="Удалить событие"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}