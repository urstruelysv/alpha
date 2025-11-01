import { render, screen, fireEvent } from '@testing-library/react';
import LeadsTab from './leads-tab';

describe('LeadsTab', () => {
  it('renders the leads table with mock data', () => {
    render(<LeadsTab />);
    expect(screen.getByText('Leads (3)')).toBeInTheDocument();
    // Check for table headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    // Check for a lead's name
    expect(screen.getByText('Rajesh Kumar')).toBeInTheDocument();
  });

  it('deletes a lead when the delete button is clicked', () => {
    render(<LeadsTab />);
    expect(screen.getByText('Leads (3)')).toBeInTheDocument();
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    
    // Click the delete button for the first lead
    fireEvent.click(deleteButtons[0]);

    // The lead count should decrease and the lead should be gone
    expect(screen.getByText('Leads (2)')).toBeInTheDocument();
    expect(screen.queryByText('Rajesh Kumar')).not.toBeInTheDocument();
  });

  it('can trigger the CSV export', () => {
    // Mock the necessary window methods for CSV download
    window.URL.createObjectURL = jest.fn();
    window.HTMLAnchorElement.prototype.click = jest.fn();

    render(<LeadsTab />);
    const exportButton = screen.getByRole('button', { name: /Export CSV/i });
    fireEvent.click(exportButton);

    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(window.HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });
});
