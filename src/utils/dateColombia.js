const BOGOTA_TIME_ZONE = "America/Bogota";

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: BOGOTA_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function parseISODateParts(value) {
  if (!value || typeof value !== "string") return null;

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;

  return { year, month, day };
}

export function getBogotaTodayParts() {
  const parts = dateFormatter.formatToParts(new Date());

  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);

  return { year, month, day };
}

export function getAgeInBogotaFromISODate(isoDate) {
  const birth = parseISODateParts(isoDate);
  if (!birth) return 0;

  const today = getBogotaTodayParts();

  let age = today.year - birth.year;

  const beforeBirthday =
    today.month < birth.month || (today.month === birth.month && today.day < birth.day);

  if (beforeBirthday) age -= 1;

  return Math.max(0, age);
}
