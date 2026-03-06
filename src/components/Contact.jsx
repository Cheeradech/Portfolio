import React from 'react';
import { motion } from 'framer-motion';
import AnimatedMail from './AnimatedMail';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Contact = () => {
    const { lang } = useLanguage();
    const t = translations[lang].contact;
    return (
        <section id="contact" className="py-16 md:py-20 relative z-10 scroll-mt-20">
            <div className="max-w-[1200px] mx-auto px-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

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
                                className="text-4xl md:text-5xl lg:text-[4.5rem] font-semibold text-[#f8f9fa] tracking-tight leading-[1.15] mb-6"
                                style={{ fontFamily: lang === 'en' ? "'Playfair Display', Georgia, serif" : "'Sarabun', sans-serif" }}
                            >
                                {t.heading}
                            </h3>
                            <div className="h-[2px] w-32 bg-slate-700/50 rounded-full"></div>
                        </div>

                        <AnimatedMail />

                        <div className="space-y-5">
                            {/* Box 1: Email */}
                            <motion.div
                                className="flex items-center gap-4 group cursor-pointer"
                                onClick={() => window.location.href = 'mailto:tatsana.33@gmail.com'}
                                whileHover={{ scale: 1.02, x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#111114] border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                                    <span className="material-symbols-outlined text-lg">mail</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-0.5">Email</p>
                                    <span className="text-base md:text-lg font-medium text-white group-hover:text-blue-400 transition-colors">tatsana.33@gmail.com</span>
                                </div>
                            </motion.div>

                            {/* Box 2: Phone */}
                            <motion.div
                                className="flex items-center gap-4 group cursor-pointer"
                                whileHover={{ scale: 1.02, x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#111114] border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                                    <span className="material-symbols-outlined text-lg">call</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-0.5">Phone</p>
                                    <span className="text-base md:text-lg font-medium text-white group-hover:text-blue-400 transition-colors">+66 99 039 7967</span>
                                </div>
                            </motion.div>

                            {/* Section: Social Media */}
                            <div className="pt-6 mt-6 border-t border-white/5">
                                <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-4">{t.connectWith}</h4>
                                <div className="flex gap-3">
                                    {/* GitHub */}
                                    <motion.a href="#"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        className="w-10 h-10 rounded-xl bg-[#111114] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:bg-[#1a1a20] transition-all duration-300"
                                    >
                                        <i className="fab fa-github text-lg"></i>
                                    </motion.a>
                                    {/* Facebook */}
                                    <motion.a href="#"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        className="w-10 h-10 rounded-xl bg-[#111114] border border-white/5 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-white/20 hover:bg-[#1a1a20] transition-all duration-300"
                                    >
                                        <i className="fab fa-facebook text-lg"></i>
                                    </motion.a>
                                    {/* Instagram */}
                                    <motion.a href="#"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        className="w-10 h-10 rounded-xl bg-[#111114] border border-white/5 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:border-white/20 hover:bg-[#1a1a20] transition-all duration-300"
                                    >
                                        <i className="fab fa-instagram text-lg"></i>
                                    </motion.a>
                                    {/* TikTok */}
                                    <motion.a href="#"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        className="w-10 h-10 rounded-xl bg-[#111114] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:bg-[#1a1a20] transition-all duration-300"
                                    >
                                        <i className="fab fa-tiktok text-lg"></i>
                                    </motion.a>
                                    {/* LINE */}
                                    <motion.a href="#"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        className="w-10 h-10 rounded-xl bg-[#111114] border border-white/5 flex items-center justify-center text-slate-400 hover:text-green-500 hover:border-white/20 hover:bg-[#1a1a20] transition-all duration-300"
                                    >
                                        <i className="fab fa-line text-lg"></i>
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-full flex items-center"
                    >
                        <form className="w-full bg-[#0a0a0c] border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative">
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] ml-1">Name</label>
                                        <input type="text" className="w-full bg-[#050505] border border-white/5 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:bg-[#111114] transition-all duration-300 placeholder:text-slate-700" placeholder={t.formPlaceholderName} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] ml-1">Email</label>
                                        <input type="email" className="w-full bg-[#050505] border border-white/5 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:bg-[#111114] transition-all duration-300 placeholder:text-slate-700" placeholder="john@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] ml-1">Subject</label>
                                    <input type="text" className="w-full bg-[#050505] border border-white/5 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:bg-[#111114] transition-all duration-300 placeholder:text-slate-700" placeholder={t.formPlaceholderSubject} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] ml-1">Message</label>
                                    <textarea rows="4" className="w-full bg-[#050505] border border-white/5 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:bg-[#111114] transition-all duration-300 resize-none placeholder:text-slate-700" placeholder={t.formPlaceholderMessage}></textarea>
                                </div>
                                <div className="pt-2">
                                    <button type="button" className="w-full py-4 bg-[#111114] hover:bg-[#1a1a20] border border-white/5 hover:border-white/10 text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group/btn hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                                        <span className="text-[11px] font-mono tracking-[0.2em] uppercase font-bold text-slate-300 group-hover/btn:text-white transition-colors">{t.sendButton}</span>
                                        <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300 text-slate-400 group-hover/btn:text-white">send</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
