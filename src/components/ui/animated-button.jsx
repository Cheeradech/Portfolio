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
    textEffect = 'normal',
    uppercase = false,
    rounded = 'custom',
    asChild = false,
    hideAnimations = false,
    shimmerColor = '#ffffff',
    shimmerSize = '0.15em',
    shimmerDuration = '3s',
    borderRadius = '100px',
    background = 'rgba(0, 0, 0, 1)',
    ...props
}) => {
    // Determine base styles
    const baseStyles = cn(
        'relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer',
        uppercase ? 'uppercase' : '',
        rounded === 'full' ? 'rounded-full' : rounded === 'custom' ? '' : 'rounded-md',
        size === 'sm' ? 'px-4 py-1 text-xs' : size === 'lg' ? 'px-8 py-3 text-lg' : 'px-6 py-2 text-sm',
        className // Allow override
    );

    // Shimmer animation variants
    const shimmerVariants = {
        initial: { x: '-100%' },
        animate: {
            x: '200%',
            transition: {
                repeat: Infinity,
                duration: parseFloat(shimmerDuration),
                ease: "linear",
                repeatDelay: 0.5
            }
        }
    };

    return (
        <motion.button
            className={baseStyles}
            style={{
                borderRadius: borderRadius,
                background: background,
                boxShadow: glow ? `0 0 20px ${shimmerColor}40` : 'none',
                border: `1px solid ${shimmerColor}40`
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {/* Background Glow/Shimmer Element */}
            {!hideAnimations && (
                <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${shimmerColor}40, transparent)`,
                        transform: 'skewX(-20deg)',
                        width: '50%'
                    }}
                />
            )}

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>

            {/* Border Glow (Optional) */}
            {glow && (
                <div className="absolute inset-0 rounded-[inherit] ring-1 ring-white/10 pointer-events-none"></div>
            )}
        </motion.button>
    );
};
