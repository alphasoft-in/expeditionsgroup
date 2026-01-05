import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/nosotros' },
    {
        name: 'Paquetes Internacionales',
        href: '#',
        children: [
            { name: 'Punta Cana', href: '/paquetes/punta-cana' },
            { name: 'Riviera Maya', href: '/paquetes/riviera-maya' },
            { name: 'Cartagena de Indias', href: '/paquetes/cartagena' },
            { name: 'San Andrés', href: '/paquetes/san-andres' },
        ]
    },
    {
        name: 'Paquetes Nacionales',
        href: '#',
        children: [
            { name: 'Royal Decameron', href: '/paquetes/royal-decameron' },
            { name: 'Cusco Mágico', href: '/paquetes/cusco-magico' },
            { name: 'Tarapoto Fascinante', href: '/paquetes/tarapoto' },
            { name: 'Playas del Norte', href: '/paquetes/playas-norte' },
            { name: 'Arequipa', href: '/paquetes/arequipa' },
            { name: 'Sur Mágico', href: '/paquetes/sur-magico' },
        ]
    },
    { name: 'Contáctanos', href: '/contactanos' },
    { name: 'Registro de Pagos', href: '/registro', target: '_blank' },
    { name: 'Login', href: '/login', isButton: true, target: '_blank' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('/');
    const [hoveredLink, setHoveredLink] = useState(null);
    const [mobileExpandedLink, setMobileExpandedLink] = useState(null);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        // Set active link based on current path
        setActiveLink(window.location.pathname);

        handleScroll(); // Check on mount
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileSubmenu = (linkName) => {
        if (mobileExpandedLink === linkName) {
            setMobileExpandedLink(null);
        } else {
            setMobileExpandedLink(linkName);
        }
    };

    const isLinkActive = (item) => {
        if (item.href === activeLink) return true;
        if (item.children) {
            return item.children.some(child => child.href === activeLink);
        }
        return false;
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="text-2xl font-bold text-white tracking-wide group relative z-50">
                        Expeditions <span className="text-secondary drop-shadow-[0_0_10px_rgba(218,165,33,0.5)] group-hover:text-white transition-colors">Group</span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex items-center space-x-8">
                        {links.map((link) => {
                            const isActive = isLinkActive(link);
                            return (
                                <div
                                    key={link.name}
                                    className="relative group"
                                    onMouseEnter={() => setHoveredLink(link.name)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                >
                                    {link.isButton ? (
                                        <a
                                            href={link.href}
                                            target={link.target || "_self"}
                                            rel={link.target === "_blank" ? "noopener noreferrer" : ""}
                                            className={`px-6 py-2 font-semibold rounded-full transition-all transform hover:scale-105 shadow-md ${activeLink === link.href ? 'bg-white text-primary' : 'bg-tertiary hover:bg-tertiary/80 text-white shadow-tertiary/20'}`}
                                        >
                                            {link.name}
                                        </a>
                                    ) : (
                                        <a
                                            href={link.href}
                                            target={link.target || "_self"}
                                            rel={link.target === "_blank" ? "noopener noreferrer" : ""}
                                            className={`font-medium transition-colors relative py-2 block ${isActive ? 'text-secondary' : 'text-white/90 hover:text-white'}`}
                                            onClick={(e) => link.children && e.preventDefault()}
                                        >
                                            {link.name}
                                            {/* Underline for active/hover */}
                                            <span className={`absolute bottom-0 left-0 h-0.5 bg-secondary transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>

                                            {/* Dropdown Indicator */}
                                            {link.children && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 inline-block ml-1 transition-transform duration-200 ${hoveredLink === link.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            )}
                                        </a>
                                    )}

                                    {/* Desktop Dropdown */}
                                    <AnimatePresence>
                                        {link.children && hoveredLink === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-2"
                                            >
                                                {link.children.map((child) => (
                                                    <a
                                                        key={child.name}
                                                        href={child.href}
                                                        className={`block px-4 py-3 transition-colors font-medium text-sm ${activeLink === child.href
                                                            ? 'bg-secondary/10 text-primary font-bold'
                                                            : 'text-slate-600 hover:bg-secondary/10 hover:text-primary'
                                                            }`}
                                                    >
                                                        {child.name}
                                                    </a>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Button (Hamburger) */}
                    <button
                        className="xl:hidden text-white focus:outline-none relative z-50"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-zinc-900/95 backdrop-blur-xl xl:hidden flex flex-col pt-24 pb-8 overflow-y-auto"
                    >
                        <nav className="flex flex-col px-6 space-y-2 w-full container mx-auto">
                            {links.map((link) => {
                                const isActive = isLinkActive(link);
                                return (
                                    <div key={link.name} className="flex flex-col">
                                        {link.isButton ? (
                                            <a
                                                href={link.href}
                                                target={link.target || "_self"}
                                                rel={link.target === "_blank" ? "noopener noreferrer" : ""}
                                                className="block w-full text-center bg-secondary py-3 rounded-xl text-white font-bold text-lg shadow-lg mt-4"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {link.name}
                                            </a>
                                        ) : (
                                            <>
                                                <div className="flex items-center justify-between">
                                                    <a
                                                        href={link.href}
                                                        target={link.target || "_self"}
                                                        rel={link.target === "_blank" ? "noopener noreferrer" : ""}
                                                        className={`text-xl font-semibold transition-colors py-2 block ${isActive ? 'text-secondary' : 'text-white/90 hover:text-white'}`}
                                                        onClick={(e) => {
                                                            if (link.children) {
                                                                e.preventDefault();
                                                                toggleMobileSubmenu(link.name);
                                                            } else {
                                                                setIsMobileMenuOpen(false);
                                                            }
                                                        }}
                                                    >
                                                        {link.name}
                                                    </a>
                                                    {link.children && (
                                                        <button
                                                            onClick={() => toggleMobileSubmenu(link.name)}
                                                            className={`p-2 hover:text-white ${isActive ? 'text-secondary' : 'text-white/70'}`}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform ${mobileExpandedLink === link.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Mobile Submenu */}
                                                <AnimatePresence>
                                                    {link.children && mobileExpandedLink === link.name && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden bg-white/5 rounded-xl mt-2"
                                                        >
                                                            <div className="flex flex-col py-2">
                                                                {link.children.map((child) => (
                                                                    <a
                                                                        key={child.name}
                                                                        href={child.href}
                                                                        className={`px-6 py-2.5 text-base transition-colors ${activeLink === child.href
                                                                            ? 'text-secondary bg-white/10 font-bold'
                                                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                                                            }`}
                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                    >
                                                                        {child.name}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
