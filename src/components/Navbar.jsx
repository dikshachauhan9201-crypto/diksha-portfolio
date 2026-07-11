import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import BookCallModal from './BookCallModal';
import { scrollToAndHighlight } from '../utils/scroll';

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'services', 'skills', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0.2 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (event, href) => {
    event.preventDefault();
    const sectionId = href.replace('#', '');
    scrollToAndHighlight(sectionId);
    setIsMobileMenuOpen(false);
  };

  const navbarVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const linkVariants = {
    initial: { width: 0 },
    hover: { width: '100%', transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      variants={navbarVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-500 ${
        isScrolled
          ? 'py-2.5 bg-[rgba(2,6,23,0.7)] backdrop-blur-md border-b border-[rgba(0,217,255,0.1)]'
          : 'py-4 bg-transparent'
      }`}
      style={{ willChange: 'background, border-color' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#0099ff] via-[#00d9ff] to-[#a855f7] bg-clip-text text-transparent cursor-pointer"
          style={{ willChange: 'transform, opacity' }}
          onClick={(event) => handleNavClick(event, '#home')}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleNavClick(event, '#home');
            }
          }}
          aria-label="Navigate to home section"
        >
          Diksha
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
              className="relative"
              style={{ willChange: 'transform, opacity' }}
            >
              <a
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                aria-label={`Go to ${link.name} section`}
                aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                className={`transition-colors duration-300 text-sm font-medium tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 rounded-md px-1 py-1 ${
                  activeSection === link.href.slice(1) ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </a>

              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#0099ff] to-[#00d9ff]"
                style={{ willChange: 'width' }}
              />

              {activeSection === link.href.slice(1) && (
                <motion.div
                  layoutId="nav-active-indicator"
                  className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-[#0099ff] to-[#00d9ff]"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Right Side - Book a Call Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hidden md:block"
        >
          <motion.button
            type="button"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open book a call modal"
            className="relative px-6 py-2.5 text-sm font-semibold text-white rounded-lg overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            style={{ willChange: 'transform' }}
          >
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] rounded-lg" />

            {/* Enhanced glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur rounded-lg" />

            {/* Button text */}
            <span className="relative z-10">Book a Call</span>

            {/* Animated pulsing glow border */}
            <motion.div
              className="absolute inset-0 rounded-lg border border-[#00d9ff]"
              animate={{
                boxShadow: [
                  '0 0 8px rgba(0, 217, 255, 0.3)',
                  '0 0 16px rgba(0, 217, 255, 0.6)',
                  '0 0 8px rgba(0, 217, 255, 0.3)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ willChange: 'box-shadow' }}
            />
          </motion.button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 rounded"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] rounded-full"
            style={{ willChange: 'transform' }}
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] rounded-full"
            style={{ willChange: 'opacity' }}
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] rounded-full"
            style={{ willChange: 'transform' }}
          />
        </motion.button>
      </div>

      <motion.div
        id="mobile-menu"
        initial={{ opacity: 0, height: 0 }}
        animate={
          isMobileMenuOpen
            ? { opacity: 1, height: 'auto' }
            : { opacity: 0, height: 0 }
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden"
      >
        <motion.div
          className="flex flex-col gap-4 pt-4 pb-4 bg-[rgba(2,6,23,0.9)] backdrop-blur-lg rounded-lg mt-4 px-4 py-5 border border-[rgba(0,217,255,0.15)]"
          style={{ willChange: 'background, border-color' }}
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, x: -10 }}
              animate={
                isMobileMenuOpen
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -10 }
              }
              transition={{ delay: index * 0.08 }}
              onClick={(event) => handleNavClick(event, link.href)}
              aria-label={`Go to ${link.name} section`}
              aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
              className={`transition-colors duration-300 text-sm font-medium py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 rounded px-1 ${
                activeSection === link.href.slice(1) ? 'text-[#00d9ff]' : 'text-gray-300 hover:text-[#00d9ff]'
              }`}
              style={{ willChange: 'color, transform' }}
            >
              {link.name}
            </motion.a>
          ))}

          <motion.button
            type="button"
            onClick={() => {
              setIsModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={
              isMobileMenuOpen
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -10 }
            }
            transition={{ delay: navLinks.length * 0.08 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Open book a call modal"
            className="relative px-4 py-2.5 text-sm font-semibold text-white rounded-lg overflow-hidden group mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            style={{ willChange: 'transform' }}
          >
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] rounded-lg" />

            {/* Enhanced glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur rounded-lg" />

            {/* Button text */}
            <span className="relative z-10">Book a Call</span>
          </motion.button>
        </motion.div>
      </motion.div>

      <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
