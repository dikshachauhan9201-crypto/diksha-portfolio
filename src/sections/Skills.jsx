import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import BookCallModal from '../components/BookCallModal';

const Skills = memo(() => {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  const skillCategories = [
    {
      category: 'Automation',
      skills: ['Make.com', 'Zapier', 'IFTTT', 'n8n', 'Custom Workflows'],
    },
    {
      category: 'AI & ML',
      skills: ['ChatGPT', 'Claude', 'OpenAI API', 'LLMs', 'AI Integration'],
    },
    {
      category: 'Integration',
      skills: ['REST APIs', 'Webhooks', 'OAuth', 'Graph APIs', 'Custom Scripts'],
    },
    {
      category: 'Platforms',
      skills: ['CRM Systems', 'Email Marketing', 'Project Management', 'Data Tools', 'Analytics'],
    },
    {
      category: 'Technical',
      skills: ['JavaScript', 'Python', 'JSON', 'SQL', 'Debugging'],
    },
    {
      category: 'Business',
      skills: ['Process Analysis', 'Consulting', 'Project Management', 'Documentation', 'Training'],
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

  const skillBadgeVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { scale: 1.12, y: -6 },
  };

  return (
    <section id="skills" className="relative w-full min-h-screen flex items-center justify-center py-24 px-4 md:px-8 bg-[#030712] overflow-hidden">
      {/* Section Background */}
      <SectionBackground variant="skills" />

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
              Skills & Expertise
            </span>
          </motion.h2>
          <motion.div className="h-1.5 w-24 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] mx-auto rounded-full mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            A comprehensive toolkit of automation, AI, and integration expertise
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-[rgba(0,153,255,0.08)] to-[rgba(168,85,247,0.04)] border border-[rgba(0,217,255,0.15)] backdrop-blur-xl hover:border-[rgba(0,217,255,0.4)] transition-all duration-400 shadow-lg shadow-[rgba(0,153,255,0.05)] hover:shadow-[rgba(0,217,255,0.15)] overflow-hidden"
              style={{ willChange: 'transform, border-color, box-shadow' }}
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(45deg, transparent, rgba(0,217,255,0.08), transparent)',
                  backgroundSize: '200% 200%',
                }}
              />
              {/* Category Title */}
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: categoryIndex * 0.1 + 0.15 }}
                className="text-xl font-bold mb-6 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] bg-clip-text text-transparent tracking-wide relative z-10"
              >
                {category.category}
              </motion.h3>

              {/* Skills */}
              <div className="flex flex-wrap gap-3 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    variants={skillBadgeVariants}
                    initial="initial"
                    whileInView="animate"
                    whileHover="whileHover"
                    viewport={{ once: true }}
                    transition={{
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      duration: 0.4,
                    }}
                    className="px-4 py-2.5 rounded-full bg-gradient-to-br from-[rgba(0,217,255,0.12)] to-[rgba(0,217,255,0.06)] border border-[rgba(0,217,255,0.25)] text-sm text-[#00d9ff] hover:border-[rgba(0,217,255,0.5)] hover:bg-gradient-to-br hover:from-[rgba(0,217,255,0.2)] hover:to-[rgba(0,217,255,0.12)] transition-all duration-300 shadow-lg shadow-[rgba(0,217,255,0.1)] hover:shadow-[rgba(0,217,255,0.2)] font-medium cursor-default"
                    style={{ willChange: 'transform, background-color, border-color' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Proficiency Overview */}
        <motion.div
          variants={itemVariants}
          className="mt-24 p-12 rounded-2xl bg-gradient-to-br from-[rgba(0,153,255,0.08)] to-[rgba(168,85,247,0.04)] border border-[rgba(0,217,255,0.12)] backdrop-blur-xl shadow-lg shadow-[rgba(0,153,255,0.05)]"
        >
          <h3 className="text-2xl font-bold mb-10 text-white tracking-tight">Core Proficiencies</h3>

          <div className="space-y-8">
            {[
              { label: 'Workflow Automation', value: 95 },
              { label: 'AI Integration', value: 90 },
              { label: 'API Development', value: 88 },
              { label: 'Problem Solving', value: 92 },
            ].map((skill, index) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between mb-3">
                  <span className="text-gray-300 font-semibold tracking-wide">{skill.label}</span>
                  <span className="text-[#00d9ff] font-bold">{skill.value}%</span>
                </div>

                {/* Progress Bar */}
                <div className="h-2.5 bg-[rgba(0,217,255,0.08)] rounded-full overflow-hidden border border-[rgba(0,217,255,0.1)]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#0099ff] to-[#00d9ff] rounded-full shadow-lg shadow-[#00d9ff]/30"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    style={{ willChange: 'width' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Book Call Modal */}
      <BookCallModal isOpen={isBookCallOpen} onClose={() => setIsBookCallOpen(false)} />

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,217,255,0.2)] to-transparent" />
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;
