import { useState, useEffect } from 'react';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import Modal from './components/Modal';
import { type Patient } from './types/patient';
import { getPatients } from './api/patientService';
import styles from './App.module.css';

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSuccess = () => {
    setIsFormOpen(false); // Close the modal
    fetchPatients(); // Refresh the patient list
  };

  return (
    <main>
      <header className={styles.header}>
        <h1>Patient Registry</h1>
        <button
          className={styles.addButton}
          onClick={() => setIsFormOpen(true)}
        >
          + Add Patient
        </button>
      </header>

      <PatientList patients={patients} isLoading={isLoading} error={error} />

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <PatientForm onSuccess={handleSuccess} />
      </Modal>
    </main>
  );
}

export default App;
