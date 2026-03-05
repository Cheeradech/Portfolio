import React from 'react';
import { motion } from 'framer-motion';
import Terminal from './Terminal';

const Hero = ({ heroRef, scale, opacity, containerVariants, itemVariants, brImage }) => {
    return (
        <section
            ref={heroRef}
            className="relative h-[120vh] overflow-hidden"
        >
            <motion.div
                style={{
                    scale,
                    opacity,
                    willChange: 'transform, opacity',
                }}
                className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 pt-0 pb-12"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-hero-glow rounded-full opacity-50 blur-3xl pointer-events-none" style={{ willChange: 'transform' }}></div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="relative z-10 w-full max-w-[1400px] xl:max-w-[1600px] mx-auto flex flex-col justify-center items-center h-full max-h-[850px]"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-16 items-center relative w-full flex-1">
                        {/* Left Column: Text */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 md:space-y-6 xl:space-y-8 order-2 lg:order-1 z-20">
                            <motion.div variants={itemVariants} className="space-y-3 md:space-y-4">
                                <h1 className="text-5xl md:text-7xl xl:text-8xl font-display font-bold leading-[0.95] tracking-tight">
                                    <span className="bg-gradient-to-b from-[#F3F4F6] via-[#D1D5DB] to-[#9CA3AF] bg-clip-text text-transparent font-black drop-shadow-2xl">
                                        Cheeradech
                                    </span>
                                    <br />
                                    <span className="relative radial-wave-animate 
                                    drop-shadow-[0_0_20px_rgba(139,92,246,0.6)] text-4xl md:text-6xl xl:text-7xl mt-2 block">
                                        Makcharoen
                                    </span>
                                </h1>
                                <p className="text-primary font-medium tracking-[0.2em] text-xs md:text-sm xl:text-base uppercase mt-4 xl:mt-6">
                                    Senior Executive Developer
                                </p>
                            </motion.div>

                            <motion.p
                                variants={itemVariants}
                                className="max-w-md xl:max-w-lg text-slate-400 text-base md:text-lg xl:text-xl font-light leading-relaxed"
                            >
                                Architecting high-performance digital ecosystems with visual stillness and precision engineering.
                            </motion.p>

                            <motion.div variants={itemVariants} className="pt-3 xl:pt-6 w-full md:w-auto flex justify-center md:justify-start">
                                <div className="flex flex-col items-center md:items-start gap-4">
                                    <div className="h-10 md:h-14 lg:h-16 xl:h-20 w-[1px] bg-gradient-to-b from-primary to-transparent"></div>
                                    <span className="text-[10px] md:text-xs xl:text-sm text-slate-500 uppercase tracking-widest mt-1">Scroll / Explore</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Image */}
                        <div className="flex justify-center order-1 lg:order-2 z-10 w-full relative md:mt-24 lg:mt-0">
                            <motion.div variants={itemVariants} className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[38rem] xl:h-[38rem] group flex items-center justify-center lg:-ml-4 xl:ml-0">

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
                                <div className="absolute inset-[-50px] pointer-events-none">
                                    <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full floating" style={{ animationDelay: '0s' }}></div>
                                    <div className="absolute bottom-10 right-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full floating" style={{ animationDelay: '1s' }}></div>
                                    <div className="absolute top-1/3 right-0 w-1 h-1 bg-purple-300 rounded-full floating" style={{ animationDelay: '2s' }}></div>
                                </div>

                                {/* 🌠 Shooting Star */}
                                <div className="absolute w-40 h-[2px] bg-gradient-to-r from-white via-cyan-400 to-transparent blur-[1px] shooting-star pointer-events-none" style={{ animationDuration: '4s' }}></div>

                                {/* ✨ Glow Core - static pseudo-glow via box-shadow wrapper */}
                                <div className="absolute w-[100%] h-[100%] bg-blue-500/10 rounded-full pointer-events-none" style={{ filter: 'blur(40px)', willChange: 'transform' }}></div>

                                {/* 🧑 Your Image — glow via pseudo wrapper to avoid filter repaint */}
                                <div
                                    className="relative w-[90%] h-[90%] z-10 rounded-full group/img"
                                    style={{ willChange: 'transform' }}
                                >
                                    {/* Glow ring — box-shadow is GPU-composited, no repaint */}
                                    <div
                                        className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-700 opacity-70 group-hover/img:opacity-100"
                                        style={{ boxShadow: '0 0 40px 8px rgba(13,127,242,0.35)', willChange: 'opacity' }}
                                    />
                                    <img
                                        alt="Professional executive portrait"
                                        className="w-full h-full rounded-full object-cover object-top brightness-110 contrast-[1.15] transition-transform duration-700 ease-out group-hover/img:scale-[1.04]"
                                        src={brImage}
                                        style={{
                                            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                            willChange: 'transform',
                                            backfaceVisibility: 'hidden',
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Absolute Terminal Overlay */}
                        <div className="absolute z-30 flex justify-center w-[280px] sm:w-[340px] lg:w-[400px] xl:w-[460px] left-1/2 lg:left-1/2 lg:translate-x-[-65%] xl:translate-x-[-55%] bottom-[-10%] lg:bottom-[15%] xl:bottom-[15%] transform -translate-x-1/2 pointer-events-none">
                            <Terminal itemVariants={itemVariants} />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
