import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, badge }) => {
    return (
        <div className="mb-20 flex flex-col items-center justify-center gap-6 text-center">

            <div className="relative group">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-black tracking-normal flex flex-col items-center gap-2 overflow-visible"
                >
                    <span
                        className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white py-10 px-4 -my-10 -mx-4 inline-block leading-relaxed overflow-visible"
                        style={{ WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}
                    >
                        {title}
                    </span>
                </motion.h2>

                {/* Decorative elements under title */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '80px' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
                    className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 rounded-full"
                />

                {/* Glow effect */}
                <div className="absolute -inset-x-20 -inset-y-10 bg-primary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />
            </div>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-slate-400 max-w-2xl text-base md:text-lg leading-relaxed font-light"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};

export default SectionHeader;
