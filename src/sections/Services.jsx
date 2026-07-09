import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import BookCallModal from '../components/BookCallModal';
import { scrollToAndHighlight } from '../utils/scroll';

const Services = memo(() => {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  const services = [
    {
      title: 'Make.com Automation',
      description: 'Expert Make.com automation to build complex workflows, connect applications, and eliminate manual processes efficiently.',
      icon: '⚙️',
      gradient: 'from-[#0099ff] to-[#00d9ff]',
    },
    {
      title: 'AI Agents & Chatbots',
      description: 'Deploy intelligent AI agents and chatbots for customer support, lead qualification, and automated conversations.',
      icon: '🤖',
      gradient: 'from-[#00d9ff] to-[#a855f7]',
    },
    {
      title: 'WhatsApp Automation',
      description: 'Build WhatsApp automation solutions for customer engagement, notifications, and automated customer support.',
      icon: '💬',
      gradient: 'from-[#a855f7] to-[#0099ff]',
    },
    {
      title: 'CRM Automation',
      description: 'Streamline CRM operations with automated lead management, data enrichment, and follow-up workflows.',
      icon: '📊',
      gradient: 'from-[#0099ff] to-[#a855f7]',
    },
    {
      title: 'API Integration',
      description: 'Seamlessly integrate APIs and connect multiple tools and platforms for unified data flow and operations.',
      icon: '🔗',
      gradient: 'from-[#a855f7] to-[#00d9ff]',
    },
    {
      title: 'Google Workspace Automation',
      description: 'Automate Google Sheets, Gmail, Drive, and other workspace tools to boost team productivity and efficiency.',
      icon: '✨',
      gradient: 'from-[#00d9ff] to-[#0099ff]',
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
    <section id="services" className="relative w-full min-h-screen flex items-center justify-center py-24 px-4 md:px-8 bg-[#030712] overflow-hidden">
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
            Comprehensive automation and AI solutions designed for modern business transformation
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
              {/* Animated border glow */}
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

              {/* Icon with hover zoom */}
              <motion.div
                className="text-5xl mb-6 relative z-10 inline-block"
                animate={{ scale: [1, 1.12, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                whileHover={{ scale: 1.25 }}
              >
                {service.icon}
              </motion.div>

              {/* Content */}
              <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{service.description}</p>

                {/* Bottom accent line */}
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
            onClick={() => scrollToAndHighlight('contact')}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] text-white font-semibold rounded-xl shadow-lg shadow-[#00d9ff]/30 hover:shadow-[#00d9ff]/50 transition-all duration-300 flex items-center gap-3 mx-auto group relative overflow-hidden"
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

      {/* Book Call Modal */}
      <BookCallModal isOpen={isBookCallOpen} onClose={() => setIsBookCallOpen(false)} />

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,217,255,0.2)] to-transparent" />
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
