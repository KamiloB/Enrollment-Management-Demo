import { useMemo, useState } from "react";
import EnrollmentCard from "./components/EnrollmentCard";
import StepTraining from "./components/StepTraining";
import StepStudent from "./components/StepStudent";
import StepHealth from "./components/StepHealth";
import StepGuardians from "./components/StepGuardians";
import StepConsent from "./components/StepConsent";
import { initialEnrollments, mockTrainingPlaces, mockTrainers } from "./data/mockEnrollments";
import { getMissingEnrollmentFieldsByStep } from "./utils/validators";

const steps = ["Entrenamiento", "Alumno", "Salud", "Acudientes", "Reglamento"];

const baseForm = {
  training: {},
  student: {},
  health: {},
  guardians: {},
  consent: {},
};

function SocialIcon({ href, label, children }) {
  return (
    <a
      className="social-link"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
    >
      {children}
    </a>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(baseForm);
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [message, setMessage] = useState("");

  const isLastStep = step === steps.length - 1;
  const missingFields = getMissingEnrollmentFieldsByStep(step, form);

  const placesMap = useMemo(
    () => new Map(mockTrainingPlaces.map((item) => [item.id, item.name])),
    []
  );
  const trainersMap = useMemo(
    () => new Map(mockTrainers.map((item) => [item.id, item.fullName])),
    []
  );

  const clearMessage = () => setTimeout(() => setMessage(""), 2200);

  const handleStepAction = () => {
    if (missingFields.length > 0) {
      setMessage(`Te falta completar: ${missingFields.join(", ")}.`);
      clearMessage();
      return;
    }

    if (!isLastStep) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
      return;
    }

    const newEnrollment = {
      id: `enr-${crypto.randomUUID()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      ...form,
    };

    setEnrollments((prev) => [newEnrollment, ...prev]);
    setForm(baseForm);
    setStep(0);
    setMessage("Inscripción enviada. Quedó en estado pendiente.");
    clearMessage();
  };

  const updateEnrollmentStatus = (id, status) => {
    setEnrollments((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    setMessage(status === "approved" ? "Inscripción aprobada." : "Inscripción rechazada.");
    clearMessage();
  };

  return (
    <main className="app-shell-wrap">
      <header className="hero">
        <p className="eyebrow">Demo interactivo</p>
        <h1>Flujo de inscripción deportiva</h1>
        <p className="hero-description">
          Simula una inscripción pública paso a paso y gestiona su aprobación desde el panel
          interno.
        </p>

        <div className="social-links" aria-label="Redes y portafolio">
          <SocialIcon href="https://www.instagram.com/kamilo_blandon" label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
          </SocialIcon>

          <SocialIcon href="https://github.com/KamiloB" label="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.17-1.11-1.48-1.11-1.48-.91-.61.07-.59.07-.59 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.63-1.37-2.22-.25-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.47.11 2.73.64.72 1.03 1.63 1.03 2.75 0 3.95-2.35 4.83-4.59 5.08.36.32.68.95.68 1.93v2.86c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
            </svg>
          </SocialIcon>

          <SocialIcon href="https://kamilob.dev" label="Portafolio web">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7.93 9h-3.07a15.6 15.6 0 0 0-1.37-5.02A8.03 8.03 0 0 1 19.93 11zM12 4c1.37 0 2.95 2.2 3.57 7H8.43C9.05 6.2 10.63 4 12 4zM4.07 13h3.07a15.6 15.6 0 0 0 1.37 5.02A8.03 8.03 0 0 1 4.07 13zm3.07-2H4.07a8.03 8.03 0 0 1 4.44-5.02A15.6 15.6 0 0 0 7.14 11zm4.86 9c-1.37 0-2.95-2.2-3.57-7h7.14c-.62 4.8-2.2 7-3.57 7zm3.49-1.98A15.6 15.6 0 0 0 16.86 13h3.07a8.03 8.03 0 0 1-4.44 5.02z" />
            </svg>
          </SocialIcon>
        </div>
      </header>

      <div className="app-shell">
        <section className="panel">
          <h2>Inscripcion Publica</h2>
          <p className="subtitle">
            Paso {step + 1} de {steps.length} — {steps[step]}
          </p>

          {message && <p className="flash">{message}</p>}

          {step === 0 && (
            <StepTraining
              form={form}
              setForm={setForm}
              places={mockTrainingPlaces}
              trainers={mockTrainers}
            />
          )}
          {step === 1 && <StepStudent form={form} setForm={setForm} />}
          {step === 2 && <StepHealth form={form} setForm={setForm} />}
          {step === 3 && <StepGuardians form={form} setForm={setForm} />}
          {step === 4 && <StepConsent form={form} setForm={setForm} />}

          <div className="form-actions">
            {step > 0 && (
              <button
                className="btn btn-danger"
                onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
              >
                Atrás
              </button>
            )}
            <button className="btn btn-primary" onClick={handleStepAction}>
              {isLastStep ? "Enviar inscripción" : "Continuar"}
            </button>
          </div>
        </section>

        <section className="panel">
          <h2>Panel De Inscripciones</h2>
          <h3>Total registradas: {enrollments.length}.</h3>
          <p className="subtitle">Gestiona aprobar/rechazar pendientes.</p>

          <div className="cards">
            {enrollments.map((enrollment) => (
              <EnrollmentCard
                key={enrollment.id}
                enrollment={enrollment}
                placeName={placesMap.get(enrollment.training?.placeId) || "—"}
                trainerName={trainersMap.get(enrollment.training?.trainerId) || "—"}
                onApprove={(id) => updateEnrollmentStatus(id, "approved")}
                onReject={(id) => updateEnrollmentStatus(id, "rejected")}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
