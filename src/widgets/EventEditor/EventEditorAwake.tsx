import DateTimePicker from "../DateTimePicker";

interface EventEditorAwakeProps {
  date: string;
  time: string;

  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
}

export default function EventEditorAwake({
  date,
  time,
  onDateChange,
  onTimeChange,
}: EventEditorAwakeProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white">
        ☀ Начало бодрствования
      </h3>

      <DateTimePicker
        date={date}
        time={time}
        onDateChange={onDateChange}
        onTimeChange={onTimeChange}
      />
    </div>
  );
}