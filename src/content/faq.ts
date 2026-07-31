/**
 * faq.ts
 * Preguntas frecuentes de Antocarz.
 * Doble propósito: UX + Schema FAQPage para SEO.
 */

export interface FaqItem {
  question: string;
  answer?: string;
  answerHtml?: string;
  category: string;
}

export const FAQ_CATEGORIES = [
  'Polarizado',
  'Ley de Polarizados',
  'Car Audio',
  'GPS y Rastreadores',
  'Inmovilizador RFID',
  'Láminas de Seguridad',
  'Garantía y Servicio',
] as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Polarizado',
    question: '¿El polarizado incluye el certificado legal?',
    answer:
      'Sí, todos nuestros trabajos de polarizado nanocarbón incluyen el certificado legal exigido por la Ley de Polarizados vigente en Chile, más el sello en relieve por vidrio. Más de +10.000 certificados emitidos respaldan nuestra experiencia. Puedes retirar tu certificado directamente en tienda el mismo día de la instalación.',
  },
  {
    category: 'Polarizado',
    question: '¿Puedo comprar solo el certificado de polarizado sin instalar?',
    answer:
      'No. Los certificados de polarizado solo se emiten para instalaciones realizadas en Antocarz. No se venden por separado. Si necesitas el certificado legal, debes realizar la instalación con nosotros y lo recibes el mismo día.',
  },
  {
    category: 'Polarizado',
    question: '¿Puedo descargar mi certificado de polarizado después de instalado?',
    answer:
      'Sí. El certificado se entrega físicamente el mismo día de la instalación y también puedes descargarlo en cualquier momento desde www.antocarz.cl ingresando los datos de tu vehículo.',
  },
  {
    category: 'Polarizado',
    question: '¿El certificado de polarizado se transfiere si vendo mi auto?',
    answer:
      'Sí. El certificado está asociado al vehículo (no a la persona), por lo que se transfiere automáticamente al nuevo dueño junto con el auto. Esto es una ventaja importante al momento de vender.',
  },
  {
    category: 'Polarizado',
    question: '¿Qué pasa si mi auto ya viene con polarizado de fábrica?',
    answer:
      'Los polarizados de fábrica muchas veces no incluyen el certificado legal exigido en Chile. Si tu vehículo tiene polarizado de fábrica sin certificado, puedes venir a Antocarz para evaluar si cumple la norma y emitir el certificado correspondiente. En caso de no cumplir, realizamos el cambio con láminas certificadas.',
  },
  {
    category: 'Polarizado',
    question: '¿Qué cuidados debo tener después de instalar el polarizado nanocarbón?',
    answerHtml: `
      <p>El polarizado se adhiere con una solución de agua y jabón neutro, por lo que necesita tiempo de secado y curado. Durante los primeros días debes:</p>
      <ul class="faq__list-items">
        <li><strong>No bajar los vidrios</strong> durante al menos 2 días.</li>
        <li><strong>No pasar un paño por el interior</strong> de los vidrios durante 5 días.</li>
        <li><strong>No activar el desempañante trasero</strong> durante 2 días para evitar burbujas. Si aparecen, desaparecerán solas durante el proceso de secado.</li>
      </ul>
      <p>Respetar estos cuidados garantiza una correcta adhesión y un acabado duradero y óptimo.</p>
    `,
  },
  {
    category: 'Polarizado',
    question: '¿Cuáles son los beneficios del polarizado nanocarbón versus las láminas de seguridad?',
    answerHtml: `
      <p><strong>Polarizado Nanocarbón:</strong></p>
      <ul class="faq__list-items">
        <li>Filtro UV — bloquea hasta el 99% de los rayos ultravioleta.</li>
        <li>Reduce la temperatura interior del vehículo.</li>
        <li>Ahorra entre un 30% y 40% en uso de aire acondicionado al refractar los rayos solares.</li>
      </ul>
      <p><strong>Láminas de Seguridad:</strong></p>
      <ul class="faq__list-items">
        <li>Filtro UV incluido.</li>
        <li>Material de mayor espesor y resistencia.</li>
        <li>Grosor 4 micras: resiste impactos de hasta 20 kg.</li>
        <li>Grosor 8 micras: resiste impactos de hasta 40 kg.</li>
        <li>Reduce el riesgo ante quiebre del vidrio: los fragmentos quedan adheridos a la lámina en vez de convertirse en proyectiles.</li>
      </ul>
    `,
  },
  {
    category: 'Polarizado',
    question: '¿Para qué vidrios se emite el certificado si elijo 35% en todos?',
    answer:
      'Si eliges tonalidad 35% en todos los vidrios, el certificado legal se emite únicamente para los vidrios laterales traseros y la luneta trasera, ya que la ley exige 70% en los vidrios delanteros. Los vidrios delanteros al 35% no cumplen la norma y no tienen certificado. Si deseas certificado en los delanteros, debes instalar el 70%.',
  },

  // ── Ley de Polarizados ──────────────────────────────────────────────────
  {
    category: 'Ley de Polarizados',
    question: '¿Qué es un film polarizado para vehículos?',
    answer:
      'Es una lámina de poliéster de alta resistencia que se adhiere en la cara interior de los vidrios. Están diseñados para protegerse de la Radiación Solar, Rayos UV y Rayos Infrarrojos.',
  },
  {
    category: 'Ley de Polarizados',
    question: '¿Desde cuándo rige la Ley de Polarizados?',
    answer: 'La ley empezó a regir desde el 11 de Marzo de 2020.',
  },
  {
    category: 'Ley de Polarizados',
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
    category: 'Ley de Polarizados',
    question: '¿Qué pasa con los vehículos que ya tienen film polarizado?',
    answer: 'Deben ser retirados de circulación si no cumplen con la norma vigente.',
  },
  {
    category: 'Ley de Polarizados',
    question: '¿Están prohibidas las láminas de seguridad incoloras?',
    answer:
      'No. Las láminas de seguridad incoloras no están prohibidas y tampoco requieren Certificado de Instalación, ya que no tienen tinte que oscurezca la visibilidad.',
  },
  {
    category: 'Ley de Polarizados',
    question: '¿Quién realizará las fiscalizaciones?',
    answer:
      'Carabineros, Plantas de Revisión Técnica, Inspectores Fiscales y Municipales.',
  },
  {
    category: 'Ley de Polarizados',
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
    category: 'Ley de Polarizados',
    question: '¿Las Plantas de Revisión Técnica pueden seguir rechazando el polarizado?',
    answer:
      'No pueden rechazarlo si el vehículo cumple con los porcentajes de transparencia permitidos por la norma.',
  },
  {
    category: 'Ley de Polarizados',
    question: '¿Puedo transferir el Certificado de Instalación si vendo mi auto?',
    answer:
      'Sí, el Certificado de Instalación está asociado al vehículo, por lo que puede transferirse junto con él.',
  },
  {
    category: 'Ley de Polarizados',
    question: '¿Puedo instalar film polarizado en todas las ventanas de mi auto?',
    answer: 'Sí, a excepción del parabrisas delantero.',
  },
  {
    category: 'Ley de Polarizados',
    question: '¿Cómo saber si los films que me instalan cumplen con la norma?',
    answer:
      'Para un particular es difícil distinguir las tonalidades sin equipos especializados. Algunas empresas instaladoras disponen de equipos digitales (Tint Check) que miden la transparencia del film. El resultado debe arrojar una diferencia de ±2% respecto al porcentaje indicado. En Antocarz trabajamos con láminas certificadas de marcas como Madico (USA) y TechFilms (Corea).',
  },
  {
    category: 'Ley de Polarizados',
    question: '¿Qué es el sello en relieve y qué vidrios deben llevarlo?',
    answer:
      'Es una exigencia de la norma para los vidrios donde se instalen films polarizados. El sello debe indicar el nombre del instalador, RUT y porcentaje de transparencia del film, y debe leerse perfectamente desde el exterior del vehículo.',
  },
  {
    category: 'Ley de Polarizados',
    question: '¿Qué debo considerar al contratar el servicio de polarizado?',
    answer:
      'Lo más importante es elegir una empresa con local establecido, que trabaje con productos de calidad y marca reconocida — como Madico (USA) y TechFilms (Corea) — que cuentan con garantía extendida. En Antocarz cumplimos todos estos requisitos y entregamos el Certificado de Instalación legal el mismo día.',
  },
  {
    category: 'Ley de Polarizados',
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

  // ── Car Audio ────────────────────────────────────────────────────────────
  {
    category: 'Car Audio',
    question: '¿Las radios Android ZTAudio son compatibles con CarPlay y Android Auto?',
    answer:
      'Sí. Las radios ZTAudio son compatibles con CarPlay inalámbrico y cableado (iOS 18 y versiones anteriores) y con Android Auto inalámbrico y cableado. Además incluyen GPS integrado con mapas globales, WiFi, Bluetooth A2DP, radio FM, reproducción 4K y Google Play Store completo para instalar Spotify, Waze, Netflix y más. Son compatibles con el 90% de los modelos del mercado (Toyota, Nissan, Kia, Hyundai, Chevrolet, Ford, Volkswagen y más).',
  },
  {
    category: 'Car Audio',
    question: '¿Qué marcas de car audio instalan?',
    answer:
      'Somos distribuidores de nuestra marca propia ZTAudio (radios Android con CarPlay y GPS) y trabajamos con JBL y Pioneer para amplificadores, parlantes y subwoofers. También instalamos Hawk y BRM en sistemas de alarma. Contamos con adaptadores específicos para la mayoría de los modelos de vehículos disponibles en Chile.',
  },
  {
    category: 'Car Audio',
    question: '¿Las radios ZTAudio incluyen cámara de retroceso o parlantes?',
    answer:
      'No. Las radios ZTAudio se venden e instalan sin cámara de retroceso ni parlantes. Son equipos separados que puedes agregar según tus necesidades. Si deseas incorporar una cámara de retroceso o parlantes, podemos instalarlo todo en conjunto — consúltanos por el valor adicional.',
  },
  {
    category: 'Car Audio',
    question: '¿Qué tamaños de pantalla tienen las radios ZTAudio?',
    answer:
      'Las radios ZTAudio están disponibles en pantallas de 7, 9 y 10 pulgadas, con procesadores Quadcore u Octacore según el modelo. Todas son pantallas QLED táctiles con resolución 1280×720. El tamaño disponible depende del modelo y año de tu vehículo.',
  },

  // ── GPS y Rastreadores ───────────────────────────────────────────────────
  {
    category: 'GPS y Rastreadores',
    question: '¿A quién se le entrega la información y claves del GPS Rastreadores.cl?',
    answer:
      'Las claves de acceso, usuarios y datos de la plataforma GPS se entregan única y exclusivamente al titular del vehículo. No se entrega información de rastreo a terceros sin autorización expresa del titular. Esto protege la privacidad y seguridad de nuestros clientes.',
  },
  {
    category: 'GPS y Rastreadores',
    question: '¿Cuánto vale renovar la membresía del GPS Rastreadores.cl?',
    answerHtml: `
      <ul class="faq__list-items">
        <li><strong>Semestral:</strong> $60.000 con IVA incluido.</li>
        <li><strong>Anual:</strong> $100.000 con IVA incluido.</li>
      </ul>
      <p>Puedes renovar de forma presencial en Lautaro 812, La Serena, o contactándonos directamente por WhatsApp. Si realizas el pago por transferencia, debes enviar el comprobante por WhatsApp para su registro correcto.</p>
    `,
  },
  {
    category: 'GPS y Rastreadores',
    question: '¿Qué pasa si no renuevo la membresía del GPS a tiempo?',
    answer:
      'Si la membresía vence, tienes un plazo de 2 meses para renovarla y recuperar tu cuenta. Pasado ese plazo, la cuenta no podrá recuperarse porque la SIM del equipo quedará deshabilitada. Se recomienda renovar antes del vencimiento para evitar la pérdida del servicio y del historial.',
  },
  {
    category: 'GPS y Rastreadores',
    question: '¿Para qué se puede usar el GPS Rastreadores.cl?',
    answer:
      'La plataforma está diseñada para brindar seguridad y respaldo al propietario del vehículo. No debe utilizarse como sistema de rastreo de personas. Las claves de acceso se entregan única y exclusivamente al titular del vehículo, y no se comparte información con terceros sin autorización expresa.',
  },
  {
    category: 'GPS y Rastreadores',
    question: '¿Cuándo debo usar el cortacorriente del GPS?',
    answer:
      'El comando de cortacorriente (apagar motor de forma remota) debe usarse únicamente en emergencias reales o para pruebas periódicas. En algunos sectores puede haber intermitencias en las redes móviles, lo que puede impedir que el comando llegue correctamente al equipo. Además, si el GPS no tiene señal satelital, el cortacorriente no se ejecutará. Si el vehículo está en movimiento, el corte del motor se activará solo cuando la velocidad baje de 20 km/h por razones de seguridad.',
  },
  {
    category: 'GPS y Rastreadores',
    question: '¿Qué características tiene la app GPS Autorastreo Chile?',
    answerHtml: `
      <ul class="faq__list-items">
        <li>SIM multiplataforma: se conecta a Movistar, Claro y Entel.</li>
        <li>Multiusuario: varias personas pueden acceder simultáneamente.</li>
        <li>Seguimiento en tiempo real desde app móvil y plataforma web.</li>
        <li>Historial de rutas y movimientos.</li>
        <li>Alertas en tiempo real de motor encendido o apagado.</li>
        <li>Tráfico en vivo.</li>
        <li>Cortacorriente remoto: activa y desactiva con un clic desde la app o la web.</li>
      </ul>
    `,
  },

  // ── Inmovilizador RFID ───────────────────────────────────────────────────
  {
    category: 'Inmovilizador RFID',
    question: '¿El Inmovilizador RFID Antiasalto incluye controles?',
    answer:
      'Sí. El sistema incluye dos controles: uno para el titular del vehículo y uno de repuesto. Ambos funcionan con señal RF 2.4Ghz bidireccional. El vehículo solo arranca cuando el control está presente — si el conductor se aleja más de 2 metros, el motor se bloquea automáticamente.',
  },
  {
    category: 'Inmovilizador RFID',
    question: '¿Cómo funciona exactamente el Inmovilizador RFID Antiasalto?',
    answer:
      'El sistema activa el cortacorriente automáticamente cuando detecta que el conductor se encuentra a más de 10 metros del vehículo. A los 70 segundos de pérdida de señal, el vehículo se apaga solo y no puede dar arranque. Para poder encenderlo nuevamente, debes estar dentro del rango de operación (menos de 10 metros) con el control en mano.',
  },
  {
    category: 'Inmovilizador RFID',
    question: '¿Cuándo debo cambiar la pila del inmovilizador y cómo sé que está baja?',
    answer:
      'Se recomienda cambiar las pilas cada 6 meses para evitar problemas de arranque. El sistema avisa cuando la batería baja de 2.3V de la siguiente forma: a los 10 segundos de dar arranque, escucharás 3 pitidos que se repiten a los 3 segundos. Ese sonido es la señal para cambiar las pilas a la brevedad.',
  },

  // ── Láminas de Seguridad ─────────────────────────────────────────────────
  {
    category: 'Láminas de Seguridad',
    question: '¿Las láminas de seguridad tienen tinte o son completamente transparentes?',
    answer:
      'Las láminas de seguridad tienen tinte. Los porcentajes indican la transmisión de luz visible: 5% es muy oscuro, 70% es levemente tintado y 100% corresponde a lámina completamente incolora (transparencia total). Las versiones incoloras (100%) no requieren certificado legal.',
  },
  {
    category: 'Láminas de Seguridad',
    question: '¿Qué cuidados debo tener después de instalar láminas de seguridad?',
    answerHtml: `
      <p>Las láminas de seguridad son más gruesas que el polarizado y requieren mayor tiempo de secado (entre 15 días y 1 mes). Durante ese período debes:</p>
      <ul class="faq__list-items">
        <li>Puedes bajar y subir los vidrios con normalidad.</li>
        <li><strong>No limpiar los vidrios por dentro durante 2 semanas</strong> para evitar manchas por burbujas.</li>
        <li>Si aparece alguna burbuja por humedad, debería desaparecer sola en el plazo de 15 días a 1 mes.</li>
        <li>Si después de 1 mes la burbuja no desaparece, debes avisar y acudir a Antocarz para evaluación.</li>
      </ul>
    `,
  },

  // ── Garantía y Servicio ──────────────────────────────────────────────────
  {
    category: 'Garantía y Servicio',
    question: '¿Tienen garantía y soporte técnico después de la instalación?',
    answer:
      'Sí. Ofrecemos garantía absoluta en todos nuestros servicios e instalaciones. Si experimentas cualquier problema derivado de nuestro trabajo, lo resolvemos sin costo adicional. Además contamos con soporte técnico inmediato post-instalación: puedes contactarnos directamente por WhatsApp y un especialista te asiste a la brevedad. Más de 500 instalaciones respaldan nuestra calidad en La Serena.',
  },
  {
    category: 'Garantía y Servicio',
    question: '¿Cuánto demora una instalación de alarma o radio Android?',
    answer:
      'La instalación de una radio Android toma entre 1 y 2 horas dependiendo del modelo del vehículo. Una alarma estándar toma entre 2 y 3 horas; si se agrega GPS o inmovilizador RFID puede extenderse hasta 4 horas. Recomendamos agendar con anticipación para garantizarte el horario que prefieras en cualquiera de nuestras 2 sucursales en La Serena.',
  },
  {
    category: 'Garantía y Servicio',
    question: '¿Trabajan con todos los modelos de autos?',
    answer:
      'Trabajamos con la gran mayoría de marcas y modelos disponibles en Chile, incluyendo Toyota, Nissan, Chevrolet, Hyundai, Kia, Suzuki, Volkswagen, Ford, Mazda, Mitsubishi y más. Nuestras radios ZTAudio son compatibles con el 90% del parque vehicular. Contamos con adaptadores específicos por modelo para garantizar una instalación limpia, sin modificaciones en el cableado original.',
  },
];
