import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import BookCallModal from '../components/BookCallModal';

const Contact = memo(() => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSubmitStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 3000);
    } else {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
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
    { icon: '🇮🇳', label: 'Location', value: 'India', href: '#' },
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
            onClick={() => setIsBookCallOpen(true)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-[#a855f7] to-[#0099ff] text-white font-semibold rounded-xl shadow-lg shadow-[#a855f7]/30 hover:shadow-[#a855f7]/50 transition-all duration-300 flex items-center gap-3 mx-auto group relative overflow-hidden"
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

            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, x: -20, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ x: 12, transition: { duration: 0.3 } }}
                className="group relative flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-[rgba(0,153,255,0.08)] to-[rgba(168,85,247,0.04)] border border-[rgba(0,217,255,0.15)] hover:border-[rgba(0,217,255,0.4)] transition-all duration-300 cursor-pointer shadow-lg shadow-[rgba(0,153,255,0.05)] hover:shadow-[rgba(0,217,255,0.15)] overflow-hidden"
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
              </motion.a>
            ))}

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
                {['LinkedIn', 'Email', 'GitHub'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ scale: 1.2, y: -6 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0099ff] to-[#00d9ff] flex items-center justify-center text-white font-bold shadow-lg shadow-[#00d9ff]/25 hover:shadow-[#00d9ff]/50 transition-all"
                    style={{ willChange: 'transform, box-shadow' }}
                  >
                    {social[0]}
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
          >
            {/* Name Input */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
              <label className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">Full Name</label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-5 py-3.5 rounded-lg bg-[rgba(0,153,255,0.06)] border border-[rgba(0,217,255,0.15)] text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(0,217,255,0.4)] focus:bg-[rgba(0,153,255,0.08)] transition-all duration-300"
              />
            </motion.div>

            {/* Email Input */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.15 }} viewport={{ once: true }}>
              <label className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">Email Address</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-5 py-3.5 rounded-lg bg-[rgba(0,153,255,0.06)] border border-[rgba(0,217,255,0.15)] text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(0,217,255,0.4)] focus:bg-[rgba(0,153,255,0.08)] transition-all duration-300"
              />
            </motion.div>

            {/* Subject Input */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
              <label className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">Subject</label>
              <input
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                placeholder="Project topic"
                className="w-full px-5 py-3.5 rounded-lg bg-[rgba(0,153,255,0.06)] border border-[rgba(0,217,255,0.15)] text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(0,217,255,0.4)] focus:bg-[rgba(0,153,255,0.08)] transition-all duration-300"
              />
            </motion.div>

            {/* Message Input */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.25 }} viewport={{ once: true }}>
              <label className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">Message</label>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                className="w-full px-5 py-3.5 rounded-lg bg-[rgba(0,153,255,0.06)] border border-[rgba(0,217,255,0.15)] text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(0,217,255,0.4)] focus:bg-[rgba(0,153,255,0.08)] transition-all duration-300 resize-none"
              />
            </motion.div>

            {/* Status Message */}
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`p-4 rounded-lg text-sm font-semibold ${
                  submitStatus === 'success'
                    ? 'bg-gradient-to-br from-[rgba(0,217,255,0.15)] to-[rgba(0,217,255,0.05)] border border-[rgba(0,217,255,0.35)] text-[#00d9ff]'
                    : 'bg-gradient-to-br from-[rgba(255,0,0,0.15)] to-[rgba(255,0,0,0.05)] border border-[rgba(255,0,0,0.35)] text-red-400'
                }`}
              >
                {submitStatus === 'success'
                  ? '✓ Message sent successfully! I\'ll get back to you soon.'
                  : '✕ Please fill in all required fields.'}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] text-white font-bold rounded-lg shadow-lg shadow-[#00d9ff]/30 hover:shadow-[#00d9ff]/50 transition-all duration-300 mt-8 tracking-wide"
              style={{ willChange: 'transform, box-shadow' }}
            >
              Send Message
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
