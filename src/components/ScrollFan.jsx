import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './ScrollFan.css';

const FanCard = ({ item, index, centerX, centerY, stackX, stackY, stackRotation, progress, reducedMotion, columns }) => {
  const x = useTransform(progress, [0, 0.42, 1], [stackX, stackX * 0.32, 0]);
  const y = useTransform(progress, [0, 0.42, 1], [stackY, stackY * 0.32, 0]);
  const rotateZ = useTransform(progress, [0, 0.5, 1], [stackRotation, stackRotation * 0.3, 0]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.86, 0.96, 1]);
  const opacity = useTransform(progress, [0, 0.45, 0.85, 1], [0.34, 0.72, 1, 1]);

  return (
    <motion.article
      className="scroll-fan__card"
        role="listitem"
      style={{
        left: `${centerX}%`,
        top: `${centerY}px`,
        width: columns === 3 ? 'calc(33.333% - 12px)' : 'calc(50% - 10px)',
        x: reducedMotion ? 0 : x,
        y: reducedMotion ? 0 : y,
        rotateZ: reducedMotion ? 0 : rotateZ,
        scale: reducedMotion ? 1 : scale,
        opacity: reducedMotion ? 1 : opacity,
        zIndex: index + 1,
        transformOrigin: 'center center',
      }}
    >
      <span className="scroll-fan__index">{String(index + 1).padStart(2, '0')}</span>
      {item.visual && <span className="scroll-fan__visual">{item.visual}</span>}
      <span className="scroll-fan__title">{item.title}</span>
      {item.description && <span className="scroll-fan__description">{item.description}</span>}
      {item.meta && <span className="scroll-fan__meta">{item.meta}</span>}
    </motion.article>
  );
};

const ScrollFan = memo(({ items, label = 'Illustrative process stages' }) => {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 88%', 'end 32%'],
  });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const updateDimensions = () => {
      const next = { width: Math.round(element.clientWidth), height: Math.round(element.clientHeight) };
      setDimensions((current) => current.width === next.width && current.height === next.height ? current : next);
    };

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(element);
    updateDimensions();

    return () => observer.disconnect();
  }, []);

  const layout = useMemo(() => {
    const columns = dimensions.width > 0 && (dimensions.width < 600 || items.length === 4) ? 2 : 3;
    const rows = Math.ceil(items.length / columns);
    const height = rows * 126 + 24;
    return {
      columns,
      height,
      cards: items.map((item, index) => {
        const row = Math.floor(index / columns);
        const rowStart = row * columns;
        const rowCount = Math.min(columns, items.length - rowStart);
        const column = index - rowStart;
        const centerX = ((column + 0.5 + (columns - rowCount) / 2) / columns) * 100;
        const centerY = row * 126 + 62;
        const targetX = (dimensions.width / 2) - (centerX / 100) * dimensions.width;
        const targetY = (height / 2) - centerY;
        const direction = index % 2 === 0 ? 1 : -1;

        return {
          item,
          centerX,
          centerY,
          stackX: targetX + (index === 0 ? 0 : direction * Math.min(20 + index * 6, 48)),
          stackY: targetY + (index === 0 ? 0 : direction * Math.min(8 + index * 5, 30)),
          stackRotation: index === 0 ? 0 : direction * Math.min(2 + index * 0.55, 4),
          columns,
        };
      }),
    };
  }, [dimensions.width, items]);

  return (
    <div
      className={`scroll-fan ${reduceMotion ? 'scroll-fan--static' : ''}`}
      ref={containerRef}
      aria-label={label}
      role="list"
      style={{ height: layout.height || 276 }}
    >
      {layout.cards.map((card, index) => (
        <FanCard
          key={`${card.item.title}-${index}`}
          {...card}
          index={index}
          progress={scrollYProgress}
          reducedMotion={reduceMotion}
        />
      ))}
    </div>
  );
});

ScrollFan.displayName = 'ScrollFan';

export default ScrollFan;
