import React, { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { useScroll, useTransform } from 'framer-motion';

const TechPad = lazy(() => import('./components/TechPad'));
import brImage from './assets/BR_transparent.png';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import PortfolioWorks from './components/PortfolioWorks';
import Contact from './components/Contact';
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
  const [activeTab, setActiveTab] = useState("about");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const sections = ["about", "expertise", "experience", "works", "contact"];

    // Function to sync tab based on current scroll position (for refresh/load)
    const syncActiveTab = () => {
      if (isScrollingRef.current) return;

      let currentSection = sections[0];
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
    setActiveTab("about");

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

    // Also sync on manual scroll just in case
    window.addEventListener('scroll', syncActiveTab, { passive: true });

    return () => {
      clearTimeout(initTimeout);
      observer.disconnect();
      window.removeEventListener('scroll', syncActiveTab);
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    isScrollingRef.current = true;
    setActiveTab(id);

    const offset = 80;
    const targetPosition = el.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 850; // Increased for a smoother feel
    let start = null;

    // Easing function: easeInOutQuart for more natural momentum
    const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);

      window.scrollTo(0, startPosition + distance * easeInOutQuart(percentage));

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 150); // Shorter buffer needed with smoother easing
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <div className="dark">
      <div className="min-h-screen text-slate-200 overflow-x-clip selection:bg-primary selection:text-white relative">

        {/* --- Global Fixed Background --- */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-[#111114] via-[#050505] to-[#000000]" style={{ willChange: 'transform' }}></div>
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden" style={{ willChange: 'transform' }}>
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full" style={{ filter: 'blur(80px)' }}></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-900/10 rounded-full" style={{ filter: 'blur(70px)' }}></div>
        </div>

        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} scrollToSection={scrollToSection} />

        <main className="relative z-10 pt-20">
          {/* Scroll Anchor for About */}
          <div id="about" className="absolute -top-20 left-0 w-full h-1"></div>

          <Hero
            heroRef={heroRef}
            scale={scale}
            opacity={opacity}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
            brImage={brImage}
          />

          {/* Expertise Section */}
          <div id="expertise" className="anchor-wrapper scroll-mt-24">
            <Suspense fallback={<div className="h-96 flex items-center justify-center text-slate-500 font-mono text-sm tracking-widest uppercase animate-pulse">Initializing System...</div>}>
              <TechPad />
            </Suspense>
          </div>

          <Experience />

          <PortfolioWorks />

          <Contact />

        </main >

        <Footer />

      </div >
    </div >
  );
};

export default Portfolio;
