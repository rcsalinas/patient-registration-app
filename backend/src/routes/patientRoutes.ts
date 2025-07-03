// src/routes/patientRoutes.ts
import { Router } from 'express';
import { registerPatient } from '../controllers/patientController';
import upload from '../middleware/upload';

const router = Router();

// Define the POST route for creating a patient.
// The `upload.single()` middleware processes the file upload before it hits the controller.
router.post('/', upload.single('documentPhoto'), registerPatient);

// You can add more routes here, e.g.:
// router.get('/', getAllPatients);

export default router;
