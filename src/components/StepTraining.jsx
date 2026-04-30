import { useMemo } from "react";

export default function StepTraining({ form, setForm, places, trainers }) {
  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      training: {
        ...prev.training,
        [field]: value,
      },
    }));
  };

  const placesWithActiveTrainers = useMemo(() => {
    const trainerIds = new Set(trainers.map((trainer) => trainer.id));

    return places.filter((place) => {
      if (place.visibleInForm === false) return false;
      const placeTrainerIds = Array.isArray(place.trainerIds) ? place.trainerIds : [];
      return placeTrainerIds.some((id) => trainerIds.has(id));
    });
  }, [places, trainers]);

  const selectedPlace = useMemo(
    () => placesWithActiveTrainers.find((place) => place.id === form.training?.placeId),
    [placesWithActiveTrainers, form.training?.placeId]
  );

  const availableTrainers = useMemo(() => {
    if (!selectedPlace) return [];
    const selectedIds = Array.isArray(selectedPlace.trainerIds) ? selectedPlace.trainerIds : [];
    return trainers.filter((trainer) => selectedIds.includes(trainer.id));
  }, [selectedPlace, trainers]);

  return (
    <div className="space-y-6">
      <div>
        <label className="label">Sede *</label>
        <select
          className="field"
          value={form.training?.placeId || ""}
          onChange={(e) => {
            update("placeId", e.target.value);
            update("trainerId", "");
          }}
        >
          <option value="" disabled>
            Selecciona una sede
          </option>
          {placesWithActiveTrainers.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Entrenador *</label>
        <select
          className="field"
          value={form.training?.trainerId || ""}
          onChange={(e) => update("trainerId", e.target.value)}
          disabled={!selectedPlace}
        >
          <option value="" disabled>
            {selectedPlace ? "Selecciona un entrenador" : "Selecciona una sede primero"}
          </option>
          {availableTrainers.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.fullName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
