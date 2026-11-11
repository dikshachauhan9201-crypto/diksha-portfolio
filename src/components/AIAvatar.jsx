import { memo, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const storyStages = [
  { eyebrow: '01 / THINK', caption: 'Find the signal' },
  { eyebrow: '02 / NOTICE', caption: 'A useful idea takes shape' },
  { eyebrow: '03 / BUILD', caption: 'Connect the working parts' },
  { eyebrow: '04 / EXPAND', caption: 'Let the system scale' },
  { eyebrow: '05 / COMPLETE', caption: 'Ready for a human hand-off' },
];

const AIAvatar = memo(() => {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const stageTimer = window.setInterval(() => {
      setStage((current) => (current + 1) % storyStages.length);
    }, 3600);

    return () => window.clearInterval(stageTimer);
  }, [reduceMotion]);

  return (
    <div className="relative aspect-[13/12] w-full overflow-hidden" aria-hidden="true">
      <motion.img
        src="/images/portfolio/about-workspace-reference.png"
        alt=""
        width="832"
        height="768"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'brightness(.78) saturate(.82) contrast(1.04)' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,20,.10)_0%,rgba(5,8,20,.02)_40%,rgba(5,8,20,.64)_100%),linear-gradient(90deg,rgba(5,8,20,.42),transparent_52%)]" />
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 86% 47%, rgba(103,232,249,.46), transparent 44%)', mixBlendMode: 'screen' }}
        animate={{ opacity: stage >= 4 ? 0.42 : stage >= 2 ? 0.16 : stage === 1 ? 0.08 : 0 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          className="absolute right-3 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#090b18]/65 px-3 py-2 text-[9px] font-medium tracking-wide text-slate-100 shadow-lg backdrop-blur-md sm:right-5 sm:top-6"
          initial={reduceMotion ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.35 }}
        >
          <span className="font-mono text-cyan-200/75">{storyStages[stage].eyebrow}</span>
          <span>{storyStages[stage].caption}</span>
        </motion.div>
      </AnimatePresence>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 832 768"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="story-line" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#67e8f9" />
          </linearGradient>
          <filter id="story-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.circle
          cx="704"
          cy="183"
          r="5"
          fill="#c4b5fd"
          filter="url(#story-glow)"
          initial={false}
          animate={{ opacity: stage >= 1 ? [0.35, 0.9, 0.35] : 0, scale: stage >= 1 ? [0.85, 1.15, 0.85] : 0.7 }}
          transition={stage >= 1 ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.5 }}
        />

        {[
          'M704 199 C704 229 678 237 678 263',
          'M678 279 C678 310 730 317 730 348',
          'M730 364 C730 395 684 402 684 433',
          'M684 449 C684 480 744 487 744 518',
          'M678 263 C647 281 642 323 662 348',
          'M730 348 C770 363 772 404 744 433',
          'M684 433 C646 454 642 488 664 518',
        ].map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke="url(#story-line)"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#story-glow)"
            initial={false}
            animate={{ pathLength: stage >= (index < 4 ? 2 : 3) ? 1 : 0, opacity: stage >= (index < 4 ? 2 : 3) ? 0.72 : 0 }}
            transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {[
          { x: 678, y: 271, label: 'VALIDATE' },
          { x: 730, y: 356, label: 'DECIDE' },
          { x: 684, y: 441, label: 'STORE' },
          { x: 744, y: 526, label: 'DELIVER' },
          { x: 662, y: 356, label: 'REVIEW' },
          { x: 744, y: 441, label: 'ROUTE' },
          { x: 664, y: 526, label: 'NOTIFY' },
        ].map((node, index) => (
          <motion.g
            key={node.label}
            initial={false}
            animate={{
              opacity: stage >= (index < 4 ? 2 : 3) ? 1 : 0,
              scale: stage >= (index < 4 ? 2 : 3) ? 1 : 0.7,
            }}
            transition={{ duration: 0.55, delay: index * 0.07 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <circle cx={node.x} cy={node.y} r="12" fill="#0b1020" fillOpacity=".82" stroke="url(#story-line)" strokeOpacity=".72" />
            <circle cx={node.x} cy={node.y} r="3" fill={stage >= 4 ? '#a7f3d0' : '#c4b5fd'} />
            <text x={node.x + 17} y={node.y + 3} fill="#eef2ff" fillOpacity=".82" fontSize="8" letterSpacing="1.3">{node.label}</text>
          </motion.g>
        ))}

        <motion.circle
          cx="0"
          cy="0"
          r="3"
          fill="#cffafe"
          filter="url(#story-glow)"
          animate={{ opacity: stage >= 2 ? 0.9 : 0 }}
          transition={{ duration: 0.35 }}
        >
          {!reduceMotion && <animateMotion path="M678 271 L730 356 L684 441 L744 526" dur="5s" repeatCount="indefinite" />}
        </motion.circle>
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#070a17]/90 to-transparent" />
      <span className="absolute bottom-3 right-3 text-[8px] uppercase tracking-[0.16em] text-white/55 sm:bottom-5 sm:right-5">
        Diksha · AI Automation Engineer
      </span>
    </div>
  );
});

AIAvatar.displayName = 'AIAvatar';

export default AIAvatar;
