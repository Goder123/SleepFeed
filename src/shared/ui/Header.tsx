import {
  ArrowLeft,
  Moon,
  Sun,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useBabyProfile } from "../hooks/useBabyProfile";
import useStatusCard from "../hooks/useStatusCard";

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
  const { sleeping } = useStatusCard();

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 px-4 pt-3 pb-2 backdrop-blur-md">
      <div className="mx-auto max-w-[430px]">
        <div className="rounded-[28px] border border-slate-800 bg-slate-900 px-5 py-4 shadow-xl">
          <div className="flex items-center">
            {showBackButton ? (
              <button
                onClick={() => navigate(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition hover:bg-slate-700"
              >
                <ArrowLeft size={22} />
              </button>
            ) : (
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${
                  sleeping ? "bg-indigo-500" : "bg-amber-500"
                }`}
              >
                {sleeping ? <Moon size={22} /> : <Sun size={22} />}
              </div>
            )}

            <div className="ml-4 flex-1">
              {hasProfile ? (
                <>
                  <h1 className="text-xl font-semibold text-white">
                    {profile.name}
                  </h1>

                  <p className="mt-1 text-sm text-slate-400">
                    {age}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-xl font-semibold text-white">
                    {title ?? "SleepFeed"}
                  </h1>

                  <p className="mt-1 text-sm text-slate-400">
                    Добавьте профиль ребенка
                  </p>
                </>
              )}
            </div>

            {showBackButton ? (
              <div className="h-12 w-12" />
            ) : (
              <Link
                to="/settings"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition hover:bg-slate-700"
              >
                <UserRound size={22} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}