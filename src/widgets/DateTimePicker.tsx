import { CalendarDays, Clock3 } from "lucide-react";

interface DateTimePickerProps {
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
}

export default function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="block text-sm font-semibold tracking-wide text-slate-400">
          Дата
        </label>

        <div className="relative">
          <CalendarDays
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-slate-800
              py-3.5
              pl-12
              pr-4
              text-white
              outline-none
              transition-all
              duration-200
              focus:border-sky-500
              focus:ring-2
              focus:ring-sky-500/20
            "
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold tracking-wide text-slate-400">
          Время
        </label>

        <div className="relative">
          <Clock3
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-slate-800
              py-3.5
              pl-12
              pr-4
              text-white
              outline-none
              transition-all
              duration-200
              focus:border-sky-500
              focus:ring-2
              focus:ring-sky-500/20
            "
          />
        </div>
      </div>
    </div>
  );
}