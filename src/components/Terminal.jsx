import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const terminalLines = [
    { text: 'num = "Helloworld"', type: "normal" },
    { text: 'Helloworld ("Print")', type: "normal" },
    { text: "", type: "normal" },
    { text: "Traceback (most recent call last):", type: "error" },
    { text: '  File "main.py", line 2, in <module>', type: "error" },
    { text: '    Helloworld ("Print")', type: "error" },
    { text: "NameError: name 'Helloworld' is not defined", type: "error" },
];

const renderTerminalLine = (text, type) => {
    if (type === "error") return text;
    const regex = /(num|"Helloworld"|"Print"|Helloworld|=|\(|\)|\s+)/g;
    const parts = text.split(regex);
    return parts.filter(Boolean).map((part, index) => {
        if (part === 'num') return <span key={index} style={{ color: '#7CFC00' }}>{part}</span>;
        if (part === '=') return <span key={index} style={{ color: '#E6E6E6' }}>{part}</span>;
        if (part === '"Helloworld"') return <span key={index} style={{ color: '#FFC857' }}>{part}</span>;
        if (part === 'Helloworld') return <span key={index} style={{ color: '#4FC1FF' }}>{part}</span>;
        if (part === '"Print"') return <span key={index} style={{ color: '#C792EA' }}>{part}</span>;
        if (part === '(' || part === ')') return <span key={index} style={{ color: '#E6E6E6' }}>{part}</span>;
        if (part.trim() === '') return <span key={index}>{part}</span>;
        if ('num'.startsWith(part)) return <span key={index} style={{ color: '#7CFC00' }}>{part}</span>;
        if ('Helloworld'.startsWith(part)) return <span key={index} style={{ color: '#4FC1FF' }}>{part}</span>;
        if ('"Helloworld"'.startsWith(part)) return <span key={index} style={{ color: '#FFC857' }}>{part}</span>;
        if ('"Print"'.startsWith(part)) return <span key={index} style={{ color: '#C792EA' }}>{part}</span>;
        return <span key={index}>{part}</span>;
    });
};

const Terminal = ({ itemVariants }) => {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentLine, setCurrentLine] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        if (lineIndex >= terminalLines.length) return;

        if (charIndex < terminalLines[lineIndex].text.length) {
            const timeout = setTimeout(() => {
                setCurrentLine((prev) => prev + terminalLines[lineIndex].text[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 20);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => [
                    ...prev,
                    { text: currentLine, type: terminalLines[lineIndex].type },
                ]);
                setCurrentLine("");
                setCharIndex(0);
                setLineIndex((prev) => prev + 1);
            }, 350);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, lineIndex, currentLine]);

    return (
        <motion.div variants={itemVariants}
            className="terminal-box w-full p-4 lg:p-5 rounded-xl font-mono relative overflow-hidden"
            style={{
                background: "rgba(10,10,12,0.8)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0,255,200,0.25)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.7), 0 0 20px rgba(0,255,200,0.1), inset 0 0 10px rgba(0,255,200,0.05)",
                perspective: "1000px",
                pointerEvents: "auto"
            }}
        >
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "25px",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
                pointerEvents: "none",
            }} />
            <div className="flex gap-1.5 mb-2 relative z-10">
                <div className="w-2.5 h-2.5 bg-[#ff5f56] rounded-full" />
                <div className="w-2.5 h-2.5 bg-[#ffbd2e] rounded-full" />
                <div className="w-2.5 h-2.5 bg-[#27c93f] rounded-full" />
            </div>
            <div className="text-left text-[10px] sm:text-[11px] xl:text-xs leading-[1.6] break-words relative z-10 bg-transparent">
                {displayedLines.map((line, i) => (
                    <p key={i} className="my-0.5 whitespace-pre-wrap tracking-wide"
                        style={{
                            color: line.type === "error" ? "#ff4d4d" : "#00ff99",
                            textShadow: line.type === "error" ? "0 0 5px rgba(255,0,0,0.6)" : "0 0 5px currentColor",
                        }}
                    >
                        {renderTerminalLine(line.text, line.type)}
                    </p>
                ))}
                {lineIndex < terminalLines.length && (
                    <p className="my-0.5 whitespace-pre-wrap tracking-wide"
                        style={{
                            color: terminalLines[lineIndex].type === "error" ? "#ff4d4d" : "#00ff99",
                            textShadow: terminalLines[lineIndex].type === "error" ? "0 0 5px rgba(255,0,0,0.6)" : "0 0 5px currentColor",
                        }}
                    >
                        {renderTerminalLine(currentLine, terminalLines[lineIndex].type)}
                        <span className="terminal-cursor inline-block w-1.5 bg-current ml-1" style={{ height: '0.8em', verticalAlign: 'middle' }}></span>
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default Terminal;
