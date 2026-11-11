import { memo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import PointerGlow from '../components/PointerGlow';
import TechnologyConstellation from '../components/TechnologyConstellation';
import { scrollToAndHighlight } from '../utils/scroll';

const capabilityGroups = [
  { label: 'AI Automation & Workflow Engineering', eyebrow: 'Orchestrate', accent: 'cyan', mark: 'n8n', skills: ['n8n', 'Make.com', 'Conditional routing', 'Error paths'] },
  { label: 'AI & LLM Integrations', eyebrow: 'Interpret', accent: 'violet', mark: 'AI', skills: ['OpenAI', 'AI agents', 'Classification', 'Content processing'] },
  { label: 'APIs & Webhooks', eyebrow: 'Connect', accent: 'blue', mark: 'API', skills: ['REST APIs', 'Webhooks', 'Data mapping', 'Application integrations'] },
  { label: 'Databases & Data Management', eyebrow: 'Structure', accent: 'amber', mark: 'DB', skills: ['Google Sheets', 'Databases', 'Gmail', 'CRM workflows'] },
  { label: 'Website Development', eyebrow: 'Build', accent: 'pink', mark: '</>', skills: ['JavaScript', 'React', 'Tailwind CSS', 'Vercel'] },
  { label: 'Creative & Digital Skills', eyebrow: 'Refine', accent: 'emerald', mark: 'DIG', skills: ['Git', 'GitHub', 'Testing & documentation', 'Responsive UI'] },
];

const workflowFlashcards = [
  {
    label: '01 / Intake',
    title: 'Start with a clean signal',
    principle: 'Validate the payload before routing.',
    scenario: 'A form or webhook starts a flow; required fields and formats are checked before anything downstream runs.',
    tools: ['Webhooks', 'Validation'],
    tone: 'cyan',
  },
  {
    label: '02 / Orchestration',
    title: 'Make each step legible',
    principle: 'Name the work; branch with intent.',
    scenario: 'In n8n, keep the main path readable and give conditional branches clear, testable reasons to exist.',
    tools: ['n8n', 'Make.com'],
    tone: 'violet',
  },
  {
    label: '03 / API design',
    title: 'Treat APIs as contracts',
    principle: 'Map inputs and outputs explicitly.',
    scenario: 'Translate fields at the boundary, handle missing values, and keep the expected request and response shape clear.',
    tools: ['REST APIs', 'Data mapping'],
    tone: 'blue',
  },
  {
    label: '04 / AI assist',
    title: 'Give AI a bounded job',
    principle: 'Use structured output and a review path.',
    scenario: 'Ask an AI step to classify or draft against supplied context, then check its output before a consequential action.',
    tools: ['OpenAI', 'Human review'],
    tone: 'pink',
  },
  {
    label: '05 / Data',
    title: 'Keep records consistent',
    principle: 'Normalize once; reuse the same fields.',
    scenario: 'Map incoming information to a predictable structure before storing it in a sheet, CRM, or other destination.',
    tools: ['Google Sheets', 'CRM'],
    tone: 'amber',
  },
  {
    label: '06 / Integrations',
    title: 'Connect the whole hand-off',
    principle: 'Carry only the context the next step needs.',
    scenario: 'Pass useful, relevant details between messaging, calendar, email, and workflow services without losing the thread.',
    tools: ['Gmail', 'Google Calendar'],
    tone: 'emerald',
  },
  {
    label: '07 / Reliability',
    title: 'Design the failure path',
    principle: 'Make exceptions visible and recoverable.',
    scenario: 'Plan for timeouts and incomplete data with clear error routes, useful alerts, and safe retry decisions.',
    tools: ['Error routes', 'Retry logic'],
    tone: 'orange',
  },
  {
    label: '08 / QA',
    title: 'Test the branches, not just the demo',
    principle: 'Check edge cases before hand-off.',
    scenario: 'Exercise normal, missing-data, and failure scenarios; document what the workflow should do in each one.',
    tools: ['Test cases', 'Documentation'],
    tone: 'teal',
  },
  {
    label: '09 / Delivery',
    title: 'Keep a person in the loop',
    principle: 'Ask for approval where it matters.',
    scenario: 'Route drafts, uncertain classifications, or sensitive updates through a human checkpoint before delivery.',
    tools: ['Approval step', 'Audit trail'],
    tone: 'fuchsia',
  },
  {
    label: '10 / Improvement',
    title: 'Measure the process, then refine it',
    principle: 'Use observable steps to find friction.',
    scenario: 'Track where a workflow pauses or fails, then improve the specific hand-off instead of adding complexity everywhere.',
    tools: ['Workflow logs', 'Iteration'],
    tone: 'indigo',
  },
];

const n8nWorkflow = [
  {
    name: 'Trigger',
    symbol: '↯',
    eyebrow: '01 / INTAKE',
    summary: 'Receive a form submission or webhook event.',
    detail: 'Start from a clear event boundary. Capture the original payload and keep its source available for tracing.',
    technology: 'n8n Webhook',
    input: 'Form or event payload',
    output: 'Normalized event',
    accent: 'cyan',
  },
  {
    name: 'Validation',
    symbol: '✓',
    eyebrow: '02 / GUARD',
    summary: 'Check required fields and normalize the record.',
    detail: 'Validate required values and expected formats before calling downstream services; route incomplete data to a safe exception path.',
    technology: 'n8n IF / Code',
    input: 'Normalized event',
    output: 'Valid record or exception',
    accent: 'blue',
  },
  {
    name: 'AI decision',
    symbol: 'AI',
    eyebrow: '03 / INTERPRET',
    summary: 'Classify intent with a bounded AI step.',
    detail: 'Use structured output for classification or drafting, then route uncertainty to a person instead of guessing.',
    technology: 'OpenAI · structured output',
    input: 'Validated context',
    output: 'Decision with confidence',
    accent: 'violet',
  },
  {
    name: 'Supabase',
    symbol: 'DB',
    eyebrow: '04 / PERSIST',
    summary: 'Store the result in a consistent data shape.',
    detail: 'Upsert a structured record with a stable identifier so later steps can reference the same decision and its status.',
    technology: 'Supabase · proposed',
    input: 'Decision and source ID',
    output: 'Stored record',
    accent: 'emerald',
  },
  {
    name: 'Action / notify',
    symbol: '↗',
    eyebrow: '05 / HAND-OFF',
    summary: 'Send the next action or request human review.',
    detail: 'Notify the right destination with only the context it needs; keep approval in the loop for consequential actions.',
    technology: 'Email / CRM · configurable',
    input: 'Stored record and route',
    output: 'Notification or approval',
    accent: 'amber',
  },
];

const workflowAccents = {
  cyan: 'border-cyan-200/35 bg-cyan-200/[0.09] text-cyan-100',
  blue: 'border-sky-200/35 bg-sky-200/[0.09] text-sky-100',
  violet: 'border-violet-200/35 bg-violet-200/[0.09] text-violet-100',
  emerald: 'border-emerald-200/35 bg-emerald-200/[0.09] text-emerald-100',
  amber: 'border-amber-200/35 bg-amber-200/[0.09] text-amber-100',
};

const toneClasses = {
  cyan: 'border-cyan-300/25 bg-cyan-300/[0.07] text-cyan-200',
  violet: 'border-violet-300/25 bg-violet-300/[0.07] text-violet-200',
  blue: 'border-blue-300/25 bg-blue-300/[0.07] text-blue-200',
  pink: 'border-pink-300/25 bg-pink-300/[0.07] text-pink-200',
  amber: 'border-amber-300/25 bg-amber-300/[0.07] text-amber-200',
  emerald: 'border-emerald-300/25 bg-emerald-300/[0.07] text-emerald-200',
  orange: 'border-orange-300/25 bg-orange-300/[0.07] text-orange-200',
  teal: 'border-teal-300/25 bg-teal-300/[0.07] text-teal-200',
  fuchsia: 'border-fuchsia-300/25 bg-fuchsia-300/[0.07] text-fuchsia-200',
  indigo: 'border-indigo-300/25 bg-indigo-300/[0.07] text-indigo-200',
};

const Skills = memo(() => {
  const reduceMotion = useReducedMotion();
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const [previewFlashcard, setPreviewFlashcard] = useState(null);
  const [selectedStep, setSelectedStep] = useState(2);
  const [hoveredStep, setHoveredStep] = useState(null);
  const activeStep = hoveredStep ?? selectedStep;
  const currentWorkflowStep = n8nWorkflow[activeStep];

  return (
    <section id="skills" className="relative overflow-hidden bg-[#050a18] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <SectionBackground variant="skills" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="section-kicker">Capability map</p>
          <h2 className="section-title mt-4">The tools behind the systems.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">A practical stack for orchestrating workflows, moving data safely, and adding AI where it improves the process.</p>
        </motion.header>

        <TechnologyConstellation />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-14 overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[#080d18] shadow-[0_32px_90px_rgba(0,0,0,.24)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_82%_0%,rgba(139,92,246,.11),transparent_44%),linear-gradient(135deg,transparent_35%,rgba(103,232,249,.025))]" aria-hidden="true" />
          <div className="relative z-10 border-b border-white/[0.08] px-6 py-6 sm:px-8 sm:py-7 lg:px-10">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Workflow lab · illustrative architecture
                </span>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">n8n<span className="text-emerald-300">.</span></h3>
                  <p className="text-sm font-medium text-slate-300 sm:text-base">From intake to a human-ready action.</p>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  Explore one proposed pattern: validate incoming data, use AI for a bounded decision, persist the record, then route a clear hand-off.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-2 text-[10px] uppercase tracking-[0.13em] text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />
                Select a node
              </span>
            </div>
          </div>

          <div className="relative z-10 px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
            <div className="relative">
              <svg className="pointer-events-none absolute inset-x-0 top-[1.35rem] hidden h-12 w-full overflow-visible lg:block" viewBox="0 0 1000 48" preserveAspectRatio="none" aria-hidden="true">
                {n8nWorkflow.slice(0, -1).map((step, index) => {
                  const start = 100 + index * 200;
                  const end = start + 200;
                  const highlighted = index <= activeStep;

                  return (
                    <g key={step.name}>
                      <motion.path
                        d={`M ${start} 24 H ${end}`}
                        fill="none"
                        stroke={highlighted ? '#67e8f9' : 'rgba(148,163,184,.22)'}
                        strokeWidth={highlighted ? 1.5 : 1}
                        strokeDasharray={highlighted ? 'none' : '3 6'}
                        animate={{ opacity: highlighted ? 0.85 : 0.55 }}
                        transition={{ duration: 0.25 }}
                      />
                      {!reduceMotion && (
                        <motion.circle
                          cx={start + 10}
                          cy="24"
                          r="2.5"
                          fill={highlighted ? '#cffafe' : '#a5b4fc'}
                          animate={{ x: [0, end - start - 20] }}
                          transition={{ duration: 1.6, delay: index * 0.13, repeat: Infinity, repeatDelay: 2.1, ease: 'linear' }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              <div className="grid gap-3 lg:grid-cols-5 lg:gap-2">
                {n8nWorkflow.map((step, index) => {
                  const isActive = index === activeStep;
                  const isNext = index === activeStep + 1;

                  return (
                    <div key={step.name} className="relative">
                      <button
                        type="button"
                        aria-pressed={index === selectedStep}
                        aria-label={`${step.name}: ${step.summary} Click to explore details.`}
                        onMouseEnter={() => setHoveredStep(index)}
                        onMouseLeave={() => setHoveredStep(null)}
                        onFocus={() => setHoveredStep(index)}
                        onBlur={() => setHoveredStep(null)}
                        onClick={() => setSelectedStep(index)}
                        className={`focus-ring group relative flex min-h-[76px] w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-[border-color,background-color,box-shadow,transform] duration-300 lg:min-h-[132px] lg:flex-col lg:items-center lg:justify-start lg:gap-0 lg:px-2 lg:pb-4 lg:pt-1 lg:text-center ${
                          isActive
                            ? 'z-20 border-cyan-200/35 bg-[#101827] shadow-[0_12px_34px_rgba(34,211,238,.09)]'
                            : isNext
                              ? 'z-10 border-cyan-200/20 bg-cyan-200/[0.035]'
                            : 'z-0 border-white/[0.07] bg-[#0b111d]/90 hover:border-white/15'
                        } ${!reduceMotion ? 'hover:-translate-y-0.5' : ''}`}
                      >
                        <span className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl border font-mono text-xs font-semibold transition-[transform,box-shadow] duration-300 lg:h-12 lg:w-12 ${
                          isActive
                            ? workflowAccents[step.accent]
                            : 'border-white/10 bg-slate-950/80 text-slate-400'
                        } ${isActive && !reduceMotion ? 'scale-[1.06] shadow-[0_0_22px_rgba(103,232,249,.13)]' : ''}`}>
                          {step.symbol}
                          {isActive && !reduceMotion && <motion.span className="absolute inset-[-5px] rounded-[1rem] border border-cyan-100/15" initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: [0.25, 0.7, 0.25], scale: [0.96, 1.08, 0.96] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true" />}
                        </span>
                        <span className="min-w-0 lg:mt-3">
                          <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">{step.eyebrow}</span>
                          <span className={`mt-1 block text-sm font-semibold leading-5 ${isActive ? 'text-white' : 'text-slate-300'}`}>{step.name}</span>
                          <span className="mt-1 hidden text-[10px] leading-4 text-slate-500 lg:block">{step.summary}</span>
                          {isNext && <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-200/65 lg:block">Next step</span>}
                        </span>
                        <span className="ml-auto text-[10px] text-slate-500 lg:hidden" aria-hidden="true">↗</span>
                      </button>
                      {index < n8nWorkflow.length - 1 && (
                        <span className="pointer-events-none absolute -bottom-[0.8rem] left-1/2 z-10 -translate-x-1/2 text-xs text-cyan-100/55 lg:hidden" aria-hidden="true">↓</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <motion.div
              key={currentWorkflowStep.name}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.24 }}
              className="mt-5 grid gap-5 rounded-xl border border-white/[0.08] bg-black/20 p-5 sm:grid-cols-[1.2fr_1fr] sm:items-center sm:p-6"
              aria-live="polite"
            >
              <div>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${workflowAccents[currentWorkflowStep.accent].split(' ').at(-1)}`}>{currentWorkflowStep.eyebrow} · {currentWorkflowStep.technology}</p>
                <h4 className="mt-2 text-base font-semibold text-white">{currentWorkflowStep.name}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">{currentWorkflowStep.detail}</p>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                  <dt className="text-[9px] uppercase tracking-[0.14em] text-slate-600">Input</dt>
                  <dd className="mt-1.5 leading-5 text-slate-300">{currentWorkflowStep.input}</dd>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                  <dt className="text-[9px] uppercase tracking-[0.14em] text-slate-600">Output</dt>
                  <dd className="mt-1.5 leading-5 text-slate-300">{currentWorkflowStep.output}</dd>
                </div>
              </dl>
            </motion.div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-xl text-[11px] leading-5 text-slate-500">Illustrative workflow pattern—not a claim of a deployed Supabase integration. Adapt connectors, review gates, and error routes to the actual process.</p>
              <button type="button" onClick={() => scrollToAndHighlight('projects')} className="focus-ring inline-flex min-h-10 items-center rounded-full border border-cyan-200/25 bg-cyan-200/[0.06] px-4 text-xs font-semibold text-cyan-100 transition hover:border-cyan-100/40 hover:bg-cyan-200/[0.12]">
                Explore related case studies <span className="ml-2" aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {capabilityGroups.map((group, index) => (
              <PointerGlow key={group.label} tilt className="rounded-2xl">
                <motion.article
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={reduceMotion ? undefined : { y: -4, scale: 1.005 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: reduceMotion ? 0 : index * 0.07 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="portfolio-hover-card group rounded-2xl border border-white/[0.08] bg-[#0b0a18]/90 p-5 sm:p-6"
                >
                <div className="flex items-center justify-between gap-3">
                  <span className={`grid h-10 min-w-10 place-items-center rounded-xl border px-2 font-mono text-xs font-semibold ${toneClasses[group.accent]}`}>{group.mark}</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-slate-600">{group.eyebrow}</span>
                </div>
                <h3 className="mt-5 min-h-12 max-w-[24ch] text-base font-semibold leading-6 text-white">{group.label}</h3>
                <ul className="mt-4 space-y-2">
                  {group.skills.map((skill) => <li key={skill} className="flex items-start gap-2.5 text-xs leading-5 text-slate-400"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-500 transition group-hover:bg-cyan-200" />{skill}</li>)}
                </ul>
                </motion.article>
              </PointerGlow>
            ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 text-xs text-slate-500">
          <span className="text-slate-300">Also in the toolkit</span><span>Make.com</span><span>Google Calendar</span><span>WhatsApp</span><span>Tailwind CSS</span><span>GitHub</span>
        </div>

        <div className="mt-16 border-t border-white/10 pt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Quick reference</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Workflow flashcards</h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-400">Ten small patterns for building workflows that are clear, connected, and easier to trust. Hover to inspect; click, tap, or press Enter to flip.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {workflowFlashcards.map((card, index) => {
              const isSelected = selectedFlashcard === index;
              const isActive = isSelected || previewFlashcard === index;

              return (
                <PointerGlow key={card.label} tilt className={`rounded-2xl ${toneClasses[card.tone]}`}>
                  <motion.button
                    type="button"
                    aria-pressed={isSelected}
                    aria-label={`${isSelected ? 'Show front' : 'Show details'}: ${card.title}`}
                    onPointerEnter={(event) => {
                      if (event.pointerType !== 'touch') setPreviewFlashcard(index);
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType !== 'touch') {
                        setPreviewFlashcard((current) => current === index ? null : current);
                      }
                    }}
                    onClick={() => setSelectedFlashcard(isSelected ? null : index)}
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.005 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
                    style={{ transformStyle: 'preserve-3d' }}
                className={`focus-ring group relative z-0 min-h-[250px] w-full overflow-hidden rounded-2xl border border-white/[0.08] text-left [perspective:1000px] ${reduceMotion ? '' : 'transform-gpu transition-[box-shadow,transform] duration-300 hover:z-20 hover:shadow-[0_24px_60px_rgba(103,232,249,.14)] focus-visible:z-20 focus-visible:-translate-y-1 focus-visible:scale-[1.02] focus-visible:shadow-[0_24px_60px_rgba(103,232,249,.14)]'} ${toneClasses[card.tone]}`}
              >
              <motion.span
                className="relative grid min-h-[250px] w-full [transform-style:preserve-3d]"
                animate={reduceMotion ? undefined : { rotateY: isActive ? 180 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : Math.min(index * 0.08, 0.32) }}
              >
                <span
                  aria-hidden={isActive}
                  className={`col-start-1 row-start-1 flex min-h-[250px] flex-col justify-between rounded-2xl border border-white/[0.09] bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.18),transparent_28%),linear-gradient(135deg,#101426,#07101f)] p-5 shadow-[0_18px_36px_rgba(15,23,42,0.35)] transition-all duration-300 group-hover:border-current/35 ${reduceMotion && isActive ? 'invisible' : ''}`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-300">{card.label}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-current/25 bg-current/[0.08] text-lg font-semibold text-white">{String(index + 1).padStart(2, '0')}</span>
                  </span>
                  <span>
                    <span className="block text-lg font-semibold leading-snug text-white">{card.title}</span>
                    <span className="mt-3 block text-xs leading-5 text-slate-200/90">{card.principle}</span>
                    <span className="mt-4 block text-[10px] font-medium uppercase tracking-[0.14em] text-cyan-100 transition group-hover:text-cyan-100">Click to explore <span aria-hidden="true">↗</span></span>
                  </span>
                </span>
                <span
                  aria-hidden={!isActive}
                  className={`col-start-1 row-start-1 flex min-h-[250px] flex-col justify-between rounded-2xl border border-current/30 bg-[linear-gradient(135deg,#091a2e,#0b1728_40%,#081722)] p-5 shadow-[0_18px_40px_rgba(34,211,238,0.08)] ${reduceMotion && !isActive ? 'invisible' : ''}`}
                  style={{ transform: reduceMotion ? 'none' : 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200">{card.label}</span>
                  <span className="text-sm leading-6 text-slate-100">{card.scenario}</span>
                  <span>
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.14em] text-slate-300">Useful with</span>
                    <span className="flex flex-wrap gap-2">{card.tools.map((tool) => <span key={tool} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-slate-200">{tool}</span>)}</span>
                    <span className="mt-4 block text-[10px] font-medium text-slate-300">Press to flip back</span>
                  </span>
                </span>
              </motion.span>
              </motion.button>
                </PointerGlow>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';
export default Skills;
