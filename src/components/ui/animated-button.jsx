import React from 'react';
import { motion } from 'framer-motion';

// Simple utility to join classes
const cn = (...classes) => classes.filter(Boolean).join(' ');

export const AnimatedButton = ({
    children,
    className = '',
    variant = 'default',
    size = 'default',
    glow = false,
    textEffect = 'default',
    uppercase = false,
    rounded = 'custom',
    asChild = false,
    hideAnimations = false,
    shimmerColor = '#39FF14', // Default green
    shimmerSize = '1.5em',    // (Unused in new beam)
    shimmerDuration = '3s',   // Controls rotation speed
    borderRadius = '100px',
    background = 'rgba(0, 0, 0, 1)',
    ...props
}) => {
    // Determine base styles
    const baseStyles = cn(
        'relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer',
        uppercase ? 'uppercase' : '',
        rounded === 'full' ? 'rounded-full' : rounded === 'custom' ? '' : 'rounded-md',
        // We handle size via inner padding primarily, but base size sets font/padding too
        size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm',
        className // Allow override
    );

    // Size specific padding for the *inner* content container to match button sizes
    const innerPadding = size === 'sm' ? 'px-4 py-1' : size === 'lg' ? 'px-8 py-3' : 'px-6 py-2';

    // Rotation animation
    const beamVariants = {
        animate: {
            rotate: 360,
            transition: {
                repeat: Infinity,
                duration: parseFloat(shimmerDuration) || 3, // Default 3s
                ease: "linear",
            }
        }
    };

    return (
        <motion.button
            className={baseStyles}
            style={{
                borderRadius: borderRadius,
                // The glow is now handled by a separate element or box-shadow
                boxShadow: glow ? `0 0 25px 2px ${shimmerColor}80, 0 0 50px 0px ${shimmerColor}40` : 'none', // Increased glow
                background: 'transparent', // Let the inner layers handle BG
                padding: '2px', // Space for the border beam
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {/* 1. Rotating Conic Gradient Beam */}
            {!hideAnimations && (
                <motion.div
                    variants={beamVariants}
                    animate="animate"
                    className="absolute inset-[0] w-[200%] h-[200%] top-[-50%] left-[-50%]"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, ${shimmerColor} 60deg, transparent 120deg)`,
                        filter: 'blur(5px)', // Soften the beam
                    }}
                />
            )}
            {!hideAnimations && (
                // Sharper beam on top
                <motion.div
                    variants={beamVariants}
                    animate="animate"
                    className="absolute inset-[0] w-[200%] h-[200%] top-[-50%] left-[-50%]"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, ${shimmerColor} 60deg, transparent 120deg)`,
                    }}
                />
            )}

            {/* 2. Inner Black Background (Mask) */}
            <div
                className={cn("relative z-10 w-full h-full bg-black flex items-center justify-center", innerPadding)}
                style={{ borderRadius: `calc(${borderRadius} - 2px)` }}
            >
                {/* Content */}
                <span className="relative z-10 flex items-center gap-2 text-white">
                    {children}
                </span>
            </div>

        </motion.button>
    );
};
