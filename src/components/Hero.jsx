import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import royalDecameronImg from '../assets/slides/royal-decameron.png?url';
import cuscoMagicoImg from '../assets/slides/cusco-magico.png?url';
import puntaCanaImg from '../assets/slides/punta-cana.png?url';
import sanAndresImg from '../assets/slides/san-andres.png?url';
import cartagenaDeIndiasImg from '../assets/slides/cartagena-de-indias.png?url';

const slides = [
    {
        id: 1,
        title: "Royal Decameron",
        subtitle: "Todo incluido para tu relajación total",
        image: royalDecameronImg // Local asset
    },
    {
        id: 2,
        title: "Cusco Mágico",
        subtitle: "Descubre la historia de los Incas",
        image: cuscoMagicoImg // Machu Picchu
    },
    {
        id: 3,
        title: "Punta Cana",
        subtitle: "El paraíso en República Dominicana",
        image: puntaCanaImg // Caribbean Beach
    },
    {
        id: 4,
        title: "San Andrés",
        subtitle: "El mar de los siete colores te espera",
        image: sanAndresImg // Colombia Island
    },
    {
        id: 5,
        title: "Cartagena de Indias",
        subtitle: "Encanto colonial y brisa marina",
        image: cartagenaDeIndiasImg // Cartagena Colorful Streets
    }
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <AnimatePresence>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 6, ease: "easeOut" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Static Overlays - Outside AnimatePresence to prevent flicker/ghosting */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-secondary mb-4 md:mb-6 drop-shadow-2xl tracking-tight px-2">
                            {slides[current].title}
                        </h1>
                        <p className="text-base sm:text-lg md:text-3xl text-light/90 mb-8 md:mb-10 max-w-sm md:max-w-3xl font-light tracking-wide leading-relaxed drop-shadow-lg px-4">
                            {slides[current].subtitle}
                        </p>
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-6 sm:px-0"
                >
                    {/* Secondary Action: Glassmorphism Gold */}
                    <button className="relative w-full sm:w-auto px-8 py-3 md:py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full overflow-hidden group transition-all hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(218,165,33,0.3)]">
                        <span className="relative z-10 group-hover:text-secondary transition-colors">Ver Detalles</span>
                        <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>

                    {/* Primary Action: Red Glow Gradient */}
                    <button className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-tertiary to-red-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(209,46,46,0.4)] hover:shadow-[0_0_60px_rgba(209,46,46,0.6)] border border-white/10">
                        Reservar Ahora
                    </button>
                </motion.div>

                {/* Indicators */}
                <div className="absolute bottom-10 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? "bg-tertiary w-8" : "bg-white/50 hover:bg-white"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
