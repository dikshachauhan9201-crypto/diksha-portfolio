import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { scrollToAndHighlight } from '../utils/scroll';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();
  const reduceMotion = useReducedMotion();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Web', href: '#web-development' },
    { name: 'Contact', href: '#contact' },
  ];

  const resources = [
    { name: 'Email', href: 'mailto:dikshachauhan9201@gmail.com' },
    { name: 'Phone', href: 'tel:+919217682198' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/diksha-chauhan-465559403' },
    { name: 'Resume', href: '/resume.pdf', download: true },
  ];

  const social = [
    { name: 'LinkedIn', icon: 'in', href: 'https://linkedin.com/in/diksha-chauhan-465559403' },
    { name: 'Email', icon: '@', href: 'mailto:dikshachauhan9201@gmail.com' },
    { name: 'Phone', icon: '+', href: 'tel:+919217682198' },
  ];

  const scrollToTop = () => {
    scrollToAndHighlight('home');
  };

  const handleQuickLinkClick = (event, href) => {
    event.preventDefault();
    scrollToAndHighlight(href.replace('#', ''));
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="relative w-full bg-[#030712] overflow-hidden border-t border-[rgba(0,217,255,0.1)]">
      {/* Subtle Background Glow */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        animate={reduceMotion ? undefined : {
          background: [
            'radial-gradient(800px at 50% 50%, rgba(0, 153, 255, 0.03) 0%, transparent 100%)',
            'radial-gradient(800px at 100% 50%, rgba(168, 85, 247, 0.03) 0%, transparent 100%)',
            'radial-gradient(800px at 50% 50%, rgba(0, 153, 255, 0.03) 0%, transparent 100%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial={reduceMotion ? false : 'initial'}
        whileInView={reduceMotion ? undefined : 'animate'}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10"
      >
        {/* Footer Grid */}
        <div         className="mb-12 grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#0099ff] to-[#00d9ff] bg-clip-text text-transparent mb-4">
              Diksha
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              AI Automation Engineer focused on n8n workflow engineering, practical AI integrations, and reliable business automation.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-1">
            <h4 className="text-white font-bold mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    onClick={(event) => handleQuickLinkClick(event, link.href)}
                    whileHover={reduceMotion ? undefined : { x: 4, color: '#00d9ff' }}
                    aria-label={`Go to ${link.name} section`}
                    className="text-gray-400 text-sm hover:text-[#00d9ff] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 rounded"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-1">
            <h4 className="text-white font-bold mb-6 tracking-wide">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <motion.a
                    href={resource.href || undefined}
                    download={resource.download ? 'Diksha-Chauhan-Resume.pdf' : undefined}
                    target={resource.name === 'LinkedIn' ? '_blank' : undefined}
                    rel={resource.name === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                    whileHover={reduceMotion ? undefined : { x: 4, color: '#00d9ff' }}
                    aria-label={resource.href ? resource.name : `${resource.name} not available yet`}
                    className="text-gray-400 text-sm hover:text-[#00d9ff] transition-colors duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 rounded"
                  >
                    {resource.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h4 className="text-white font-bold mb-6 tracking-wide">Connect</h4>
            <p className="text-gray-400 text-sm mb-6">
              Email: dikshachauhan9201@gmail.com<br />
              Phone: +91 9217682198
            </p>
            <div className="flex gap-3">
              {social.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name === 'LinkedIn' ? '_blank' : undefined}
                  rel={link.name === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                  whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  aria-label={link.name}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgba(0,153,255,0.15)] to-[rgba(168,85,247,0.1)] border border-[rgba(0,217,255,0.2)] flex items-center justify-center text-[#00d9ff] hover:border-[rgba(0,217,255,0.4)] hover:bg-gradient-to-br hover:from-[rgba(0,153,255,0.25)] hover:to-[rgba(168,85,247,0.15)] transition-all duration-300 font-semibold text-sm"
                  title={link.name}
                  style={{ willChange: 'transform, border-color, background' }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={reduceMotion ? undefined : { scaleX: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-[rgba(0,217,255,0.2)] to-transparent mb-8 origin-left"
        />

        <motion.div
          variants={containerVariants}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <motion.p variants={itemVariants} className="text-gray-500 text-sm font-light">
            © {currentYear} Diksha Chauhan. All rights reserved. | AI Automation Solutions
          </motion.p>

          <motion.button
            variants={itemVariants}
            onClick={scrollToTop}
            whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            type="button"
            aria-label="Back to top"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0099ff] to-[#00d9ff] text-white text-sm font-semibold shadow-lg shadow-[#00d9ff]/20 hover:shadow-[#00d9ff]/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            style={{ willChange: 'transform, box-shadow' }}
          >
            ↑ Back to Top
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Top Border Glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[rgba(0,217,255,0.3)] to-transparent"
        animate={reduceMotion ? undefined : { opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
