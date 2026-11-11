import { memo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import BookCallModal from '../components/BookCallModal';
import MagneticButton from '../components/MagneticButton';

const WEBHOOK_URL = import.meta.env.VITE_CONTACT_WEBHOOK_URL || '';

const buildMailtoLink = (payload) => {
  const recipient = 'dikshachauhan9201@gmail.com';
  const subject = encodeURIComponent(`Portfolio inquiry from ${payload.name || 'New contact'}`);
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.company ? `Company: ${payload.company}` : '',
      payload.phone ? `Phone: ${payload.phone}` : '',
      '',
      'Project details:',
      payload.message,
      '',
      `Submitted at: ${payload.submittedAt}`,
    ]
      .filter(Boolean)
      .join('\n')
  );

  return `mailto:${recipient}?subject=${subject}&body=${body}`;
};

const submitContactToWebhook = async (payload) => {
  if (!WEBHOOK_URL) {
    const mailtoLink = buildMailtoLink(payload);
    window.location.href = mailtoLink;
    return { ok: true, fallback: true };
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
  const reduceMotion = useReducedMotion();
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
      const result = await submitContactToWebhook(payload);
      setFormState({ name: '', email: '', company: '', phone: '', message: '' });
      setErrors({});
      showToast(
        'success',
        result?.fallback
          ? 'Your email draft is ready. Send it to connect with me.'
          : 'Thank you! Your message has been sent.'
      );
    } catch (error) {
      console.error('Contact form submission failed.', error);
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
    { icon: '@', label: 'Email', value: 'dikshachauhan9201@gmail.com', href: 'mailto:dikshachauhan9201@gmail.com' },
    { icon: 'TEL', label: 'Phone', value: '+91 9217682198', href: 'tel:+919217682198' },
    { icon: 'IN', label: 'Location', value: 'India' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', label: 'in', href: 'https://linkedin.com/in/diksha-chauhan-465559403' },
    { name: 'Email', label: '@', href: 'mailto:dikshachauhan9201@gmail.com' },
    { name: 'Phone', label: '+', href: 'tel:+919217682198' },
  ];

  return (
    <section id="contact" className="relative w-full flex items-center justify-center overflow-hidden bg-[#070612] px-4 py-20 sm:py-24 md:px-8">
      {/* Section Background */}
      <SectionBackground variant="contact" />

      <motion.div
        variants={containerVariants}
        initial={reduceMotion ? false : 'initial'}
        whileInView={reduceMotion ? undefined : 'animate'}
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-6xl mx-auto w-full relative z-10"
      >
        {toast && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.96 }}
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
        <motion.div variants={itemVariants} className="mb-12 max-w-3xl border-b border-white/10 pb-10 sm:mb-16 sm:pb-12">
          <p className="section-kicker">Start a conversation</p>
          <motion.h2 className="mt-4 text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-white">
            Let&apos;s make the work flow.
          </motion.h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Have a process worth improving? Let&apos;s talk about practical n8n automation, useful AI integrations, and a clear path from request to action.
          </p>
          
          {/* Book a Call Button */}
          <MagneticButton
            as={motion.button}
            onClick={() => setIsBookCallOpen(true)}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            aria-label="Open book a discovery call dialog"
            className="group relative mt-7 flex min-h-12 items-center gap-3 overflow-hidden rounded-full border border-violet-200/20 bg-gradient-to-r from-violet-500/90 to-fuchsia-500/80 px-6 py-3 font-semibold text-white shadow-[0_14px_34px_rgba(139,92,246,.18)] transition hover:shadow-[0_18px_40px_rgba(139,92,246,.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200/70"
            style={{ willChange: 'transform, box-shadow' }}
          >
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
              initial={reduceMotion ? false : { scale: 0 }}
              whileHover={reduceMotion ? undefined : { scale: 2 }}
              transition={{ duration: reduceMotion ? 0 : 0.6 }}
            />
            
            <span className="relative z-10">Book a discovery call <span aria-hidden="true">↗</span></span>
          </MagneticButton>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="mb-6 text-xl font-semibold tracking-tight text-white">Contact details</h3>

            {contactInfo.map((info, index) => {
              const CardTag = info.href ? motion.a : motion.div;
              return (
                <CardTag
                  key={info.label}
                  href={info.href}
                  initial={reduceMotion ? false : { opacity: 0, x: -20, y: 10 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={reduceMotion ? undefined : { x: 5, transition: { duration: 0.25 } }}
                  className="group relative flex min-w-0 items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition-all duration-300 hover:border-violet-300/25 hover:bg-violet-300/[0.04] sm:p-5"
                  style={{ willChange: 'transform, border-color, box-shadow' }}
                >
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br from-[#0099ff] to-[#a855f7]"
                  />

                  <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-violet-300/15 bg-violet-300/[0.06] text-2xl transition-transform duration-300 group-hover:scale-105">{info.icon}</span>
                  <div className="relative z-10">
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-[0.14em]">{info.label}</p>
                    <p className="mt-1 break-all text-sm font-semibold text-slate-100 transition-colors group-hover:text-violet-100 sm:text-base">
                      {info.value}
                    </p>
                  </div>
                </CardTag>
              );
            })}

            {/* Social Links */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Elsewhere</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={social.name === 'LinkedIn' ? '_blank' : undefined}
                    rel={social.name === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                    whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-sm font-semibold text-violet-100 transition hover:border-violet-200/30 hover:bg-violet-300/10"
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
            className="space-y-5 rounded-[1.5rem] border border-white/[0.08] bg-[#0d0b19]/85 p-5 shadow-[0_24px_70px_rgba(0,0,0,.2)] sm:p-8"
            noValidate
          >
            <div className="mb-2">
              <h3 className="text-xl font-semibold tracking-tight text-white">Tell me what you&apos;re working on</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">A little context helps me understand the process and the kind of automation you need.</p>
            </div>
            {/* Name Input */}
            <motion.div initial={reduceMotion ? false : { opacity: 0 }} whileInView={reduceMotion ? undefined : { opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
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
            <motion.div initial={reduceMotion ? false : { opacity: 0 }} whileInView={reduceMotion ? undefined : { opacity: 1 }} transition={{ delay: 0.15 }} viewport={{ once: true }}>
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
            <motion.div initial={reduceMotion ? false : { opacity: 0 }} whileInView={reduceMotion ? undefined : { opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
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
            <motion.div initial={reduceMotion ? false : { opacity: 0 }} whileInView={reduceMotion ? undefined : { opacity: 1 }} transition={{ delay: 0.23 }} viewport={{ once: true }}>
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
            <motion.div initial={reduceMotion ? false : { opacity: 0 }} whileInView={reduceMotion ? undefined : { opacity: 1 }} transition={{ delay: 0.25 }} viewport={{ once: true }}>
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
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={reduceMotion ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              aria-label="Send contact form"
              className="focus-ring mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 font-semibold tracking-wide text-white shadow-[0_12px_28px_rgba(139,92,246,.16)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              style={{ willChange: 'transform, box-shadow' }}
            >
              {isSubmitting && (
                <motion.span
                  className="inline-block h-4 w-4 rounded-full border-2 border-white/80 border-t-transparent"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
              )}
              {isSubmitting ? 'Preparing...' : WEBHOOK_URL ? 'Send message' : 'Prepare email draft'}
            </motion.button>
            {!WEBHOOK_URL && <p className="text-xs leading-5 text-slate-500">This site has no contact backend configured. Submitting opens a prefilled email draft for you to review and send.</p>}
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
