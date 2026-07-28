import React, { useState, useCallback, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import SectionHeader from './ui/SectionHeader';

const About = React.memo(() => {
    const [activeTab, setActiveTab] = useState('education');
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const { lang } = useLanguage();
    const t = translations[lang].about;
    const handleTab = useCallback((id) => setActiveTab(id), []);
    const tabs = [
        { id: 'education', label: t.tabEducation },
    ];

    // Close modal on Escape key
    useEffect(() => {
        if (!isResumeOpen) return;
        const onKey = (e) => { if (e.key === 'Escape') setIsResumeOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isResumeOpen]);

    const tabContent = {
        education: {
            icon: 'school',
            title: t.eduTitle,
            subtitle: t.eduInstitution,
            period: t.eduPeriod,
            description: t.educationDescription,
        },
        experience: {
            icon: 'work',
            title: t.expTitle,
            subtitle: t.expCompany,
            period: t.expPeriod,
            description: t.experienceDescription,
        },
    };

    return (
        <>
        <section className="relative pt-20 sm:pt-32 pb-16 sm:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden" style={{ contain: 'layout style' }}>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Section header */}
                <SectionHeader
                    title={t.title}
                    subtitle={t.subtitle}
                />

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* ── Left panel ── */}
                    <Motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7 space-y-8 bg-slate-800/65 border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl"
                    >
                        {/* Bio */}
                        <div className="space-y-4">
                            <p className="text-slate-200 text-base md:text-lg leading-relaxed">
                                {t.bio1Part1}{' '}<span className="text-primary font-semibold">{t.bio1Highlight}</span>{' '}{t.bio1Part2}
                            </p>
                            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                                {t.bio2}
                            </p>
                            <p className="text-slate-300 text-sm md:text-base leading-relaxed italic border-l-2 border-primary/60 pl-4">
                                {t.quote}
                            </p>
                        </div>

                        {/* Resume button — opens modal */}
                        <div className="pt-6 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => setIsResumeOpen(true)}
                                className="flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3.5 rounded-xl font-semibold border border-slate-700 hover:border-primary/60 hover:bg-slate-700/70 hover:shadow-[0_0_20px_rgba(13,127,242,0.15)] transition-all duration-300 shadow-sm cursor-pointer"
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>visibility</span>
                                {t.viewResume}
                            </button>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 pl-1 -mt-2">
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>description</span>
                            <span>{t.resumeNote}</span>
                        </div>
                    </Motion.div>

                    {/* ── Right panel ── */}
                    <Motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-5 relative"
                    >
                        {/* Tab switcher */}
                        <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl flex mb-6 shadow-md">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTab(tab.id)}
                                    className={`flex-1 text-center py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                        ? 'bg-slate-700 text-white font-semibold shadow-sm'
                                        : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab content card */}
                        <div className="bg-slate-800/65 border border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-2xl min-h-65">
                            {/* Timeline glow line */}
                            <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-linear-to-b from-primary via-primary/40 to-transparent" />
                            <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-primary blur-sm opacity-40" />

                            {/* Education / Experience tab */}
                            {(activeTab === 'education' || activeTab === 'experience') && (() => {
                                const content = tabContent[activeTab];
                                return (
                                    <Motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.35 }}
                                        className="relative pl-10"
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute -left-1.25 top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-primary z-10 shadow-[0_0_12px_rgba(14,165,233,0.5)]">
                                            <div className="absolute inset-1 bg-primary rounded-full" />
                                        </div>

                                        <div className="mb-2 flex justify-between items-start flex-wrap gap-2">
                                            <div>
                                                <h4 className="text-xl font-bold text-white">{content.title}</h4>
                                                <p className="text-slate-400 text-sm mt-1">{content.subtitle}</p>
                                            </div>
                                            <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                                {content.period}
                                            </span>
                                        </div>

                                        <div className="mt-4 bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
                                            <div className="bg-slate-700 p-2 rounded-lg shadow-sm shrink-0">
                                                <span
                                                    className="material-symbols-outlined text-slate-300"
                                                    style={{ fontSize: '20px' }}
                                                >
                                                    {content.icon}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-300 leading-relaxed">
                                                {content.description}
                                            </p>
                                        </div>
                                    </Motion.div>
                                );
                            })()}
                        </div>
                    </Motion.div>

                </div>
            </div>
        </section>

        {/* ── Resume Modal ── */}
        <AnimatePresence>
            {isResumeOpen && (
                <Motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10"
                    onClick={() => setIsResumeOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

                    {/* Modal card */}
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 24 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-4xl h-[88vh] bg-[#09090e] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_100px_-20px_rgba(13,127,242,0.4)] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top glow line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/70 to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-1/4 w-1/2 h-40 rounded-full blur-3xl bg-primary/8 pointer-events-none" />

                        {/* ── Header bar ── */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.07] shrink-0 bg-[#0d0d12]">
                            {/* Left: traffic lights + filename */}
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                                </div>
                                <div className="w-px h-4 bg-white/10" />
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-slate-500" style={{ fontSize: '15px' }}>description</span>
                                    <span className="text-[11px] font-mono text-slate-400 tracking-widest">Cheeradech_Resume.pdf</span>
                                </div>
                            </div>

                            {/* Right: close only */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsResumeOpen(false)}
                                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-red-500/15 hover:border-red-500/40 transition-all duration-200 cursor-pointer"
                                    aria-label="Close"
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
                                </button>
                            </div>
                        </div>

                        {/* ── PDF Viewer ── */}
                        <div className="flex-1 overflow-hidden bg-[#060608]">
                            <iframe
                                src="/resumes.pdf#view=FitH&toolbar=0"
                                className="w-full h-full border-0"
                                title="Resume — Cheeradech Makcharoen"
                            />
                        </div>

                        {/* ── Footer bar ── */}
                        <div className="px-5 py-2 border-t border-white/[0.05] flex items-center justify-between shrink-0 bg-[#0d0d12]">
                            <span className="text-[10px] font-mono text-slate-600 tracking-[0.15em] uppercase">Press ESC to close</span>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse" />
                                <span className="text-[10px] font-mono text-slate-600 tracking-[0.15em] uppercase">PDF Viewer</span>
                            </div>
                        </div>
                    </Motion.div>
                </Motion.div>
            )}
        </AnimatePresence>
        </>
    );
});

export default About;
