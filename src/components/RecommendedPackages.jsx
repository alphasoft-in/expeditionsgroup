import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { packages } from '../data/packages.js';
import PackageModal from './PackageModal';

export default function RecommendedPackages() {
    const [selectedPackage, setSelectedPackage] = useState(null);

    return (
        <section className="py-20 bg-light">
            <div className="container mx-auto px-4">
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
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-secondary/10 flex flex-col h-full"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden shrink-0">
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                                <button
                                    onClick={() => setSelectedPackage(pkg)}
                                    className="w-full py-3 bg-white border-2 border-primary text-primary font-bold rounded-xl hover:bg-tertiary hover:border-tertiary hover:text-white transition-all shadow-sm hover:shadow-lg hover:shadow-tertiary/20 mt-auto"
                                >
                                    Ver Detalles
                                </button>
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
