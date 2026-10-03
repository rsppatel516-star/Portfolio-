import { Laptop, Smartphone, Palette, Layers, Zap, Cloud } from 'lucide-react';

export const services = [
  {
    id: 'frontend',
    title: 'Frontend Web Development',
    tagline: 'High-speed, SEO-first modern web applications built for conversion & scale.',
    badge: 'High Performance',
    description: 'Engineering responsive, accessible, and SEO-optimized web applications using React 19, Next.js 15, and modern CSS architecture with fluid micro-interactions.',
    icon: Laptop,

    features: [
      'Responsive React 19 & Next.js 15 App Router Development',
      'SEO-First Architecture & Schema.org Rich Structured Data',
      'Tailwind CSS & Modular Design Token Implementation',
      'State Management (Zustand/Redux) & Clean Folder Hierarchy',
      'Fluid Framer Motion Transitions & Interactive Micro-UI'
    ],
    keyBenefits: [
      'Blazing-fast page load speeds that minimize bounce rate',
      'Dominant organic search engine visibility and indexing',
      'Scalable, maintainable codebase ready for team collaboration'
    ],
    deliverables: [
      'Production-ready Next.js / React application codebase',
      'Fully responsive layouts tested across all screen resolutions',
      'Complete component documentation & clean Git commit history',
      'Automated deployment setup (Vercel / Netlify / AWS)'
    ],
    workflow: [
      { step: '01', title: 'Tech Discovery', desc: 'Scope requirements, select state architecture, and outline SEO roadmap.' },
      { step: '02', title: 'System Setup', desc: 'Configure typography tokens, color palette, and reusable atomic UI.' },
      { step: '03', title: 'Core Engineering', desc: 'Build reactive components, integrate hooks, and bind live endpoints.' },
      { step: '04', title: 'Polish & Deploy', desc: 'Run performance audits, test across devices, and push to production.' }
    ],
    techStack: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    idealFor: 'SaaS Platforms, High-Growth Startups, Digital Portfolios, E-Commerce Brands'
  },
  {
    id: 'ios',
    title: 'Native iOS App Development',
    tagline: 'Refined, high-performance mobile experiences crafted natively for Apple platforms.',
    badge: 'Apple HIG Native',
    description: 'Building elegant, ultra-smooth native iOS mobile applications using Swift and SwiftUI, closely following Apple Human Interface Guidelines for premium tactile polish.',
    icon: Smartphone,
    features: [
      'Native SwiftUI & Modern Swift Concurrency (async/await)',
      'Strict Apple Human Interface Guidelines (HIG) Adherence',
      'Silky 60-120fps Gesture Controls & Haptic Feedback',
      'CoreData / SwiftData Local Storage & Offline-First Caching',
      'App Store Connect, TestFlight & Submission Readiness'
    ],
    keyBenefits: [
      'True native iOS responsiveness that feels intuitive to Apple users',
      'Optimal memory, CPU, and battery conservation on all iPhones',
      'Seamless Apple ecosystem integration (Widgets, Dark Mode, SF Symbols)'
    ],
    deliverables: [
      'Full Xcode project with modular Swift architecture',
      'Interactive TestFlight beta build for client testing',
      'App Store assets, metadata prep & submission assistance',
      'Offline-capable caching and secure keychain storage'
    ],
    workflow: [
      { step: '01', title: 'Spec & HIG Review', desc: 'Wireframe iOS navigation patterns following Apple HIG standards.' },
      { step: '02', title: 'SwiftUI Views', desc: 'Build declarative views, adaptive sheets, and SF Symbol typography.' },
      { step: '03', title: 'Data & Services', desc: 'Connect REST/Firebase backend, SwiftData persistence, and auth.' },
      { step: '04', title: 'QA & TestFlight', desc: 'Profile in Instruments, test on physical devices, and deploy beta.' }
    ],
    techStack: ['Swift 5.10+', 'SwiftUI', 'Xcode', 'Combine', 'SwiftData', 'Firebase iOS SDK'],
    idealFor: 'Mobile Startups, Consumer Apps, Lifestyle Products, Utility Tools'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Design-to-Code',
    tagline: 'Bridging the design-development divide with pixel-perfect accuracy and fluid motion.',
    badge: 'Pixel Precision',
    description: 'Transforming complex Figma prototypes and conceptual designs into interactive, production-grade web interfaces with zero layout shift and delightful micro-interactions.',
    icon: Palette,
    
    features: [
      'Pixel-Perfect Figma to React & Tailwind CSS Conversion',
      'Scalable Design System with Tokens (Colors, Spacing, Typography)',
      'Custom Micro-Interactions, Magnetic Buttons & Glassmorphism',
      'Zero Cumulative Layout Shift (CLS) Structural Engineering',
      'Dark / Light Theme Synchronization & Contrast Compliance'
    ],
    keyBenefits: [
      '100% fidelity to creative design vision without developer compromises',
      'Modular, reusable UI component library for rapid future scaling',
      'Engaging micro-interactions that elevate brand credibility'
    ],
    deliverables: [
      'Production React component library mirroring Figma components',
      'Comprehensive design token configuration (Tailwind theme)',
      'Responsive design verification across mobile, tablet, and 4K displays',
      'Interactive micro-animations (hover states, loaders, transitions)'
    ],
    workflow: [
      { step: '01', title: 'Figma Audit', desc: 'Inspect typography scales, spacing grids, and component variants.' },
      { step: '02', title: 'Token Blueprint', desc: 'Establish Tailwind design variables and atomic CSS foundations.' },
      { step: '03', title: 'Component Build', desc: 'Code interactive UI components with accessible states & motion.' },
      { step: '04', title: 'Visual Alignment', desc: 'Side-by-side pixel audit against Figma canvas on all viewports.' }
    ],
    techStack: ['Figma', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons', 'CSS Glassmorphism', 'Radix UI'],
    idealFor: 'Design Agencies, Creative Studios, Product Designers, Rebranding Initiatives'
  },
  {
    id: 'architecture',
    title: 'Digital Architecture & Systems',
    tagline: 'Building robust, maintainable foundations that scale effortlessly as your product grows.',
    badge: 'Clean Architecture',
    description: 'Structuring clean, modular codebases and scalable web & mobile architectures designed for reliability, automated testing, and frictionless long-term engineering velocity.',
    icon: Layers,

    features: [
      'Clean Architecture & Separation of Concerns (Presentation vs Logic)',
      'Scalable Folder Structures & Custom Hook Pipelines',
      'Cross-Platform Logic Planning & API Contract Definitions',
      'Strict TypeScript Typing & Error Boundary Boundaries',
      'Git Branching Strategies & CI/CD Pipeline Automation'
    ],
    keyBenefits: [
      'Drastically reduced technical debt and friction for future features',
      'Superior stability with clear isolation of state and side effects',
      'Fast and intuitive developer onboarding for new engineering hires'
    ],
    deliverables: [
      'Architectural blueprint documentation and dependency flow charts',
      'Standardized coding conventions and ESLint/Prettier configuration',
      'Modular custom hook abstractions and service layer interfaces',
      'Automated testing harness setup (Vitest / React Testing Library)'
    ],
    workflow: [
      { step: '01', title: 'Needs Analysis', desc: 'Evaluate complexity, scaling goals, and team composition.' },
      { step: '02', title: 'Architecture Schema', desc: 'Map state management, directory boundaries, and data contracts.' },
      { step: '03', title: 'Scaffold Engine', desc: 'Build the core framework, provider stack, and utility services.' },
      { step: '04', title: 'Guide & Standards', desc: 'Provide architecture documentation and best-practice blueprints.' }
    ],
    techStack: ['Clean Architecture', 'TypeScript', 'Zustand', 'Git Flow', 'ESLint/Prettier', 'Vitest'],
    idealFor: 'Growing Codebases, Technical Refactors, Multi-Developer Teams, Enterprise Apps'
  },
  {
    id: 'performance',
    title: 'Performance & Speed Audit',
    tagline: 'Turning sluggish web experiences into lightning-fast, high-converting digital products.',
    badge: '100/100 Lighthouse',
    description: 'Auditing and optimizing existing web applications to eliminate rendering bottlenecks, shrink bundle sizes, and achieve flawless Google Core Web Vitals.',
    icon: Zap,
  
    features: [
      'Comprehensive Core Web Vitals Auditing (LCP, FID/INP, CLS)',
      'Modern Media Pipeline: WebP/AVIF Conversion & Lazy Loading',
      'Code-Splitting, Tree-Shaking & Dynamic Import Optimization',
      'Elimination of Unnecessary Re-Renders & Memory Leaks',
      'Edge Caching, HTTP/3 Headers & Font Preloading Tactics'
    ],
    keyBenefits: [
      'Near-instant load times that directly boost sales and conversions',
      'Higher Google search ranking boosted by Core Web Vitals criteria',
      'Noticeably smoother scrolling and navigation on low-tier mobile devices'
    ],
    deliverables: [
      'Before-and-after Lighthouse performance audit report',
      'Optimized asset pipeline with next-gen image formats',
      'Code-split bundle analysis and dead-code removal patch',
      'Actionable checklist for continuous performance monitoring'
    ],
    workflow: [
      { step: '01', title: 'Diagnostic Trace', desc: 'Run Chrome DevTools profiling, memory snapshots, and Lighthouse.' },
      { step: '02', title: 'Bottleneck Triage', desc: 'Identify heavy bundles, blocking scripts, and heavy render cycles.' },
      { step: '03', title: 'Targeted Fixes', desc: 'Implement code-splitting, image optimization, and memoization.' },
      { step: '04', title: 'Verification', desc: 'Benchmark improvements on throttled 4G and mobile devices.' }
    ],
    techStack: ['Chrome DevTools', 'Lighthouse', 'Vite', 'WebP/AVIF', 'Webpack Bundle Analyzer', 'Web Vitals'],
    idealFor: 'High-Traffic Sites, E-Commerce Stores, Media Portals, SEO-Dependent Businesses'
  },
  {
    id: 'cloud',
    title: 'API & Cloud Integration',
    tagline: 'Seamlessly connecting interfaces to secure cloud backends and real-time APIs.',
    badge: 'Real-Time Sync',
    description: 'Connecting frontend applications to RESTful endpoints, GraphQL APIs, and Firebase cloud services for real-time data sync, secure user auth, and resilient offline persistence.',
    icon: Cloud,

    features: [
      'RESTful & GraphQL API Integration with Custom Axios/Fetch Wrappers',
      'Firebase Authentication (Email, Google, OAuth) & Security Rules',
      'Firestore Real-Time Database Streaming & Local Persistence',
      'Robust Async Handling: Graceful Fallbacks, Retries & Error Boundaries',
      'Environment Secrets & Secure Token Refresh Cycles'
    ],
    keyBenefits: [
      'Real-time data synchronization that updates instantly across users',
      'Enterprise-grade authentication and authorization security',
      'Resilient UX with automatic reconnects and offline handling'
    ],
    deliverables: [
      'Fully integrated API service layer with TypeScript interfaces',
      'Configured Firebase project with production security rules',
      'Authentication flows (sign in, sign up, password reset, session persist)',
      'Error handling and optimistic UI updates for instant response'
    ],
    workflow: [
      { step: '01', title: 'Endpoint Mapping', desc: 'Review API contracts, payload schemas, and auth requirements.' },
      { step: '02', title: 'Service Engine', desc: 'Construct strongly-typed API client with interceptors & retries.' },
      { step: '03', title: 'Data Binding', desc: 'Connect UI components with real-time listeners and optimistic state.' },
      { step: '04', title: 'Stress & Security', desc: 'Validate error states, token expiration, and edge case resilience.' }
    ],
    techStack: ['REST APIs', 'Firebase', 'Firestore', 'Axios', 'JWT / OAuth', 'TanStack Query'],
    idealFor: 'Dynamic Web Apps, Social & Community Platforms, Dashboard Portals, SaaS Tools'
  }
];
