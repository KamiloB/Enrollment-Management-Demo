export default function StepConsent({ form, setForm }) {
  const consent = form.consent || {};

  const toggleAccept = () => {
    setForm((prev) => ({
      ...prev,
      consent: {
        accepted: !consent.accepted,
        acceptedAt: !consent.accepted ? new Date().toISOString() : null,
      },
    }));
  };

  return (
    <div className="space-y-4">
      <p className="hint">
        Por favor lea atentamente el reglamento interno y la exención de responsabilidad antes de
        continuar.
      </p>

      <div className="policy-box">
        <h3>Reglamento interno</h3>
        <p>
          El alumno se compromete a respetar las normas del club, asistir puntualmente a las clases
          y seguir las indicaciones del entrenador.
        </p>
        <h3>Exención de responsabilidad</h3>
        <p>
          El acudiente declara que el alumno se encuentra en condiciones físicas aptas para la
          práctica deportiva y participa de manera voluntaria.
        </p>
      </div>

      <label className="inline-check">
        <input type="checkbox" checked={!!consent.accepted} onChange={toggleAccept} />
        He leído el reglamento y acepto las condiciones.
      </label>

      {!consent.accepted && (
        <p className="error-text">Debes aceptar las condiciones para continuar.</p>
      )}
    </div>
  );
}
