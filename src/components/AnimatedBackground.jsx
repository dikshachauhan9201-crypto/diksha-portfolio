import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// NEURAL NETWORK NODE COMPONENT
// ============================================================================
const NetworkNode = memo(({ id, x, y, mousePos, onMouseEnter, onMouseLeave, isHovered }) => {
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    if (!mousePos) return;

    const distance = Math.hypot(mousePos.x - x, mousePos.y - y);
    const isNear = distance < 150;

    if (isNear && !isGlowing) {
      setIsGlowing(true);
      onMouseEnter?.(id);
    } else if (!isNear && isGlowing) {
      setIsGlowing(false);
      onMouseLeave?.(id);
    }
  }, [mousePos, x, y, id, isGlowing, onMouseEnter, onMouseLeave]);

  return (
    <motion.circle
      cx={x}
      cy={y}
      r={isHovered ? 4 : 2}
      fill={isHovered ? '#00d9ff' : '#0099ff'}
      opacity={isHovered ? 1 : 0.6}
      initial={{ r: 2 }}
      animate={{ r: isHovered ? 4 : 2 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 150, damping: 18 }}
      filter={isHovered ? 'url(#glow)' : 'none'}
      style={{ pointerEvents: 'none', willChange: 'r' }}
    />
  );
});

// ============================================================================
// PERSPECTIVE GRID COMPONENT
// ============================================================================
const PerspectiveGrid = memo(({ mousePos }) => {
  const parallaxOffset = mousePos
    ? {
        x: (mousePos.x - window.innerWidth / 2) * 0.02,
        y: (mousePos.y - window.innerHeight / 2) * 0.02,
      }
    : { x: 0, y: 0 };

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full"
      style={{
        x: parallaxOffset.x,
        y: parallaxOffset.y,
        willChange: "transform",
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <defs>
        <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0099ff" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#00d9ff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#0099ff" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Horizontal lines with perspective */}
      {Array.from({ length: 20 }).map((_, i) => {
        const y = (i * window.innerHeight) / 20;
        const opacity = Math.max(0.05, 0.3 - i * 0.01);

        return (
          <motion.line
            key={`h-${i}`}
            x1="0"
            y1={y}
            x2={window.innerWidth}
            y2={y}
            stroke="#0099ff"
            strokeWidth="0.5"
            opacity={opacity}
            animate={{
              opacity: [opacity, opacity * 0.5, opacity],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Vertical lines with perspective */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (i * window.innerWidth) / 30;
        const opacity = Math.max(0.02, 0.2 - i * 0.005);

        return (
          <motion.line
            key={`v-${i}`}
            x1={x}
            y1="0"
            x2={x}
            y2={window.innerHeight}
            stroke="#00d9ff"
            strokeWidth="0.5"
            opacity={opacity}
            animate={{
              opacity: [opacity, opacity * 0.3, opacity],
            }}
            transition={{
              duration: 5 + i * 0.15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </motion.svg>
  );
});

// ============================================================================
// HOLOGRAPHIC LIGHT BEAMS COMPONENT
// ============================================================================
const LightBeams = memo(() => {
  const beams = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    startX: Math.random() * 100,
    startY: -10,
    endX: Math.random() * 100 + 50,
    endY: 100,
    duration: 8 + Math.random() * 4,
    delay: i * 2,
  }));

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ willChange: "opacity" }}>
      <defs>
        <linearGradient id="beamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00d9ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#00d9ff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {beams.map((beam) => (
        <motion.line
          key={beam.id}
          x1={`${beam.startX}%`}
          y1={`${beam.startY}%`}
          x2={`${beam.endX}%`}
          y2={`${beam.endY}%`}
          stroke="url(#beamGradient)"
          strokeWidth="3"
          initial={{
            opacity: 0,
            y1: -10,
            y2: 90,
          }}
          animate={{
            opacity: [0, 0.4, 0.4, 0],
            y1: [-10, 100],
            y2: [90, 200],
          }}
          transition={{
            duration: beam.duration,
            delay: beam.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </svg>
  );
});

// ============================================================================
// AURORA LIGHTS COMPONENT
// ============================================================================
const AuroraLights = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Soft aurora glow top left */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%)',
          top: '-10%',
          left: '-5%',
          willChange: "transform",
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Soft aurora glow bottom right */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
          bottom: '-10%',
          right: '-5%',
          willChange: "transform",
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Soft aurora glow center */}
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 153, 255, 0.05) 0%, transparent 70%)',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          willChange: "transform, opacity",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
});

