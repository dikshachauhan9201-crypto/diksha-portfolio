import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Navbar from './components/Navbar';

const Hero = lazy(() => import('./sections/Hero'));
const About = lazy(() => import('./sections/About'));
const Services = lazy(() => import('./sections/Services'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./sections/Footer'));

const sectionVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
};

const SectionReveal = React.memo(function SectionReveal({ children, offset = 0, reducedMotion }) {
  return (
    <motion.div
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      variants={sectionVariants}
      viewport={{ once: true, amount: 0.12 }}
      style={reducedMotion ? undefined : { y: offset }}
    >
      {children}
    </motion.div>
  );
});

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorScale, setCursorScale] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.22 });
  const aboutParallax = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const servicesParallax = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const skillsParallax = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const contactParallax = useTransform(scrollYProgress, [0, 1], [0, -12]);

  const sectionOffsets = useMemo(
    () => ({
      about: prefersReducedMotion ? 0 : aboutParallax,
      services: prefersReducedMotion ? 0 : servicesParallax,
      skills: prefersReducedMotion ? 0 : skillsParallax,
      contact: prefersReducedMotion ? 0 : contactParallax,
    }),
    [aboutParallax, servicesParallax, skillsParallax, contactParallax, prefersReducedMotion]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'smooth';

    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseOver = (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest('button, a, [role="button"], input, textarea')) {
        setCursorScale(1.55);
      }
    };

    const handleMouseOut = (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest('button, a, [role="button"], input, textarea')) {
        setCursorScale(1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#030712] overflow-x-hidden">
      <motion.div
        className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left bg-gradient-to-r from-[#0099ff] via-[#00d9ff] to-[#66f0ff]"
        style={{ scaleX: progressScale }}
      />

      <motion.div
        className="pointer-events-none fixed z-[65] hidden h-24 w-24 rounded-full bg-cyan-300/20 blur-2xl md:block"
        animate={{
          x: mousePos.x - 48,
          y: mousePos.y - 48,
          scale: cursorScale,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 0.22 }}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#020617]"
          >
            <div className="flex flex-col items-center gap-5">
              <motion.div
                className="h-16 w-16 rounded-2xl border border-cyan-300/40 bg-gradient-to-br from-cyan-400/20 to-blue-500/20"
                animate={{ rotate: 360, boxShadow: ['0 0 10px rgba(0,217,255,0.25)', '0 0 24px rgba(0,217,255,0.55)', '0 0 10px rgba(0,217,255,0.25)'] }}
                transition={{ rotate: { duration: 2.2, repeat: Infinity, ease: 'linear' }, boxShadow: { duration: 1.8, repeat: Infinity } }}
              />
              <motion.h2
                className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-2xl font-bold text-transparent"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                Diksha Chauhan
              </motion.h2>
              <motion.div
                className="h-1 w-44 overflow-hidden rounded-full bg-white/10"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0099ff] to-[#00d9ff]"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            'radial-gradient(1200px at 0% 20%, rgba(0,153,255,0.08), transparent 60%), radial-gradient(1000px at 100% 70%, rgba(168,85,247,0.07), transparent 62%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Navbar */}
      <Navbar />

      <Suspense fallback={<div className="h-[40vh] w-full" aria-hidden="true" />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<div className="h-[30vh] w-full" aria-hidden="true" />}>
        <SectionReveal offset={sectionOffsets.about} reducedMotion={prefersReducedMotion}>
          <About />
        </SectionReveal>
      </Suspense>

      <Suspense fallback={<div className="h-[30vh] w-full" aria-hidden="true" />}>
        <SectionReveal offset={sectionOffsets.services} reducedMotion={prefersReducedMotion}>
          <Services />
        </SectionReveal>
      </Suspense>

      <Suspense fallback={<div className="h-[30vh] w-full" aria-hidden="true" />}>
        <SectionReveal offset={sectionOffsets.skills} reducedMotion={prefersReducedMotion}>
          <Skills />
        </SectionReveal>
      </Suspense>

      <Suspense fallback={<div className="h-[30vh] w-full" aria-hidden="true" />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<div className="h-[30vh] w-full" aria-hidden="true" />}>
        <SectionReveal offset={sectionOffsets.contact} reducedMotion={prefersReducedMotion}>
          <Contact />
        </SectionReveal>
      </Suspense>

      <Suspense fallback={<div className="h-[12vh] w-full" aria-hidden="true" />}>
        <SectionReveal reducedMotion={prefersReducedMotion}>
          <Footer />
        </SectionReveal>
      </Suspense>
    </div>
  );
}

export default App;
