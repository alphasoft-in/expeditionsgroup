import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PackageModal({ isOpen, onClose, packageData }) {
    if (!packageData) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden relative pointer-events-auto flex flex-col"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Header Image */}
                            <div className="h-64 shrink-0 relative">
                                <img
                                    src={packageData.image}
                                    alt={packageData.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                                                Paquete Todo Incluido
                                            </span>
                                            <h2 className="text-3xl font-bold text-white mb-1">{packageData.title}</h2>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto p-8 custom-scrollbar">
                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-primary mb-3">Descripción</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {packageData.description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                        Itinerario Detallado
                                    </h3>

                                    <div className="space-y-8 pl-4 border-l-2 border-slate-100">
                                        {packageData.itinerary?.map((item) => (
                                            <div key={item.day} className="relative group">
                                                {/* Timeline Dot */}
                                                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 group-hover:bg-secondary transition-colors ring-4 ring-white" />

                                                <h4 className="text-md font-bold text-slate-800 mb-1 flex items-center gap-2">
                                                    <span className="text-secondary">Día {item.day}:</span> {item.title}
                                                </h4>
                                                <p className="text-sm text-slate-500 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                                    <p className="text-xs text-slate-400 mb-4">* Precios sujetos a cambios y disponibilidad. Aplican términos y condiciones.</p>
                                    <a
                                        href="https://wa.me/51996667974"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                        </svg>
                                        Reservar por WhatsApp
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
