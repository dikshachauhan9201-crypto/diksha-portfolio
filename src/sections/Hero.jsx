import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { memo } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import { scrollToAndHighlight } from "../utils/scroll";

// ============================================================================
// ANIMATED NAME COMPONENT
// ============================================================================
const AnimatedAccent = memo(() => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.2, duration: reduceMotion ? 0 : 0.6, type: "spring", stiffness: 120, damping: 14 }}
      className="relative inline-block"
      style={{ willChange: "transform, opacity" }}
    >
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .animated-accent-text {
          display: inline-block;
          padding: 0.04em 0.06em 0.08em;
          margin: 0 -0.04em -0.08em;
          line-height: 1;
          background: linear-gradient(90deg, #7dd3fc 0%, #7c3aed 18%, #a855f7 38%, #22d3ee 65%, #7dd3fc 100%);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 6s linear infinite;
          font-weight: inherit;
        }
      `}</style>

      <span className="animated-accent-text">Engineer</span>
    </motion.span>
  );
});

// ============================================================================
// GLASS BADGE COMPONENT
// ============================================================================
const GlassBadge = memo(() => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-slate-950/55 px-4 py-2.5 shadow-[0_18px_42px_rgba(14,116,144,0.12)] backdrop-blur-xl"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: reduceMotion ? 0 : 0.05, duration: reduceMotion ? 0 : 0.6, type: "spring", stiffness: 100, damping: 18 }}
      style={{ willChange: "transform, opacity" }}
    >
      <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.7)]">
        <span className="h-1 w-1 rounded-full bg-emerald-50" />
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100/90">
        AI Automation • Web Development
      </span>
    </motion.div>
  );
});

// ============================================================================
// MAIN HEADING WITH SPRING ANIMATION
// ============================================================================
const MainHeading = memo(() => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.h1
      className="max-w-[700px] text-left text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-white lg:max-w-[760px]"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.15, duration: reduceMotion ? 0 : 0.8, type: "spring", stiffness: 110, damping: 16 }}
      style={{ willChange: "transform, opacity" }}
    >
      <span className="mb-3 block text-[clamp(1.15rem,1.6vw,1.7rem)] font-medium tracking-[-0.03em] text-slate-200/90">
        Hi, I&apos;m Diksha Chauhan
      </span>
      <span className="block whitespace-normal text-white md:whitespace-nowrap">
        AI Automation <AnimatedAccent />
      </span>
    </motion.h1>
  );
});

// ============================================================================
// SUBHEADING REVEAL
// ============================================================================
const SubHeading = memo(() => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.h2
      className="mt-4 max-w-[540px] text-left text-lg font-medium leading-relaxed text-slate-200 sm:text-xl lg:text-[1.6rem]"
      initial={reduceMotion ? false : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.35, duration: reduceMotion ? 0 : 0.7, type: "spring", stiffness: 100, damping: 15 }}
      style={{ willChange: "transform, opacity" }}
    >
      Turning Ideas Into Intelligent Systems.
    </motion.h2>
  );
});

// ============================================================================
// HIGHLIGHTED DESCRIPTION
// ============================================================================
const Description = memo(() => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.p
      className="mt-5 max-w-[620px] text-left text-base leading-7 text-slate-300/90 sm:text-lg sm:leading-8"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: reduceMotion ? 0 : 0.5, duration: reduceMotion ? 0 : 0.7 }}
      style={{ willChange: "opacity" }}
    >
      I build intelligent automation workflows and responsive websites, connecting{" "}
      <span className="font-semibold text-cyan-200">n8n, APIs, databases, and AI services</span>{" "}
      to create practical digital experiences.
    </motion.p>
  );
});

// ============================================================================
// BUTTON COMPONENT
// ============================================================================
const ButtonLink = memo(({ onClick, children, variant = "primary" }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-base font-semibold tracking-[0.01em] transition-all duration-300 ${
        variant === "primary"
          ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-[0_16px_35px_rgba(139,92,246,0.25)]"
          : "border border-white/15 bg-slate-950/40 text-slate-100 backdrop-blur-md"
      }`}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.7, duration: reduceMotion ? 0 : 0.6, type: "spring", stiffness: 100, damping: 16 }}
      whileHover={reduceMotion ? undefined : {
        scale: 1.03,
        y: -2,
        transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 20 },
      }}
      whileTap={reduceMotion ? undefined : { scale: 0.98, transition: { duration: 0.1 } }}
      style={{ willChange: "transform, box-shadow" }}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
      <span className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${variant === "primary" ? "bg-gradient-to-r from-white/20 to-transparent" : "bg-gradient-to-r from-cyan-300/10 to-white/5"}`} />
    </motion.button>
  );
});

const WorkflowVisual = memo(() => {
  const reduceMotion = useReducedMotion();
  const tiltX = useSpring(0, { stiffness: 140, damping: 22, mass: 0.6 });
  const tiltY = useSpring(0, { stiffness: 140, damping: 22, mass: 0.6 });
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-5, 5]);

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    tiltX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    tiltY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[500px] [perspective:1100px]"
      initial={reduceMotion ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.35, duration: reduceMotion ? 0 : 0.8, type: "spring", stiffness: 110, damping: 18 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform, opacity" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="absolute inset-[12%] rounded-full bg-cyan-400/[0.08] blur-[70px]" aria-hidden="true" />
      <motion.svg
        className="relative h-full w-full overflow-visible"
        viewBox="0 0 520 520"
        role="img"
        aria-label="Interactive automation constellation connecting trigger, n8n, AI, data, and action"
        style={{ transformStyle: "preserve-3d" }}
      >
        <defs>
          <radialGradient id="constellationCore" cx="38%" cy="28%" r="75%">
            <stop offset="0%" stopColor="#164e70" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#0b1c35" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#080d1d" />
          </radialGradient>
          <radialGradient id="constellationNode" cx="32%" cy="25%" r="80%">
            <stop offset="0%" stopColor="#173d56" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0a1123" />
          </radialGradient>
          <linearGradient id="constellationLink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.12" />
            <stop offset="52%" stopColor="#67e8f9" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.18" />
          </linearGradient>
          <filter id="constellationGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="260" cy="260" r="210" fill="url(#constellationCore)" opacity="0.2" />
        <ellipse cx="260" cy="260" rx="204" ry="146" transform="rotate(-32 260 260)" fill="none" stroke="#38bdf8" strokeOpacity="0.11" strokeWidth="1" />
        <ellipse cx="260" cy="260" rx="165" ry="210" transform="rotate(36 260 260)" fill="none" stroke="#a78bfa" strokeOpacity="0.09" strokeWidth="1" />
        <circle cx="260" cy="260" r="173" fill="none" stroke="#67e8f9" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 12" />

        <g fill="none" stroke="url(#constellationLink)" strokeWidth="1.5">
          <path d="M126 150 Q178 163 226 232" />
          <path d="M394 150 Q342 163 294 232" />
          <path d="M394 370 Q342 357 294 288" />
          <path d="M126 370 Q178 357 226 288" />
        </g>
        <g fill="none" stroke="#67e8f9" strokeOpacity="0.18" strokeWidth="4" filter="url(#constellationGlow)">
          <path d="M126 150 Q178 163 226 232" />
          <path d="M394 150 Q342 163 294 232" />
          <path d="M394 370 Q342 357 294 288" />
          <path d="M126 370 Q178 357 226 288" />
        </g>

        {!reduceMotion && (
          <>
            <motion.circle cx="126" cy="150" r="3" fill="#a5f3fc" filter="url(#constellationGlow)" animate={{ x: [0, 48, 100], y: [0, 28, 82], opacity: [0, 1, 0.4] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.4, ease: "easeInOut" }} />
            <motion.circle cx="394" cy="150" r="3" fill="#c4b5fd" filter="url(#constellationGlow)" animate={{ x: [0, -48, -100], y: [0, 28, 82], opacity: [0, 1, 0.4] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.4, delay: 0.8, ease: "easeInOut" }} />
            <motion.circle cx="394" cy="370" r="3" fill="#a5f3fc" filter="url(#constellationGlow)" animate={{ x: [0, -48, -100], y: [0, -28, -82], opacity: [0, 1, 0.4] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.4, delay: 1.6, ease: "easeInOut" }} />
            <motion.circle cx="126" cy="370" r="3" fill="#c4b5fd" filter="url(#constellationGlow)" animate={{ x: [0, 48, 100], y: [0, -28, -82], opacity: [0, 1, 0.4] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.4, delay: 2.4, ease: "easeInOut" }} />
          </>
        )}

        <motion.g
          style={{ transformOrigin: "260px 260px" }}
          animate={reduceMotion ? undefined : { rotate: [0, 360] }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="260" cy="87" r="2.5" fill="#a5f3fc" opacity="0.8" />
        </motion.g>
        <circle cx="260" cy="87" r="7" fill="#67e8f9" opacity="0.1" />
        <circle cx="260" cy="87" r="2" fill="#a5f3fc" />
        <circle cx="433" cy="260" r="2" fill="#c4b5fd" opacity="0.7" />
        <circle cx="87" cy="260" r="2" fill="#67e8f9" opacity="0.7" />

        <g>
          <circle cx="260" cy="260" r="91" fill="#67e8f9" opacity="0.05" filter="url(#constellationGlow)" />
          <circle cx="260" cy="260" r="78" fill="url(#constellationCore)" stroke="#67e8f9" strokeOpacity="0.42" strokeWidth="1.4" />
          <circle cx="260" cy="260" r="68" fill="none" stroke="#a78bfa" strokeOpacity="0.22" strokeWidth="1" />
          <circle cx="260" cy="260" r="57" fill="none" stroke="#67e8f9" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="1 7" />
          <g fill="none" stroke="#a5f3fc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
            <path d="M238 250h10l10 10 10-10h14" opacity="0.9" />
            <path d="M238 270h14l10-10 10 10h14" opacity="0.55" />
            <circle cx="238" cy="250" r="2.5" fill="#a5f3fc" stroke="none" />
            <circle cx="282" cy="250" r="2.5" fill="#67e8f9" stroke="none" />
            <circle cx="238" cy="270" r="2.5" fill="#a78bfa" stroke="none" />
            <circle cx="282" cy="270" r="2.5" fill="#a5f3fc" stroke="none" />
          </g>
          <text x="260" y="305" textAnchor="middle" fill="#f1f5f9" fontSize="18" fontWeight="600" letterSpacing="0.04em">n8n</text>
        </g>

        <g>
          <motion.g animate={reduceMotion ? undefined : { y: [0, -4, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}>
            <circle cx="126" cy="150" r="48" fill="#67e8f9" opacity="0.08" filter="url(#constellationGlow)" />
            <circle cx="126" cy="150" r="38" fill="url(#constellationNode)" stroke="#67e8f9" strokeOpacity="0.45" strokeWidth="1.2" />
            <path d="M115 141h22v18h-22zM119 146h14M119 151h9M126 136v5" fill="none" stroke="#a5f3fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="126" y="204" textAnchor="middle" fill="#dbeafe" fontSize="14" fontWeight="600" letterSpacing="1.25">TRIGGER</text>
          </motion.g>
        </g>

        <g>
          <motion.g animate={reduceMotion ? undefined : { y: [0, 4, 0] }} transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}>
            <circle cx="394" cy="150" r="48" fill="#a78bfa" opacity="0.09" filter="url(#constellationGlow)" />
            <circle cx="394" cy="150" r="38" fill="url(#constellationNode)" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="1.2" />
            <path d="M394 135v8m-7 3 7 4 7-4m-14 10 7-4 7 4" fill="none" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="394" cy="134" r="2.5" fill="#c4b5fd" />
            <circle cx="387" cy="158" r="2.5" fill="#c4b5fd" />
            <circle cx="401" cy="158" r="2.5" fill="#c4b5fd" />
            <text x="394" y="204" textAnchor="middle" fill="#e9ddff" fontSize="14" fontWeight="600" letterSpacing="1.25">AI</text>
          </motion.g>
        </g>

        <g>
          <motion.g animate={reduceMotion ? undefined : { y: [0, -4, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
            <circle cx="394" cy="370" r="48" fill="#60a5fa" opacity="0.08" filter="url(#constellationGlow)" />
            <circle cx="394" cy="370" r="38" fill="url(#constellationNode)" stroke="#60a5fa" strokeOpacity="0.48" strokeWidth="1.2" />
            <ellipse cx="394" cy="359" rx="11" ry="4" fill="none" stroke="#bfdbfe" strokeWidth="1.4" />
            <path d="M383 359v18c0 2.2 4.9 4 11 4s11-1.8 11-4v-18M383 368c0 2.2 4.9 4 11 4s11-1.8 11-4" fill="none" stroke="#bfdbfe" strokeWidth="1.4" />
            <text x="394" y="424" textAnchor="middle" fill="#dbeafe" fontSize="14" fontWeight="600" letterSpacing="1.25">DATA</text>
          </motion.g>
        </g>

        <g>
          <motion.g animate={reduceMotion ? undefined : { y: [0, 4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <circle cx="126" cy="370" r="48" fill="#34d399" opacity="0.07" filter="url(#constellationGlow)" />
            <circle cx="126" cy="370" r="38" fill="url(#constellationNode)" stroke="#34d399" strokeOpacity="0.44" strokeWidth="1.2" />
            <path d="M115 361h17l5 5v13h-22zM119 367h13M119 372h9M132 361v5h5" fill="none" stroke="#a7f3d0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <text x="126" y="424" textAnchor="middle" fill="#d1fae5" fontSize="14" fontWeight="600" letterSpacing="1.25">ACTION</text>
          </motion.g>
        </g>

        <circle cx="126" cy="150" r="2.5" fill="#a5f3fc" />
        <circle cx="394" cy="150" r="2.5" fill="#c4b5fd" />
        <circle cx="394" cy="370" r="2.5" fill="#bfdbfe" />
        <circle cx="126" cy="370" r="2.5" fill="#a7f3d0" />
      </motion.svg>
    </motion.div>
  );
});

// ============================================================================
// ANIMATED SCROLL INDICATOR
// ============================================================================
const ScrollIndicator = memo(() => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: reduceMotion ? 0 : 0.9, duration: reduceMotion ? 0 : 0.6 }}
      style={{ willChange: "opacity" }}
    >
      <motion.div
        className="rounded-3xl border-2 border-slate-400/40 p-2"
        animate={reduceMotion ? undefined : { borderColor: ["rgba(148, 163, 184, 0.4)", "rgba(34, 211, 238, 0.6)", "rgba(148, 163, 184, 0.4)"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="h-2 w-1 rounded-full bg-gradient-to-b from-slate-300 to-transparent"
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
        />
      </motion.div>
      <motion.span
        className="text-xs font-medium uppercase tracking-widest text-slate-400"
        animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "opacity" }}
      >
        Scroll
      </motion.span>
    </motion.div>
  );
});

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================
const Hero = memo(() => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative isolate flex min-h-[min(900px,100svh)] items-center overflow-hidden bg-[#030712] px-5 pb-24 pt-28 text-white sm:px-8 sm:pt-32 lg:px-12">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-0 xl:flex-row xl:items-center xl:justify-between xl:gap-12">
        <motion.div
          className="w-full max-w-[650px]"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
        >
          <GlassBadge />
          <MainHeading />
          <SubHeading />
          <Description />

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink onClick={() => scrollToAndHighlight("projects")} variant="primary">
              Explore My Projects
            </ButtonLink>
            <ButtonLink onClick={() => scrollToAndHighlight("contact")} variant="secondary">
              Let&apos;s Discuss a Project
            </ButtonLink>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-300">
            <span className="flex items-baseline gap-2">
              <strong className="text-2xl font-semibold tracking-tight text-white">50+</strong>
              <span className="text-slate-400">Workflows Built</span>
            </span>
            <span className="hidden h-5 w-px bg-white/15 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              n8n • Primary Platform
            </span>
          </div>
        </motion.div>

        <WorkflowVisual />
      </div>

      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2 sm:bottom-8">
        <ScrollIndicator />
      </motion.div>
    </section>
  );
});

export default Hero;