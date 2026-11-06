import { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeatureNavbar from './components/FeatureNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GlobalParticles from './components/canvas/GlobalParticles';

import Artifacts from './pages/Artifacts';
import CaseStudy from './pages/CaseStudy';
import AchievementsPage from './pages/AchievementsPage';
import ContactPage from './pages/ContactPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';


// Lightweight page loading indicator
const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const location = useLocation();

  // Prevent copying, right-clicking, and inspection shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleCopy = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      // Prevent Ctrl+C / Cmd+C
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+I / Cmd+Option+I (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'i') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isFeaturePage = location.pathname.startsWith('/artifacts') ||
    location.pathname.startsWith('/blog') ||
    location.pathname.startsWith('/achievements') ||
    location.pathname.startsWith('/contact');

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-dark-textMain relative">
      {/* Global Particle Background */}
      <GlobalParticles />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Conditionally render Navbar or FeatureNavbar */}
        {isFeaturePage ? <FeatureNavbar /> : <Navbar />}
        <main className="flex-grow">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artifacts" element={<Artifacts />} />
              <Route path="/artifacts/:id" element={<CaseStudy />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
            </Routes>
          </Suspense>
        </main>
        {!isFeaturePage && <Footer />}
      </div>
    </div>
  );
}

export default App;
