import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import PointerGlow from '../components/PointerGlow';
import MagneticButton from '../components/MagneticButton';
import SectionBackground from '../components/SectionBackground';
import ScrollFan from '../components/ScrollFan';
import { scrollToAndHighlight } from '../utils/scroll';

const webConcepts = [
  {
    title: 'Service Business Website',
    type: 'Proposed website concept',
    purpose: 'A clear service-led site designed to turn visits into qualified enquiries.',
    features: ['Service architecture', 'Lead capture', 'Mobile-first layouts', 'Automation-ready forms'],
    palette: 'from-amber-200/20 via-orange-300/10 to-transparent',
    preview: 'studio',
  },
  {
    title: 'Focused Campaign Landing Page',
    type: 'Proposed website concept',
    purpose: 'A concise launch page with strong hierarchy, focused messaging, and measurable calls to action.',
    features: ['Value proposition', 'Feature narrative', 'Responsive CTA flow', 'Form integration'],
    palette: 'from-violet-300/20 via-fuchsia-300/10 to-transparent',
    preview: 'campaign',
  },
];

const conceptGallery = [
  { label: 'AI Automation', title: 'Agentic AI', copy: 'Automation-first experiences for path-aware operations and intelligent decisioning.', accent: 'from-cyan-400/28 via-sky-500/10 to-slate-950', visual: 'cyan' },
  { label: 'Workflow Design', title: 'Workflow Systems', copy: 'Clear process logic with triggers, approvals, live data, and fast recovery paths.', accent: 'from-violet-400/28 via-purple-500/10 to-slate-950', visual: 'violet' },
  { label: 'Website Growth', title: 'Business Sites', copy: 'Service-led design systems for trust-building pages and strong conversion journeys.', accent: 'from-amber-400/28 via-orange-500/10 to-slate-950', visual: 'amber' },
  { label: 'Operations', title: 'Monitoring', copy: 'Operational oversight for events, errors, and human-readable exception flows.', accent: 'from-emerald-300/20 via-cyan-500/10 to-slate-950', visual: 'emerald' },
  { label: 'AI Content', title: 'Content Ops', copy: 'Research, review, scheduling, and publishing that keeps ideas actionable.', accent: 'from-fuchsia-400/25 via-pink-500/10 to-slate-950', visual: 'pink' },
  { label: 'Intelligence', title: 'Research Briefs', copy: 'Structured insight capture, relevance scoring, and quick summarised decisions.', accent: 'from-blue-400/25 via-indigo-500/10 to-slate-950', visual: 'blue' },
];

const webPreviewStories = [
  { title: 'Personal portfolio', detail: 'A clear professional identity and work showcase.', tone: '#73d9e7', meta: 'Illustrative direction' },
  { title: 'Business website', detail: 'Service-led information with a focused enquiry path.', tone: '#9ab2a0', meta: 'Illustrative direction' },
  { title: 'Campaign landing page', detail: 'One message, a considered visual, and a clear next step.', tone: '#b5a2df', meta: 'Illustrative direction' },
  { title: 'Responsive experience', detail: 'Layouts considered for desktop and smaller screens.', tone: '#e5c992', meta: 'Illustrative direction' },
];

const PreviewWindow = ({ tone }) => (
  <svg viewBox="0 0 120 48" className="h-8 w-full max-w-36" aria-hidden="true">
    <rect x="1" y="1" width="118" height="46" rx="6" fill="#0b1220" stroke="rgba(255,255,255,.2)" />
    <path d="M1 10h118" stroke="rgba(255,255,255,.13)" />
    <circle cx="7" cy="5.5" r="1.5" fill="#fda4af" />
    <circle cx="13" cy="5.5" r="1.5" fill="#fcd34d" />
    <circle cx="19" cy="5.5" r="1.5" fill="#86efac" />
    <path d="M9 19h42m-42 5h31m-31 5h36" stroke={tone} strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
    <rect x="72" y="15" width="36" height="25" rx="3" fill={tone} fillOpacity=".3" />
  </svg>
);

