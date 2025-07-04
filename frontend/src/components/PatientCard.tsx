import { useState } from 'react';
import { type Patient } from '../types/patient';
import styles from './PatientCard.module.css';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={styles.card}
      onClick={() => setIsExpanded(!isExpanded)}
      data-testid="patient-card"
    >
      <div className={styles.cardHeader}>
        <img
          src={`/${patient.document_photo_url}`}
          alt={`${patient.full_name}'s document`}
          className={styles.documentPhoto}
        />
        <h3 className={styles.fullName}>{patient.full_name}</h3>
      </div>

      {isExpanded && (
        <div className={styles.cardBody}>
          <p>
            <strong>Email:</strong> {patient.email}
          </p>
          <p>
            <strong>Phone:</strong>{' '}
            {`${patient.phone_country_code} ${patient.phone_number}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
