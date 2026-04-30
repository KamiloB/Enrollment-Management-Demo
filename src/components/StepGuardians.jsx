import { useEffect, useState } from "react";

export default function StepGuardians({ form, setForm }) {
  const guardians = form.guardians || {};
  const [sameAsPrimary, setSameAsPrimary] = useState(true);

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      guardians: {
        ...prev.guardians,
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    if (!guardians.secondaryName && !guardians.secondaryPhone) {
      setSameAsPrimary(true);
      update("secondaryName", guardians.primaryName || "");
      update("secondaryPhone", guardians.primaryPhone || "");
    }
  }, []);

  const handleCheckbox = () => {
    const nextValue = !sameAsPrimary;
    setSameAsPrimary(nextValue);

    if (nextValue) {
      update("secondaryName", guardians.primaryName || "");
      update("secondaryPhone", guardians.primaryPhone || "");
      return;
    }

    update("secondaryName", "");
    update("secondaryPhone", "");
  };

  return (
    <div className="space-y-4">
      <div className="card-sub">
        <h3>Padre / Madre</h3>
        <label className="label">Nombre *</label>
        <input
          className="field"
          value={guardians.primaryName || ""}
          onChange={(e) => update("primaryName", e.target.value)}
        />

        <label className="label">Teléfono *</label>
        <input
          className="field"
          value={guardians.primaryPhone || ""}
          onChange={(e) => update("primaryPhone", e.target.value.replace(/\D/g, ""))}
        />
      </div>

      <label className="inline-check">
        <input type="checkbox" checked={sameAsPrimary} onChange={handleCheckbox} />
        El acudiente es el mismo
      </label>

      {!sameAsPrimary && (
        <div className="card-sub">
          <h3>Acudiente</h3>
          <label className="label">Nombre</label>
          <input
            className="field"
            value={guardians.secondaryName || ""}
            onChange={(e) => update("secondaryName", e.target.value)}
          />

          <label className="label">Teléfono</label>
          <input
            className="field"
            value={guardians.secondaryPhone || ""}
            onChange={(e) => update("secondaryPhone", e.target.value.replace(/\D/g, ""))}
          />
        </div>
      )}
    </div>
  );
}
