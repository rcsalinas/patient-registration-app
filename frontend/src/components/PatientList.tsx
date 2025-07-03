import { type Patient } from '../types/patient';
import PatientCard from './PatientCard';
import styles from './PatientList.module.css';

interface PatientListProps {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
}

const PatientList = ({ patients, isLoading, error }: PatientListProps) => {
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
