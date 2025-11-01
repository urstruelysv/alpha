import { render, screen, fireEvent } from '@testing-library/react';
import FAQSection from './faq-section';

describe('FAQSection', () => {
  it('renders the section title and subtitle', () => {
    render(<FAQSection />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText(/Find answers to common questions about Alpha Fitness/i)).toBeInTheDocument();
  });

  it('renders all FAQ items, with the first one open by default', () => {
    render(<FAQSection />);
    // There are 8 FAQs in the component
    const questions = screen.getAllByRole('button');
    expect(questions.length).toBe(8);
    
    // Check if the first question is rendered
    expect(screen.getByText('What are your membership options?')).toBeInTheDocument();
    
    // Check that the first answer is visible by default
    expect(screen.getByText(/We offer flexible membership plans/i)).toBeVisible();
  });

  it('opens an answer when a closed question is clicked', () => {
    render(<FAQSection />);
    const secondQuestion = screen.getByText('Do you offer a free trial?');
    // The answer should not be in the document initially for closed questions
    expect(screen.queryByText(/Yes! We offer a free trial period/i)).not.toBeInTheDocument();

    // Click the second question to open it
    fireEvent.click(secondQuestion);

    // Now the answer should be visible
    expect(screen.getByText(/Yes! We offer a free trial period/i)).toBeVisible();
  });

  it('closes an answer when an open question is clicked again', () => {
    render(<FAQSection />);
    const firstQuestion = screen.getByText('What are your membership options?');
    
    // The first answer is visible by default
    expect(screen.getByText(/We offer flexible membership plans/i)).toBeVisible();

    // Click the first question to close it
    fireEvent.click(firstQuestion);

    // Now the answer should not be in the document
    expect(screen.queryByText(/We offer flexible membership plans/i)).not.toBeInTheDocument();
  });

  it('closes the previously open question when a new one is opened', () => {
    render(<FAQSection />);
    const firstQuestionAnswer = screen.getByText(/We offer flexible membership plans/i);
    expect(firstQuestionAnswer).toBeVisible(); // First question is open by default

    const secondQuestion = screen.getByText('Do you offer a free trial?');
    fireEvent.click(secondQuestion);

    // The second answer should now be visible
    expect(screen.getByText(/Yes! We offer a free trial period/i)).toBeVisible();
    // And the first answer should no longer be in the document
    expect(screen.queryByText(/We offer flexible membership plans/i)).not.toBeInTheDocument();
  });
});
