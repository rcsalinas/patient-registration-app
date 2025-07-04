import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PatientList from './PatientList';
import { type Patient } from '../types/patient';

describe('PatientList Component', () => {
  it('should display a loading message when isLoading is true', () => {
    render(<PatientList patients={[]} isLoading={true} error={null} />);
    expect(screen.getByText(/loading patients/i)).toBeInTheDocument();
  });

  it('should display an error message when an error is provided', () => {
    render(
      <PatientList
        patients={[]}
        isLoading={false}
        error="Failed to load data."
      />
    );
    expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
  });

  it('should display an empty message when there are no patients', () => {
    render(<PatientList patients={[]} isLoading={false} error={null} />);
    expect(screen.getByText(/no patients found/i)).toBeInTheDocument();
  });

  it('should render a list of patient cards when data is provided', () => {
    const mockPatients: Patient[] = [
      {
        id: 1,
        full_name: 'Alice',
        email: 'a@g.com',
        phone_country_code: '+1',
        phone_number: '111',
        document_photo_url: 'url1',
      },
      {
        id: 2,
        full_name: 'Bob',
        email: 'b@g.com',
        phone_country_code: '+1',
        phone_number: '222',
        document_photo_url: 'url2',
      },
    ];

    render(
      <PatientList patients={mockPatients} isLoading={false} error={null} />
    );

    // Check that both patient names are rendered
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});
