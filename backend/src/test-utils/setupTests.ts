// src/test-utils/setupTests.ts
import { newDb } from 'pg-mem';

// Create an in-memory database for testing
const db = newDb();

jest.mock('../db', () => {
  const mockClient = db.adapters.createPg().Client;
  return {
    __esModule: true,
    default: new mockClient(),
  };
});