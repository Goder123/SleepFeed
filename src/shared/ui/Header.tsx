import { Link, useNavigate } from "react-router-dom";

import { useBabyProfile } from "../hooks/useBabyProfile";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export default function Header({
  title,
  showBackButton = false,
}: HeaderProps) {
  const navigate = useNavigate();

  const { profile, age, hasProfile } = useBabyProfile();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-[430px] items-center justify-between p-4">
        {showBackButton ? (
          <button
            onClick={() => navigate(-1)}
            className="rounded-full p-2 text-xl transition hover:bg-slate-800"
          >
            ←
          </button>
        ) : (
          <div className="w-10" />
        )}

        <div className="flex flex-1 flex-col px-3">
          {hasProfile ? (
            <>
              <span className="text-lg font-bold text-white">
                👶 {profile.name}
              </span>

              <span className="text-sm text-slate-400">{age}</span>
            </>
          ) : (
            <>
              <span className="text-lg font-bold text-white">
                {title ?? "SleepFeed"}
              </span>

              <span className="text-sm text-slate-400">
                Добавьте профиль ребенка
              </span>
            </>
          )}
        </div>

        {showBackButton ? (
          <div className="w-10" />
        ) : (
          <Link
            to="/settings"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-xl transition hover:bg-slate-700"
          >
            ⚙️
          </Link>
        )}
      </div>
    </header>
  );
}