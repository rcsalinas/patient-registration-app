import { useFormik } from 'formik';
import { useRef } from 'react';
import { patientFormSchema } from '../validation/patientFormSchema';
import { createPatient, type PatientFormValues } from '../api/patientService';
import DragAndDropInput, { type DragAndDropInputRef } from './DragAndDropInput';
import styles from './PatientForm.module.css';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

const PatientForm = () => {
  const dragAndDropRef = useRef<DragAndDropInputRef>(null);

  const formik = useFormik<PatientFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      phoneCountryCode: '',
      phoneNumber: '',
      documentPhoto: null,
    },
    validationSchema: patientFormSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        await createPatient(values);

        Swal.fire({
          title: 'Success!',
          text: 'Patient registered successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });

        resetForm();
        dragAndDropRef.current?.reset();
      } catch (error) {
        let errorMessage = 'An unexpected error occurred.';
        if (error instanceof AxiosError && error.response) {
          errorMessage =
            error.response.data.message || 'Failed to register patient.';
        }

        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
        });

        console.error('Failed to create patient:', error);
      } finally {
        setSubmitting(false);
      }
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
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
            name="phoneCountryCode"
            value={formik.values.phoneCountryCode}
            onChange={(e) => {
              const value = e.target.value;
              const sanitized = '+' + value.substring(1).replace(/[^0-9]/g, '');
              formik.setFieldValue('phoneCountryCode', sanitized);
            }}
            onBlur={formik.handleBlur}
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
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={(e) => {
              const sanitized = e.target.value.replace(/[^0-9]/g, '');
              formik.setFieldValue('phoneNumber', sanitized);
            }}
            onBlur={formik.handleBlur}
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
          ref={dragAndDropRef}
          onFileSelect={(file) => formik.setFieldValue('documentPhoto', file)}
          error={
            formik.touched.documentPhoto && formik.errors.documentPhoto
              ? (formik.errors.documentPhoto as string)
              : undefined
          }
        />
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Registering...' : 'Register Patient'}
      </button>
    </form>
  );
};

export default PatientForm;
