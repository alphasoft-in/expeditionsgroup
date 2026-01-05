import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulación de login exitoso
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ email, name: 'Usuario Demo' }));

        // Redireccionar al dashboard
        window.location.href = '/dashboard';
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Bienvenido</h2>
                    <p className="text-slate-500">Ingresa a tu cuenta para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 bg-slate-50 focus:bg-white"
                            placeholder="ejemplo@correo.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 bg-slate-50 focus:bg-white"
                            placeholder="••••••••"
                            required
                        />
                        <div className="flex justify-end mt-2">
                            <a href="#" className="text-sm text-secondary hover:text-secondary/80 font-medium transition-colors">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3.5 bg-gradient-to-r from-secondary to-primary text-white font-bold rounded-xl shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-all duration-300"
                    >
                        Iniciar Sesión
                    </motion.button>
                </form>


            </motion.div>
        </div>
    );
}
