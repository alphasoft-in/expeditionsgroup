import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
    const phoneNumber = "51996667974"; // Based on previous contact info
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hola,%20me%20gustaría%20recibir%20información%20sobre%20sus%20paquetes%20de%20viaje.`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group hover:bg-[#128C7E] transition-all duration-300"
            style={{
                boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)'
            }}
        >
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none"></span>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.584 3.914 1.592 5.392l-.999 3.646 3.896-.999zm11.387-5.464c-.074-.123-.272-.196-.57-.346-.297-.15-1.755-.867-2.027-.965-.271-.1-.47-.15-.668.15-.198.3-.767.965-.94 1.164-.173.199-.347.225-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.203-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
            </svg>

            {/* Tooltip on hover for desktop */}
            <span className="absolute right-full mr-4 bg-white text-slate-800 px-3 py-1.5 rounded-lg text-sm font-bold shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none hidden md:block">
                ¡Contáctanos ahora!
            </span>
        </motion.a>
    );
};

export default WhatsAppButton;
