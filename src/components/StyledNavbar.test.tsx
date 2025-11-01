import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StyledNavbar from './StyledNavbar';

// Mock framer-motion for simpler testing, and next/link
jest.mock('framer-motion', () => {
    const React = require('react');
    const { forwardRef } = React;
    return {
        motion: {
            div: forwardRef((props, ref) => <div ref={ref} {...props} />),
            button: forwardRef((props, ref) => <button ref={ref} {...props} />),
        },
        AnimatePresence: ({ children }) => <>{children}</>,
    };
});


describe('StyledNavbar', () => {
    it('renders the logo and desktop navigation links', () => {
        render(<StyledNavbar />);
        expect(screen.getByRole('link', { name: /alpha fitness/i })).toBeInTheDocument();
        
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
    });

    it('renders desktop action buttons', () => {
        render(<StyledNavbar />);
        const loginButtons = screen.getAllByRole('button', { name: 'Login' });
        const trialButtons = screen.getAllByRole('button', { name: 'Start Free Trial' });
        
        // The first button instance is the one visible on desktop
        expect(loginButtons[0]).toBeInTheDocument();
        expect(trialButtons[0]).toBeInTheDocument();
    });

    it('toggles the mobile menu on click', async () => {
        render(<StyledNavbar />);
        const toggleButton = screen.getByLabelText('Toggle menu');

        // Menu should be closed initially.
        expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();

        // Open menu
        fireEvent.click(toggleButton);

        // Wait for menu to appear and check for a link
        await waitFor(() => {
            const mobileMenu = screen.getByTestId('mobile-menu');
            expect(mobileMenu).toBeVisible();
            expect(within(mobileMenu).getByText('Contact')).toBeVisible();
        });

        // Close menu by clicking the toggle button again
        fireEvent.click(toggleButton);

        await waitFor(() => {
            expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
        });
    });

    it('disables body scroll when mobile menu is open', () => {
        render(<StyledNavbar />);
        const toggleButton = screen.getByLabelText('Toggle menu');
        
        fireEvent.click(toggleButton);
        expect(document.body.style.overflow).toBe('hidden');

        fireEvent.click(toggleButton);
        expect(document.body.style.overflow).toBe('unset');
    });

    it('applies scrolled styles when window is scrolled', () => {
        const { container } = render(<StyledNavbar />);
        const header = container.querySelector('header');

        // Initial state
        expect(header.className).toContain('bg-transparent');

        // Simulate scroll event
        fireEvent.scroll(window, { target: { scrollY: 100 } });

        // Check that the class changes after scroll
        expect(header.className).not.toContain('bg-transparent');
        expect(header.className).toContain('bg-black/80');

        // Scroll back up
        fireEvent.scroll(window, { target: { scrollY: 0 } });
        expect(header.className).toContain('bg-transparent');
    });
});
