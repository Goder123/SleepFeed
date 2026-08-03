import type { FeedingType } from "../../shared/types/events";

import DateTimePicker from "../DateTimePicker";

interface EventEditorFeedProps {
  feedingType: FeedingType;

  amount: string;

  date: string;

  time: string;

  onFeedingTypeChange: (type: FeedingType) => void;

  onAmountChange: (value: string) => void;

  onDateChange: (value: string) => void;

  onTimeChange: (value: string) => void;
}

export default function EventEditorFeed({
  feedingType,
  amount,
  date,
  time,
  onFeedingTypeChange,
  onAmountChange,
  onDateChange,
  onTimeChange,
}: EventEditorFeedProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold text-white">
          🍼 Тип кормления
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onFeedingTypeChange("breast")}
            className={
              feedingType === "breast"
                ? "rounded-2xl bg-indigo-600 py-3 text-white"
                : "rounded-2xl bg-slate-800 py-3 text-slate-300"
            }
          >
            🤱 Грудное
          </button>

          <button
            type="button"
            onClick={() => onFeedingTypeChange("formula")}
            className={
              feedingType === "formula"
                ? "rounded-2xl bg-indigo-600 py-3 text-white"
                : "rounded-2xl bg-slate-800 py-3 text-slate-300"
            }
          >
            🍼 Смесь
          </button>
        </div>
      </div>

      {feedingType === "formula" && (
        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Количество смеси
          </label>

          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="Например 120 мл"
            className="
              w-full
              rounded-2xl
              bg-slate-800
              px-4
              py-3
              text-white
              outline-none
            "
          />

          <p className="mt-2 text-xs text-slate-500">
            Укажите объем смеси в миллилитрах.
          </p>
        </div>
      )}

      <div>
        <h3 className="mb-3 text-lg font-semibold text-white">
          📅 Время кормления
        </h3>

        <DateTimePicker
          date={date}
          time={time}
          onDateChange={onDateChange}
          onTimeChange={onTimeChange}
        />
      </div>
    </div>
  );
}