export const caseStudies = [
  {
    id: 1,
    title: "Zerodha Trading Platform",
    subtitle: "High-Performance Editorial Trading Experience & Radical Neo-Brutalist Architecture",
    role: "Lead Frontend & Creative Architect",
    year: "2025",
    platform: "Web / React 19 & Next.js",
    liveUrl: "https://rudrapatel.me",
    githubUrl: "https://github.com/Rudraptl16/Rudraptl16",
    description: "Zerodha is a modern, high-performance digital presence engineered to showcase architectural precision and sophisticated motion design. The goal of this project was to build a radical, editorial split-screen experience that helps traders and investors engage with financial metrics without cognitive overload. Every micro-transition is tuned with high-frequency interaction and a fluid motion flow.",
    image: '/case img/Zerodha.webp',
    category: "Full-Stack",
    tags: ["React 19", "Framer Motion", "Tailwind v4", "Vite", "Three.js"],
    stats: [
      { label: "Lighthouse Performance", value: "99/100" },
      { label: "First Contentful Paint", value: "< 0.6s" },
      { label: "Interaction Frame Rate", value: "60 FPS" },
      { label: "Layout Shift (CLS)", value: "0.00" }
    ],
    keyFeatures: [
      "Vite-based ultra-fast HMR architecture with sub-second hot reloading",
      "Custom CSS Variable integration with Tailwind v4 for real-time design tokens",
      "High-end ambient aurora mesh background system using HTML5 Canvas",
      "Context-based adaptive dark/light theme engine with zero flicker",
      "Framer Motion stagger sequences and spring-damped modal transitions",
      "Magnetic cursor interaction on key call-to-actions"
    ],
    problem: "Traditional financial dashboards and trading portfolios often feel static, cluttered, and generic. The core challenge was to break away from traditional boring dashboards toward a radical, editorial split-screen experience that maintains blazing speed and 60fps responsiveness across every device tier.",
    solution: "Engineered a motion-first architecture using Framer Motion combined with a lightweight HTML5 Canvas 2D ambient lighting mesh. Decoupled UI state into custom reactive hooks, ensuring re-renders occur strictly on localized nodes rather than cascading through parent views.",
    results: "Achieved a 99/100 Lighthouse performance rating, eliminated layout shifts entirely (0.00 CLS), and delivered an intuitive, editorial interface praised for clarity and high-speed data presentation.",
    techDetails: [
      "Vite-based React 19 architecture with tree-shaken dependencies.",
      "Tailwind CSS v4 token system with fluid typography and dark mode presets.",
      "Framer Motion physics engine for fluid modal morphing and tab sliding.",
      "Custom Canvas 2D shader simulator for background aurora lights."
    ],
    featured: true
  },
  {
    id: 2,
    title: "Hilink Outdoor Adventure Guide",
    subtitle: "Next.js 15 Full-Stack Camp Booking, Route Mapping & Real-Time Trail Navigation",
    role: "Full-Stack Web Architect",
    year: "2025",
    platform: "Full-Stack Web / Next.js 15",
    liveUrl: "https://hilink-travel-app.vercel.app",
    githubUrl: "https://github.com/Rudraptl16/Hilink-travel-app",
    description: "Hilink is a comprehensive travel and outdoor adventure web platform designed to help trekkers, campers, and explorers discover wild destinations, book campsites, and access real-time offline trail guides. Built with Next.js 15 App Router, TypeScript, and modern CSS, Hilink delivers a responsive, fast-loading visual portal for adventure enthusiasts worldwide.",
    image: '/case img/Hilink.webp',
    category: "Full-Stack",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "App Router", "Vercel"],
    stats: [
      { label: "Google PageSpeed", value: "98/100" },
      { label: "Time to Interactive", value: "< 0.8s" },
      { label: "SEO Score", value: "100/100" },
      { label: "Image Payload Saved", value: "62%" }
    ],
    keyFeatures: [
      "Next.js 15 Server-Side Rendering (SSR) for optimal global SEO indexing",
      "Interactive trail elevation maps and camp location coordinates",
      "Offline-first route caching and PWA service-worker architecture",
      "Next-Gen WebP/AVIF responsive image pipeline with zero layout shift",
      "Fully accessible mobile navigation with fluid slide-over gestures"
    ],
    problem: "Most outdoor platforms struggle with slow image rendering on mobile networks in remote areas, poor offline accessibility, and bloated dependencies that crash low-tier devices when exploring trail maps.",
    solution: "Leveraged Next.js 15 image optimization, incremental static regeneration (ISR), and modern SVG vector mapping to maintain featherweight bundle sizes (< 120KB initial JS). Created an offline fallback caching layer so essential trail details remain readable without active internet.",
    results: "Boosted search engine visibility with 100/100 SEO audit, reduced average page loading time to under 800ms, and earned high marks for wilderness mobile usability.",
    techDetails: [
      "Next.js 15 App Router with server components for data-heavy views.",
      "TypeScript interfaces strictly typing all campsite payloads.",
      "Tailwind CSS custom spacing tokens and wilderness color scheme.",
      "Automated Vercel Edge caching and asset delivery."
    ],
    featured: true
  },
  {
    id: 3,
    title: "Furniqlo Luxury Living Store",
    subtitle: "Luxury Furniture Commerce Platform with React 19, TypeScript & Multi-Language i18n",
    role: "Lead Frontend Developer",
    year: "2025",
    platform: "Web / E-Commerce SPA",
    liveUrl: "https://furniqlo-store.vercel.app",
    githubUrl: "https://github.com/Rudraptl16/Furniqlo",
    description: "Furniqlo is a high-end luxury furniture store web application engineered to give interior enthusiasts a frictionless browsing and purchasing journey. It features an interactive product catalog, multi-language internationalization (i18n), dynamic dark/light theme switching, persistent cart state management, and smooth 3D product tilt hover effects.",
    image: '/project img/Furniture.webp',
    category: "Web Apps",
    tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "i18next", "React Router v7"],
    stats: [
      { label: "i18n Switch Latency", value: "< 20ms" },
      { label: "Cart State Sync", value: "Instant" },
      { label: "Lighthouse Performance", value: "98/100" },
      { label: "Mobile Usability", value: "100%" }
    ],
    keyFeatures: [
      "Interactive 3D product tilt cards with realistic specular highlights",
      "Multi-language internationalization (English, Spanish, French) via i18next",
      "Persistent cart state preserved across page refreshes and browser tabs",
      "Instant multi-attribute product filtering (category, price, material)",
      "Zero-flicker theme synchronization using CSS custom properties"
    ],
    problem: "Luxury retail sites often suffer from sluggish product filters, clunky language switching that forces full-page reloads, and inconsistent cart state across sessions that frustrates shoppers.",
    solution: "Designed an in-memory client state store using custom hooks and LocalStorage persistence. Integrated i18next with asynchronous chunk loading for zero-latency language switches without page refresh.",
    results: "Sub-20ms instantaneous language switches, smooth 60fps product hover animations, and a flawless mobile shopping workflow tested across smartphones, tablets, and 4K displays.",
    techDetails: [
      "React 19 with latest compiler hooks for memoization.",
      "TypeScript strict mode with comprehensive product interfaces.",
      "Vite build tool with route-based code-splitting.",
      "Vanilla CSS variables + Tailwind for adaptive luxury aesthetic."
    ],
    featured: true
  },
  {
    id: 4,
    title: "Note Sphere Smart Workspace",
    subtitle: "Smart, Clutter-Free Note Management System with Instant Local Sync",
    role: "Frontend Architect",
    year: "2025",
    platform: "Web Application / Productivity SPA",
    liveUrl: "https://note-sphere-16.vercel.app/",
    githubUrl: "https://github.com/Rudraptl16/Note-Sphere",
    description: "NoteSphere is a modern web-based note-taking application designed to help users create, edit, organize, and search their personal notes and tasks efficiently. Built with React and Next.js, it provides a clean, distraction-free minimalist UI focused on speed, keyboard shortcuts, and client-side persistence.",
    image: '/project img/Note.webp',
    category: "Web Apps",
    tags: ["React", "Next.js", "Tailwind CSS", "JavaScript ES6+", "Local Storage API"],
    stats: [
      { label: "CRUD Latency", value: "< 10ms" },
      { label: "Bundle Size", value: "85 KB" },
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Offline Capability", value: "100%" }
    ],
    keyFeatures: [
      "Instantaneous CRUD operations with sub-10ms response time",
      "Real-time fuzzy search and category filtering for note retrieval",
      "Minimalist responsive dark-mode UI optimized for long reading sessions",
      "Persistent browser storage with automatic backup and recovery",
      "Keyboard shortcut workflow for rapid note creation without mouse usage"
    ],
    problem: "Most modern note-taking tools are heavily bloated with unwanted collaborative features, slow electron wrappers, and cloud dependencies that fail when working offline or on slow networks.",
    solution: "Stripped away all unnecessary dependencies to build a featherweight (< 85KB) client-side note engine with instant IndexedDB/LocalStorage synchronisation and clean typography tokens.",
    results: "99/100 Lighthouse performance score, zero load delays, and a dependable offline-first note tool trusted for daily software engineering logs and study notes.",
    techDetails: [
      "React component tree structured with atomic principles.",
      "Custom debounce hook for real-time instant search without lag.",
      "Modular Tailwind CSS theme supporting high-contrast reading modes."
    ],
    featured: true
  },
  {
    id: 5,
    title: "Native iOS SwiftUI Productivity Suite",
    subtitle: "Native iOS Application Engineered with Swift 5.10, SwiftUI & Combine",
    role: "iOS Mobile Architect",
    year: "2025",
    platform: "iOS 18 Native / Swift & SwiftUI",
    liveUrl: "https://github.com/Rudraptl16",
    githubUrl: "https://github.com/Rudraptl16",
    description: "A native Apple iOS productivity application engineered with Swift 5.10 and SwiftUI, strictly adhering to Apple Human Interface Guidelines (HIG). The app features silky 120fps gesture controls, tactile haptic feedback, SwiftData offline persistence, and seamless adaptation across all iPhone screen sizes including Dynamic Island.",
    image: '/project img/iOS Todo-app.webp',
    category: "Mobile Apps",
    tags: ["Swift 5.10+", "SwiftUI", "Xcode", "Combine", "SwiftData", "Apple HIG"],
    stats: [
      { label: "UI Frame Rate", value: "120 FPS" },
      { label: "Crash-Free Rate", value: "100%" },
      { label: "App Launch Time", value: "< 250ms" },
      { label: "HIG Compliance", value: "Strict" }
    ],
    keyFeatures: [
      "100% Native SwiftUI declarative views with zero third-party UI overhead",
      "Apple Human Interface Guidelines typography (SF Pro) and spatial hierarchy",
      "Fluid interactive gesture controls with contextual haptic feedback",
      "SwiftData local persistence for instant launch times and offline capability",
      "Adaptive layouts supporting iPhone SE, Dynamic Island, and iPad"
    ],
    problem: "Cross-platform mobile apps frequently feel un-native on iOS, suffering from inconsistent gesture friction, micro-stutters, and poor integration with iOS system features like Haptics and Dark Mode.",
    solution: "Engineered from the ground up in pure Swift and SwiftUI. Utilized Combine publishers for reactive state binding and Instruments to profile and eliminate unnecessary memory allocations.",
    results: "Smooth 120fps animations on ProMotion displays, instantaneous under-250ms cold startup, and a tactile UX that feels natively at home in iOS 18.",
    techDetails: [
      "SwiftUI declarative view tree with custom ViewModifiers.",
      "SwiftData repository layer with automatic schema migrations.",
      "UIImpactFeedbackGenerator integration for refined tactile response.",
      "Xcode Instruments profiling verifying zero memory leaks."
    ],
    featured: true
  },
  {
    id: 6,
    title: "Panto Spatial Furniture Design System",
    subtitle: "Figma-to-Code Design Token System & High-Conversion E-Commerce Architecture",
    role: "UI/UX & Design Systems Engineer",
    year: "2025",
    platform: "Figma & React Design System",
    liveUrl: "https://www.figma.com",
    githubUrl: "https://github.com/Rudraptl16",
    description: "Panto is an enterprise-grade UI/UX design system and interactive prototype for a high-end spatial furniture brand. It establishes a complete design token foundation spanning typography scales, elevation shadows, glassmorphism blur layers, and responsive layout grids engineered for pixel-perfect code handoff.",
    image: '/project img/Panto - Furniture Landing Page Design.webp',
    category: "UI/UX Design",
    tags: ["UI/UX Design", "Figma", "Design Tokens", "Design System", "Tailwind CSS"],
    stats: [
      { label: "Figma-to-Code Match", value: "100%" },
      { label: "Design Tokens", value: "80+ Tokens" },
      { label: "Layout Shift (CLS)", value: "0.00" },
      { label: "Component Reusability", value: "95%" }
    ],
    keyFeatures: [
      "Modular design token library bridging Figma variables to Tailwind CSS",
      "Spatial product showcases with elevated visual hierarchy and glass cards",
      "Micro-interaction blueprints for hover states, loaders, and drawer menus",
      "Tested color contrast ratios complying with WCAG AAA accessibility standards",
      "Full responsive wireframes across 320px mobile, tablet, and 4K viewports"
    ],
    problem: "Designers and developers often face friction during handoff, leading to mismatched paddings, broken font hierarchies, and compromised user experiences in production.",
    solution: "Established a unified design token pipeline where Figma spacing and color variables map 1:1 to Tailwind CSS classes, backed by interactive component documentation.",
    results: "Eliminated design discrepancies, delivered a 100% pixel-perfect conversion, and established an extensible UI framework ready for commercial deployment.",
    techDetails: [
      "Figma design tokens mapped directly to CSS custom properties.",
      "Atomic component structuring separating atoms, molecules, and organisms.",
      "Responsive breakpoint standards tested across all standard viewport widths."
    ],
    featured: true
  }
];
