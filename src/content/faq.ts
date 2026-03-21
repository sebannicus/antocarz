/**
 * faq.ts
 * Preguntas frecuentes de Antocarz.
 * Doble propósito: UX + Schema FAQPage para SEO.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: '¿El polarizado incluye el certificado legal?',
    answer:
      'Sí, todos nuestros trabajos de polarizado incluyen el certificado legal exigido por la Ley de Polarizados vigente en Chile. Puedes descargarlo directamente desde nuestra sección de Polarizado Legal o solicitarlo en tienda.',
  },
  {
    question: '¿Qué marcas de car audio instalan?',
    answer:
      'Trabajamos principalmente con JBL y Pioneer, dos de las marcas más reconocidas del mercado. También instalamos Hawk, BRM y otras marcas según el requerimiento del cliente. Contamos con adaptadores específicos para la mayoría de los modelos de vehículos disponibles en Chile.',
  },
  {
    question: '¿Tienen garantía en la instalación?',
    answer:
      'Sí, todos nuestros servicios incluyen garantía de instalación. Ante cualquier problema derivado de nuestro trabajo, lo solucionamos sin costo adicional. La duración varía por tipo de servicio — consúltanos directamente para el detalle de tu caso.',
  },
  {
    question: '¿Cuánto demora una instalación de alarma?',
    answer:
      'Una instalación de alarma estándar toma entre 2 y 3 horas. Si se incluye GPS o inmovilizador adicional, puede extenderse hasta 4 horas. Recomendamos agendar con anticipación para garantizarte el horario que prefieras.',
  },
  {
    question: '¿Trabajan con todos los modelos de autos?',
    answer:
      'Trabajamos con la gran mayoría de marcas y modelos disponibles en Chile, incluyendo Chevrolet, Hyundai, Kia, Toyota, Nissan, Suzuki, Volkswagen y más. Contamos con adaptadores específicos por modelo para garantizar una instalación limpia y sin modificaciones en el cableado original.',
  },
];
