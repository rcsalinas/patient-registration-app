import axios from 'axios';
import type { Patient } from '../types/patient';

const API_URL = '/api/patients';

export interface PatientFormValues {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  documentPhoto: File | null;
}

export const getPatients = async (): Promise<Patient[]> => {
  const response = await axios.get<Patient[]>(API_URL);
  return response.data;
};

export const createPatient = async (patientData: PatientFormValues) => {
  const formData = new FormData();

  formData.append('fullName', patientData.fullName);
  formData.append('email', patientData.email);
  formData.append('phoneCountryCode', patientData.phoneCountryCode);
  formData.append('phoneNumber', patientData.phoneNumber);

  if (patientData.documentPhoto) {
    formData.append('documentPhoto', patientData.documentPhoto);
  }

  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
