import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

// Helper to render Input
const RenderInput = ({ label, name, type = "text", placeholder, required = true, width = "full", formData, onChange }) => (
    <div className={width === "half" ? "" : "col-span-1 md:col-span-2"}>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-2">
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={formData[name] || ''}
            onChange={onChange}
            onWheel={(e) => type === 'number' && e.target.blur()}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 bg-slate-50 focus:bg-white text-base"
            placeholder={placeholder}
            required={required}
        />
    </div>
);

// Helper to render Select
const RenderSelect = ({ label, name, options, required = true, width = "full", formData, onChange }) => (
    <div className={width === "half" ? "" : "col-span-1 md:col-span-2"}>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-2">
            {label}
        </label>
        <div className="relative">
            <select
                id={name}
                name={name}
                value={formData[name] || ''}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 bg-slate-50 focus:bg-white appearance-none cursor-pointer text-base"
                required={required}
            >
                <option value="" disabled>Seleccione una opción</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    </div>
);

// Sub-components
function PaymentInfoSection({ formData, onChange, stepNumber = "2" }) {
    return (
        <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-sm shrink-0">{stepNumber}</span>
                Información del Pago
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RenderInput label="Fecha de Operación" name="paymentDate" type="date" width="half" formData={formData} onChange={onChange} />
                <RenderInput label="Número de Operación" name="operationNumber" width="half" placeholder="Ej. 123456" formData={formData} onChange={onChange} />
                <RenderInput label="Monto del Depósito" name="amount" type="number" width="half" placeholder="0.00" formData={formData} onChange={onChange} />
                <RenderSelect label="Moneda" name="currency" width="half" options={["Soles (PEN)", "Dólares (USD)"]} formData={formData} onChange={onChange} />
                <RenderSelect label="Método de pago" name="paymentMethod" width="half" options={["Depósito en Cuenta", "Transferencia Bancaria", "Transferencia interbancaria", "Tarjeta de Crédito"]} formData={formData} onChange={onChange} />
                <RenderSelect label="Entidad Bancaria" name="bank" width="half" options={["BCP", "Interbank", "BBVA", "Scotiabank", "Banco de la Nación", "Otro"]} formData={formData} onChange={onChange} />
            </div>
        </section>
    );
}

function PaymentHolderSection({ formData, onChange, stepNumber = "3" }) {
    return (
        <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-sm shrink-0">{stepNumber}</span>
                Titular del Pago
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RenderInput label="Nombres y Apellidos del Titular" name="paymentHolderName" placeholder="Tal cual figura en el voucher" formData={formData} onChange={onChange} />
            </div>
        </section>
    );
}

