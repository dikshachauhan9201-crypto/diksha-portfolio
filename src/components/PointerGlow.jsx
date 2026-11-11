import { memo } from 'react';

const PointerGlow = memo(({ children, className = '', tilt = false }) => {
  const updatePointerPosition = (event) => {
    if (event.pointerType === 'touch') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty('--pointer-x', `${x}%`);
    event.currentTarget.style.setProperty('--pointer-y', `${y}%`);

    if (tilt) {
      event.currentTarget.style.setProperty('--card-tilt-x', `${(50 - y) / 25}deg`);
      event.currentTarget.style.setProperty('--card-tilt-y', `${(x - 50) / 25}deg`);
    }
  };

  const resetPointerPosition = (event) => {
    event.currentTarget.style.removeProperty('--pointer-x');
    event.currentTarget.style.removeProperty('--pointer-y');
    event.currentTarget.style.removeProperty('--card-tilt-x');
    event.currentTarget.style.removeProperty('--card-tilt-y');
  };

  return (
    <div
      className={`pointer-light ${className}`}
      onPointerMove={updatePointerPosition}
      onPointerLeave={resetPointerPosition}
      style={tilt ? {
        transform: 'perspective(1100px) rotateX(var(--card-tilt-x, 0deg)) rotateY(var(--card-tilt-y, 0deg))',
        transformStyle: 'preserve-3d',
        transition: 'transform 320ms var(--motion-ease)',
      } : undefined}
    >
      {children}
    </div>
  );
});

PointerGlow.displayName = 'PointerGlow';

export default PointerGlow;
