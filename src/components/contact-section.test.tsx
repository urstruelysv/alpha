import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactSection from './contact-section';
import '@testing-library/jest-dom';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('ContactSection', () => {
  it('renders the contact form and contact information', () => {
    render(<ContactSection />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields on submit', async () => {
    render(<ContactSection />);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Phone number is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Message is required')).toBeInTheDocument();
  });

  it('shows validation errors for invalid phone and email formats', async () => {
    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Please enter a valid 10-digit phone number')).toBeInTheDocument();
    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('submits the form successfully with valid data', async () => {
    render(<ContactSection />);
    
    const nameInput = screen.getByLabelText('Full Name');
    const phoneInput = screen.getByLabelText('Phone Number');
    const emailInput = screen.getByLabelText('Email Address');
    const messageInput = screen.getByLabelText('Message');
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'This is a test message.' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/leads', expect.any(Object));
    });
    
    const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(fetchCall[1].body);
    expect(body.name).toBe('John Doe');

    expect(await screen.findByText(/Thank you! We'll get back to you soon./i)).toBeInTheDocument();

    expect(nameInput).toHaveValue('');
  });
});