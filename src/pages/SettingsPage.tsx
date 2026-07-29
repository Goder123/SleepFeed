import { useState } from "react";
import { useBabyStore } from "../store/babyStore";

export default function SettingsPage() {
  const profile = useBabyStore((state) => state.profile);
  const updateProfile = useBabyStore((state) => state.updateProfile);

  const [name, setName] = useState(profile.name);
  const [birthDate, setBirthDate] = useState(profile.birthDate);
  const [gender, setGender] = useState(profile.gender);

  const handleSave = () => {
    updateProfile({
      name,
      birthDate,
      gender,
    });

    alert("Профиль сохранен");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Настройки</h1>

      <label className="flex flex-col gap-1">
        <span>Имя ребенка</span>

        <input
          className="rounded-lg border p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span>Дата рождения</span>

        <input
          className="rounded-lg border p-3"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span>Пол</span>

        <select
          className="rounded-lg border p-3"
          value={gender ?? ""}
          onChange={(e) =>
            setGender(
              e.target.value === ""
                ? null
                : (e.target.value as "male" | "female")
            )
          }
        >
          <option value="">Не выбран</option>
          <option value="male">Мальчик</option>
          <option value="female">Девочка</option>
        </select>
      </label>

      <button
        className="rounded-lg bg-blue-600 p-3 text-white"
        onClick={handleSave}
      >
        Сохранить
      </button>
    </div>
  );
}