export default function VoucherForm() {
    const [formData, setFormData] = useState({
        serviceType: '',
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Por favor adjunta el voucher de pago");
            return;
        }

        setLoading(true);

        try {
            // 1. Upload File
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('vouchers')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('vouchers')
                .getPublicUrl(fileName);

            // 3. Prepare Data for Insert (Mapping camelCase to snake_case)
            const operationData = {
                service_type: formData.serviceType,
                student_name: formData.studentName || '',
                student_doc: formData.studentDoc || '',
                group_name: formData.groupName || '',
                parent_phone: formData.parentPhone || '',
                parent_email: formData.parentEmail || '',
                client_name: formData.clientName || '',
                client_doc: formData.clientDoc || '',
                client_phone: formData.clientPhone || '',
                client_email: formData.clientEmail || '',
                trip_destination: formData.tripDestination || '',
                trip_date: formData.tripDate || null,
                adults_count: formData.adultsCount ? parseInt(formData.adultsCount) : null,
                children_count: formData.childrenCount ? parseInt(formData.childrenCount) : null,
                payment_date: formData.paymentDate || null,
                operation_number: formData.operationNumber || '',
                amount: parseFloat(formData.amount) || 0,
                currency: formData.currency || '',
                payment_method: formData.paymentMethod || '',
                bank: formData.bank || '',
                payment_holder_name: formData.paymentHolderName || '',
                voucher_url: publicUrl,
                status: 'pending'
            };

            // 4. Insert into Database
            const { error: insertError } = await supabase
                .from('operations')
                .insert([operationData]);

            if (insertError) throw insertError;

            // Success
            alert("¡Registro enviado exitosamente! Nos pondremos en contacto pronto.");

            // Reset form
            setFormData({ serviceType: '' });
            setFile(null);

        } catch (error) {
            console.error('Error:', error);
            alert("Hubo un error al enviar el registro: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8 md:p-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Registro de Pagos</h2>
                    <p className="text-sm sm:text-base text-slate-500">Selecciona el tipo de servicio y completa los datos</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    {/* 1. Tipo de Registro */}
                    <div>
                        <label htmlFor="serviceType" className="block text-sm font-medium text-slate-700 mb-2">
                            Tipo de Registro
                        </label>
                        <div className="relative">
                            <select
                                id="serviceType"
                                name="serviceType"
                                value={formData.serviceType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 bg-slate-50 focus:bg-white appearance-none cursor-pointer text-base"
                                required
                            >
                                <option value="" disabled>Seleccione una opción</option>
                                <option value="escolar">Turismo Escolar</option>
                                <option value="paquetes">Paquetes Turísticos</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <AnimatePresence mode='wait' initial={false}>
                        {/* ---------------- OPTION 1: TURISMO ESCOLAR ---------------- */}
                        {formData.serviceType === 'escolar' && (
                            <motion.div
                                key="escolar"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                                className="space-y-6 sm:space-y-8 overflow-hidden"
                            >
                                {/* Datos del Alumno */}
                                <section>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-sm shrink-0">1</span>
                                        Datos del Alumno
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                        <RenderInput label="Nombres y Apellidos del Alumno" name="studentName" placeholder="Juan Pérez" formData={formData} onChange={handleInputChange} />
                                        <RenderInput label="Número de Documento" name="studentDoc" width="half" placeholder="12345678" formData={formData} onChange={handleInputChange} />
                                        <RenderInput label="Grupo / Colegio / Promoción" name="groupName" width="half" placeholder="Ej. Promoción 2026" formData={formData} onChange={handleInputChange} />
                                        <RenderInput label="Teléfono del Apoderado" name="parentPhone" type="tel" width="half" placeholder="999 999 999" formData={formData} onChange={handleInputChange} />
                                        <RenderInput label="Correo del Apoderado" name="parentEmail" type="email" width="half" placeholder="correo@ejemplo.com" formData={formData} onChange={handleInputChange} />
                                    </div>
                                </section>

                                {/* Información del Pago */}
                                <PaymentInfoSection formData={formData} onChange={handleInputChange} />

                                {/* Titular del Pago */}
                                <PaymentHolderSection formData={formData} onChange={handleInputChange} />
                            </motion.div>
                        )}

                        {/* ---------------- OPTION 2: PAQUETES TURISTICOS ---------------- */}
                        {formData.serviceType === 'paquetes' && (
                            <motion.div
                                key="paquetes"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                                className="space-y-6 sm:space-y-8 overflow-hidden"
                            >
                                {/* Datos del Cliente */}
                                <section>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-sm shrink-0">1</span>
                                        Datos del Cliente
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                        <RenderInput label="Nombres y Apellidos" name="clientName" placeholder="Maria Rodriguez" formData={formData} onChange={handleInputChange} />
                                        <RenderInput label="Número de Documento" name="clientDoc" width="half" placeholder="12345678" formData={formData} onChange={handleInputChange} />
                                        <RenderInput label="Teléfono / Whatsapp" name="clientPhone" type="tel" width="half" placeholder="999 999 999" formData={formData} onChange={handleInputChange} />
                                        <RenderInput label="Correo electrónico" name="clientEmail" type="email" width="full" placeholder="correo@ejemplo.com" formData={formData} onChange={handleInputChange} />
                                    </div>
                                </section>

                                {/* Información del Viaje */}
                                <section>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-sm shrink-0">2</span>
                                        Información del Viaje
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                        <RenderInput label="Destino del viaje" name="tripDestination" placeholder="Ej. Punta Cana" formData={formData} onChange={handleInputChange} />
                                        <RenderInput label="Fecha del viaje" name="tripDate" type="date" width="half" formData={formData} onChange={handleInputChange} />
                                        <RenderInput label="Cantidad de Adultos" name="adultsCount" type="number" width="half" placeholder="2" formData={formData} onChange={handleInputChange} />
                                        <RenderInput label="Cantidad de Niños" name="childrenCount" type="number" width="half" placeholder="0" required={false} formData={formData} onChange={handleInputChange} />
                                    </div>
                                </section>

                                {/* Información del Pago */}
                                <PaymentInfoSection stepNumber="3" formData={formData} onChange={handleInputChange} />

                                {/* Titular del Pago */}
                                <PaymentHolderSection stepNumber="4" formData={formData} onChange={handleInputChange} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* File Upload Section */}
                    {formData.serviceType && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1], delay: 0.3 }}
                            className="overflow-hidden"
                        >
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Adjuntar Voucher
                            </label>
                            <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 sm:p-8 text-center hover:border-secondary transition-colors bg-slate-50 hover:bg-slate-50/50">
                                <input
                                    type="file"
                                    id="voucher"
                                    name="voucher"
                                    accept="image/*,.pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    required
                                />
                                <div className="flex flex-col items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-10 w-8 sm:w-10 text-slate-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    {file ? (
                                        <p className="text-secondary font-medium truncate max-w-[200px] sm:max-w-xs text-sm">{file.name}</p>
                                    ) : (
                                        <>
                                            <p className="text-slate-600 font-medium text-xs sm:text-sm">Haga clic o arrastre para subir</p>
                                            <p className="text-slate-400 text-[10px] sm:text-xs mt-1">PNG, JPG o PDF (Máx. 5MB)</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {formData.serviceType && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3.5 sm:py-4 bg-gradient-to-r from-secondary to-primary text-white font-bold rounded-xl shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-all duration-300 text-base sm:text-lg mt-4 sm:mt-6 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Subiendo datos...' : 'Enviar Registro'}
                        </motion.button>
                    )}
                </form>
            </motion.div>
        </div>
    );
}
