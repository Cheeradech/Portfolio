import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import SectionHeader from './ui/SectionHeader';
import programmingFundamentalsPdf from '../assets/Cerfiticate/certificate-of-completion-for-programming-100-fundamentals.pdf';
import certificationPdf from '../assets/Cerfiticate/Certification.pdf';
import programmingFundamentalsPreview from '../assets/Cerfiticate/programming-100-fundamentals-preview.png';
import cybersecurityFoundationPreview from '../assets/Cerfiticate/cybersecurity-foundation-preview.png';

const certificates = [
    {
        key: 'programmingFundamentals',
        file: programmingFundamentalsPdf,
        preview: programmingFundamentalsPreview,
        previewAspect: 'aspect-[1.35]',
        accent: 'from-blue-500/25 via-cyan-400/10 to-transparent',
    },
    {
        key: 'certification',
        file: certificationPdf,
        preview: cybersecurityFoundationPreview,
        previewAspect: 'aspect-[1.414]',
        accent: 'from-violet-500/25 via-blue-400/10 to-transparent',
    },
];

const MotionArticle = motion.article;

const Certificates = React.memo(() => {
    const { lang } = useLanguage();
    const t = translations[lang].certificates;

    return (
        <section id="certificate" className="py-24 px-4 sm:px-6 lg:px-12 relative z-10 scroll-mt-24">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    title={t.title}
                    subtitle={t.subtitle}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {certificates.map((item, index) => {
                        const cert = t.items[item.key];

                        return (
                            <MotionArticle
                                key={item.key}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a]/65 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] group hover:border-white/10 hover:bg-[#111111]/80 transition-all duration-500"
                            >
                                <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${item.accent} pointer-events-none`} />

                                <div className="relative z-10 p-4 sm:p-5">
                                    <div className={`relative ${item.previewAspect} overflow-hidden rounded-xl border border-white/10 bg-white p-1 shadow-[0_18px_45px_rgba(0,0,0,0.35)] sm:p-1.5`}>
                                        <img
                                            src={item.preview}
                                            alt={cert.title}
                                            loading="lazy"
                                            decoding="async"
                                            draggable="false"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>

                                    <div className="pt-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-primary">
                                                <Award strokeWidth={1.5} className="w-4 h-4" />
                                            </span>
                                            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-widest text-slate-400">
                                                {t.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-medium text-white/90 tracking-tight leading-tight group-hover:text-white transition-colors">
                                            {cert.title}
                                        </h3>
                                        <p className="mt-3 text-sm text-slate-400/90 leading-relaxed font-light">
                                            {cert.description}
                                        </p>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <a
                                                href={item.file}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 rounded-md bg-primary/15 border border-primary/25 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary/25 transition-colors"
                                            >
                                                <ExternalLink strokeWidth={1.7} className="w-4 h-4" />
                                                {t.view}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute right-5 bottom-5 text-white/[0.03] pointer-events-none">
                                    <FileText strokeWidth={1.2} className="w-20 h-20" />
                                </div>
                            </MotionArticle>
                        );
                    })}
                </div>
            </div>
        </section>
    );
});

export default Certificates;
