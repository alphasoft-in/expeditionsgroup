import React from 'react';
import { motion } from 'framer-motion';

export default function PageHeader({ title, subtitle, image, className = "" }) {
    return (
        <div className={`relative w-full h-[50vh] sm:h-[60vh] md:h-[75vh] min-h-[300px] sm:min-h-[400px] overflow-hidden bg-black ${className}`}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
            >
                {/* Background Image */}
                <motion.div
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6, ease: "easeOut" }}
                    className="absolute inset-0"
                    style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                >
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover object-center"
                    />
                </motion.div>

                {/* Overlays matching Hero.jsx */}
                {/* 1. Base dark tint */}
                <div className="absolute inset-0 bg-black/20" />

                {/* 2. Top gradient for Navbar visibility */}
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/70 to-transparent" />

                {/* 3. Bottom gradient for Text legibility */}
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* 4. Subtle brand tint */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-8 pt-32 sm:pt-24">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-secondary mb-3 sm:mb-4 drop-shadow-2xl tracking-tight px-2 pb-2">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-[11px] sm:text-base md:text-lg text-light/90 max-w-3xl font-light tracking-wide leading-relaxed drop-shadow-lg px-2 sm:px-4">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
