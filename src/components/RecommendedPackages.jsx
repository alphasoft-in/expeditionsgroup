import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PackageModal from './PackageModal';

export default function RecommendedPackages({ packages }) {
    const [selectedPackage, setSelectedPackage] = useState(null);

    return (
        <section id="paquetes" className="py-20 bg-light relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-[0.03] pointer-events-none select-none hidden lg:block">
                <svg width="600" height="600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M0 50L50 0L100 50L50 100L0 50Z" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M10 50L50 10L90 50L50 90L10 50Z" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.2" />
                    <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.2" />
                </svg>
            </div>

            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 opacity-[0.05] pointer-events-none select-none hidden lg:block">
                <svg width="500" height="500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-secondary">
                    <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" stroke="currentColor" strokeWidth="0.5" />
                    <rect x="30" y="30" width="40" height="40" transform="rotate(45 50 50)" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
                </svg>
            </div>

            <div className="container mx-auto px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-primary mb-4"
                    >
                        Paquetes <span className="text-secondary">Recomendados</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-accent/80 max-w-2xl mx-auto"
                    >
                        Vive experiencias únicas con Expeditions Group, tu mejor elección para viajes en pareja, familia o con amigos.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            viewport={{ once: true, margin: "100px" }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-secondary/10 flex flex-col h-full"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden shrink-0 bg-slate-100">
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1 group-hover:text-secondary transition-colors">
                                    {pkg.title}
                                </h3>
                                <p className="text-accent/70 text-sm mb-6 line-clamp-2 flex-grow">
                                    {pkg.description}
                                </p>
                                <div className="flex flex-col gap-3 mt-auto">
                                    <button
                                        id={`btn-details-${pkg.slug}`}
                                        onClick={() => setSelectedPackage(pkg)}
                                        aria-label={`Ver detalles del paquete ${pkg.title}`}
                                        className="w-full py-3 bg-white border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-lg hover:shadow-primary/20"
                                    >
                                        Ver Detalles
                                    </button>
                                    <a
                                        id={`btn-whatsapp-${pkg.slug}`}
                                        href={`https://wa.me/51996667974?text=Hola,%20me%20gustaría%20consultar%20sobre%20el%20paquete%20${encodeURIComponent(pkg.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Consultar sobre el paquete ${pkg.title} por WhatsApp`}
                                        className="w-full py-3 bg-secondary text-white text-center font-bold rounded-xl hover:bg-secondary/90 transition-all shadow-sm hover:shadow-lg hover:shadow-secondary/20 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Consultar Paquete
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <PackageModal
                isOpen={!!selectedPackage}
                onClose={() => setSelectedPackage(null)}
                packageData={selectedPackage}
            />
        </section>
    );
}
