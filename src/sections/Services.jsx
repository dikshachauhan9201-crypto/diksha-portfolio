import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import PointerGlow from '../components/PointerGlow';
import MagneticButton from '../components/MagneticButton';
import ScrollFan from '../components/ScrollFan';
import { scrollToAndHighlight } from '../utils/scroll';

const offerings = [
  {
    number: '01',
    title: 'AI Automation',
    description: 'Connected systems for intake, routing, data handling, and useful AI action.',
    problem: 'Manual handoffs and repetitive admin work slow down decisions and create missed follow-ups.',
    benefit: 'Clients get faster processing, fewer errors, and workflows that stay useful without constant manual intervention.',
    accent: 'cyan',
    labels: ['n8n', 'APIs', 'Webhooks', 'AI'],
  },
  {
    number: '02',
    title: 'Website Development',
    description: 'Clear, responsive experiences built for trust, readability, and conversion.',
    problem: 'Many businesses need a stronger digital presence that feels credible, modern, and easy to navigate.',
    benefit: 'Clients get a polished website that communicates value clearly and supports enquiries, bookings, and lead generation.',
    accent: 'amber',
    labels: ['Portfolio', 'Business', 'Landing pages', 'Responsive UI'],
  },
  {
    number: '03',
    title: 'AI-Powered Systems',
    description: 'Operational ideas that combine research, automation, and human review.',
    problem: 'Scattered inputs and incomplete process visibility make it hard to turn ideas into repeatable operational systems.',
    benefit: 'Clients gain clearer decision paths, consistent outputs, and better oversight without giving up human control where it matters.',
    accent: 'violet',
    labels: ['Lead ops', 'Content workflows', 'Research', 'Reporting'],
  },
];

const accentClasses = {
  cyan: {
    chip: 'border-cyan-300/25 bg-cyan-300/[0.08] text-cyan-100',
    badge: 'text-cyan-200',
  },
  amber: {
    chip: 'border-amber-200/25 bg-amber-200/[0.08] text-amber-100',
    badge: 'text-amber-100',
  },
  violet: {
    chip: 'border-violet-300/25 bg-violet-300/[0.08] text-violet-100',
    badge: 'text-violet-200',
  },
};

const ServiceVisual = ({ type }) => {
  if (type === 'website') {
    return (
      <div role="img" aria-label="Illustration of responsive website layouts" className="relative mb-5 h-36 overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-950/60 p-4">
        <div className="absolute inset-x-7 top-5 h-[5.5rem] rounded-lg border border-white/15 bg-[#111b22] p-2 shadow-xl">
          <div className="flex h-2 items-center gap-1 border-b border-white/10 pb-2">
            <span className="h-1 w-1 rounded-full bg-rose-300/70" />
            <span className="h-1 w-1 rounded-full bg-amber-300/70" />
            <span className="h-1 w-1 rounded-full bg-emerald-300/70" />
            <span className="ml-2 h-1 w-1/3 rounded-full bg-white/10" />
          </div>
          <div className="grid grid-cols-[1fr_.8fr] gap-2 pt-2">
            <div className="space-y-1.5 pt-1"><span className="block h-1.5 w-4/5 rounded bg-cyan-200/50" /><span className="block h-1 w-full rounded bg-white/15" /><span className="block h-1 w-3/4 rounded bg-white/10" /><span className="mt-1 block h-3 w-1/3 rounded-full bg-cyan-200/30" /></div>
            <div className="rounded bg-gradient-to-br from-amber-100/35 via-emerald-200/20 to-cyan-200/20" />
          </div>
        </div>
        <div className="absolute bottom-3 right-6 h-[5.1rem] w-10 rounded-[.7rem] border border-white/25 bg-[#111b22] p-1.5 shadow-2xl">
          <div className="h-full rounded-[.45rem] bg-gradient-to-b from-amber-100/35 via-emerald-200/15 to-slate-900 p-1.5">
            <span className="mt-5 block h-1 w-full rounded bg-white/45" />
            <span className="mt-1 block h-1 w-2/3 rounded bg-white/20" />
            <span className="mt-2 block h-2 w-3/4 rounded-full bg-cyan-200/50" />
          </div>
        </div>
        <span className="absolute bottom-3 left-5 text-[9px] uppercase tracking-[0.16em] text-slate-500">Desktop / mobile</span>
      </div>
    );
  }

  if (type === 'systems') {
    return (
      <svg role="img" aria-label="Illustration of connected inputs, AI processing, and outputs" viewBox="0 0 600 150" className="mb-5 h-36 w-full rounded-2xl border border-white/[0.08] bg-slate-950/60">
        <path d="M140 75 C205 75 218 75 270 75 M330 75 C385 75 398 75 460 75" stroke="rgba(167,139,250,.48)" strokeWidth="2" />
        <path d="M140 75 C210 20 230 20 280 60 M330 90 C390 130 414 130 460 75" stroke="rgba(103,232,249,.35)" strokeWidth="1.5" />
        <rect x="28" y="46" width="112" height="58" rx="14" fill="#101426" stroke="rgba(255,255,255,.16)" />
        <text x="84" y="70" textAnchor="middle" fill="#94a3b8" fontSize="10" letterSpacing="1.5">INPUT</text>
        <text x="84" y="88" textAnchor="middle" fill="#e2e8f0" fontSize="14">Context</text>
        <rect x="270" y="36" width="60" height="78" rx="18" fill="#16112a" stroke="rgba(196,181,253,.5)" />
        <text x="300" y="69" textAnchor="middle" fill="#c4b5fd" fontSize="11" letterSpacing="1">AI</text>
        <text x="300" y="89" textAnchor="middle" fill="#f8fafc" fontSize="12">Process</text>
        <rect x="460" y="46" width="112" height="58" rx="14" fill="#101b20" stroke="rgba(103,232,249,.25)" />
        <text x="516" y="70" textAnchor="middle" fill="#94a3b8" fontSize="10" letterSpacing="1.5">OUTPUT</text>
        <text x="516" y="88" textAnchor="middle" fill="#e2e8f0" fontSize="14">Action</text>
        <circle cx="205" cy="75" r="3" fill="#67e8f9" /><circle cx="395" cy="75" r="3" fill="#c4b5fd" />
      </svg>
    );
  }

  return (
    <svg role="img" aria-label="Illustration of an automation workflow from trigger to action" viewBox="0 0 600 150" className="mb-5 h-36 w-full rounded-2xl border border-white/[0.08] bg-slate-950/60">
      <path d="M88 74 H512" stroke="rgba(103,232,249,.24)" strokeWidth="2" />
      <path d="M120 74 H480" stroke="rgba(103,232,249,.5)" strokeWidth="1" strokeDasharray="4 8" />
      {[120, 240, 360, 480].map((x, index) => (
        <g key={x}>
          <rect x={x - 38} y="43" width="76" height="62" rx="16" fill={index === 2 ? '#17122a' : '#101a25'} stroke={index === 2 ? 'rgba(196,181,253,.46)' : 'rgba(103,232,249,.24)'} />
          <circle cx={x} cy="64" r="6" fill={index === 2 ? '#c4b5fd' : '#67e8f9'} fillOpacity=".76" />
          <text x={x} y="88" textAnchor="middle" fill="#cbd5e1" fontSize="10">{['Trigger', 'Process', 'AI decision', 'Action'][index]}</text>
        </g>
      ))}
      <circle cx="178" cy="74" r="3" fill="#a5f3fc" /><circle cx="298" cy="74" r="3" fill="#c4b5fd" /><circle cx="418" cy="74" r="3" fill="#a5f3fc" />
    </svg>
  );
};

