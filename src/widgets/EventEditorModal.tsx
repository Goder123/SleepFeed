import { useState } from "react";

import Modal from "../shared/ui/Modal";
import { useBabyStore } from "../store/babyStore";

import type { BabyEvent } from "../shared/types/events";

export type EventEditorMode = "add" | "edit";

export type EventEditorType = "sleep" | "awake" | "feed";

interface EventEditorModalProps {
  open: boolean;
  mode: EventEditorMode;
  type: EventEditorType;
  onClose: () => void;
}

export default function EventEditorModal({
  open,
  mode,
  type,
  onClose,
}: EventEditorModalProps) {
  const addEvent = useBabyStore((state) => state.addEvent);

  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [feedTime, setFeedTime] = useState("");

  const title =
    mode === "add"
      ? {
          sleep: "Добавить сон",
          awake: "Добавить бодрствование",
          feed: "Добавить кормление",
        }[type]
      : {
          sleep: "Редактировать сон",
          awake: "Редактировать бодрствование",
          feed: "Редактировать кормление",
        }[type];

  const toTimestamp = (time: string) => new Date(`${date}T${time}`).getTime();

  const handleSave = () => {
    if (mode !== "add") {
      onClose();
      return;
    }

    if (type === "feed") {
      if (!feedTime) return;

      const timestamp = toTimestamp(feedTime);

      addEvent({
        id: timestamp,
        type: "feed",
        title: "Покормил",
        timestamp,
      });

      onClose();
      return;
    }

    if (!startTime || !endTime) {
      return;
    }

    const sleepStarted = toTimestamp(startTime);
    const sleepEnded = toTimestamp(endTime);

    const sleepEvent: BabyEvent = {
      id: sleepStarted,
      type: "sleep",
      title: "Уснул",
      timestamp: sleepStarted,
    };

    const wakeEvent: BabyEvent = {
      id: sleepEnded,
      type: "wake",
      title: "Проснулся",
      timestamp: sleepEnded,
    };

    addEvent(sleepEvent);
    addEvent(wakeEvent);

    onClose();
  };

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Дата
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        {type === "feed" ? (
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Время
            </label>

            <input
              type="time"
              value={feedTime}
              onChange={(e) => setFeedTime(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>
        ) : (
          <>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Начало
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Конец
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900"
          >
            Отмена
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
          >
            Сохранить
          </button>
        </div>
      </div>
    </Modal>
  );
}
