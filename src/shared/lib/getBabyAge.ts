export function getBabyAge(birthDate: string): string {
  const birth = new Date(birthDate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  const days = today.getDate() - birth.getDate();
  if (days < 0) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = today.getTime() - birth.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (years === 0 && months === 0) {
    return `${totalDays} ${plural(totalDays, "день", "дня", "дней")}`;
  }

  if (years === 0) {
    return `${months} ${plural(months, "месяц", "месяца", "месяцев")}`;
  }

  if (months === 0) {
    return `${years} ${plural(years, "год", "года", "лет")}`;
  }

  return `${years} ${plural(years, "год", "года", "лет")} ${months} ${plural(
    months,
    "месяц",
    "месяца",
    "месяцев",
  )}`;
}

function plural(value: number, one: string, few: string, many: string): string {
  const mod10 = value % 10;
  const mod100 = value % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return one;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return few;
  }

  return many;
}
