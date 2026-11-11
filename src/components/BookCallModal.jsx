import { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const BookCallModal = memo(({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  const modalVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const actionButtons = [
    {
      label: 'Send Email',
      href: 'mailto:dikshachauhan9201@gmail.com',
    },
    {
      label: 'Call Now',
      href: 'tel:+919217682198',
    },
    {
      label: 'Open LinkedIn',
      href: 'https://linkedin.com/in/diksha-chauhan-465559403',
      external: true,
    },
    {
      label: 'Download Resume',
      href: '/resume.pdf',
      download: 'Resume.pdf',
    },
  ];

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          style={{
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Book a Discovery Call"
            className="relative w-full max-w-xl rounded-3xl border border-white/20 bg-gradient-to-br from-white/18 to-white/10 p-6 text-white shadow-[0_24px_80px_rgba(0,153,255,0.28)] backdrop-blur-2xl sm:p-8"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-slate-100 transition-colors hover:bg-white/20"
            >
              Close
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mb-6 pr-20 sm:mb-7"
            >
              <h2 className="mb-2 text-2xl font-bold text-cyan-100 sm:text-3xl">📅 Book a Discovery Call</h2>
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
                Let&apos;s discuss your AI Automation requirements and how I can help automate your business.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-6 rounded-2xl border border-white/15 bg-white/5 p-4 sm:mb-7"
            >
              <p className="mb-3 text-sm font-semibold text-cyan-100">Contact Options:</p>
              <div className="space-y-2 text-sm text-slate-100 sm:text-base">
                <p>📧 Email:</p>
                <p className="break-all text-cyan-200">dikshachauhan9201@gmail.com</p>
                <p className="pt-1">📞 Phone:</p>
                <p className="text-cyan-200">+91 9217682198</p>
                <p className="pt-1">💼 LinkedIn:</p>
                <p className="break-all text-cyan-200">https://linkedin.com/in/diksha-chauhan-465559403</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {actionButtons.map((button, index) => (
                <motion.a
                  key={button.label}
                  href={button.href}
                  target={button.external ? '_blank' : undefined}
                  rel={button.external ? 'noopener noreferrer' : undefined}
                  download={button.download}
                  onClick={onClose}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.06 }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl border border-cyan-300/30 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,153,255,0.18)] transition-colors hover:from-cyan-500/35 hover:to-blue-500/35"
                >
                  {button.label}
                </motion.a>
              ))}

              <motion.button
                type="button"
                onClick={onClose}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44 }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/20 sm:col-span-2"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
});

BookCallModal.displayName = 'BookCallModal';

export default BookCallModal;
