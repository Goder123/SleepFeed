import { Baby } from "lucide-react";

import useLastFeed from "../shared/hooks/useLastFeed";

export default function LastFeedCard() {
  const { lastFeedTime, lastFeedLabel } = useLastFeed();

  return (
    <section className="mt-5 rounded-[32px] bg-slate-900 p-5 shadow-lg">
      <div className="flex items-center gap-2 text-slate-400">
        <Baby size={20} />
        <span>Последнее кормление</span>
      </div>

      <div className="mt-4 text-3xl font-bold">
        {lastFeedTime}
      </div>

      <div className="mt-2 text-slate-400">
        {lastFeedLabel}
      </div>
    </section>
  );
}