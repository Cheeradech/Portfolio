import React, { useRef, memo, useCallback } from 'react';
import { motion, useScroll, useAnimation } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import SectionHeader from './ui/SectionHeader';
import nextIcon from '../assets/next.png';
import './TechPad.css';

const skillsData = [
    { id: 'html', label: 'HTML5', description: 'พื้นฐานโครงสร้างเว็บไซต์ที่แข็งแกร่ง รองรับ SEO และ Semantic HTML', level: 90, stars: 5, colorClass: 'color-html', icon: <i className="fab fa-html5 tech-icon text-5xl"></i> },
    { id: 'css', label: 'CSS3', description: 'การจัดเลย์เอาท์ที่ซับซ้อน อนิเมชั่น และ Responsive Design ระดับสูง', level: 85, stars: 4, colorClass: 'color-css', icon: <i className="fab fa-css3-alt tech-icon text-5xl"></i> },
    { id: 'js', label: 'JavaScript', description: 'ตรรกะโปรแกรมที่ซับซ้อน การจัดการสถานะ และการประมวลผลข้อมูลหนักๆ', level: 88, stars: 5, colorClass: 'color-js', icon: <i className="fab fa-js tech-icon text-5xl"></i> },
    { id: 'react', label: 'React', description: 'การสร้าง Component ที่นำกลับมาใช้ใหม่ได้ และการจัดการ State ขนาดใหญ่', level: 92, stars: 5, colorClass: 'color-react', icon: <i className="fab fa-react tech-icon text-5xl animate-[spin_12s_linear_infinite]"></i> },
    {
        id: 'tailwind', label: 'Tailwind CSS', description: 'Utility-first CSS ที่ช่วยให้พัฒนา UI ได้รวดเร็วและคงเส้นคงวา', level: 95, stars: 5, colorClass: 'color-tailwind',
        icon: (
            <svg className="w-12 h-12 tech-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
            </svg>
        )
    },
    { id: 'nextjs', label: 'Next.js', description: 'React Framework สำหรับสร้างเว็บแอปพลิเคชันแบบ Full-stack ด้วย Server-side Rendering', level: 88, stars: 5, colorClass: 'color-nextjs', icon: <img src="https://assets.streamlinehq.com/image/private/w_240,h_240,ar_1/f_auto/v1/icons/development/next.js-5pbwgh1hsskyitb8feqocm.png/next.js-i3y01dzo77a8k265oje1cl.png?_a=DATAiZAAZAA0" alt="Next.js" className="w-12 h-12 tech-icon object-contain" style={{ filter: 'brightness(0) invert(1)' }} /> },
    { id: 'php', label: 'PHP', description: 'การพัฒนา Backend แบบดั้งเดิมและการสร้าง API สำหรับแอปพลิเคชัน', level: 75, stars: 3, colorClass: 'color-php', icon: <i className="fab fa-php tech-icon text-4xl"></i> },
    { id: 'python', label: 'Python', description: 'ภาษาที่ใช้ในการวิเคราะห์ข้อมูล สคริปต์อัตโนมัติ และการพัฒนา AI', level: 82, stars: 4, colorClass: 'color-python', icon: <i className="fab fa-python tech-icon text-5xl"></i> },
    { id: 'node', label: 'NodeJS', description: 'การสร้างเซิร์ฟเวอร์ที่รองรับการเชื่อมต่อจำนวนมากด้วย V8 Engine', level: 85, stars: 4, colorClass: 'color-node', icon: <i className="fab fa-node-js tech-icon text-5xl"></i> },
    { id: 'docker', label: 'Docker', description: 'การจำลองสภาพแวดล้อมเพื่อให้โค้ดทำงานได้เหมือนกันในทุกที่', level: 80, stars: 4, colorClass: 'color-docker', icon: <i className="fab fa-docker tech-icon text-5xl"></i> },
    { id: 'mongo', label: 'MongoDB', description: 'ฐานข้อมูล NoSQL แบบ Document oriented ที่ยืดหยุ่นและรวดเร็ว', level: 88, stars: 4, colorClass: 'color-mongo', icon: <i className="fas fa-leaf tech-icon text-4xl"></i> },
    {
        id: 'sqlite', label: 'SQLite', description: 'ฐานข้อมูลน้ำหนักเบาที่ฝังตัวได้ง่าย เหมาะสำหรับโปรเจคขนาดเล็กและกลาง', level: 90, stars: 5, colorClass: 'color-sqlite',
        icon: (
            <div className="flex flex-col items-center justify-center gap-0.5">
                <svg className="w-7 h-7 tech-icon text-[#3b95ff]" fill="currentColor" viewBox="0 0 64 64">
                    <path d="M57.6,18.5c-4.4-6.4-11.2-10.4-16-12.7C55.6,2.2,56,5.8,51.8,9.4c-3.8,3.2-12.8,2.3-17.8,6.6C26.5,22.4,26.8,32.2,27,39.9 c0.1,2.5,0.4,5,1.2,7.3c-2.4-0.3-4.9-0.9-7.2-1.8c-12-4.5-17.3-13.6-17.3-13.6l-2.4,4.2c0,0,5.8,11.8,20.4,17.3 c3.4,1.3,7,2.1,10.6,2.5c11.6,1.2,19.9-7.2,23.3-10.8c2.9-3.1,6.8-9.6,7.5-13.8C63.6,28.2,62,24.9,57.6,18.5z"></path>
                    <path d="M37.8,47.8c-0.8-2.3-1.1-4.8-1.2-7.3c-0.2-7.7-0.5-17.5,7-23.9c2.3-1.9,5.2-3,7.9-3.4 c-2.8-5-7.4-7.9-10.3-9.3 c-0.6-0.3-1.3-0.5-2-0.6c-4.2-0.8-7.7,1.8-8.5,2.5c-4.4,3.7-6.8,8.2-7.4,13.6c-0.6,5.1,1.2,16.5,12.8,26.4c0.5,0.4,1,0.9,1.5,1.3 C37.6,47.4,37.7,47.6,37.8,47.8z"></path>
                </svg>
                <span className="text-[0.5rem] font-black tracking-widest leading-none text-[#3b95ff]">SQLITE</span>
            </div>
        )
    },
    { id: 'supabase', label: 'Supabase', description: 'แพลตฟอร์ม Backend-as-a-Service ครบวงจร พร้อมฐานข้อมูล PostgreSQL และ Authentication', level: 85, stars: 4, colorClass: 'color-supabase', icon: <img src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/4/supabase-icon-kpjasdqlnu8exakst6f44r.png/supabase-icon-5uqgeeqeknngv9las8zeef.png?_a=DATAiZAAZAA0" alt="Supabase" className="w-12 h-12 tech-icon object-contain" /> },
    { id: 'postman', label: 'Postman', description: 'เครื่องมือทดสอบและจัดการ API ที่เป็นมาตรฐานสากล', level: 95, stars: 5, colorClass: 'color-postman', icon: <i className="fas fa-space-shuttle tech-icon text-4xl transform -rotate-45"></i> },
    { id: 'n8n', label: 'n8n', description: 'การเชื่อมต่อ Workflow อัตโนมัติ (Automation) แบบ Low-code', level: 85, stars: 4, colorClass: 'color-n8n', icon: <span className="font-black text-3xl tech-icon tracking-tighter">n8n</span> },
];

const TechKey = memo(({ skill, isActive }) => {
    return (
        <div className="key-wrapper">
            <div
                data-key-id={skill.id}
                data-key-label={skill.label}
                aria-label={skill.label}
                className={`key-cap ${skill.colorClass} ${isActive ? 'key-hovered' : ''}`}
                role="button"
            >
                <div className="key-side"></div>
                <div className="key-top">{skill.icon}</div>
            </div>
        </div>
    );
});

export default function TechPad() {
    const containerRef = useRef(null);
    const keyboardRef = useRef(null);
    const keyCapsRef = useRef(null);
    const tickingRef = useRef(false);
    const [hasTriggered, setHasTriggered] = React.useState(false);
    const [activeSkill, setActiveSkill] = React.useState(null);
    const keyboardControls = useAnimation();
    const { lang } = useLanguage();
    const te = translations[lang].expertise;

    // Detect if layout should be mobile (Touch screen OR width < 1024px, the lg breakpoint)
    const [isMobile, setIsMobile] = React.useState(
        typeof window !== 'undefined' ? (window.innerWidth < 1024 || window.matchMedia('(hover: none)').matches) : false
    );

    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024 || window.matchMedia('(hover: none)').matches);
        };
        // Throttle resize handler if needed, but a simple window size check is fast.
        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    React.useEffect(() => {
        // Skip when not needed — once triggered, unsubscribe entirely to stop per-frame scroll cost
        if (isMobile || hasTriggered) return;

        const unsubscribe = scrollYProgress.on("change", v => {
            if (v > 0.42) {
                setHasTriggered(true);
                keyboardControls.start({
                    x: 380, rotateX: 8, z: 60, scale: 0.9, rotateY: -382,
                    transition: { type: 'spring', stiffness: 45, damping: 15, mass: 1 }
                });
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, hasTriggered, keyboardControls, isMobile]);

    const handleKeyboardMouseEnter = React.useCallback(() => {
        if (isMobile) return;
        if (hasTriggered) {
            keyboardControls.start({
                z: 80, rotateX: 6, scale: 0.92, rotateY: -378,
                transition: { type: 'spring', stiffness: 70, damping: 20 }
            });
        } else {
            keyboardControls.start({
                scale: 1.03,
                transition: { type: 'spring', stiffness: 70, damping: 20 }
            });
        }
    }, [hasTriggered, keyboardControls, isMobile]);

    const handleKeyboardMouseLeave = useCallback(() => {
        if (isMobile) return;
        setActiveSkill(null);
        keyCapsRef.current = null;
        if (hasTriggered) {
            keyboardControls.start({
                z: 60, rotateX: 8, scale: 0.9, rotateY: -382,
                transition: { type: 'spring', stiffness: 70, damping: 20 }
            });
        } else {
            keyboardControls.start({
                scale: 1.0,
                transition: { type: 'spring', stiffness: 70, damping: 20 }
            });
        }
    }, [hasTriggered, keyboardControls, isMobile]);

    const handleBoardMouseMove = useCallback((e) => {
        if (isMobile) return; // Mouse hover — skip on touch
        const board = keyboardRef.current;
        if (!board || tickingRef.current) return;
        const mx = e.clientX;
        const my = e.clientY;
        tickingRef.current = true;
        requestAnimationFrame(() => {
            if (!keyCapsRef.current) {
                keyCapsRef.current = Array.from(board.querySelectorAll('[data-key-id]'));
            }
            let hoveredId = null;
            for (const cap of keyCapsRef.current) {
                const rect = cap.getBoundingClientRect();
                if (mx >= rect.left && mx <= rect.right && my >= rect.top && my <= rect.bottom) {
                    hoveredId = cap.getAttribute('data-key-id');
                    break;
                }
            }
            if (hoveredId) {
                setActiveSkill(prev =>
                    prev?.id !== hoveredId
                        ? skillsData.find(s => s.id === hoveredId) ?? prev
                        : prev
                );
            }
            tickingRef.current = false;
        });
    }, [isMobile]);

    // Unified click/tap handler — works on both desktop and mobile
    const handleBoardClick = useCallback((e) => {
        const board = keyboardRef.current;
        if (!board) return;
        if (!keyCapsRef.current) {
            keyCapsRef.current = Array.from(board.querySelectorAll('[data-key-id]'));
        }

        // Get coordinates — support both mouse and touch events
        const touch = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
        const clientX = touch ? touch.clientX : e.clientX;
        const clientY = touch ? touch.clientY : e.clientY;

        for (const cap of keyCapsRef.current) {
            const rect = cap.getBoundingClientRect();
            if (clientX >= rect.left && clientX <= rect.right &&
                clientY >= rect.top && clientY <= rect.bottom) {
                cap.classList.add('key-pressed');
                setTimeout(() => cap.classList.remove('key-pressed'), 150);

                // On mobile: update activeSkill via tap
                if (isMobile) {
                    const tappedId = cap.getAttribute('data-key-id');
                    setActiveSkill(prev =>
                        prev?.id === tappedId ? null : skillsData.find(s => s.id === tappedId) ?? null
                    );
                }
                break;
            }
        }
    }, [isMobile]);

    const detailsOpacityValue = hasTriggered ? 1 : 0;
    const detailsXValue = hasTriggered ? 0 : -100;

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            id="expertise-content"
            className="relative z-30 w-full pt-20 pb-20 md:pt-24 md:pb-40 flex flex-col items-center justify-center selection:bg-indigo-500 selection:text-white bg-transparent pointer-events-auto overflow-hidden"
            style={{ contain: 'layout style', isolation: 'isolate' }}
        >
            <SectionHeader
                title={te.sectionTitle}
                subtitle={te.craftingDesc}
            />

            {/* ── Mobile Info Card (visible on mobile/tablet only, sticky below navbar) ── */}
            <div className="lg:hidden w-full max-w-md px-4 mb-6 sticky top-20 z-50">
                <motion.div
                    key={activeSkill?.id ?? 'default'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-slate-800/70 border border-white/10 rounded-2xl p-5"
                >
                    {activeSkill ? (
                        <>
                            {/* Badge */}
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-[2px] bg-gradient-to-r from-primary to-transparent rounded-full" />
                                <span className="text-[10px] font-mono text-primary/80 font-bold tracking-[0.25em] uppercase">ACTIVE SKILL</span>
                            </div>
                            {/* Name */}
                            <h2
                                className="text-3xl font-black uppercase leading-none tracking-wide mb-3"
                                style={{
                                    background: 'linear-gradient(135deg, #ffffff 0%, #94b8ff 50%, #0d7ff2 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                {activeSkill.label}
                            </h2>
                            <div className="h-px w-full bg-gradient-to-r from-primary/60 via-primary/20 to-transparent mb-4 rounded-full" />
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xl font-bold text-white font-mono">{activeSkill.level}%</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">{te.proficiencyLevel}</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-0.5">
                                        {Array(5).fill(0).map((_, i) => (
                                            <i key={i} className={`${i < activeSkill.stars ? 'fas' : 'far'} fa-star text-sm`} style={{ color: i < activeSkill.stars ? '#FACC15' : '#4B5563' }} />
                                        ))}
                                    </div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{te.masteryTier}</div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-primary text-sm">touch_app</span>
                                <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">Tap a key to explore</span>
                            </div>
                            <h2 className="text-2xl font-black text-white leading-tight uppercase">
                                {te.precision} <span className="text-primary italic">{te.software}</span> {te.engineering}
                            </h2>
                        </>
                    )}
                </motion.div>
            </div>

            <div className="w-full max-w-7xl px-4 md:px-12 flex flex-col md:flex-row items-center justify-center animation-container relative [perspective:2000px]">

                {/* ── Desktop Details Panel (hidden on mobile) ── */}
                <motion.div
                    animate={{
                        opacity: detailsOpacityValue,
                        x: detailsXValue,
                        y: hasTriggered ? 0 : 20
                    }}
                    transition={{ type: "spring", stiffness: 35, damping: 22 }}
                    className="details-panel hidden lg:flex flex-col gap-8 w-1/3 absolute left-12 z-20"
                >
                    <div className="space-y-5">
                        {/* Badge label */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-[2px] bg-gradient-to-r from-primary to-transparent rounded-full"></div>
                            <span className="text-[10px] font-mono text-primary/80 font-bold tracking-[0.25em] uppercase">
                                {activeSkill ? 'ACTIVE SKILL' : te.overview}
                            </span>
                        </div>

                        {/* Skill name display */}
                        <div className="relative min-h-[7rem] flex flex-col justify-center">
                            {activeSkill ? (
                                <div className="relative">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-1 h-6 bg-primary rounded-full shadow-[0_0_8px_rgba(13,127,242,0.8)]"></div>
                                        <div className="w-px h-4 bg-primary/40 rounded-full"></div>
                                    </div>
                                    <h2
                                        className="text-5xl font-black uppercase leading-none tracking-wide"
                                        style={{
                                            background: 'linear-gradient(135deg, #ffffff 0%, #94b8ff 50%, #0d7ff2 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                        }}
                                    >
                                        {activeSkill.label}
                                    </h2>
                                    <div className="mt-3 h-px w-full bg-gradient-to-r from-primary/80 via-primary/30 to-transparent rounded-full"></div>
                                    <div className="mt-0.5 h-px w-2/3 bg-gradient-to-r from-primary/30 to-transparent rounded-full"></div>
                                </div>
                            ) : (
                                <h2 className="text-4xl font-black text-white leading-tight uppercase font-sans">
                                    {te.precision} <br />
                                    <span className="text-primary italic">{te.software}</span> <br />
                                    {te.engineering}
                                </h2>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                        <div className="space-y-1">
                            <div className="text-2xl font-bold text-white font-mono h-8 flex items-center">
                                {activeSkill ? `${activeSkill.level}%` : '100+'}
                            </div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                                {activeSkill ? te.proficiencyLevel : te.componentsBuilt}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-1 h-8">
                                {activeSkill ? (
                                    Array(5).fill(0).map((_, i) => (
                                        <i key={i} className={`${i < activeSkill.stars ? 'fas' : 'far'} fa-star text-lg`} style={{ color: i < activeSkill.stars ? '#FACC15' : '#4B5563' }}></i>
                                    ))
                                ) : (
                                    <span className="text-2xl font-bold text-white font-mono">99.9%</span>
                                )}
                            </div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                                {activeSkill ? te.masteryTier : te.efficiencyRate}
                            </div>
                        </div>
                    </div>

                    <div className="p-5 bg-slate-800/70 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="material-symbols-outlined text-primary text-sm">terminal</span>
                            <span className="text-[10px] font-mono text-slate-300 tracking-widest uppercase">System Core</span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                            {'>'} Initializing module cluster... <br />
                            {'>'} Optimizing performance assets... <br />
                            {'>'} Security handshake complete.
                        </p>
                    </div>
                </motion.div>

                {/* ── Keyboard ── */}
                <motion.div
                    animate={isMobile ? { x: 0, y: 0, rotateY: 0, rotateX: 0, z: 0, scale: 1, rotate: 0 } : keyboardControls}
                    initial={{ x: 0, rotateY: 0, rotateX: 0, z: 0, scale: 1, rotate: 0 }}
                    style={{
                        transformOrigin: "center center",
                        transformStyle: isMobile ? "flat" : "preserve-3d",
                        willChange: isMobile ? 'auto' : 'transform'
                    }}
                    className="keyboard-wrapper relative z-40 w-full max-w-4xl flex justify-center scale-[0.88] xs:scale-[0.92] sm:scale-95 md:scale-[0.8] lg:scale-[0.9] xl:scale-[1.0] -mb-10 xs:-mb-8 sm:-mb-4 md:-mb-16 lg:-mb-6 xl:mb-0 mt-4 md:mt-8"
                    onMouseMove={handleBoardMouseMove}
                    onClick={handleBoardClick}
                    onTouchEnd={handleBoardClick}
                    onMouseEnter={handleKeyboardMouseEnter}
                    onMouseLeave={handleKeyboardMouseLeave}
                >
                    <motion.div
                        ref={keyboardRef}
                        variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            show: {
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    staggerChildren: 0.04,
                                    delayChildren: 0.1
                                }
                            }
                        }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="keyboard-base relative z-50 pointer-events-auto ring-1 ring-white/10 flex flex-col gap-6"
                    >
                        <div className="w-full">
                            <h3 className="text-xs font-mono text-slate-500 mb-2 pl-2 tracking-widest uppercase">FRONTEND UNIT</h3>
                            <div className="numpad-layout">
                                {skillsData.filter(s => ['html', 'css', 'js', 'react', 'nextjs', 'tailwind'].includes(s.id)).map((skill) => (
                                    <TechKey key={skill.id} skill={skill} isActive={activeSkill?.id === skill.id} />
                                ))}
                            </div>
                        </div>

                        <div className="w-full">
                            <h3 className="text-xs font-mono text-slate-500 mb-2 pl-2 tracking-widest uppercase">BACKEND MODULE</h3>
                            <div className="numpad-layout">
                                {skillsData.filter(s => ['php', 'python', 'node'].includes(s.id)).map((skill) => (
                                    <TechKey key={skill.id} skill={skill} isActive={activeSkill?.id === skill.id} />
                                ))}
                            </div>
                        </div>

                        <div className="w-full">
                            <h3 className="text-xs font-mono text-slate-500 mb-2 pl-2 tracking-widest uppercase">DATABASE STORAGE</h3>
                            <div className="numpad-layout">
                                {skillsData.filter(s => ['mongo', 'sqlite', 'supabase'].includes(s.id)).map((skill) => (
                                    <TechKey key={skill.id} skill={skill} isActive={activeSkill?.id === skill.id} />
                                ))}
                            </div>
                        </div>

                        <div className="w-full">
                            <h3 className="text-xs font-mono text-slate-500 mb-2 pl-2 tracking-widest uppercase">OPERATIONS / TOOLS</h3>
                            <div className="numpad-layout">
                                {skillsData.filter(s => ['docker', 'postman', 'n8n'].includes(s.id)).map((skill) => (
                                    <TechKey key={skill.id} skill={skill} isActive={activeSkill?.id === skill.id} />
                                ))}
                            </div>
                        </div>

                        <div className="mt-2 flex justify-between items-center px-6 py-4 border-t border-white/10 bg-[#0c0c0e] rounded-b-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            <div className="flex items-center gap-3">
                                <div className="relative w-2 h-2">
                                    <div className="absolute inset-0 rounded-full bg-emerald-500 animate-pulse"></div>
                                </div>
                                <span className="text-[0.7rem] font-mono text-emerald-500/90 uppercase tracking-[0.2em] font-bold">System Online</span>
                            </div>
                            <div className="text-[0.7rem] font-mono text-neutral-500 font-bold tracking-widest flex items-center gap-2">
                                <i className="fas fa-keyboard text-neutral-600"></i> PRO-TACTILE
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}


