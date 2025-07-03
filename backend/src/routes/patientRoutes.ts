import { Router } from 'express';
import { registerPatient } from '../controllers/patientController';
import upload from '../middleware/upload';

const router = Router();

// POST route for creating a patient.
// The `upload.single()` middleware processes the file upload before it hits the controller.
router.post('/', upload.single('documentPhoto'), registerPatient);

export default router;
