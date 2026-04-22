import { getAgeInBogotaFromISODate } from "../utils/dateColombia";

const DOCUMENT_TYPES = [
  "Registro civil",
  "Tarjeta de identidad",
  "Cédula de ciudadanía",
  "Pasaporte",
  "Otro",
];

export default function StepStudent({ form, setForm }) {
  const student = form.student || {};

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      student: {
        ...prev.student,
        [field]: value,
      },
    }));
  };

  const calculatedAge = student.birthDate ? getAgeInBogotaFromISODate(student.birthDate) : "";

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Nombre completo *</label>
        <input
          className="field"
          value={student.fullName || ""}
          onChange={(e) => update("fullName", e.target.value)}
        />
      </div>

      <div className="grid-2">
        <div>
          <label className="label">Tipo documento *</label>
          <select
            className="field"
            value={student.documentType || ""}
            onChange={(e) => update("documentType", e.target.value)}
          >
            <option value="" disabled>
              Selecciona
            </option>
            {DOCUMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Número *</label>
          <input
            className="field"
            value={student.documentNumber || ""}
            onChange={(e) => update("documentNumber", e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </div>

      <div>
        <label className="label">Teléfono *</label>
        <input
          className="field"
          value={student.phone || ""}
          onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
        />
      </div>

      <div>
        <label className="label">Dirección *</label>
        <input
          className="field"
          value={student.address || ""}
          onChange={(e) => update("address", e.target.value)}
        />
      </div>

      <div className="grid-2">
        <div>
          <label className="label">Nacimiento *</label>
          <input
            type="date"
            className="field"
            value={student.birthDate || ""}
            onChange={(e) => update("birthDate", e.target.value)}
          />
        </div>
        <div>
          <label className="label">Edad</label>
          <input readOnly className="field field-muted" value={calculatedAge} />
        </div>
      </div>
    </div>
  );
}
