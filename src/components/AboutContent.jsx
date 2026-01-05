import { motion } from "framer-motion";

export default function AboutContent({ image }) {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16 relative z-10">
            {/* Who We Are Section - Side by Side with Image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center mb-12 sm:mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-3 block">
                        ¿Quiénes somos?
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight">
                        Experiencias que <br className="hidden sm:block" />
                        <span className="text-primary">Transforman</span>
                    </h2>
                    <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-light">
                        <p>
                            En <span className="font-semibold text-slate-900">Expeditions Group</span> somos
                            especialistas en <span className="text-secondary font-medium">viajes corporativos y educativos</span>,
                            con una sólida trayectoria en la gestión de grupos a nivel nacional e internacional.
                        </p>
                        <p>
                            Nuestro compromiso es crear itinerarios que combinan{" "}
                            <strong className="font-semibold text-slate-900">logística impecable</strong>, atención al
                            detalle y respaldo constante. Diseñamos cada viaje para que sea una experiencia
                            memorable y segura.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative group"
                >
                    {/* Decorative Elements */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply transition-opacity group-hover:opacity-0 duration-500"></div>
                        <img
                            src={image}
                            alt="Equipo Expeditions Group"
                            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:block">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase">Garantía</p>
                                <p className="text-sm font-bold text-slate-900">100% Confiable</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Team & Contact Section - Improved Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Team Column (Left - 7 cols) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="lg:col-span-7 space-y-8"
                >
                    <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-secondary font-bold text-xs uppercase tracking-wider mb-1">El Talento</p>
                            <h3 className="text-3xl font-bold text-slate-900">Nuestro Equipo</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Member 1 - Thalia */}
                        <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-secondary/30 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-xl font-bold text-primary border border-slate-200 group-hover:scale-110 transition-transform">
                                    TV
                                </div>
                                <div className="bg-secondary/10 px-3 py-1 rounded-full">
                                    <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">
                                        Coordinación
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">
                                    Thalia Vasquez
                                </h4>
                                <p className="text-xs text-slate-400 font-medium mb-3">Coord. de Grupos</p>
                                <a
                                    href="mailto:grupos@expeditionsgroupsac.com"
                                    className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-xs font-medium bg-slate-50 px-3 py-2 rounded-lg w-full"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span className="truncate">grupos@expeditionsgroupsac.com</span>
                                </a>
                            </div>
                        </div>

                        {/* Member 2 - Alberto */}
                        <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-secondary/30 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-xl font-bold text-primary border border-slate-200 group-hover:scale-110 transition-transform">
                                    AZ
                                </div>
                                <div className="bg-secondary/10 px-3 py-1 rounded-full">
                                    <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">
                                        Gerencia
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">
                                    Alberto Zavaleta
                                </h4>
                                <p className="text-xs text-slate-400 font-medium mb-3">Gerente General</p>
                                <a
                                    href="mailto:azavaleta@expeditionsgroupsac.com"
                                    className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-xs font-medium bg-slate-50 px-3 py-2 rounded-lg w-full"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span className="truncate">azavaleta@expeditionsgroupsac.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Info Column (Right - 5 cols) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="lg:col-span-5"
                >
                    <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-secondary backdrop-blur-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                Información de Contacto
                            </h3>

                            <div className="space-y-8">
                                <div className="group">
                                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-2 pl-9">
                                        Visítanos
                                    </p>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-secondary/20 transition-colors text-secondary shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-lg font-medium leading-snug">Oficina Comercial</p>
                                            <p className="text-white/60 text-sm mt-1 leading-relaxed">
                                                Av. Larco 345 oficina S1,<br />
                                                Miraflores - Lima
                                            </p>
                                            <a href="#" className="inline-block text-xs text-secondary hover:text-white mt-2 border-b border-transparent hover:border-white transition-all">Ver en mapa &rarr;</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-white/10"></div>

                                <div className="group">
                                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-2 pl-9">
                                        Llámanos
                                    </p>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-secondary/20 transition-colors text-secondary shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-lg font-medium leading-snug mb-1">Central Telefónica</p>
                                            <div className="space-y-1">
                                                <a href="tel:012410920" className="block text-white/80 hover:text-white transition-colors text-sm font-light tracking-wide">
                                                    (01) 241-0920
                                                </a>
                                                <a href="tel:+51996667974" className="block text-white/80 hover:text-white transition-colors text-sm font-light tracking-wide">
                                                    +51 996 667 974
                                                </a>
                                                <a href="tel:+51993270594" className="block text-white/80 hover:text-white transition-colors text-sm font-light tracking-wide">
                                                    +51 993 270 594
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
