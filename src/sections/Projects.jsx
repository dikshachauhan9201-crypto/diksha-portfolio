import { memo, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import PointerGlow from '../components/PointerGlow';
import ScrollFan from '../components/ScrollFan';

const projects = [
  {
    id: 'lead-qualification',
    title: 'AI Lead Qualification System',
    summary: 'Classifies inbound leads and routes the right follow-up path from one connected workflow.',
    status: 'Built',
    category: 'AI + Sales Operations',
    stack: ['Webhook', 'OpenAI', 'CRM', 'Make.com'],
    problem: 'Inbound leads need consistent triage before a sales team can decide where to focus.',
    approach: 'Capture the form payload, validate the available context, apply an AI-assisted classification step, then store and route the result.',
    nodes: ['Lead form', 'Validate', 'Classify', 'CRM', 'Notify'],
    features: ['Structured intake', 'Hot / warm / cold classification', 'Conditional routing', 'Sales notification'],
    accent: 'cyan',
  },
  {
    id: 'whatsapp-chatbot',
    title: 'AI WhatsApp Chatbot',
    summary: 'Connects incoming WhatsApp messages to intent processing, context handling, and an automated response path.',
    status: 'Built',
    category: 'Conversational Automation',
    stack: ['WhatsApp', 'Webhook', 'OpenAI', 'CRM', 'Make.com'],
    problem: 'Repeated messaging requests can create slow and inconsistent first responses.',
    approach: 'Receive the message through a webhook, interpret intent, use available context, return a response, and preserve the interaction for follow-up.',
    nodes: ['Message', 'Webhook', 'Intent', 'Context', 'Reply'],
    features: ['Inbound message capture', 'Intent processing', 'Context-aware response', 'Conversation record'],
    accent: 'violet',
  },
  {
    id: 'appointment-booking',
    title: 'Appointment Booking Automation',
    summary: 'Coordinates intake, calendar availability, confirmations, reminders, and follow-up steps.',
    status: 'Built',
    category: 'Operations Workflow',
    stack: ['Google Calendar', 'Gmail', 'Webhook', 'Make.com'],
    problem: 'Manual booking creates avoidable back-and-forth and makes confirmations easier to miss.',
    approach: 'Validate a booking request, create the calendar event, send confirmation, and schedule the reminder and follow-up paths.',
    nodes: ['Request', 'Validate', 'Calendar', 'Confirm', 'Remind'],
    features: ['Calendar sync', 'Automatic confirmation', 'Reminder sequence', 'Follow-up path'],
    accent: 'blue',
  },
  {
    id: 'lead-generation',
    title: 'AI Lead Generation Automation',
    summary: 'Captures, enriches, and organizes lead information for a more consistent outreach process.',
    status: 'Built',
    category: 'Lead Operations',
    stack: ['OpenAI', 'Google Sheets', 'Gmail', 'Make.com'],
    problem: 'Lead details can arrive incomplete or spread across tools, making the next outreach step harder to prepare.',
    approach: 'Capture the submitted details, enrich or summarize available context, then organize the result for a reviewable outreach step.',
    nodes: ['Capture', 'Enrich', 'Store', 'Outreach'],
    features: ['Lead intake', 'Context enrichment', 'Structured record', 'Outreach preparation'],
  },
  {
    id: 'voice-agent',
    title: 'AI Voice Agent',
    summary: 'Explores a voice-first intake path with transcription, reasoning, and response synthesis.',
    status: 'Independent Demo',
    category: 'Voice AI',
    stack: ['Voice AI', 'OpenAI', 'API', 'Make.com'],
    problem: 'Voice-first intake needs a clear way to move from spoken input to a useful, reviewable response.',
    approach: 'Explore a pipeline that transcribes the call, interprets the request, and prepares a response while treating voice services as experimental components.',
    nodes: ['Call', 'Transcribe', 'Reason', 'Respond'],
    features: ['Voice intake concept', 'Transcription step', 'Intent reasoning', 'Response synthesis'],
  },
  {
    id: 'email-personalizer',
    title: 'AI Email Personalizer',
    summary: 'Generates draft outreach from lead context and passes it into a reviewable email workflow.',
    status: 'Built',
    category: 'Content Workflow',
    stack: ['OpenAI', 'Gmail', 'JavaScript', 'Make.com'],
    problem: 'Generic outreach takes time to tailor and can miss relevant details already available about a lead.',
    approach: 'Combine approved lead context with a drafting step, then keep the result as a draft for a person to review before sending.',
    nodes: ['Lead data', 'Context', 'Draft', 'Email'],
    features: ['Context selection', 'Personalized draft', 'Review before sending', 'Email hand-off'],
  },
  {
    id: 'form-submission',
    title: 'Form Submission Automation',
    summary: 'Validates form data, records it, and triggers the appropriate notification path.',
    status: 'Built',
    category: 'Data Intake',
    stack: ['Webhook', 'Google Sheets', 'Gmail', 'Make.com'],
    problem: 'Manual handling of form submissions can leave records incomplete or delay notifications.',
    approach: 'Validate the submitted fields, record the structured data, and notify the appropriate recipient.',
    nodes: ['Form', 'Validate', 'Record', 'Notify'],
    features: ['Form intake', 'Field validation', 'Sheet record', 'Email notification'],
  },
  {
    id: 'lead-follow-up',
    title: 'Lead Follow-up Automation',
    summary: 'Keeps lead status and follow-up communication moving through scheduled workflow steps.',
    status: 'Built',
    category: 'Sales Operations',
    stack: ['CRM', 'Gmail', 'Google Sheets', 'Make.com'],
    problem: 'Follow-up can be missed when lead status, timing, and communication are not kept together.',
    approach: 'Use a scheduled check against lead status, prepare the next follow-up step, and update the record after the hand-off.',
    nodes: ['CRM', 'Schedule', 'Follow up', 'Update'],
    features: ['Status check', 'Scheduled follow-up', 'Communication hand-off', 'Record update'],
  },
  {
    id: 'meeting-intelligence',
    title: 'Meeting Intelligence Workflow',
    summary: 'An illustrative pattern for turning a meeting transcript into a reviewable summary and action list.',
    status: 'Concept · proposed',
    category: 'Workflow design',
    stack: ['n8n (proposed)', 'Transcript source (TBD)', 'Human review'],
    problem: 'Important decisions and action items can be difficult to find again in long meeting notes.',
    approach: 'Take an available transcript, extract a structured summary and action items, then route the draft for review before sharing or storing it.',
    nodes: ['Transcript', 'Extract', 'Review', 'Share'],
    features: ['Transcript intake', 'Decision summary', 'Action-item extraction', 'Human approval before delivery'],
    proposed: true,
  },
  {
    id: 'client-management-intelligence',
    title: 'Client Management Intelligence',
    summary: 'A proposed reporting flow for consolidating project updates into a clear client-ready brief.',
    status: 'Concept · proposed',
    category: 'Workflow design',
    stack: ['n8n (proposed)', 'Update source (TBD)', 'Human review'],
    problem: 'Project updates may be spread across different records, making progress and open questions harder to summarize.',
    approach: 'Collect approved project updates, highlight missing information, and prepare a concise brief for a person to check before it is shared.',
    nodes: ['Project updates', 'Consolidate', 'Flag gaps', 'Review brief'],
    features: ['Update consolidation', 'Missing-field checks', 'Progress summary', 'Client-ready draft for review'],
    proposed: true,
  },
  {
    id: 'content-generation-pipeline',
    title: 'Content Generation Pipeline',
    summary: 'A proposed, approval-led workflow for turning a content brief into a reviewed draft.',
    status: 'Concept · proposed',
    category: 'Workflow design',
    stack: ['n8n (proposed)', 'AI drafting (optional)', 'Human approval'],
    problem: 'Content requests can arrive in inconsistent formats and need a clear review point before publication.',
    approach: 'Structure the brief, prepare a draft with optional AI assistance, run basic completeness checks, and pause for human approval.',
    nodes: ['Brief', 'Draft', 'Quality check', 'Approval'],
    features: ['Structured brief', 'Optional AI-assisted draft', 'Completeness check', 'Approval before publishing'],
    proposed: true,
  },
];

const proposedSystems = [
  {
    code: 'CONTENT OPS',
    title: 'AI Content Operations Platform',
    summary: 'A proposed approval-led system for research, drafting, channel adaptation, scheduling, and performance feedback.',
    modules: ['Research', 'Human approval', 'Publishing', 'Analytics loop'],
    details: ['Gather topic context and sources.', 'Review drafts before distribution.', 'Prepare approved content for publishing.', 'Use performance feedback to guide iteration.'],
  },
  {
    code: 'INTELLIGENCE',
    title: 'Research & Intelligence System',
    summary: 'A proposed monitoring layer that gathers trusted sources, removes duplication, scores relevance, and delivers concise briefs.',
    modules: ['Source capture', 'Relevance scoring', 'Synthesis', 'Brief delivery'],
    details: ['Collect information from agreed sources.', 'Remove duplicates and rank relevance.', 'Summarize related findings into themes.', 'Prepare a concise brief for review.'],
  },
  {
    code: 'DOCUMENT AI',
    title: 'Intelligent Document Processing',
    summary: 'A proposed human-in-the-loop pipeline for document intake, extraction, validation, exception routing, and system updates.',
    modules: ['OCR / extraction', 'Validation', 'Exception queue', 'Data sync'],
    details: ['Receive documents from an agreed intake.', 'Extract fields into a structured draft.', 'Flag missing or uncertain values.', 'Prepare validated records for hand-off.'],
  },
  {
    code: 'RELIABILITY',
    title: 'Workflow Monitoring & Recovery',
    summary: 'A proposed operations layer for health checks, error classification, retry policies, alerts, and recovery reporting.',
    modules: ['Health events', 'Error triage', 'Safe retry', 'Operations report'],
    details: ['Observe useful workflow health signals.', 'Classify failures and their likely cause.', 'Retry only when the process allows it.', 'Summarize incidents and recovery status.'],
  },
];

const accentClasses = {
  cyan: 'from-cyan-300/25 via-blue-400/10 to-transparent text-cyan-200 border-cyan-300/20',
  violet: 'from-violet-300/25 via-fuchsia-400/10 to-transparent text-violet-200 border-violet-300/20',
  blue: 'from-blue-300/25 via-cyan-400/10 to-transparent text-blue-200 border-blue-300/20',
};

const statusStyles = {
  Built: 'border-emerald-300/30 bg-emerald-400/10 text-emerald-100',
  'Independent Demo': 'border-amber-300/30 bg-amber-400/10 text-amber-100',
  'Concept · proposed': 'border-violet-300/30 bg-violet-400/10 text-violet-100',
};

const projectTypeMap = {
  'AI + Sales Operations': 'AI Automation',
  'Conversational Automation': 'AI Automation',
  'Operations Workflow': 'Business Automation',
  'Lead Operations': 'Business Automation',
  'Data Intake': 'Business Automation',
  'Sales Operations': 'Business Automation',
  'Voice AI': 'AI-Powered Solutions',
  'Content Workflow': 'AI-Powered Solutions',
  'Workflow design': 'AI-Powered Solutions',
};

const projectFilters = ['All', 'AI Automation', 'Business Automation', 'AI-Powered Solutions'];

const Flow = memo(({ nodes, compact = false, reducedMotion = false }) => (
  <div role="img" className={`flex min-w-max items-center ${compact ? 'gap-1.5' : 'gap-2 sm:gap-3'}`} aria-label={`Illustrative architecture: ${nodes.join(' to ')}`}>
    {nodes.map((node, index) => (
      <div key={node} className="contents">
        <div className={`${compact ? 'px-2.5 py-2 text-[11px]' : 'px-3 py-2.5 text-xs'} rounded-xl border border-white/10 bg-slate-950/70 font-medium text-slate-200 shadow-lg`}>{node}</div>
        {index < nodes.length - 1 && (
          <div className="relative h-px w-5 bg-cyan-300/30 sm:w-7" aria-hidden="true">
            <motion.span
              className="absolute -top-0.5 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_9px_rgba(103,232,249,.8)]"
              animate={reducedMotion ? undefined : { x: [0, compact ? 14 : 22, 0], opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.18 }}
            />
          </div>
        )}
      </div>
    ))}
  </div>
));
Flow.displayName = 'Flow';

const Projects = memo(() => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const reduceMotion = useReducedMotion();
  const featured = projects.slice(0, 3);
  const categories = projectFilters;
  const moreProjects = useMemo(
    () => projects.slice(3).filter((project) => filter === 'All' || projectTypeMap[project.category] === filter),
    [filter]
  );

  useEffect(() => {
    if (!selected) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => event.key === 'Escape' && setSelected(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selected]);

  return (
    <section id="projects" className="relative overflow-hidden border-y border-white/[0.06] bg-[#030712] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <SectionBackground variant="projects" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"
        >
          <div>
            <p className="section-kicker">Projects &amp; workflow designs</p>
            <h2 className="section-title mt-4">Automation systems and workflow builds.</h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-base leading-8 text-slate-300 sm:text-lg">n8n is central to my automation practice. Explore workflow case studies alongside clearly labeled proposed designs—each focused on the logic, tools, and operational problem.</p>
            <p className="mt-3 text-sm text-slate-500">Diagrams are designed architecture representations, not application screenshots. Proposed designs are illustrative and are not presented as deployed builds.</p>
          </div>
        </motion.header>

        <div className="space-y-8 py-14">
          {featured.map((project, index) => (
            <PointerGlow key={project.id} tilt className="rounded-[1.75rem]">
              <motion.article
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={reduceMotion ? undefined : { y: -5, scale: 1.005 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: reduceMotion ? 0 : index * 0.06 }}
              style={{ transformStyle: 'preserve-3d' }}
              className={`portfolio-hover-card group grid overflow-hidden rounded-[1.75rem] border bg-gradient-to-br ${accentClasses[project.accent]} bg-[#090817]/90 shadow-[0_24px_70px_rgba(0,0,0,.22)] lg:grid-cols-[1.05fr_0.95fr] ${index % 2 ? 'lg:[&>div:first-child]:order-2' : ''}`}
            >
              <div className="flex min-h-[330px] flex-col justify-between p-7 sm:p-9 lg:p-11">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className={`rounded-full border px-3 py-1 font-semibold ${statusStyles[project.status] || 'border-white/10 bg-white/5 text-slate-200'}`}>
                      {project.status}
                    </span>
                    <span className="text-slate-400">{projectTypeMap[project.category] || project.category}</span>
                  </div>
                  <h3 className="mt-6 max-w-xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">{project.title}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">{project.summary}</p>
                  {project.problem && (
                    <dl className="mt-6 grid gap-4 border-t border-white/[0.08] pt-5 sm:grid-cols-2">
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Problem</dt>
                        <dd className="mt-2 text-xs leading-5 text-slate-400">{project.problem}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Approach</dt>
                        <dd className="mt-2 text-xs leading-5 text-slate-400">{project.approach}</dd>
                      </div>
                    </dl>
                  )}
                </div>
                <div className="mt-8">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tool) => <span key={tool} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-slate-300">{tool}</span>)}
                  </div>
                  <button type="button" onClick={() => setSelected(project)} className="focus-ring mt-7 inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">Explore case study <span className="ml-2" aria-hidden="true">↗</span></button>
                </div>
              </div>
              <div className="relative flex min-h-[300px] items-center overflow-hidden border-t border-white/10 bg-slate-950/55 p-6 lg:border-l lg:border-t-0 sm:p-8">
                <div className="relative w-full overflow-x-auto pb-3">
                  <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">Designed workflow architecture</p>
                  <ScrollFan
                    label={`${project.title} illustrative stages`}
                    items={project.nodes.map((node, nodeIndex) => ({
                      title: node,
                      description: project.features[nodeIndex] || project.summary,
                    }))}
                  />
                </div>
              </div>
              </motion.article>
            </PointerGlow>
          ))}
        </div>

        <div className="border-t border-white/10 pt-14">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="section-kicker">More automations</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">Supporting workflow builds</h3>
            </div>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-2" aria-label="Filter projects">
              {categories.map((category) => (
                <button key={category} type="button" onClick={() => setFilter(category)} aria-pressed={filter === category} className={`focus-ring whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition ${filter === category ? 'border-cyan-300/40 bg-cyan-300/10 text-cyan-100' : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white'}`}>{category}</button>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {moreProjects.map((project) => (
                <PointerGlow key={project.id} tilt className="rounded-2xl">
                <motion.article layout initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} whileHover={reduceMotion ? undefined : { y: -4, scale: 1.005 }} transition={{ duration: 0.35, ease: 'easeOut' }} style={{ transformStyle: 'preserve-3d' }} className="portfolio-hover-card flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#08101f]/90 p-5">
                  <div className="flex items-center justify-between gap-3"><span className="text-[11px] uppercase tracking-wider text-cyan-200">{projectTypeMap[project.category] || project.category}</span><span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusStyles[project.status] || 'border-white/10 bg-white/5 text-slate-300'}`}>{project.status}</span></div>
                  <h4 className="mt-4 text-lg font-semibold text-white">{project.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{project.summary}</p>
                  <div className="mt-5 overflow-x-auto pb-2"><Flow nodes={project.nodes} compact reducedMotion={reduceMotion} /></div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-3">{project.stack.slice(0, 3).map((tool) => <span key={tool} className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[10px] text-slate-500">{tool}</span>)}</div>
                  <button type="button" onClick={() => setSelected(project)} className="focus-ring mt-5 inline-flex min-h-10 w-fit items-center rounded-full border border-white/10 px-4 text-xs font-medium text-slate-200 transition hover:border-cyan-200/30 hover:text-cyan-100">Explore case study <span className="ml-2" aria-hidden="true">↗</span></button>
                </motion.article>
                </PointerGlow>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <section className="relative mt-20 overflow-hidden border-t border-white/10 pt-16" aria-labelledby="concepts-title">
          <SectionBackground variant="concepts" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="section-kicker text-violet-200/80">Concepts &amp; solutions I can build</p>
              <h3 id="concepts-title" className="mt-4 text-4xl font-semibold tracking-tight text-white">Advanced systems, proposed with clear boundaries.</h3>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-400">These are solution directions—not completed deployments. Each would be scoped around source quality, approvals, failure paths, observability, security, and the business process it supports.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {proposedSystems.map((system, index) => (
              <PointerGlow key={system.title} tilt className="rounded-[1.5rem]">
                <motion.article
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.06 }}
                  className="portfolio-hover-card relative overflow-hidden rounded-[1.5rem] border border-violet-300/10 bg-[radial-gradient(circle_at_top_left,rgba(167,139,250,0.12),transparent_26%),linear-gradient(180deg,rgba(15,23,42,0.8),rgba(15,23,42,0.6))] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.2)] sm:p-7"
                >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-violet-200/75">{system.code}</span>
                  <span className="rounded-full border border-violet-200/15 bg-violet-300/[0.07] px-3 py-1 text-[10px] uppercase tracking-wider text-violet-100/80">Concept · proposed build</span>
                </div>
                <h4 className="mt-7 text-2xl font-semibold tracking-tight text-white">{system.title}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-400">{system.summary}</p>
                <ScrollFan
                  label={`${system.title} proposed stages`}
                  items={system.modules.map((module, index) => ({ title: module, description: system.details[index] }))}
                />
                </motion.article>
              </PointerGlow>
            ))}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/80 p-3 backdrop-blur-md sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
            <motion.div role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.99 }} className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[1.75rem] border border-cyan-300/15 bg-[#07101f] shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#07101f]/95 px-5 py-4 backdrop-blur sm:px-7">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Case study</span>
                <button type="button" onClick={() => setSelected(null)} aria-label="Close project details" className="focus-ring rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 hover:text-white">Close</button>
              </div>
              <div className="p-6 sm:p-9">
                <div className="flex flex-wrap items-center gap-3"><span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">{selected.status}</span><span className="text-sm text-slate-500">{selected.category}</span></div>
                <h3 id="project-dialog-title" className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{selected.title}</h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{selected.summary}</p>
                <div className="mt-9 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/70 p-5"><p className="mb-5 text-xs uppercase tracking-wider text-slate-500">Designed architecture representation</p><Flow nodes={selected.nodes} reducedMotion={reduceMotion} /></div>
                <div className="mt-9 grid gap-7 md:grid-cols-2">
                  <div><h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-200">The problem</h4><p className="mt-3 text-sm leading-7 text-slate-400">{selected.problem}</p></div>
                  <div><h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-200">Workflow approach</h4><p className="mt-3 text-sm leading-7 text-slate-400">{selected.approach}</p></div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-7"><h4 className="text-sm font-semibold text-white">Workflow considerations</h4><ul className="mt-4 grid gap-3 sm:grid-cols-2">{selected.features.map((feature) => <li key={feature} className="flex gap-3 text-sm text-slate-400"><span className="text-cyan-300">◆</span>{feature}</li>)}</ul></div>
                <div className="mt-8 flex flex-wrap gap-2">{selected.stack.map((tool) => <span key={tool} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300">{tool}</span>)}</div>
                {selected.proposed ? (
                  <p className="mt-7 text-xs leading-5 text-violet-200/70">Illustrative proposal only: integrations, implementation, and outcomes are not represented as completed or deployed.</p>
                ) : (
                  <p className="mt-7 text-xs leading-5 text-slate-500">This walkthrough describes the workflow without presenting a fabricated application interface or unverified outcome metrics.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

Projects.displayName = 'Projects';
export default Projects;
