import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactSection from './contact-section';

describe('ContactSection', () => {
  it('renders the contact form and contact information', () => {
    render(<ContactSection />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    // Form fields
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
    // Contact info
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields on submit', async () => {
    render(<ContactSection />);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  it('shows validation errors for invalid phone and email formats', async () => {
    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid 10-digit phone number')).toBeInTheDocument();
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('submits the form successfully with valid data and shows success message', async () => {
    // Mock console.log to check form data
    const consoleSpy = jest.spyOn(console, 'log');
    render(<ContactSection />);
    
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'This is a test message.' } });

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    // Check for submitting state
    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument();
    });

    // Check for success message and form data logging
    await waitFor(() => {
      expect(screen.getByText(/Thank you! We'll get back to you soon./i)).toBeInTheDocument();
      expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', expect.any(Object));
    });

    // Check if the form fields are cleared after successful submission
    expect(screen.getByLabelText('Full Name')).toHaveValue('');
    
    consoleSpy.mockRestore();
  });
});
