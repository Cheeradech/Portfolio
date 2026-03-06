import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/animated-tabs";
import { AnimatedButton } from '@/components/ui/animated-button';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import CountryFlag from './ui/CountryFlag';

const Navbar = ({ activeTab, setActiveTab, scrollToSection }) => {
    const { lang, setLang } = useLanguage();
    const t = translations[lang].nav;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNavClick = (section) => {
        scrollToSection(section);
        setMobileOpen(false);
    };

    return (
        <>
            <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-black/30 border-b border-white/5">
                <div className="max-w-350 xl:max-w-400 mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between relative">

                    {/* Logo (Left) */}
                    <div className="flex items-center gap-2 z-20 cursor-pointer" onClick={() => handleNavClick('hero')}>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary">
                            <span className="material-symbols-outlined text-xs sm:text-sm font-black">code</span>
                        </div>
                        <span className="text-xs sm:text-sm tracking-[0.2em] font-black text-white uppercase">Portfolio</span>
                    </div>

                    {/* Right Area */}
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 z-20">

                        {/* Desktop Nav Tabs */}
                        <div className="hidden lg:block">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                                <TabsList className="bg-white/5 border border-white/10 p-1 gap-1 lg:gap-2 rounded-full relative">
                                    <TabsTrigger value="about" onClick={() => scrollToSection("about")} className="text-sm tracking-wide px-3 lg:px-5 py-2 rounded-full hover:text-white transition-colors">
                                        {t.about}
                                    </TabsTrigger>
                                    <TabsTrigger value="expertise" onClick={() => scrollToSection("expertise")} className="text-sm tracking-wide px-3 lg:px-5 py-2 rounded-full hover:text-white transition-colors">
                                        {t.expertise}
                                    </TabsTrigger>
                                    <TabsTrigger value="works" onClick={() => scrollToSection("works")} className="text-sm tracking-wide px-3 lg:px-5 py-2 rounded-full hover:text-white transition-colors">
                                        {t.works}
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        {/* Language Toggle — always visible */}
                        <div className="flex items-center bg-slate-900/70 border border-white/10 rounded-full p-0.5 sm:p-1 gap-0.5">
                            <button
                                onClick={() => setLang('en')}
                                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${lang === 'en'
                                    ? 'bg-slate-700 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                <CountryFlag country="en" className="w-5 h-3.5 sm:w-6 sm:h-4 object-cover rounded-sm" />
                                <span className="hidden xs:inline">EN</span>
                            </button>
                            <button
                                onClick={() => setLang('th')}
                                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${lang === 'th'
                                    ? 'bg-slate-700 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                <CountryFlag country="th" className="w-5 h-3.5 sm:w-6 sm:h-4 object-cover rounded-sm" />
                                <span className="hidden xs:inline">TH</span>
                            </button>
                        </div>

                        {/* Desktop Contact Button */}
                        <AnimatedButton
                            className='text-white hidden lg:flex font-black'
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
                            onClick={() => scrollToSection('contact')}
                        >
                            {t.contact}
                        </AnimatedButton>

                        {/* Hamburger Button (Mobile & Tablet) */}
                        <button
                            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            onClick={() => setMobileOpen(prev => !prev)}
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                key={mobileOpen ? 'close' : 'menu'}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className="material-symbols-outlined text-xl leading-none"
                            >
                                {mobileOpen ? 'close' : 'menu'}
                            </motion.span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-16 sm:top-20 left-0 w-full z-40 lg:hidden"
                    >
                        <div className="mx-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

                            {/* Nav Links */}
                            <div className="flex flex-col p-3 gap-1">
                                {[
                                    { key: 'about', label: t.about },
                                    { key: 'expertise', label: t.expertise },
                                    { key: 'works', label: t.works },
                                ].map((item) => (
                                    <button
                                        key={item.key}
                                        onClick={() => handleNavClick(item.key)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 
                                            ${activeTab === item.key
                                                ? 'bg-primary/15 text-primary border border-primary/20'
                                                : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="mx-3 h-px bg-white/5" />

                            {/* Contact Button */}
                            <div className="p-3">
                                <button
                                    onClick={() => handleNavClick('contact')}
                                    className="w-full py-3 px-4 rounded-xl font-black uppercase text-sm tracking-widest text-white bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-base text-primary">mail</span>
                                    {t.contact}
                                </button>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop overlay to close menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-30 md:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
