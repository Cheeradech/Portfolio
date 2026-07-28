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
                className="relative xl:sticky top-0 h-auto min-h-screen xl:h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 pb-12 sm:pb-16 md:pt-0 overflow-x-hidden"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] sm:w-175 sm:h-175 max-w-[700px] max-h-[700px] rounded-full opacity-50 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0) 70%)' }}></div>

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
                                    Full-Stack Developer Intern
                                </p>
                            </Motion.div>

                            {/* Terminal Component - Flowing Layout */}
                            <Motion.div 
                                variants={itemVariants} 
                                className="w-full mt-6 sm:mt-8 md:mt-10 pointer-events-none flex justify-center md:justify-start"
                            >
                                <div className="w-full max-w-[90%] sm:max-w-sm md:max-w-[380px] xl:max-w-[450px]">
                                    <Terminal itemVariants={itemVariants} />
                                </div>
                            </Motion.div>
                        </div>

                        {/* Right Column: Image */}
                        <div className="flex justify-center order-1 md:order-2 z-10 w-full relative mt-8 sm:mt-16 md:mt-0">
                            <Motion.div variants={itemVariants} className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[30rem] lg:w-96 lg:h-[34rem] xl:w-[28rem] xl:h-[38rem] group flex items-center justify-center mx-auto md:-ml-4 xl:ml-0 mt-8 md:mt-0">

                                {/* 🪐 Orbital System */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Orbit 1 */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] border border-blue-500/20 rounded-full"
                                        style={{ transform: 'translate(-50%, -50%) rotateX(60deg) rotateY(10deg)' }}>
                                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_#60A5FA] orbiting-element"
                                            style={{ '--orbit-radius': '180px', '--orbit-duration': '8s' }}></div>
                                    </div>

                                    {/* Orbit 2 */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[140%] border border-purple-500/20 rounded-full"
                                        style={{ transform: 'translate(-50%, -50%) rotateX(-60deg) rotateY(20deg)' }}>
                                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#A855F7] orbiting-element"
                                            style={{ '--orbit-radius': '220px', '--orbit-duration': '12s', animationDirection: 'reverse' }}></div>
                                    </div>

                                    {/* Orbit 3 (Faint) */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[160%] border border-cyan-500/10 rounded-full"
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
                                <div className="absolute w-[120%] h-[120%] rounded-[3rem] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)' }}></div>

                                {/* 🧑 Your Image — glow via pseudo wrapper to avoid filter repaint */}
                                <div
                                    className="relative w-full h-full z-10 rounded-[2rem] sm:rounded-[3rem] group/img overflow-hidden border border-white/15 bg-[#050507] shadow-[0_28px_90px_-35px_rgba(37,99,235,0.85)]"
                                >
                                    {/* Glow ring — box-shadow is GPU-composited, no repaint */}
                                    <div
                                        className="absolute inset-0 rounded-[2rem] sm:rounded-[3rem] pointer-events-none transition-opacity duration-700 opacity-70 group-hover/img:opacity-100"
                                        style={{ boxShadow: '0 0 40px 8px rgba(13,127,242,0.2)' }}
                                    />
                                    <div className="absolute inset-x-8 top-6 h-28 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
                                    
                                    <img
                                        alt="Cheeradech Makcharoen portrait"
                                        className="relative z-10 w-full h-full object-cover object-[48%_4%] scale-[1.03] transition-transform duration-700 ease-out group-hover/img:scale-[1.065]"
                                        src={brImage}
                                        fetchpriority="high"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 z-20 bg-linear-to-t from-black/20 via-black/0 to-white/[0.04] pointer-events-none" />
                                </div>
                            </Motion.div>
                        </div>


                    </div>
                </Motion.div>
            </Motion.div>
        </section>
    );
};

export default Hero;
