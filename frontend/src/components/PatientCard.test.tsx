import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import PatientCard from './PatientCard';
import { type Patient } from '../types/patient';

// Mock data
const mockPatient: Patient = {
  id: 1,
  full_name: 'John Doe',
  email: 'johndoe@gmail.com',
  phone_country_code: '+1',
  phone_number: '5551234567',
  document_photo_url: 'path/to/photo.jpg',
};

describe('PatientCard Component', () => {
  it('should render the patient name and photo initially', () => {
    // 1. Arrange
    render(<PatientCard patient={mockPatient} />);

    // 2. Assert
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText("John Doe's document")).toBeInTheDocument();

    expect(screen.queryByText(/johndoe@gmail.com/i)).not.toBeInTheDocument();
  });

  it('should expand to show more details when clicked', async () => {
    // 1. Arrange
    const user = userEvent.setup();
    render(<PatientCard patient={mockPatient} />);

    // 2. Act

    const card = screen.getByTestId('patient-card');
    await user.click(card);

    // 3. Assert
    expect(screen.getByText(/johndoe@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+1 5551234567/i)).toBeInTheDocument();
  });
});
