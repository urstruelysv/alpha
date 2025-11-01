import { render, screen } from '@testing-library/react';
import PackagesTab from './packages-tab';

describe('PackagesTab', () => {
  it('renders the manage packages title and add button', () => {
    render(<PackagesTab />);
    expect(screen.getByText('Manage Packages')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Package/i })).toBeInTheDocument();
  });

  it('renders the existing packages with their details', () => {
    render(<PackagesTab />);
    // There are 2 mock packages
    expect(screen.getByText('1 Month')).toBeInTheDocument();
    expect(screen.getByText('₹2,999')).toBeInTheDocument();
    expect(screen.getByText('Full gym access')).toBeInTheDocument();

    expect(screen.getByText('3 Months')).toBeInTheDocument();
    expect(screen.getByText('₹7,999')).toBeInTheDocument();
    expect(screen.getByText('2 free sessions')).toBeInTheDocument();
  });

  it('renders edit and delete buttons for each package', () => {
    render(<PackagesTab />);
    // For 2 packages, there should be 2 edit and 2 delete buttons
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(editButtons.length).toBe(2);
    expect(deleteButtons.length).toBe(2);
  });
});
