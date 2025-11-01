import { render, screen } from '@testing-library/react';
import SocialIcons from './social-icons';

describe('SocialIcons', () => {
  it('renders all social media icons with correct labels', () => {
    render(<SocialIcons />);
    expect(screen.getByLabelText(/Follow us on Facebook/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Follow us on Instagram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Follow us on Twitter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Follow us on Youtube/i)).toBeInTheDocument();
  });

  it('renders links with correct href attribute', () => {
    render(<SocialIcons />);
    const links = screen.getAllByRole('link');
    // There are 4 social links
    expect(links.length).toBe(4);
    // All links have href='#'
    links.forEach(link => {
      expect(link).toHaveAttribute('href', '#');
    });
  });
});
