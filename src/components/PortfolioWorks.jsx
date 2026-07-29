import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import SectionHeader from './ui/SectionHeader';
import { X, ChevronLeft, ChevronRight, Maximize2, Volume2, VolumeX, Film, Image as ImageIcon } from 'lucide-react';

// ── Use Vite's import.meta.url pattern so images are resolved at build-time
// but NOT eagerly bundled into JS — browser loads them as separate HTTP requests
import aiVoiceVideo from '../assets/Vio/Satit.mp4';

// Dorm images — ordered by filename
const dormImageModules = import.meta.glob('../assets/Photo dorm/*.png', { eager: true, query: '?url', import: 'default' });
const dormImages = [
    dormImageModules['../assets/Photo dorm/1.png'],
    dormImageModules['../assets/Photo dorm/2.png'],
    dormImageModules['../assets/Photo dorm/3.png'],
    dormImageModules['../assets/Photo dorm/4.png'],
    dormImageModules['../assets/Photo dorm/5.png'],
    dormImageModules['../assets/Photo dorm/6.png'],
    dormImageModules['../assets/Photo dorm/7.png'],
];

// Stock images — ordered by filename
const stockImageModules = import.meta.glob('../assets/Photo stock/*.png', { eager: true, query: '?url', import: 'default' });
const stockImages = [
    stockImageModules['../assets/Photo stock/one.png'],
    stockImageModules['../assets/Photo stock/two.png'],
    stockImageModules['../assets/Photo stock/three.png'],
    stockImageModules['../assets/Photo stock/four.png'],
    stockImageModules['../assets/Photo stock/five.png'],
    stockImageModules['../assets/Photo stock/six.png'],
];

// AI Voice images — ordered by filename
const aivoiceImageModules = import.meta.glob('../assets/PhotoAivoice/*.png', { eager: true, query: '?url', import: 'default' });
const aivoiceImages = [
    aivoiceImageModules['../assets/PhotoAivoice/1.png'],
    aivoiceImageModules['../assets/PhotoAivoice/2.png'],
    aivoiceImageModules['../assets/PhotoAivoice/3.png'],
    aivoiceImageModules['../assets/PhotoAivoice/4.png'],
    aivoiceImageModules['../assets/PhotoAivoice/5.png'],
    aivoiceImageModules['../assets/PhotoAivoice/6.png'],
    aivoiceImageModules['../assets/PhotoAivoice/7.png'],
    aivoiceImageModules['../assets/PhotoAivoice/8.png'],
];

