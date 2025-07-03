// src/__tests__/validation.test.ts
import { patientSchema } from '../validation/patientSchema';

describe('Patient Validation Schema', () => {

  // Test for a valid patient payload
  it('should validate a correct patient payload', () => {
    const validPatient = {
      fullName: 'Jane Doe',
      email: 'janedoe@gmail.com',
      phoneCountryCode: '+44',
      phoneNumber: '7700900123',
    };
    const { error } = patientSchema.validate(validPatient);
    expect(error).toBeUndefined();
  });

  // Test for an invalid email address
  it('should return an error for an email not from gmail.com', () => {
    const invalidPatient = {
      fullName: 'John Smith',
      email: 'johnsmith@yahoo.com',
      phoneCountryCode: '+1',
      phoneNumber: '5551234567',
    };
    const { error } = patientSchema.validate(invalidPatient);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Email address must be a @gmail.com address.');
  });
  
  // Test for a full name with numbers
  it('should return an error if full name contains numbers', () => {
    const invalidPatient = {
      fullName: 'Agent 007',
      email: 'jamesbond@gmail.com',
      phoneCountryCode: '+44',
      phoneNumber: '7700900007',
    };
    const { error } = patientSchema.validate(invalidPatient);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('"Full name" can only contain letters and spaces.');
  });
});