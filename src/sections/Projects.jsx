import React, { memo, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';

const createProjectImage = (title, accentA, accentB) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="1200" height="700">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accentA}" />
          <stop offset="100%" stop-color="${accentB}" />
        </linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(255,255,255,0.24)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.04)" />
        </linearGradient>
      </defs>
      <rect width="1200" height="700" fill="url(#bg)" />
      <circle cx="970" cy="140" r="240" fill="rgba(255,255,255,0.12)" />
      <circle cx="240" cy="640" r="260" fill="rgba(255,255,255,0.1)" />
      <rect x="95" y="110" rx="24" ry="24" width="1010" height="500" fill="url(#panel)" stroke="rgba(255,255,255,0.3)" />
      <text x="145" y="240" fill="white" font-size="56" font-weight="700" font-family="Segoe UI, Arial">${title}</text>
      <text x="145" y="305" fill="rgba(255,255,255,0.88)" font-size="28" font-family="Segoe UI, Arial">Automation Architecture Preview</text>
      <line x1="145" y1="355" x2="900" y2="355" stroke="rgba(255,255,255,0.45)" stroke-width="3" />
      <rect x="145" y="390" rx="12" ry="12" width="250" height="70" fill="rgba(255,255,255,0.22)" />
      <rect x="420" y="390" rx="12" ry="12" width="220" height="70" fill="rgba(255,255,255,0.18)" />
      <rect x="665" y="390" rx="12" ry="12" width="260" height="70" fill="rgba(255,255,255,0.14)" />
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const HIGHLIGHT_WORDS = [
  'automation',
  'AI',
  'workflow',
  'lead',
  'customer',
  'response',
  'integration',
  'process',
  'quality',
  'speed',
  'scalable',
];

const highlightKeywords = (text) => {
  const parts = text.split(/(\s+)/);
  return parts.map((part, index) => {
    const clean = part.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (HIGHLIGHT_WORDS.includes(clean)) {
      return (
        <span key={`${part}-${index}`} className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent font-semibold">
          {part}
        </span>
      );
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
};

const FlowNode = memo(({ node, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: 0.08 * index, duration: 0.35 }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="group relative min-w-[160px] rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-white/12 to-white/5 px-4 py-3 text-center backdrop-blur-xl shadow-lg shadow-cyan-500/10"
    style={{ willChange: 'transform, box-shadow, border-color' }}
  >
    <motion.div
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
      animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(0,217,255,0.12), rgba(168,85,247,0.12), rgba(0,153,255,0.12))',
        backgroundSize: '220% 220%',
      }}
    />

    <div className="relative z-10">
      <motion.div
        className="mb-2 text-xl"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.12 }}
      >
        {node.icon}
      </motion.div>
      <p className="text-sm font-semibold text-slate-100 leading-tight">{node.label}</p>
    </div>
  </motion.div>
));

FlowNode.displayName = 'FlowNode';

const FlowConnector = memo(({ index }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.08 * index + 0.1 }}
    className="flex items-center justify-center"
  >
    <div className="relative h-10 w-10">
      <motion.div
        className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-300/70 via-blue-400/80 to-purple-400/70"
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(0,217,255,0.7)]"
        animate={{ y: [-8, 8, -8], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  </motion.div>
));

FlowConnector.displayName = 'FlowConnector';

const WorkflowDiagram = memo(({ steps }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1, duration: 0.3 }}
    className="rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-[rgba(8,18,40,0.75)] to-[rgba(10,24,52,0.55)] p-5 backdrop-blur-xl"
  >
    <motion.div
      className="pointer-events-none mb-4 h-px w-full"
      animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(0,217,255,0.2), rgba(168,85,247,0.45), rgba(0,217,255,0.2))',
        backgroundSize: '220% 100%',
      }}
    />

    <div className="grid gap-2">
      {steps.map((step, index) => (
        <React.Fragment key={step.label}>
          <FlowNode node={step} index={index} />
          {index < steps.length - 1 && <FlowConnector index={index} />}
        </React.Fragment>
      ))}
    </div>
  </motion.div>
));