const BrowserFrame = memo(({ concept = false, preview = 'studio', palette = 'from-cyan-300/20 via-blue-300/10 to-transparent' }) => {
  const isStudio = preview === 'studio';
  const content = isStudio
    ? {
      name: 'COMMON GROUND',
      kicker: 'INTERIORS, WITH INTENTION',
      title: 'A home that feels like you.',
      description: 'Thoughtful rooms, considered materials, and a process that feels refreshingly clear.',
      action: 'Explore the studio',
      surface: 'bg-[#F6F1E7]',
      ink: 'text-[#34463B]',
      accent: 'bg-[#496451]',
    }
    : {
      name: 'NORTHSTAR',
      kicker: 'A BETTER WAY TO BEGIN',
      title: 'Make your next move count.',
      description: 'A focused launch page that turns one useful idea into a confident first step.',
      action: 'See how it works',
      surface: 'bg-[#F2EFFA]',
      ink: 'text-[#352B4C]',
      accent: 'bg-[#65518D]',
    };

  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${palette} bg-[#09101d] shadow-[0_28px_70px_rgba(0,0,0,.28)]`}>
      <div className="flex h-9 items-center gap-1.5 border-b border-white/10 bg-slate-950/75 px-4" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-rose-300/70" /><span className="h-2 w-2 rounded-full bg-amber-300/70" /><span className="h-2 w-2 rounded-full bg-emerald-300/70" />
        <span className="ml-3 rounded-full bg-white/[0.07] px-3 py-1 text-[8px] text-slate-500">design-study.local</span>
      </div>
      <div className={`relative grid min-h-64 gap-5 p-6 sm:grid-cols-[1.05fr_.95fr] sm:p-8 ${content.surface} ${content.ink}`}>
        <div className="relative z-10 flex flex-col justify-center">
          <span className="text-[9px] font-bold tracking-[0.17em] opacity-60">{content.name}</span>
          <p className="mt-7 text-[9px] font-semibold tracking-[0.16em] opacity-60">{content.kicker}</p>
          <h3 className="mt-2 max-w-[15ch] font-serif text-2xl leading-tight tracking-tight sm:text-3xl">{content.title}</h3>
          <p className="mt-3 max-w-sm text-xs leading-5 opacity-75">{content.description}</p>
          <span className={`mt-5 inline-flex w-fit rounded-full ${content.accent} px-4 py-2 text-[10px] font-semibold text-white`}>{content.action}<span className="ml-2" aria-hidden="true">↗</span></span>
        </div>
        <div className={`relative min-h-44 overflow-hidden rounded-xl ${isStudio ? 'bg-[#D7D1BE]' : 'bg-[#D8D2E7]'}`} aria-hidden="true">
          {isStudio ? (
            <svg viewBox="0 0 360 230" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
              <rect width="360" height="230" fill="#C5C9B2" />
              <path d="M0 150C67 106 111 131 153 150C211 176 253 102 360 79V230H0V150Z" fill="#7B8D73" />
              <path d="M0 184C82 145 120 165 173 184C230 205 280 155 360 130V230H0V184Z" fill="#516B58" />
              <circle cx="266" cy="75" r="27" fill="#F0D7A7" />
              <path d="M249 0H360V230H282C265 168 253 95 249 0Z" fill="#E9DFCA" fillOpacity=".58" />
              <path d="M40 230C48 180 56 143 75 112M57 230C67 190 80 160 99 140" stroke="#D6BE96" strokeWidth="4" />
              <ellipse cx="65" cy="128" rx="23" ry="9" transform="rotate(-30 65 128)" fill="#D8D8B9" />
              <ellipse cx="88" cy="153" rx="24" ry="9" transform="rotate(-24 88 153)" fill="#B8C8A8" />
              <rect x="134" y="143" width="77" height="87" fill="#D7C7A9" fillOpacity=".75" />
              <path d="M145 157H198M145 168H190M145 179H195" stroke="#657568" strokeWidth="3" />
            </svg>
          ) : (
            <svg viewBox="0 0 360 230" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
              <rect width="360" height="230" fill="#51446C" />
              <path d="M183 0H360V230H226C211 173 195 95 183 0Z" fill="#8D7AA8" />
              <path d="M224 0H360V230H276C261 157 242 74 224 0Z" fill="#D7C9E8" fillOpacity=".75" />
              <circle cx="260" cy="82" r="28" fill="#F1D8B8" />
              <path d="M0 175C64 149 118 155 166 178C220 204 287 166 360 142V230H0V175Z" fill="#312844" />
              <rect x="35" y="42" width="84" height="5" rx="2.5" fill="#F2E8D8" fillOpacity=".75" />
              <rect x="35" y="55" width="54" height="4" rx="2" fill="#F2E8D8" fillOpacity=".4" />
              <rect x="35" y="184" width="103" height="24" rx="12" fill="#E5C79D" />
              <path d="M50 196H120" stroke="#554365" strokeWidth="2" />
            </svg>
          )}
          <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-slate-950/45 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/85">{isStudio ? 'Service website' : 'Campaign landing page'}</span>
        </div>
        {concept && <span className="absolute right-3 top-3 rounded-full border border-amber-950/10 bg-white/75 px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-amber-950/70">Illustrative concept</span>}
      </div>
    </div>
  );
});
BrowserFrame.displayName = 'BrowserFrame';