const serviceJourneys = [
  [
    { title: 'Trigger', description: 'Receive a form, webhook, or scheduled event.' },
    { title: 'Processing', description: 'Validate and route the incoming information.' },
    { title: 'AI decision', description: 'Use a bounded AI step where it adds value.' },
    { title: 'Automated action', description: 'Send a clear next step or human hand-off.' },
  ],
  [
    { title: 'Discover', description: 'Clarify the audience and the site’s purpose.' },
    { title: 'Design', description: 'Shape a clear visual and content hierarchy.' },
    { title: 'Responsive build', description: 'Create layouts for desktop and mobile.' },
    { title: 'Connect', description: 'Add enquiry forms and useful integrations.' },
  ],
  [
    { title: 'Input', description: 'Collect the information a process needs.' },
    { title: 'AI processing', description: 'Interpret context with a bounded task.' },
    { title: 'Data', description: 'Keep outputs structured and reviewable.' },
    { title: 'Decision', description: 'Route results to an action or person.' },
  ],
];

const Services = memo(() => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative overflow-hidden bg-[#030712] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <SectionBackground variant="services" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[.75fr_1.25fr] lg:items-end"
        >
          <div>
            <p className="section-kicker">What I build</p>
            <h2 className="section-title mt-4">Three ways to move an idea forward.</h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Automation engineering, thoughtful web development, and AI-enabled operating systems—scoped around the process rather than a fashionable tool.
            </p>
            <MagneticButton
              onClick={() => scrollToAndHighlight('contact')}
              className="focus-ring mt-6 inline-flex min-h-11 items-center rounded-full border border-cyan-300/25 bg-cyan-300/[0.08] px-5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/[0.14]"
            >
              Discuss a project <span className="ml-2" aria-hidden="true">→</span>
            </MagneticButton>
          </div>
        </motion.header>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {offerings.map((offering, index) => {
            const styles = accentClasses[offering.accent];
            const visualType = index === 1 ? 'website' : index === 2 ? 'systems' : 'automation';

            return (
              <PointerGlow key={offering.title} tilt className="rounded-[2rem]">
                <motion.article
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -5, scale: 1.01 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, ease: 'easeOut', delay: reduceMotion ? 0 : index * 0.08 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-5 shadow-[0_18px_60px_rgba(2,6,23,0.22)] sm:p-6"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%)]" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className={`font-mono text-sm ${styles.badge}`}>{offering.number}</span>
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${styles.chip}`}>
                      {offering.title}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight text-white">{offering.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{offering.description}</p>

                  <ServiceVisual type={visualType} />
                  <ScrollFan items={serviceJourneys[index]} label={`${offering.title} illustrative journey`} />

                  <div className="mt-5 space-y-3">
                    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Problem</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{offering.problem}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Client benefit</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{offering.benefit}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {offering.labels.map((label) => (
                      <span key={label} className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-slate-200">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
              </PointerGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';
export default Services;
