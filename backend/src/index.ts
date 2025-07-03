// src/index.ts
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import pool from './db';
import patientRoutes from './routes/patientRoutes';

const app = express();

// --- Middleware ---
app.use(express.json());
// Serve static files from the 'public' directory (for accessing uploaded images)
app.use('/public', express.static('public'));


// --- Routes ---
app.use('/api/patients', patientRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.send('Backend server is healthy and running!');
});


export const initializeDatabase = async () => {
    const createTableQuery = `
    CREATE TABLE patients (
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
    } catch (error) {
        // test handles the error.
    }
};


// Start the server only if not in a test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    initializeDatabase();
  });
}

export default app;