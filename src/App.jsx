import React, { lazy, Suspense, useMemo } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Navbar from './components/Navbar';
import PortfolioAssistant from './components/PortfolioAssistant';

const Hero = lazy(() => import('./sections/Hero'));
const About = lazy(() => import('./sections/About'));
const Services = lazy(() => import('./sections/Services'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const WebDevelopment = lazy(() => import('./sections/WebDevelopment'));
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

const SectionReveal = React.memo(function SectionReveal({
  children,
  offset = 0,
  reducedMotion,
  viewportAmount = 0.12,
  initialVisible = false,
}) {
  return (
    <motion.div
      initial={reducedMotion || initialVisible ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      variants={sectionVariants}
      viewport={{ once: true, amount: viewportAmount }}
      style={reducedMotion ? undefined : { y: offset }}
    >
      {children}
    </motion.div>
  );
});

function App() {
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

  return (
    <div className="relative w-full min-h-screen bg-[#030712] overflow-x-hidden">
      <motion.div
        className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left bg-gradient-to-r from-[#0099ff] via-[#00d9ff] to-[#66f0ff]"
        style={{ scaleX: progressScale }}
      />

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
        <SectionReveal
          offset={sectionOffsets.about}
          reducedMotion={prefersReducedMotion}
          viewportAmount={0.03}
          initialVisible
        >
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
        <WebDevelopment />
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

      <PortfolioAssistant />
    </div>
  );
}

export default App;
