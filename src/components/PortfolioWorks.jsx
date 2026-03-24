import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import SectionHeader from './ui/SectionHeader';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

import dorm1 from '../assets/Photo dorm/1.png';
import dorm2 from '../assets/Photo dorm/2.png';
import dorm3 from '../assets/Photo dorm/3.png';
import dorm4 from '../assets/Photo dorm/4.png';
import dorm5 from '../assets/Photo dorm/5.png';
import dorm6 from '../assets/Photo dorm/6.png';
import dorm7 from '../assets/Photo dorm/7.png';

import stock1 from '../assets/Photo stock/one.png';
import stock2 from '../assets/Photo stock/two.png';
import stock3 from '../assets/Photo stock/three.png';
import stock4 from '../assets/Photo stock/four.png';
import stock5 from '../assets/Photo stock/five.png';
import stock6 from '../assets/Photo stock/six.png';

const dormImages = [dorm1, dorm2, dorm3, dorm4, dorm5, dorm6, dorm7];
const stockImages = [stock1, stock2, stock3, stock4, stock5, stock6];

const workItems = [
    { 
        title: 'Dormitory Management', 
        category: 'Web Application / UI', 
        img: dormImages[0], 
        images: dormImages,
        tools: ['React', 'Tailwind', 'Node.js', 'PostgreSQL'],
        alt: "Dormitory Management System",
        descTh: "แพลตฟอร์มจัดการหอพักและอพาร์ตเมนต์ที่ออกแบบมาเพื่อความเรียบง่ายและทันสมัย เน้นประสบการณ์ผู้ใช้งานที่ราบรื่น",
        descEn: "A dormitory and apartment management platform designed for simplicity and modernity, focusing on seamless user experience."
    },
    { 
        title: 'Stock Inventory', 
        category: 'Web Application / System', 
        img: stockImages[1], 
        images: stockImages,
        tools: ['Vue.js', 'Tailwind', 'Firebase'],
        alt: "Stock Management System",
        descTh: "ระบบจัดการคลังสินค้าที่มาพร้อมกับแดชบอร์ดที่สะอาดตา ช่วยให้การติดตามสถานะง่ายและทำงานได้อย่างรวดเร็ว",
        descEn: "An inventory management system featuring a clean dashboard, enabling easy tracking and efficient workflows."
    }
];

