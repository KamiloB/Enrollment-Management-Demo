import { getStudentAge } from "../utils/studentAge";

export default function EnrollmentCard({
  enrollment,
  placeName,
  trainerName,
  onApprove,
  onReject,
}) {
  return (
    <article className="enrollment-card">
      <div className="card-head">
        <div>
          <h3>{enrollment.student?.fullName}</h3>
          <p>{new Date(enrollment.createdAt).toLocaleDateString()}</p>
        </div>
        <StatusBadge status={enrollment.status} />
      </div>

      <div className="card-grid">
        <Field label="Edad" value={getStudentAge(enrollment.student) ?? "—"} />
        <Field label="Documento" value={enrollment.student?.documentNumber || "—"} />
        <Field label="Sede" value={placeName} />
        <Field label="Entrenador" value={trainerName} />
      </div>

      {enrollment.status === "pending" && (
        <div className="card-actions">
          <button onClick={() => onApprove(enrollment.id)} className="btn btn-primary">
            Aprobar
          </button>
          <button onClick={() => onReject(enrollment.id)} className="btn btn-danger">
            Rechazar
          </button>
        </div>
      )}
    </article>
  );
}

function Field({ label, value }) {
  return (
    <p>
      <span>{label}:</span> {value}
    </p>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: "badge badge-pending",
    approved: "badge badge-approved",
    rejected: "badge badge-rejected",
  };

  return (
    <span className={map[status] || "badge"}>
      {status === "pending" ? "Pendiente" : status === "approved" ? "Aprobada" : "Rechazada"}
    </span>
  );
}
