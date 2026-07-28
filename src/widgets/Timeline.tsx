const events = [
  {
    icon: "🍼",
    title: "Покормил",
    time: "15:45",
    ago: "38 минут назад",
  },
  {
    icon: "☀️",
    title: "Проснулся",
    time: "15:37",
    ago: "46 минут назад",
  },
  {
    icon: "🌙",
    title: "Уснул",
    time: "14:32",
    ago: "1 час 51 мин назад",
  },
];

export default function Timeline() {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Сегодня
      </h2>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="
              bg-slate-900
              rounded-[28px]
              p-5
              shadow-md
              transition
              hover:bg-slate-800
            "
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xl font-semibold">
                  {event.icon} {event.title}
                </div>

                <div className="text-slate-400 mt-2 text-sm">
                  Сегодня
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-lg">
                  {event.time}
                </div>

                <div className="text-slate-400 text-sm mt-2">
                  {event.ago}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}