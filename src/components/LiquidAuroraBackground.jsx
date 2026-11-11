import './LiquidAuroraBackground.css';

const LiquidAuroraBackground = () => (
  <div className="liquid-aurora" aria-hidden="true">
    <svg
      className="liquid-aurora__svg"
      viewBox="0 0 1600 2600"
      preserveAspectRatio="none"
      focusable="false"
    >
      <defs>
        <linearGradient id="aurora-main" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#2563eb" stopOpacity="0.04" />
          <stop offset="0.22" stopColor="#38bdf8" stopOpacity="0.28" />
          <stop offset="0.48" stopColor="#22d3ee" stopOpacity="0.34" />
          <stop offset="0.7" stopColor="#2dd4bf" stopOpacity="0.22" />
          <stop offset="1" stopColor="#6366f1" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="aurora-violet" x1="0" y1="0.4" x2="1" y2="0.5">
          <stop offset="0" stopColor="#4338ca" stopOpacity="0.04" />
          <stop offset="0.3" stopColor="#818cf8" stopOpacity="0.24" />
          <stop offset="0.62" stopColor="#a78bfa" stopOpacity="0.27" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="aurora-cyan" x1="0" y1="0.5" x2="1" y2="0.4">
          <stop offset="0" stopColor="#0e7490" stopOpacity="0.03" />
          <stop offset="0.35" stopColor="#22d3ee" stopOpacity="0.21" />
          <stop offset="0.68" stopColor="#60a5fa" stopOpacity="0.17" />
          <stop offset="1" stopColor="#4f46e5" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="aurora-deep" x1="0" y1="0.6" x2="1" y2="0.3">
          <stop offset="0" stopColor="#312e81" stopOpacity="0.02" />
          <stop offset="0.45" stopColor="#38bdf8" stopOpacity="0.15" />
          <stop offset="0.76" stopColor="#8b5cf6" stopOpacity="0.16" />
          <stop offset="1" stopColor="#0891b2" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="aurora-highlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#93c5fd" stopOpacity="0" />
          <stop offset="0.28" stopColor="#67e8f9" stopOpacity="0.7" />
          <stop offset="0.62" stopColor="#a5f3fc" stopOpacity="0.9" />
          <stop offset="1" stopColor="#c4b5fd" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="aurora-violet-highlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0" />
          <stop offset="0.45" stopColor="#c4b5fd" stopOpacity="0.72" />
          <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
        </linearGradient>
        <filter id="aurora-soft-glow" x="-20%" y="-30%" width="140%" height="160%">
          <feGaussianBlur stdDeviation="13" />
        </filter>
      </defs>

      <g className="liquid-aurora__ribbon liquid-aurora__ribbon--main">
        <path
          className="liquid-aurora__surface"
          fill="url(#aurora-main)"
          d="M-180 585 C40 532 170 318 396 330 C610 340 696 559 914 601 C1134 644 1272 366 1780 368 L1780 515 C1374 520 1234 798 919 779 C659 762 586 531 386 512 C198 494 61 696 -180 741 Z"
        />
        <path
          className="liquid-aurora__glow"
          d="M-180 585 C40 532 170 318 396 330 C610 340 696 559 914 601 C1134 644 1272 366 1780 368"
        />
        <path
          className="liquid-aurora__edge"
          d="M-180 585 C40 532 170 318 396 330 C610 340 696 559 914 601 C1134 644 1272 366 1780 368"
        />
      </g>

      <g className="liquid-aurora__ribbon liquid-aurora__ribbon--violet">
        <path
          className="liquid-aurora__surface"
          fill="url(#aurora-violet)"
          d="M-190 1336 C92 1279 205 1053 448 1057 C681 1061 770 1278 1005 1303 C1238 1328 1380 1090 1790 1024 L1790 1174 C1444 1237 1288 1484 995 1478 C726 1472 655 1259 438 1242 C243 1227 82 1434 -190 1485 Z"
        />
        <path
          className="liquid-aurora__edge liquid-aurora__edge--violet"
          d="M-190 1336 C92 1279 205 1053 448 1057 C681 1061 770 1278 1005 1303 C1238 1328 1380 1090 1790 1024"
        />
      </g>

      <g className="liquid-aurora__ribbon liquid-aurora__ribbon--distant">
        <path
          className="liquid-aurora__surface"
          fill="url(#aurora-cyan)"
          d="M-210 1940 C78 1858 270 1692 494 1735 C710 1776 810 1986 1047 1991 C1306 1996 1420 1764 1810 1690 L1810 1828 C1432 1923 1300 2138 1035 2156 C782 2174 693 1949 475 1910 C263 1872 68 2084 -210 2132 Z"
        />
        <path
          className="liquid-aurora__edge liquid-aurora__edge--distant"
          d="M-210 1940 C78 1858 270 1692 494 1735 C710 1776 810 1986 1047 1991 C1306 1996 1420 1764 1810 1690"
        />
      </g>

      <g className="liquid-aurora__ribbon liquid-aurora__ribbon--backflow">
        <path
          className="liquid-aurora__surface"
          fill="url(#aurora-deep)"
          d="M-170 2344 C145 2275 275 2146 505 2170 C752 2196 848 2386 1081 2381 C1320 2377 1458 2201 1780 2165 L1780 2290 C1470 2347 1344 2532 1084 2543 C813 2553 721 2373 486 2353 C255 2333 121 2482 -170 2524 Z"
        />
      </g>

      <g className="liquid-aurora__travel liquid-aurora__travel--cyan">
        <path
          pathLength="1000"
          d="M-180 585 C40 532 170 318 396 330 C610 340 696 559 914 601 C1134 644 1272 366 1780 368"
        />
      </g>
      <g className="liquid-aurora__travel liquid-aurora__travel--violet">
        <path
          pathLength="1000"
          d="M-190 1336 C92 1279 205 1053 448 1057 C681 1061 770 1278 1005 1303 C1238 1328 1380 1090 1790 1024"
        />
      </g>
    </svg>
  </div>
);

export default LiquidAuroraBackground;
