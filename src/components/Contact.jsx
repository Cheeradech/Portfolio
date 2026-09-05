import React from 'react';
import { motion } from 'framer-motion';
import AnimatedMail from './AnimatedMail';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const CONTACT_EMAIL = 'Cheeradech.work@gmail.com';

const Contact = React.memo(() => {
    const { lang } = useLanguage();
    const t = translations[lang].contact;

    return (
        <section id="contact" className="py-16 md:py-20 relative z-10 scroll-mt-20" style={{ contain: 'layout style' }}>
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 items-start">

                    {/* Left: Contact Info & Socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col pt-4"
                    >
                        {/* Header */}
                        <div className="mb-12 relative">
                            {/* Import Playfair Display just for this component if not globally available */}
                            <style>
                                {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');`}
                            </style>
                            <h3
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[3rem] font-medium text-white tracking-tight leading-[1.2] mb-6 py-2 w-full max-w-[95%] lg:max-w-[500px]"
                                style={{ fontFamily: lang === 'en' ? "'Playfair Display', Georgia, serif" : "'Sarabun', sans-serif" }}
                            >
                                {t.heading}
                            </h3>
                            <div className="h-[2px] w-32 bg-slate-700/50 rounded-full"></div>
                        </div>

                        <AnimatedMail />

                        <div className="space-y-5">
                            {/* Box 1: Email */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#111114] border border-white/5 flex items-center justify-center text-slate-400">
                                    <span className="material-symbols-outlined text-lg">mail</span>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-0.5">Email</p>
                                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm sm:text-base md:text-lg font-medium text-white hover:text-blue-400 transition-colors selection:bg-blue-500/40 selection:text-white cursor-text break-all sm:break-normal">
                                        {CONTACT_EMAIL}
                                    </a>
                                </div>
                            </div>

                            {/* Box 2: Phone */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#111114] border border-white/5 flex items-center justify-center text-slate-400">
                                    <span className="material-symbols-outlined text-lg">call</span>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-0.5">Phone</p>
                                    <span className="text-base md:text-lg font-medium text-white">
                                        0830339150
                                    </span>
                                </div>
                            </div>

                            {/* Section: Social Media */}
                            <div className="pt-6 mt-6 border-t border-white/5">
                                <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-4">{t.connectWith}</h4>
                                <div className="flex gap-3">
                                    {/* GitHub */}
                                    <motion.a 
                                        href="https://github.com/Cheeradech"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        className="w-10 h-10 rounded-xl bg-[#111114] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:bg-[#1a1a20] transition-all duration-300 cursor-pointer"
                                    >
                                        <i className="fab fa-github text-lg"></i>
                                    </motion.a>
                                    {/* Instagram */}
                                    <motion.a 
                                        href="https://www.instagram.com/jrrdate_htx/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        className="w-10 h-10 rounded-xl bg-[#111114] border border-white/5 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:border-white/20 hover:bg-[#1a1a20] transition-all duration-300 cursor-pointer"
                                    >
                                        <i className="fab fa-instagram text-lg"></i>
                                    </motion.a>
                                    {/* LINE */}
                                    <motion.a 
                                        href="https://line.me/ti/p/5wHCpzMrCy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        className="w-10 h-10 rounded-xl bg-[#111114] border border-white/5 flex items-center justify-center text-slate-400 hover:text-green-500 hover:border-white/20 hover:bg-[#1a1a20] transition-all duration-300 cursor-pointer"
                                    >
                                        <i className="fab fa-line text-lg"></i>
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
});

export default Contact;
