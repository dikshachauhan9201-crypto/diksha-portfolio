import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import BookCallModal from '../components/BookCallModal';

const WEBHOOK_URL = import.meta.env.VITE_CONTACT_WEBHOOK_URL || 'PASTE_YOUR_WEBHOOK_HERE';

const submitContactToWebhook = async (payload) => {
  // Allows UI testing before webhook is configured. Replace WEBHOOK_URL to enable real submission.
  if (!WEBHOOK_URL || WEBHOOK_URL === 'PASTE_YOUR_WEBHOOK_HERE') {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { ok: true, mocked: true };
  }

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Webhook request failed.');
  }

  return response;
};

const Contact = memo(() => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  const showToast = (type, message) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 3000);
  };

  const validate = () => {
    const trimmed = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      company: formState.company.trim(),
      phone: formState.phone.trim(),
      message: formState.message.trim(),
    };

    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s()-]{7,20}$/;

    if (!trimmed.name) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!trimmed.email) {
      nextErrors.email = 'Please enter your email.';
    } else if (!emailRegex.test(trimmed.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!trimmed.message) {
      nextErrors.message = 'Please enter your message.';
    }

    if (trimmed.phone && !phoneRegex.test(trimmed.phone)) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }

    setErrors(nextErrors);
    return { isValid: Object.keys(nextErrors).length === 0, trimmed };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, trimmed } = validate();
    if (!isValid) {
      showToast('error', 'Please fix the form errors and try again.');
      return;
    }

    const payload = {
      name: trimmed.name,
      email: trimmed.email,
      company: trimmed.company,
      phone: trimmed.phone,
      message: trimmed.message,
      submittedAt: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);
      await submitContactToWebhook(payload);
      setFormState({ name: '', email: '', company: '', phone: '', message: '' });
      setErrors({});
      showToast('success', 'Thank you! Your message has been sent.');
    } catch (error) {
      showToast('error', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'dikshachauhan9201@gmail.com', href: 'mailto:dikshachauhan9201@gmail.com' },
    { icon: '💬', label: 'Phone', value: '+91 9217682198', href: 'tel:+919217682198' },
    { icon: '🇮🇳', label: 'Location', value: 'India' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', label: 'in', href: 'https://linkedin.com/in/diksha-chauhan-465559403' },
    { name: 'Email', label: '@', href: 'mailto:dikshachauhan9201@gmail.com' },
    { name: 'Phone', label: '+', href: 'tel:+919217682198' },
  ];

  return (
    <section id="contact" className="relative w-full min-h-screen flex items-center justify-center py-24 px-4 md:px-8 bg-[#030712] overflow-hidden">
      {/* Section Background */}
      <SectionBackground variant="contact" />

      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-6xl mx-auto w-full relative z-10"
      >
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            className={`fixed right-5 top-5 z-[90] rounded-xl border px-4 py-3 text-sm font-semibold shadow-lg backdrop-blur-xl ${
              toast.type === 'success'
                ? 'border-[rgba(0,217,255,0.4)] bg-[rgba(0,217,255,0.14)] text-[#b7f7ff]'
                : 'border-[rgba(248,113,113,0.45)] bg-[rgba(239,68,68,0.14)] text-red-200'
            }`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {toast.message}
          </motion.div>
        )}

        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <motion.h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-[#0099ff] via-[#00d9ff] to-[#a855f7] bg-clip-text text-transparent">
              Let's Connect
            </span>
          </motion.h2>
          <motion.div className="h-1.5 w-24 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] mx-auto rounded-full mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Have a project in mind? Let's discuss how I can automate and scale your business.
          </p>
          
          {/* Book a Call Button */}
          <motion.button
            type="button"
            onClick={() => setIsBookCallOpen(true)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open book a discovery call dialog"
            className="mt-8 px-10 py-4 bg-gradient-to-r from-[#a855f7] to-[#0099ff] text-white font-semibold rounded-xl shadow-lg shadow-[#a855f7]/30 hover:shadow-[#a855f7]/50 transition-all duration-300 flex items-center gap-3 mx-auto group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            style={{ willChange: 'transform, box-shadow' }}
          >
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
              initial={{ scale: 0 }}
              whileHover={{ scale: 2 }}
              transition={{ duration: 0.6 }}
            />
            
            <span className="relative z-10">📞 Book a Discovery Call</span>
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-10 tracking-tight">Get in Touch</h3>

            {contactInfo.map((info, index) => {
              const CardTag = info.href ? motion.a : motion.div;
              return (
                <CardTag
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 12, transition: { duration: 0.3 } }}
                  className="group relative flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-[rgba(0,153,255,0.08)] to-[rgba(168,85,247,0.04)] border border-[rgba(0,217,255,0.15)] hover:border-[rgba(0,217,255,0.4)] transition-all duration-300 shadow-lg shadow-[rgba(0,153,255,0.05)] hover:shadow-[rgba(0,217,255,0.15)] overflow-hidden"
                  style={{ willChange: 'transform, border-color, box-shadow' }}
                >
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br from-[#0099ff] to-[#a855f7]"
                  />

                  <span className="text-4xl group-hover:scale-125 transition-transform duration-300 relative z-10">{info.icon}</span>
                  <div className="relative z-10">
                    <p className="text-gray-400 text-sm font-medium tracking-wide">{info.label}</p>
                    <p className="text-white font-bold text-lg group-hover:text-[#00d9ff] transition-colors">
                      {info.value}
                    </p>
                  </div>
                </CardTag>
              );
            })}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-10"
            >
              <p className="text-gray-400 text-sm mb-5 font-medium tracking-wide">Follow on social</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={social.name === 'LinkedIn' ? '_blank' : undefined}
                    rel={social.name === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.2, y: -6 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0099ff] to-[#00d9ff] flex items-center justify-center text-white font-bold shadow-lg shadow-[#00d9ff]/25 hover:shadow-[#00d9ff]/50 transition-all"
                    style={{ willChange: 'transform, box-shadow' }}
                  >
                    {social.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            {/* Name Input */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
              <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">Full Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className="w-full px-5 py-3.5 rounded-lg bg-[rgba(0,153,255,0.06)] border border-[rgba(0,217,255,0.15)] text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(0,217,255,0.4)] focus:bg-[rgba(0,153,255,0.08)] focus-visible:ring-2 focus-visible:ring-cyan-300/70 transition-all duration-300"
              />
              {errors.name && <p id="contact-name-error" className="mt-2 text-sm text-red-300">{errors.name}</p>}
            </motion.div>

            {/* Email Input */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.15 }} viewport={{ once: true }}>
              <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">Email Address</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="your@email.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                className="w-full px-5 py-3.5 rounded-lg bg-[rgba(0,153,255,0.06)] border border-[rgba(0,217,255,0.15)] text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(0,217,255,0.4)] focus:bg-[rgba(0,153,255,0.08)] focus-visible:ring-2 focus-visible:ring-cyan-300/70 transition-all duration-300"
              />
              {errors.email && <p id="contact-email-error" className="mt-2 text-sm text-red-300">{errors.email}</p>}
            </motion.div>

            {/* Company Input */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
              <label htmlFor="contact-company" className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">Company (Optional)</label>
              <input
                id="contact-company"
                type="text"
                name="company"
                value={formState.company}
                onChange={handleChange}
                placeholder="Your company"
                autoComplete="organization"
                className="w-full px-5 py-3.5 rounded-lg bg-[rgba(0,153,255,0.06)] border border-[rgba(0,217,255,0.15)] text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(0,217,255,0.4)] focus:bg-[rgba(0,153,255,0.08)] focus-visible:ring-2 focus-visible:ring-cyan-300/70 transition-all duration-300"
              />
            </motion.div>

            {/* Phone Input */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.23 }} viewport={{ once: true }}>
              <label htmlFor="contact-phone" className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">Phone (Optional)</label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                className="w-full px-5 py-3.5 rounded-lg bg-[rgba(0,153,255,0.06)] border border-[rgba(0,217,255,0.15)] text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(0,217,255,0.4)] focus:bg-[rgba(0,153,255,0.08)] focus-visible:ring-2 focus-visible:ring-cyan-300/70 transition-all duration-300"
              />
              {errors.phone && <p id="contact-phone-error" className="mt-2 text-sm text-red-300">{errors.phone}</p>}
            </motion.div>

            {/* Message Input */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.25 }} viewport={{ once: true }}>
              <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className="w-full px-5 py-3.5 rounded-lg bg-[rgba(0,153,255,0.06)] border border-[rgba(0,217,255,0.15)] text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(0,217,255,0.4)] focus:bg-[rgba(0,153,255,0.08)] focus-visible:ring-2 focus-visible:ring-cyan-300/70 transition-all duration-300 resize-none"
              />
              {errors.message && <p id="contact-message-error" className="mt-2 text-sm text-red-300">{errors.message}</p>}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              aria-label="Send contact form"
              className="w-full py-4 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] text-white font-bold rounded-lg shadow-lg shadow-[#00d9ff]/30 hover:shadow-[#00d9ff]/50 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 mt-8 tracking-wide flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
              style={{ willChange: 'transform, box-shadow' }}
            >
              {isSubmitting && (
                <motion.span
                  className="inline-block h-4 w-4 rounded-full border-2 border-white/80 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
              )}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>

      {/* Book Call Modal */}
      <BookCallModal isOpen={isBookCallOpen} onClose={() => setIsBookCallOpen(false)} />

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,217,255,0.2)] to-transparent" />
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