const PortfolioWorks = React.memo(() => {
    const { lang } = useLanguage();
    const t = translations[lang].works;
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Track max progress so line never shrinks back
    const maxProgress = useMotionValue(0);
    const smoothMax = useSpring(maxProgress, { stiffness: 80, damping: 20 });
    const lineHeight = useTransform(smoothMax, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        return scrollYProgress.on("change", (v) => {
            if (v > maxProgress.get()) {
                maxProgress.set(v);
            }
        });
    }, [scrollYProgress, maxProgress]);

    const closeModal = () => setSelectedProject(null);

    const nextImage = (e) => {
        if (e) e.stopPropagation();
        if (selectedProject && currentImageIndex < selectedProject.images.length - 1) {
            setCurrentImageIndex((prev) => prev + 1);
        }
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        if (selectedProject && currentImageIndex > 0) {
            setCurrentImageIndex((prev) => prev - 1);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        if (selectedProject) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedProject, currentImageIndex]);

    const openModal = (project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
    };

    return (
        <React.Fragment>
            <motion.section
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="pt-24 pb-48 relative z-10 bg-background-dark scroll-mt-24 min-h-[90vh] flex flex-col justify-center" id="works"
                style={{ contain: 'layout style' }}
            >
                <div className="max-w-[1200px] mx-auto px-6 w-full">
                    <SectionHeader
                        title={t.title}
                        subtitle={t.subtitle}
                    />

                    <div ref={containerRef} className="relative mt-20 pt-10 pb-10">
                        {/* Center Line Trunk (Base Faded) */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2"></div>
                        <div className="block md:hidden absolute left-4 top-0 bottom-0 w-[2px] bg-white/10"></div>
                        
                        {/* Center Line Trunk (Glowing Progress) */}
                        <motion.div 
                            style={{ height: lineHeight }} 
                            className="hidden md:block absolute left-1/2 top-0 w-[2px] bg-blue-600 -translate-x-1/2 shadow-[0_0_20px_1px_rgba(37,99,235,0.9)] z-0 origin-top"
                        />
                        <motion.div 
                            style={{ height: lineHeight }} 
                            className="block md:hidden absolute left-4 top-0 w-[2px] bg-blue-600 shadow-[0_0_20px_1px_rgba(37,99,235,0.9)] z-0 origin-top"
                        />

                        {workItems.map((item, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <motion.div
                                    key={i}
                                    variants={{ 
                                        hidden: { opacity: 0, y: 50, x: isEven ? -20 : 20 }, 
                                        show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } 
                                    }}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={`relative grid grid-cols-1 md:grid-cols-2 group cursor-pointer ${i > 0 ? 'mt-16 md:-mt-28 lg:-mt-48 z-10' : 'z-0'}`}
                                    onClick={() => openModal(item)}
                                >
                                    {/* Base Center Node Dot for Desktop */}
                                    <div className="hidden md:block absolute left-1/2 w-4 h-4 rounded-full bg-slate-900 border border-white/20 top-[30%] -translate-x-1/2 -translate-y-1/2 z-10 shadow-[inset_0_4px_4px_rgba(0,0,0,0.5)]"></div>
                                    
                                    {/* Glowing Center Node Dot for Desktop (Activates on scroll) */}
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        viewport={{ once: true, margin: "-35% 0px -45% 0px" }}
                                        className="hidden md:flex items-center justify-center absolute left-1/2 w-5 h-5 rounded-full bg-blue-500 top-[30%] -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_20px_4px_rgba(37,99,235,1),inset_0_0_6px_rgba(255,255,255,0.4)] group-hover:scale-125 transition-transform duration-500"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"></div>
                                    </motion.div>
                                    
                                    {/* Base Mobile Node Dot */}
                                    <div className="block md:hidden absolute left-4 w-3.5 h-3.5 rounded-full bg-slate-900 border border-white/20 -translate-x-[50%] top-[30%] z-10 shadow-[inset_0_4px_4px_rgba(0,0,0,0.5)]"></div>
                                    
                                    {/* Glowing Mobile Node Dot */}
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        viewport={{ once: true, margin: "-35% 0px -45% 0px" }}
                                        className="flex md:hidden absolute left-4 items-center justify-center w-4 h-4 rounded-full bg-blue-500 -translate-x-[50%] top-[30%] z-20 shadow-[0_0_15px_3px_rgba(37,99,235,1),inset_0_0_6px_rgba(255,255,255,0.4)] group-hover:scale-125 transition-transform duration-300"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,1)]"></div>
                                    </motion.div>

                                    {/* Branch Line for Desktop */}
                                    <div className={`hidden md:block absolute top-[30%] -translate-y-1/2 h-[2px] bg-white/10 group-hover:bg-blue-500/80 transition-colors duration-500 ${isEven ? 'right-1/2 w-8' : 'left-1/2 w-8'}`}></div>

                                    {/* Content Wrapping */}
                                    <div className={`w-full pl-10 md:pl-0 ${isEven ? 'md:pr-14 md:text-right md:col-start-1 md:col-end-2' : 'md:pl-14 md:col-start-2 md:col-end-3'}`}>
                                        <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-8 bg-slate-800/20 relative shadow-lg border border-white/5 group-hover:border-primary/30 transition-all duration-500">
                                            <img
                                                alt={item.alt}
                                                className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
                                                src={item.img}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none flex items-center justify-center">
                                                <div className="bg-black/40 backdrop-blur-md p-4 rounded-full text-white/90 transform scale-50 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                                                    <Maximize2 size={24} />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white/80 font-mono flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <span>1</span> <span className="opacity-50">/</span> <span>{item.images.length}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col px-2">
                                            <p className={`text-xs text-primary font-mono tracking-widest uppercase mb-3 opacity-80 flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                                {item.category}
                                            </p>
                                            <h3 className="text-2xl lg:text-3xl font-light text-white mb-4 tracking-wide group-hover:text-primary transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <p className={`text-sm font-light text-slate-400 leading-relaxed max-w-sm ${isEven ? 'md:ml-auto' : ''}`}>
                                                {lang === 'th' ? item.descTh : item.descEn}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.section >

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9999] flex flex-col items-center bg-black/95 backdrop-blur-md px-6 md:px-16" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, paddingTop: '80px', paddingBottom: '32px' }}
                        onClick={closeModal}

                    >
                        <button 
                            className="absolute right-6 md:right-10 text-white/80 hover:text-white transition-all z-[10000] bg-white/10 hover:bg-white/20 border border-white/20 p-3 rounded-full shadow-xl"
                            style={{ top: '92px' }}
                            onClick={closeModal}
                            title="Close (Esc)"
                        >
                            <X size={28} />
                        </button>

                        <button 
                            className={`absolute left-4 md:left-8 p-3 md:p-4 rounded-full transition-all z-[10000] border border-white/10 backdrop-blur-md shadow-xl
                                ${currentImageIndex === 0 
                                    ? 'opacity-0 pointer-events-none' 
                                    : 'text-white/80 hover:text-white bg-black/60 hover:bg-white/20 opacity-100'}`}
                            style={{ top: 'calc(50% + 40px)', transform: 'translateY(-50%)' }}
                            onClick={prevImage}
                        >
                            <ChevronLeft size={32} className="md:w-8 md:h-8" />
                        </button>

                        <button 
                            className={`absolute right-4 md:right-8 p-3 md:p-4 rounded-full transition-all z-[10000] border border-white/10 backdrop-blur-md shadow-xl
                                ${currentImageIndex === selectedProject.images.length - 1 
                                    ? 'opacity-0 pointer-events-none' 
                                    : 'text-white/80 hover:text-white bg-black/60 hover:bg-white/20 opacity-100'}`}
                            style={{ top: 'calc(50% + 40px)', transform: 'translateY(-50%)' }}
                            onClick={nextImage}
                        >
                            <ChevronRight size={32} className="md:w-8 md:h-8" />
                        </button>

                        <div 
                            className="relative w-full max-w-7xl flex-1 flex flex-col items-center justify-center min-h-0 gap-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full flex-1 flex items-center justify-center min-h-0 group">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        src={selectedProject.images[currentImageIndex]}
                                        alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                                        className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl"
                                    />
                                </AnimatePresence>
                            </div>
                            
                            <div className="text-center w-full shrink-0">
                                <h4 className="text-white/90 text-lg md:text-xl font-light tracking-wide mb-3 flex items-center justify-center gap-4">
                                    {selectedProject.title} 
                                    <span className="text-primary/90 text-sm font-mono bg-white/10 border border-white/5 px-3 py-1 rounded-full">
                                        {currentImageIndex + 1} / {selectedProject.images.length}
                                    </span>
                               </h4>
                                
                                {selectedProject.tools && (
                                    <div className="flex flex-wrap justify-center gap-2 mb-5">
                                        {selectedProject.tools.map((tool, idx) => (
                                            <span 
                                                key={idx}
                                                className="text-[11px] font-mono tracking-wider text-primary/70 border border-primary/20 bg-primary/5 px-2.5 py-1 rounded-full uppercase"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                
                                <div className="flex gap-2 justify-center flex-wrap max-w-2xl mx-auto px-4">
                                    {selectedProject.images.map((_, idx) => (
                                        <div 
                                            key={idx} 
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer 
                                                ${currentImageIndex === idx 
                                                    ? 'w-10 bg-primary' 
                                                    : 'w-4 bg-white/20 hover:bg-white/50'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </React.Fragment>
    );
});

export default PortfolioWorks;
