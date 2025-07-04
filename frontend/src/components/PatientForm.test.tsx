import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PatientForm from './PatientForm';
import * as patientService from '../api/patientService';
import Swal from 'sweetalert2';

// Mock patientService
vi.mock('../api/patientService', () => ({
  createPatient: vi.fn(),
}));

// Mock SweetAlert2
vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(),
  },
}));

describe('PatientForm Component', () => {
  it('should allow a user to fill out and submit the form successfully', async () => {
    // 1. Arrange
    const user = userEvent.setup();
    const onSuccessMock = vi.fn(); // Mock the onSuccess callback

    // Mock a successful API response
    const createPatientSpy = vi
      .spyOn(patientService, 'createPatient')
      .mockResolvedValue({
        id: 10,
        full_name: 'Test User',
        email: 'testuser@gmail.com',
      });

    render(<PatientForm onSuccess={onSuccessMock} />);

    // 2. Act
    await user.type(screen.getByLabelText(/full name/i), 'Test User');
    await user.type(
      screen.getByLabelText(/email address/i),
      'testuser@gmail.com'
    );
    await user.type(screen.getByLabelText(/code/i), '+1');
    await user.type(screen.getByLabelText(/phone number/i), '1234567890');

    // Simulate a file upload
    const file = new File(['hello'], 'hello.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText(/drag 'n' drop/i);
    await user.upload(fileInput, file);

    // Click the submit button
    await user.click(screen.getByRole('button', { name: /register patient/i }));

    // 3. Assert
    // Wait for the submission to complete and check that our functions were called
    await waitFor(() => {
      // Check that the API function was called with the correct data
      expect(createPatientSpy).toHaveBeenCalledWith({
        fullName: 'Test User',
        email: 'testuser@gmail.com',
        phoneCountryCode: '+1',
        phoneNumber: '1234567890',
        documentPhoto: file,
      });

      // Check that the success callback was triggered
      expect(onSuccessMock).toHaveBeenCalledTimes(1);
    });

    // Check that the success modal was shown
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'success' })
    );
  });

  it('should show validation errors for invalid input', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<PatientForm onSuccess={() => {}} />);

    // Act: Click submit without filling out the form
    await user.click(screen.getByRole('button', { name: /register patient/i }));

    // Assert: Check that error messages appear
    expect(
      await screen.findByText('Full name is required.')
    ).toBeInTheDocument();
    expect(await screen.findByText('Email is required.')).toBeInTheDocument();
  });
});
