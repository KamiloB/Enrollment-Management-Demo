const BLOOD_TYPES = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

export default function StepHealth({ form, setForm }) {
  const health = form.health || {};

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      health: {
        ...prev.health,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Patologías diagnosticadas</label>
        <textarea
          className="field"
          rows={4}
          placeholder="Ej: asma, alergias, etc."
          value={health.medicalConditions || ""}
          onChange={(e) => update("medicalConditions", e.target.value)}
        />
      </div>

      <div>
        <label className="label">Tipo de sangre (RH) *</label>
        <select
          className="field"
          value={health.bloodType || ""}
          onChange={(e) => update("bloodType", e.target.value)}
        >
          <option value="" disabled>
            Selecciona tipo de sangre
          </option>
          {BLOOD_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">EPS *</label>
        <input
          className="field"
          value={health.eps || ""}
          onChange={(e) => update("eps", e.target.value)}
        />
      </div>
    </div>
  );
}
