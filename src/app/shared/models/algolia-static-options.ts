import { environment } from "src/environments/environment";

export const MEDICAL_STATIC_OPTIONS = [
  {
    name: 'Medical condition not in the list',
    id: environment.algolia.disease.not_listed
  }
];
export const HOSPITAL_STATIC_OPTIONS = [
  {
    full_name: 'Hospital not in the list',
    id: environment.algolia.hospital.not_listed,
    type: 'notListed'
  },
  {
    full_name: 'Not admitted to any hospital',
    id: environment.algolia.hospital.not_admitted,
    type: 'notAdmitted'
  },
  {
    full_name: 'Does not require hospitalisation',
    id: environment.algolia.hospital.not_admitted,
    type: 'noHospitalisationRequired'
  },
];
