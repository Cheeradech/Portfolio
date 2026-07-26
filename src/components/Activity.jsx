import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, UserCheck, Calendar, MapPin, Maximize2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import SectionHeader from './ui/SectionHeader';
import itImage from '../assets/IT.jpg';

const Activity = React.memo(() => {
    const { lang } = useLanguage();
    const t = translations[lang].activity;
    const [isImageOpen, setIsImageOpen] = useState(false);

    return (
        <section id="activity" className="py-24 px-4 sm:px-6 lg:px-12 relative z-10 scroll-mt-24">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    title={t.title}
                    subtitle={t.subtitle}
                />

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative bg-[#0a0a0a]/60 border border-white/5 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden group hover:bg-[#111111]/80 hover:border-white/10 transition-all duration-500"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

                        {/* Image Box */}
                        <div className="lg:col-span-5">
                            <div 
                                onClick={() => setIsImageOpen(true)}
                                className="relative rounded-xl overflow-hidden border border-white/5 group/img cursor-pointer bg-[#050505] aspect-[4/3] flex items-center justify-center"
                            >
                                <img
                                    src={itImage}
                                    alt="IT Empowering Day 2026 Award"
                                    className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover/img:scale-[1.02] group-hover/img:opacity-100"
                                />

                                {/* Event Badge Overlay */}
                                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-[11px] font-medium text-slate-200 flex items-center gap-1.5 uppercase tracking-wide shadow-sm">
                                    <Award strokeWidth={1.5} className="w-3.5 h-3.5 text-slate-300" />
                                    <span>IT Empowering Day 2026</span>
                                </div>

                                {/* Zoom Overlay Icon */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <div className="p-3 rounded-full bg-black/50 border border-white/10 text-white backdrop-blur-md transform scale-90 group-hover/img:scale-100 transition-transform duration-500">
                                        <Maximize2 strokeWidth={1.5} className="w-5 h-5 text-slate-200" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Details */}
                        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">

                            {/* Award Badge Header */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-slate-300 text-[10px] sm:text-[11px] font-medium uppercase tracking-widest w-fit">
                                <Award strokeWidth={1.5} className="w-3.5 h-3.5" />
                                <span>{t.badge}</span>
                            </div>

                            {/* Main Title */}
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white/90 leading-tight tracking-tight group-hover:text-white transition-colors duration-500">
                                {t.awardTitle}
                            </h3>

                            {/* Role and Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 font-light">
                                <div className="flex items-center gap-2">
                                    <UserCheck strokeWidth={1.5} className="w-4 h-4 text-slate-500" />
                                    <span>{t.roleLabel}: <span className="text-slate-300 font-normal">{t.role}</span></span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin strokeWidth={1.5} className="w-4 h-4 text-slate-500" />
                                    <span>Bangkok University</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar strokeWidth={1.5} className="w-4 h-4 text-slate-500" />
                                    <span>2026</span>
                                </div>
                            </div>

                            <div className="h-px w-full bg-white/5" />

                            {/* Description */}
                            <div className="space-y-3">
                                <p className="text-slate-400/90 text-sm sm:text-base leading-relaxed font-light">
                                    {t.description}
                                </p>
                            </div>

                            {/* Feature Chips */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['Full Stack Development', 'AI Prototype', 'Pitching & Presentation'].map((chip, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] uppercase tracking-widest font-medium bg-white/5 text-slate-400 border border-transparent hover:border-white/10 hover:text-slate-300 transition-colors"
                                    >
                                        {chip}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </motion.div>

            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isImageOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsImageOpen(false)}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 cursor-pointer"
                    >
                        <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center">
                            <button
                                onClick={() => setIsImageOpen(false)}
                                className="absolute -top-16 right-0 text-slate-500 hover:text-white p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 transition-colors"
                            >
                                <X strokeWidth={1.5} className="w-6 h-6" />
                            </button>
                            <img
                                src={itImage}
                                alt="IT Empowering Day 2026 Award Full View"
                                className="max-w-full max-h-[85vh] object-contain rounded-xl border border-white/5 shadow-2xl"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
});

export default Activity;
