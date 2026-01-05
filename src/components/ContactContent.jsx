import React from 'react';
import { motion } from 'framer-motion';

export default function ContactContent() {
    return (
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 py-12 sm:py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">

                {/* Contact Info Column */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="relative">
                        <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-3 block pl-1">
                            Contáctanos
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight max-w-[280px] sm:max-w-none">
                            Estamos para <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ayudarte</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light max-w-md">
                            ¿Tienes planes de viaje? Nuestro equipo de expertos está listo para diseñar la experiencia perfecta para ti.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Address */}
                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-slate-100 border border-slate-50 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">Visítanos</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    Av. Larco 345 oficina S1,<br />
                                    Miraflores - Lima
                                </p>
                            </div>
                        </div>

                        {/* Phones */}
                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-slate-100 border border-slate-50 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">Llámanos</h3>
                                <div className="space-y-1 text-slate-500 text-sm">
                                    <a href="tel:012410920" className="block hover:text-secondary transition-colors font-medium">(01) 241-0920</a>
                                    <a href="tel:+51996667974" className="block hover:text-secondary transition-colors font-medium">+51 996 667 974</a>
                                    <a href="tel:+51993270594" className="block hover:text-secondary transition-colors font-medium">+51 993 270 594</a>
                                </div>
                            </div>
                        </div>

                        {/* Emails */}
                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-slate-100 border border-slate-50 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">Escríbenos</h3>
                                <div className="space-y-1 text-slate-500 text-sm">
                                    <a href="mailto:grupos@expeditionsgroupsac.com" className="block hover:text-secondary transition-colors font-medium break-all">grupos@expeditionsgroupsac.com</a>
                                    <a href="mailto:azavaleta@expeditionsgroupsac.com" className="block hover:text-secondary transition-colors font-medium break-all">azavaleta@expeditionsgroupsac.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form Column */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none opacity-50"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none opacity-50"></div>

                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-slate-100 relative z-10 overflow-hidden">
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary to-primary transform origin-left hover:scale-x-110 transition-transform duration-500"></div>

                        <h3 className="text-2xl font-bold text-slate-800 mb-8">Envíanos un Mensaje</h3>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 group">
                                    <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">Nombre Completo</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-secondary focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder:text-slate-300 shadow-sm focus:shadow-md focus:shadow-secondary/10"
                                        placeholder="Tu nombre aquí"
                                    />
                                </div>
                                <div className="space-y-2 group">
                                    <label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-secondary focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder:text-slate-300 shadow-sm focus:shadow-md focus:shadow-secondary/10"
                                        placeholder="+51..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-secondary focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder:text-slate-300 shadow-sm focus:shadow-md focus:shadow-secondary/10"
                                    placeholder="tucorreo@ejemplo.com"
                                />
                            </div>

                            <div className="space-y-2 group">
                                <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">Mensaje</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-secondary focus:bg-white outline-none transition-all duration-300 text-slate-700 placeholder:text-slate-300 shadow-sm focus:shadow-md focus:shadow-secondary/10 resize-none text-base"
                                    placeholder="Cuéntanos sobre tu viaje ideal..."
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                className="w-full py-4 bg-gradient-to-r from-primary to-primary/90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Enviar Mensaje
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
