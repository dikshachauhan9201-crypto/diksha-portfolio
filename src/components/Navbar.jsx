import { useState, useEffect, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import BookCallModal from './BookCallModal';
import { scrollToAndHighlight } from '../utils/scroll';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Web', href: '#web-development' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        document.getElementById('mobile-menu-toggle')?.focus();
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1));
    const observedSections = new Set();
    let activeUpdateTimer = null;

    const updateActiveSection = () => {
      activeUpdateTimer = null;
      const marker = Math.min(window.innerHeight * 0.4, window.innerHeight - 1);
      let closestSection = null;
      let closestDistance = Infinity;

      observedSections.forEach((section) => {
        const bounds = section.getBoundingClientRect();
        const distance = bounds.top <= marker && bounds.bottom >= marker
          ? 0
          : Math.min(Math.abs(bounds.top - marker), Math.abs(bounds.bottom - marker));

        if (distance < closestDistance) {
          closestSection = section.id;
          closestDistance = distance;
        }
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        closestSection = sectionIds.at(-1);
      }

      if (closestSection) {
        setActiveSection((current) => current === closestSection ? current : closestSection);
      }
    };
    const scheduleActiveUpdate = () => {
      if (activeUpdateTimer === null) {
        activeUpdateTimer = window.setTimeout(updateActiveSection, 60);
      }
    };
    const observeAvailableSections = () => {
      let foundSection = false;
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && !observedSections.has(section)) {
          observedSections.add(section);
          foundSection = true;
        }
      });
      if (foundSection) scheduleActiveUpdate();
    };
    const contentObserver = new MutationObserver(observeAvailableSections);

    observeAvailableSections();
    contentObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', scheduleActiveUpdate, { passive: true });
    window.addEventListener('resize', scheduleActiveUpdate);
    window.addEventListener('hashchange', scheduleActiveUpdate);

    return () => {
      if (activeUpdateTimer !== null) window.clearTimeout(activeUpdateTimer);
      contentObserver.disconnect();
      window.removeEventListener('scroll', scheduleActiveUpdate);
      window.removeEventListener('resize', scheduleActiveUpdate);
      window.removeEventListener('hashchange', scheduleActiveUpdate);
    };
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    const sectionId = href.replace('#', '');
    scrollToAndHighlight(sectionId);
    setActiveSection(sectionId);
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

  return (
    <motion.nav
      variants={navbarVariants}
      initial={reduceMotion ? false : 'initial'}
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-[rgba(2,6,23,0.72)] backdrop-blur-2xl border-b border-[rgba(0,217,255,0.10)] shadow-[0_12px_40px_rgba(2,6,23,0.45)]'
          : 'py-5 bg-transparent'
      }`}
      style={{ willChange: 'background, border-color, box-shadow' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <motion.a
          href="#home"
          initial={reduceMotion ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="focus-ring cursor-pointer rounded-full border border-cyan-400/10 bg-white/3 px-3 py-2 shadow-[0_0_24px_rgba(0,217,255,0.08)] backdrop-blur-md"
          style={{ willChange: 'transform, opacity' }}
          onClick={(event) => handleNavClick(event, '#home')}
          aria-label="Navigate to home section"
        >
          <span className="bg-gradient-to-r from-[#0099ff] via-[#00d9ff] to-[#a855f7] bg-clip-text text-2xl font-black tracking-[-0.06em] text-transparent md:text-3xl">
            Diksha
          </span>
        </motion.a>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-slate-950/30 px-3 py-2 shadow-[0_8px_30px_rgba(15,23,42,0.5)] backdrop-blur-xl md:flex">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={reduceMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
              className="relative"
              style={{ willChange: 'transform, opacity' }}
            >
              <a
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                aria-label={`Go to ${link.name} section`}
                aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                className={`focus-ring relative inline-flex items-center rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId={reduceMotion ? undefined : 'nav-active-indicator'}
                    className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-cyan-300 to-violet-300"
                    transition={{ type: 'spring', stiffness: 420, damping: 34, duration: reduceMotion ? 0 : undefined }}
                    aria-hidden="true"
                  />
                )}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hidden md:block"
        >
          <motion.button
            type="button"
            onClick={() => setIsModalOpen(true)}
            whileHover={reduceMotion ? undefined : { scale: 1.04, y: -1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            aria-label="Open book a call modal"
            className="relative overflow-hidden rounded-xl border border-cyan-300/30 bg-gradient-to-r from-[#0099ff] via-[#00d9ff] to-[#5cc7ff] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,153,255,0.4)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            style={{ willChange: 'transform, box-shadow' }}
          >
            <span className="relative z-10">Book a Call</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
          </motion.button>
        </motion.div>

        <motion.button
          id="mobile-menu-toggle"
          initial={reduceMotion ? false : { opacity: 0 }}
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
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="w-6 h-0.5 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] rounded-full"
            style={{ willChange: 'transform' }}
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="w-6 h-0.5 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] rounded-full"
            style={{ willChange: 'opacity' }}
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="w-6 h-0.5 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] rounded-full"
            style={{ willChange: 'transform' }}
          />
        </motion.button>
      </div>

      <motion.div
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
        initial={reduceMotion ? false : { opacity: 0, y: -8 }}
        animate={
          isMobileMenuOpen
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -8 }
        }
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
        className={`absolute left-4 right-4 top-full z-50 md:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <motion.div
          className="mt-4 flex flex-col gap-4 rounded-lg border border-[rgba(0,217,255,0.15)] bg-[rgba(2,6,23,0.9)] px-4 py-5 pb-4 backdrop-blur-lg"
          style={{ willChange: 'background, border-color' }}
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              animate={
                isMobileMenuOpen
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -10 }
              }
              transition={{ delay: reduceMotion ? 0 : index * 0.08, duration: reduceMotion ? 0 : 0.2 }}
              onClick={(event) => handleNavClick(event, link.href)}
              aria-label={`Go to ${link.name} section`}
              aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
              className={`relative rounded px-3 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${
                activeSection === link.href.slice(1) ? 'bg-cyan-300/[0.07] text-cyan-100' : 'text-gray-300 hover:text-[#00d9ff]'
              }`}
              style={{ willChange: 'color, transform' }}
            >
              {link.name}
              {activeSection === link.href.slice(1) && (
                <motion.span layoutId={reduceMotion ? undefined : 'mobile-nav-active-indicator'} className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-cyan-300" aria-hidden="true" />
              )}
            </motion.a>
          ))}

          <motion.button
            type="button"
            onClick={() => {
              setIsModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            initial={reduceMotion ? false : { opacity: 0, x: -10 }}
            animate={
              isMobileMenuOpen
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -10 }
            }
            transition={{ delay: reduceMotion ? 0 : navLinks.length * 0.08, duration: reduceMotion ? 0 : 0.2 }}
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
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
