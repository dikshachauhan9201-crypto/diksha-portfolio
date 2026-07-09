import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import BookCallModal from '../components/BookCallModal';

const Projects = memo(() => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'AI Lead Generation Automation',
      description: 'Automatically collect leads, enrich data and organize everything using Make.com.',
      tags: ['Make.com', 'Lead Generation', 'AI'],
      gradient: 'from-[#0099ff] to-[#00d9ff]',
      image: '🎯',
      problem: 'Manual lead collection and research were consuming significant time, with data scattered across multiple sources and inconsistent enrichment.',
      solution: 'Built an automated lead generation system that collects, enriches, and organizes leads in real-time using Make.com and AI tools.',
      workflow: 'Lead sources → Data collection → Enrichment → Deduplication → Organization → Ready for outreach',
      features: [
        'Multi-source lead collection',
        'Automated data enrichment',
        'Duplicate detection',
        'Real-time organization',
        'Lead quality scoring',
        'Automated updates',
      ],
      technologies: ['Make.com', 'Google Sheets', 'Apify', 'Apollo', 'Hunter', 'OpenAI'],
      screenshots: ['Lead Dashboard', 'Enrichment Pipeline', 'Results Sheet'],
      challenges: [
        'Handled data validation and cleaning',
        'Integrated multiple lead sources',
        'Managed API rate limits efficiently',
      ],
      results: [
        'Automated lead collection daily',
        'High-quality enriched data',
        'Significant time savings',
        'Better lead targeting',
      ],
      github: '#',
      demo: '#',
    },
    {
      id: 2,
      title: 'AI WhatsApp Chatbot',
      description: 'AI chatbot capable of answering customer queries and automating conversations.',
      tags: ['WhatsApp', 'AI', 'Chatbot'],
      gradient: 'from-[#00d9ff] to-[#a855f7]',
      image: '💬',
      problem: 'Manual WhatsApp customer support was slow and inconsistent, requiring staff to handle repetitive inquiries round the clock.',
      solution: 'Built an AI-powered WhatsApp chatbot using OpenAI that handles customer queries automatically with natural conversations.',
      workflow: 'Customer message → AI analysis → Response generation → Send to WhatsApp → Track conversation',
      features: [
        'Natural language understanding',
        'Automated customer responses',
        'Conversation context awareness',
        'Multi-language support',
        'Message logging',
        'Easy escalation to humans',
      ],
      technologies: ['Make.com', 'OpenAI', 'WhatsApp', 'Webhook'],
      screenshots: ['Chat Interface', 'Automation Flow', 'Analytics'],
      challenges: [
        'Managed OpenAI API integration',
        'Ensured response quality and relevance',
        'Handled different user intents accurately',
      ],
      results: [
        'Automated customer support 24/7',
        'Faster response times',
        'Improved customer satisfaction',
        'Reduced support workload',
      ],
      github: '#',
      demo: '#',
    },
    {
      id: 3,
      title: 'AI Voice Agent',
      description: 'Voice AI assistant capable of handling customer conversations using AI.',
      tags: ['Voice AI', 'AI', 'Telephony'],
      gradient: 'from-[#a855f7] to-[#0099ff]',
      image: '🎤',
      problem: 'Handling voice calls and customer conversations manually was inefficient, with long wait times and resource constraints.',
      solution: 'Created an AI voice agent that can handle customer calls, answer questions, and manage conversations automatically.',
      workflow: 'Incoming call → Voice transcription → AI processing → Response generation → Voice output → Call handling',
      features: [
        'Real-time voice processing',
        'Natural speech synthesis',
        'Conversation understanding',
        'Multi-turn interactions',
        'Call routing capabilities',
        'Sentiment detection',
      ],
      technologies: ['Vapi', 'Retell AI', 'OpenAI', 'Make.com'],
      screenshots: ['Voice Dashboard', 'Call Analytics', 'Performance Metrics'],
      challenges: [
        'Optimized for real-time voice processing',
        'Ensured natural conversation flow',
        'Managed complex voice interactions',
      ],
      results: [
        'Automated voice customer support',
        ' 24/7 availability',
        'Reduced call handling time',
        'Improved customer experience',
      ],
      github: '#',
      demo: '#',
    },
    {
      id: 4,
      title: 'AI Email Personalizer',
      description: 'Generate personalized outreach emails automatically using AI.',
      tags: ['Email', 'AI', 'Personalization'],
      gradient: 'from-[#0099ff] to-[#a855f7]',
      image: '📧',
      problem: 'Creating personalized outreach emails for hundreds of prospects was extremely time-consuming and affected campaign effectiveness.',
      solution: 'Built an automated system that generates highly personalized emails using AI based on prospect data and preferences.',
      workflow: 'Prospect data → AI analysis → Personalization → Email generation → Review → Send',
      features: [
        'AI-powered personalization',
        'Dynamic subject lines',
        'Context-aware messaging',
        'A/B testing variants',
        'Batch processing',
        'Quality assurance checks',
      ],
      technologies: ['OpenAI', 'Make.com', 'Google Sheets', 'Gmail'],
      screenshots: ['Email Templates', 'Personalization Engine', 'Results'],
      challenges: [
        'Ensured email quality and relevance',
        'Managed batch processing at scale',
        'Balanced personalization with efficiency',
      ],
      results: [
        'Saved hours on email creation',
        'Higher open rates with personalization',
        'Increased response rates',
        'Scalable outreach campaigns',
      ],
      github: '#',
      demo: '#',
    },
    {
      id: 5,
      title: 'CRM Automation',
      description: 'Automatically manage leads, update CRM records and trigger follow-up workflows.',
      tags: ['CRM', 'Automation', 'Workflow'],
      gradient: 'from-[#a855f7] to-[#00d9ff]',
      image: '📊',
      problem: 'Manual CRM data entry and lead management were creating bottlenecks, with inconsistent follow-ups and data quality issues.',
      solution: 'Created a comprehensive CRM automation system that manages leads, updates records, and triggers intelligent follow-up workflows.',
      workflow: 'Lead entry → Auto-categorization → CRM update → Follow-up triggers → Tracking → Conversion monitoring',
      features: [
        'Automatic lead capture',
        'Smart categorization',
        'CRM record updates',
        'Follow-up automation',
        'Pipeline tracking',
        'Conversion analytics',
      ],
      technologies: ['Make.com', 'Google Sheets', 'Webhook', 'Gmail'],
      screenshots: ['CRM Dashboard', 'Automation Flow', 'Pipeline View'],
      challenges: [
        'Integrated with CRM systems',
        'Managed complex follow-up sequences',
        'Ensured data consistency',
      ],
      results: [
        'Eliminated manual CRM entry',
        'Consistent follow-up sequences',
        'Improved data quality',
        'Better lead management',
      ],
      github: '#',
      demo: '#',
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
    whileInView: { opacity: 1, scale: 1, y: 0 },
    whileHover: { y: -16, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } },
  };

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    
    if (selectedProject) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [selectedProject]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="relative w-full min-h-screen flex items-center justify-center py-24 px-4 md:px-8 bg-[#030712] overflow-hidden">
      {/* Section Background */}
      <SectionBackground variant="projects" />

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
              Featured Projects
            </span>
          </motion.h2>
          <motion.div className="h-1.5 w-24 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] mx-auto rounded-full mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Showcase of successful automation and AI integration solutions delivered
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              initial="initial"
              whileInView="whileInView"
              whileHover="whileHover"
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-[rgba(0,153,255,0.08)] to-[rgba(168,85,247,0.04)] border border-[rgba(0,217,255,0.15)] backdrop-blur-xl overflow-hidden hover:border-[rgba(0,217,255,0.4)] transition-all duration-500 cursor-pointer shadow-lg shadow-[rgba(0,153,255,0.05)] hover:shadow-[rgba(0,217,255,0.25)]"
              style={{ willChange: 'transform, border-color, box-shadow' }}
            >
              {/* Animated Border Glow */}
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
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${project.gradient}`}
              />

              {/* Project Icon with Zoom Effect */}
              <motion.div
                className="text-5xl mb-6 relative z-10 inline-block"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                whileHover={{ scale: 1.2 }}
              >
                {project.image}
              </motion.div>

              {/* Content */}
              <div className="relative z-10 space-y-5">
                <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-br from-[rgba(0,217,255,0.12)] to-[rgba(0,217,255,0.06)] border border-[rgba(0,217,255,0.2)] text-[#00d9ff] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Link */}
                <motion.button
                  whileHover={{ x: 6 }}
                  className="text-[#00d9ff] font-semibold text-sm flex items-center gap-2 group/btn pt-2"
                >
                  View Project
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </div>

              {/* Glow effect on hover */}
              <motion.div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-3xl bg-gradient-to-br ${project.gradient} pointer-events-none`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-24 text-center"
        >
          <p className="text-gray-400 mb-8 text-lg font-light">Interested in seeing more projects?</p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] text-white font-semibold rounded-lg shadow-lg shadow-[#00d9ff]/30 hover:shadow-[#00d9ff]/50 transition-all duration-300"
            style={{ willChange: 'transform, box-shadow' }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-50"
            />

            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-4 md:inset-8 z-50 flex flex-col max-h-[90vh] rounded-3xl bg-gradient-to-br from-[rgba(2,6,23,0.95)] to-[rgba(2,6,23,0.98)] border border-[rgba(0,217,255,0.2)] backdrop-blur-xl overflow-hidden shadow-2xl shadow-[rgba(0,153,255,0.3)]"
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-[rgba(0,217,255,0.1)]">
                <motion.h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0099ff] to-[#00d9ff] bg-clip-text text-transparent">
                  {selectedProject.title}
                </motion.h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-[#00d9ff] transition-colors p-2"
                >
                  ✕
                </motion.button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 md:p-8 space-y-8">
                  {/* Project Image/Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-8xl text-center mb-6"
                  >
                    {selectedProject.image}
                  </motion.div>

                  {/* Problem Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h3 className="text-xl font-bold text-[#00d9ff] mb-3 tracking-tight">🎯 Problem</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.problem}</p>
                  </motion.div>

                  {/* Solution Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-[#00d9ff] mb-3 tracking-tight">💡 Solution</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.solution}</p>
                  </motion.div>

                  {/* Workflow Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <h3 className="text-xl font-bold text-[#00d9ff] mb-3 tracking-tight">⚙️ Workflow</h3>
                    <div className="p-4 rounded-xl bg-[rgba(0,153,255,0.06)] border border-[rgba(0,217,255,0.1)]">
                      <p className="text-gray-300 text-sm leading-relaxed font-mono">{selectedProject.workflow}</p>
                    </div>
                  </motion.div>

                  {/* Features Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-xl font-bold text-[#00d9ff] mb-3 tracking-tight">✨ Features</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.05 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(0,217,255,0.08)] border border-[rgba(0,217,255,0.1)] hover:border-[rgba(0,217,255,0.3)] transition-colors"
                        >
                          <span className="text-[#00d9ff] mt-1">✓</span>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Technologies Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-xl font-bold text-[#00d9ff] mb-3 tracking-tight">🛠️ Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.05 }}
                          className="px-4 py-2 rounded-full bg-gradient-to-br from-[rgba(0,153,255,0.12)] to-[rgba(168,85,247,0.08)] border border-[rgba(0,217,255,0.2)] text-[#00d9ff] text-sm font-medium"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Screenshots Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <h3 className="text-xl font-bold text-[#00d9ff] mb-3 tracking-tight">📸 Screenshots</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedProject.screenshots.map((screenshot, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className="p-6 rounded-xl bg-gradient-to-br from-[rgba(0,153,255,0.08)] to-[rgba(168,85,247,0.04)] border border-[rgba(0,217,255,0.1)] hover:border-[rgba(0,217,255,0.3)] transition-all cursor-pointer flex items-center justify-center min-h-[120px]"
                        >
                          <span className="text-gray-400 text-sm text-center font-medium">{screenshot}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Challenges Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-bold text-[#00d9ff] mb-3 tracking-tight">🚧 Challenges Solved</h3>
                    <div className="space-y-2">
                      {selectedProject.challenges.map((challenge, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.05 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(0,217,255,0.06)] border border-[rgba(0,217,255,0.08)]"
                        >
                          <span className="text-[#a855f7] mt-1 text-lg">⚡</span>
                          <span className="text-gray-300 text-sm">{challenge}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Results Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                  >
                    <h3 className="text-xl font-bold text-[#00d9ff] mb-3 tracking-tight">📈 Results Achieved</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedProject.results.map((result, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.65 + idx * 0.05 }}
                          className="p-4 rounded-lg bg-gradient-to-br from-[rgba(0,153,255,0.1)] to-[rgba(168,85,247,0.06)] border border-[rgba(0,217,255,0.15)] hover:border-[rgba(0,217,255,0.3)] transition-colors"
                        >
                          <span className="text-gray-300 text-sm flex items-center gap-2">
                            <span className="text-[#00d9ff]">→</span>
                            {result}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Footer with Action Buttons */}
              <div className="border-t border-[rgba(0,217,255,0.1)] p-6 md:p-8 bg-gradient-to-r from-[rgba(0,153,255,0.04)] to-transparent flex flex-col md:flex-row gap-4 justify-end">
                {selectedProject.github && selectedProject.github !== '#' ? (
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-3 rounded-lg bg-[rgba(0,153,255,0.1)] border border-[rgba(0,217,255,0.3)] text-[#00d9ff] font-semibold hover:bg-[rgba(0,153,255,0.15)] hover:border-[rgba(0,217,255,0.5)] transition-all duration-300 text-center overflow-hidden"
                  >
                    {/* Ripple */}
                    <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10" initial={{ scale: 0 }} whileHover={{ scale: 2 }} transition={{ duration: 0.6 }} />
                    <span className="relative z-10">🔗 GitHub</span>
                  </motion.a>
                ) : (
                  <motion.button
                    disabled
                    whileHover={{ scale: 1 }}
                    className="px-8 py-3 rounded-lg bg-[rgba(100,116,139,0.15)] border border-[rgba(100,116,139,0.3)] text-gray-500 font-semibold cursor-not-allowed transition-all duration-300 text-center"
                  >
                    🔗 Coming Soon
                  </motion.button>
                )}
                
                {selectedProject.demo && selectedProject.demo !== '#' ? (
                  <motion.a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-3 rounded-lg bg-gradient-to-r from-[#0099ff] to-[#00d9ff] text-white font-semibold shadow-lg shadow-[#00d9ff]/30 hover:shadow-[#00d9ff]/50 transition-all duration-300 text-center overflow-hidden"
                  >
                    {/* Ripple */}
                    <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20" initial={{ scale: 0 }} whileHover={{ scale: 2 }} transition={{ duration: 0.6 }} />
                    <span className="relative z-10">🚀 Live Demo</span>
                  </motion.a>
                ) : (
                  <motion.button
                    disabled
                    whileHover={{ scale: 1 }}
                    className="px-8 py-3 rounded-lg bg-[rgba(100,116,139,0.15)] border border-[rgba(100,116,139,0.3)] text-gray-500 font-semibold cursor-not-allowed transition-all duration-300 text-center"
                  >
                    ⏳ Coming Soon
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Book Call Modal */}
      <BookCallModal isOpen={isBookCallOpen} onClose={() => setIsBookCallOpen(false)} />

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,217,255,0.2)] to-transparent" />
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
