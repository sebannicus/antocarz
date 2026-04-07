/**
 * faq.ts
 * Preguntas frecuentes de Antocarz.
 * Doble propósito: UX + Schema FAQPage para SEO.
 */

export interface FaqItem {
  question: string;
  answer?: string;
  answerHtml?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: '¿El polarizado incluye el certificado legal?',
    answer:
      'Sí, todos nuestros trabajos de polarizado nanocarbón incluyen el certificado legal exigido por la Ley de Polarizados vigente en Chile, más el sello en relieve por vidrio. Más de +10.000 certificados emitidos respaldan nuestra experiencia. Puedes retirar tu certificado directamente en tienda el mismo día de la instalación.',
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

  // ── Ley de Polarizados ──────────────────────────────────────────────────
  {
    question: '¿Qué es un film polarizado para vehículos?',
    answer:
      'Es una lámina de poliéster de alta resistencia que se adhiere en la cara interior de los vidrios. Están diseñados para protegerse de la Radiación Solar, Rayos UV y Rayos Infrarrojos.',
  },
  {
    question: '¿Desde cuándo rige la Ley de Polarizados?',
    answer: 'La ley empezó a regir desde el 11 de Marzo de 2020.',
  },
  {
    question: '¿Qué porcentajes de Transmisión de Luz Visible están permitidos por ley?',
    answerHtml: `
      <table class="faq__table">
        <thead>
          <tr>
            <th></th>
            <th>Vehículos medianos y livianos</th>
            <th>Vehículos pesados, buses y camiones</th>
            <th>Taxis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vidrios laterales delanteros</td>
            <td>70%</td>
            <td>70%</td>
            <td>70%</td>
          </tr>
          <tr>
            <td>Vidrios laterales traseros</td>
            <td>28%</td>
            <td>Entre 50% y 70%</td>
            <td>Entre 50% y 70%</td>
          </tr>
          <tr>
            <td>Luneta trasera</td>
            <td>28%</td>
            <td>5%</td>
            <td>70%</td>
          </tr>
        </tbody>
      </table>
    `,
  },
  {
    question: '¿Qué pasa con los vehículos que ya tienen film polarizado?',
    answer: 'Deben ser retirados de circulación si no cumplen con la norma vigente.',
  },
  {
    question: '¿Están prohibidas las láminas de seguridad incoloras?',
    answer:
      'No. Las láminas de seguridad incoloras no están prohibidas y tampoco requieren Certificado de Instalación, ya que no tienen tinte que oscurezca la visibilidad.',
  },
  {
    question: '¿Quién realizará las fiscalizaciones?',
    answer:
      'Carabineros, Plantas de Revisión Técnica, Inspectores Fiscales y Municipales.',
  },
  {
    question: '¿Qué está prohibido en la Ley de Polarizados?',
    answerHtml: `
      <ul class="faq__list-items">
        <li>Instalación en vehículos de transporte escolar.</li>
        <li>Láminas de color ámbar, amarillo, rojo, azul o cualquiera de sus matices.</li>
        <li>Láminas metálicas, espejadas y reflectivas.</li>
        <li>Instalación en el parabrisas delantero.</li>
        <li>Film con unión: debe ser en un solo paño por vidrio.</li>
        <li>Obstaculizar la visibilidad de la tercera luz de freno.</li>
        <li>Instalación con imperfecciones, burbujas de aire, pliegues u otros defectos visuales.</li>
      </ul>
    `,
  },
  {
    question: '¿Las Plantas de Revisión Técnica pueden seguir rechazando el polarizado?',
    answer:
      'No pueden rechazarlo si el vehículo cumple con los porcentajes de transparencia permitidos por la norma.',
  },
  {
    question: '¿Puedo transferir el Certificado de Instalación si vendo mi auto?',
    answer:
      'Sí, el Certificado de Instalación está asociado al vehículo, por lo que puede transferirse junto con él.',
  },
  {
    question: '¿Puedo instalar film polarizado en todas las ventanas de mi auto?',
    answer: 'Sí, a excepción del parabrisas delantero.',
  },
  {
    question: '¿Cómo saber si los films que me instalan cumplen con la norma?',
    answer:
      'Para un particular es difícil distinguir las tonalidades sin equipos especializados. Algunas empresas instaladoras disponen de equipos digitales (Tint Check) que miden la transparencia del film. El resultado debe arrojar una diferencia de ±2% respecto al porcentaje indicado. En Antocarz trabajamos con láminas certificadas de marcas como Madico (USA) y TechFilms (Corea).',
  },
  {
    question: '¿Qué es el sello en relieve y qué vidrios deben llevarlo?',
    answer:
      'Es una exigencia de la norma para los vidrios donde se instalen films polarizados. El sello debe indicar el nombre del instalador, RUT y porcentaje de transparencia del film, y debe leerse perfectamente desde el exterior del vehículo.',
  },
  {
    question: '¿Qué debo considerar al contratar el servicio de polarizado?',
    answer:
      'Lo más importante es elegir una empresa con local establecido, que trabaje con productos de calidad y marca reconocida — como Madico (USA) y TechFilms (Corea) — que cuentan con garantía extendida. En Antocarz cumplimos todos estos requisitos y entregamos el Certificado de Instalación legal el mismo día.',
  },
  {
    question: '¿Qué debe contener el Certificado de Instalación?',
    answerHtml: `
      <ul class="faq__list-items">
        <li>Placa patente única del vehículo.</li>
        <li>Emisor y N° de certificado de flamabilidad de la lámina.</li>
        <li>Certificación UV, en caso de contar con ese filtro.</li>
        <li>Factor de transmisión regular de luz del conjunto vidrio/lámina.</li>
        <li>Razón social o nombre del instalador.</li>
        <li>RUT o cédula de identidad del instalador.</li>
        <li>Domicilio, correo electrónico y teléfono del instalador.</li>
        <li>Fecha de instalación.</li>
        <li>Vidrios en los que se instaló la lámina.</li>
        <li>Firma y timbre del instalador.</li>
      </ul>
    `,
  },
];
