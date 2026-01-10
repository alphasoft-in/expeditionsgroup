
// Import images from assets
// Import images from assets
import puntaCanaImg from '../assets/paquetes/punta-cana.avif';
import puntaCanaHeaderImg from '../assets/breadcrumb/punta-cana.avif';
import rivieraMayaHeaderImg from '../assets/breadcrumb/riviera-maya.avif';
import rivieraMayaImg from '../assets/paquetes/riviera-maya.avif';
import cartagenaHeaderImg from '../assets/breadcrumb/cartagena-de-indias.avif';
import cartagenaImg from '../assets/paquetes/cartagena-de-indias.avif';
import sanAndresHeaderImg from '../assets/breadcrumb/san-andres.avif';
import sanAndresImg from '../assets/paquetes/san-andres.avif';
import royalDecameronHeaderImg from '../assets/breadcrumb/royal-decameron.avif';
import royalDecameronImg from '../assets/paquetes/royal-decameron.avif';

import cuscoHeaderImg from '../assets/breadcrumb/cusco-magico.avif';
import cuscoImg from '../assets/paquetes/cusco-magico.avif';
import tarapotoImg from '../assets/paquetes/tarapoto.avif';
import tarapotoHeaderImg from '../assets/breadcrumb/tarapoto.avif';
import playasDelNorteImg from '../assets/paquetes/playas-del-norte-rustica-vichayito.avif';
import playasDelNorteHeaderImg from '../assets/breadcrumb/rustica-vichayito.avif';
import cajamarcaImg from '../assets/paquetes/cajamarca.avif';
import arequipaImg from '../assets/paquetes/arequipa.avif';
import arequipaHeaderImg from '../assets/breadcrumb/arequipa.avif';
import surMagicoImg from '../assets/paquetes/sur-magico-dunas.avif';
import surMagicoHeaderImg from '../assets/breadcrumb/sur-magico.avif';
import boliviaImg from '../assets/paquetes/bolivia.avif';


