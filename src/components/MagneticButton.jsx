import { memo } from 'react';
import { useReducedMotion } from 'framer-motion';

const MagneticButton = memo(({ as: Component = 'button', children, className = '', style, onPointerMove, onPointerLeave, ...props }) => {
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (event) => {
    if (!reduceMotion && event.pointerType !== 'touch') {
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = Math.max(-4, Math.min(4, (event.clientX - (bounds.left + bounds.width / 2)) * 0.06));
      const y = Math.max(-4, Math.min(4, (event.clientY - (bounds.top + bounds.height / 2)) * 0.08));
      event.currentTarget.style.setProperty('--magnetic-x', `${x}px`);
      event.currentTarget.style.setProperty('--magnetic-y', `${y}px`);
    }

    onPointerMove?.(event);
  };

  const handlePointerLeave = (event) => {
    event.currentTarget.style.removeProperty('--magnetic-x');
    event.currentTarget.style.removeProperty('--magnetic-y');
    onPointerLeave?.(event);
  };

  return (
    <Component
      {...props}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ...style,
        translate: reduceMotion ? undefined : 'var(--magnetic-x, 0px) var(--magnetic-y, 0px)',
        transition: reduceMotion
          ? undefined
          : 'translate 220ms var(--motion-ease), background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease, color 200ms ease',
      }}
    >
      {children}
    </Component>
  );
});

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
