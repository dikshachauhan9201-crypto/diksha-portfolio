import React, { memo } from 'react';
import { motion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import { scrollToAndHighlight } from '../utils/scroll';

const Services = memo(() => {
  const services = [
    {
      title: 'AI Automation',
      description: 'End-to-end automation systems that remove repetitive tasks and improve operational speed.',
      icon: '🤖',
      gradient: 'from-[#0099ff] to-[#00d9ff]',
    },
    {
      title: 'Make.com Automation',
      description: 'Complex multi-step scenarios using Make.com with resilient routing, branching, and error handling.',
      icon: '⚙️',
      gradient: 'from-[#00d9ff] to-[#a855f7]',
    },
    {
      title: 'AI Agents',
      description: 'AI-driven assistants for lead qualification, customer support, and process decisioning workflows.',
      icon: '🧠',
      gradient: 'from-[#a855f7] to-[#0099ff]',
    },
    {
      title: 'WhatsApp Automation',
      description: 'Automated WhatsApp messaging, follow-ups, notifications, and customer engagement flows.',
      icon: '💬',
      gradient: 'from-[#0099ff] to-[#a855f7]',
    },
    {
      title: 'Lead Generation Automation',
      description: 'Streamlined lead capture, enrichment, deduplication, and routing for faster conversion operations.',
      icon: '🎯',
      gradient: 'from-[#a855f7] to-[#00d9ff]',
    },
    {
      title: 'CRM Automation',
      description: 'Automatic CRM updates, lifecycle tracking, and handoff workflows for sales and support teams.',
      icon: '📊',
      gradient: 'from-[#00d9ff] to-[#0099ff]',
    },
    {
      title: 'API Integration',
      description: 'Secure API integrations and webhook orchestration for clean data movement across your stack.',
      icon: '🔗',
      gradient: 'from-[#0099ff] to-[#00d9ff]',
    },
    {
      title: 'Email Automation',
      description: 'Automated email sequences, transactional flows, and follow-up logic with personalized triggers.',
      icon: '📧',
      gradient: 'from-[#00d9ff] to-[#a855f7]',
    },
    {
      title: 'Appointment Booking Automation',
      description: 'Lead-to-booking automation with reminders, confirmations, and calendar synchronization.',
      icon: '📅',
      gradient: 'from-[#a855f7] to-[#0099ff]',
    },
  ];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    whileInView: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
    whileHover: { y: -12, transition: { duration: 0.3 } },
  };

  return (
    <section id="services" className="relative w-full min-h-screen flex items-center justify-center py-24 px-4 md:px-8 bg-[#030712] overflow-x-hidden">
      {/* Section Background */}
      <SectionBackground variant="services" />

      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-7xl mx-auto w-full relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <motion.h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-[#0099ff] via-[#00d9ff] to-[#a855f7] bg-clip-text text-transparent">
              Services
            </span>
          </motion.h2>
          <motion.div className="h-1.5 w-24 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] mx-auto rounded-full mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Premium automation services designed to help businesses scale with reliable AI-powered systems.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              initial="initial"
              whileInView="whileInView"
              whileHover="whileHover"
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-[rgba(0,153,255,0.08)] to-[rgba(168,85,247,0.04)] border border-[rgba(0,217,255,0.15)] backdrop-blur-xl overflow-hidden hover:border-[rgba(0,217,255,0.4)] transition-all duration-500 shadow-lg shadow-[rgba(0,153,255,0.05)] hover:shadow-[rgba(0,217,255,0.2)]"
              style={{ willChange: 'transform, border-color, box-shadow' }}
            >
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                style={{
                  backgroundImage: `linear-gradient(120deg, rgba(0,217,255,0.5), rgba(168,85,247,0.4), rgba(0,153,255,0.5))`,
                  backgroundSize: '220% 220%',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '1px',
                }}
              />

              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(45deg, transparent, rgba(0,217,255,0.1), transparent)',
                  backgroundSize: '200% 200%',
                }}
              />

              {/* Gradient overlay on hover */}
              <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${service.gradient}`}
              />

              <motion.div
                className="text-5xl mb-6 relative z-10 inline-block"
                animate={{ scale: [1, 1.12, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                whileHover={{ scale: 1.25 }}
                aria-hidden="true"
              >
                {service.icon}
              </motion.div>

              {/* Content */}
              <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{service.description}</p>

                <motion.div
                  className={`h-1.5 w-0 bg-gradient-to-r ${service.gradient} rounded-full mt-5`}
                  whileHover={{ width: '40px' }}
                  transition={{ duration: 0.4 }}
                  style={{ willChange: 'width' }}
                />
              </div>

              {/* Glow effect on hover */}
              <motion.div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl bg-gradient-to-br ${service.gradient} pointer-events-none`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="mt-24 text-center"
        >
          <p className="text-gray-400 mb-8 text-lg font-light">Ready to transform your business?</p>
          <motion.button
            type="button"
            onClick={() => scrollToAndHighlight('contact')}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to contact section"
            className="px-10 py-4 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] text-white font-semibold rounded-xl shadow-lg shadow-[#00d9ff]/30 hover:shadow-[#00d9ff]/50 transition-all duration-300 flex items-center gap-3 mx-auto group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            style={{ willChange: 'transform, box-shadow' }}
          >
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
              initial={{ scale: 0 }}
              whileHover={{ scale: 2 }}
              transition={{ duration: 0.6 }}
            />
            
            <span className="relative z-10">Get Started Today</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,217,255,0.2)] to-transparent" />
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
