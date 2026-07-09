import React, { memo } from 'react';
import { motion } from 'framer-motion';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
  ];

  const services = [
    'Workflow Automation',
    'AI Integration',
    'Process Optimization',
    'API Integration',
    'Custom Automation',
  ];

  const social = [
    { name: 'LinkedIn', icon: 'in', href: 'https://linkedin.com/in/diksha-chauhan-465559403' },
    { name: 'Email', icon: '@', href: 'mailto:dikshachauhan9201@gmail.com' },
    { name: 'Phone', icon: '+', href: 'tel:+919217682198' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        animate={{
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
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10"
      >
        {/* Footer Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#0099ff] to-[#00d9ff] bg-clip-text text-transparent mb-4">
              Diksha
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              AI Automation Specialist transforming businesses through intelligent solutions and cutting-edge technology.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h4 className="text-white font-bold mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4, color: '#00d9ff' }}
                    className="text-gray-400 text-sm hover:text-[#00d9ff] transition-colors duration-300"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h4 className="text-white font-bold mb-6 tracking-wide">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <motion.span
                    whileHover={{ x: 4, color: '#00d9ff' }}
                    className="text-gray-400 text-sm hover:text-[#00d9ff] transition-colors duration-300 cursor-default block"
                  >
                    {service}
                  </motion.span>
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
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.9 }}
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

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-[rgba(0,217,255,0.2)] to-transparent mb-8 origin-left"
        />

        {/* Bottom Bar */}
        <motion.div
          variants={containerVariants}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Copyright */}
          <motion.p variants={itemVariants} className="text-gray-500 text-sm font-light">
            © {currentYear} Diksha Chauhan. All rights reserved. | AI Automation Solutions
          </motion.p>

          {/* Scroll to Top Button */}
          <motion.button
            variants={itemVariants}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0099ff] to-[#00d9ff] text-white text-sm font-semibold shadow-lg shadow-[#00d9ff]/20 hover:shadow-[#00d9ff]/40 transition-all duration-300"
            style={{ willChange: 'transform, box-shadow' }}
          >
            ↑ Back to Top
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Top Border Glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[rgba(0,217,255,0.3)] to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
