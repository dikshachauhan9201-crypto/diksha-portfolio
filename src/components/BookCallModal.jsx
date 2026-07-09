import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookCallModal = memo(({ isOpen, onClose }) => {
  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } },
  };

  const contactOptions = [
    {
      label: 'Email Me',
      icon: '📧',
      href: 'mailto:dikshachauhan9201@gmail.com',
      color: 'from-[#0099ff] to-[#00d9ff]',
    },
    {
      label: 'Message on LinkedIn',
      icon: '🔗',
      href: 'https://linkedin.com/in/diksha-chauhan-465559403',
      color: 'from-[#00d9ff] to-[#a855f7]',
      external: true,
    },
    {
      label: 'Call Me',
      icon: '📱',
      href: 'tel:+919217682198',
      color: 'from-[#a855f7] to-[#0099ff]',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-[rgba(2,6,23,0.95)] to-[rgba(2,6,23,0.98)] border border-[rgba(0,217,255,0.2)] backdrop-blur-xl shadow-2xl shadow-[rgba(0,153,255,0.3)]"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-[#00d9ff] transition-colors p-2"
              >
                ✕
              </motion.button>

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 text-center"
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0099ff] to-[#00d9ff] bg-clip-text text-transparent mb-2">
                  Book a Discovery Call
                </h2>
                <p className="text-gray-400 text-sm">
                  Let's discuss your automation requirements.
                </p>
              </motion.div>

              {/* Contact Options */}
              <div className="space-y-4 mb-8">
                {contactOptions.map((option, index) => (
                  <motion.a
                    key={option.label}
                    href={option.href}
                    target={option.external ? '_blank' : undefined}
                    rel={option.external ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="group relative block w-full p-4 rounded-xl bg-gradient-to-r from-[rgba(0,153,255,0.08)] to-[rgba(168,85,247,0.04)] border border-[rgba(0,217,255,0.2)] hover:border-[rgba(0,217,255,0.5)] transition-all duration-300 overflow-hidden"
                    style={{ willChange: 'transform, border-color' }}
                  >
                    {/* Ripple effect background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${option.color}`}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-4">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <p className="font-semibold text-white">{option.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {option.label === 'Email Me'
                            ? 'dikshachauhan9201@gmail.com'
                            : option.label === 'Call Me'
                            ? '+91 9217682198'
                            : 'Connect with me'}
                        </p>
                      </div>
                    </div>

                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl bg-gradient-to-r ${option.color}`}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Coming Soon Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center p-4 rounded-lg bg-[rgba(0,217,255,0.08)] border border-[rgba(0,217,255,0.15)]"
              >
                <p className="text-sm text-gray-400">
                  <span className="text-[#00d9ff] font-semibold">Calendly integration</span> coming soon.
                </p>
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center"
              >
                <p className="text-xs text-gray-500">
                  Or use the contact form below to get in touch
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

BookCallModal.displayName = 'BookCallModal';

export default BookCallModal;
