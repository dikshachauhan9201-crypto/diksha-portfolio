import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';

const About = memo(() => {
  const [downloadStatus, setDownloadStatus] = useState(null);

  const handleResumeDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
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

  const valueCards = [
    {
      title: 'My Working Style',
      description:
        'I build in clear milestones, keep communication proactive, and ship reliable automation that your team can maintain without friction.',
    },
    {
      title: 'Problem-Solving Approach',
      description:
        'I map bottlenecks first, define measurable outcomes, then design resilient workflows with fallback logic, observability, and testing.',
    },
    {
      title: 'Why Make.com',
      description:
        'Make.com gives the right balance of flexibility, speed, and visibility for scalable business automation and complex orchestration.',
    },
    {
      title: 'Delivery Mindset',
      description:
        'Every solution is outcome-first: fewer repetitive tasks, faster response times, and operations that stay stable as volume grows.',
    },
  ];

  const timeline = [
    {
      year: 'Foundation',
      title: 'From Workflow Curiosity to Real Execution',
      description:
        'Started by solving repetitive business tasks with practical no-code and API-driven automation workflows.',
    },
    {
      year: 'Specialization',
      title: 'Focused Deeply on AI Automation',
      description:
        'Expanded from basic automations into AI-enhanced systems with OpenAI, webhooks, and event-based orchestration.',
    },
    {
      year: 'Make.com Focus',
      title: 'Built Reliable Multi-Step Orchestration',
      description:
        'Adopted Make.com as a core platform for robust, visual, and maintainable automations across business stacks.',
    },
    {
      year: 'Today',
      title: 'Production-Ready Automation Delivery',
      description:
        'Delivering end-to-end systems for lead handling, CRM sync, communications, and appointment automation at scale.',
    },
  ];

  const stats = [
    { number: '15+', label: 'Automation Workflows Built' },
    { number: 'AI + API', label: 'Integrated Systems' },
    { number: 'Make.com', label: 'Primary Stack Focus' },
    { number: 'Outcome-First', label: 'Delivery Approach' },
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
            Professional AI Automation Specialist helping teams replace repetitive workflows with reliable, intelligent systems.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <motion.div variants={itemVariants} className="space-y-7">
            <p className="text-lg text-gray-200 leading-relaxed font-light">
              I&apos;m <span className="text-[#00d9ff] font-semibold">Diksha Chauhan</span>, and I build AI automation systems that help businesses move faster with fewer manual dependencies.
            </p>

            <p className="text-base text-gray-300 leading-relaxed font-light">
              My journey into automation started with solving everyday process bottlenecks. That evolved into designing production-grade systems using Make.com, OpenAI, APIs, webhooks, and business tools that need to work together in real time.
            </p>

            <p className="text-base text-gray-300 leading-relaxed font-light">
              I focus on Make.com because it enables powerful orchestration with clear scenario visibility, modular logic, and fast iteration. That combination is ideal for scaling automation across lead generation, CRM, communication, and booking workflows.
            </p>

            <motion.button
              type="button"
              onClick={handleResumeDownload}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Download resume"
              className="mt-6 px-8 py-4 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] text-white font-semibold rounded-xl shadow-lg shadow-[#00d9ff]/25 hover:shadow-[#00d9ff]/50 transition-all duration-300 flex items-center gap-3 w-fit group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
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

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {valueCards.map((value, index) => (
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

        <motion.div variants={itemVariants} className="mb-20">
          <div className="relative rounded-2xl border border-[rgba(0,217,255,0.15)] bg-gradient-to-br from-[rgba(0,153,255,0.08)] to-[rgba(168,85,247,0.05)] p-8 md:p-10 backdrop-blur-xl overflow-hidden shadow-lg shadow-[rgba(0,153,255,0.08)]">
            <motion.div
              className="absolute inset-0"
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage: 'linear-gradient(120deg, rgba(0,217,255,0.04), rgba(168,85,247,0.04), rgba(0,153,255,0.04))',
                backgroundSize: '220% 220%',
              }}
            />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight">My Automation Journey</h3>

              <div className="space-y-6">
                {timeline.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    viewport={{ once: true, amount: 0.25 }}
                    className="relative pl-10"
                  >
                    <motion.span
                      className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-gradient-to-r from-[#0099ff] to-[#00d9ff] shadow-[0_0_14px_rgba(0,217,255,0.6)]"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.25 }}
                    />
                    {index < timeline.length - 1 && (
                      <span className="absolute left-[7px] top-6 h-[calc(100%+14px)] w-px bg-gradient-to-b from-cyan-300/50 to-transparent" />
                    )}

                    <p className="text-sm text-cyan-200/90 font-semibold tracking-wide mb-1">{step.year}</p>
                    <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-300 leading-relaxed font-light">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
              className="group relative text-center p-7 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl hover:border-cyan-300/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/15 overflow-hidden"
              style={{ willChange: 'transform, border-color, box-shadow' }}
            >
              {/* Hover glow background */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-purple-500/10 rounded-2xl"
              />

              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{
                  backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.02), rgba(0,217,255,0.08), rgba(255,255,255,0.02))',
                  backgroundSize: '200% 200%',
                }}
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

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,217,255,0.2)] to-transparent" />
    </section>
  );
});

About.displayName = 'About';

export default About;
