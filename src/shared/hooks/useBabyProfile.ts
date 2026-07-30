import { useMemo } from "react";

import { useBabyStore } from "../../store/babyStore";
import { getBabyAge } from "../lib/getBabyAge";

export function useBabyProfile() {
  const profile = useBabyStore((state) => state.profile);

  const age = useMemo(
    () => getBabyAge(profile.birthDate),
    [profile.birthDate]
  );

  const hasProfile =
  profile.name.trim() !== "" &&
  profile.birthDate.trim() !== "";
  return {
    profile,
    age,
    hasProfile,
  };
}