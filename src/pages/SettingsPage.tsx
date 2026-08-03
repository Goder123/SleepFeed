import { useState } from "react";
import { UserRound, CalendarDays } from "lucide-react";

import Header from "../shared/ui/Header";
import { useBabyStore } from "../store/babyStore";

export default function SettingsPage() {
  const profile = useBabyStore((state) => state.profile);

  const updateProfile = useBabyStore((state) => state.updateProfile);

  const [name, setName] = useState(profile.name);

  const [birthDate, setBirthDate] = useState(profile.birthDate);

  const [gender, setGender] = useState(profile.gender);

  function calculateAge(date: string) {
    if (!date) {
      return "";
    }

    const birth = new Date(date);

    const now = new Date();

    let months =
      (now.getFullYear() - birth.getFullYear()) * 12 +
      now.getMonth() -
      birth.getMonth();

    if (now.getDate() < birth.getDate()) {
      months--;
    }

    if (months < 1) {
      return "";
    }

    if (months < 12) {
      return `${months} мес.`;
    }

    const years = Math.floor(months / 12);

    return `${years} г.`;
  }

  function handleSave() {
    updateProfile({
      name,
      birthDate,
      gender,
    });
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header title="Профиль" showBackButton />

      <div className="mx-auto max-w-[430px] space-y-5 px-5 pb-8">
        <section className="rounded-[32px] bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20">
              <UserRound className="text-indigo-400" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Ребенок</h2>

              {calculateAge(birthDate) && (
                <p className="text-sm text-slate-400">
                  Возраст: {calculateAge(birthDate)}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-400">Имя</span>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя ребенка"
                className="
                  w-full
                  rounded-2xl
                  bg-slate-800
                  px-4
                  py-3
                  text-white
                  outline-none
                  ring-1
                  ring-slate-700
                  focus:ring-indigo-500
                "
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                <CalendarDays size={16} />
                Дата рождения
              </span>

              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="
                  w-full
                  rounded-2xl
                  bg-slate-800
                  px-4
                  py-3
                  text-white
                  outline-none
                  ring-1
                  ring-slate-700
                  focus:ring-indigo-500
                "
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-400">Пол</span>

              <select
                value={gender ?? ""}
                onChange={(e) =>
                  setGender(
                    e.target.value === ""
                      ? null
                      : (e.target.value as "male" | "female"),
                  )
                }
                className="
                  w-full
                  rounded-2xl
                  bg-slate-800
                  px-4
                  py-3
                  text-white
                  outline-none
                  ring-1
                  ring-slate-700
                "
              >
                <option value="">Не выбран</option>

                <option value="male">👦 Мальчик</option>

                <option value="female">👧 Девочка</option>
              </select>
            </label>
          </div>
        </section>

        <button
          onClick={handleSave}
          className="
            w-full
            rounded-2xl
            bg-indigo-600
            py-4
            font-semibold
            text-white
            transition
            hover:bg-indigo-500
          "
        >
          Сохранить профиль
        </button>
      </div>
    </main>
  );
}
