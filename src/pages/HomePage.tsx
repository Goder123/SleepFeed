import Header from "../shared/ui/Header";

import StatusCard from "../widgets/StatusCard";
import ActionButtons from "../widgets/ActionButtons";
import LastFeedCard from "../widgets/LastFeedCard";
import TodayStatsCard from "../widgets/TodayStatsCard";
import Timeline from "../widgets/Timeline";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white max-w-[430px] mx-auto">
      <Header title="SleepFeed" />

      <div className="space-y-4 p-5">
        <StatusCard />

        <ActionButtons />

        <LastFeedCard />

        <TodayStatsCard />

        <Timeline />
      </div>
    </main>
  );
}