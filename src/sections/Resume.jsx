import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const resumeHighlights = [
  'AI Automation Engineer',
  'n8n workflow design',
  'API integrations',
  'AI-assisted workflows',
  'Responsive web development',
  'Business process automation',
];

const resumeQualities = [
  'Built 50+ automation workflows across intake, routing, data handling, notifications, and AI-assisted processes.',
  'Connected APIs, webhooks, and data sources to create practical workflows that are observable and maintainable.',
  'Created responsive portfolio and business websites with clear structure, interactions, and strong conversion-focused presentation.',
];

const Resume = memo(() => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="resume" className="relative overflow-hidden bg-[#060b17] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),_transparent_32%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="section-kicker">Resume</p>
          <h2 className="mt-4 text-[clamp(2.2rem,4vw,3.8rem)] font-semibold tracking-[-0.05em] text-white">
            Professional profile, packaged for recruiters.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            A clean ATS-friendly resume, an accessible PDF download, and a premium on-site preview that stays aligned with the portfolio&apos;s visual identity.
          </p>
        </motion.header>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-12 grid gap-8 rounded-[2rem] border border-white/10 bg-[#0a1222]/80 p-6 shadow-[0_30px_90px_rgba(2,6,23,0.45)] backdrop-blur-xl lg:grid-cols-[1.2fr_0.8fr] lg:p-8"
        >
          <div className="rounded-[1.5rem] border border-cyan-300/15 bg-[#06111b] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Diksha Chauhan</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">AI Automation Engineer</h3>
              </div>
              <span className="rounded-full border border-violet-300/30 bg-violet-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200">
                n8n specialist
              </span>
            </div>

            <div className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm leading-7 text-slate-300">
              <p>
                <span className="font-semibold text-slate-100">Professional focus:</span> Workflow engineering, AI-driven automation, API integrations, structured data handling, and responsive digital experiences.
              </p>
              <p>
                <span className="font-semibold text-slate-100">Verified scope:</span> Built 50+ automation workflows, working with n8n, Make.com, webhooks, REST APIs, AI services, and database-backed process flows.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {resumeHighlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium tracking-[0.08em] text-slate-200 uppercase">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Resume snapshot</p>
            <div className="mt-6 space-y-4">
              {resumeQualities.map((quality) => (
                <div key={quality} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-sm leading-7 text-slate-300">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" aria-hidden="true" />
                  <span>{quality}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 text-sm font-semibold text-cyan-50 transition hover:border-cyan-300/50 hover:bg-cyan-300/15"
          >
            View Resume
          </a>
          <a
            href="/resume.pdf"
            download="Diksha_Chauhan_AI_Automation_Engineer_Resume.pdf"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/5"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
});

Resume.displayName = 'Resume';

export default Resume;
