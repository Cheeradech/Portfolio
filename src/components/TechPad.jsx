import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const skillsData = [
    { id: 'html', label: 'HTML5', colorClass: 'color-html', icon: <i className="fab fa-html5 tech-icon text-5xl"></i> },
    { id: 'css', label: 'CSS3', colorClass: 'color-css', icon: <i className="fab fa-css3-alt tech-icon text-5xl"></i> },
    { id: 'js', label: 'JavaScript', colorClass: 'color-js', icon: <i className="fab fa-js tech-icon text-5xl"></i> },
    { id: 'react', label: 'React', colorClass: 'color-react', icon: <i className="fab fa-react tech-icon text-5xl animate-[spin_12s_linear_infinite]"></i> },
    {
        id: 'tailwind', label: 'Tailwind CSS', colorClass: 'color-tailwind',
        icon: (
            <svg className="w-12 h-12 tech-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
            </svg>
        )
    },
    { id: 'php', label: 'PHP', colorClass: 'color-php', icon: <i className="fab fa-php tech-icon text-4xl"></i> },
    { id: 'python', label: 'Python', colorClass: 'color-python', icon: <i className="fab fa-python tech-icon text-5xl"></i> },
    { id: 'node', label: 'NodeJS', colorClass: 'color-node', icon: <i className="fab fa-node-js tech-icon text-5xl"></i> },
    { id: 'docker', label: 'Docker', colorClass: 'color-docker', icon: <i className="fab fa-docker tech-icon text-5xl"></i> },
    { id: 'mongo', label: 'MongoDB', colorClass: 'color-mongo', icon: <i className="fas fa-leaf tech-icon text-4xl"></i> },
    {
        id: 'sqlite', label: 'SQLite', colorClass: 'color-sqlite',
        icon: (
            <div className="flex flex-col items-center justify-center gap-1">
                <svg className="w-10 h-10 tech-icon text-[#3b95ff]" fill="currentColor" viewBox="0 0 64 64">
                    <path d="M57.6,18.5c-4.4-6.4-11.2-10.4-16-12.7C55.6,2.2,56,5.8,51.8,9.4c-3.8,3.2-12.8,2.3-17.8,6.6C26.5,22.4,26.8,32.2,27,39.9 c0.1,2.5,0.4,5,1.2,7.3c-2.4-0.3-4.9-0.9-7.2-1.8c-12-4.5-17.3-13.6-17.3-13.6l-2.4,4.2c0,0,5.8,11.8,20.4,17.3 c3.4,1.3,7,2.1,10.6,2.5c11.6,1.2,19.9-7.2,23.3-10.8c2.9-3.1,6.8-9.6,7.5-13.8C63.6,28.2,62,24.9,57.6,18.5z"></path>
                    <path d="M37.8,47.8c-0.8-2.3-1.1-4.8-1.2-7.3c-0.2-7.7-0.5-17.5,7-23.9c2.3-1.9,5.2-3,7.9-3.4c-2.8-5-7.4-7.9-10.3-9.3 c-0.6-0.3-1.3-0.5-2-0.6c-4.2-0.8-7.7,1.8-8.5,2.5c-4.4,3.7-6.8,8.2-7.4,13.6c-0.6,5.1,1.2,16.5,12.8,26.4c0.5,0.4,1,0.9,1.5,1.3 C37.6,47.4,37.7,47.6,37.8,47.8z"></path>
                </svg>
                <span className="text-[0.6rem] font-black tracking-widest leading-none tech-icon text-[#3b95ff]">SQLITE</span>
            </div>
        )
    },
    { id: 'postman', label: 'Postman', colorClass: 'color-postman', icon: <i className="fas fa-space-shuttle tech-icon text-4xl transform -rotate-45"></i> },
    { id: 'n8n', label: 'n8n', colorClass: 'color-n8n', icon: <span className="font-black text-3xl tech-icon tracking-tighter">n8n</span> },
];

