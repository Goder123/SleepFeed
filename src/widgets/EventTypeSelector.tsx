import { Moon, Sun, Milk } from "lucide-react";

import type { EventType } from "../shared/types/events";

interface EventTypeSelectorProps {
  selectedType: EventType | null;
  onSelect: (type: EventType) => void;
}

const eventTypes: {
  type: EventType;
  title: string;
  description: string;
  icon: typeof Moon;
}[] = [
  {
    type: "sleep",
    title: "Сон",
    description: "Добавить начало сна",
    icon: Moon,
  },
  {
    type: "wake",
    title: "Бодрствование",
    description: "Добавить пробуждение",
    icon: Sun,
  },
  {
    type: "feed",
    title: "Кормление",
    description: "Добавить кормление",
    icon: Milk,
  },
];

export default function EventTypeSelector({
  selectedType,
  onSelect,
}: EventTypeSelectorProps) {
  return (
    <div className="space-y-4">
      {eventTypes.map((item) => {
        const Icon = item.icon;

        const selected = selectedType === item.type;

        return (
          <button
            key={item.type}
            type="button"
            onClick={() => onSelect(item.type)}
            className={
              selected
                ? "group flex w-full items-center gap-4 rounded-3xl border border-sky-500 bg-slate-800 p-5 text-left ring-2 ring-sky-500/20 transition-all duration-200"
                : "group flex w-full items-center gap-4 rounded-3xl border border-slate-800 bg-slate-950 p-5 text-left transition-all duration-200 hover:border-sky-500/40 hover:bg-slate-900 hover:scale-[1.01] active:scale-[0.99]"
            }
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/15 transition-colors duration-200 group-hover:bg-sky-500/20">
              <Icon size={24} className="text-sky-400" />
            </div>

            <div className="flex-1">
              <h3 className="text-[17px] font-semibold tracking-tight text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-[14px] leading-5 text-slate-400">
                {item.description}
              </p>
            </div>
            {selected && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/15">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-sky-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3.2-3.2a1 1 0 011.414-1.41l2.493 2.492 6.493-6.492a1 1 0 011.415 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