WorkflowDiagram.displayName = 'WorkflowDiagram';

const LiveWorkflowPreview = memo(({ steps }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.12 }}
    className="rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-[rgba(4,16,36,0.75)] to-[rgba(4,18,42,0.5)] p-4"
  >
    <p className="mb-3 text-sm font-semibold text-cyan-200">Live Workflow Preview</p>
    <div className="grid gap-2">
      {steps.map((step, index) => (
        <React.Fragment key={`live-${step.label}`}>
          <motion.div
            className="relative rounded-xl border border-cyan-300/20 bg-white/5 px-3 py-2 text-sm text-slate-200"
            animate={{ boxShadow: ['0 0 0 rgba(0,217,255,0)', '0 0 16px rgba(0,217,255,0.2)', '0 0 0 rgba(0,217,255,0)'] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.15 }}
          >
            <motion.span
              className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-300"
              animate={{ x: [0, 10, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: index * 0.1 }}
            />
            <span>{step.icon} {step.label}</span>
          </motion.div>
          {index < steps.length - 1 && (
            <motion.div className="mx-auto h-5 w-5 text-cyan-200" animate={{ y: [0, 3, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.1, repeat: Infinity }}>
              ↓
            </motion.div>
          )}
        </React.Fragment>
      ))}
      <motion.div
        className="mt-1 rounded-xl border border-emerald-300/35 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200"
        animate={{ scale: [1, 1.02, 1], boxShadow: ['0 0 0 rgba(16,185,129,0)', '0 0 14px rgba(16,185,129,0.3)', '0 0 0 rgba(16,185,129,0)'] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        ✅ Completed
      </motion.div>
    </div>
  </motion.div>
));

LiveWorkflowPreview.displayName = 'LiveWorkflowPreview';

const WorkflowTimeline = memo(({ steps }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.14 }}
    className="rounded-2xl border border-cyan-300/15 bg-white/[0.03] p-4"
  >
    <p className="mb-3 text-sm font-semibold text-cyan-200">Project Timeline</p>
    <div className="grid gap-2">
      {steps.map((step, index) => (
        <motion.div
          key={`timeline-${step}`}
          initial={{ opacity: 0.35 }}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.1, repeat: Infinity, delay: index * 0.24 }}
          className="flex items-center gap-2 text-sm"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-300" />
          <span className="text-slate-300">{step}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
));

WorkflowTimeline.displayName = 'WorkflowTimeline';

const Projects = memo(() => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const onViewportChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onViewportChange);
      return () => mediaQuery.removeEventListener('change', onViewportChange);
    }

    mediaQuery.addListener(onViewportChange);
    return () => mediaQuery.removeListener(onViewportChange);
  }, []);

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: 'AI Lead Generation Automation',
        description: 'Collects, enriches, and qualifies leads automatically for high-conversion outreach.',
        overview:
          'Businesses struggle with fragmented lead sources and manual prospecting. This automation pipeline centralizes lead capture, enriches records, and moves qualified contacts into an outreach-ready system with minimal manual effort.',
        technologies: ['Make.com', 'OpenAI', 'Google Maps', 'Google Sheets', 'Gmail', 'API'],
        keyFeatures: ['Lead scraping automation', 'Email enrichment', 'Deduplication', 'Outreach ready records'],
        problem: 'Manual lead sourcing was slow, inconsistent, and hard to scale across campaigns.',
        solution:
          'The workflow automates lead discovery, enrichment, and routing so teams can focus on conversions rather than data wrangling.',
        workflowDiagram: [
          { label: 'Google Maps', icon: '🗺️' },
          { label: 'Lead Scraper', icon: '🧲' },
          { label: 'Email Enrichment', icon: '📬' },
          { label: 'Make.com', icon: '⚙️' },
          { label: 'Google Sheets', icon: '📗' },
          { label: 'Gmail Outreach', icon: '✉️' },
        ],
        livePreview: [
          { label: 'Trigger', icon: '🟢' },
          { label: 'Make.com', icon: '⚡' },
          { label: 'OpenAI', icon: '🤖' },
          { label: 'Google Sheets', icon: '📊' },
          { label: 'Gmail', icon: '📧' },
        ],
        timeline: ['Trigger Received', 'AI Processing', 'Automation Running', 'Data Saved', 'Notification Sent', 'Completed'],
        businessBenefits: [
          { icon: '⏱', label: 'Save Manual Time' },
          { icon: '⚡', label: 'Faster Response' },
          { icon: '📈', label: 'Better Productivity' },
          { icon: '🤖', label: 'AI Powered' },
        ],
        futureImprovements: ['Coming Soon', 'Analytics Dashboard', 'Advanced Reporting', 'CRM Integration'],
        github: '',
        demo: '',
        accentA: '#0a3f91',
        accentB: '#00b9ff',
      },
      {
        id: 2,
        title: 'AI WhatsApp Chatbot',
        description: 'Automates customer conversations on WhatsApp with fast, context-aware responses.',
        overview:
          'Support teams often face high message volume and delayed responses. This chatbot architecture handles repetitive conversations instantly while preserving a human handoff path for complex requests.',
        technologies: ['WhatsApp', 'Webhook', 'Make.com', 'OpenAI', 'CRM'],
        keyFeatures: ['Intent detection', 'Auto replies', 'Context memory', 'CRM sync'],
        problem: 'Customer support response time was inconsistent and dependent on manual availability.',
        solution:
          'The flow captures incoming messages, processes intent with AI, and responds automatically while syncing context to CRM.',
        workflowDiagram: [
          { label: 'Customer', icon: '👤' },
          { label: 'WhatsApp', icon: '💬' },
          { label: 'Webhook', icon: '🔗' },
          { label: 'Make.com', icon: '⚙️' },
          { label: 'OpenAI', icon: '🧠' },
          { label: 'CRM', icon: '🗂️' },
          { label: 'Auto Reply', icon: '✅' },
        ],
        livePreview: [
          { label: 'Trigger', icon: '🟢' },
          { label: 'Make.com', icon: '⚡' },
          { label: 'OpenAI', icon: '🤖' },
          { label: 'CRM', icon: '📊' },
          { label: 'Auto Reply', icon: '📧' },
        ],
        timeline: ['Trigger Received', 'AI Processing', 'Automation Running', 'Data Saved', 'Notification Sent', 'Completed'],
        businessBenefits: [
          { icon: '⏱', label: 'Save Manual Time' },
          { icon: '⚡', label: 'Faster Response' },
          { icon: '📈', label: 'Better Productivity' },
          { icon: '🤖', label: 'AI Powered' },
        ],
        futureImprovements: ['Coming Soon', 'Voice AI Upgrade', 'CRM Integration', 'Advanced Reporting'],
        github: '',
        demo: '',
        accentA: '#0c4ea7',
        accentB: '#8753ff',
      },
      {
        id: 3,
        title: 'AI Voice Agent',
        description: 'Handles voice conversations with AI for inbound customer calls and first-line support.',
        overview:
          'Phone support is difficult to scale during peak hours. This voice automation stack handles inbound calls with natural AI responses, applies business logic, and delivers high-quality customer interactions.',
        technologies: ['Voice AI', 'OpenAI', 'API', 'Make.com'],
        keyFeatures: ['Speech-to-text', 'Intent reasoning', 'Response synthesis', 'Smart routing'],
        problem: 'Teams were missing calls and spending too much time on repetitive support queries.',
        solution:
          'The voice agent converts speech to text, applies AI reasoning and business rules, then returns real-time voice responses.',
        workflowDiagram: [
          { label: 'Incoming Call', icon: '📞' },
          { label: 'Voice AI', icon: '🎙️' },
          { label: 'Speech to Text', icon: '📝' },
          { label: 'OpenAI', icon: '🧠' },
          { label: 'Business Logic', icon: '🧩' },
          { label: 'Text to Speech', icon: '🔊' },
          { label: 'Customer Response', icon: '✅' },
        ],
        livePreview: [
          { label: 'Trigger', icon: '🟢' },
          { label: 'Make.com', icon: '⚡' },
          { label: 'OpenAI', icon: '🤖' },
          { label: 'Google Sheets', icon: '📊' },
          { label: 'Gmail', icon: '📧' },
        ],
        timeline: ['Trigger Received', 'AI Processing', 'Automation Running', 'Data Saved', 'Notification Sent', 'Completed'],
        businessBenefits: [
          { icon: '⏱', label: 'Save Manual Time' },
          { icon: '⚡', label: 'Faster Response' },
          { icon: '📈', label: 'Better Productivity' },
          { icon: '🤖', label: 'AI Powered' },
        ],
        futureImprovements: ['Coming Soon', 'Voice AI Upgrade', 'Analytics Dashboard', 'Advanced Reporting'],
        github: '',
        demo: '',
        accentA: '#083e84',
        accentB: '#00d9ff',
      },
      {
        id: 4,
        title: 'AI Email Personalizer',
        description: 'Generates personalized outreach emails based on lead data and business intent.',
        overview:
          'Generic outreach reduces response rates and wastes campaign budget. This system analyzes context and generates personalized email copy that feels relevant and aligned to each lead profile.',
        technologies: ['OpenAI', 'Gmail', 'Make.com', 'JavaScript'],
        keyFeatures: ['Website context extraction', 'Personalized content blocks', 'Follow-up sequences', 'Batch automation'],
        problem: 'Cold email campaigns lacked personalization and had low engagement quality.',
        solution:
          'The pipeline composes context-aware outreach and follow-ups automatically, improving quality and speed simultaneously.',
        workflowDiagram: [
          { label: 'Lead Database', icon: '🗃️' },
          { label: 'Website Analysis', icon: '🌐' },
          { label: 'OpenAI', icon: '🧠' },
          { label: 'Personalized Email', icon: '✍️' },
          { label: 'Gmail', icon: '📨' },
          { label: 'Follow-up', icon: '🔁' },
        ],
        livePreview: [
          { label: 'Trigger', icon: '🟢' },
          { label: 'Make.com', icon: '⚡' },
          { label: 'OpenAI', icon: '🤖' },
          { label: 'Google Sheets', icon: '📊' },
          { label: 'Gmail', icon: '📧' },
        ],
        timeline: ['Trigger Received', 'AI Processing', 'Automation Running', 'Data Saved', 'Notification Sent', 'Completed'],
        businessBenefits: [
          { icon: '⏱', label: 'Save Manual Time' },
          { icon: '⚡', label: 'Faster Response' },
          { icon: '📈', label: 'Better Productivity' },
          { icon: '🤖', label: 'AI Powered' },
        ],
        futureImprovements: ['Coming Soon', 'Advanced Reporting', 'Analytics Dashboard', 'CRM Integration'],
        github: '',
        demo: '',
        accentA: '#0d3f8f',
        accentB: '#7a4dff',
      },
      {
        id: 5,
        title: 'AI Lead Qualification System',
        description: 'Automatically scores and classifies inbound leads for faster sales prioritization.',
        overview:
          'Sales teams lose time when every lead is treated equally. This qualification engine scores lead quality with AI, segments intent levels, and alerts teams only when high-value opportunities appear.',
        technologies: ['OpenAI', 'CRM', 'Webhook', 'Make.com'],
        keyFeatures: ['AI scoring', 'Hot/Warm/Cold tagging', 'Sales notifications', 'Real-time routing'],
        problem: 'Sales teams spent too much time manually filtering low-intent leads.',
        solution:
          'The automation applies AI-based scoring and routes only actionable leads to sales, reducing friction in qualification.',
        workflowDiagram: [
          { label: 'Lead Form', icon: '📄' },
          { label: 'OpenAI Analysis', icon: '🧠' },
          { label: 'Score Lead', icon: '📊' },
          { label: 'Hot / Warm / Cold', icon: '🔥' },
          { label: 'CRM', icon: '🗂️' },
          { label: 'Sales Notification', icon: '🔔' },
        ],
        livePreview: [
          { label: 'Trigger', icon: '🟢' },
          { label: 'Make.com', icon: '⚡' },
          { label: 'OpenAI', icon: '🤖' },
          { label: 'Google Sheets', icon: '📊' },
          { label: 'Gmail', icon: '📧' },
        ],
        timeline: ['Trigger Received', 'AI Processing', 'Automation Running', 'Data Saved', 'Notification Sent', 'Completed'],
        businessBenefits: [
          { icon: '⏱', label: 'Save Manual Time' },
          { icon: '⚡', label: 'Faster Response' },
          { icon: '📈', label: 'Better Productivity' },
          { icon: '🤖', label: 'AI Powered' },
        ],
        futureImprovements: ['Coming Soon', 'CRM Integration', 'Analytics Dashboard', 'Advanced Reporting'],
        github: '',
        demo: '',
        accentA: '#0a4f9f',
        accentB: '#00c6f8',
      },
      {
        id: 6,
        title: 'Appointment Booking Automation',
        description: 'Automates booking, reminders, confirmations, and follow-up workflows end-to-end.',
        overview:
          'Manual scheduling causes delays, missed slots, and poor customer experience. This booking flow synchronizes form intake, calendar operations, and communication to deliver a seamless appointment journey.',
        technologies: ['Google Calendar', 'Gmail', 'Make.com', 'Webhook'],
        keyFeatures: ['Calendar sync', 'Auto confirmations', 'Reminder automation', 'Follow-up triggers'],
        problem: 'Booking operations were manual, causing delays and missed appointments.',
        solution:
          'Automation handles request capture, scheduling logic, confirmations, and reminders without operational overhead.',
        workflowDiagram: [
          { label: 'Website', icon: '🌍' },
          { label: 'Booking Form', icon: '🗓️' },
          { label: 'Google Calendar', icon: '📅' },
          { label: 'Confirmation Email', icon: '📨' },
          { label: 'Reminder', icon: '⏰' },
        ],
        livePreview: [
          { label: 'Trigger', icon: '🟢' },
          { label: 'Make.com', icon: '⚡' },
          { label: 'OpenAI', icon: '🤖' },
          { label: 'Google Sheets', icon: '📊' },
          { label: 'Gmail', icon: '📧' },
        ],
        timeline: ['Trigger Received', 'AI Processing', 'Automation Running', 'Data Saved', 'Notification Sent', 'Completed'],
        businessBenefits: [
          { icon: '⏱', label: 'Save Manual Time' },
          { icon: '⚡', label: 'Faster Response' },
          { icon: '📈', label: 'Better Productivity' },
          { icon: '🤖', label: 'AI Powered' },
        ],
        futureImprovements: ['Coming Soon', 'Analytics Dashboard', 'CRM Integration', 'Advanced Reporting'],
        github: '',
        demo: '',
        accentA: '#0e4e89',
        accentB: '#9b58f6',
      },
      {
        id: 7,
        title: 'Form Submission Automation',
        description: 'Processes incoming forms, validates data, and triggers smart downstream actions.',
        overview:
          'Form data often sits idle before action, causing slow response cycles. This architecture validates submissions instantly, syncs records, and notifies relevant channels for immediate follow-up.',
        technologies: ['Webhook', 'Make.com', 'Google Sheets', 'CRM', 'Gmail'],
        keyFeatures: ['Validation pipeline', 'Data sync', 'CRM update', 'Slack/Email notifications'],
        problem: 'Form responses were manually reviewed and often delayed critical follow-up.',
        solution:
          'The flow standardizes data, updates systems in real time, and alerts teams without manual checks.',
        workflowDiagram: [
          { label: 'Website Form', icon: '🧾' },
          { label: 'Webhook', icon: '🔗' },
          { label: 'Make.com', icon: '⚙️' },
          { label: 'Google Sheets', icon: '📗' },
          { label: 'CRM', icon: '🗂️' },
          { label: 'Slack / Email Notification', icon: '📣' },
        ],
        livePreview: [
          { label: 'Trigger', icon: '🟢' },
          { label: 'Make.com', icon: '⚡' },
          { label: 'OpenAI', icon: '🤖' },
          { label: 'Google Sheets', icon: '📊' },
          { label: 'Gmail', icon: '📧' },
        ],
        timeline: ['Trigger Received', 'AI Processing', 'Automation Running', 'Data Saved', 'Notification Sent', 'Completed'],
        businessBenefits: [
          { icon: '⏱', label: 'Save Manual Time' },
          { icon: '⚡', label: 'Faster Response' },
          { icon: '📈', label: 'Better Productivity' },
          { icon: '🤖', label: 'AI Powered' },
        ],
        futureImprovements: ['Coming Soon', 'Advanced Reporting', 'Analytics Dashboard', 'CRM Integration'],
        github: '',
        demo: '',
        accentA: '#0b4a93',
        accentB: '#00d1ff',
      },
      {
        id: 8,
        title: 'Lead Follow-up Automation',
        description: 'Runs multi-step follow-ups across email and WhatsApp based on lead behavior.',
        overview:
          'Lead momentum drops when follow-ups are inconsistent. This automation executes personalized multi-channel follow-up sequences and updates status in real time based on engagement signals.',
        technologies: ['CRM', 'OpenAI', 'Email', 'WhatsApp', 'Make.com'],
        keyFeatures: ['Scheduled triggers', 'Personalized messages', 'Multi-channel delivery', 'Status sync'],
        problem: 'Leads dropped off due to inconsistent and delayed manual follow-up.',
        solution:
          'The workflow orchestrates timing, personalization, and channel routing so every lead gets a timely next step.',
        workflowDiagram: [
          { label: 'CRM', icon: '🗂️' },
          { label: 'Scheduled Trigger', icon: '⏱️' },
          { label: 'OpenAI', icon: '🧠' },
          { label: 'Personalized Follow-up', icon: '✍️' },
          { label: 'Email', icon: '📨' },
          { label: 'WhatsApp', icon: '💬' },
          { label: 'Status Updated', icon: '✅' },
        ],
        livePreview: [
          { label: 'Trigger', icon: '🟢' },
          { label: 'Make.com', icon: '⚡' },
          { label: 'OpenAI', icon: '🤖' },
          { label: 'Google Sheets', icon: '📊' },
          { label: 'Gmail', icon: '📧' },
        ],
        timeline: ['Trigger Received', 'AI Processing', 'Automation Running', 'Data Saved', 'Notification Sent', 'Completed'],
        businessBenefits: [
          { icon: '⏱', label: 'Save Manual Time' },
          { icon: '⚡', label: 'Faster Response' },
          { icon: '📈', label: 'Better Productivity' },
          { icon: '🤖', label: 'AI Powered' },
        ],
        futureImprovements: ['Coming Soon', 'Voice AI Upgrade', 'CRM Integration', 'Analytics Dashboard'],
        github: '',
        demo: '',
        accentA: '#11417b',
        accentB: '#8b54ff',
      },
    ],
    []
  );

  const projectsWithImages = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        image: createProjectImage(project.title, project.accentA, project.accentB),
      })),
    [projects]
  );

  useEffect(() => {
    if (!selectedProject) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    const onEsc = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', onEsc);
    };
  }, [selectedProject]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen flex items-start justify-center py-24 px-4 md:items-center md:px-8 bg-[#030712] overflow-visible md:overflow-hidden"
    >
      <SectionBackground variant="projects" />

      <motion.div
        variants={containerVariants}
        initial={isMobile ? 'animate' : 'initial'}
        animate={isMobile ? 'animate' : undefined}
        whileInView={isMobile ? undefined : 'animate'}
        viewport={isMobile ? undefined : { once: true, amount: 0.15 }}
        className="max-w-7xl mx-auto w-full relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-20">
          <motion.h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-[#0099ff] via-[#00d9ff] to-[#a855f7] bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>
          <motion.div className="h-1.5 w-24 bg-gradient-to-r from-[#0099ff] to-[#00d9ff] mx-auto rounded-full mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Real AI automation systems designed for measurable efficiency, reliability, and growth.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7" variants={containerVariants}>
          {projectsWithImages.map((project) => (
            <motion.article
              key={project.id}
              initial={isMobile ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={isMobile ? { opacity: 1, y: 0, scale: 1 } : { y: [0, -4, 0] }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={isMobile ? undefined : { once: true }}
              transition={{ duration: 0.45 }}
              whileHover={isMobile ? undefined : { y: -12, rotateX: 2.5, rotateY: -2.5 }}
              className="group relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-white/10 to-white/5 p-5 backdrop-blur-xl shadow-lg shadow-cyan-500/5 hover:shadow-cyan-400/25 hover:border-cyan-300/45 transition-all duration-400"
              style={{ willChange: 'transform, border-color, box-shadow', transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                animate={isMobile ? undefined : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={isMobile ? undefined : { duration: 5.5, repeat: Infinity, ease: 'linear' }}
                style={{
                  backgroundImage:
                    'linear-gradient(130deg, transparent 0%, rgba(0,217,255,0.22) 50%, transparent 100%)',
                  backgroundSize: '200% 200%',
                }}
              />

              <div className="overflow-hidden rounded-xl border border-white/25 bg-black/20">
                <motion.img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="h-44 w-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              <div className="relative z-10 mt-5 space-y-4">
                <motion.h3
                  className="text-xl font-bold text-white tracking-tight"
                  whileHover={isMobile ? undefined : { x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-sm leading-relaxed text-slate-300">{project.description}</p>

                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-cyan-200/85">Technologies Used</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-cyan-200/85">Problem Solved</p>
                  <p className="text-sm leading-relaxed text-slate-300 line-clamp-3">{project.problem}</p>
                </div>

                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-cyan-200/85">Key Features</p>
                  <ul className="space-y-1.5">
                    {project.keyFeatures.slice(0, 3).map((feature) => (
                      <li key={feature} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-300">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 pt-2">
                  <motion.button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-lg border border-cyan-300/40 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 px-3 py-2 text-sm font-semibold text-white"
                  >
                    View Project
                  </motion.button>

                  <button
                    type="button"
                    disabled
                    className="rounded-lg border border-slate-500/40 bg-slate-500/15 px-3 py-2 text-sm font-semibold text-slate-400 cursor-not-allowed"
                  >
                    Github (Coming Soon)
                  </button>

                  <button
                    type="button"
                    disabled
                    className="rounded-lg border border-slate-500/40 bg-slate-500/15 px-3 py-2 text-sm font-semibold text-slate-400 cursor-not-allowed"
                  >
                    Live Demo (Coming Soon)
                  </button>
                </div>

                <motion.p
                  initial={{ opacity: 1, x: 0 }}
                  whileHover={isMobile ? undefined : { x: 2 }}
                  className="text-sm font-semibold text-cyan-200 opacity-100 transition-all duration-300"
                >
                  View Project {'->'}
                </motion.p>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_25%,rgba(0,217,255,0.22),transparent_65%)]" />
            </motion.article>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.99 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={`${selectedProject.title} details`}
                className="h-screen w-screen overflow-hidden rounded-none border-0 bg-gradient-to-br from-[rgba(5,14,34,0.95)] to-[rgba(3,8,23,0.98)] backdrop-blur-2xl sm:h-[94vh] sm:w-[94vw] sm:rounded-3xl sm:border sm:border-cyan-300/20 sm:shadow-[0_30px_90px_rgba(0,153,255,0.22)]"
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b border-cyan-300/15 px-5 py-4 sm:px-8 sm:py-6">
                    <h2 className="pr-4 text-2xl sm:text-3xl font-bold text-white tracking-tight">{selectedProject.title}</h2>
                    <motion.button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="rounded-lg border border-white/25 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
                    >
                      Close
                    </motion.button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
                    <div className="grid gap-7 lg:grid-cols-2">
                      <section className="space-y-3 rounded-2xl border border-cyan-300/15 bg-white/5 p-5">
                        <h3 className="text-lg font-bold text-white">Overview</h3>
                        <p className="text-slate-300 leading-relaxed">{highlightKeywords(selectedProject.overview)}</p>

                        <p className="text-base font-semibold text-white">Business Problem</p>
                        <p className="text-sm leading-relaxed text-slate-300">{highlightKeywords(selectedProject.problem)}</p>
                        <p className="text-xs text-slate-400">The issue was affecting speed, consistency, and scalability across core business operations.</p>

                        <p className="text-base font-semibold text-white">Automation Approach</p>
                        <p className="text-sm leading-relaxed text-slate-300">{highlightKeywords(selectedProject.solution)}</p>
                        <p className="text-xs text-slate-400">This architecture was designed to reduce repetitive tasks and increase delivery reliability.</p>
                      </section>

                      <section className="space-y-3 rounded-2xl border border-cyan-300/15 bg-white/5 p-5">
                        <h3 className="text-lg font-bold text-white">Workflow Diagram</h3>
                        <WorkflowDiagram steps={selectedProject.workflowDiagram} />
                        <LiveWorkflowPreview steps={selectedProject.livePreview} />
                        <WorkflowTimeline steps={selectedProject.timeline} />
                      </section>

                      <section className="space-y-3 rounded-2xl border border-cyan-300/15 bg-white/5 p-5">
                        <h3 className="text-lg font-bold text-white">Technology Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
                              transition={{ delay: 0.04 * index, y: { duration: 3 + index * 0.1, repeat: Infinity, ease: 'easeInOut' } }}
                              whileHover={{ y: -2, scale: 1.06 }}
                              className="rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-100 shadow-[0_0_12px_rgba(0,217,255,0.16)]"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </section>

                      <section className="space-y-3 rounded-2xl border border-cyan-300/15 bg-white/5 p-5">
                        <h3 className="text-lg font-bold text-white">Business Impact</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedProject.businessBenefits.map((benefit, index) => (
                            <motion.div
                              key={benefit.label}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.06 * index }}
                              whileHover={{ y: -3, boxShadow: '0 0 20px rgba(0,217,255,0.25)' }}
                              className="rounded-xl border border-cyan-300/20 bg-gradient-to-br from-cyan-500/12 to-blue-500/10 px-3 py-2.5 text-sm font-semibold text-slate-100"
                            >
                              <span className="mr-1">{benefit.icon}</span>
                              {benefit.label}
                            </motion.div>
                          ))}
                        </div>
                      </section>
                    </div>

                    <section className="mt-7 rounded-2xl border border-cyan-300/15 bg-white/5 p-5">
                      <h3 className="mb-3 text-lg font-bold text-white">Future Improvements</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {selectedProject.futureImprovements.map((item, index) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * index }}
                            whileHover={{ y: -2 }}
                            className="rounded-xl border border-purple-300/25 bg-gradient-to-br from-purple-500/14 to-cyan-500/10 px-3 py-2.5 text-sm font-medium text-slate-200"
                          >
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="border-t border-cyan-300/15 px-5 py-4 sm:px-8 sm:py-5 bg-white/[0.03] flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button
                      type="button"
                      disabled
                      className="rounded-xl border border-slate-500/40 bg-slate-500/15 px-5 py-2.5 text-sm font-semibold text-slate-400 cursor-not-allowed"
                    >
                      Github (Coming Soon)
                    </button>
                    <button
                      type="button"
                      disabled
                      className="rounded-xl border border-slate-500/40 bg-slate-500/15 px-5 py-2.5 text-sm font-semibold text-slate-400 cursor-not-allowed"
                    >
                      Live Demo (Coming Soon)
                    </button>
                    <motion.button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-xl border border-cyan-300/35 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,217,255,0.2)] to-transparent" />
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
