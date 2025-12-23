import { render, screen } from '@testing-library/react';
import ServicesSection from './services-section';

// Mock the AnimatedCard component to remove animation classes that hide content
jest.mock('./animated-card', () => ({ 
  children, 
  delay 
}: { 
  children: React.ReactNode; 
  delay?: number;
}) => <div>{children}</div>);

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, className, sizes, ...props }: { 
    src: string; 
    alt: string; 
    fill?: boolean; 
    className?: string;
    sizes?: string;
    [key: string]: any;
  }) => {
    // When fill is true, Next.js Image uses absolute positioning
    // We'll render a regular img with appropriate styles
    const imgProps: any = { 
      src, 
      alt,
      'data-testid': 'next-image',
    };
    
    if (className) {
      imgProps.className = className;
    }
    
    if (fill) {
      // Fill prop requires absolute positioning to fill parent container
      imgProps.style = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...props.style,
      };
    }
    
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...imgProps} />;
  },
}));

describe('ServicesSection', () => {
  it('renders the section title and subtitle', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText(/Comprehensive fitness solutions designed to help you achieve your goals/i)).toBeInTheDocument();
  });

  it('renders all service cards', () => {
    render(<ServicesSection />);
    // There are 11 services defined in the component (6 with icons + 5 with images)
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(11);
    expect(screen.getByText('General Gym')).toBeInTheDocument();
    expect(screen.getByText('Personal Training')).toBeInTheDocument();
    expect(screen.getByText('Group Classes')).toBeInTheDocument();
    expect(screen.getByText("Women's Fitness")).toBeInTheDocument();
    expect(screen.getByText('Nutrition')).toBeInTheDocument();
    expect(screen.getByText('Physiotherapy')).toBeInTheDocument();
    expect(screen.getByText('Private Personal Training')).toBeInTheDocument();
    expect(screen.getByText('Elite Strength & Performance Training')).toBeInTheDocument();
    expect(screen.getByText('Personal Body Transformation Programs')).toBeInTheDocument();
    expect(screen.getByText('Functional Performance & Mobility Training')).toBeInTheDocument();
    expect(screen.getByText('Nutrition & Progress Coaching in Shadnagar')).toBeInTheDocument();
  });

  it('renders the descriptions for the services', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Access to state-of-the-art equipment and facilities')).toBeInTheDocument();
    expect(screen.getByText('One-on-one coaching with certified trainers')).toBeInTheDocument();
    expect(screen.getByText('One-on-one coaching tailored to individual goals')).toBeInTheDocument();
    expect(screen.getByText('Build muscle, power, and conditioning')).toBeInTheDocument();
    expect(screen.getByText('Measurable fat loss and physique results')).toBeInTheDocument();
    expect(screen.getByText('Strength with control and injury prevention')).toBeInTheDocument();
    expect(screen.getByText('Personalized guidance with continuous tracking')).toBeInTheDocument();
  });

  it('renders images for image-based services', () => {
    const { container } = render(<ServicesSection />);
    // There should be 5 image-based services
    const images = container.querySelectorAll('img[data-testid="next-image"]');
    expect(images.length).toBe(5);
    
    // Verify specific images are present
    expect(screen.getByAltText('Private Personal Training')).toBeInTheDocument();
    expect(screen.getByAltText('Elite Strength & Performance Training')).toBeInTheDocument();
    expect(screen.getByAltText('Personal Body Transformation Programs')).toBeInTheDocument();
    expect(screen.getByAltText('Functional Performance & Mobility Training')).toBeInTheDocument();
    expect(screen.getByAltText('Nutrition & Progress Coaching in Shadnagar')).toBeInTheDocument();
  });
});
