import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/animated-tabs";
import { AnimatedButton } from '@/components/ui/animated-button';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Navbar = ({ activeTab, setActiveTab, scrollToSection }) => {
    const { lang, setLang } = useLanguage();
    const t = translations[lang].nav;

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-black/30 border-b border-white/5">
            {/* Tabs centered absolutely */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                    <TabsList className="bg-transparent border-none p-0 gap-2 relative">
                        <TabsTrigger value="about" onClick={() => scrollToSection("about")} className="text-sm tracking-wide">
                            {t.about}
                        </TabsTrigger>
                        <TabsTrigger value="expertise" onClick={() => scrollToSection("expertise")} className="text-sm tracking-wide">
                            {t.expertise}
                        </TabsTrigger>
                        <TabsTrigger value="experience" onClick={() => scrollToSection("experience")} className="text-sm tracking-wide">
                            {t.experience}
                        </TabsTrigger>
                        <TabsTrigger value="works" onClick={() => scrollToSection("works")} className="text-sm tracking-wide">
                            {t.works}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
                {/* Logo (Left) */}
                <div className="flex items-center gap-2 z-20">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary">
                        <span className="material-symbols-outlined text-sm font-bold">code</span>
                    </div>
                    <span className="text-sm tracking-[0.2em] font-bold text-white uppercase">CM.dev</span>
                </div>

                {/* Right: Language switcher + Contact button */}
                <div className="flex items-center gap-3 z-20">
                    {/* Language Toggle Pill */}
                    <div className="flex items-center bg-slate-900/70 border border-white/10 rounded-full p-1 gap-0.5">
                        <button
                            onClick={() => setLang('en')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                                lang === 'en'
                                    ? 'bg-slate-700 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <span className="text-sm leading-none">🇬🇧</span>
                            <span>EN</span>
                        </button>
                        <button
                            onClick={() => setLang('th')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                                lang === 'th'
                                    ? 'bg-slate-700 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <span className="text-sm leading-none">🇹🇭</span>
                            <span>TH</span>
                        </button>
                    </div>

                    <AnimatedButton
                        className='text-white hidden md:flex'
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
                    <button className="cursor-pointer md:hidden text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
