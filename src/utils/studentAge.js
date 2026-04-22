import { getAgeInBogotaFromISODate } from "./dateColombia";

export function getStudentAge(student = {}) {
  if (student.birthDate) return getAgeInBogotaFromISODate(student.birthDate);
  if (typeof student.age === "number") return student.age;
  return null;
}
