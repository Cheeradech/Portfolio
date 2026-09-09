import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import SectionHeader from './ui/SectionHeader';
import resumePdf from '../assets/resume/Resume_portMain.pdf';
import resumePreview from '../assets/resume/Resume_portMain-preview.png';

const About = React.memo(() => {
    const activeTab = 'education';
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const { lang } = useLanguage();
    const t = translations[lang].about;

    // Handle Open Resume: open modal while keeping background at About section
    const handleOpenResume = useCallback(() => {
        setIsResumeOpen(true);
    }, []);

    // Close modal on Escape key and lock body scroll
    useEffect(() => {
        if (!isResumeOpen) return;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        const previousBodyOverflow = document.body.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        const onKey = (e) => { if (e.key === 'Escape') setIsResumeOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => {
            document.documentElement.style.overflow = previousHtmlOverflow;
            document.body.style.overflow = previousBodyOverflow;
            window.removeEventListener('keydown', onKey);
        };
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
    const educationGpa = t.educationDescription.match(/(\d(?:\.\d+)?)/)?.[1] ?? '3.44';
    const educationCopy = lang === 'th'
        ? {
            heading: t.tabEducation,
            areasLabel: 'สายที่สนใจ',
            interests: ['การพัฒนา Full-Stack', 'วิศวกรรมซอฟต์แวร์', 'ปัญญาประดิษฐ์ (AI)'],
            note: 'เรียนรู้ผ่านการลงมือทำโปรเจกต์จริง',
            gpaLabel: 'เกรดเฉลี่ย',
        }
        : {
            heading: 'Education',
            areasLabel: 'Areas of Interest',
            interests: ['Full-Stack Development', 'Software Engineering', 'Artificial Intelligence'],
            note: 'Learning through hands-on projects.',
            gpaLabel: 'GPA',
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

                        {/* Resume button */}
                        <div className="pt-6 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleOpenResume}
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
                        <div className="flex items-center gap-3 mb-4 px-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] shadow-[0_0_14px_rgba(52,211,153,0.65)]" />
                            <span className="text-sm font-semibold text-slate-200">
                                {educationCopy.heading}
                            </span>
                        </div>

                        {/* Tab content card */}
                        <div className="bg-slate-800/65 border border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-2xl min-h-65">
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.28),rgba(2,6,23,0.42))] pointer-events-none" />

                            {/* Education tab */}
                            {activeTab === 'education' && (() => {
                                const content = tabContent.education;
                                return (
                                    <Motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.35 }}
                                        className="relative"
                                    >
                                        <div className="flex items-start gap-5">
                                            <div className="relative shrink-0">
                                                <div className="w-14 h-14 rounded-xl border border-white/10 bg-slate-900/70 shadow-sm flex items-center justify-center">
                                                    <GraduationCap className="w-9 h-9 text-[#34d399]" strokeWidth={1.8} />
                                                </div>
                                                <span className="absolute -right-1 bottom-1 w-4 h-4 rounded-full bg-[#34d399] border-4 border-slate-800 shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
                                            </div>

                                            <div className="min-w-0 pt-1">
                                                <h4 className="text-2xl md:text-3xl font-black text-white drop-shadow-[0_1px_5px_rgba(255,255,255,0.15)]">
                                                    {content.title}
                                                </h4>
                                                <p className="mt-2 text-sm md:text-base font-semibold text-slate-500">
                                                    <span className="text-[#34d399]">{content.subtitle}</span>
                                                </p>
                                                <span className="inline-flex mt-3 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 text-sm font-semibold">
                                                    {content.period}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-7 border-t border-white/10 pt-5 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6">
                                            <div>
                                                <p className="font-mono text-xs font-bold uppercase text-slate-500 mb-3">
                                                    {educationCopy.areasLabel}
                                                </p>
                                                <div className="space-y-1.5">
                                                    {educationCopy.interests.map((interest) => (
                                                        <p key={interest} className="text-slate-100 text-base font-bold">
                                                            {interest}
                                                        </p>
                                                    ))}
                                                </div>
                                                <p className="mt-3 text-sm text-slate-500">
                                                    {educationCopy.note}
                                                </p>
                                            </div>
                                            <div className="sm:min-w-[128px] sm:border-l border-white/10 sm:pl-6 flex flex-col justify-center">
                                                <p className="font-mono text-xs font-bold uppercase text-slate-500">
                                                    {educationCopy.gpaLabel}
                                                </p>
                                                <p className="mt-1 text-3xl font-black text-[#34d399]">
                                                    {educationGpa}
                                                </p>
                                                <p className="text-sm text-slate-400">
                                                    / 4.00
                                                </p>
                                            </div>
                                        </div>
                                    </Motion.div>
                                );
                            })()}
                        </div>
                    </Motion.div>

                </div>
            </div>
        </section>

        {/* ── Resume Modal: Portal to document.body to break free from section stacking context ── */}
        {typeof document !== 'undefined' && createPortal(
            <AnimatePresence>
                {isResumeOpen && (
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-5 md:p-6"
                        onClick={() => setIsResumeOpen(false)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

                        {/* Modal card - Exact proportioned container for seamless reading across all devices */}
                        <Motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-[min(92vw,calc((88vh-52px)*(827.25/1069.5)))] max-h-[88vh] bg-[#0d0d12] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_90px_-10px_rgba(13,127,242,0.4)] flex flex-col z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Top glow line */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/70 to-transparent pointer-events-none" />
                            <div className="absolute top-0 left-1/4 w-1/2 h-40 rounded-full blur-3xl bg-primary/8 pointer-events-none" />

                            {/* ── Header bar ── */}
                            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-white/[0.07] shrink-0 bg-[#0d0d12]">
                                {/* Left: traffic lights */}
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                                </div>

                                {/* Right: Actions */}
                                <div className="flex items-center gap-2">
                                    <a
                                        href={resumePdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all text-xs font-medium"
                                        title="Open PDF in new tab"
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>open_in_new</span>
                                        <span>เปิดเต็มจอ</span>
                                    </a>
                                    <button
                                        onClick={() => setIsResumeOpen(false)}
                                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-red-500/15 hover:border-red-500/40 transition-all duration-200 cursor-pointer"
                                        aria-label="Close"
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
                                    </button>
                                </div>
                            </div>

                            {/* ── Resume Viewer: Ultra-sharp responsive rendering for all screen sizes (iOS, Android, iPad, Mac, PC) ── */}
                            <div className="w-full overflow-hidden bg-white relative flex flex-col items-center justify-center">
                                <img
                                    src={resumePreview}
                                    alt="Resume - Cheeradech Makcharoen"
                                    className="w-full h-auto max-h-[calc(88vh-52px)] object-contain select-none"
                                    loading="eager"
                                    decoding="async"
                                />
                            </div>
                        </Motion.div>
                    </Motion.div>
                )}
            </AnimatePresence>,
            document.body
        )}
        </>
    );
});

export default About;
