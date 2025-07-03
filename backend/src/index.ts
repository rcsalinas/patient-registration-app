import express, { Request, Response } from 'express';
import pool from './db';
import patientRoutes from './routes/patientRoutes'; 
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
dotenv.config();
app.use(express.json());
// Serve static files from the 'public' directory (for accessing uploaded images)
app.use('/public', express.static('public'));

// --- Routes ---
app.use('/api/patients', patientRoutes); // Use the patient routes for this path

// A simple health-check route
app.get('/health', (req: Request, res: Response) => {
    res.send('Backend server is healthy and running!');
});

// Function to create the patients table if it doesn't exist
const initializeDatabase = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone_country_code VARCHAR(10) NOT NULL,
        phone_number VARCHAR(50) NOT NULL,
        document_photo_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `;
    try {
        await pool.query(createTableQuery);
        console.log('Table "patients" is ready.');
    } catch (error) {
        console.error('Error creating patients table:', error);
        process.exit(1); // Exit if DB initialization fails
    }
};

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    initializeDatabase();
});