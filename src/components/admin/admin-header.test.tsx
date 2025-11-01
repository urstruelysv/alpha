import { render, screen, fireEvent } from '@testing-library/react';
import AdminHeader from './admin-header';

describe('AdminHeader', () => {
  // Mock window.location for testing navigation
  const originalLocation = window.location;
  beforeAll(() => {
    delete window.location;
    window.location = { ...originalLocation, href: '' };
  });
  afterAll(() => {
    window.location = originalLocation;
  });

  it('renders the header with logo and admin title', () => {
    render(<AdminHeader />);
    expect(screen.getByText('AF')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('renders settings and logout buttons', () => {
    render(<AdminHeader />);
    // The settings button is just an icon, so we find it by its role
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('removes admin token and redirects to login page on logout', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    render(<AdminHeader />);
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    
    fireEvent.click(logoutButton);
    
    // Verify that the token is removed from localStorage
    expect(removeItemSpy).toHaveBeenCalledWith('admin-token');
    // Verify that the page redirects
    expect(window.location.href).toBe('/admin/login');
    
    removeItemSpy.mockRestore();
  });
});
