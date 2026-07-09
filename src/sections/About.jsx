import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import BookCallModal from '../components/BookCallModal';

const About = memo(() => {
  const [downloadStatus, setDownloadStatus] = useState(null);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  const handleResumeDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = '/Resume.pdf';
      link.download = 'Diksha-Chauhan-Resume.pdf';
      link.click();
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus(null), 2000);
    } catch (error) {
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus(null), 3000);
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

  const values = [
    { title: 'Practical', description: 'Real solutions, not theory' },
    { title: 'Efficient', description: 'Automate what matters' },
    { title: 'Reliable', description: 'Workflows that work 24/7' },
    { title: 'Scalable', description: 'Grows with your business' },
  ];

  const stats = [
    { number: '15+', label: 'Automation Workflows Built' },
    { number: 'Custom', label: 'AI Solutions' },
    { number: 'Make.com', label: 'Automation Specialist' },
  ];

  return (
    <section id="about" className="relative w-full min-h-screen flex items-center justify-center py-24 px-4 md:px-8 bg-[#030712] overflow-hidden">
      {/* Section Background */}
      <SectionBackground variant="about" />

      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto w-full relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <motion.h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-[#0099ff] via-[#00d9ff] to-[#a855f7] bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          <motion.div className="h-1.5 w-24 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            AI Automation Specialist transforming businesses through intelligent solutions
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Left side - Bio */}
          <motion.div variants={itemVariants} className="space-y-8">
            <p className="text-lg text-gray-200 leading-relaxed font-light">
              I'm <span className="text-[#00d9ff] font-semibold">Diksha Chauhan</span>, an AI Automation Specialist focused on building intelligent automation workflows that eliminate repetitive work and drive business efficiency.
            </p>

            <p className="text-base text-gray-300 leading-relaxed font-light">
              I design and implement workflows using Make.com, integrate AI agents, build API integrations, and automate business processes across WhatsApp, CRM systems, and Google Workspace. My solutions help teams focus on high-value work while automation handles repetitive tasks.
            </p>

            <p className="text-base text-gray-300 leading-relaxed font-light">
              Every workflow I create is built with a focus on real business impact—reducing manual work, cutting operational costs, and improving team productivity. Let's automate what's slowing you down.
            </p>

            {/* CTA Button */}
            <motion.button
              onClick={handleResumeDownload}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] text-white font-semibold rounded-xl shadow-lg shadow-[#00d9ff]/25 hover:shadow-[#00d9ff]/50 transition-all duration-300 flex items-center gap-3 w-fit group"
              style={{ willChange: 'transform, box-shadow' }}
            >
              <motion.svg
                className="w-5 h-5"
                animate={downloadStatus === 'success' ? { rotate: [0, 360] } : { y: [0, 4, 0] }}
                transition={{ duration: downloadStatus === 'success' ? 0.6 : 2, repeat: downloadStatus === 'success' ? 0 : Infinity }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                {downloadStatus === 'success' ? (
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 9.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clipRule="evenodd" />
                )}
              </motion.svg>
              <span>
                {downloadStatus === 'success' ? 'Downloaded!' : 'Download Resume'}
              </span>
            </motion.button>
          </motion.div>

          {/* Right side - Values Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08, y: -10, transition: { duration: 0.3 } }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-[rgba(0,153,255,0.08)] to-[rgba(168,85,247,0.04)] border border-[rgba(0,217,255,0.15)] backdrop-blur-xl hover:border-[rgba(0,217,255,0.4)] transition-all duration-300 shadow-lg shadow-[rgba(0,153,255,0.05)] hover:shadow-[rgba(0,217,255,0.2)] overflow-hidden"
                style={{ willChange: 'transform, border-color, box-shadow' }}
              >
                {/* Glow background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br from-[#0099ff] to-[#a855f7] rounded-2xl"
                />
                
                <div className="relative z-10">
                  <motion.h3 
                    className="text-lg font-bold bg-gradient-to-r from-[#0099ff] to-[#00d9ff] bg-clip-text text-transparent mb-3"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {value.title}
                  </motion.h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-6 mt-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="group relative text-center p-8 rounded-2xl bg-gradient-to-br from-[rgba(0,153,255,0.08)] to-[rgba(168,85,247,0.04)] border border-[rgba(0,217,255,0.12)] backdrop-blur-md hover:border-[rgba(0,217,255,0.3)] transition-all duration-300 hover:shadow-xl hover:shadow-[rgba(0,217,255,0.15)] overflow-hidden"
              style={{ willChange: 'transform, border-color, box-shadow' }}
            >
              {/* Hover glow background */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-8 transition-opacity duration-500 bg-gradient-to-br from-[#0099ff] to-[#a855f7] rounded-2xl"
              />
              
              <div className="relative z-10">
                <motion.h3
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#0099ff] to-[#00d9ff] bg-clip-text text-transparent mb-3 tracking-tight"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-400 text-sm md:text-base font-medium tracking-wide">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Book Call Modal */}
      <BookCallModal isOpen={isBookCallOpen} onClose={() => setIsBookCallOpen(false)} />

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,217,255,0.2)] to-transparent" />
    </section>
  );
});

About.displayName = 'About';

export default About;
