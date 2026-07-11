import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

const makePoints = (count) =>
  Array.from({ length: count }).map((_, index) => ({
    id: index,
    x: (index * 37) % 100,
    y: (index * 53) % 100,
    size: (index % 3) + 1,
    drift: 8 + (index % 6) * 2,
    duration: 12 + (index % 7) * 1.5,
  }));

const SectionBackground = memo(({ variant = 'default' }) => {
  const particles = useMemo(() => makePoints(32), []);
  const dots = useMemo(() => makePoints(26), []);

  if (variant === 'about') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(1100px at 15% 20%, rgba(0,217,255,0.14), transparent 70%), radial-gradient(900px at 85% 80%, rgba(168,85,247,0.12), transparent 72%)',
              'radial-gradient(1100px at 80% 25%, rgba(0,217,255,0.14), transparent 70%), radial-gradient(900px at 18% 72%, rgba(168,85,247,0.12), transparent 72%)',
              'radial-gradient(1100px at 15% 20%, rgba(0,217,255,0.14), transparent 70%), radial-gradient(900px at 85% 80%, rgba(168,85,247,0.12), transparent 72%)',
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.svg
          className="absolute inset-0 h-full w-full opacity-25"
          viewBox="0 0 1200 900"
          preserveAspectRatio="none"
        >
          {[0, 1, 2].map((ray) => (
            <motion.line
              key={ray}
              x1={80 + ray * 260}
              y1={-80}
              x2={420 + ray * 240}
              y2={920}
              stroke="rgba(0,217,255,0.2)"
              strokeWidth="2"
              animate={{ opacity: [0.06, 0.24, 0.06], x: [0, 20, 0] }}
              transition={{ duration: 10 + ray * 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </motion.svg>

        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-cyan-300/40"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -particle.drift, 0],
              x: [0, particle.drift * 0.4, 0],
              opacity: [0.25, 0.7, 0.25],
            }}
            transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'services') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.svg
          className="absolute inset-0 h-full w-full opacity-35"
          viewBox="0 0 1200 900"
          preserveAspectRatio="none"
          animate={{ opacity: [0.18, 0.34, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          {[1, 2, 3, 4].map((line) => (
            <motion.path
              key={line}
              d={`M 0 ${120 + line * 120} C 280 ${90 + line * 110}, 760 ${200 + line * 90}, 1200 ${110 + line * 130}`}
              fill="none"
              stroke="rgba(0,217,255,0.35)"
              strokeWidth="1.5"
              strokeDasharray="12 16"
              animate={{ strokeDashoffset: [0, -180] }}
              transition={{ duration: 10 + line * 2.5, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </motion.svg>

        <motion.div
          className="absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"
          animate={{ x: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  if (variant === 'skills') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 1000 700" preserveAspectRatio="none">
          {dots.slice(0, 14).map((dot, index) => {
            const next = dots[(index + 5) % dots.length];
            return (
              <line
                key={`line-${dot.id}`}
                x1={`${dot.x}%`}
                y1={`${dot.y}%`}
                x2={`${next.x}%`}
                y2={`${next.y}%`}
                stroke="rgba(0,217,255,0.25)"
                strokeWidth="0.8"
              />
            );
          })}
        </svg>

        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-cyan-300"
            style={{ width: dot.size, height: dot.size, left: `${dot.x}%`, top: `${dot.y}%` }}
            animate={{ y: [0, -dot.drift * 0.35, 0], opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: dot.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'projects') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage:
              'linear-gradient(120deg, rgba(0,153,255,0.06), rgba(168,85,247,0.06), rgba(0,217,255,0.06))',
            backgroundSize: '220% 220%',
          }}
        />

        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl"
          animate={{ x: [-50, 60, -50], y: [0, 25, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-purple-400/15 blur-3xl"
          animate={{ x: [40, -55, 40], y: [0, -25, 0], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut' }}
        />

        {particles.slice(0, 18).map((particle) => (
          <motion.div
            key={`project-particle-${particle.id}`}
            className="absolute rounded-full bg-cyan-300/45"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{ y: [0, -particle.drift * 0.6, 0], opacity: [0.12, 0.42, 0.12] }}
            transition={{ duration: particle.duration + 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'contact') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(900px at 50% 45%, rgba(168,85,247,0.22), transparent 72%)',
              'radial-gradient(950px at 55% 55%, rgba(168,85,247,0.28), transparent 74%)',
              'radial-gradient(900px at 50% 45%, rgba(168,85,247,0.22), transparent 72%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-fuchsia-400/15 blur-3xl"
          animate={{ x: [0, 25, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {particles.slice(0, 16).map((particle) => (
          <motion.div
            key={`contact-particle-${particle.id}`}
            className="absolute rounded-full bg-fuchsia-200/50"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{ y: [0, -particle.drift * 0.5, 0], opacity: [0.08, 0.3, 0.08] }}
            transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,217,255,0.12),transparent_70%)]"
        animate={{ opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
});

SectionBackground.displayName = 'SectionBackground';

export default SectionBackground;
