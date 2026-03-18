import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Terminal from './Terminal';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Hero = ({ heroRef, scale, opacity, containerVariants, itemVariants, brImage }) => {
    const { lang } = useLanguage();
    const t = translations[lang].hero;

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const offset = 80;
            const targetPosition = aboutSection.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };
    return (
        <section
            id="hero"
            ref={heroRef}
            className="relative min-h-screen xl:h-[105vh] overflow-hidden"
        >
            <Motion.div
                style={{
                    scale,
                    opacity,
                }}
                className="relative xl:sticky top-0 h-auto min-h-screen xl:h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 pt-24 pb-16 md:pt-0"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full opacity-50 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0) 70%)' }}></div>

                <Motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="relative z-10 w-full max-w-350 xl:max-w-400 mx-auto flex flex-col justify-center items-center h-auto md:h-full max-h-none md:max-h-212.5"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 xl:gap-16 items-center relative w-full flex-1 pb-0 md:pb-0">
                        {/* Left Column: Text */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5 md:space-y-6 xl:space-y-8 order-2 md:order-1 z-20">
                            <Motion.div variants={itemVariants} className="space-y-3 md:space-y-4">
                                <h1 className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-display font-bold leading-[0.95] tracking-tight">
                                    <span className="bg-linear-to-b from-[#F3F4F6] via-[#D1D5DB] to-[#9CA3AF] bg-clip-text text-transparent font-black drop-shadow-xl">
                                        Cheeradech
                                    </span>
                                    <br />
                                    <span className="relative radial-wave-animate text-3xl sm:text-4xl md:text-6xl xl:text-7xl mt-2 block" style={{ textShadow: '0 0 20px rgba(139,92,246,0.5)' }}>
                                        Makcharoen
                                    </span>
                                </h1>
                                <p className="text-primary font-medium tracking-[0.2em] text-xs md:text-sm xl:text-base uppercase mt-4 xl:mt-6">
                                    Full-Stack Developer
                                </p>
                            </Motion.div>

                            <Motion.p
                                variants={itemVariants}
                                className="max-w-md xl:max-w-lg text-slate-400 text-base md:text-lg xl:text-xl font-light leading-relaxed"
                            >
                                {t.subtitle}
                            </Motion.p>

                            {/* Animated Down Arrow to About */}
                            <Motion.div 
                                variants={itemVariants}
                                className="flex flex-col items-center w-full max-w-md xl:max-w-lg -translate-x-6 md:-translate-x-12 xl:-translate-x-24 gap-2 mt-2 cursor-pointer group"
                                onClick={scrollToAbout}
                            >
                                <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest group-hover:text-primary transition-colors duration-300">
                                    Click
                                </span>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-300" />
                                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-600/50 bg-slate-800/30 backdrop-blur-sm flex items-center justify-center group-hover:border-primary/50 group-hover:bg-slate-800/50 transition-all duration-300">
                                        <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-primary group-hover:translate-y-0.5 transition-all duration-300 animate-bounce" />
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent group-hover:h-10 transition-all duration-300" />
                            </Motion.div>

                            <Motion.div variants={itemVariants} className="hidden xl:flex pt-3 xl:pt-6 w-full md:w-auto justify-center md:justify-start">
                                <div className="flex flex-col items-center md:items-start gap-4">
                                    <div className="h-10 md:h-14 lg:h-16 xl:h-20 w-px bg-linear-to-b from-primary to-transparent"></div>
                                    <span className="text-[10px] md:text-xs xl:text-sm text-slate-500 uppercase tracking-widest mt-1">{t.scroll}</span>
                                </div>
                            </Motion.div>
                        </div>

                        {/* Right Column: Image */}
                        <div className="flex justify-center order-1 md:order-2 z-10 w-full relative mt-8 sm:mt-16 md:mt-0">
                            <Motion.div variants={itemVariants} className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-lg md:h-128 xl:w-152 xl:h-152 group flex items-center justify-center md:-ml-4 xl:ml-0">

                                {/* 🪐 Orbital System */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Orbit 1 */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-blue-500/20 rounded-full"
                                        style={{ transform: 'translate(-50%, -50%) rotateX(60deg) rotateY(10deg)' }}>
                                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_#60A5FA] orbiting-element"
                                            style={{ '--orbit-radius': '180px', '--orbit-duration': '8s' }}></div>
                                    </div>

                                    {/* Orbit 2 */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-purple-500/20 rounded-full"
                                        style={{ transform: 'translate(-50%, -50%) rotateX(-60deg) rotateY(20deg)' }}>
                                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#A855F7] orbiting-element"
                                            style={{ '--orbit-radius': '220px', '--orbit-duration': '12s', animationDirection: 'reverse' }}></div>
                                    </div>

                                    {/* Orbit 3 (Faint) */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] border border-cyan-500/10 rounded-full"
                                        style={{ transform: 'translate(-50%, -50%) rotateX(75deg)' }}>
                                    </div>
                                </div>

                                {/* ✨ Floating Particles */}
                                <div className="absolute -inset-12.5 pointer-events-none">
                                    <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full floating" style={{ animationDelay: '0s' }}></div>
                                    <div className="absolute bottom-10 right-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full floating" style={{ animationDelay: '1s' }}></div>
                                    <div className="absolute top-1/3 right-0 w-1 h-1 bg-purple-300 rounded-full floating" style={{ animationDelay: '2s' }}></div>
                                </div>

                                {/* 🌠 Shooting Star */}
                                <div className="absolute w-40 h-0.5 bg-linear-to-r from-white via-cyan-400 to-transparent shooting-star pointer-events-none" style={{ animationDuration: '4s' }}></div>

                                {/* ✨ Glow Core - static pseudo-glow via box-shadow wrapper */}
                                <div className="absolute w-[140%] h-[140%] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)' }}></div>

                                {/* 🧑 Your Image — glow via pseudo wrapper to avoid filter repaint */}
                                <div
                                    className="relative w-[90%] h-[90%] z-10 rounded-full group/img"
                                >
                                    {/* Glow ring — box-shadow is GPU-composited, no repaint */}
                                    <div
                                        className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-700 opacity-70 group-hover/img:opacity-100"
                                        style={{ boxShadow: '0 0 40px 8px rgba(13,127,242,0.35)' }}
                                    />
                                    <img
                                        alt="Professional executive portrait"
                                        className="w-full h-full rounded-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-[1.04]"
                                        src={brImage}
                                        style={{
                                            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                            backfaceVisibility: 'hidden',
                                        }}
                                    />
                                </div>
                            </Motion.div>
                        </div>

                        {/* Terminal — flows in document on mobile, absolute overlay on desktop */}
                        {/* Mobile & Tablet: show below content as regular block */}
                        <div className="xl:hidden order-3 w-full flex justify-center mt-4 pointer-events-none px-2">
                            <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md">
                                <Terminal itemVariants={itemVariants} />
                            </div>
                        </div>

                        {/* Desktop (Wide Screens): absolute positioned overlay */}
                        <div className="hidden xl:flex absolute z-30 justify-center xl:w-115 left-1/2 xl:translate-x-[-55%] xl:bottom-[15%] transform -translate-x-1/2 pointer-events-none">
                            <Terminal itemVariants={itemVariants} />
                        </div>
                    </div>
                </Motion.div>
            </Motion.div>
        </section>
    );
};

export default Hero;
