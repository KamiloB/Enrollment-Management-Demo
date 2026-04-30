const now = Date.now();

export const initialEnrollments = [
  {
    id: "enr-001",
    createdAt: new Date(now - 1000 * 60 * 60 * 30).toISOString(),
    status: "pending",
    student: {
      fullName: "Mateo Rojas",
      birthDate: "2013-04-12",
      documentNumber: "10324567",
      address: "Cra 19 #120-42",
      phone: "3007781122",
    },
    health: {
      bloodType: "O+",
      eps: "Sura",
      medicalConditions: "Asma leve",
    },
    guardians: {
      primaryName: "Laura Rojas",
      primaryPhone: "3009987766",
      secondaryName: "Daniel Rojas",
      secondaryPhone: "3015560011",
    },
    training: {
      placeId: "place-1",
      trainerId: "trainer-2",
    },
    consent: {
      accepted: true,
      acceptedAt: new Date(now - 1000 * 60 * 60 * 31).toISOString(),
    },
  },
  {
    id: "enr-002",
    createdAt: new Date(now - 1000 * 60 * 60 * 48).toISOString(),
    status: "approved",
    student: {
      fullName: "Valentina Peña",
      birthDate: "2011-11-03",
      documentNumber: "10111999",
      address: "Cl 85 #14-67",
      phone: "3021102200",
    },
    health: {
      bloodType: "A+",
      eps: "Sanitas",
      medicalConditions: "",
    },
    guardians: {
      primaryName: "Paola Peña",
      primaryPhone: "3119876543",
      secondaryName: "Paola Peña",
      secondaryPhone: "3119876543",
    },
    training: {
      placeId: "place-2",
      trainerId: "trainer-1",
    },
    consent: {
      accepted: true,
      acceptedAt: new Date(now - 1000 * 60 * 60 * 49).toISOString(),
    },
  },
  {
    id: "enr-003",
    createdAt: new Date(now - 1000 * 60 * 60 * 72).toISOString(),
    status: "rejected",
    student: {
      fullName: "Samuel Ospina",
      birthDate: "2014-08-19",
      documentNumber: "10988776",
      address: "Cl 134 #52-31",
      phone: "3154409922",
    },
    health: {
      bloodType: "B+",
      eps: "Compensar",
      medicalConditions: "Alergia al polvo",
    },
    guardians: {
      primaryName: "Carolina Ospina",
      primaryPhone: "3004455667",
      secondaryName: "Carolina Ospina",
      secondaryPhone: "3004455667",
    },
    training: {
      placeId: "place-1",
      trainerId: "trainer-3",
    },
    consent: {
      accepted: true,
      acceptedAt: new Date(now - 1000 * 60 * 60 * 74).toISOString(),
    },
  },
];

export const mockTrainingPlaces = [
  {
    id: "place-1",
    name: "Sede Norte",
    trainerIds: ["trainer-2", "trainer-3"],
    visibleInForm: true,
  },
  { id: "place-2", name: "Sede Centro", trainerIds: ["trainer-1"], visibleInForm: true },
];

export const mockTrainers = [
  { id: "trainer-1", fullName: "Camila Torres" },
  { id: "trainer-2", fullName: "Julián Vélez" },
  { id: "trainer-3", fullName: "Andrés Patiño" },
];
