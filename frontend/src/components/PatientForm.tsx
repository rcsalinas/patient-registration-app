import { useFormik } from 'formik';
import { patientFormSchema } from '../validation/patientFormSchema';
import DragAndDropInput from './DragAndDropInput';
import styles from './PatientForm.module.css';

const PatientForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneCountryCode: '',
      phoneNumber: '',
      documentPhoto: null,
    },
    validationSchema: patientFormSchema,
    onSubmit: (values) => {
      // We will implement the API call here in the next step
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <h2>New Patient Registration</h2>

      <div className={styles.formGroup}>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          {...formik.getFieldProps('fullName')}
          className={
            formik.touched.fullName && formik.errors.fullName
              ? styles.inputError
              : ''
          }
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <div className={styles.errorMessage}>{formik.errors.fullName}</div>
        ) : null}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className={
            formik.touched.email && formik.errors.email ? styles.inputError : ''
          }
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.errorMessage}>{formik.errors.email}</div>
        ) : null}
      </div>

      <div className={`${styles.formGroup} ${styles.phoneGroup}`}>
        <div>
          <label htmlFor="phoneCountryCode">Code</label>
          <input
            id="phoneCountryCode"
            type="text"
            placeholder="+504"
            {...formik.getFieldProps('phoneCountryCode')}
            className={
              formik.touched.phoneCountryCode && formik.errors.phoneCountryCode
                ? styles.inputError
                : ''
            }
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="99887766"
            {...formik.getFieldProps('phoneNumber')}
            className={
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? styles.inputError
                : ''
            }
          />
        </div>
      </div>
      {(formik.touched.phoneCountryCode && formik.errors.phoneCountryCode) ||
      (formik.touched.phoneNumber && formik.errors.phoneNumber) ? (
        <div className={styles.errorMessage}>
          {formik.errors.phoneCountryCode || formik.errors.phoneNumber}
        </div>
      ) : null}

      <div className={styles.formGroup}>
        <label>Document Photo</label>
        <DragAndDropInput
          onFileSelect={(file) => formik.setFieldValue('documentPhoto', file)}
          error={
            formik.touched.documentPhoto && formik.errors.documentPhoto
              ? (formik.errors.documentPhoto as string)
              : undefined
          }
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Register Patient
      </button>
    </form>
  );
};

export default PatientForm;
