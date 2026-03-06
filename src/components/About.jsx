import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const About = () => {
    const [activeTab, setActiveTab] = useState('education');
    const { lang } = useLanguage();
    const t = translations[lang].about;

    const tabs = [
        { id: 'experience', label: t.tabExperience },
        { id: 'education', label: t.tabEducation },
    ];

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
        <section className="relative pt-56 pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-120 h-120 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Section header */}
                <Motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16"
                >
                    <div className="mb-4 flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-primary"></div>
                        <h2 className="text-3xl font-bold tracking-tight text-white text-center uppercase">{t.title}</h2>
                        <div className="h-[1px] w-12 bg-primary"></div>
                    </div>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed text-center">
                        {t.subtitle}
                    </p>
                </Motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* ── Left panel ── */}
                    <Motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7 space-y-8 bg-slate-800/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl transition-transform duration-500 hover:-translate-y-1"
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

                        {/* Resume buttons */}
                        <div className="pt-6 flex flex-col sm:flex-row gap-4">
                            <button className="flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3.5 rounded-xl font-semibold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0">
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
                                {t.downloadResume}
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3.5 rounded-xl font-semibold border border-slate-700 hover:border-slate-500 hover:bg-slate-700/70 transition-all shadow-sm hover:shadow-md">
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
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 text-center py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? 'bg-slate-700 text-white font-semibold shadow-sm'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab content card */}
                        <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-2xl min-h-65">
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
    );
};

export default About;
