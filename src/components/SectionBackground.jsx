import React, { memo } from 'react';
import { motion } from 'framer-motion';

const SectionBackground = memo(({ variant = 'default' }) => {
  // About: Soft blue glow
  if (variant === 'about') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="grid-about" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#0099ff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1000" height="1000" fill="url(#grid-about)" />
        </svg>

        {/* Soft blue glow */}
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-[#0099ff] to-transparent opacity-6 rounded-full blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.09, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Light aurora effect */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              'radial-gradient(800px at 50% 50%, rgba(0, 153, 255, 0.08) 0%, transparent 100%)',
              'radial-gradient(900px at 50% 30%, rgba(0, 153, 255, 0.06) 0%, transparent 100%)',
              'radial-gradient(800px at 50% 50%, rgba(0, 153, 255, 0.08) 0%, transparent 100%)',
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  // Services: Cyan particles
  if (variant === 'services') {
    const particles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 25 + 20,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="grid-services" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00d9ff" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="1000" height="1000" fill="url(#grid-services)" />
        </svg>

        {/* Cyan particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[#00d9ff]"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.04, 0.12, 0.04],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ willChange: 'transform, opacity' }}
          />
        ))}

        {/* Subtle glow */}
        <motion.div
          className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-l from-[#00d9ff] to-transparent opacity-5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity }}
          style={{ willChange: 'transform' }}
        />
      </div>
    );
  }

  // Skills: Minimal animated dots
  if (variant === 'skills') {
    const dots = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.2 + 0.4,
      duration: Math.random() * 20 + 15,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Minimal dots */}
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-[#00d9ff]"
            style={{
              width: dot.size,
              height: dot.size,
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              opacity: 0.05,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Light glow accents */}
        <motion.div
          className="absolute top-1/4 -right-40 w-80 h-80 bg-gradient-to-br from-[#0099ff] to-transparent opacity-4 rounded-full blur-3xl"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 14, repeat: Infinity }}
          style={{ willChange: 'transform' }}
        />

        <motion.div
          className="absolute bottom-1/4 -left-40 w-80 h-80 bg-gradient-to-tr from-[#a855f7] to-transparent opacity-4 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 16, repeat: Infinity, delay: 2 }}
          style={{ willChange: 'transform' }}
        />
      </div>
    );
  }

  // Projects: Spotlight effect
  if (variant === 'projects') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="grid-projects" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#0099ff" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="1000" height="1000" fill="url(#grid-projects)" />
        </svg>

        {/* Moving spotlight 1 */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-[#0099ff] to-transparent opacity-8 rounded-full blur-3xl mix-blend-screen"
          animate={{ scale: [1, 1.15, 1], x: [-40, 40, -40], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ willChange: 'transform' }}
        />

        {/* Moving spotlight 2 */}
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-tl from-[#a855f7] to-transparent opacity-6 rounded-full blur-3xl mix-blend-screen"
          animate={{ scale: [1.1, 1, 1.1], x: [40, -40, 40], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ willChange: 'transform' }}
        />

        {/* Slow radial glow */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              'radial-gradient(1000px at 30% 50%, rgba(0, 153, 255, 0.08) 0%, transparent 100%)',
              'radial-gradient(1000px at 70% 50%, rgba(168, 85, 247, 0.06) 0%, transparent 100%)',
              'radial-gradient(1000px at 30% 50%, rgba(0, 153, 255, 0.08) 0%, transparent 100%)',
            ],
          }}
          transition={{ duration: 22, repeat: Infinity }}
        />
      </div>
    );
  }

  // Contact: Purple glow
  if (variant === 'contact') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft purple/aurora grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="grid-contact" width="55" height="55" patternUnits="userSpaceOnUse">
              <path d="M 55 0 L 0 0 0 55" fill="none" stroke="#a855f7" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="1000" height="1000" fill="url(#grid-contact)" />
        </svg>

        {/* Central purple glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#a855f7] to-[#0099ff] opacity-7 rounded-full blur-3xl"
          animate={{ scale: [1, 1.12, 1], opacity: [0.07, 0.11, 0.07] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Light aurora effect */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              'radial-gradient(900px at 50% 40%, rgba(168, 85, 247, 0.08) 0%, transparent 100%)',
              'radial-gradient(900px at 50% 60%, rgba(0, 153, 255, 0.06) 0%, transparent 100%)',
              'radial-gradient(900px at 50% 40%, rgba(168, 85, 247, 0.08) 0%, transparent 100%)',
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Subtle side accents */}
        <motion.div
          className="absolute left-0 top-1/3 w-80 h-80 bg-gradient-to-r from-[#a855f7] to-transparent opacity-4 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, delay: 1 }}
          style={{ willChange: 'transform' }}
        />
      </div>
    );
  }

  // Default fallback
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 1000 1000">
        <defs>
          <pattern id="grid-default" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00d9ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="1000" height="1000" fill="url(#grid-default)" />
      </svg>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#0099ff] to-transparent opacity-5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
});

SectionBackground.displayName = 'SectionBackground';

export default SectionBackground;