export default function TechPad() {
    const containerRef = useRef(null);
    const keyboardRef = useRef(null);
    const [hasTriggered, setHasTriggered] = React.useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Handle persistent trigger - lower threshold for more immediate response
    React.useEffect(() => {
        const unsubscribe = scrollYProgress.onChange(v => {
            if (v > 0.42) setHasTriggered(true);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    // Desktop Transformations (Fluid mapping for details) - Now using hasTriggered for persistence
    const detailsOpacityValue = hasTriggered ? 1 : 0;
    const detailsXValue = hasTriggered ? 0 : -100;

    const handleBoardClick = (e) => {
        const board = keyboardRef.current;
        if (!board) return;
        const clickX = e.clientX;
        const clickY = e.clientY;
        const keyCaps = board.querySelectorAll('[data-key-id]');
        for (const cap of keyCaps) {
            const rect = cap.getBoundingClientRect();
            if (clickX >= rect.left && clickX <= rect.right && clickY >= rect.top && clickY <= rect.bottom) {
                const label = cap.getAttribute('data-key-label');
                handleKeyClick(label);
                cap.classList.add('key-pressed');
                setTimeout(() => cap.classList.remove('key-pressed'), 150);
                break;
            }
        }
    };

    const handleBoardMouseMove = (e) => {
        const board = keyboardRef.current;
        if (!board) return;
        const keyCaps = board.querySelectorAll('[data-key-id]');
        keyCaps.forEach(cap => {
            const rect = cap.getBoundingClientRect();
            const isOver = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
            if (isOver) cap.classList.add('key-hovered');
            else cap.classList.remove('key-hovered');
        });
    };

    const handleBoardMouseLeave = () => {
        const board = keyboardRef.current;
        if (!board) return;
        board.querySelectorAll('[data-key-id]').forEach(cap => cap.classList.remove('key-hovered'));
    };

    const handleKeyClick = (label) => {
        console.log(`Actuated: ${label}`);
    };

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            id="expertise-content"
            className="relative z-30 w-full pt-20 pb-20 md:pt-24 md:pb-40 flex flex-col items-center justify-center font-['Inter',_sans-serif] selection:bg-indigo-500 selection:text-white bg-transparent pointer-events-auto overflow-hidden"
        >
            <style dangerouslySetInnerHTML={{
                __html: `
        .perspective-1200 { perspective: 1000px; }

        .keyboard-base {
            background: linear-gradient(175deg, #1a1a1c 0%, #0d0d0f 100%);
            box-shadow: 
                0 50px 100px -20px rgba(0,0,0,0.9),
                0 0 0 2px rgba(255,255,255,0.03) inset,
                0 20px 40px rgba(0,0,0,0.6),
                0 0 0 1px #000;
            border-radius: 20px;
            padding: 16px;
            transform-style: preserve-3d;
            border-bottom: 12px solid #050506;
            position: relative;
            cursor: pointer;
        }
        .numpad-layout {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 12px;
            padding: 12px;
            background: #111113;
            border-radius: 12px;
            box-shadow: 
                inset 0 2px 10px rgba(0,0,0,0.8),
                inset 0 0 0 1px rgba(255,255,255,0.02),
                0 1px 0 rgba(255,255,255,0.05);
            transform-style: preserve-3d;
        }
        .key-wrapper {
            position: relative;
            width: 82px;
            height: 82px;
            transform-style: preserve-3d;
        }
        .key-cap {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.1s cubic-bezier(0.2, 0.6, 0.3, 1);
            cursor: pointer;
            pointer-events: none;
        }
        .key-hovered { transform: translateY(-4px) !important; }
        .key-pressed  { transform: translateY(6px)  !important; }
        .key-pressed .key-top {
            box-shadow: inset 0 3px 8px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.5) !important;
        }
        .key-side {
            position: absolute;
            width: 100%; height: 100%;
            background-color: #1a1a1d;
            border-radius: 12px;
            transform: translateZ(0);
            box-shadow: 0 12px 20px -6px rgba(0,0,0,0.8), 0 4px 8px -2px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05);
            border-bottom: 4px solid #000;
            pointer-events: none;
        }
        .key-top {
            position: absolute;
            inset: 3px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(180deg, #2a2a2e 0%, #18181a 100%);
            transform: translateZ(12px);
            transition: background 0.15s, transform 0.1s;
            box-shadow: inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -2px 5px rgba(0,0,0,0.4), 0 4px 6px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.8);
            border: 1px solid rgba(0,0,0,0.5);
            border-top: 1px solid rgba(255,255,255,0.1);
            pointer-events: none;
        }
        .key-top::before {
            content: '';
            position: absolute; inset: 6px;
            border-radius: 50%;
            background: radial-gradient(circle at 50% 50%, rgba(0,0,0,0.3) 0%, transparent 70%);
            box-shadow: inset 0 2px 6px rgba(0,0,0,0.5);
            z-index: 1; pointer-events: none;
        }
        .tech-icon {
            transform: translateZ(1px); z-index: 10; position: relative;
            filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5)); pointer-events: none;
        }
        .color-html .key-top { color: #ff6a3d; border-bottom: 2px solid #a3360b; }
        .color-html.key-hovered .key-top { background: linear-gradient(180deg, #3a2a26 0%, #251a17 100%); }
        .color-html i { text-shadow: 0 0 2px #ff4500; }
        .color-css .key-top { color: #4facfe; border-bottom: 2px solid #074e8c; }
        .color-css.key-hovered .key-top { background: linear-gradient(180deg, #1e2a36 0%, #10161d 100%); }
        .color-css i { text-shadow: 0 0 2px #0056b3; }
        .color-js .key-top { color: #f7df1e; border-bottom: 2px solid #8f7f00; }
        .color-js.key-hovered .key-top { background: linear-gradient(180deg, #363320 0%, #1f1d10 100%); }
        .color-js i { text-shadow: 0 0 2px #bfa600; }
        .color-react .key-top { color: #00d8ff; border-bottom: 2px solid #006da3; }
        .color-react.key-hovered .key-top { background: linear-gradient(180deg, #1a2f36 0%, #0e181c 100%); }
        .color-react i { text-shadow: 0 0 2px #008caf; }
        .color-tailwind .key-top { color: #38bdf8; border-bottom: 2px solid #0e7490; }
        .color-tailwind.key-hovered .key-top { background: linear-gradient(180deg, #1a2d36 0%, #0e171c 100%); }
        .color-tailwind svg { filter: drop-shadow(0 0 1px #0ea5e9); }
        .color-php .key-top { color: #a074fc; border-bottom: 2px solid #4f3391; }
        .color-php.key-hovered .key-top { background: linear-gradient(180deg, #2a203d 0%, #161021 100%); }
        .color-php i { text-shadow: 0 0 2px #6848aa; }
        .color-python .key-top { color: #3776ab; border-bottom: 2px solid #164066; }
        .color-python.key-hovered .key-top { background: linear-gradient(180deg, #1e2833 0%, #0f151c 100%); }
        .color-python i { background: -webkit-linear-gradient(#3776ab, #ffd343); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 1px 1px rgba(0,0,0,0.5)); }
        .color-git .key-top { color: #f05032; border-bottom: 2px solid #8f1f0a; }
        .color-git.key-hovered .key-top { background: linear-gradient(180deg, #362220 0%, #1f1210 100%); }
        .color-git i { text-shadow: 0 0 2px #c92c0e; }
        .color-docker .key-top { color: #2496ed; border-bottom: 2px solid #0b4d80; }
        .color-docker.key-hovered .key-top { background: linear-gradient(180deg, #1a2636 0%, #0e141c 100%); }
        .color-docker i { text-shadow: 0 0 2px #106096; }
        .color-mongo .key-top { color: #00ed64; border-bottom: 2px solid #00702e; }
        .color-mongo.key-hovered .key-top { background: linear-gradient(180deg, #1a3622 0%, #0e1c12 100%); }
        .color-mongo i { text-shadow: 0 0 2px #00a344; }
        .color-sqlite .key-top { color: #3b95ff; border-bottom: 2px solid #003b6e; }
        .color-sqlite.key-hovered .key-top { background: linear-gradient(180deg, #1a2836 0%, #0e151c 100%); }
        .color-sqlite svg { filter: drop-shadow(0 0 1px #0066b3); }
        .color-node .key-top { color: #83cd29; border-bottom: 2px solid #3e6e08; }
        .color-node.key-hovered .key-top { background: linear-gradient(180deg, #25361a 0%, #131c0e 100%); }
        .color-node i { text-shadow: 0 0 2px #5a9117; }
        .color-postman .key-top { color: #ff6c37; border-bottom: 2px solid #9c330e; }
        .color-postman.key-hovered .key-top { background: linear-gradient(180deg, #362520 0%, #1f1410 100%); }
        .color-postman i { text-shadow: 0 0 2px #cc4b1f; }
        .color-n8n .key-top { color: #ff4d88; border-bottom: 2px solid #94113e; }
        .color-n8n.key-hovered .key-top { background: linear-gradient(180deg, #362028 0%, #1f1014 100%); }
        .color-n8n span { text-shadow: 0 0 2px #b31d4e; }
        @media (max-width: 768px) {
            .numpad-layout { grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 10px; }
            .key-wrapper { width: 64px; height: 64px; }
            .animation-container { flex-direction: column !important; }
            .details-panel { width: 100% !important; margin-bottom: 2rem; position: relative !important; left: 0 !important; opacity: 1 !important; transform: none !important; }
            .keyboard-wrapper { transform: none !important; width: 100% !important; margin-bottom: 0 !important; }
        }
      `}} />

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full py-4 text-center relative z-10 flex flex-col items-center mb-0 md:mb-4 mt-0"
            >
                <h1 className="text-5xl md:text-6xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-300 to-neutral-500 uppercase font-sans drop-shadow-xl">
                    SKILLS
                </h1>
                <p className="text-[10px] md:text-xs text-neutral-500 font-bold tracking-[0.3em] font-mono uppercase">
                    // MACRO PAD INTERFACE V4.0 //
                </p>
            </motion.header>

            <div className="w-full max-w-7xl px-4 md:px-12 flex flex-col md:flex-row items-center justify-center animation-container relative [perspective:2000px]">

                {/* Information Details Panel (Revealed on Scroll) */}
                <motion.div
                    animate={{
                        opacity: detailsOpacityValue,
                        x: detailsXValue,
                        y: hasTriggered ? 0 : 20
                    }}
                    transition={{ type: "spring", stiffness: 40, damping: 20 }}
                    className="details-panel hidden md:flex flex-col gap-8 w-1/3 absolute left-12 z-20"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-1 bg-primary"></div>
                            <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase">Expertise Overview</span>
                        </div>
                        <h2 className="text-4xl font-black text-white leading-tight uppercase font-sans">
                            Precision <br />
                            <span className="text-primary italic">Software</span> <br />
                            Engineering
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed font-light">
                            Crafting modular, high-performance systems with a focus on tactile user experience and robust architecture.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                        <div className="space-y-1">
                            <div className="text-2xl font-bold text-white font-mono">100+</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Components Built</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-2xl font-bold text-white font-mono">99.9%</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Efficiency Rate</div>
                        </div>
                    </div>

                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
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

                <motion.div
                    animate={{
                        x: hasTriggered ? 380 : 0,
                        rotateY: hasTriggered ? -22 : 0,
                        rotateX: hasTriggered ? 8 : 0,
                        z: hasTriggered ? 60 : 0,
                        scale: hasTriggered ? 0.9 : 1.0 // Increased scale
                    }}
                    whileHover={hasTriggered ? { z: 80, rotateY: -18, rotateX: 6, scale: 0.92 } : { scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 45, damping: 18 }}
                    style={{ transformOrigin: "center center", transformStyle: "preserve-3d" }}
                    className="keyboard-wrapper relative z-40 w-full max-w-4xl flex justify-center scale-[0.75] sm:scale-90 md:scale-[0.8] lg:scale-[0.9] xl:scale-[1.0] -mb-20 sm:-mb-6 md:-mb-16 lg:-mb-6 xl:mb-0 mt-4 md:mt-8"
                    onClick={handleBoardClick}
                    onMouseMove={handleBoardMouseMove}
                    onMouseLeave={handleBoardMouseLeave}
                >
                    <motion.div
                        ref={keyboardRef}
                        variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            show: {
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    staggerChildren: 0.2,
                                    delayChildren: 0.4
                                }
                            }
                        }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="keyboard-base relative z-50 pointer-events-auto ring-1 ring-white/10 flex flex-col gap-6"
                    >

                        {/* FRONTEND */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 }
                            }}
                            className="w-full"
                        >
                            <h3 className="text-xs font-mono text-slate-500 mb-2 pl-2 tracking-widest uppercase">FRONTEND UNIT</h3>
                            <div className="numpad-layout">
                                {skillsData.filter(s => ['html', 'css', 'js', 'react', 'tailwind'].includes(s.id)).map((skill) => (
                                    <div key={skill.id} className="key-wrapper">
                                        <div data-key-id={skill.id} data-key-label={skill.label} aria-label={skill.label} className={`key-cap ${skill.colorClass}`} role="button">
                                            <div className="key-side"></div>
                                            <div className="key-top">{skill.icon}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* BACKEND */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 }
                            }}
                            className="w-full"
                        >
                            <h3 className="text-xs font-mono text-slate-500 mb-2 pl-2 tracking-widest uppercase">BACKEND MODULE</h3>
                            <div className="numpad-layout">
                                {skillsData.filter(s => ['php', 'python', 'node'].includes(s.id)).map((skill) => (
                                    <div key={skill.id} className="key-wrapper">
                                        <div data-key-id={skill.id} data-key-label={skill.label} aria-label={skill.label} className={`key-cap ${skill.colorClass}`} role="button">
                                            <div className="key-side"></div>
                                            <div className="key-top">{skill.icon}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* DATABASE */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 }
                            }}
                            className="w-full"
                        >
                            <h3 className="text-xs font-mono text-slate-500 mb-2 pl-2 tracking-widest uppercase">DATABASE STORAGE</h3>
                            <div className="numpad-layout">
                                {skillsData.filter(s => ['mongo', 'sqlite'].includes(s.id)).map((skill) => (
                                    <div key={skill.id} className="key-wrapper">
                                        <div data-key-id={skill.id} data-key-label={skill.label} aria-label={skill.label} className={`key-cap ${skill.colorClass}`} role="button">
                                            <div className="key-side"></div>
                                            <div className="key-top">{skill.icon}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* TOOLS */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 }
                            }}
                            className="w-full"
                        >
                            <h3 className="text-xs font-mono text-slate-500 mb-2 pl-2 tracking-widest uppercase">OPERATIONS / TOOLS</h3>
                            <div className="numpad-layout">
                                {skillsData.filter(s => ['docker', 'postman', 'n8n'].includes(s.id)).map((skill) => (
                                    <div key={skill.id} className="key-wrapper">
                                        <div data-key-id={skill.id} data-key-label={skill.label} aria-label={skill.label} className={`key-cap ${skill.colorClass}`} role="button">
                                            <div className="key-side"></div>
                                            <div className="key-top">{skill.icon}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Footer Status Bar */}
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
