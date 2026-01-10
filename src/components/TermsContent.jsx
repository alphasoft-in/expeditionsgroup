import React from 'react';
import { motion } from 'framer-motion';

export default function TermsContent() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="prose prose-lg prose-slate max-w-none"
                >
                    <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                        Bienvenido a <strong>Expeditions Group</strong>. Al utilizar nuestros servicios y realizar reservas con nosotros, usted acepta los siguientes términos y condiciones. Le recomendamos leerlos detenidamente antes de confirmar cualquier servicio turístico.
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. Reservas y Pagos</h3>
                    <p>
                        Para garantizar su reserva, se requiere un depósito inicial no reembolsable cuyo monto variará según el paquete seleccionado. El saldo restante debe ser cancelado en su totalidad antes de la fecha de inicio del viaje, según los plazos establecidos en su confirmación de reserva.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-600">
                        <li>Los precios están expresados en la moneda indicada y están sujetos a cambios sin previo aviso hasta que la reserva esté confirmada con el pago.</li>
                        <li>Aceptamos pagos mediante transferencia bancaria, tarjeta de crédito/débito y efectivo en nuestras oficinas.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. Cancelaciones y Reembolsos</h3>
                    <p>
                        Las políticas de cancelación varían según el proveedor (aerolíneas, hoteles, operadores). En general:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-600">
                        <li>Las cancelaciones solicitadas con más de 30 días de antelación pueden estar sujetas a gastos administrativos y penalidades de los operadores.</li>
                        <li>Las cancelaciones dentro de los 30 días previos al viaje pueden incurrir en una penalidad del 100% del costo total.</li>
                        <li>No se realizarán reembolsos por servicios no utilizados voluntariamente por el pasajero durante el viaje.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. Documentación</h3>
                    <p>
                        Es responsabilidad exclusiva del pasajero contar con toda la documentación necesaria para el viaje en regla, incluyendo:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-600">
                        <li>DNI o Pasaporte vigente (mínimo 6 meses de vigencia para viajes internacionales).</li>
                        <li>Visas requeridas según el destino.</li>
                        <li>Permisos notariales para menores de edad que viajen sin uno o ambos padres.</li>
                        <li>Certificados de vacunación (ej. Fiebre Amarilla) si el destino lo exige.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Responsabilidades</h3>
                    <p>
                        <strong>Expeditions Group</strong> actúa como intermediario entre el cliente y los proveedores de servicios (aerolíneas, hoteles, transportes). No nos hacemos responsables por:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-600">
                        <li>Retrasos, cancelaciones o reprogramaciones de vuelos por parte de las aerolíneas.</li>
                        <li>Pérdida de objetos personales o equipaje.</li>
                        <li>Eventos de fuerza mayor (desastres naturales, huelgas, condiciones climáticas) que afecten el desarrollo del itinerario.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Seguros de Viaje</h3>
                    <p>
                        Recomendamos encarecidamente la adquisición de un seguro de asistencia al viajero que cubra gastos médicos, cancelación de viaje y pérdida de equipaje. Expeditions Group puede asesorarle en la contratación de dicho seguro.
                    </p>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-12">
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Consultas</h4>
                        <p className="text-slate-600 mb-0">
                            Para cualquier duda sobre estos términos, contáctenos en <a href="mailto:info@expeditionsgroup.com" className="text-primary font-bold hover:underline">info@expeditionsgroup.com</a>.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