const ConceptCardVisual = ({ tone }) => {
  const systems = {
    cyan: {
      label: 'DECISION FLOW',
      steps: ['Intake', 'Context', 'Route'],
      accent: 'border-cyan-300/35 bg-cyan-300/[0.08] text-cyan-100',
    },
    violet: {
      label: 'ORCHESTRATION',
      steps: ['Trigger', 'Branch', 'Approve'],
      accent: 'border-violet-300/35 bg-violet-300/[0.08] text-violet-100',
    },
    amber: {
      label: 'RESPONSIVE DESIGN',
      steps: ['Desktop', 'Mobile', 'Clear CTA'],
      accent: 'border-amber-200/35 bg-amber-200/[0.08] text-amber-100',
    },
    emerald: {
      label: 'OPERATIONS REVIEW',
      steps: ['New event', 'Review', 'Resolved'],
      accent: 'border-emerald-300/35 bg-emerald-300/[0.08] text-emerald-100',
    },
    pink: {
      label: 'EDITORIAL WORKFLOW',
      steps: ['Brief', 'Draft', 'Review'],
      accent: 'border-pink-300/35 bg-pink-300/[0.08] text-pink-100',
    },
    blue: {
      label: 'RESEARCH BRIEF',
      steps: ['Sources', 'Score', 'Brief'],
      accent: 'border-blue-300/35 bg-blue-300/[0.08] text-blue-100',
    },
  };
  const system = systems[tone] || systems.cyan;

  return (
    <div className="relative mt-8 w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0B101A] p-5 sm:p-6" aria-hidden="true">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[9px] font-semibold tracking-[0.17em] text-slate-400">{system.label}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {system.steps.map((step, index) => (
          <div key={step} className="relative flex min-h-[4.5rem] items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-2.5 py-3">
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg border font-mono text-[9px] ${system.accent}`}>{String(index + 1).padStart(2, '0')}</span>
            <span className="text-[10px] leading-4 text-slate-300">{step}</span>
            {index < system.steps.length - 1 && <span className="absolute -right-1.5 top-1/2 z-10 hidden h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r border-t border-white/20 bg-[#111722] sm:block" />}
          </div>
        ))}
      </div>
      <p className="mt-4 text-[9px] uppercase tracking-[0.1em] text-slate-600">Illustrative system direction</p>
    </div>
  );
};

const WebDevelopment = memo(() => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="web-development" className="relative overflow-hidden border-y border-white/[0.06] bg-[#070912] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <SectionBackground variant="web" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="section-kicker text-amber-200/80">Website development</p><h2 className="section-title mt-4">Digital experiences that look considered and work clearly.</h2></div>
          <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Responsive portfolio, business, landing-page, and personal-brand experiences—with forms and automation connections when the project needs them.</p>
        </motion.header>

        <div className="grid gap-9 py-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <motion.figure initial={reduceMotion ? false : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }}>
            <PointerGlow tilt className="group rounded-[1.6rem] border border-white/10 bg-[#101822]/80 p-3 shadow-[0_28px_75px_rgba(0,0,0,.32)] sm:p-4">
              <img
                src="/images/portfolio/responsive-web-experience.svg"
                alt="Original editorial illustration of a considered service-business website displayed on a desktop monitor and mobile phone; this is a design visual, not a client-project screenshot."
                width="1200"
                height="760"
                loading="lazy"
                className="block h-auto w-full rounded-xl transition-transform duration-500 motion-safe:group-hover:scale-[1.01]"
              />
              <figcaption className="px-2 pb-1 pt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">Original responsive-design illustration · desktop and mobile</figcaption>
            </PointerGlow>
          </motion.figure>
          <motion.article initial={reduceMotion ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} className="lg:pl-6">
            <div className="flex flex-wrap gap-3"><span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">Completed · current website</span><span className="text-xs text-slate-500">Portfolio website</span></div>
            <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white">AI Automation Portfolio</h3>
            <p className="mt-4 text-base leading-8 text-slate-400">This portfolio is the verified website example available in the repository. It combines responsive information architecture, motion, project exploration, resume access, contact validation, and automation-focused visual storytelling.</p>
            <dl className="mt-7 grid gap-4 sm:grid-cols-2">
              <div><dt className="text-xs uppercase tracking-wider text-slate-500">Audience</dt><dd className="mt-2 text-sm text-slate-200">Clients and collaborators</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-slate-500">Technology</dt><dd className="mt-2 text-sm text-slate-200">React · Tailwind · Motion · Vite</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-slate-500">Responsive</dt><dd className="mt-2 text-sm text-slate-200">Mobile-first compositions</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-slate-500">Integrations</dt><dd className="mt-2 text-sm text-slate-200">Webhook-ready contact form</dd></div>
            </dl>
          </motion.article>
        </div>

        <div className="border-t border-white/10 py-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-kicker text-amber-200/80">A preview in layers</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">From one responsive canvas to a family of experiences.</h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">Scroll to open the illustrative website directions into separate panels.</p>
          </div>
          <ScrollFan
            label="Illustrative website preview directions"
            items={webPreviewStories.map((item) => ({
              title: item.title,
              description: item.detail,
              meta: item.meta,
              visual: <PreviewWindow tone={item.tone} />,
            }))}
          />
        </div>

        <div className="border-t border-white/10 pt-14">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="section-kicker text-amber-200/80">Design directions</p><h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">Website concepts available for custom development.</h3></div><p className="max-w-md text-sm leading-6 text-slate-500">These are clearly labelled concept previews, not completed client websites.</p></div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {webConcepts.map((item, index) => (
              <PointerGlow key={item.title} tilt className="rounded-[1.75rem]">
                <motion.article initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={reduceMotion ? undefined : { y: -5, scale: 1.005 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: reduceMotion ? 0 : index * 0.08, duration: 0.35, ease: 'easeOut' }} style={{ transformStyle: 'preserve-3d' }} className="portfolio-hover-card rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
                  <BrowserFrame concept preview={item.preview} palette={item.palette} />
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.17em] text-amber-200/75">{item.type}</p><h4 className="mt-3 text-2xl font-semibold text-white">{item.title}</h4><p className="mt-3 text-sm leading-7 text-slate-400">{item.purpose}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{item.features.map((feature) => <span key={feature} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-400">{feature}</span>)}</div>
                </motion.article>
              </PointerGlow>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-14">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="section-kicker text-cyan-200/80">AI concept board</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">Premium visual directions for system-led ideas.</h3>
            </div>
            <p className="max-w-lg text-sm leading-7 text-slate-500">Editorial cards with clear focus on automation, AI operations, and polished product storytelling.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {conceptGallery.map((card, index) => (
              <PointerGlow key={card.title} tilt className="rounded-[1.8rem]">
                <motion.article initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} whileHover={reduceMotion ? undefined : { y: -4, scale: 1.005 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: reduceMotion ? 0 : index * 0.07, duration: 0.35, ease: 'easeOut' }} style={{ transformStyle: 'preserve-3d' }} className={`portfolio-hover-card group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-gradient-to-br ${card.accent} p-4 shadow-[0_24px_70px_rgba(0,0,0,0.18)]`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_28%)]" />
                  <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-between">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-white/15 bg-slate-950/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200">{card.label}</span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Concept</span>
                    </div>
                    <ConceptCardVisual tone={card.visual} />
                    <div className="mt-5">
                      <p className="text-[2rem] font-semibold leading-none tracking-[-0.06em] text-white sm:text-[2.2rem]">{card.title}</p>
                      <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">{card.copy}</p>
                    </div>
                  </div>
                </motion.article>
              </PointerGlow>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl border border-amber-200/15 bg-amber-200/[0.045] p-6 sm:flex-row sm:items-center"><div><p className="font-semibold text-white">Need a website that connects to the rest of the business?</p><p className="mt-1 text-sm text-slate-400">The interface and automation layer can be scoped together.</p></div><MagneticButton onClick={() => scrollToAndHighlight('contact')} className="focus-ring min-h-11 rounded-full bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-100">Discuss a website</MagneticButton></div>
      </div>
    </section>
  );
});

WebDevelopment.displayName = 'WebDevelopment';
export default WebDevelopment;
