import React, { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';

const TechPad = lazy(() => import('./components/TechPad'));
import brImage from './assets/BR_transparent.png';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
const PortfolioWorks = lazy(() => import('./components/PortfolioWorks'));
const Contact = lazy(() => import('./components/Contact'));
import Footer from './components/Footer';
import './App.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Portfolio = () => {
  const heroRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const [activeTab, setActiveTab] = useState("");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scale = 1;
  const opacity = 1;

  useEffect(() => {
    const sections = ["about", "expertise", "works", "contact"];

    // Function to sync tab based on current scroll position (for refresh/load)
    const syncActiveTab = () => {
      if (isScrollingRef.current) return;

      let currentSection = "";
      const scrollPos = window.scrollY + 250;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            currentSection = id;
          }
        }
      }
      setActiveTab(currentSection);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // More balanced margin for section detection
      threshold: 0
    };

    const handleIntersect = (entries) => {
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Force scroll to top on refresh/load
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    setActiveTab("");

    // Give a small delay for DOM to stabilize (especially for lazy components)
    const initTimeout = setTimeout(() => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
      syncActiveTab();
      window.scrollTo(0, 0); // Double check scroll to top after observer starts
    }, 100);

    // Also sync on manual scroll just in case - throttled for performance
    let lastScrollTime = 0;
    const throttledSync = () => {
      const now = Date.now();
      if (now - lastScrollTime > 100) {
        syncActiveTab();
        lastScrollTime = now;
      }
    };

    window.addEventListener('scroll', throttledSync, { passive: true });

    return () => {
      clearTimeout(initTimeout);
      observer.disconnect();
      window.removeEventListener('scroll', throttledSync);
    };
  }, []);

  const scrollRafRef = useRef(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    // 1. Cancel any existing animation frame to prevent "lag stack"
    if (scrollRafRef.current) {
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    }

    isScrollingRef.current = true;
    setActiveTab(id);

    const offset = 80;
    const targetPosition = el.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;

    // Use a fixed FAST duration (450ms) so it snaps rapidly without lingering on heavy GPU sections
    const duration = 450;
    let start = null;

    // easeOutQuart: extremely snappy start, buttery soft landing
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);

      window.scrollTo(0, startPosition + distance * easeOutQuart(percentage));

      if (progress < duration) {
        scrollRafRef.current = window.requestAnimationFrame(step);
      } else {
        scrollRafRef.current = null;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 50);
      }
    };

    scrollRafRef.current = window.requestAnimationFrame(step);
  };

  return (
    <div className="dark">
      <div className="min-h-screen text-slate-200 overflow-x-clip selection:bg-primary selection:text-white relative antialiased">

        {/* --- Global Fixed Background --- */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-[#111114] via-[#050505] to-[#000000] will-change-transform"></div>
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full will-change-transform" style={{ background: 'radial-gradient(circle, rgba(30,58,138,0.15) 0%, rgba(30,58,138,0) 70%)' }}></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full will-change-transform" style={{ background: 'radial-gradient(circle, rgba(124,45,18,0.15) 0%, rgba(124,45,18,0) 70%)' }}></div>
        </div>

        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} scrollToSection={scrollToSection} />

        <main className="relative z-10 pt-20">
          <Hero
            heroRef={heroRef}
            scale={scale}
            opacity={opacity}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
            brImage={brImage}
          />

          {/* About Section */}
          <div id="about" className="scroll-mt-20">
            <About />
          </div>

          {/* Expertise Section */}
          <div id="expertise" className="anchor-wrapper scroll-mt-24">
            <Suspense fallback={<div className="h-96 flex items-center justify-center text-slate-500 font-mono text-sm tracking-widest uppercase animate-pulse">Initializing System...</div>}>
              <TechPad />
            </Suspense>
          </div>

          <Suspense fallback={<div className="h-[50vh] flex items-center justify-center text-slate-500 font-mono tracking-widest uppercase text-xs animate-pulse">Initializing Interface...</div>}>
            <PortfolioWorks />
            <Contact />
          </Suspense>

        </main >

        <Footer />

      </div >
    </div >
  );
};

const App = () => (
  <LanguageProvider>
    <Portfolio />
  </LanguageProvider>
);

export default App;
