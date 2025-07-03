import { useEffect, useState } from 'react';
import type { Patient } from '../types/patient';
import { getPatients } from '../api/patientService';
import PatientCard from './PatientCard';
import styles from './PatientList.module.css';

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        const data = await getPatients();
        setPatients(data);
      } catch (err) {
        setError('Failed to fetch patients. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (isLoading) {
    return <div className={styles.stateMessage}>Loading patients...</div>;
  }

  if (error) {
    return <div className={styles.stateMessage}>{error}</div>;
  }

  return (
    <div className={styles.list}>
      {patients.length === 0 ? (
        <div className={styles.stateMessage}>
          No patients found. Click "Add Patient" to get started!
        </div>
      ) : (
        patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))
      )}
    </div>
  );
};

export default PatientList;
