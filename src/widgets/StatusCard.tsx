export default function StatusCard() {
  return (
    <section className="bg-slate-900 rounded-[32px] p-6 shadow-xl">

      <div className="text-slate-400 text-sm">
        👶 Макар
      </div>

      <div className="flex flex-col items-center mt-6">

        <div className="text-6xl">
          😴
        </div>

        <h2 className="text-3xl font-bold mt-3">
          Спит
        </h2>

        <div className="text-5xl font-black mt-6 tracking-wider">
          01:42:18
        </div>

        <div className="text-slate-400 mt-4">
          с 14:32
        </div>

      </div>

    </section>
  )
}