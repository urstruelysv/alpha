import { render, screen } from '@testing-library/react';
import AnimatedCard from './animated-card';

// Mock the IntersectionObserver API for testing in a JSDOM environment
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();
window.IntersectionObserver = jest.fn(() => ({
  observe: mockObserve,
  disconnect: mockDisconnect,
  unobserve: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
  takeRecords: () => [],
}));

describe('AnimatedCard', () => {
  beforeEach(() => {
    // Clear mocks before each test
    mockObserve.mockClear();
    mockDisconnect.mockClear();
  });

  it('renders its children correctly', () => {
    render(<AnimatedCard><div>Test Child Content</div></AnimatedCard>);
    expect(screen.getByText('Test Child Content')).toBeInTheDocument();
  });

  it('has initial opacity-0 and translate-y-8 classes for the animation', () => {
    const { container } = render(<AnimatedCard><div>Test Child</div></AnimatedCard>);
    // The component renders a div that wraps the children
    expect(container.firstChild).toHaveClass('opacity-0', 'translate-y-8');
  });

  it('observes the card element using IntersectionObserver', () => {
    render(<AnimatedCard><div>Test Child</div></AnimatedCard>);
    // Checks if the observer was told to observe an element
    expect(mockObserve).toHaveBeenCalled();
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = render(<AnimatedCard><div>Test Child</div></AnimatedCard>);
    unmount();
    // Checks if the observer is cleaned up properly
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
