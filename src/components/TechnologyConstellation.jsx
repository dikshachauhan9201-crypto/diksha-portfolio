import { memo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './TechnologyConstellation.css';

const technologies = [
  { name: 'n8n', group: 'Workflow orchestration', description: 'Primary workflow automation platform.', kind: 'n8n', priority: true },
  { name: 'OpenAI', group: 'AI integrations', description: 'Structured AI steps inside bounded workflows.', kind: 'openai' },
  { name: 'React', group: 'Web development', description: 'Component-based responsive interfaces.', kind: 'react' },
  { name: 'JavaScript', group: 'Web development', description: 'Workflow logic and interactive experiences.', kind: 'javascript' },
  { name: 'APIs', group: 'Integrations', description: 'Connect services with explicit data contracts.', kind: 'api' },
  { name: 'Webhooks', group: 'Integrations', description: 'Trigger workflows from incoming events.', kind: 'webhook' },
  { name: 'Google Sheets', group: 'Data management', description: 'Structured records and lightweight operations.', kind: 'sheets' },
  { name: 'GitHub', group: 'Creative & digital', description: 'Version control for digital projects.', kind: 'github' },
];

const Logo = ({ kind }) => {
  if (kind === 'javascript') {
    return <span className="technology-constellation__js" aria-hidden="true">JS</span>;
  }

  if (kind === 'n8n') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M11 24h9m8 0h9M20 24l4-8 4 8-4 8-4-8Z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="24" r="3" fill="currentColor" /><circle cx="39" cy="24" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (kind === 'react') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <ellipse cx="24" cy="24" rx="19" ry="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <ellipse cx="24" cy="24" rx="19" ry="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="19" ry="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" transform="rotate(120 24 24)" />
        <circle cx="24" cy="24" r="3.3" fill="currentColor" />
      </svg>
    );
  }

  if (kind === 'openai') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 7.5a8.2 8.2 0 0 1 7.2 4.2 8.2 8.2 0 0 1 9.4 8.1 8.3 8.3 0 0 1 1.5 13.1 8.2 8.2 0 0 1-7.3 10.1 8.3 8.3 0 0 1-14.2 1.2 8.2 8.2 0 0 1-9.4-8.1 8.3 8.3 0 0 1-1.5-13.1A8.2 8.2 0 0 1 17 12.9 8.2 8.2 0 0 1 24 7.5Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="m18.7 16 11.6 6.7v13.4M12.8 23.2l11.6 6.7 11.6-6.7M18.8 36V22.7l11.5-6.6" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === 'api' || kind === 'webhook') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        {kind === 'api' ? (
          <>
            <path d="M9 15h13m4 0h13M9 33h13m4 0h13M17 15v18m14-18v18" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
            <circle cx="9" cy="15" r="3" fill="currentColor" /><circle cx="39" cy="15" r="3" fill="currentColor" /><circle cx="9" cy="33" r="3" fill="currentColor" /><circle cx="39" cy="33" r="3" fill="currentColor" />
          </>
        ) : (
          <>
            <path d="M11 24h8m10 0h8M19 24a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <path d="m24 7 3 6-3 3-3-3 3-6Zm0 25 3 3-3 6-3-6 3-3Z" fill="currentColor" />
          </>
        )}
      </svg>
    );
  }

  if (kind === 'sheets') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M12 7h17l8 8v26H12V7Z" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
        <path d="M29 7v9h8M17 22h15M17 28h15M17 34h15M23 22v12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 5 39 13.5v17L24 39l-15-8.5v-17L24 5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 28c0-3 2-4 5-4s5-1 5-4-2-4-5-4-5 1-5 4m15-4v12m-5-12h10m-5 0v12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

const ConstellationNode = ({ item, index, progress, reducedMotion }) => {
  const opacity = useTransform(progress, [0, 0.35 + index * 0.025, 0.78, 1], [0.18, 0.75, 1, 1]);
  const scale = useTransform(progress, [0, 0.52, 1], [0.78, 0.94, 1]);
  const x = useTransform(progress, [0, 0.62, 1], [index % 2 ? 34 : -34, index % 2 ? 10 : -10, 0]);
  const y = useTransform(progress, [0, 0.62, 1], [index % 3 === 0 ? 34 : -22, index % 3 === 0 ? 10 : -8, 0]);

  return (
    <motion.article
      className={`technology-constellation__node ${item.priority ? 'technology-constellation__node--primary' : ''}`}
      style={{
        opacity: reducedMotion ? 1 : opacity,
        scale: reducedMotion ? 1 : scale,
        x: reducedMotion ? 0 : x,
        y: reducedMotion ? 0 : y,
        zIndex: item.priority ? 2 : 1,
        '--tech-depth': item.priority ? '14px' : `${8 - (index % 4) * 5}px`,
        '--tech-drift-duration': `${6 + (index % 4) * 1.5}s`,
        '--tech-drift-delay': `${-index * 0.7}s`,
      }}
      onPointerMove={(event) => {
        if (event.pointerType === 'touch') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--tech-tilt-x', `${(50 - ((event.clientY - bounds.top) / bounds.height) * 100) / 18}deg`);
        event.currentTarget.style.setProperty('--tech-tilt-y', `${(((event.clientX - bounds.left) / bounds.width) * 100 - 50) / 18}deg`);
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty('--tech-tilt-x');
        event.currentTarget.style.removeProperty('--tech-tilt-y');
      }}
    >
      <span className="technology-constellation__surface">
        <span className="technology-constellation__logo"><span className="technology-constellation__logo-object"><Logo kind={item.kind} /></span></span>
        <span className="technology-constellation__name">{item.name}</span>
        <span className="technology-constellation__group">{item.group}</span>
        <span className="technology-constellation__description">{item.description}</span>
      </span>
    </motion.article>
  );
};

const TechnologyConstellation = memo(() => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'start 22%'] });

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    event.currentTarget.style.setProperty('--constellation-x', `${x}px`);
    event.currentTarget.style.setProperty('--constellation-y', `${y}px`);
  };

  const handlePointerLeave = (event) => {
    event.currentTarget.style.removeProperty('--constellation-x');
    event.currentTarget.style.removeProperty('--constellation-y');
  };

  return (
    <section
      ref={ref}
      className="technology-constellation"
      aria-label="Technology constellation"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="technology-constellation__header">
        <span className="section-kicker">The tools behind the systems</span>
        <p>Technologies I use to connect workflows, data, and digital experiences.</p>
      </div>
      <div className="technology-constellation__stage" aria-label="Illustrative technology ecosystem">
        {technologies.map((item, index) => (
          <ConstellationNode
            key={item.name}
            item={item}
            index={index}
            progress={scrollYProgress}
            reducedMotion={reduceMotion}
          />
        ))}
      </div>
      <p className="technology-constellation__note">Illustrative technology ecosystem · symbols do not represent live connections</p>
    </section>
  );
});

TechnologyConstellation.displayName = 'TechnologyConstellation';

export default TechnologyConstellation;
