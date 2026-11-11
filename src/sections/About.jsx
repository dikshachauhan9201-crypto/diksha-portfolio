import { memo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import LiquidAuroraBackground from '../components/LiquidAuroraBackground';

const journey = [
  {
    label: '01 · Foundations',
    title: 'Mapping repeatable work',
    description: 'Started by turning repetitive steps into clear triggers, actions, and hand-offs.',
  },
  {
    label: '02 · Orchestration',
    title: 'Building in n8n',
    description: 'Made n8n the primary workspace for multi-step logic, branching, and connected services.',
  },
  {
    label: '03 · Integrations',
    title: 'Connecting the stack',
    description: 'Expanded into APIs, webhooks, databases, messaging tools, and useful AI services.',
  },
  {
    label: '04 · Reliability',
    title: 'Testing the full path',
    description: 'Now focus on validation, failure paths, debugging, and workflows that remain understandable.',
  },
];

const systemSteps = [
  { number: '01', label: 'Trigger', detail: 'Form, webhook, schedule' },
  { number: '02', label: 'Orchestrate', detail: 'n8n logic and routing' },
  { number: '03', label: 'Connect', detail: 'APIs, data, AI services' },
  { number: '04', label: 'Deliver', detail: 'Action, record, notification' },
];

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const About = memo(() => {
  const reduceMotion = useReducedMotion();
  const journeyRef = useRef(null);
  const { scrollYProgress: journeyProgress } = useScroll({
    target: journeyRef,
    offset: ['start 85%', 'end 38%'],
  });
  const journeyLineProgress = useTransform(journeyProgress, [0, 0.86, 1], [0, 0.92, 1]);

  return (
    <section id="about" className="relative overflow-hidden border-y border-white/[0.06] bg-[#050a18] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <LiquidAuroraBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header
          variants={reveal}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <p className="section-kicker">About the work</p>
            <h2 className="mt-4 max-w-[15ch] text-[clamp(2rem,3.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-slate-50 text-balance">
              Automation built around how information moves.
            </h2>
          </div>
          <p className="max-w-[30rem] text-base leading-8 text-slate-300 sm:text-lg">
            I&apos;m Diksha Chauhan, an AI Automation Engineer. I use n8n as my primary platform to connect APIs, data sources, databases, and AI services into practical workflows that teams can follow and maintain.
          </p>
        </motion.header>

        <div className="grid gap-8 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.article
            variants={reveal}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-2xl"
          >
            <p className="text-xl leading-9 text-slate-100 sm:text-2xl sm:leading-10">
              The goal is not to add AI for decoration. It is to understand the process, remove repetitive work, and make each hand-off explicit.
            </p>
            <div className="mt-8 space-y-5 text-base leading-8 text-slate-400">
              <p>
                My work covers workflow logic, API and webhook integrations, data movement, conditional routing, notifications, and AI-assisted processing where it has a clear role.
              </p>
              <p>
                I care about what happens when data is incomplete, a service fails, or a workflow needs to be debugged later. That systems view shapes how I design and document each automation.
              </p>
              <p>
                Alongside automation, I build responsive websites and digital experiences with clear structure and forms that can connect to the workflows behind them.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] px-5 py-4">
                <strong className="block text-3xl font-semibold tracking-tight text-white">50+</strong>
                <span className="text-sm text-cyan-100/80">workflows built</span>
              </div>
              <a
                href="/resume.pdf"
                download="Diksha-Chauhan-Resume.pdf"
                aria-label="Download Diksha Chauhan's resume as a PDF"
                className="focus-ring inline-flex min-h-12 items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/50 px-5 text-sm font-semibold text-white shadow-lg transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-100" aria-hidden="true">↓</span>
                <span className="text-left">
                  <span className="block">Resume</span>
                  <span className="mt-0.5 block text-[11px] font-normal text-slate-400">PDF · Download</span>
                </span>
              </a>
            </div>
          </motion.article>

          <motion.div
            variants={reveal}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative rounded-[2rem] border border-violet-200/15 bg-[#080b18] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] sm:p-8"
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">System pattern</p>
                <h3 className="mt-2 text-xl font-semibold text-white">From signal to useful action</h3>
              </div>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">n8n first</span>
            </div>
            <div className="space-y-3">
              {systemSteps.map((step, index) => (
                <div key={step.number} className="group relative grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.055]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 font-mono text-xs text-cyan-200">{step.number}</span>
                  <div>
                    <p className="font-semibold text-slate-100">{step.label}</p>
                    <p className="mt-1 text-sm text-slate-400">{step.detail}</p>
                  </div>
                  {index < systemSteps.length - 1 && <span className="absolute -bottom-4 left-9 z-10 h-5 w-px bg-gradient-to-b from-cyan-300/50 to-transparent" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div id="journey" ref={journeyRef} className="relative scroll-mt-28 border-t border-white/10 pt-14">
          <motion.div
            variants={reveal}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-10 max-w-2xl"
          >
            <p className="section-kicker">Automation journey</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">A practice built one connected system at a time.</h3>
          </motion.div>
          <ol className="relative grid gap-4 lg:grid-cols-4">
            <motion.span
              className="pointer-events-none absolute bottom-6 left-[1.15rem] top-6 w-px origin-top bg-gradient-to-b from-cyan-200/75 via-violet-300/45 to-transparent lg:hidden"
              style={{ scaleY: reduceMotion ? 1 : journeyLineProgress }}
              aria-hidden="true"
            />
            <span className="pointer-events-none absolute left-[8%] right-[8%] top-6 hidden h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent lg:block" aria-hidden="true" />
            <motion.span
              className="pointer-events-none absolute left-[8%] right-[8%] top-6 hidden h-px origin-left bg-gradient-to-r from-cyan-200/75 via-violet-300/55 to-cyan-200/15 lg:block"
              style={{ scaleX: reduceMotion ? 1 : journeyLineProgress }}
              aria-hidden="true"
            />
            {journey.map((item, index) => (
              <motion.li
                key={item.label}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.2 } }}
                onPointerMove={(event) => {
                  if (event.pointerType === 'touch') return;
                  const bounds = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
                  event.currentTarget.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
                }}
                onPointerLeave={(event) => {
                  event.currentTarget.style.removeProperty('--pointer-x');
                  event.currentTarget.style.removeProperty('--pointer-y');
                }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.08 }}
                className="pointer-light relative rounded-2xl border border-white/[0.08] bg-[#0b0a18]/90 p-5 pl-14 transition-colors hover:border-violet-300/20 lg:pl-5"
              >
                <span className="absolute left-4 top-5 z-10 grid h-3 w-3 place-items-center rounded-full border border-cyan-200/70 bg-[#07101f] shadow-[0_0_14px_rgba(103,232,249,.18)] lg:left-5">
                  <span className="h-1 w-1 rounded-full bg-cyan-200" />
                </span>
                <span className="relative z-10 inline-flex rounded-full border border-violet-300/20 bg-[#100e20] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-violet-100">{item.label}</span>
                <h4 className="mt-5 text-lg font-semibold text-white">{item.title}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;
