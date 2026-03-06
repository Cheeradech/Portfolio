import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import SectionHeader from './ui/SectionHeader';

const experienceItems = [
    { title: 'Chief Technology Officer', company: 'TechFlow Enterprise Solutions', period: '2021 â€“ Present' },
    { title: 'VP of Engineering', company: 'Nova Systems Inc.', period: '2018 â€“ 2021' },
    { title: 'Senior Lead Architect', company: 'Global FinTech Corp', period: '2015 â€“ 2018' },
    { title: 'Senior Backend Engineer', company: 'DataStream Analytics', period: '2012 â€“ 2015' },
];

const Experience = () => {
    const { lang } = useLanguage();
    const descriptions = translations[lang].experience.descriptions;

    return (
        <Motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="py-32 relative z-0 bg-background-dark/50 scroll-mt-20" id="experience">
            <div className="max-w-[1000px] mx-auto px-6">
                <SectionHeader
                    title={translations[lang].experience.title}
                />
                <Motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="relative space-y-12 md:space-y-16">
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/20 -translate-x-1/2"></div>

                    {/* Item 1 */}
                    <Motion.div
                        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                        className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                        <div className="w-full md:w-[45%] md:text-right pl-14 md:pl-0 md:pr-8 order-2 md:order-1 mt-2 md:mt-0">
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{experienceItems[0].title}</h3>
                            <p className="text-primary text-sm font-medium mt-1">{experienceItems[0].company}</p>
                            <p className="text-slate-400 text-sm mt-3 leading-relaxed">{descriptions[0]}</p>
                        </div>
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-background-dark border-2 border-primary rounded-full top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 shadow-[0_0_10px_rgba(13,127,242,0.8)]"></div>
                        <div className="w-full md:w-[45%] pl-14 md:pl-8 text-left order-1 md:order-3">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">{experienceItems[0].period}</span>
                        </div>
                    </Motion.div>

                    {/* Item 2 */}
                    <Motion.div
                        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                        className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                        <div className="w-full md:w-[45%] md:text-right pl-14 md:pl-0 md:pr-8 order-1 md:order-1">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">{experienceItems[1].period}</span>
                        </div>
                        <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-slate-700 rounded-full top-1.5 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 group-hover:bg-primary transition-colors"></div>
                        <div className="w-full md:w-[45%] pl-14 md:pl-8 text-left order-2 md:order-3 mt-2 md:mt-0">
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{experienceItems[1].title}</h3>
                            <p className="text-primary text-sm font-medium mt-1">{experienceItems[1].company}</p>
                            <p className="text-slate-400 text-sm mt-3 leading-relaxed">{descriptions[1]}</p>
                        </div>
                    </Motion.div>

                    {/* Item 3 */}
                    <Motion.div
                        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                        className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                        <div className="w-full md:w-[45%] md:text-right pl-14 md:pl-0 md:pr-8 order-2 md:order-1 mt-2 md:mt-0">
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{experienceItems[2].title}</h3>
                            <p className="text-primary text-sm font-medium mt-1">{experienceItems[2].company}</p>
                            <p className="text-slate-400 text-sm mt-3 leading-relaxed">{descriptions[2]}</p>
                        </div>
                        <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-slate-700 rounded-full top-1.5 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 group-hover:bg-primary transition-colors"></div>
                        <div className="w-full md:w-[45%] pl-14 md:pl-8 text-left order-1 md:order-3">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">{experienceItems[2].period}</span>
                        </div>
                    </Motion.div>

                    {/* Item 4 */}
                    <Motion.div
                        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                        className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                        <div className="w-full md:w-[45%] md:text-right pl-14 md:pl-0 md:pr-8 order-1 md:order-1">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">{experienceItems[3].period}</span>
                        </div>
                        <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-slate-700 rounded-full top-1.5 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 group-hover:bg-primary transition-colors"></div>
                        <div className="w-full md:w-[45%] pl-14 md:pl-8 text-left order-2 md:order-3 mt-2 md:mt-0">
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{experienceItems[3].title}</h3>
                            <p className="text-primary text-sm font-medium mt-1">{experienceItems[3].company}</p>
                            <p className="text-slate-400 text-sm mt-3 leading-relaxed">{descriptions[3]}</p>
                        </div>
                    </Motion.div>

                </Motion.div>
            </div>
        </Motion.section>
    );
};

export default Experience;
