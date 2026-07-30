import { ChevronRight, History } from "lucide-react";
import { Link } from "react-router-dom";

export default function HistoryButton() {
  return (
    <Link
      to="/history"
      className="group flex items-center justify-between rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-lg transition-all duration-200 hover:border-slate-700 hover:bg-slate-800 active:scale-[0.98]"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-500/15">
            <History className="text-sky-400" size={22} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">
            История событий
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Просмотреть и изменить записи
          </p>
        </div>
      </div>

      <ChevronRight
        className="shrink-0 text-slate-500 transition-transform duration-200 group-hover:translate-x-1"
        size={22}
      />
    </Link>
  );
}