// ============================================================================
// TWINKLING STARS COMPONENT
// ============================================================================
const TwinklingStars = memo(() => {
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ willChange: "opacity" }}>
      {stars.map((star) => (
        <motion.circle
          key={star.id}
          cx={`${star.x}%`}
          cy={`${star.y}%`}
          r={star.size}
          fill="#ffffff"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  );
});

// ============================================================================
// NEURAL NETWORK COMPONENT
// ============================================================================
const NeuralNetwork = memo(({ mousePos }) => {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [hoveredNodes, setHoveredNodes] = useState(new Set());

  // Generate nodes on mount
  useEffect(() => {
    const newNodes = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
    setNodes(newNodes);
  }, []);

  // Animate nodes with throttling for performance
  useEffect(() => {
    let animationId;
    let frameCount = 0;

    const animate = () => {
      frameCount++;
      // Update nodes every 2 frames for better performance
      if (frameCount % 2 === 0) {
        setNodes((prevNodes) =>
          prevNodes.map((node) => {
            let x = node.x + node.vx;
            let y = node.y + node.vy;
            let vx = node.vx;
            let vy = node.vy;

            // Bounce at edges
            if (x < 0 || x > window.innerWidth) vx *= -1;
            if (y < 0 || y > window.innerHeight) vy *= -1;

            // Keep in bounds
            x = Math.max(0, Math.min(window.innerWidth, x));
            y = Math.max(0, Math.min(window.innerHeight, y));

            return { ...node, x, y, vx, vy };
          })
        );
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleNodeEnter = useCallback((id) => {
    setHoveredNodes((prev) => new Set(prev).add(id));
  }, []);

  const handleNodeLeave = useCallback((id) => {
    setHoveredNodes((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  // Calculate connections with pulsing energy
  const getConnections = useCallback(() => {
    const connections = [];
    const connectionDistance = 200;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.hypot(dx, dy);

        if (distance < connectionDistance) {
          connections.push({
            id: `${i}-${j}`,
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: nodes[j].x,
            y2: nodes[j].y,
            distance,
            connectionDistance,
          });
        }
      }
    }

    return connections;
  }, [nodes]);

  const connections = getConnections();

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" ref={canvasRef} style={{ willChange: "contents" }}>
      <defs>
        {/* Glow filter for nodes */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Glow filter for connections */}
        <filter id="connectionGlow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Energy pulse gradient */}
        <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d9ff" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#0099ff" />
        </linearGradient>
      </defs>

      {/* Render connections */}
      {connections.map((connection) => {
        const pulseProgress = (Date.now() % 3000) / 3000;
        const randomPulse = (Math.sin(connection.id.charCodeAt(0) * pulseProgress) + 1) / 2;

        return (
          <line
            key={connection.id}
            x1={connection.x1}
            y1={connection.y1}
            x2={connection.x2}
            y2={connection.y2}
            stroke="#00d9ff"
            strokeWidth="0.5"
            opacity={0.3 * (1 - connection.distance / connection.connectionDistance)}
            filter={randomPulse > 0.7 ? 'url(#connectionGlow)' : 'none'}
          />
        );
      })}

      {/* Render nodes */}
      {nodes.map((node) => (
        <NetworkNode
          key={node.id}
          id={node.id}
          x={node.x}
          y={node.y}
          mousePos={mousePos}
          onMouseEnter={handleNodeEnter}
          onMouseLeave={handleNodeLeave}
          isHovered={hoveredNodes.has(node.id)}
        />
      ))}
    </svg>
  );
});

// ============================================================================
// ANIMATED BACKGROUND COMPONENT
// ============================================================================
const AnimatedBackground = memo(() => {
  const [mousePos, setMousePos] = useState(null);
  const mousePosRef = useRef(null);

  useEffect(() => {
    let throttleTimeout = null;

    const handleMouseMove = (e) => {
      if (throttleTimeout) return;

      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY,
      };

      setMousePos(mousePosRef.current);

      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
      }, 16); // ~60fps throttle
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-[#020617] overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] to-[#0a0e27]" />

      {/* Aurora lights */}
      <AuroraLights />

      {/* Grid layer */}
      <PerspectiveGrid mousePos={mousePos} />

      {/* Light beams */}
      <LightBeams />

      {/* Twinkling stars */}
      <TwinklingStars />

      {/* Neural network */}
      <NeuralNetwork mousePos={mousePos} />

      {/* Atmospheric fog */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[rgba(0,10,30,0.3)]" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent to-[rgba(0,0,0,0.4)]" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='white' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
});

export default AnimatedBackground;
