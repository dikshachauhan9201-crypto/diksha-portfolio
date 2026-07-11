import { motion } from "framer-motion";
import { memo } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import { scrollToAndHighlight } from "../utils/scroll";

// ============================================================================
// ANIMATED NAME COMPONENT
// ============================================================================
const AnimatedName = memo(() => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 120, damping: 14 }}
      className="relative inline-block"
      style={{ willChange: "transform, opacity" }}
    >
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes floatingAnimation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        
        .animated-name-text {
          display: inline-block;
          background: linear-gradient(90deg, #0099ff 0%, #00d9ff 25%, #a855f7 50%, #00d9ff 75%, #0099ff 100%);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 6s linear infinite, floatingAnimation 4s ease-in-out infinite;
          font-weight: 700;
        }
      `}</style>
      
      <span className="animated-name-text">Diksha Chauhan</span>
      
      {/* Subtle glow behind text */}
      <motion.div
        className="absolute -inset-4 pointer-events-none blur-2xl rounded-lg"
        style={{
          background: "radial-gradient(circle, rgba(0, 217, 255, 0.2) 0%, transparent 70%)",
          zIndex: -1,
        }}
        animate={{
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.span>
  );
});

// ============================================================================
// GLASS BADGE COMPONENT
// ============================================================================
const GlassBadge = memo(() => {
  return (
    <motion.div
      className="mb-8 flex items-center gap-3 rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 px-5 py-3 shadow-[0_8px_32px_rgba(0,217,255,0.15)] backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.05, duration: 0.6, type: "spring", stiffness: 100, damping: 18 }}
      style={{ willChange: "transform, opacity" }}
    >
      <span className="text-lg">🟢</span>
      <div className="flex flex-col items-start gap-0.5">
        <p className="text-xs font-semibold text-cyan-300">Available for Freelance</p>
        <p className="text-xs text-cyan-200/70">AI Automation Specialist</p>
      </div>
    </motion.div>
  );
});

// ============================================================================
// MAIN HEADING WITH SPRING ANIMATION
// ============================================================================
const MainHeading = memo(() => {
  return (
    <motion.h1
      className="max-w-5xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.8, type: "spring", stiffness: 110, damping: 16 }}
      style={{ willChange: "transform, opacity" }}
    >
      Hi, I&apos;m <AnimatedName />
    </motion.h1>
  );
});

// ============================================================================
// SUBHEADING REVEAL
// ============================================================================
const SubHeading = memo(() => {
  return (
    <motion.h2
      className="mt-8 max-w-4xl text-2xl font-semibold leading-relaxed text-slate-200 sm:text-3xl lg:text-4xl"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.7, type: "spring", stiffness: 100, damping: 15 }}
      style={{ willChange: "transform, opacity" }}
    >
      I Build Intelligent AI Automation Systems
    </motion.h2>
  );
});

// ============================================================================
// HIGHLIGHTED DESCRIPTION
// ============================================================================
const Description = memo(() => {
  const keywords = {
    "AI Agents": "from-cyan-400 to-blue-500",
    "Make.com": "from-purple-400 to-pink-500",
    "Workflow Automation": "from-blue-400 to-cyan-500",
  };

  const text =
    "I help businesses automate repetitive work using AI Agents, Make.com, APIs, WhatsApp Automation and intelligent Workflow Automation that save time, reduce manual effort and increase productivity.";

  const renderTextWithHighlights = () => {
    let rendered = [];
    let lastIndex = 0;

    const sortedKeywords = Object.keys(keywords).sort(
      (a, b) => text.indexOf(a) - text.indexOf(b)
    );

    sortedKeywords.forEach((keyword) => {
      const index = text.indexOf(keyword, lastIndex);
      if (index !== -1) {
        if (index > lastIndex) {
          rendered.push(
            <span key={`text-${lastIndex}`}>{text.substring(lastIndex, index)}</span>
          );
        }

        rendered.push(
          <span
            key={`keyword-${index}`}
            className={`bg-gradient-to-r ${keywords[keyword]} bg-clip-text font-semibold text-transparent`}
          >
            {keyword}
          </span>
        );

        lastIndex = index + keyword.length;
      }
    });

    if (lastIndex < text.length) {
      rendered.push(
        <span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>
      );
    }

    return rendered;
  };

  return (
    <motion.p
      className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      style={{ willChange: "opacity" }}
    >
      {renderTextWithHighlights()}
    </motion.p>
  );
});

// ============================================================================
// BUTTON COMPONENT
// ============================================================================
const ButtonLink = memo(({ onClick, children, variant = "primary" }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`relative rounded-full px-8 py-3.5 font-semibold transition-shadow ${
        variant === "primary"
          ? "bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 text-white shadow-lg"
          : "border border-white/15 bg-white/5 text-slate-100 backdrop-blur-md shadow-md"
      }`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6, type: "spring", stiffness: 100, damping: 16 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 20 },
      }}
      whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
      style={{ willChange: "transform, box-shadow" }}
    >
      {children}
    </motion.button>
  );
});

// ============================================================================
// ANIMATED SCROLL INDICATOR
// ============================================================================
const ScrollIndicator = memo(() => {
  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      style={{ willChange: "opacity" }}
    >
      <motion.div
        className="rounded-3xl border-2 border-slate-400/40 p-2"
        animate={{ borderColor: ["rgba(148, 163, 184, 0.4)", "rgba(34, 211, 238, 0.6)", "rgba(148, 163, 184, 0.4)"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="h-2 w-1 rounded-full bg-gradient-to-b from-slate-300 to-transparent"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
        />
      </motion.div>
      <motion.span
        className="text-xs font-medium uppercase tracking-widest text-slate-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
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
  return (
    <section id="home" className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-6 py-20 text-white sm:px-8 lg:px-12">
      <AnimatedBackground />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ willChange: "opacity" }}
      >
        {/* Glass Badge */}
        <GlassBadge />

        {/* Main Heading */}
        <MainHeading />

        {/* Subheading */}
        <SubHeading />

        {/* Description */}
        <Description />

        {/* CTA Buttons */}
        <motion.div
          className="mt-12 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ willChange: "opacity" }}
        >
          <ButtonLink onClick={() => scrollToAndHighlight("projects")} variant="primary">
            View Projects
          </ButtonLink>
          <ButtonLink onClick={() => scrollToAndHighlight("contact")} variant="secondary">
            Let&apos;s Talk
          </ButtonLink>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </motion.div>
    </section>
  );
});

export default Hero;