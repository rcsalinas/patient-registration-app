import { Request, Response } from 'express';
import pool from '../db';
import { patientSchema } from '../validation/patientSchema';
import { sendRegistrationConfirmation } from '../services/emailService';

/**
 * Handles the registration of a new patient.
 * It validates input, saves data to the database, and triggers a confirmation email.
 */
export const registerPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  // 1. Validate form fields from the request body using Joi schema
  const { error, value } = patientSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  // 2. Validate that the file was uploaded by multer
  if (!req.file) {
    res.status(400).json({ message: 'Document photo is required.' });
    return;
  }

  const { fullName, email, phoneCountryCode, phoneNumber } = value;
  const documentPhotoUrl = req.file.path;

  try {
    // 3. Check if a patient with the given email already exists
    const existingPatient = await pool.query(
      'SELECT * FROM patients WHERE email = $1',
      [email]
    );
    if (existingPatient.rows.length > 0) {
      res
        .status(409)
        .json({ message: 'A patient with this email already exists.' });
      return;
    }

    // 4. Insert the new patient record into the database
    const newPatientResult = await pool.query(
      `INSERT INTO patients (full_name, email, phone_country_code, phone_number, document_photo_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`, // RETURNING * sends the new row back
      [fullName, email, phoneCountryCode, phoneNumber, documentPhotoUrl]
    );

    const newPatient = newPatientResult.rows[0];

    // 5. Send confirmation email
    sendRegistrationConfirmation(newPatient.full_name, newPatient.email);

    // 6. Send a success response with the created patient data
    res.status(201).json({
      message: 'Patient registered successfully!',
      patient: newPatient,
    });
  } catch (err) {
    // Generic error handler for database issues or other unexpected errors
    console.error('Error in registerPatient controller:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
