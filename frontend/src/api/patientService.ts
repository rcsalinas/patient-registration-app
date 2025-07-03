import axios from 'axios';
import type { Patient } from '../types/patient';

const API_URL = 'http://localhost:3001/api/patients';

export const getPatients = async (): Promise<Patient[]> => {
  const response = await axios.get<Patient[]>(API_URL);
  return response.data;
};
