import { UtensilsCrossed, ChevronRight, Moon, Sun } from "lucide-react";

import type { BabyEvent } from "../shared/types/events";

interface HistoryEventCardProps {
  event: BabyEvent;
}

export default function HistoryEventCard({
  event,
}: HistoryEventCardProps) {
  const time = new Date(event.timestamp).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const eventInfo = (() => {
    switch (event.type) {
      case "sleep":
        return {
          title: "Сон",
          icon: <Moon size={20} />,
          iconBg: "bg-indigo-500/15",
          iconColor: "text-indigo-400",
        };

      case "wake":
        return {
          title: "Бодрствование",
          icon: <Sun size={20} />,
          iconBg: "bg-amber-500/15",
          iconColor: "text-amber-400",
        };

      case "feed":
        return {
          title: "Кормление",
          icon: <UtensilsCrossed size={20} />,
          iconBg: "bg-emerald-500/15",
          iconColor: "text-emerald-400",
        };

      default:
        return {
          title: event.title,
          icon: null,
          iconBg: "bg-slate-800",
          iconColor: "text-slate-300",
        };
    }
  })();

  return (
    <button
      type="button"
      className="group flex w-full items-center justify-between rounded-[24px] border border-slate-800 bg-slate-900 p-4 text-left shadow-lg transition-all duration-200 hover:border-slate-700 hover:bg-slate-800 active:scale-[0.98]"
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${eventInfo.iconBg}`}
        >
          <span className={eventInfo.iconColor}>
            {eventInfo.icon}
          </span>
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {eventInfo.title}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {time}
          </p>
        </div>
      </div>

      <ChevronRight
        size={20}
        className="text-slate-500 transition-transform duration-200 group-hover:translate-x-1"
      />
    </button>
  );
}