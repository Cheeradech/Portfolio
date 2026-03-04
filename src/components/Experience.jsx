import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="py-32 relative z-0 bg-background-dark/50 scroll-mt-20" id="experience">
            <div className="max-w-[1000px] mx-auto px-6">
                <div className="mb-20 flex items-center justify-end gap-4">
                    <h2 className="text-2xl font-bold tracking-tight text-white text-right">EXECUTIVE TIMELINE</h2>
                    <div className="h-[1px] w-12 bg-primary"></div>
                </div>
                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="relative space-y-12 md:space-y-16">
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/20 -translate-x-1/2"></div>

                    {/* Timeline Item 1 */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            show: { opacity: 1, y: 0 }
                        }}
                        className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                        <div className="w-full md:w-[45%] md:text-right pl-14 md:pl-0 md:pr-8 order-2 md:order-1 mt-2 md:mt-0">
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Chief Technology Officer</h3>
                            <p className="text-primary text-sm font-medium mt-1">TechFlow Enterprise Solutions</p>
                            <p className="text-slate-400 text-sm mt-3 leading-relaxed">Spearheaded digital transformation for a Fortune 500 logistics firm. Reduced operational costs by 40% through AI-driven automation.</p>
                        </div>
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-background-dark border-2 border-primary rounded-full top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 shadow-[0_0_10px_rgba(13,127,242,0.8)]"></div>
                        <div className="w-full md:w-[45%] pl-14 md:pl-8 text-left order-1 md:order-3">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">2021 — Present</span>
                        </div>
                    </motion.div>

                    {/* Timeline Item 2 */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            show: { opacity: 1, y: 0 }
                        }}
                        className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                        <div className="w-full md:w-[45%] md:text-right pl-14 md:pl-0 md:pr-8 order-1 md:order-1">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">2018 — 2021</span>
                        </div>
                        <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-slate-700 rounded-full top-1.5 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 group-hover:bg-primary transition-colors"></div>
                        <div className="w-full md:w-[45%] pl-14 md:pl-8 text-left order-2 md:order-3 mt-2 md:mt-0">
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">VP of Engineering</h3>
                            <p className="text-primary text-sm font-medium mt-1">Nova Systems Inc.</p>
                            <p className="text-slate-400 text-sm mt-3 leading-relaxed">Scaled the engineering team from 15 to 120 developers. Implemented agile methodologies and CI/CD pipelines resulting in 3x faster deployment cycles.</p>
                        </div>
                    </motion.div>

                    {/* Timeline Item 3 */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            show: { opacity: 1, y: 0 }
                        }}
                        className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                        <div className="w-full md:w-[45%] md:text-right pl-14 md:pl-0 md:pr-8 order-2 md:order-1 mt-2 md:mt-0">
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Senior Lead Architect</h3>
                            <p className="text-primary text-sm font-medium mt-1">Global FinTech Corp</p>
                            <p className="text-slate-400 text-sm mt-3 leading-relaxed">Designed the core banking ledger system handling $5B+ daily transactions. Ensured 99.999% uptime and zero-trust security compliance.</p>
                        </div>
                        <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-slate-700 rounded-full top-1.5 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 group-hover:bg-primary transition-colors"></div>
                        <div className="w-full md:w-[45%] pl-14 md:pl-8 text-left order-1 md:order-3">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">2015 — 2018</span>
                        </div>
                    </motion.div>

                    {/* Timeline Item 4 */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            show: { opacity: 1, y: 0 }
                        }}
                        className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                        <div className="w-full md:w-[45%] md:text-right pl-14 md:pl-0 md:pr-8 order-1 md:order-1">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">2012 — 2015</span>
                        </div>
                        <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-slate-700 rounded-full top-1.5 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 group-hover:bg-primary transition-colors"></div>
                        <div className="w-full md:w-[45%] pl-14 md:pl-8 text-left order-2 md:order-3 mt-2 md:mt-0">
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Senior Backend Engineer</h3>
                            <p className="text-primary text-sm font-medium mt-1">DataStream Analytics</p>
                            <p className="text-slate-400 text-sm mt-3 leading-relaxed">Optimized database query performance by 200%. Developed microservices architecture for real-time data processing.</p>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </motion.section>
    );
};

export default Experience;