const aiVoiceProject = {
    title: 'AI Voice Intelligence',
    titleFull: 'AI Voice Intelligence System',
    category: 'AI WEB APPLICATION',
    img: aivoiceImages[0], 
    images: aivoiceImages,
    video: aiVoiceVideo,
    toolsMain: ['NEXT.JS', 'FASTAPI', 'SQLITE', 'WHISPER STT', 'QDRANT'],
    toolsSub: ['TYPESCRIPT', 'TAILWIND CSS', 'PYTHON', 'SQLALCHEMY', 'GROQ API', 'n8n', 'JWT + HTTP-ONLY COOKIE'],
    tools: ['NEXT.JS', 'FASTAPI', 'SQLITE', 'WHISPER STT', 'QDRANT'],
    alt: "AI Voice Intelligence System",
    descTh: "ระบบวิเคราะห์เสียงสนทนาคอลเซ็นเตอร์ด้วย AI ถอดความเสียงเป็นข้อความ วิเคราะห์อารมณ์ หัวข้อสนทนา คีย์เวิร์ดสำคัญ และแสดงผลข้อมูลลูกค้าเชิงลึกผ่าน Dashboard พร้อมระบบค้นหาข้อมูลการรับประกันสินค้าด้วยเทคโนโลยี RAG ช่วยค้นหา Pain Point ของลูกค้า และลดเวลาในการตรวจสอบสายสนทนาได้อย่างมีประสิทธิภาพ",
    descEn: "ระบบวิเคราะห์เสียงสนทนาคอลเซ็นเตอร์ด้วย AI ถอดความเสียงเป็นข้อความ วิเคราะห์อารมณ์ หัวข้อสนทนา คีย์เวิร์ดสำคัญ และแสดงผลข้อมูลลูกค้าเชิงลึกผ่าน Dashboard พร้อมระบบค้นหาข้อมูลการรับประกันสินค้าด้วยเทคโนโลยี RAG ช่วยค้นหา Pain Point ของลูกค้า และลดเวลาในการตรวจสอบสายสนทนาได้อย่างมีประสิทธิภาพ",
    longDescTh: "ระบบวิเคราะห์เสียงสนทนาคอลเซ็นเตอร์ด้วย AI ถอดความเสียงเป็นข้อความ วิเคราะห์อารมณ์ หัวข้อสนทนา คีย์เวิร์ดสำคัญ และแสดงผลข้อมูลลูกค้าเชิงลึกผ่าน Dashboard พร้อมระบบค้นหาข้อมูลการรับประกันสินค้าด้วยเทคโนโลยี RAG ช่วยค้นหา Pain Point ของลูกค้า และลดเวลาในการตรวจสอบสายสนทนาได้อย่างมีประสิทธิภาพ",
    longDescEn: "ระบบวิเคราะห์เสียงสนทนาคอลเซ็นเตอร์ด้วย AI ถอดความเสียงเป็นข้อความ วิเคราะห์อารมณ์ หัวข้อสนทนา คีย์เวิร์ดสำคัญ และแสดงผลข้อมูลลูกค้าเชิงลึกผ่าน Dashboard พร้อมระบบค้นหาข้อมูลการรับประกันสินค้าด้วยเทคโนโลยี RAG ช่วยค้นหา Pain Point ของลูกค้า และลดเวลาในการตรวจสอบสายสนทนาได้อย่างมีประสิทธิภาพ",
    featuresTh: [
        "ระบบแปลงเสียงเป็นข้อความและวิเคราะห์การโทรด้วย AI",
        "แดชบอร์ดสรุปสถิติและวิเคราะห์ข้อมูลลูกค้าเชิงลึก",
        "ระบบค้นหาข้อมูลประกันสินค้าอัจฉริยะด้วย RAG",
        "ระบบเข้าสู่ระบบ จัดการสิทธิ์ Admin และบันทึกประวัติการใช้งาน"
    ],
    featuresEn: [
        "ระบบแปลงเสียงเป็นข้อความและวิเคราะห์การโทรด้วย AI",
        "แดชบอร์ดสรุปสถิติและวิเคราะห์ข้อมูลลูกค้าเชิงลึก",
        "ระบบค้นหาข้อมูลประกันสินค้าอัจฉริยะด้วย RAG",
        "ระบบเข้าสู่ระบบ จัดการสิทธิ์ Admin และบันทึกประวัติการใช้งาน"
    ],
    captionsTh: [
        "Voice Analytics Dashboard: Sentiment, Topic และ Keyword Analysis",
        "Brand Intelligence และ Agent Performance Overview",
        "Warranty RAG Chatbot: ค้นหาประกันด้วย AI แบบ Real-time",
        "Customer Library Database และประวัติสนทนา",
        "Customer Profile Detail พร้อมรายการประกันสินค้า",
        "Files Library Storage: คลังไฟล์เสียง 61 รายการ",
        "Call Analysis: AI Transcript, Summary และ Anomaly Detection",
        "Warranty Database Inventory ซิงค์กับ Qdrant Vector DB"
    ],
    captionsEn: [
        "Voice Analytics Dashboard: Sentiment, Topic & Keyword Analysis",
        "Brand Intelligence and Agent Performance Overview",
        "Warranty RAG Chatbot: Real-time AI Warranty Search",
        "Customer Library Database with Call History",
        "Customer Profile Detail with Product Warranty Records",
        "Files Library Storage: 61 Audio Recordings Archive",
        "Call Analysis: AI Transcript, Summary & Anomaly Detection",
        "Warranty Database Inventory synced to Qdrant Vector DB"
    ],
    accent: {
        glow: 'rgba(6,182,212,0.15)',
        text: 'text-cyan-400',
        bg: 'bg-black',
        border: 'border-cyan-500/30',
        gradient: 'from-cyan-400 via-sky-500 to-blue-600',
        primary: '#06b6d4'
    }
};

