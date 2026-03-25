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
      'Sí, todos nuestros trabajos de polarizado incluyen el certificado legal exigido por la Ley de Polarizados vigente en Chile. Trabajamos con láminas americanas de alta calidad con protección UV total. Puedes solicitar tu certificado directamente en tienda el mismo día de la instalación.',
  },
  {
    question: '¿Las radios Android ZTAudio son compatibles con CarPlay y Android Auto?',
    answer:
      'Sí. Las radios ZTAudio son compatibles con CarPlay inalámbrico y cableado (iOS 18 y versiones anteriores) y con Android Auto inalámbrico y cableado. Además incluyen GPS integrado con mapas globales, WiFi, Bluetooth A2DP, radio FM, reproducción 4K y Google Play Store completo para instalar Spotify, Waze, Netflix y más. Son compatibles con el 90% de los modelos del mercado (Toyota, Nissan, Kia, Hyundai, Chevrolet, Ford, Volkswagen y más).',
  },
  {
    question: '¿Qué marcas de car audio instalan?',
    answer:
      'Somos distribuidores de nuestra marca propia ZTAudio (radios Android con CarPlay y GPS) y trabajamos con JBL y Pioneer para amplificadores, parlantes y subwoofers. También instalamos Hawk y BRM en sistemas de alarma. Contamos con adaptadores específicos para la mayoría de los modelos de vehículos disponibles en Chile.',
  },
  {
    question: '¿Tienen garantía y soporte técnico después de la instalación?',
    answer:
      'Sí. Ofrecemos garantía absoluta en todos nuestros servicios e instalaciones. Si experimentas cualquier problema derivado de nuestro trabajo, lo resolvemos sin costo adicional. Además contamos con soporte técnico inmediato post-instalación: puedes contactarnos directamente por WhatsApp y un especialista te asiste a la brevedad. Más de 500 instalaciones respaldan nuestra calidad en La Serena.',
  },
  {
    question: '¿Cuánto demora una instalación de alarma o radio Android?',
    answer:
      'La instalación de una radio Android toma entre 1 y 2 horas dependiendo del modelo del vehículo. Una alarma estándar toma entre 2 y 3 horas; si se agrega GPS o inmovilizador RFID puede extenderse hasta 4 horas. Recomendamos agendar con anticipación para garantizarte el horario que prefieras en cualquiera de nuestras 2 sucursales en La Serena.',
  },
  {
    question: '¿Trabajan con todos los modelos de autos?',
    answer:
      'Trabajamos con la gran mayoría de marcas y modelos disponibles en Chile, incluyendo Toyota, Nissan, Chevrolet, Hyundai, Kia, Suzuki, Volkswagen, Ford, Mazda, Mitsubishi y más. Nuestras radios ZTAudio son compatibles con el 90% del parque vehicular. Contamos con adaptadores específicos por modelo para garantizar una instalación limpia, sin modificaciones en el cableado original.',
  },
];
