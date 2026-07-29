export function getBabyAge(birthDate: string): string {
  if (!birthDate) {
    return "";
  }

  const birth = new Date(birthDate);
  const today = new Date();

  let months =
    (today.getFullYear() - birth.getFullYear()) * 12 +
    (today.getMonth() - birth.getMonth());

  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;

    const previousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    );

    days += previousMonth.getDate();
  }

  if (months < 0) {
    return "";
  }

  if (months === 0) {
    return `${days} дн.`;
  }

  return `${months} мес. ${days} дн.`;
}