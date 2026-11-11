import { memo } from 'react';
import { useReducedMotion } from 'framer-motion';

const flowVariants = {
  about: {
    primary: 'M-120 290C120 250 260 190 420 215C610 245 708 410 930 335C1090 280 1205 180 1540 210',
    secondary: 'M-140 560C150 470 290 430 470 510C675 595 760 637 978 595C1160 560 1280 465 1540 500',
    tertiary: 'M-100 690C220 660 310 570 520 630C700 684 820 760 1040 718C1220 684 1330 620 1535 660',
    colors: ['#67e8f9', '#4ec8ff', '#8b5cf6'],
  },
  journey: {
    primary: 'M-100 250C120 180 240 170 420 228C645 292 732 395 930 338C1120 282 1260 165 1540 210',
    secondary: 'M-80 550C120 500 270 492 470 542C690 595 864 630 1070 575C1210 538 1365 470 1540 500',
    tertiary: 'M-120 780C140 740 260 702 470 760C650 812 860 880 1040 826C1220 772 1365 710 1540 760',
    colors: ['#80d8ff', '#7c3aed', '#60a5fa'],
  },
  skills: {
    primary: 'M-120 300C112 250 260 240 430 285C620 335 730 440 932 402C1090 370 1270 250 1540 310',
    secondary: 'M-100 610C200 530 300 515 500 570C720 630 870 665 1080 612C1246 566 1380 500 1535 545',
    tertiary: 'M-140 820C110 788 290 712 510 760C730 810 910 845 1110 800C1295 756 1390 704 1540 730',
    colors: ['#22d3ee', '#3b82f6', '#a78bfa'],
  },
  projects: {
    primary: 'M-120 280C120 220 250 200 420 242C620 290 740 416 975 363C1160 318 1275 220 1540 258',
    secondary: 'M-130 612C170 520 290 490 458 540C660 595 788 662 1020 614C1182 580 1328 500 1540 540',
    tertiary: 'M-110 840C135 800 260 755 468 806C675 857 862 910 1058 868C1240 826 1368 742 1536 770',
    colors: ['#67e8f9', '#7c3aed', '#38bdf8'],
  },
  concepts: {
    primary: 'M-160 336C80 270 240 220 410 262C622 310 780 454 1015 400C1175 366 1305 272 1560 310',
    secondary: 'M-180 642C120 560 290 530 510 590C730 650 876 716 1080 664C1260 620 1368 548 1560 590',
    tertiary: 'M-180 890C130 864 250 790 482 838C700 884 884 930 1062 892C1228 858 1360 808 1560 848',
    colors: ['#93c5fd', '#7c3aed', '#5eead4'],
  },
  web: {
    primary: 'M-140 310C98 260 260 225 450 256C620 286 760 386 980 340C1178 298 1284 220 1545 268',
    secondary: 'M-130 620C120 566 300 546 478 586C680 628 845 674 1076 633C1265 598 1378 530 1540 560',
    tertiary: 'M-170 840C110 808 280 754 484 800C674 842 873 900 1068 860C1248 822 1414 740 1540 776',
    colors: ['#67e8f9', '#fbbf24', '#a78bfa'],
  },
  services: {
    primary: 'M-120 300C124 260 234 212 420 236C612 260 784 390 960 350C1132 312 1285 210 1540 252',
    secondary: 'M-140 610C132 560 292 520 485 560C705 602 862 668 1050 622C1220 582 1365 498 1540 555',
    tertiary: 'M-100 830C170 790 290 738 500 780C726 825 902 892 1082 864C1258 834 1368 760 1535 790',
    colors: ['#67e8f9', '#38bdf8', '#8b5cf6'],
  },
  contact: {
    primary: 'M-160 300C90 256 250 196 432 224C645 254 790 390 1016 354C1188 328 1312 242 1540 290',
    secondary: 'M-150 606C130 548 310 522 490 570C704 625 868 676 1080 622C1265 572 1384 500 1540 536',
    tertiary: 'M-160 815C140 790 265 730 450 778C678 834 876 900 1084 862C1246 830 1365 742 1550 772',
    colors: ['#7dd3fc', '#a78bfa', '#4ade80'],
  },
};

const FlowBackdrop = memo(({ variant = 'default' }) => {
  const reduceMotion = useReducedMotion();
  const config = flowVariants[variant] || flowVariants.about;
  const mainId = `${variant}-main-wave`;
  const secondaryId = `${variant}-secondary-wave`;
  const tertiaryId = `${variant}-tertiary-wave`;

  return (
    <div className={`section-backdrop section-backdrop--${variant} ${reduceMotion ? 'reduced-motion' : ''}`} aria-hidden="true">
      <div className="flow-sheen flow-sheen--one" />
      <div className="flow-sheen flow-sheen--two" />
      <svg className="flow-wave-field" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id={mainId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={config.colors[0]} stopOpacity="0.15" />
            <stop offset="50%" stopColor={config.colors[1]} stopOpacity="0.62" />
            <stop offset="100%" stopColor={config.colors[2]} stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id={secondaryId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={config.colors[2]} stopOpacity="0.10" />
            <stop offset="55%" stopColor={config.colors[1]} stopOpacity="0.42" />
            <stop offset="100%" stopColor={config.colors[0]} stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={tertiaryId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={config.colors[0]} stopOpacity="0.10" />
            <stop offset="48%" stopColor={config.colors[1]} stopOpacity="0.25" />
            <stop offset="100%" stopColor={config.colors[2]} stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path className="flow-wave flow-wave--main" d={config.primary} stroke={`url(#${mainId})`} />
        <path className="flow-wave flow-wave--secondary" d={config.secondary} stroke={`url(#${secondaryId})`} />
        <path className="flow-wave flow-wave--tertiary" d={config.tertiary} stroke={`url(#${tertiaryId})`} />
      </svg>
    </div>
  );
});

const SectionBackground = memo(({ variant = 'default' }) => {
  if (variant === 'default') {
    return <FlowBackdrop variant="about" />;
  }

  return <FlowBackdrop variant={variant} />;
});

SectionBackground.displayName = 'SectionBackground';

export default SectionBackground;
