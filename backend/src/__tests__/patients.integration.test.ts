// src/__tests__/patients.integration.test.ts
import request from 'supertest';
import app, { initializeDatabase } from '../index';
import { Request, Response, NextFunction } from 'express';
import { Readable } from 'stream';
import pool from '../db';

// --- Email Service Mock ---
jest.mock('../services/emailService', () => ({
  __esModule: true,
  sendRegistrationConfirmation: jest.fn().mockResolvedValue(undefined),
}));

// --- Multer uploader mock ---
jest.mock('../middleware/upload', () => ({
  __esModule: true,
  default: {
    single: () => (req: Request, res: Response, next: NextFunction) => {
      req.file = {
        path: 'public/uploads/mock-test-image.jpg',
        fieldname: 'documentPhoto',
        originalname: 'test-image.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: 'public/uploads/',
        filename: 'mock-test-image.jpg',
        size: 12345,
        stream: new Readable(),
        buffer: Buffer.from('mock file content'),
      };
      next();
    },
  },
}));

describe('POST /api/patients', () => {
  beforeEach(async () => {
    await initializeDatabase();
    await pool.query('TRUNCATE TABLE patients RESTART IDENTITY');
  });

  it('should register a new patient successfully', async () => {
    const response = await request(app).post('/api/patients').send({
      fullName: 'Mock User',
      email: 'mock.user@gmail.com',
      phoneCountryCode: '+1',
      phoneNumber: '1234567890',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Patient registered successfully!');
    expect(response.body.patient.email).toBe('mock.user@gmail.com');
  });

  it('should return a 409 conflict when registering with a duplicate email', async () => {
    await request(app).post('/api/patients').send({
      fullName: 'First User',
      email: 'duplicate.test@gmail.com',
      phoneCountryCode: '+1',
      phoneNumber: '1112223333',
    });

    const response = await request(app).post('/api/patients').send({
      fullName: 'Second User',
      email: 'duplicate.test@gmail.com',
      phoneCountryCode: '+44',
      phoneNumber: '4445556666',
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe(
      'A patient with this email already exists.'
    );
  });

  it('should fetch a list of all patients', async () => {
    await request(app).post('/api/patients').send({
      fullName: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      phoneCountryCode: '+44',
      phoneNumber: '123456789',
    });

    const response = await request(app).get('/api/patients');

    console.log('Response body:', response.body);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].email).toBe('jane.doe@gmail.com');
  });
});
