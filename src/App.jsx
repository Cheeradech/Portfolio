import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TechPad from './components/TechPad';
// import bigImage from './assets/BIG.png';
import brImage from './assets/BR_transparent.png';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/animated-tabs";
import './App.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Portfolio = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(15px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 100;
    const targetPosition = el.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 400; // 0.4s for instant response
    let start = null;

    // Easing function: easeOutQuint - Starts fast, decelerates smoothly
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);

      window.scrollTo(0, startPosition + distance * easeOutQuint(percentage));

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <div className="dark">
      <div className="min-h-screen text-slate-200 overflow-x-clip selection:bg-primary selection:text-white relative">

        {/* --- Global Fixed Background --- */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-[#111114] via-[#050505] to-[#000000]"></div>
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-900/10 rounded-full blur-[100px]"></div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-black/30 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-20 relative flex items-center justify-between">

            {/* Logo (Left) */}
            <div className="flex items-center gap-2 z-20">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary">
                <span className="material-symbols-outlined text-sm font-bold">code</span>
              </div>
              <span className="text-sm tracking-[0.2em] font-bold text-white uppercase">CM.dev</span>
            </div>

            {/* Tabs (Absolute Center) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Tabs defaultValue="about" className="w-auto">
                <TabsList className="bg-transparent border-none p-0 gap-2">
                  <TabsTrigger
                    value="about"
                    onClick={() => scrollToSection("about")}
                    className="text-sm tracking-wide"
                  >
                    About
                  </TabsTrigger>
                  <TabsTrigger
                    value="expertise"
                    onClick={() => scrollToSection("expertise")}
                    className="text-sm tracking-wide"
                  >
                    Expertise
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    onClick={() => scrollToSection("experience")}
                    className="text-sm tracking-wide"
                  >
                    Experience
                  </TabsTrigger>
                  <TabsTrigger
                    value="works"
                    onClick={() => scrollToSection("works")}
                    className="text-sm tracking-wide"
                  >
                    Works
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Contact Button / Mobile Menu (Right) */}
            <div className="flex items-center gap-4 z-20">
              <AnimatedButton
                className='text-white hidden md:flex'
                variant='default'
                size='default'
                glow={true}
                textEffect='normal'
                uppercase={true}
                rounded='custom'
                asChild={false}
                hideAnimations={false}
                shimmerColor='#39FF14'
                shimmerSize='0.15em'
                shimmerDuration='3s'
                borderRadius='100px'
                background='rgba(0, 0, 0, 1)'
                onClick={() => window.location.href = 'mailto:cheeradech.m@example.com'}
              >
                Contact Me
              </AnimatedButton>
              <button className="cursor-pointer md:hidden text-white">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>

          </div>
        </nav>

        <main className="relative z-10 pt-20">
          {/* Scroll Anchor for About */}
          <div id="about" className="absolute -top-20 left-0 w-full h-1"></div>

          {/* About Section */}
          {/* About Section */}
          <section
            ref={heroRef}
            className="relative h-[200vh] overflow-hidden"
          >
            <motion.div
              style={{
                scale,
                filter: blur,
                opacity,
              }}
              className="sticky top-0 h-screen flex flex-col items-center justify-start px-6 pt-4 md:pt-20"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hero-glow rounded-full opacity-60 blur-3xl pointer-events-none"></div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                {/* Left Column: Text */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:space-y-8 order-2 md:order-1">
                  <motion.div variants={itemVariants} className="space-y-2 md:space-y-4">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight">
                      <span className="bg-gradient-to-b from-[#F3F4F6] via-[#D1D5DB] to-[#9CA3AF] bg-clip-text text-transparent font-black text-6xl md:text-8xl lg:text-8xl drop-shadow-2xl">
                        Cheeradech
                      </span>
                      <br />
                      <span className="relative bg-gradient-to-r 
                                        from-[#3B82F6] 
                                        via-[#8B5CF6] 
                                        to-[#22D3EE] 
                                        bg-clip-text 
                                        text-transparent 
                                        purple-animate 
                         drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]">
                        Makcharoen
                      </span>
                    </h1>
                    <p className="text-primary font-medium tracking-[0.2em] text-sm md:text-base uppercase">
                      Senior Executive Developer
                    </p>
                  </motion.div>

                  <motion.p
                    variants={itemVariants}
                    className="max-w-md text-slate-400 text-lg md:text-xl font-light leading-relaxed"
                  >
                    Architecting high-performance digital ecosystems with visual stillness and precision engineering.
                  </motion.p>

                  <motion.div variants={itemVariants} className="pt-4 md:pt-8 w-full md:w-auto flex justify-center md:justify-start">
                    <div className="flex flex-col items-center md:items-start gap-4">
                      <div className="h-16 w-[1px] bg-gradient-to-b from-primary to-transparent"></div>
                      <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll / Explore</span>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column: Image */}
                <div className="flex justify-center md:justify-end order-1 md:order-2">
                  <motion.div variants={itemVariants} className="relative w-64 h-64 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] group flex items-center justify-center z-20">

                    {/* 🪐 Orbital System */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Orbit 1 */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-blue-500/20 rounded-full"
                        style={{ transform: 'translate(-50%, -50%) rotateX(60deg) rotateY(10deg)' }}>
                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_#60A5FA] orbiting-element"
                          style={{ '--orbit-radius': '170px', '--orbit-duration': '8s' }}></div>
                      </div>

                      {/* Orbit 2 */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-purple-500/20 rounded-full"
                        style={{ transform: 'translate(-50%, -50%) rotateX(-60deg) rotateY(20deg)' }}>
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#A855F7] orbiting-element"
                          style={{ '--orbit-radius': '200px', '--orbit-duration': '12s', animationDirection: 'reverse' }}></div>
                      </div>

                      {/* Orbit 3 (Faint) */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] border border-cyan-500/10 rounded-full"
                        style={{ transform: 'translate(-50%, -50%) rotateX(75deg)' }}>
                      </div>
                    </div>

                    {/* ✨ Floating Particles */}
                    <div className="absolute inset-[-50px] pointer-events-none">
                      <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full floating" style={{ animationDelay: '0s' }}></div>
                      <div className="absolute bottom-10 right-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full floating" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute top-1/3 right-0 w-1 h-1 bg-purple-300 rounded-full floating" style={{ animationDelay: '2s' }}></div>
                    </div>

                    {/* 🌠 Shooting Star */}
                    <div className="absolute w-40 h-[2px] bg-gradient-to-r from-white via-cyan-400 to-transparent blur-[1px] shooting-star pointer-events-none" style={{ animationDuration: '4s' }}></div>

                    {/* ✨ Glow Core */}
                    <div className="absolute w-[100%] h-[100%] bg-blue-500/10 rounded-full blur-3xl pointer-events-none pulse-glow"></div>

                    {/* 🧑 Your Image */}
                    <img
                      alt="Professional executive portrait"
                      className="relative w-[90%] h-[90%] rounded-full object-cover object-top contrast-125 brightness-110 drop-shadow-[0_0_30px_rgba(13,127,242,0.4)] hover:drop-shadow-[0_0_50px_rgba(13,127,242,0.6)] transition-all duration-700 hover:scale-[1.05] z-10 masking-image"
                      src={brImage}
                      style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                    />

                  </motion.div>
                </div>

              </motion.div>
            </motion.div>
          </section>

          {/* Expertise Section */}
          {/* Expertise Section */}
          <TechPad />

          {/* Experience Section */}
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="py-32 relative z-0 bg-background-dark/50 scroll-mt-20" id="experience">
            <div className="max-w-[1000px] mx-auto px-6">
              <div className="mb-20 flex items-center justify-end gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-white text-right">EXECUTIVE TIMELINE</h2>
                <div className="h-[1px] w-12 bg-primary"></div>
              </div>
              <div className="relative space-y-16 pl-8 md:pl-0">
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/20 -translate-x-1/2"></div>

                {/* Timeline Item 1 */}
                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                  <div className="md:w-[45%] md:text-right pr-8 order-2 md:order-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Chief Technology Officer</h3>
                    <p className="text-primary text-sm font-medium mt-1">TechFlow Enterprise Solutions</p>
                    <p className="text-slate-400 text-sm mt-3 leading-relaxed">Spearheaded digital transformation for a Fortune 500 logistics firm. Reduced operational costs by 40% through AI-driven automation.</p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-background-dark border-2 border-primary rounded-full -translate-x-[7px] md:-translate-x-1/2 z-10 shadow-[0_0_10px_rgba(13,127,242,0.8)] order-1 md:order-2"></div>
                  <div className="md:w-[45%] pl-8 md:pl-8 mt-2 md:mt-0 order-3 text-left">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">2021 — Present</span>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                  <div className="md:w-[45%] md:text-right pr-8 order-2 md:order-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">2018 — 2021</span>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-slate-700 rounded-full -translate-x-[5px] md:-translate-x-1/2 z-10 group-hover:bg-primary transition-colors order-1 md:order-2"></div>
                  <div className="md:w-[45%] pl-8 md:pl-8 mt-2 md:mt-0 order-3 text-left">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">VP of Engineering</h3>
                    <p className="text-primary text-sm font-medium mt-1">Nova Systems Inc.</p>
                    <p className="text-slate-400 text-sm mt-3 leading-relaxed">Scaled the engineering team from 15 to 120 developers. Implemented agile methodologies and CI/CD pipelines resulting in 3x faster deployment cycles.</p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                  <div className="md:w-[45%] md:text-right pr-8 order-2 md:order-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Senior Lead Architect</h3>
                    <p className="text-primary text-sm font-medium mt-1">Global FinTech Corp</p>
                    <p className="text-slate-400 text-sm mt-3 leading-relaxed">Designed the core banking ledger system handling $5B+ daily transactions. Ensured 99.999% uptime and zero-trust security compliance.</p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-slate-700 rounded-full -translate-x-[5px] md:-translate-x-1/2 z-10 group-hover:bg-primary transition-colors order-1 md:order-2"></div>
                  <div className="md:w-[45%] pl-8 md:pl-8 mt-2 md:mt-0 order-3 text-left">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">2015 — 2018</span>
                  </div>
                </div>

                {/* Timeline Item 4 */}
                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                  <div className="md:w-[45%] md:text-right pr-8 order-2 md:order-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">2012 — 2015</span>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-slate-700 rounded-full -translate-x-[5px] md:-translate-x-1/2 z-10 group-hover:bg-primary transition-colors order-1 md:order-2"></div>
                  <div className="md:w-[45%] pl-8 md:pl-8 mt-2 md:mt-0 order-3 text-left">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Senior Backend Engineer</h3>
                    <p className="text-primary text-sm font-medium mt-1">DataStream Analytics</p>
                    <p className="text-slate-400 text-sm mt-3 leading-relaxed">Optimized database query performance by 200%. Developed microservices architecture for real-time data processing.</p>
                  </div>
                </div>

              </div>
            </div>
          </motion.section>

          {/* Works Section */}
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="py-32 relative z-10 bg-background-dark scroll-mt-24" id="works">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="mb-20 flex flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Selected Works</h2>
                <div className="h-[1px] w-24 bg-primary"></div>
                <p className="text-slate-400 max-w-lg">High-impact projects defining the intersection of performance and aesthetics.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Work Item 1 */}
                <div className="group bg-background-dark border border-white/5 overflow-hidden relative">
                  <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
                    <img alt="Abstract blue data visualization dashboard interface" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz3vAKSjIvI_CsUX32bmR_cIr6QDLzlO3civ6WHvsinCI58jjXygaaF4d7JTSzNKVfHmnjG6Fwguy9fBVLC5eaxJjDCn8MWcwx0d70SbV883ES99ilZQGmmxYFhBFJLeCtrc_hUn2v1wLSrLXtFVqFbI1rp3YJ7n7V5WrN31jOgQd4OVjUv9ludVRkFfyxEucpx3nvz8PyMzbiuJoUQfSvHiXJAeRG8tVVoA35zZWiUiFjvWUTNBxDxmtkZxzpE-xvILyg0OJbtyE" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                  </div>
                  <div className="p-8 absolute bottom-0 left-0 w-full">
                    <h3 className="text-xl font-bold text-white mb-2">Alpha Stream</h3>
                    <p className="text-xs text-primary font-mono uppercase tracking-widest mb-4">FinTech / Real-time</p>
                    <p className="text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      A high-frequency trading platform processing 10k transactions per second with sub-millisecond latency.
                    </p>
                  </div>
                </div>

                {/* Work Item 2 */}
                <div className="group bg-background-dark border border-white/5 overflow-hidden relative">
                  <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
                    <img alt="Clean white server room with blue lighting" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiL1Jmn0Y6Y6jgt99aJ9WLFIHXnq7K4-HUDxXdyA2PqTh1o5bZCrrnMVB0lFzwEAsP-Bv6T9xi7jlbSVIKpr2_oJqqauKpQRhP_YZDUayOK0lJ2ji_fHbITYxLr0LlhkKHXTwQaCNAfpWmxMqJ1KF5yKR56Vs9WFXWPVw3EGotX8lyQxdMl8R9K4HlnThwDiBi5SZQdTeenWuQwe5CjbGpFA8PMfpzU8WVVsFztETfS-xjAwD4-A2W4KB2J6R69xrc8O27dUnyrEc" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                  </div>
                  <div className="p-8 absolute bottom-0 left-0 w-full">
                    <h3 className="text-xl font-bold text-white mb-2">Nebula Cloud</h3>
                    <p className="text-xs text-primary font-mono uppercase tracking-widest mb-4">Infrastructure / SaaS</p>
                    <p className="text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      Proprietary cloud orchestration tool reducing deployment costs by 35% for enterprise clients.
                    </p>
                  </div>
                </div>

                {/* Work Item 3 */}
                <div className="group bg-background-dark border border-white/5 overflow-hidden relative">
                  <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
                    <img alt="Futuristic digital brain AI concept" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsSHsUbkJUWdg-MDImz_KZH--e_pmILHujys5Fgwk8SEyuHoc2emQ6brjphUsTav8NwKCgbC2iddcmBA0ipaZDWS9s4yj41Gz6gwWlV6omYhxytBlcC7H3s3iWutOYuCufhVxUTkGA9ShgRLxkc3Rjmqc_kJBUWZg482BHNYYwEjzIF5SfvjvRzcmalNs7xG9HFa_GGsahdy5XIdmQLOri4WSDCnxcV6zCios-UBi6dd549RB-UBxn7eDtKJ8sCjtBMWzJsNC3jSQ" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                  </div>
                  <div className="p-8 absolute bottom-0 left-0 w-full">
                    <h3 className="text-xl font-bold text-white mb-2">Cognito AI</h3>
                    <p className="text-xs text-primary font-mono uppercase tracking-widest mb-4">Machine Learning / Health</p>
                    <p className="text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      Diagnostic support AI analyzing medical imaging with 98% accuracy compared to human experts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

        </main>

        {/* Footer */}
        <footer className="relative z-10 py-12 border-t border-white/5 bg-background-dark">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-slate-500 text-sm font-light">© 2024 Cheeradech Makcharoen.</p>
              <p className="text-slate-600 text-xs">All rights reserved. Designed with precision.</p>
            </div>
            <div className="flex items-center gap-6">
              <a className="text-slate-500 hover:text-white transition-colors duration-300" href="#">
                <span className="sr-only">LinkedIn</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fillRule="evenodd"></path>
                </svg>
              </a>
              <a className="text-slate-500 hover:text-white transition-colors duration-300" href="#">
                <span className="sr-only">GitHub</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Portfolio;
