import { X, Moon, Sun, Milk } from "lucide-react";

import type { EventType } from "../shared/types/events";

interface AddEditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function AddEditEventModal({
  isOpen,
  onClose,
}: AddEditEventModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-[430px] rounded-t-[32px] border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Добавить событие
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Выберите тип события
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-3">
          {eventTypes.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.type}
                type="button"
                className="group flex w-full items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-left transition hover:border-sky-500/40 hover:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/15">
                  <Icon
                    size={22}
                    className="text-sky-400"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-slate-800 py-3 font-medium text-white transition hover:bg-slate-700"
        >
          Отмена
        </button>
      </div>
    </div>
  );
}