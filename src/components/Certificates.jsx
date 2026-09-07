import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import SectionHeader from './ui/SectionHeader';
import programmingFundamentalsPdf from '../assets/Cerfiticate/certificate-of-completion-for-programming-100-fundamentals.pdf';
import certificationPdf from '../assets/Cerfiticate/Certification.pdf';
import awsCertificatePdf from '../assets/Cerfiticate/AwsCerGe.pdf';
import awsCertificatePreview from '../assets/Cerfiticate/aws-cloud-quest-preview.png';
import awsTrainingImage from '../assets/Cerfiticate/awsT.png';
import programmingFundamentalsPreview from '../assets/Cerfiticate/programming-100-fundamentals-preview.png';
import cybersecurityFoundationPreview from '../assets/Cerfiticate/cybersecurity-foundation-preview.png';

const awsCredentialUrl = 'https://www.credly.com/badges/011bc091-5a23-4169-8bcb-36c422231b17/public_url';

const awsCertificate = {
    key: 'awsCertificate',
    file: awsCertificatePdf,
    preview: awsCertificatePreview,
    previewAspect: 'aspect-[1.35]',
    accent: 'from-orange-500/25 via-amber-400/10 to-transparent',
};

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
    const awsBadge = t.awsBadge;

    const renderCertificateCard = (item, index) => {
        const cert = t.items[item.key];

        return (
            <MotionArticle
                key={item.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-[0_8px_30px_rgb(0,0,0,0.12)] group hover:border-white/15 hover:bg-[#171717] transition-colors duration-300"
            >
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
                                className="inline-flex items-center gap-2 rounded-md border border-white bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-950 hover:bg-slate-200 hover:border-slate-200 transition-colors"
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
    };

    return (
        <section id="certificate" className="py-24 px-4 sm:px-6 lg:px-12 relative z-10 scroll-mt-24">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    title={t.title}
                    subtitle={t.subtitle}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {renderCertificateCard(awsCertificate, 0)}

                    <MotionArticle
                        key="awsBadge"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#f8fbff] p-5 text-slate-900 shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(68,71,255,0.22)]"
                    >
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <span className="inline-flex items-center gap-2 rounded-xl bg-violet-500/10 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-violet-600">
                                <Award strokeWidth={1.7} className="w-4 h-4" />
                                {awsBadge.badge}
                            </span>
                            <span className="text-xs font-medium text-slate-500">
                                {awsBadge.date}
                            </span>
                        </div>

                        <div className="flex justify-center py-2 sm:py-4">
                            <img
                                src={awsTrainingImage}
                                alt={awsBadge.title}
                                loading="lazy"
                                decoding="async"
                                draggable="false"
                                className="h-56 w-56 object-contain sm:h-64 sm:w-64"
                            />
                        </div>

                        <div className="pt-3">
                            <h3 className="text-xl sm:text-2xl font-extrabold leading-tight tracking-tight text-slate-950">
                                {awsBadge.title}
                            </h3>
                            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                                {awsBadge.provider}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                {awsBadge.description}
                            </p>

                            <div className="mt-7">
                                <a
                                    href={awsCredentialUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(124,58,237,0.32)] transition-colors hover:bg-violet-700"
                                >
                                    <ExternalLink strokeWidth={1.8} className="w-4 h-4" />
                                    {awsBadge.view}
                                </a>
                            </div>
                        </div>
                    </MotionArticle>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {certificates.map((item, index) => renderCertificateCard(item, index + 2))}
                </div>
            </div>
        </section>
    );
});

export default Certificates;