// Export package data
export const packages = [
    {
        id: 1,
        slug: "punta-cana",
        title: "Punta Cana",
        price: "USD 850",
        image: puntaCanaImg,
        headerImage: puntaCanaHeaderImg,
        description: "Disfruta de Punta Cana con todo incluido en el Barceló Bávaro Palace. Alojamiento de lujo, tours a Isla Saona y diversión garantizada.",
        overview: "Un complejo de 5 estrellas Todo Incluido ubicado en primera línea de la maravillosa Playa Bávaro, cuenta con diferentes ofertas de ocio para todas las edades, desde discotecas, casinos, espectáculos en vivo y actividades orientadas.",
        itinerary: [
            {
                day: 1,
                title: "LIMA / PUNTA CANA / BARCELO BÁVARO PALACE",
                image: puntaCanaImg,
                description: "04:30 hrs: Traslado al aeropuerto Jorge Chávez en bus exclusivo (MOVIL BUS). Entrega de distintivos y equipaje full: 23 kg bodega + 10 kg carry on + mochila.\n05:30 hrs: Llegada al aeropuerto. Tarjetas de embarque, permisos notariales y check-in en counter LATAM. Ingreso a sala de embarque.\n08:50 hrs: Llegada a Cajamarca. Recepción e instalación en el hotel.\n14:50 hrs: Llegada a Punta Cana. Traslado en bus privado al hotel BARCELO BÁVARO GRAND RESORT *****. Check-in en habitaciones JUNIOR SUITES. Almuerzo buffet de bienvenida y tarde libre para disfrutar las instalaciones.\n20:00 hrs: Cena buffet en Restaurante Miramar.\n21:00 hrs: Show nocturno temático.\n22:00 hrs: Noche de discoteca exclusiva para menores. Pernocte."
            },
            {
                day: 2,
                title: "BARCELO BÁVARO PALACE / ACTIVIDAD DE RECREACIÓN",
                image: puntaCanaImg,
                description: "08:00 hrs: Desayuno buffet.\n10:00 hrs: Actividades de recreación exclusivas a cargo del staff del hotel. Juegos y concursos.\n13:00 hrs: Almuerzo buffet en Restaurante Miramar.\n16:00 hrs: Actividades grupales: vóley playa.\n20:00 hrs: Cena en restaurante especializado Santa Fe (especialidad en carnes).\n22:00 hrs: Show nocturno temático. Pernocte."
            },
            {
                day: 3,
                title: "ISLA SAONA / PISCINA NATURAL / CATAMARÁN PRIVADO",
                image: puntaCanaImg,
                description: "07:00 hrs: Desayuno buffet.\n08:00 hrs: Traslado en bus al puerto Bayahibe. Viaje en catamarán privado a Isla Saona con entretenimiento, bebidas sin alcohol y visita a la piscina natural.\n13:00 hrs: Almuerzo buffet y tarde libre en la isla. Regreso en catamarán al hotel.\n20:00 hrs: Cena buffet en Restaurante Miramar. Show nocturno y noche de discoteca para menores. Pernocte."
            },
            {
                day: 4,
                title: "BANANA BOAT / PARQUE ACUÁTICO / FOTOS GRUPALES",
                image: puntaCanaImg,
                description: "08:00 hrs: Desayuno buffet.\n10:00 hrs: Diversión en el parque acuático del hotel: toboganes, simulador de olas y juegos grupales.\n13:00 hrs: Almuerzo buffet. Tarde de playa con Banana Boat.\n18:00 hrs: Sesión de fotos grupales (vestimenta blanca).\n20:00 hrs: Cena buffet privada de despedida. Noche de discoteca. Pernocte."
            },
            {
                day: 5,
                title: "DEPORTES ACUÁTICOS / RETORNO",
                image: puntaCanaImg,
                description: "08:00 hrs: Desayuno buffet. Tiempo libre para disfrutar del hotel. Deportes acuáticos: kayak, pedalones, veleros. Check-out y almuerzo buffet de despedida.\n14:30 hrs: Traslado al aeropuerto.\n17:30 hrs: Vuelo de retorno a Lima (vía LA2451).\n21:25 hrs: Arribo a Lima. Traslado al colegio en bus MOVIL BUS."
            }
        ],
        programIncludes: [
            "Boleto aéreo Lima/Punta Cana/Lima vía LATAM con equipaje incluido (1 pieza en bodega de 23 kg + 1 pieza de mano de 10 kg + mochila).",
            "Traslados aeropuerto / hotel / aeropuerto en destino.",
            "04 noches de alojamiento en el Hotel BARCELO BÁVARO PALACE ***** en habitación JUNIOR SUITE.",
            "Sistema ALL INCLUSIVE (Desayunos, Almuerzos, Cenas buffet y snacks + bebidas sin alcohol ilimitadas).",
            "Actividades exclusivas para estudiantes en áreas recreativas del hotel.",
            "Ingreso al parque acuático del hotel: Piscinas, toboganes, simulador de olas, etc.",
            "Fiesta de bienvenida y despedida.",
            "Discoteca exclusiva para menores (sin alcohol).",
            "Excursión a ISLA SAONA con CATAMARÁN privado y almuerzo buffet incluido.",
            "Deportes acuáticos: banana boat, kayak, pedalones, veleros.",
            "Fotos grupales profesionales (vestimenta blanca).",
            "Staff de recreadores y asistencia personalizada durante todo el viaje.",
            "Seguro de asistencia médica MAPFRE (cobertura hasta USD 30,000).",
            "Kit de viaje: polo, mochila, gorra, tomatodo y credencial.",
            "Reunión informativa para padres y estudiantes.",
            "Supervisión permanente con monitoreo 24/7 y sistema de control interno por aplicativo."
        ],
        programExcludes: [
            "Trámite de pasaporte (obligatorio para todos los viajeros).",
            "Almuerzos y cenas durante traslados en aeropuertos.",
            "Propinas para guías y conductores (sugerido: USD 10 por persona).",
            "Servicios no especificados en el programa."
        ],
        conditions: [
            "PRE PAGO USD $200.00 (PRE-PAGO).",
            "Saldo en armadas hasta la fecha de viaje.",
            "El PRE PAGO* es no reembolsable, no transferible, no endosable.",
            "TARIFAS AÉREAS GRUPALES CON LATAM, incluye 01 maleta de 23kg para bodega y 01 maleta de 10kilos como equipaje de mano por persona.",
            "Envío de COMPROMISO DE VIAJE Dicho documento confirma la participación del menor.",
            "Se enviará una carta a cada padre informando la cuenta de la empresa, detallando el procedimiento para el pago.",
            "Los liberados para el grupo se consideran tomando en cuenta la fecha límite para el PRE PAGO.",
            "Los pagos se enviarán al WhatsApp para validarlos.",
            "Contamos con un sistema de tarjetas de crédito: VISA, MASTERCARD. 5% comision."
        ],
        hotelInfo: {
            name: "BARCELO BÁVARO PALACE GRAND RESORT",
            description: "Un complejo de 5 estrellas Todo Incluido ubicado en primera línea de la maravillosa Playa Bávaro. Este magnífico complejo ofrece confort, comodidad y un rápido acceso a la playa.",
            features: [
                "Habitaciones dobles JUNIOR SUITE",
                "Conexión WIFI",
                "Pantalla plana de TV",
                "Aire acondicionado",
                "Caja fuerte",
                "Baño completo"
            ],
            gastronomy: "El hotel 5 estrellas con TODO INCLUIDO ofrece una increíble variedad de delicias gastronómicas de todo el mundo. Cuenta con opciones de tipo buffet o a la carta."
        }
    },
    {
        id: 2,
        slug: "riviera-maya",
        title: "Riviera Maya",
        price: "USD 950",
        image: rivieraMayaImg,
        headerImage: rivieraMayaHeaderImg,
        description: "Vive la magia de la Riviera Maya con todo incluido en el Barceló Maya Grand Resort. Xplor, Delfines y diversión total.",
        overview: "Situado en una de las playas más bellas del Caribe Mexicano que se extiende a lo largo de 2 km en plena Riviera Maya. El programa Todo Incluido ofrece aperitivos y bebidas disponibles las 24 horas del día, así como acceso a múltiples restaurantes, instalaciones deportivas y entretenimiento nocturno exclusivo.",
        itinerary: [
            {
                day: 1,
                title: "LIMA / CANCUN / RIVIERA MAYA",
                image: rivieraMayaImg,
                description: "03:00 hrs: Reunión en el colegio. Entrega de distintivos para maletas de la empresa. Podrán llevar como equipaje una maleta de 23 kg. bodega y una de 10 kg. equipaje de mano. (CARRY ON)\n03:30 hrs: Traslado al aeropuerto Jorge Chávez en transporte exclusivo MOVIL BUS. Entrega de tarjetas de embarque y permisos notariales para el chequeo respectivo en el counter de LATAM GRUPOS. Entrega de maletas. Ingreso a la sala de embarque previamente asignada.\n08:55 hrs: Salida con destino a la ciudad de Cancún VIA LATAM.\n14:30 hrs: Llegada a la Ciudad de Cancún.\n15:30 hrs: Traslado en bus privado de turismo al hotel BARCELO MAYA GRAND RESORT*****. Recepción en área privada para grupos, entrega de brazaletes y HABITACIONES DOBLES.\nIngreso a la estación de snack para almorzar: hamburguesas, hot dog, ensaladas, nachos, papas fritas, pizzas, postres, bebidas, etc. Tiempo libre para disfrutar de las instalaciones del hotel.\n20:00 hrs: CENA BUFFET.\n21:00 hrs: PASEO EN BUS PANORAMICO por los hoteles BARCELO MAYA GRAND RESORT.\n22:00 hrs: Noche de discoteca exclusiva para menores. Pernocte."
            },
            {
                day: 2,
                title: "SHOW DE DELFINES / DOLPHINARI’S",
                image: rivieraMayaImg,
                description: "08:00 hrs: Desayuno buffet.\n10:00 hrs: El hotel cuenta con DOLPHINARI’S BARCELO, tendremos la oportunidad de espectar el show de estos maravillosos mamíferos. (NO INCLUYE fotos ni actividades, tienen un costo adicional).\n12:00 hrs: Almuerzo buffet.\n13:00 hrs: Actividades recreativas.\n19:00 hrs: CENA A LA CARTA EN REST. ESPECIALIZADO.\nShow nocturno en el hotel. Pernocte."
            },
            {
                day: 3,
                title: "PARQUE DE EXPERIENCIAS XPLOR",
                image: rivieraMayaImg,
                description: "07:00 hrs: Desayuno buffet.\n08:00 hrs: Salida con destino al parque de experiencias XPLOR, un lugar mágico y divertido. Disfrutaremos de experiencias inolvidables nadando en ríos subterráneos, volando en la tirolesa más alta de la Riviera Maya y conduciendo vehículos anfibios a través de la jungla.\nActividades incluidas:\n- CIRCUITOS DE TIROLESAS\n- NADO EN RÍO DE ESTALACTITAS\n- VEHÍCULOS ANFIBIOS PARA EXPLORAR LA SELVA MAYA\n- DOS CIRCUITOS PARA RECORRER RÍO EN BALSAS\n14:00 hrs: ALMUERZO BUFFET ENERGÉTICO. Alimentos y bebidas naturales ilimitadas.\n17:00 hrs: Retorno al hotel.\n19:00 hrs: CENA A LA CARTA REST ESPECIALIZADO.\n21:00 hrs: SHOW NOCTURNO EN EL HOTEL. Pernocte."
            },
            {
                day: 4,
                title: "BARCELO MAYA GRAND RESORT / DISCOTECA ONE",
                image: rivieraMayaImg,
                description: "08:00 hrs: Desayuno buffet.\n09:00 hrs: Actividades grupales en las piscinas del hotel.\n12:00 hrs: Almuerzo buffet.\n14:00 hrs: Tarde de actividades grupales en la playa.\n19:00 hrs: Cena buffet.\n21:00 hrs: FIESTA DE BLANCO - DISCOTECA ONE. Disfrutaremos de una noche de discoteca inolvidable exclusiva para menores. Pernocte."
            },
            {
                day: 5,
                title: "BARCELO MAYA GRAND RESORT / LATE CHECK OUT",
                image: rivieraMayaImg,
                description: "08:00 hrs: Desayuno buffet. Disfrutaremos de nuestro último día en el Caribe Mexicano con actividades grupales en la playa del hotel. FOTO GRUPAL.\n12:00 hrs: Entrega de habitaciones.\n13:00 hrs: ALMUERZO BUFFET.\n14:00 hrs: LATE CHECK OUT. Continuaremos disfrutando del TODO INCLUIDO hasta la hora de nuestro traslado al aeropuerto.\n17:00 hrs: Ingreso a la estación de snack.\n18:30 hrs: Traslado al aeropuerto.\n20:30 hrs: Llegada al aeropuerto de Cancún. Chequeo respectivo, entrega de tarjetas de embarque.\n02:25 hrs: Salida con destino a la ciudad de Lima (LA 2457)."
            },
            {
                day: 6,
                title: "LLEGADA A LA CIUDAD DE LIMA",
                image: rivieraMayaImg,
                description: "05:35 hrs: Llegada a la ciudad de LIMA.\n06:35 hrs: Traslado al colegio MOVIL BUS.\n08:00 hrs: FELIZ RETORNO. Llegada al colegio."
            }
        ],
        programIncludes: [
            "BOLETO AÉREO LIM/CUN/LIM LATAM (LA2458 08:55-14:30 / LA2457 00:25-05:35).",
            "CHEQUEO PERSONALIZADO AEROPUERTO.",
            "TRASLADOS COLEGIO / AEROPUERTO / COLEGIO (MOVIL BUS).",
            "TRASLADO AEROPUERTO CANCÚN / HOTEL / AEROPUERTO (BUS PRIVADO).",
            "TARJETA DE ASISTENCIA MÉDICA TERRAWIND, cobertura hasta USD 50,000.",
            "05 DÍAS / 04 NOCHES en HOTEL BARCELO MAYA GRAND RESORT.",
            "SISTEMA TODO INCLUIDO.",
            "TOUR CONDUCTOR ACOMPAÑARÁ AL GRUPO (Beneficio para grupos de min. 20 pax).",
            "LATE CHECK OUT HOTEL BARCELO MAYA.",
            "POR CADA 10 PAGANTES, 01 LIBERADO (MÁXIMO 05 POR RESERVA).",
            "SHOW DE DELFINES (Espectáculo).",
            "PASEO EN BUS PANORÁMICO por hoteles BARCELO MAYA GRAND RESORT.",
            "PARQUE DE EXPERIENCIA X-PLOR (09:00-17:00hrs): Entradas, buffet, bebidas, casillero y equipos incluidos.",
            "FILMACIÓN DEL VIAJE y fotos grupales (1 copia por participante).",
            "TOMATODO de la empresa para cada participante."
        ],
        programExcludes: [
            "Trámite de pasaporte.",
            "Gastos personales y propinas no especificadas.",
            "Fotos o actividades adicionales con delfines (costo adicional).",
            "OPCIONAL: Tour Isla Mujeres / City Cancún (Costo por persona: USD 70)."
        ],
        conditions: [
            "RESERVA CONFIRMADA CON LATAM para viajar en mayo.",
            "Inscripción USD $200.00 (PRE-PAGO). Saldo en armadas hasta la fecha de viaje.",
            "El PRE PAGO es no reembolsable, no transferible, no endosable.",
            "TARIFAS AÉREAS GRUPALES CON LATAM, incluye 01 maleta de 23kg para bodega y 01 maleta de 10kilos como equipaje de mano.",
            "Firma de compromiso de pago por parte de los padres.",
            "Los pagos se enviarán al WhatsApp de la empresa 996667974 para ser validados.",
            "Se acepta VISA y MASTERCARD (5% de comisión)."
        ],
        hotelInfo: {
            name: "HOTEL BARCELÓ MAYA GRAND RESORT",
            description: "Se encuentra situado en una de las playas más bellas del Caribe Mexicano que se extiende a lo largo de 2 km en plena Riviera Maya. El complejo Todo Incluido permite disfrutar de 4 hoteles en 1: Barceló Maya Beach, Caribe, Colonial y Tropical.",
            features: [
                "HABITACIONES DOBLES",
                "SISTEMA ALL INCLUSIVE 24 HORAS",
                "Minibar en habitación (refrescos, agua, gaseosa)",
                "Deportes: Tenis, Padel, Voleibol playa, Futbol playa",
                "Deportes acuáticos no motorizados (Kayak, Canotaje)",
                "DISCOTECA ONE (exclusiva menores)",
                "Caja de seguridad",
                "Shows nocturnos todos los días"
            ],
            gastronomy: "Acceso a 3 restaurantes principales: buffet Beach, 'México Lindo' (mexicana) y 'Rancho Grande' (grill). Además de restaurantes especializados como Santa Elena (Carnes), Kyoto (Asiática), Marenostrum (Mariscos) y Tratoria (Pizzas y Pastas)."
        }
    },
    {
        id: 3,
        slug: "cartagena",
        title: "Cartagena de Indias",
        price: "USD 550",
        image: cartagenaImg,
        headerImage: cartagenaHeaderImg,
        description: "Vive la magia de Cartagena de Indias con todo incluido en el Hotel Cartagena Plaza. Historia, playa, fiesta y cultura.",
        overview: "Disfrute de las habitaciones estándar más amplias y confortables de la ciudad de Cartagena en el Hotel Cartagena Plaza. Ubicado en Bocagrande, con hermosas vistas al mar y a la ciudad antigua. Cuenta con piscina panorámica en el piso 18 y acceso directo a la playa para disfrutar del Caribe colombiano.",
        itinerary: [
            {
                day: 1,
                title: "LIMA - CARTAGENA DE INDIAS / PASEO EN CHIVAS",
                image: cartagenaImg,
                description: "07:00 hrs: Recepción en Lima. Traslado al aeropuerto en transporte exclusivo de MOVIL BUS.\n08:00 hrs: Llegada al aeropuerto. Atención personalizada LATAM GRUPOS - EQUIPAJE: maleta de carry on de 12kg para bodega más una mochila de 10kg para cabina.\n12:00 hrs: Salida con destino a Cartagena vía LATAM 2448.\n16:05 hrs: Llegada a la ciudad de Cartagena. Traslado al HOTEL CARTAGENA PLAZA. Instalación en habitaciones dobles. INGRESO A LA ESTACIÓN SNACK. Actividades en grupo en la piscina del hotel.\n19:00 hrs: CENA BUFFET.\n20:00 hrs: PASEO EN CHIVAS (SERVICIO PRIVADO). Recorreremos en transporte típico de Colombia por la vieja ciudad de Cartagena y la zona residencial Bocagrande. Disfrutaremos de un espectacular paseo con música y animación abordo. Retorno al hotel. Pernocte."
            },
            {
                day: 2,
                title: "CITY TOUR - CARTAGENA DE INDIAS",
                image: cartagenaImg,
                description: "08:00 hrs: Desayuno buffet.\n09:00 hrs: Circuito por el área moderna de Bocagrande y el barrio de Manga (casonas antiguas). Recorrido peatonal por la CIUDAD AMURALLADA, conociendo la Torre del Reloj, Plaza de la Aduana, San Pedro Claver, Palacio de la Inquisición. Finalmente, visita al IMPONENTE CASTILLO DE SAN FELIPE DE BARAJAS. Retorno al hotel.\nALMUERZO BUFFET EN EL HOTEL.\n15:00 hrs: Actividades recreativas en grupo a cargo del staff del hotel.\n20:00 hrs: CENA BUFFET y SHOW NOCTURNO. Pernocte."
            },
            {
                day: 3,
                title: "PLAYA BLANCA BARÚ / FIESTA DE BLANCO",
                image: cartagenaImg,
                description: "09:00 hrs: DESAYUNO BUFFET. Traslado en bus a PLAYA BLANCA BARÚ, un paraíso de intenso azul y arena blanca. Oportunidad de practicar deportes acuáticos: moto acuática, bananas inflables, etc.\nALMUERZO MARINO EN BARÚ. Retorno al hotel CARTAGENA PLAZA.\n19:00 hrs: CENA BUFFET.\n20:00 hrs: FIESTA DE BLANCO para el grupo en la discoteca del hotel. Pernocte."
            },
            {
                day: 4,
                title: "ISLAS DEL ROSARIO / ISLA SAN MARTIN - OCEANARIO",
                image: cartagenaImg,
                description: "08:00 hrs: Desayuno buffet.\n09:00 hrs: Transporte en lancha rápida a las ISLAS DEL ROSARIO (Parque Natural Nacional). Disfrute de aguas cristalinas y ecosistemas de coral.\nOCEANARIO ISLAS DEL ROSARIO: Visita al centro de conservación con más de 1,400 animales marinos (corales, tortugas, peces). Incluye actividades educativas sobre flora y fauna marina.\nOPCIONAL: SNORKELING (práctica acuática guiada con caretas incluidas). Retorno al hotel.\nALMUERZO BUFFET.\n20:00 hrs: CENA BUFFET y SHOW NOCTURNO. Pernocte."
            },
            {
                day: 5,
                title: "CARTAGENA - COMPRAS / FELIZ RETORNO",
                image: cartagenaImg,
                description: "08:00 hrs: DESAYUNO BUFFET. Traslado a centros artesanales y comerciales para compras de souvenirs.\n13:00 hrs: ALMUERZO BUFFET DE DESPEDIDA.\n15:00 hrs: Traslado de salida al aeropuerto.\n17:20 hrs: Salida con destino a la ciudad de Lima (LATAM LA 2449).\n17:00 hrs: Ingreso a la estación de snack (Lima).\n20:55 hrs: Llegada a la ciudad de Lima. Traslado de salida en transporte exclusivo MOVIL BUS."
            }
        ],
        programIncludes: [
            "BOLETO AÉREO LIMA / CARTAGENA / LIMA (LATAM O AVIANCA).",
            "TRASLADOS COLEGIO / AEROPUERTO / COLEGIO (MOVIL BUS).",
            "TRASLADO APTO CARTAGENA / HOTEL / APTO CARTAGENA.",
            "04 NOCHES DE ALOJAMIENTO EN HOTEL CARTAGENA PLAZA ****.",
            "SISTEMA ALL INCLUSIVE: 04 Desayunos, 04 Almuerzos (Inc. 1 Marino), 04 Cenas Buffet.",
            "Snacks entre comidas y bebidas ilimitadas.",
            "PROGRAMA DIARIO DE ACTIVIDADES: Bailes, juegos, aeróbicos, deportes de playa.",
            "TOURS: PASEO EN CHIVAS, CITY TOUR HISTÓRICO, ISLAS DEL ROSARIO, OCEANARIO, PLAYA BLANCA BARÚ.",
            "NOCHE DE BLANCO en la discoteca del hotel con animación.",
            "TARJETA DE ASISTENCIA SOS24, SIN DEDUCIBLE.",
            "TOUR CONDUCTOR (Para grupos de min. 20 pax).",
            "VIDEOS Y FOTOGRAFÍAS GRUPALES en formato MP4 (Para grupos de min. 20 pax).",
            "POR CADA 15 PAGANTES UN LIBERADO."
        ],
        programExcludes: [
            "Gastos personales y propinas.",
            "Servicios no especificados en el programa."
        ],
        conditions: [
            "FECHA LÍMITE INSCRIPCIÓN: 28 FEB.",
            "PREPAGO USD 200 NO REEMBOLSABLE, NO TRANSFERIBLE.",
            "Compromiso de viaje firmado por padre de familia.",
            "Toda anulación hasta 90 días antes del vuelo tiene penalidad de USD 200.",
            "Incluye maleta 12kg CARRY ON para bodega y mochila 10kg para cabina.",
            "Pagos a la cuenta de la empresa informada por carta.",
            "Aceptamos tarjetas VISA, MASTERCARD (Comisión 5%)."
        ],
        hotelInfo: {
            name: "HOTEL CARTAGENA PLAZA",
            description: "Hotel categoría 4 estrellas ubicado en Bocagrande. Habitaciones totalmente renovadas con vista al mar o a la ciudad antigua. Destaca por su excelente infraestructura y la calidez de su servicio, ideal para grupos y familias.",
            features: [
                "HABITACIONES DOBLES ESTÁNDAR",
                "PISCINA PANORÁMICA (Piso 18)",
                "ZONA DE PLAYA FRENTE AL HOTEL (con parasoles y toallas)",
                "RESTAURANTE BUFFET LE PLACE (Capacidad 284 pax)",
                "Estación de jugos y cocina en vivo",
                "Recreación dirigida y Shows de entretenimiento diarios",
                "Discoteca en el hotel"
            ],
            gastronomy: "El restaurante buffet 'Le Place' ofrece la mejor comida nacional e internacional en un ambiente espacioso y moderno. Disfrute de desayunos, almuerzos y cenas temáticas con cocina en vivo."
        }
    },
    {
        id: 4,
        slug: "san-andres",
        title: "San Andrés",
        price: "USD 600",
        image: sanAndresImg,
        headerImage: sanAndresHeaderImg,
        description: "Disfruta de San Andrés con todo incluido. Alojamiento, tours y traslados.",
        itinerary: [
            { day: 1, title: "Llegada al Caribe Colombiano", image: sanAndresImg, description: "Recibimiento y traslado al hotel. Tarde libre para conocer la playa principal." },
            { day: 2, title: "Vuelta a la Isla", image: sanAndresImg, description: "Recorrido por los puntos turísticos: Hoyo Soplador, Cueva de Morgan y piscinas naturales." },
            { day: 3, title: "Acuario y Johnny Cay", image: sanAndresImg, description: "Tour en lancha a los cayos cercanos. Observación de mantarrayas y almuerzo en la playa." },
            { day: 4, title: "Despedida", image: sanAndresImg, description: "Traslado al aeropuerto Gustavo Rojas Pinilla." }
        ]
    },
    {
        id: 5,
        slug: "royal-decameron",
        title: "Royal Decameron Punta Sal",
        price: "USD 700",
        image: royalDecameronImg,
        headerImage: royalDecameronHeaderImg,
        description: "Disfruta del Royal Decameron Punta Sal con todo incluido. Sol, playa, tortugas y diversión garantizada en el norte del Perú.",
        overview: "El Hotel Royal Decameron Punta Sal Beach Resort, Spa & Convention Center cuenta con 1.5 km de playa y sol todo el año. Ubicado en Tumbes, ofrece un sistema Todo Incluido con una gran diversidad gastronómica y actividades recreativas.",
        itinerary: [
            {
                day: 1,
                title: "LIMA / TUMBES / DECAMERON PUNTA SAL",
                image: royalDecameronImg,
                description: "06:00 hrs: Reunión en el colegio. Entrega de distintivos de EXPEDITIONS GROUP. Equipaje: 1 maleta de 10kg (bodega) + 1 mochila (mano).\n06:30 hrs: Traslado al aeropuerto Jorge Chávez (MOVIL BUS).\n11:25 hrs: Salida con destino TUMBES (LATAM).\n13:05 hrs: Llegada al aeropuerto. Traslado a ROYAL DECAMERON PUNTA SAL en bus privado.\n14:35 hrs: Llegada y recepción con bebidas frías. Entrega de brazaletes y habitaciones dobles estándar.\nALMUERZO BUFFET. Tarde de piscina.\n19:00 hrs: CENA BUFFET.\n21:00 hrs: SHOW NOCTURNO. Pernocte."
            },
            {
                day: 2,
                title: "DECAMERON PUNTA SAL / ACTIVIDADES",
                image: royalDecameronImg,
                description: "08:00 hrs: Desayuno buffet.\n10:00 hrs: Full diversión con actividades recreativas en la piscina (aeróbicos, baile) a cargo del staff.\n13:00 hrs: ALMUERZO BUFFET.\nTarde de actividades recreativas en la playa: DECA OLIMPIADAS (Fútbol y Vóley Playa).\n20:00 hrs: CENA A LA CARTA en restaurante especializado.\n21:00 hrs: SHOW NOCTURNO. Pernocte."
            },
            {
                day: 3,
                title: "ROYAL DECAMERON / ÑURO / BAÑO CON TORTUGAS",
                image: royalDecameronImg,
                description: "07:00 hrs: DESAYUNO BUFFET.\n08:00 hrs: Salida hacia la caleta El Ñuro. Paseo en lancha y nado con tortugas marinas.\n13:00 hrs: ALMUERZO BUFFET.\n15:00 hrs: Actividades recreativas en la piscina (aeróbicos, baile).\n20:00 hrs: CENA BUFFET.\nSHOW NOCTURNO. Pernocte."
            },
            {
                day: 4,
                title: "FULL ACTIVIDADES / NOCHE DE BLANCO",
                image: royalDecameronImg,
                description: "08:00 hrs: Desayuno buffet.\n10:00 hrs: Actividades recreativas en piscina (Waterpolo, etc).\n13:00 hrs: ALMUERZO BUFFET.\nTarde de Fútbol Playa.\n20:00 hrs: CENA A LA CARTA.\n21:00 hrs: NOCHE DE BLANCO. Fiesta en la playa con animación y bebidas sin alcohol."
            },
            {
                day: 5,
                title: "DECAMERON PUNTA SAL / KAYAK / RETORNO",
                image: royalDecameronImg,
                description: "08:00 hrs: Desayuno buffet. Deporte de aventura: KAYAK a cargo del staff. Tiempo para maletas y FOTOS GRUPALES.\n12:00 hrs: ALMUERZO BUFFET DE DESPEDIDA. Entrega de habitaciones.\n15:00 hrs: Traslado al aeropuerto de TUMBES. Parada en feria artesanal de Máncora.\n20:55 hrs: Partida a Lima.\n22:35 hrs: Llegada a Lima y traslado al colegio (MOVIL BUS)."
            }
        ],
        programIncludes: [
            "TICKET AÉREO LIMA / TUMBES / LIMA VIA LATAM.",
            "Traslado aeropuerto-colegio-aeropuerto (MOVIL BUS).",
            "Traslado aeropuerto / Hotel Decameron / aeropuerto.",
            "05 DÍAS / 04 NOCHES en DECAMERON PUNTA SAL (Hab. Dobles).",
            "SISTEMA TODO INCLUIDO: Desayunos, Almuerzos y Cenas Buffet.",
            "Snacks y bebidas ilimitadas.",
            "01 CENA a la carta en restaurante especializado.",
            "SHOW NOCTURNO diario.",
            "ACTIVIDADES RECREATIVAS: Decaolimpiadas, aeróbicos, waterpolo, kayak.",
            "TOUR ÑURO – NADO CON TORTUGAS.",
            "TOUR DE COMPRAS EN MÁNCORA.",
            "NOCHE DE BLANCO en la playa con animación.",
            "TOUR CONDUCTOR (Para grupos de min. 20 pax).",
            "FOTOS Y VIDEOS GRUPALES (Para grupos de min. 20 pax).",
            "1 LIBERADO por cada 15 pagantes (máx 6)."
        ],
        programExcludes: [
            "Gastos personales no especificados."
        ],
        conditions: [
            "RESERVA CONFIRMADA CON LATAM (Fechas específicas Octubre).",
            "INSCRIPCIÓN USD 100 (PRE PAGO) NO REEMBOLSABLE.",
            "Equipaje: 1 de 10kg bodega + 1 mochila cabina.",
            "Pagos a cuenta bancaria previa firma de compromiso.",
            "Aceptamos tarjetas VISA, MASTERCARD (Comisión 5%)."
        ],
        hotelInfo: {
            name: "HOTEL ROYAL DECAMERON PUNTA SAL",
            description: "Resort con 1.5 km de playa, clima tropical todo el año y aguas cálidas (sobre 20°C). Ofrece una experiencia Todo Incluido de primer nivel en el norte peruano.",
            features: [
                "413 Habitaciones con Aire Acondicionado",
                "TV Cable, Secador, Agua caliente",
                "Piscina y Playa extensa",
                "Cancha de tenis y gimnasio",
                "Enfermería",
                "Tienda de souvenirs"
            ],
            gastronomy: "Restaurante buffet 'Blue Marlin' y 3 restaurantes a la carta: 'La Cevichería' (Peruana), 'Oliva Limón' (Mediterránea) y 'La Picantería'. Además de snacks y bares."
        }
    },
    {
        id: 6,
        slug: "cusco-magico",
        title: "Cusco Mágico",
        price: "S/ 650",
        image: cuscoImg,
        headerImage: cuscoHeaderImg,
        description: "Descubre la magia de los Andes: Machu Picchu, Valle Sagrado, Parque Extremo y diversión en Royal Inka Pisac y Samay Cusco.",
        overview: "Una experiencia completa en Cusco que combina historia, cultura y diversión. Alojamiento en el Valle Sagrado (Royal Inka Pisac) con instalaciones recreativas y en la ciudad de Cusco (Hotel Samay), con visitas a los principales atractivos arqueológicos y parques temáticos.",
        itinerary: [
            {
                day: 1,
                title: "LIMA - CUSCO - ROYAL INKA PISAC",
                image: cuscoImg,
                description: "04:30 hrs: Traslado al aeropuerto en MOVIL BUS. Entrega de equipaje (23kg bodega + 10kg mano).\n06:10 hrs: Salida a Cusco (LATAM).\n07:30 hrs: Llegada y traslado al Hotel ROYAL INKA PISAC en bus privado.\n09:30 hrs: DESAYUNO BUFFET.\n10:30 hrs: Instalación en habitaciones. ALMUERZO BUFFET.\nTarde de DIVERSIÓN en el hotel: Piscina temperada, cine, canchas deportivas, juegos de salón.\nCENA EN EL HOTEL.\nNOCHE DE DISCOTECA exclusiva para el grupo."
            },
            {
                day: 2,
                title: "OLLANTAYTAMBO / MORAY / CINE",
                image: cuscoImg,
                description: "08:00 hrs: Desayuno buffet.\nVisita a las ruinas de OLLANTAYTAMBO y al complejo arqueológico de MORAY (andenes circulares).\n14:00 hrs: ALMUERZO BUFFET REST. TUNUPA.\nRetorno al Hotel Royal Inka. Tarde de piscina, deportes y juegos.\nCINE: Función privada para el grupo.\nCENA EN EL HOTEL. Pernocte."
            },
            {
                day: 3,
                title: "FULL DAY MACHUPICCHU / CUSCO",
                image: cuscoImg,
                description: "06:10 hrs: Traslado a estación Ollantaytambo. Tren PERU RAIL a Aguas Calientes (Box Lunch a bordo).\n07:40 hrs: Subida en bus a la ciudadela. Excursión guiada a MACHU PICCHU (Templo del Sol, Intihuatana, etc).\nRetorno a Aguas Calientes.\n14:00 hrs: ALMUERZO BUFFET REST. TOTOS HOUSE.\n16:45 hrs: Tren de retorno a Ollantaytambo. Traslado a Cusco.\nInstalación en HOTEL SAMAY CUSCO.\nCENA EN EL HOTEL. Pernocte."
            },
            {
                day: 4,
                title: "VALLE SUR - PARQUE EXTREMO - KORICANCHA",
                image: cuscoImg,
                description: "08:00 hrs: Desayuno buffet. Excursión al Valle Sur: Tipón y Oropesa (panes artesanales).\nVisita al PARQUE EXTREMO ZONA GAMA: Painball + Fútbol Burbuja + 1 Juego Libre.\n14:00 hrs: ALMUERZO BUFFET REST. LA EMILIANA.\n15:00 hrs: Visita al Templo del KORICANCHA, Plaza de Armas, Piedra de los 12 Ángulos y Catedral. Tiempo de compras.\n20:00 hrs: CENA PIZZA LIBRE (Rest. La Suprema)."
            },
            {
                day: 5,
                title: "CITY TOUR / SACSAYHUAMÁN / RETORNO",
                image: cuscoImg,
                description: "08:00 hrs: DESAYUNO BUFFET.\nVisita a la fortaleza de SACSAYHUAMÁN, Cristo Blanco y QENQO.\n13:00 hrs: ALMUERZO BUFFET (Tunupa Cusco).\n15:45 hrs: Traslado al aeropuerto.\n17:45 hrs: Vuelo de retorno a Lima (LATAM).\n19:25 hrs: Llegada a Lima y traslado al colegio (MOVIL BUS)."
            }
        ],
        programIncludes: [
            "TICKET AÉREO LIMA / CUSCO / LIMA (LATAM). Equipaje 23kg + 10kg.",
            "Traslados aeropuerto-colegio-aeropuerto y en destino (Buses turísticos).",
            "TREN EXPEDITIONS PERURAIL.",
            "02 Noches en HOTEL ROYAL INKA PISAC (Piscina, cine, deportes).",
            "02 Noches en HOTEL SAMAY CUSCO (Céntrico).",
            "ALIMENTACIÓN COMPLETA: 4 Desayunos, 5 Almuerzos Buffet, 3 Cenas Hotel + 1 Pizza Libre.",
            "ENTRADAS a todos los monumentos y PARQUE EXTREMO GAMA.",
            "Guía oficial y Tour Conductor (min. 20 pax).",
            "MÉDICO ACOMPAÑANTE y tarjeta de asistencia (cobertura S/ 30,000).",
            "VIDEO Y FOTOS grupales (min. 20 pax).",
            "1 LIBERADO por cada 10 pagantes."
        ],
        programExcludes: [
            "Gastos personales no especificados."
        ],
        conditions: [
            "RESERVA 100 PLAZAS CON LATAM.",
            "INSCRIPCIÓN USD 100 (PRE PAGO) NO REEMBOLSABLE.",
            "Pagos a cuenta bancaria de la empresa.",
            "Aceptamos tarjetas VISA, MASTERCARD (Comisión 5%)."
        ],
        hotelInfo: {
            name: "HOTELES: ROYAL INKA PISAC & SAMAY CUSCO",
            description: "Combinación perfecta de relax campestre y confort urbano. Royal Inka Pisac ofrece club privado con piscina olímpica y canchas deportivas. Hotel Samay ofrece ubicación estratégica en Av. El Sol, habitaciones modernas y todos los servicios.",
            features: [
                "ROYAL INKA: Piscina temperada, Cine, Canchas deportivas (Tenis, Fútbol), Billar",
                "SAMAY: Ubicación céntrica, Wifi, Calefacción, Restaurante amplio",
                "Habitaciones dobles/triples con baño privado",
                "Agua caliente"
            ],
            gastronomy: "Desayunos buffet y cenas en ambos hoteles. Almuerzos buffet en restaurantes turísticos de primer nivel como Tunupa y Totos House."
        }
    },
    {
        id: 7,
        slug: "tarapoto",
        title: "Tarapoto Fascinante",
        price: "S/ 380",
        image: tarapotoImg,
        headerImage: tarapotoHeaderImg,
        description: "Aventura en la selva: Laguna Azul, Cataratas de Ahuashiyacu, Moyobamba y diversión en Sumaj Lodge y DM Hoteles.",
        overview: "Disfruta de lo mejor de la selva peruana con una experiencia combinada: relájate frente a la Laguna Azul en el Sumaj Lodge y explora la ciudad desde el confortable DM Hoteles Tarapoto. Naturaleza, aventura y cultura en un solo viaje.",
        itinerary: [
            {
                day: 1,
                title: "LIMA / TARAPOTO / SUMAJ LODGE",
                image: tarapotoImg,
                description: "02:00 hrs: Reunión en el colegio. Entrega de equipaje (10kg carry on + mochila).\n02:15 hrs: Traslado al aeropuerto (MOVIL BUS).\n09:45 hrs: Salida a Tarapoto (LATAM LA2250).\n11:05 hrs: Llegada y traslado al HOTEL SUMAJ LODGE *** en Sauce (Laguna Azul), cruzando el río Huallaga en balsa cautiva.\nInstalación en habitaciones. ALMUERZO DE BIENVENIDA.\nTarde recreativa: Piscina con vista a la laguna, fulbito, billar.\n20:00 hrs: CENA y NOCHE DE FOGATA con historias y leyendas de la selva."
            },
            {
                day: 2,
                title: "LAGUNA AZUL / DEPORTES ACUÁTICOS",
                image: tarapotoImg,
                description: "08:00 hrs: Desayuno buffet. Paseo en bote por la Laguna Azul (Butaca de la Sirena).\nActividades: Moto acuática, paseo a caballo, canopy (opcionales).\n14:00 hrs: ALMUERZO REST. CAMPESTRE EL PARAÍSO.\nTarde libre en el hotel: Pedalones y kayak al atardecer.\n20:00 hrs: CENA.\nNOCHE DE BLANCO con DJ."
            },
            {
                day: 3,
                title: "CATARATAS DE AHUASHIYACU / LAMAS",
                image: tarapotoImg,
                description: "08:00 hrs: Desayuno buffet. Check-out.\nVisita a las CATARATAS DE AHUASHIYACU (Cordillera Escalera). Baño refrescante y observación de flora/fauna.\nTraslado a Tarapoto e instalación en DM HOTELES TARAPOTO.\n14:00 hrs: ALMUERZO REGIONAL REST. LA PATARASHCA.\nVisita a LAMAS 'Ciudad de los Tres Pisos' y comunidad nativa (danzas y costumbres).\n20:00 hrs: CENA PIZZA (Café do Mondo)."
            },
            {
                day: 4,
                title: "MOYOBAMBA / RIOJA / TIOYACU",
                image: tarapotoImg,
                description: "08:00 hrs: Desayuno buffet.\nExcursión al Alto Mayo (Moyobamba y Rioja). Visita a la naciente del RÍO TIOYACU (baño refrescante).\n14:00 hrs: ALMUERZO CAMPESTRE REST. MILAN.\nVisita a los Baños Termales de San Mateo y Cooperativa Rio Mayu (compras).\nRetorno a Tarapoto.\n20:00 hrs: CENA. Pernocte."
            },
            {
                day: 5,
                title: "CITY TOUR / COMPRAS / RETORNO",
                image: tarapotoImg,
                description: "08:00 hrs: Desayuno americano. Mañana de piscina en el hotel.\n13:00 hrs: ALMUERZO DE DESPEDIDA.\n14:00 hrs: City Tour Tarapoto. Visita a Fábrica de Chocolates Orquídea y ferias artesanales.\nTraslado al aeropuerto.\n19:20 hrs: Salida a Lima (LATAM 2257).\n20:45 hrs: Llegada a Lima y traslado al colegio (MOVIL BUS)."
            }
        ],
        programIncludes: [
            "BOLETOS AÉREOS LIMA / TARAPOTO / LIMA (LATAM).",
            "Traslados aeropuerto-colegio-aeropuerto (MOVIL BUS).",
            "Traslados internos en UNIDADES DE TURISMO SPRINTER.",
            "02 Noches en HOTEL SUMAJ LODGE (Laguna Sauce).",
            "02 Noches en HOTEL DM HOTELES TARAPOTO.",
            "ALIMENTACIÓN COMPLETA: Desayunos Buffet, Almuerzos Típicos/Carta, 4 Cenas + 1 Pizza.",
            "TOURS: Laguna Azul, Ahuashiyacu, Moyobamba-Tioyacu, Lamas, City Tour.",
            "DEPORTES ACUÁTICOS: Kayak, Pedalones, Paseo en lancha.",
            "NOCHE DE BLANCO con DJ.",
            "NOCHE DE FOGATA.",
            "Guía oficial de turismo y Tour Conductor (min. 20 pax).",
            "FILMACIÓN DEL VIAJE (min. 20 pax).",
            "1 LIBERADO por cada 15 participantes."
        ],
        programExcludes: [
            "Gastos personales no especificados."
        ],
        conditions: [
            "INSCRIPCIÓN USD 100 (PRE PAGO) NO REEMBOLSABLE.",
            "Saldo en armadas. Pagos a cuenta de la empresa.",
            "Equipaje: 10kg carry on (bodega) + bolso/mochila (mano).",
            "Aceptamos tarjetas VISA, MASTERCARD (Comisión 5%)."
        ],
        hotelInfo: {
            name: "HOTELES: SUMAJ LODGE & DM HOTELES",
            description: "Experiencia dual: Sumaj Lodge en la Laguna Sauce para conexión total con la naturaleza y DM Hoteles en Tarapoto con 5 hectáreas de jardines. Ambos ofrecen confort, piscina y excelente gastronomía.",
            features: [
                "SUMAJ LODGE: Vista a la laguna, Terraza, Ventiladores, Deportes acuáticos",
                "DM HOTELES: Piscina, Aire Acondicionado, Wifi, TV Cable, Jardines extensos",
                "Habitaciones dobles/triples",
                "Baño privado y agua caliente"
            ],
            gastronomy: "Desayunos buffet y cenas variadas (incluyendo noche de pizza). Almuerzos regionales en restaurantes reconocidos como La Patarashca y El Paraíso."
        }
    },
    {
        id: 8,
        slug: "playas-norte",
        title: "Playas del Norte - Rústica Vichayito",
        price: "S/ 800",
        image: playasDelNorteImg,
        headerImage: playasDelNorteHeaderImg,
        description: "Disfruta del eterno verano en Rústica Vichayito. Sol, playa, tortugas en El Ñuro y diversión total en el norte.",
        overview: "Ubicado frente al mar en el distrito de Los Órganos, Rústica Vichayito ofrece una experiencia inolvidable con el eterno verano del norte. Disfruta de una gran piscina, gastronomía norteña y habitaciones con vista al mar, además de tours a los mejores balnearios como Punta Sal y Zorritos.",
        itinerary: [
            {
                day: 1,
                title: "LIMA - TALARA - VICHAYITO - RÚSTICA",
                image: playasDelNorteImg,
                description: "04:00 hrs: Reunión en el colegio. Entrega de distintivos. Equipaje: 10kg carry on (bodega) + 10kg mano.\n06:50 hrs: Salida a Talara (LATAM LA2251).\n08:45 hrs: Llegada a Talara.\n09:30 hrs: Traslado en bus privado a Órganos.\n11:30 hrs: Llegada e instalación en HOTEL RÚSTICA VICHAYITO **** (Hab. Triples).\n14:00 hrs: ALMUERZO DE BIENVENIDA.\nTarde de sol y piscina.\nCENA EN EL HOTEL.\nNOCHE DE FOGATA."
            },
            {
                day: 2,
                title: "ÑURO - PASEO COSTERO - PUNTA VELEROS",
                image: playasDelNorteImg,
                description: "08:00 hrs: Desayuno americano.\n09:00 hrs: Salida a EL ÑURO. Paseo costero en lancha y nado con tortugas marinas (Incluye chalecos).\n13:00 hrs: ALMUERZO MARINO REST. BAMBU.\n15:00 hrs: Visita a la Playa de PUNTA VELEROS.\n17:00 hrs: Retorno al hotel.\nNOCHE DE PIZZA (Rest. Pizzería Antica).\nNOCHE DE KARAOKE - RÚSTICA. Pernocte."
            },
            {
                day: 3,
                title: "PUNTA SAL – ZORRITOS – MUELLE FLOTANTE",
                image: playasDelNorteImg,
                description: "07:00 hrs: Desayuno Americano.\n08:00 hrs: Salida a PUNTA SAL (aguas cálidas). Visita al balneario de ZORRITOS y su muelle flotante.\n13:00 hrs: ALMUERZO MARINO REST. EL BRUJO.\n14:00 hrs: Disfrute del balneario de ZORRITOS.\n16:00 hrs: Retorno al hotel.\n20:00 hrs: CENA EN EL HOTEL. Pernocte."
            },
            {
                day: 4,
                title: "ACTIVIDADES EN EL HOTEL - NOCHE DE BLANCO",
                image: playasDelNorteImg,
                description: "08:00 hrs: Desayuno buffet. Actividades grupales en la piscina a cargo del STAFF.\nALMUERZO A LA CARTA EN EL HOTEL.\nTarde de actividades recreativas en la playa.\nCENA EN EL HOTEL.\nNOCHE DE BLANCO: Discoteca del hotel (09 a 11 PM). Pernocte."
            },
            {
                day: 5,
                title: "PASEO A CABALLO - MÁNCORA - RETORNO",
                image: playasDelNorteImg,
                description: "08:00 hrs: Desayuno americano.\n09:00 hrs: PASEO A CABALLO por la playa.\n13:00 hrs: ALMUERZO DE DESPEDIDA.\n14:00 hrs: Visita a MÁNCORA (Plaza y feria de artesanías).\n17:00 hrs: Traslado al aeropuerto de Talara.\n21:00 hrs: Salida a Lima (LATAM LA2256).\n22:40 hrs: Llegada a Lima y traslado al colegio (MOVIL BUS)."
            }
        ],
        programIncludes: [
            "TICKET AÉREO LIMA / TALARA / LIMA (LATAM). Equipaje 10kg + 10kg.",
            "Traslados aeropuerto-colegio-aeropuerto (MOVIL BUS).",
            "Traslado Talara / Órganos / Talara (Bus Privado).",
            "04 Noches en HOTEL RÚSTICA VICHAYITO ****.",
            "ALIMENTACIÓN COMPLETA: Desayunos Americanos, Almuerzos Marinos/Carta, Cenas Carta/Pizza.",
            "TOURS: Ñuro (Tortugas), Punta Sal, Zorritos (Muelle Flotante), Máncora, Paseo a Caballo.",
            "ACTIVIDADES: Fiesta de Blanco, Karaoke, Fogata, Staff de animación.",
            "Tarjeta de asistencia SOS - 24 (Cobertura S/ 30,000).",
            "Tour Conductor y Filmación/Fotos (min. 20 pax).",
            "1 LIBERADO por cada 15 participantes."
        ],
        programExcludes: [
            "Gastos personales no especificados."
        ],
        conditions: [
            "RESERVA CONFIRMADA (Octubre 05-09 o 13-17).",
            "INSCRIPCIÓN USD 100 (PRE PAGO) NO REEMBOLSABLE.",
            "Penalidad por anulación hasta 90 días antes: USD 100.",
            "Aceptamos tarjetas VISA, MASTERCARD (Comisión 5%)."
        ],
        hotelInfo: {
            name: "HOTEL RÚSTICA VICHAYITO",
            description: "Ubicado frente a la playa en el distrito de Órganos, Vichayito goza de un eterno verano. El hotel ofrece una experiencia mágica con brisa marina, exquisita comida norteña y amplias áreas de entretenimiento.",
            features: [
                "Habitaciones Triples con vista al mar",
                "Aire Acondicionado, Terraza, TV Cable",
                "Piscina amplia",
                "Karaoke y Discoteca",
                "Restaurante y Pizzería"
            ],
            gastronomy: "Restaurante Rústica con variada carta de platos norteños, Pizzería Antica para la noche de pizzas y almuerzos marinos en restaurantes externos seleccionados (Bambú, El Brujo)."
        }
    },
    {
        id: 9,
        slug: "cajamarca",
        title: "Cajamarca",
        price: "S/ 450",
        image: cajamarcaImg,
        description: "Historia y termalismo en los andes del norte.",
        itinerary: [
            { day: 1, title: "Arribo a Cajamarca", image: cajamarcaImg, description: "Traslado al hotel. City tour peatonal por la Plaza de Armas y Cuarto del Rescate." },
            { day: 2, title: "Cumbemayo", image: cajamarcaImg, description: "Visita al bosque de piedras y canal de Cumbemayo. Vistas panorámicas del valle." },
            { day: 3, title: "Baños del Inca", image: cajamarcaImg, description: "Relax en las aguas termales de los Baños del Inca y visita a la Collpa para el llamado de vacas." },
            { day: 4, title: "Salida", image: cajamarcaImg, description: "Traslado al aeropuerto Armando Revoredo Iglesias." }
        ]
    },
    {
        id: 10,
        slug: "arequipa",
        title: "Arequipa y Colca",
        price: "S/ 420",
        image: arequipaImg,
        headerImage: arequipaHeaderImg,
        description: "Descubre la Ciudad Blanca y la majestuosidad del Cañón del Colca. Cultura, historia y naturaleza en Arequipa.",
        overview: "Explora la belleza de Arequipa, sus monasterios y campiña, y adéntrate en uno de los cañones más profundos del mundo. Alojamiento combinado en la ciudad (Hotel Corregidor) y en la tranquilidad del Colca (Casona Plaza Ecolodge).",
        itinerary: [
            {
                day: 1,
                title: "LIMA / AREQUIPA / CITY TOUR",
                image: arequipaImg,
                description: "03:00 hrs: Reunión en el Colegio. Traslado al aeropuerto (MOVIL BUS).\n06:00 hrs: Salida a Arequipa (LATAM).\n07:30 hrs: Llegada y traslado al HOTEL CORREGIDOR ***. Desayuno Buffet.\n13:00 hrs: ALMUERZO DE BIENVENIDA.\n14:00 hrs: City Tour peatonal: Plaza de Armas, Catedral, San Francisco, Claustros de la Compañía y Casonas Coloniales.\n20:00 hrs: Cena en el hotel."
            },
            {
                day: 2,
                title: "CAMPIÑA / MOLINO DE SABANDIA / SANTA CATALINA",
                image: arequipaImg,
                description: "08:00 hrs: Desayuno buffet.\n09:00 hrs: Excursión por la Campiña: Mirador de Chilina, Yanahuara, Paucarpata, Molino de Sabandía y Mansión del Fundador.\n13:00 hrs: ALMUERZO REST. TURÍSTICO TIPIKA.\n14:00 hrs: Visita al MONASTERIO DE SANTA CATALINA, ciudadela religiosa colonial.\n20:00 hrs: Cena en el hotel."
            },
            {
                day: 3,
                title: "CAÑÓN DEL COLCA / BAÑOS TERMALES",
                image: arequipaImg,
                description: "07:00 hrs: Desayuno buffet.\n08:00 hrs: Salida al Valle del Colca. Paso por Reserva Nacional de Aguada Blanca (Vicuñas). Llegada a Chivay/Yanque.\nInstalación en HOTEL CASONA PLAZA ECOLODGE COLCA ***.\n13:00 hrs: ALMUERZO EN EL HOTEL.\n14:00 hrs: Baños Termales de La Calera.\n20:00 hrs: Cena en el hotel.\nNOCHE DE DISCOTECA."
            },
            {
                day: 4,
                title: "CRUZ DEL CÓNDOR / AREQUIPA / LIMA",
                image: arequipaImg,
                description: "07:00 hrs: Desayuno buffet.\n08:00 hrs: Visita a la CRUZ DEL CÓNDOR para apreciar el vuelo de los cóndores y la profundidad del cañón. Retorno visitando pueblos (Pinchillo, Maca, Yanque) y miradores.\n13:00 hrs: ALMUERZO BUFFET EN CHIVAY.\n14:00 hrs: Retorno a Arequipa.\n19:00 hrs: Traslado al aeropuerto.\n20:00 hrs: Salida a Lima.\n20:30 hrs: Llegada y traslado al colegio (MOVIL BUS)."
            }
        ],
        programIncludes: [
            "TICKET AÉREO LIMA / AREQUIPA / LIMA (LATAM).",
            "Traslados aeropuerto-colegio-aeropuerto (MOVIL BUS).",
            "Traslados internos turísticos.",
            "02 Noches en HOTEL CORREGIDOR *** (Arequipa).",
            "01 Noche en HOTEL CASONA PLAZA ECOLODGE COLCA *** (Yanque/Chivay).",
            "ALIMENTACIÓN COMPLETA: 4 Desayunos Buffet, 3 Almuerzos Carta, 1 Almuerzo Buffet, 3 Cenas.",
            "TOURS: City Tour, Campiña, Santa Catalina, Colca (2 días).",
            "ENTRADAS a lugares turísticos.",
            "Guía Oficial y Tour Conductor (min. 20 pax).",
            "FILMACIÓN DEL VIAJE (min. 20 pax).",
            "1 LIBERADO por cada 15 pagantes."
        ],
        programExcludes: [
            "Gastos personales no especificados."
        ],
        conditions: [
            "INSCRIPCIÓN con PRE PAGO.",
            "Equipaje según regulación de la aerolínea.",
            "Permiso notarial requerido para menores."
        ],
        hotelInfo: {
            name: "HOTELES: CORREGIDOR & CASONA PLAZA COLCA",
            description: "Alojamiento estratégico: Hotel Corregidor en el centro histórico de Arequipa (boutique) y Casona Plaza Ecolodge en el Valle del Colca (casitas de piedra, naturaleza).",
            features: [
                "CORREGIDOR: Ubicación céntrica, Wifi, TV pantalla plana, Minibar",
                "CASONA COLCA: Ecolodge, vistas a montañas, áreas verdes, tranquilo",
                "Habitaciones con baño privado"
            ],
            gastronomy: "Desayunos buffet y cenas servidas en los hoteles. Almuerzos en restaurantes turísticos tradicionales (Tipika, Chivay)."
        }
    },
    {
        id: 11,
        slug: "sur-magico",
        title: "Sur Mágico - Hotel Las Dunas",
        price: "S/ 320",
        image: surMagicoImg,
        headerImage: surMagicoHeaderImg,
        description: "Lujo y diversión en el desierto: Islas Ballestas, Huacachina y el exclusivo Hotel Las Dunas con todo incluido.",
        overview: "Escápate a un oasis de 14 hectáreas en medio del desierto de Ica. El Hotel Las Dunas ofrece la combinación perfecta de aventura (sandboard, tubulares) y relax (3 piscinas, jardines) con un servicio de primera clase.",
        itinerary: [
            {
                day: 1,
                title: "LIMA / PARACAS / HOTEL LAS DUNAS",
                image: surMagicoImg,
                description: "06:00 hrs: Reunión en el Colegio.\n06:10 hrs: Salida rumbo al Sur en transporte turístico privado MOVIL BUS.\n09:30 hrs: Llegada al muelle El Chaco. TOUR ISLAS BALLESTAS en deslizador: Candelabro, lobos marinos, pingüinos de Humboldt y aves guaneras.\n12:00 hrs: ALMUERZO MARINO REST. PARACAS.\n13:00 hrs: Traslado a Ica.\n14:00 hrs: Instalación en HOTEL LAS DUNAS (Hab. dobles, triples, cuádruples).\n15:00 hrs: Tarde de disfrute en el hotel: 3 piscinas, canchas deportivas, sandboard.\n20:00 hrs: CENA EN EL HOTEL."
            },
            {
                day: 2,
                title: "HOTEL LAS DUNAS / HUACACHINA / SANDBOARDING",
                image: surMagicoImg,
                description: "08:00 hrs: Desayuno buffet.\nMañana de aventura en el OASIS DE HUACACHINA: Paseo en TUBULARES (carros areneros) y práctica de SANDBOARDING en las dunas.\n13:00 hrs: ALMUERZO EN EL HOTEL.\nTarde libre para disfrutar las instalaciones: Piscinas, paseo en bicicletas por áreas verdes.\n20:00 hrs: CENA EN EL HOTEL."
            },
            {
                day: 3,
                title: "CITY TOUR ICA / CACHICHE / RETORNO",
                image: surMagicoImg,
                description: "08:00 hrs: Desayuno buffet. Mañana recreativa en el hotel (Sandboard, piscina). OPCIONAL: Paseo a caballo.\n14:00 hrs: ALMUERZO REST. LA OLLA DE JUANITA.\nRecorrido CITY TOUR ICA: Plaza principal, pueblo de CACHICHE (Brujas, Palmera de 7 cabezas) y viñedos (degustación).\nRetorno a Lima en transporte privado."
            }
        ],
        programIncludes: [
            "TRANSPORTE TURÍSTICO PRIVADO MOVIL BUS (Aire acondicionado, baño, panorámico).",
            "03 Días / 02 Noches en HOTEL LAS DUNAS.",
            "ALIMENTACIÓN COMPLETA: 2 Desayunos Buffet + 1 Abordo, 2 Almuerzos Regionales, 2 Almuerzos Hotel, 2 Cenas Hotel.",
            "TOURS: Islas Ballestas, Tubulares y Sandboard en Huacachina, City Tour Ica, Cachiche.",
            "Uso de instalaciones del Hotel: 3 Piscinas, Gimnasio, Bicicletas, Canchas deportivas.",
            "Guía Oficial de Turismo y Tour Conductor (min. 20 pax).",
            "FILMACIÓN DEL VIAJE (min. 20 pax).",
            "1 LIBERADO por cada 20 pasajeros."
        ],
        programExcludes: [
            "Gastos personales no especificados."
        ],
        conditions: [
            "INSCRIPCIÓN S/. 500 (PRE PAGO) NO REEMBOLSABLE.",
            "Saldo en armadas según cronograma.",
            "Grupo mínimo 25 pax.",
            "Aceptamos tarjetas VISA, MASTERCARD (Comisión 5%)."
        ],
        hotelInfo: {
            name: "HOTEL LAS DUNAS",
            description: "Ubicado en un oasis de 14 hectáreas en Ica, entre las Líneas de Nazca y Paracas. Ofrece un clima cálido todo el año, 150 habitaciones equipadas y un entorno natural con jardines y lagunas para una experiencia inolvidable.",
            features: [
                "3 Piscinas y Tobogán",
                "Canchas deportivas (Fulbito, Tenis, Basket)",
                "Gimnasio y Spa",
                "Sandboard dentro del hotel",
                "Paseo en Bicicletas",
                "Wifi en habitaciones y áreas comunes"
            ],
            gastronomy: "Restaurante con desayunos buffet y almuerzos/cenas tipo carta (4 opciones: entrada, fondo y postre). Bar y atención personalizada."
        }
    },
    {
        id: 12,
        slug: "bolivia",
        title: "Bolivia",
        price: "USD 500",
        image: boliviaImg,
        description: "Salar de Uyuni y paisajes de otro planeta.",
        itinerary: [
            { day: 1, title: "La Paz", image: boliviaImg, description: "Llegada a La Paz. City tour y Valle de la Luna." },
            { day: 2, title: "Salar de Uyuni", image: boliviaImg, description: "Vuelo o bus a Uyuni. Excursión al Salar, Isla Incahuasi y fotos de perspectiva." },
            { day: 3, title: "Lagunas de Colores", image: boliviaImg, description: "Visita a la Laguna Colorada y observación de flamencos." },
            { day: 4, title: "Retorno", image: boliviaImg, description: "Regreso a La Paz y traslado internacional." }
        ]
    }
];
