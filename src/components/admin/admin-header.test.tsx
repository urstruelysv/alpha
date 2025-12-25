import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminHeader from './admin-header';

describe('AdminHeader', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // Mock localStorage
    jest.spyOn(window.localStorage.__proto__, 'removeItem');
  });

  afterEach(() => {
    window.location = originalLocation;
    jest.restoreAllMocks();
  });

  it('renders the header with logo and admin title', () => {
    render(<AdminHeader />);
    expect(screen.getByText('AF')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('renders settings and logout buttons', () => {
    render(<AdminHeader />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2); // Settings and Logout
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('removes admin token and redirects to login page on logout', async () => {
    // Mock window.location.href
    delete window.location;
    const locationMock = { href: '' };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: locationMock,
    });

    render(<AdminHeader />);
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    
    fireEvent.click(logoutButton);
    
    // Wait for the component to update and trigger the redirect
    await waitFor(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('admin-token');
    });
    
    await waitFor(() => {
      expect(window.location.href).toBe('/admin/login');
    });
  });
});