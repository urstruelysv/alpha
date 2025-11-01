"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';

const NavbarButton = ({ children, variant, className, ...props }: { children: React.ReactNode, variant: 'primary' | 'secondary', className?: string, onClick?: () => void }) => {
  const baseClasses = "px-4 py-2 font-oswald font-bold text-sm uppercase tracking-widest rounded-lg overflow-hidden group shadow-[inset_0_0_10px_rgba(168,85,247,0.5),0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300";
  const primaryClasses = "text-white bg-black border border-purple-600/60";
  const secondaryClasses = "text-white bg-transparent border border-purple-600/60";

  return (
    <motion.button
      className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 30px rgba(168,85,247,0.8), inset 0 0 20px rgba(124,58,237,0.6)',
      }}
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const NavbarLogo = () => (
  <Link href="/" className="flex items-center gap-2">
    <div className="w-10 h-10 bg-bright-purple rounded-lg flex items-center justify-center">
      <span className="font-oswald font-bold text-black">AF</span>
    </div>
    <span className="hidden sm:inline font-oswald font-bold text-lg text-white">Alpha Fitness</span>
  </Link>
);

const NavItems = ({ items }: { items: { name: string, link: string }[] }) => (
  <nav className="hidden lg:flex items-center gap-6">
    {items.map((item, idx) => (
      <Link
        key={`nav-link-${idx}`}
        href={item.link}
        className="text-lg font-bold font-inter text-slate-100 hover:text-bright-purple transition-colors"
      >
        {item.name}
      </Link>
    ))}
  </nav>
);

const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean, onClick: () => void }) => (
    <button onClick={onClick} className="lg:hidden p-2 text-white z-50" aria-label="Toggle menu">
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
  
  const MobileNavMenu = ({ isOpen, children, onClose }: { isOpen: boolean, children: React.ReactNode, onClose: () => void }) => (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center lg:hidden"
          >
              <div className="flex flex-col gap-6 text-center">
                  {children}
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  
  export default function StyledNavbar() {
    const navItems = [
      { name: 'Home', link: '#home' },
      { name: 'About', link: '#about' },
      { name: 'Services', link: '#services' },
      { name: 'Packages', link: '#packages' },
      { name: 'Gallery', link: '#gallery' },
      { name: 'Community', link: '#community' },
      { name: 'FAQ', link: '#faq' },
      { name: 'Contact', link: '#contact' },
    ];
  
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
      }, [isMobileMenuOpen]);
  
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
    return (
      <>
        <header
          className={`sticky top-0 z-50 transition-all duration-300 ${
            isScrolled
              ? 'bg-black/80 backdrop-blur-md border-b border-bright-purple'
              : 'bg-transparent shadow-none'
          }`}
        >
            <div className="container-custom flex items-center justify-between h-16 md:h-20 relative">
                <NavbarLogo />
                <div className="hidden lg:flex items-center gap-6">
                    <NavItems items={navItems} />
                </div>
                <div className="hidden lg:flex items-center gap-4">
                    <NavbarButton variant="secondary">Login</NavbarButton>
                    <NavbarButton variant="primary">Start Free Trial</NavbarButton>
                </div>
                <MobileNavToggle isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
            </div>
        </header>
        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={closeMobileMenu}
                className="text-2xl font-oswald text-white/80 hover:text-bright-purple transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-bright-purple/20 w-full max-w-xs">
              <NavbarButton
                onClick={closeMobileMenu}
                variant="secondary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={closeMobileMenu}
                variant="primary"
                className="w-full"
              >
                Start Free Trial
              </NavbarButton>
            </div>
        </MobileNavMenu>
      </>
    );
  }
