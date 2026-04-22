const getMissingTrainingFields = (training = {}) => {
  const missing = [];
  if (!training.placeId) missing.push("sede");
  if (!training.trainerId) missing.push("entrenador");
  return missing;
};

const getMissingStudentFields = (student = {}) => {
  const missing = [];
  if (!student.fullName?.trim()) missing.push("nombre completo");
  if (!student.documentType) missing.push("tipo de documento");
  if (!student.documentNumber) missing.push("número de documento");
  if (!student.phone) missing.push("teléfono");
  if (!student.address?.trim()) missing.push("dirección");
  if (!student.birthDate) missing.push("fecha de nacimiento");
  return missing;
};

const getMissingMedicalFields = (health = {}) => {
  const missing = [];
  if (!health.bloodType) missing.push("tipo de sangre");
  if (!health.eps) missing.push("EPS");
  return missing;
};

const getMissingGuardianFields = (guardians = {}) => {
  const missing = [];
  if (!guardians.primaryName) missing.push("nombre del acudiente principal");
  if (!guardians.primaryPhone) missing.push("teléfono del acudiente principal");
  return missing;
};

export const getMissingEnrollmentFieldsByStep = (step, form = {}) => {
  switch (step) {
    case 0:
      return getMissingTrainingFields(form.training);
    case 1:
      return getMissingStudentFields(form.student);
    case 2:
      return getMissingMedicalFields(form.health);
    case 3:
      return getMissingGuardianFields(form.guardians);
    case 4:
      return form.consent?.accepted ? [] : ["aceptar el reglamento"];
    default:
      return [];
  }
};
