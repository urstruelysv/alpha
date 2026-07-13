import { render, screen } from '@testing-library/react';
import WomensSection from './womens-section';

describe('WomensSection', () => {
  it('renders the heading and Shadnagar-focused copy', () => {
    render(<WomensSection />);
    expect(screen.getByText('Space Where You Belong')).toBeInTheDocument();
    expect(
      screen.getByText('Best Gym in Shadnagar for Women')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A respectful floor\. Coaches and staff who look out/i)
    ).toBeInTheDocument();
  });

  it('renders testimonials on safety, coaches, and community', () => {
    render(<WomensSection />);
    expect(screen.getByText('Keerthana Reddy')).toBeInTheDocument();
    expect(screen.getByText('Lavanya Goud')).toBeInTheDocument();
    expect(screen.getByText('Sruthi Yadav')).toBeInTheDocument();
    expect(screen.getByText(/I feel safe here/i)).toBeInTheDocument();
    expect(screen.getByText(/Best coaches in Shadnagar/i)).toBeInTheDocument();
    expect(screen.getByText(/The community keeps me coming back/i)).toBeInTheDocument();
  });


  it('renders the photo and conversion CTA', () => {
    render(<WomensSection />);
    expect(
      screen.getByRole('img', { name: /women training safely/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Start Your Journey' })
    ).toBeInTheDocument();
  });
});