const workItems = [
    { 
        title: 'Dormitory Management', 
        titleFull: 'Dormitory Management System',
        category: 'Web Application / UI', 
        img: dormImages[0], 
        images: dormImages,
        toolsMain: ['React 19', 'Tailwind v4', 'Node.js', 'MongoDB'],
        toolsSub: ['Express 5', 'Mongoose 9', 'Vite 7', 'REST API'],
        tools: ['React 19', 'Tailwind v4', 'Node.js', 'MongoDB'],
        alt: "Dormitory Management System",
        descTh: "เป็นระบบเว็บแอปพลิเคชันสำหรับบริหารจัดการหอพักและอพาร์ตเมนต์แบบครบวงจร ออกแบบมาเพื่อเน้นความเรียบง่าย ทันสมัย และช่วยลดความยุ่งยากในงานเอกสารและการคำนวณค่าใช้จ่ายประจำเดือนของผู้ดูแลหอพัก",
        descEn: "เป็นระบบเว็บแอปพลิเคชันสำหรับบริหารจัดการหอพักและอพาร์ตเมนต์แบบครบวงจร ออกแบบมาเพื่อเน้นความเรียบง่าย ทันสมัย และช่วยลดความยุ่งยากในงานเอกสารและการคำนวณค่าใช้จ่ายประจำเดือนของผู้ดูแลหอพัก",
        longDescTh: "เป็นระบบเว็บแอปพลิเคชันสำหรับบริหารจัดการหอพักและอพาร์ตเมนต์แบบครบวงจร ออกแบบมาเพื่อเน้นความเรียบง่าย ทันสมัย และช่วยลดความยุ่งยากในงานเอกสารและการคำนวณค่าใช้จ่ายประจำเดือนของผู้ดูแลหอพัก",
        longDescEn: "เป็นระบบเว็บแอปพลิเคชันสำหรับบริหารจัดการหอพักและอพาร์ตเมนต์แบบครบวงจร ออกแบบมาเพื่อเน้นความเรียบง่าย ทันสมัย และช่วยลดความยุ่งยากในงานเอกสารและการคำนวณค่าใช้จ่ายประจำเดือนของผู้ดูแลหอพัก",
        featuresTh: [
             "ระบบจัดการห้องพักและอาคาร (แยกโซนและสถานะห้อง)",
             "ระบบจัดการข้อมูลผู้เช่าและสัญญาเช่า",
             "ระบบบันทึกจดมิเตอร์และคำนวณค่าน้ำ-ค่าไฟ",
             "ระบบออกบิล ใบแจ้งหนี้ และสรุปแดชบอร์ดรายรับ"
        ],
        featuresEn: [
             "ระบบจัดการห้องพักและอาคาร (แยกโซนและสถานะห้อง)",
             "ระบบจัดการข้อมูลผู้เช่าและสัญญาเช่า",
             "ระบบบันทึกจดมิเตอร์และคำนวณค่าน้ำ-ค่าไฟ",
             "ระบบออกบิล ใบแจ้งหนี้ และสรุปแดชบอร์ดรายรับ"
        ],
        captionsTh: [
            "Main Dashboard: ภาพรวมรายรับและสถานะห้องพักทั้งหมด",
            "All Rooms: จัดการห้องพักพร้อมสถานะและค่าเช่า",
            "Tenants: รายชื่อผู้เช่าและสัญญาเช่าที่ Active",
            "Billing & Invoices: ตาราง Invoice และยอดค้างชำระ",
            "Utilities: บันทึกมิเตอร์น้ำ-ไฟและคำนวณค่าใช้จ่าย",
            "Settings: ตั้งค่า Utility Coefficient ของระบบ",
            "Invoice Record: รายละเอียดบิลและดาวน์โหลดใบแจ้งหนี้"
        ],
        captionsEn: [
            "Main Dashboard: Revenue overview and room occupancy status",
            "All Rooms: Room management with status and rental rate",
            "Tenants: Active tenant directory with lease agreements",
            "Billing & Invoices: Invoice table and pending payments",
            "Utilities: Water & electricity meter logging and calculation",
            "Settings: Utility constants and system configuration",
            "Invoice Record: Bill details and invoice download modal"
        ],
        accent: {
            glow: 'rgba(59,130,246,0.12)',
            text: 'text-blue-400',
            bg: 'bg-black',
            border: 'border-blue-500/30',
            gradient: 'from-blue-400 via-indigo-500 to-cyan-500',
            primary: '#3b82f6'
        }
    },
    { 
        title: 'Stock Inventory', 
        titleFull: 'Stock Inventory System',
        category: 'Web Application / System', 
        img: stockImages[1], 
        images: stockImages,
        toolsMain: ['React', 'Python (FastAPI)', 'Electron', 'SQLite'],
        toolsSub: ['Tailwind CSS', 'Recharts', 'PyInstaller', 'Axios'],
        tools: ['React', 'Python (FastAPI)', 'Electron', 'SQLite'],
        alt: "Stock Management System",
        descTh: "เป็นระบบจัดการสต็อกสินค้าและยอดขายที่ถูกออกแบบมาให้มีหน้าตาดีไซน์ทันสมัย ใช้งานง่าย (User-Friendly Dashboard) มีระบบตัดสต็อกอัตโนมัติ คำนวณต้นทุน/กำไร/ภาษี (VAT 7%) และรายงานสถิติการขายครบวงจร โดยทำงานแบบ Offline-first ผ่านฐานข้อมูล SQLite ในเครื่อง",
        descEn: "เป็นระบบจัดการสต็อกสินค้าและยอดขายที่ถูกออกแบบมาให้มีหน้าตาดีไซน์ทันสมัย ใช้งานง่าย (User-Friendly Dashboard) มีระบบตัดสต็อกอัตโนมัติ คำนวณต้นทุน/กำไร/ภาษี (VAT 7%) และรายงานสถิติการขายครบวงจร โดยทำงานแบบ Offline-first ผ่านฐานข้อมูล SQLite ในเครื่อง",
        longDescTh: "เป็นระบบจัดการสต็อกสินค้าและยอดขายที่ถูกออกแบบมาให้มีหน้าตาดีไซน์ทันสมัย ใช้งานง่าย (User-Friendly Dashboard) มีระบบตัดสต็อกอัตโนมัติ คำนวณต้นทุน/กำไร/ภาษี (VAT 7%) และรายงานสถิติการขายครบวงจร โดยทำงานแบบ Offline-first ผ่านฐานข้อมูล SQLite ในเครื่อง",
        longDescEn: "เป็นระบบจัดการสต็อกสินค้าและยอดขายที่ถูกออกแบบมาให้มีหน้าตาดีไซน์ทันสมัย ใช้งานง่าย (User-Friendly Dashboard) มีระบบตัดสต็อกอัตโนมัติ คำนวณต้นทุน/กำไร/ภาษี (VAT 7%) และรายงานสถิติการขายครบวงจร โดยทำงานแบบ Offline-first ผ่านฐานข้อมูล SQLite ในเครื่อง",
        featuresTh: [
             "Real-time stock deduction and auto-restoration: ระบบคิดเงินหน้าร้านพร้อมตัดสต็อกสินค้าทันที และคืนสต็อกอัตโนมัติเมื่อยกเลิกรายการ",
             "Multi-category and brand management: ระบบจัดการสินค้า หมวดหมู่ แบรนด์ และอัปโหลดรูปภาพสินค้าจากเครื่อง",
             "Low stock alerts and notifications: ระบบตรวจจับและแจ้งเตือนสินค้าสต็อกต่ำอัตโนมัติ (Low Stock Threshold)",
             "Sales analytics and gross profit dashboard: วิเคราะห์ยอดขาย กำไรขั้นต้น (Gross Profit Margin) และกราฟสถิติด้วย Recharts",
             "Offline Windows desktop application packaging: แพ็กเกจระบบเป็นแอปพลิเคชันเดสก์ท็อปแบบ .exe (Electron + Python FastAPI) รันออฟไลน์ได้ 100%"
        ],
        featuresEn: [
             "Real-time stock deduction and auto-restoration: ระบบคิดเงินหน้าร้านพร้อมตัดสต็อกสินค้าทันที และคืนสต็อกอัตโนมัติเมื่อยกเลิกรายการ",
             "Multi-category and brand management: ระบบจัดการสินค้า หมวดหมู่ แบรนด์ และอัปโหลดรูปภาพสินค้าจากเครื่อง",
             "Low stock alerts and notifications: ระบบตรวจจับและแจ้งเตือนสินค้าสต็อกต่ำอัตโนมัติ (Low Stock Threshold)",
             "Sales analytics and gross profit dashboard: วิเคราะห์ยอดขาย กำไรขั้นต้น (Gross Profit Margin) และกราฟสถิติด้วย Recharts",
             "Offline Windows desktop application packaging: แพ็กเกจระบบเป็นแอปพลิเคชันเดสก์ท็อปแบบ .exe (Electron + Python FastAPI) รันออฟไลน์ได้ 100%"
        ],
        captionsTh: [
            "Dashboard: ยอดขาย กำไร และสินค้าขายดีประจำวัน",
            "Inventory Categories: หมวดหมู่สินค้าในคลังทั้งหมด",
            "Point of Sale: ระบบขายสินค้าพร้อมตัดสต็อก Real-time",
            "Sales Reports: รายงานยอดขายและ Gross Profit",
            "Tv Stock: จัดการรายการสินค้าในหมวดหมู่ + Green/Red Stock",
            "Low Stock Alert: แจ้งเตือนสินค้าใกล้หมดและ Out of Stock"
        ],
        captionsEn: [
            "Dashboard: Daily revenue, gross profit and best-seller overview",
            "Inventory Categories: All product category cards with stock count",
            "Point of Sale: Real-time stock deduction and sales terminal",
            "Sales Reports: Daily revenue transactions and profit analysis",
            "Tv Stock: Product inventory list with Green/Red stock filter",
            "Low Stock Alert: Out-of-stock and low stock notification modal"
        ],
        accent: {
            glow: 'rgba(14,165,233,0.12)',
            text: 'text-sky-400',
            bg: 'bg-black',
            border: 'border-sky-500/30',
            gradient: 'from-sky-400 via-cyan-500 to-teal-500',
            primary: '#0ea5e9'
        }
    }
];

