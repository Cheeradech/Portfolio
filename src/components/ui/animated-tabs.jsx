import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TabsContext = createContext(null);

export const Tabs = ({ defaultValue, value, onValueChange, className = "", children }) => {
    const [activeTab, setActiveTab] = useState(value || defaultValue);

    useEffect(() => {
        if (value !== undefined) {
            setActiveTab(value);
        }
    }, [value]);

    const handleTabChange = (newValue) => {
        if (value === undefined) {
            setActiveTab(newValue);
        }
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <TabsContext.Provider value={{ activeTab, handleTabChange }}>
            <div className={`relative w-full ${className}`}>{children}</div>
        </TabsContext.Provider>
    );
};

export const TabsList = ({ className = "", children }) => {
    return (
        <div className={`relative flex p-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full ${className}`}>
            {children}
        </div>
    );
};

export const TabsTrigger = ({ value, children, className = "", onClick, ...props }) => {
    const { activeTab, handleTabChange } = useContext(TabsContext);
    const isActive = activeTab === value;

    const handleClick = (e) => {
        handleTabChange(value);
        if (onClick) onClick(e);
    };

    return (
        <button
            onClick={handleClick}
            {...props}
            className={`relative px-6 py-2 text-sm font-medium transition-colors duration-300 z-10 cursor-pointer ${isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                } ${className}`}
        >
            {isActive && (
                <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-full z-[-1]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            {children}
        </button>
    );
};

export const TabsContent = ({ value, children, className = "" }) => {
    const { activeTab } = useContext(TabsContext);

    return (
        <AnimatePresence mode="wait">
            {activeTab === value && (
                <motion.div
                    key={value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-4 ${className}`}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
