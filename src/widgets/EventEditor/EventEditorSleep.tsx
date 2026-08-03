import DateTimePicker from "../DateTimePicker";

interface EventEditorSleepProps {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;

  onStartDateChange: (value: string) => void;
  onStartTimeChange: (value: string) => void;

  onEndDateChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
}

export default function EventEditorSleep({
  startDate,
  startTime,
  endDate,
  endTime,
  onStartDateChange,
  onStartTimeChange,
  onEndDateChange,
  onEndTimeChange,
}: EventEditorSleepProps) {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-white">
          🌙 Начало сна
        </h3>

        <DateTimePicker
          date={startDate}
          time={startTime}
          onDateChange={onStartDateChange}
          onTimeChange={onStartTimeChange}
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-white">
          🌅 Конец сна
        </h3>

        <DateTimePicker
          date={endDate}
          time={endTime}
          onDateChange={onEndDateChange}
          onTimeChange={onEndTimeChange}
        />
      </section>
    </div>
  );
}