const PortfolioWorks = React.memo(() => {
    const { lang } = useLanguage();
    const t = translations[lang].works;
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [mediaTab, setMediaTab] = useState('video');
    const [isCardMuted, setIsCardMuted] = useState(true);

    const containerRef = useRef(null);
    const cardVideoRef = useRef(null);
    const cardVideoContainerRef = useRef(null);

    // ── Play/pause card video only when it's visible in the viewport
    // Prevents autoplay consuming CPU/bandwidth before user scrolls to it
    useEffect(() => {
        const videoEl = cardVideoRef.current;
        const containerEl = cardVideoContainerRef.current;
        if (!videoEl || !containerEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoEl.play().catch(() => {});
                } else {
                    videoEl.pause();
                }
            },
            { threshold: 0.25 }
        );
        observer.observe(containerEl);
        return () => observer.disconnect();
    }, []);

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
            if (mediaTab === 'gallery') {
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
            }
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
    }, [selectedProject, currentImageIndex, mediaTab]);

    const openModal = (project, initialTab = 'video') => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
        setMediaTab(project.video ? initialTab : 'gallery');
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

                    {/* --- Featured Projects Mockup --- */}
                    <div className="mt-16 mb-32 relative z-20">
                        {/* Masterpiece Header */}
                        <div className="flex flex-col items-center justify-center mb-16 relative z-20">
                            <div className="relative group cursor-default">
                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 via-yellow-500/50 to-amber-600/30 rounded-full blur-md opacity-50 group-hover:opacity-85 transition duration-700"></div>
                                <div className="relative flex items-center gap-4 px-7 py-3 bg-black border border-amber-500/40 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.2)]">
                                    <div className="w-5 md:w-8 h-px bg-gradient-to-r from-transparent to-amber-400/80"></div>
                                    <span 
                                        className="text-xs md:text-sm font-black tracking-[0.25em] uppercase"
                                        style={{
                                            background: 'linear-gradient(135deg, #fde68a 0%, #f59e0b 50%, #b45309 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                        }}
                                    >
                                        {lang === 'th' ? 'โปรเจคที่ภาคภูมิใจ' : 'Proudest Masterpieces'}
                                    </span>
                                    <div className="w-5 md:w-8 h-px bg-gradient-to-l from-transparent to-amber-400/80"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="max-w-3xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6 }}
                                onClick={() => openModal(aiVoiceProject, 'video')}
                                className="group relative rounded-2xl overflow-hidden bg-[#0a0a0f] border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-500 cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                            >
                                {/* Video Container */}
                                <div ref={cardVideoContainerRef} className="relative aspect-video overflow-hidden bg-black">
                                    <video 
                                        ref={cardVideoRef}
                                        src={aiVoiceProject.video} 
                                        loop 
                                        muted={isCardMuted}
                                        playsInline 
                                        preload="none"
                                        className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-700 ease-out"
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/30 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>
                                    
                                    {/* Minimal Black Video Badge Top Left */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black border border-cyan-500/30 text-cyan-300 text-[11px] font-mono tracking-wider shadow-md">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                                        <Film size={12} className="text-cyan-400" />
                                        <span className="text-cyan-300 font-medium">DEMO VIDEO</span>
                                    </div>

                                    {/* Mute/Unmute toggle & Maximize Top Right */}
                                    <div className="absolute top-4 right-4 flex items-center gap-2">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsCardMuted(!isCardMuted);
                                            }}
                                            className="bg-black p-2 rounded-full text-white/80 hover:text-cyan-300 border border-white/20 transition-all duration-300 cursor-pointer shadow-md"
                                            title={isCardMuted ? "Unmute Sound" : "Mute Sound"}
                                        >
                                            {isCardMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-cyan-300" />}
                                        </button>
                                        
                                        <div className="bg-black p-2 rounded-full text-white/80 group-hover:text-cyan-300 border border-white/20 transition-all duration-300 cursor-pointer shadow-md">
                                            <Maximize2 size={15} />
                                        </div>
                                    </div>
                                    
                                    {/* Content on Card */}
                                    <div className="absolute w-full bottom-0 left-0 p-6 lg:p-8">
                                        <div className="flex items-center gap-2.5 mb-2.5">
                                            <span className="text-[10px] text-cyan-300 font-mono tracking-widest uppercase bg-black px-3 py-1 rounded-full border border-cyan-500/30 shadow-md">
                                                {aiVoiceProject.category}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                                                {aiVoiceProject.title}
                                            </h3>
                                            <p className="text-xs lg:text-sm text-slate-300/80 font-light line-clamp-2 leading-relaxed">
                                                {lang === 'th' ? aiVoiceProject.descTh : aiVoiceProject.descEn}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    {/* --- End of Featured Projects Mockup --- */}

                    {/* --- Other Projects Heading --- */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="mt-40 mb-20 relative z-20 flex flex-col items-center justify-center text-center"
                    >
                        <div className="relative group cursor-default">
                            {/* Animated Background Glow */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-300"></div>
                            
                            {/* Inner Capsule */}
                            <div className="relative inline-flex items-center gap-4 px-8 py-3.5 rounded-full border border-white/20 bg-[#0a0a0e]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                                {/* Ping Dot */}
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)]"></span>
                                </span>
                                
                                <span 
                                    className="text-sm md:text-base font-black tracking-[0.3em] uppercase"
                                    style={{
                                        background: 'linear-gradient(to right, #ffffff, #a5c8ff, #3b82f6)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    Other Experiences
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <div ref={containerRef} className="relative mt-8 pt-10 pb-10">
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
                                    <div className={`w-full pl-8 sm:pl-10 md:pl-0 ${isEven ? 'md:pr-14 md:text-right md:col-start-1 md:col-end-2' : 'md:pl-14 md:col-start-2 md:col-end-3'}`}>
                                        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-slate-800/20 relative shadow-lg border border-white/5 group-hover:border-primary/30 transition-all duration-500">
                                            <img
                                                alt={item.alt}
                                                className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
                                                src={item.img}
                                                loading="lazy"
                                                decoding="async"
                                                fetchpriority="low"
                                            />
                                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none flex items-center justify-center">
                                                <div className="bg-black/40 backdrop-blur-md p-4 rounded-full text-white/90 transform scale-50 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100 cursor-pointer">
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
                        className="fixed inset-0 z-[9999] overflow-y-auto bg-[#040406]/95 backdrop-blur-2xl"
                        onClick={closeModal}
                    >
                        {/* Inner scroll container */}
                        <div className="min-h-screen w-full flex flex-col items-center justify-start pt-20 pb-6 sm:py-10 md:py-14 px-3 sm:px-4 md:px-8 lg:px-16">
                            
                            <div 
                                className="relative w-full max-w-5xl bg-[#09090e]/95 border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_60px_-15px_rgba(0,0,0,0.9)] p-4 sm:p-6 md:p-9 flex flex-col gap-4 sm:gap-6 backdrop-blur-3xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Glowing ambient background orb */}
                                <div 
                                    className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full blur-[120px] pointer-events-none -z-10 transition-all duration-700 opacity-60" 
                                    style={{ background: selectedProject.accent?.glow || 'rgba(59,130,246,0.12)' }}
                                />

                                {/* Top: Minimal Close Button */}
                                <button 
                                    className="absolute top-5 right-5 text-slate-400 hover:text-white transition-all z-30 bg-black hover:bg-black/80 border border-white/20 p-2 rounded-full shadow-md cursor-pointer"
                                    onClick={closeModal}
                                    title="Close (Esc)"
                                >
                                    <X size={16} />
                                </button>

                                {/* Media Switcher Tabs (Black Solid Background Style) */}
                                {selectedProject.video && (
                                    <div className="flex justify-center gap-2 -mb-1 z-20">
                                        <button
                                            onClick={() => setMediaTab('video')}
                                            className={`flex items-center gap-2 px-4.5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border cursor-pointer ${
                                                mediaTab === 'video'
                                                    ? 'bg-black text-cyan-300 border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                                                    : 'bg-black/80 text-slate-400 border-white/10 hover:text-white hover:bg-black'
                                            }`}
                                        >
                                            <Film size={13} className={mediaTab === 'video' ? 'text-cyan-400' : 'opacity-70'} />
                                            <span>Demo Video</span>
                                        </button>
                                        <button
                                            onClick={() => setMediaTab('gallery')}
                                            className={`flex items-center gap-2 px-4.5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border cursor-pointer ${
                                                mediaTab === 'gallery'
                                                    ? 'bg-black text-cyan-300 border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                                                    : 'bg-black/80 text-slate-400 border-white/10 hover:text-white hover:bg-black'
                                            }`}
                                        >
                                            <ImageIcon size={13} className={mediaTab === 'gallery' ? 'text-cyan-400' : 'opacity-70'} />
                                            <span>Screenshots ({selectedProject.images.length})</span>
                                        </button>
                                    </div>
                                )}

                                {/* Project Showcase Container */}
                                <div className="relative w-full aspect-video max-h-[200px] xs:max-h-[240px] sm:max-h-[360px] md:max-h-[500px] overflow-hidden bg-black rounded-xl border border-white/10 flex items-center justify-center group shadow-inner">
                                    {selectedProject.video && mediaTab === 'video' ? (
                                        <video
                                            src={selectedProject.video}
                                            controls
                                            autoPlay
                                            playsInline
                                            className="w-full h-full object-contain rounded-xl"
                                        />
                                    ) : (
                                        <>
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={currentImageIndex}
                                                    initial={{ opacity: 0, scale: 0.99 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.99 }}
                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                    src={selectedProject.images[currentImageIndex]}
                                                    alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                                                    className="w-full h-full object-contain"
                                                />
                                            </AnimatePresence>

                                            {/* Carousel Navigation Arrows */}
                                            {selectedProject.images.length > 1 && (
                                                <>
                                                    <button 
                                                        className={`absolute left-4 p-2 rounded-full transition-all border border-white/20 shadow-md bg-black text-white/80 hover:text-white hover:bg-black/90 cursor-pointer
                                                            ${currentImageIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                                        onClick={prevImage}
                                                    >
                                                        <ChevronLeft size={18} />
                                                    </button>

                                                    <button 
                                                        className={`absolute right-4 p-2 rounded-full transition-all border border-white/20 shadow-md bg-black text-white/80 hover:text-white hover:bg-black/90 cursor-pointer
                                                            ${currentImageIndex === selectedProject.images.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                                        onClick={nextImage}
                                                    >
                                                        <ChevronRight size={18} />
                                                    </button>
                                                </>
                                            )}

                                            {/* Minimal Image Dots Overlay */}
                                            {selectedProject.images.length > 1 && (
                                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-black border border-white/15 shadow-lg">
                                                    {selectedProject.images.map((_, idx) => (
                                                        <div 
                                                            key={idx} 
                                                            onClick={() => setCurrentImageIndex(idx)}
                                                            className={`h-1 rounded-full transition-all duration-300 cursor-pointer 
                                                                ${currentImageIndex === idx ? 'w-5 bg-white' : 'w-1 bg-white/30 hover:bg-white/60'}`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Dynamic Caption Bar (Black Solid Background Style) */}
                                {selectedProject.video && mediaTab === 'video' ? (
                                    <div className="w-full -mt-3 text-center px-5 py-2.5 bg-black border border-white/10 rounded-xl text-xs font-sans tracking-wide text-slate-300 font-light select-none shadow-inner flex items-center justify-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                                        <span>Demo Video: AI Voice Intelligence System Walkthrough</span>
                                    </div>
                                ) : selectedProject.captionsTh && (
                                    <div className="w-full -mt-3 text-center px-5 py-2.5 bg-black border border-white/10 rounded-xl text-xs font-sans tracking-wide text-slate-300 font-light select-none shadow-inner flex items-center justify-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedProject.accent?.primary || '#3b82f6' }}></span>
                                        <span>{lang === 'th' ? selectedProject.captionsTh[currentImageIndex] : selectedProject.captionsEn[currentImageIndex]}</span>
                                    </div>
                                )}

                                {/* Project Info Section */}
                                <div className="flex flex-col gap-6 pt-1">
                                    
                                    {/* Title and Short Description */}
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/[0.06] pb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                                                <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-black text-cyan-300 border border-cyan-500/30 shadow-md">
                                                    {selectedProject.category}
                                                </span>
                                                {selectedProject.video && mediaTab === 'video' && (
                                                    <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase px-3 py-1 rounded-full bg-black border border-cyan-500/30 shadow-md">
                                                        VIDEO DEMO
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-tight">
                                                {selectedProject.titleFull || selectedProject.title}
                                            </h3>
                                            <p className="text-slate-300/80 text-xs md:text-sm font-light mt-2.5 leading-relaxed max-w-2xl">
                                                {lang === 'th' ? (selectedProject.longDescTh || selectedProject.descTh) : (selectedProject.longDescEn || selectedProject.descEn)}
                                            </p>
                                        </div>
                                        
                                        {/* Page indicator (Right side - Minimal Style) */}
                                        <div className="shrink-0 flex items-center justify-center text-xs text-slate-500 font-mono">
                                            {selectedProject.video && mediaTab === 'video' ? (
                                                <span className="text-slate-300 font-mono text-[11px] tracking-wider uppercase px-3 py-1 rounded-full bg-black border border-white/15 shadow-sm">VIDEO</span>
                                            ) : (
                                                <>
                                                    <span className="text-white font-medium">{currentImageIndex + 1}</span>
                                                    <span className="mx-1 opacity-40">/</span>
                                                    <span className="opacity-60">{selectedProject.images.length}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Grid Content: Left for badges, Right for Key Features */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8">
                                        
                                        {/* Left: Badges (Main & Secondary) */}
                                        <div className="flex flex-col gap-6 md:col-span-5">
                                            {/* Main Stack */}
                                            <div>
                                                <h4 className="text-[11px] font-mono text-slate-400/80 tracking-widest uppercase mb-3">
                                                    {lang === 'th' ? 'เทคโนโลยีหลัก' : 'CORE TECHNOLOGIES'}
                                                </h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {(selectedProject.toolsMain || selectedProject.tools || []).map((tool, idx) => (
                                                        <span 
                                                            key={idx}
                                                            className="inline-flex items-center text-[11px] font-mono tracking-wide bg-black border border-white/15 px-3 py-1 rounded-md text-slate-200 shadow-sm"
                                                        >
                                                            {tool}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Tools & Integrations (Secondary stack) */}
                                            {(selectedProject.toolsSub && selectedProject.toolsSub.length > 0) && (
                                                <div>
                                                    <h4 className="text-[11px] font-mono text-slate-400/80 tracking-widest uppercase mb-3">
                                                        {lang === 'th' ? 'เครื่องมือและระบบเสริม' : 'TOOLS & INTEGRATIONS'}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {selectedProject.toolsSub.map((tool, idx) => (
                                                            <span 
                                                                key={idx}
                                                                className="text-[11px] font-mono text-slate-400 bg-black border border-white/15 px-2.5 py-1 rounded-md hover:text-slate-200 transition-colors shadow-sm"
                                                            >
                                                                {tool}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right: Key Features */}
                                        {((lang === 'th' ? selectedProject.featuresTh : selectedProject.featuresEn) || selectedProject.features) && (
                                            <div className="flex flex-col md:col-span-7">
                                                <h4 className="text-[11px] font-mono text-slate-400/80 tracking-widest uppercase mb-3 md:pl-4">
                                                    {lang === 'th' ? 'ฟีเจอร์หลัก' : 'KEY FEATURES'}
                                                </h4>
                                                <div className="flex flex-col gap-3 md:pl-4">
                                                    {((lang === 'th' ? selectedProject.featuresTh : selectedProject.featuresEn) || selectedProject.features).map((feat, idx) => (
                                                        <div 
                                                            key={idx} 
                                                            className="flex items-start gap-2.5"
                                                        >
                                                            <div className="flex items-center justify-center shrink-0 mt-[4px] text-cyan-400 text-[10px]">
                                                                ✦
                                                            </div>
                                                            <span className="text-xs md:text-sm text-slate-300/90 font-light leading-relaxed">
                                                                {feat}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                    </div>

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
