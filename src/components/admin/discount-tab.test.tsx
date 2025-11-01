import { render, screen, fireEvent } from '@testing-library/react';
import DiscountTab from './discount-tab';

describe('DiscountTab', () => {
  beforeAll(() => {
    // Mock window.alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('renders the discount form with initial values', () => {
    render(<DiscountTab />);
    expect(screen.getByText('Edit Discount Timer')).toBeInTheDocument();
    expect(screen.getByLabelText('Discount Percentage')).toHaveValue(50);
    expect(screen.getByLabelText('days')).toHaveValue(2);
    expect(screen.getByLabelText('hours')).toHaveValue(14);
    expect(screen.getByLabelText('minutes')).toHaveValue(32);
  });

  it('updates the state when input values are changed', () => {
    render(<DiscountTab />);
    const percentageInput = screen.getByLabelText('Discount Percentage');
    fireEvent.change(percentageInput, { target: { value: '60' } });
    expect(percentageInput).toHaveValue(60);

    const daysInput = screen.getByLabelText('days');
    fireEvent.change(daysInput, { target: { value: '3' } });
    expect(daysInput).toHaveValue(3);
  });

  it('calls handleSave and shows an alert on save button click', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<DiscountTab />);
    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(saveButton);

    // Check that the updated values are logged
    expect(consoleSpy).toHaveBeenCalledWith('Discount updated:', expect.any(Object));
    // Check that the alert is shown
    expect(window.alert).toHaveBeenCalledWith('Discount timer updated successfully!');

    consoleSpy.mockRestore();
  });
});
