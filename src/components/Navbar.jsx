import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll to apply glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // Navbar animation - fade down on page load
  const navbarVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Link underline hover animation
  const linkVariants = {
    initial: { width: 0 },
    hover: { width: '100%', transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      variants={navbarVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-500 ${
        isScrolled
          ? 'bg-[rgba(2,6,23,0.7)] backdrop-blur-md border-b border-[rgba(0,217,255,0.1)]'
          : 'bg-transparent'
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
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wide"
              >
                {link.name}
              </a>

              {/* Smooth hover underline */}
              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#0099ff] to-[#00d9ff]"
                style={{ willChange: 'width' }}
              />
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 py-2.5 text-sm font-semibold text-white rounded-lg overflow-hidden group"
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

        {/* Mobile Menu Hamburger Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          aria-label="Toggle mobile menu"
        >
          {/* Hamburger lines with animation */}
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

      {/* Mobile Navigation Menu */}
      <motion.div
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
          {/* Mobile Navigation Links */}
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
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#00d9ff] transition-colors duration-300 text-sm font-medium py-2.5"
              style={{ willChange: 'color, transform' }}
            >
              {link.name}
            </motion.a>
          ))}

          {/* Mobile Book a Call Button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={
              isMobileMenuOpen
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -10 }
            }
            transition={{ delay: navLinks.length * 0.08 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-4 py-2.5 text-sm font-semibold text-white rounded-lg overflow-hidden group mt-2"
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
    </motion.nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
