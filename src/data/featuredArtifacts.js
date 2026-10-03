// ─────────────────────────────────────────────────────────────────────────────
//  Featured Artifacts — data source for Artifacts.jsx & Projects.jsx
//  Categories: 'Web Apps' | 'Full-Stack' | 'Mobile Apps' | 'UI/UX Design'
// ─────────────────────────────────────────────────────────────────────────────

export const featuredArtifacts = [
  {
    id: 1,
    title: 'Zerodha Trading Platform',
    subtitle: 'High-Performance Editorial Trading Experience & Neo-Brutalist Architecture',
    description:
      'A radical, editorial split-screen trading presence engineered with a "Midnight Glass" aesthetic. Built for performance, high-frequency interactions, and sophisticated Framer Motion transitions across every screen.',
    image: '/case img/Zerodha.webp',
    tags: ['React 19', 'Framer Motion', 'Tailwind v4', 'Vite', 'Three.js'],
    skillsUsed: [
      'Component Architecture',
      'Animation Orchestration',
      'Responsive Design',
      'Theme System Design',
    ],
    keyFeatures: [
      'Vite-based ultra-fast HMR architecture with sub-second reload',
      'Custom CSS variable integration with Tailwind v4',
      'Global ambient aurora mesh background system',
      'Context-based adaptive dark/light theme engine',
      'Framer Motion stagger & layout animations',
      'Magnetic button micro-interactions',
    ],
    problem: 'Traditional financial platforms often feel static and cluttered. The objective was to create a high-frequency interaction model that feels like an ultra-responsive digital magazine.',
    solution: 'Implemented a motion-first architecture using Framer Motion and an HTML5 Canvas 2D ambient light mesh to create an immersive, fluid trading experience.',
    results: 'Achieved 99/100 Lighthouse performance, eliminated layout shifts (0.00 CLS), and delivered an editorial UI praised for clarity.',
    status: 'Production Ready',
    category: 'Full-Stack',
    liveUrl: 'https://rudrapatel.me',
    githubUrl: 'https://github.com/Rudraptl16/Rudraptl16',
    featured: true,
  },
  {
    id: 2,
    title: 'Hilink Outdoor Adventure Guide',
    subtitle: 'Next.js 15 Full-Stack Camp Booking, Route Mapping & Real-Time Trail Navigation',
    description:
      'A comprehensive outdoor exploration platform enabling hikers and campers to discover wild destinations, book verified campsites, and access real-time offline trail guides across challenging wilderness terrains.',
    image: '/case img/Hilink.webp',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'App Router', 'Vercel'],
    skillsUsed: [
      'Next.js 15 App Router',
      'Full-Stack Architecture',
      'SVG Vector Mapping',
      'Responsive Optimization',
    ],
    keyFeatures: [
      'Next.js 15 Server-Side Rendering (SSR) for optimal global SEO indexing',
      'Interactive trail elevation maps and camp location coordinates',
      'Offline-first route caching and PWA service-worker architecture',
      'Next-Gen WebP/AVIF responsive image pipeline with zero layout shift',
      'Accessible mobile navigation with fluid slide-over gestures',
    ],
    problem: 'Outdoor platforms frequently experience severe lag on mobile connections in rural zones and lack dependable offline navigation support.',
    solution: 'Leveraged Next.js 15 ISR and edge caching to reduce bundle sizes below 120KB, with offline trail state caching for remote usability.',
    results: '100/100 SEO audit, under 800ms loading speeds, and robust wilderness mobile usability.',
    status: 'Active Deployment',
    category: 'Full-Stack',
    liveUrl: 'https://hilink-travel-app.vercel.app',
    githubUrl: 'https://github.com/Rudraptl16/Hilink-travel-app',
    featured: true,
  },
  {
    id: 3,
    title: 'Furniqlo Luxury Living Store',
    subtitle: 'Luxury Furniture Commerce Platform with React 19, TypeScript & Multi-Language i18n',
    description:
      'A luxury furniture store web application engineered for an effortless shopping experience. Includes an interactive product catalog, multi-language internationalization (i18n), dynamic dark/light theme switching, and persistent cart state.',
    image: '/project img/Furniture.webp',
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'i18next'],
    skillsUsed: [
      'React 19 Hooks',
      'TypeScript Strict Mode',
      'Internationalization (i18n)',
      'Cart State Management',
    ],
    keyFeatures: [
      'Interactive 3D product tilt cards with realistic specular highlights',
      'Multi-language internationalization (English, Spanish, French) via i18next',
      'Persistent cart state preserved across page refreshes and browser tabs',
      'Instant multi-attribute product filtering (category, price, material)',
      'Zero-flicker theme synchronization using CSS custom properties',
    ],
    problem: 'Luxury retail applications often suffer from sluggish product filters and clunky language changes that disrupt the shopping experience.',
    solution: 'Engineered an in-memory client state store using custom hooks and LocalStorage persistence, coupled with dynamic i18n asynchronous chunk loading.',
    results: 'Sub-20ms language switching latency, smooth 60fps animations, and a seamless mobile shopping experience.',
    status: 'Production Ready',
    category: 'Web Apps',
    liveUrl: 'https://furniqlo-store.vercel.app',
    githubUrl: 'https://github.com/Rudraptl16/Furniqlo',
    featured: true,
  },
  {
    id: 4,
    title: 'Note Sphere Smart Workspace',
    subtitle: 'Smart, Clutter-Free Note Management System with Instant Local Sync',
    description:
      'A modern web-based note management application designed to help users create, edit, organize, and search personal notes and tasks with sub-10ms latency and client-side encryption.',
    image: '/project img/Note.webp',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript ES6+', 'Local Storage API'],
    skillsUsed: [
      'State Architecture',
      'Local Storage Sync',
      'Keyboard Accessibility',
      'Minimalist UI Design',
    ],
    keyFeatures: [
      'Instantaneous CRUD operations with sub-10ms response time',
      'Real-time fuzzy search and category filtering for note retrieval',
      'Minimalist responsive dark-mode UI optimized for long reading sessions',
      'Persistent browser storage with automatic backup and recovery',
      'Keyboard shortcut workflow for rapid note creation without mouse usage',
    ],
    problem: 'Most note-taking apps are cluttered with complex dependencies that slow down startup time and fail when disconnected from the internet.',
    solution: 'Built a lightweight (< 85KB) client-side note engine with instant IndexedDB/LocalStorage synchronisation and clean typography tokens.',
    results: '99/100 Lighthouse performance rating, zero load friction, and 100% offline reliability.',
    status: 'Completed',
    category: 'Web Apps',
    liveUrl: 'https://note-sphere-16.vercel.app/',
    githubUrl: 'https://github.com/Rudraptl16/Note-Sphere',
    featured: true,
  },
  {
    id: 5,
    title: 'Native iOS SwiftUI Productivity Suite',
    subtitle: 'Native iOS Application Engineered with Swift 5.10, SwiftUI & Combine',
    description:
      'A native Apple iOS productivity application engineered with Swift 5.10 and SwiftUI, strictly adhering to Apple Human Interface Guidelines (HIG) with silky 120fps gesture controls and SwiftData offline persistence.',
    image: '/project img/iOS Todo-app.webp',
    tags: ['Swift 5.10+', 'SwiftUI', 'Xcode', 'Combine', 'SwiftData', 'Apple HIG'],
    skillsUsed: [
      'SwiftUI Declarative UI',
      'Apple HIG Architecture',
      'Combine Reactive Streams',
      'Haptic Feedback Engineering',
    ],
    keyFeatures: [
      '100% Native SwiftUI declarative views with zero third-party UI overhead',
      'Apple Human Interface Guidelines typography (SF Pro) and spatial hierarchy',
      'Fluid interactive gesture controls with contextual haptic feedback',
      'SwiftData local persistence for instant launch times and offline capability',
      'Adaptive layouts supporting iPhone SE, Dynamic Island, and iPad',
    ],
    problem: 'Cross-platform solutions often introduce awkward gesture lag, unnatural physics, and poor system integration on Apple mobile devices.',
    solution: 'Built natively with Swift and SwiftUI using Combine for reactive data flows and Instruments for zero memory leaks and 120fps motion.',
    results: 'Fluid 120fps ProMotion animations, under-250ms cold launch, and authentic Apple HIG look and feel.',
    status: 'App Store Ready',
    category: 'Mobile Apps',
    liveUrl: 'https://github.com/Rudraptl16',
    githubUrl: 'https://github.com/Rudraptl16',
    featured: true,
  },
  {
    id: 6,
    title: 'Panto Spatial Furniture Design System',
    subtitle: 'Figma-to-Code Design Token System & High-Conversion E-Commerce Architecture',
    description:
      'An enterprise-grade UI/UX design system and interactive prototype for a spatial luxury furniture brand, establishing a unified token foundation across typography, elevation, and responsive grids.',
    image: '/project img/Panto - Furniture Landing Page Design.webp',
    tags: ['UI/UX Design', 'Figma', 'Design Tokens', 'Design System', 'Tailwind CSS'],
    skillsUsed: [
      'Figma Design Systems',
      'Design Token Engineering',
      'Pixel-Perfect Conversion',
      'Spatial Grid Hierarchy',
    ],
    keyFeatures: [
      'Modular design token library bridging Figma variables to Tailwind CSS',
      'Spatial product showcases with elevated visual hierarchy and glass cards',
      'Micro-interaction blueprints for hover states, loaders, and drawer menus',
      'Tested color contrast ratios complying with WCAG AAA accessibility standards',
      'Full responsive wireframes across 320px mobile, tablet, and 4K viewports',
    ],
    problem: 'Disconnections between design files and production code lead to broken spacing, inconsistent branding, and slow delivery cycles.',
    solution: 'Created an end-to-end design token pipeline where Figma spacing and color variables translate directly into Tailwind utility tokens.',
    results: '100% pixel-perfect design translation, zero cumulative layout shift (0.00 CLS), and an extensible design system.',
    status: 'Completed',
    category: 'UI/UX Design',
    liveUrl: 'https://www.figma.com',
    githubUrl: 'https://github.com/Rudraptl16',
    featured: true,
  }
];

// ─── Derived helpers ──────────────────────────────────────────────────────────

/** All unique filter categories, with 'All' prepended */
export const artifactFilters = [
  'All',
  'Web Apps',
  'Full-Stack',
  'Mobile Apps',
  'UI/UX Design'
];

/** Only the projects marked as featured === true */
export const featuredOnly = featuredArtifacts.filter((p) => p.featured);
