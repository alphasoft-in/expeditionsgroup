import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyContent() {
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
                        En <strong>Expeditions Group</strong>, valoramos su privacidad y estamos comprometidos a proteger sus datos personales. Esta política de privacidad explica cómo recopilamos, usamos y salvaguardamos su información cuando utiliza nuestros servicios de turismo escolar, corporativo y familiar.
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. Información que Recopilamos</h3>
                    <p>
                        Podemos recopilar información personal que usted nos proporciona voluntariamente al reservar nuestros paquetes, solicitar información o registrarse en nuestro sitio web. Esta información puede incluir:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-600">
                        <li>Datos de identificación: Nombre completo, número de documento (DNI/Pasaporte), fecha de nacimiento.</li>
                        <li>Datos de contacto: Dirección de correo electrónico, número de teléfono, dirección física.</li>
                        <li>Información de pago: Datos necesarios para procesar sus transacciones (aunque no almacenamos detalles completos de tarjetas de crédito en nuestros servidores).</li>
                        <li>Preferencias de viaje: Restricciones dietéticas, necesidades médicas especiales o preferencias de alojamiento para asegurar la mejor experiencia.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. Uso de la Información</h3>
                    <p>
                        Utilizamos su información personal para los siguientes propósitos:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-600">
                        <li><strong>Procesamiento de Reservas:</strong> Para gestionar sus vuelos, alojamientos, seguros de viaje y actividades turísticas.</li>
                        <li><strong>Comunicación:</strong> Para enviarle confirmaciones, itinerarios, actualizaciones sobre su viaje y responder a sus consultas.</li>
                        <li><strong>Seguridad:</strong> Para verificar su identidad y garantizar la seguridad de nuestras operaciones y servicios.</li>
                        <li><strong>Mejora del Servicio:</strong> Para analizar tendencias y mejorar la calidad de nuestros paquetes turísticos y atención al cliente.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. Compartir Información con Terceros</h3>
                    <p>
                        No vendemos ni alquilamos su información personal a terceros. Sin embargo, podemos compartir datos estrictamente necesarios con proveedores de servicios esenciales para la ejecución de su viaje, tales como:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-600">
                        <li>Aerolíneas, hoteles y empresas de transporte terrestre.</li>
                        <li>Proveedores de seguros de viaje y asistencia médica.</li>
                        <li>Operadores turísticos locales y guías autorizados.</li>
                    </ul>
                    <p>
                        Estos terceros están obligados a proteger su información y utilizarla únicamente para los fines especificados.
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Seguridad de los Datos</h3>
                    <p>
                        Implementamos medidas de seguridad técnicas y organizativas rigurosas para proteger sus datos personales contra el acceso no autorizado, la pérdida, el uso indebido o la alteración. Utilizamos protocolos de encriptación y servidores seguros para resguardar su información confidencial.
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Sus Derechos</h3>
                    <p>
                        Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales (derechos ARCO), de acuerdo con la Ley de Protección de Datos Personales. Para ejercer estos derechos, puede contactarnos en cualquier momento a través de nuestros canales oficiales.
                    </p>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-12">
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Contáctenos</h4>
                        <p className="text-slate-600 mb-0">
                            Si tiene preguntas sobre esta política de privacidad, por favor escríbanos a <a href="mailto:contacto@expeditionsgroup.com" className="text-primary font-bold hover:underline">contacto@expeditionsgroup.com</a> o llámenos al (01) 241-0920.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
