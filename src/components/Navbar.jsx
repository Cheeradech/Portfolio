import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/animated-tabs";
import { AnimatedButton } from '@/components/ui/animated-button';

const Navbar = ({ activeTab, setActiveTab, scrollToSection }) => {
    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-black/30 border-b border-white/5">
            {/* Tabs อยู่ absolute กึ่งกลางของ nav เต็มจอ */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                    <TabsList className="bg-transparent border-none p-0 gap-2 relative">
                        <TabsTrigger value="about" onClick={() => scrollToSection("about")} className="text-sm tracking-wide">
                            About
                        </TabsTrigger>
                        <TabsTrigger value="expertise" onClick={() => scrollToSection("expertise")} className="text-sm tracking-wide">
                            Expertise
                        </TabsTrigger>
                        <TabsTrigger value="experience" onClick={() => scrollToSection("experience")} className="text-sm tracking-wide">
                            Experience
                        </TabsTrigger>
                        <TabsTrigger value="works" onClick={() => scrollToSection("works")} className="text-sm tracking-wide">
                            Works
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

                {/* Contact Button / Mobile Menu (Right) */}
                <div className="flex items-center gap-4 z-20">
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
                        Contact Me
                    </AnimatedButton>
                    <button className="cursor-pointer md:hidden text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
