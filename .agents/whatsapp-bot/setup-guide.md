# Guía de Configuración — Bot WhatsApp Antocarz
# Versión 1.0 — 2026-04-10

---

## PREREQUISITOS (antes de empezar)

- [ ] Número de teléfono dedicado para el bot (chip nuevo, sin usar en WhatsApp)
- [ ] Cuenta de Facebook del cliente con acceso al Business Manager
- [ ] Cuenta en make.com (tuya, plan Starter $9 USD/mes)
- [ ] Cuenta en platform.openai.com con crédito cargado mínimo $5 USD
- [ ] Cuenta de Google para el Sheet de logs

---

## PASO 1 — Meta for Developers (20-30 min)

### 1.1 Crear la app
1. Ir a https://developers.facebook.com
2. Click "Mis apps" → "Crear app"
3. Tipo: "Empresa"
4. Nombre de la app: "Antocarz Bot" (o el nombre que prefieras)
5. Email de contacto: el tuyo o el del cliente
6. Conectar con la cuenta de Business Manager del cliente

### 1.2 Agregar WhatsApp al producto
1. En el dashboard de la app, buscar "WhatsApp" en la lista de productos
2. Click "Configurar"
3. Seleccionar o crear una cuenta de WhatsApp Business (WABA)

### 1.3 Registrar el número de teléfono
1. En WhatsApp > Configuración de API > Números de teléfono
2. Click "Agregar número de teléfono"
3. Ingresar el número del chip dedicado
4. Verificar con SMS o llamada
5. ⚠️ IMPORTANTE: una vez registrado, ese número NO puede usarse en la app de WhatsApp

### 1.4 Obtener el Token permanente
1. En "Configuración del sistema" del Business Manager
2. Crear un "Usuario del sistema" (tipo Admin)
3. Asignar el activo de WhatsApp a ese usuario
4. Generar token de acceso permanente (sin fecha de expiración)
5. Guardar el token — lo necesitas en Make

### 1.5 Anotar los IDs necesarios
Necesitarás:
- Phone Number ID (en la sección de números de teléfono de la app)
- WhatsApp Business Account ID
- Access Token (el permanente del paso anterior)
- App Secret (en Configuración > Básica)

---

## PASO 2 — Google Sheets (5 min)

1. Crear un nuevo Google Sheet llamado "Antocarz Bot — Conversaciones"
2. Crear la hoja con estas columnas en fila 1:
   - A: Timestamp
   - B: Número cliente
   - C: Nombre cliente
   - D: Mensaje recibido
   - E: Respuesta enviada
   - F: Derivado a humano (Sí/No)
3. Compartir el Sheet con tu cuenta de Google que usas en Make

---

## PASO 3 — Make (el cerebro) (60-90 min)

### 3.1 Crear el escenario
1. Ir a make.com → "Crear nuevo escenario"
2. Nombre: "Antocarz — WhatsApp Bot"

### 3.2 Módulo 1: Webhook
- Agregar módulo "Webhooks" → "Custom webhook"
- Crear webhook nuevo, copiar la URL generada
- Ir a Meta for Developers → WhatsApp → Configuración → Webhooks
- Pegar la URL del webhook de Make
- Token de verificación: crear uno simple (ej: "antocarz2026")
- Suscribir al campo: "messages"

### 3.3 Módulo 2: Filtro (solo mensajes de texto)
- Agregar filtro después del webhook
- Condición: `entry[].changes[].value.messages[].type` = `text`
- Esto ignora imágenes, audios y estados

### 3.4 Módulo 3: OpenAI — Generar respuesta
- Agregar módulo "OpenAI" → "Create a Completion"
- Model: `gpt-4o-mini` (barato y suficientemente bueno)
- System: pegar el contenido completo de `system-prompt.md`
- User: `{{entry[].changes[].value.messages[].text.body}}`
- Max tokens: 500
- Temperature: 0.7

### 3.5 Módulo 4: Enviar respuesta por WhatsApp
- Agregar módulo "HTTP" → "Make a request"
- URL: `https://graph.facebook.com/v19.0/TU_PHONE_NUMBER_ID/messages`
- Method: POST
- Headers: 
  - `Authorization: Bearer TU_ACCESS_TOKEN`
  - `Content-Type: application/json`
- Body (JSON):
```json
{
  "messaging_product": "whatsapp",
  "to": "{{entry[].changes[].value.messages[].from}}",
  "type": "text",
  "text": {
    "body": "{{choices[].message.content}}"
  }
}
```

### 3.6 Módulo 5: Registrar en Google Sheets
- Agregar módulo "Google Sheets" → "Add a Row"
- Spreadsheet: el que creaste en el Paso 2
- Valores:
  - A (Timestamp): `{{now}}`
  - B (Número): `{{entry[].changes[].value.messages[].from}}`
  - C (Nombre): `{{entry[].changes[].value.contacts[].profile.name}}`
  - D (Mensaje): `{{entry[].changes[].value.messages[].text.body}}`
  - E (Respuesta): `{{choices[].message.content}}`

### 3.7 Activar el escenario
- Click en el toggle para activarlo
- Configurar para que corra "Instantáneamente" (triggered by webhook)

---

## PASO 4 — Pruebas (30 min)

1. Desde tu WhatsApp personal, escribe al número del bot
2. Envía mensajes de prueba:
   - "Hola, ¿cuánto cuesta el polarizado?"
   - "¿Tienen alarmas para Toyota Corolla 2020?"
   - "¿Cuál es el horario de atención?"
   - "Quiero instalar una radio con CarPlay"
3. Verificar que las respuestas lleguen en menos de 10 segundos
4. Verificar que queden registradas en el Google Sheet
5. Ajustar el system prompt si alguna respuesta no es correcta

---

## PASO 5 — Entrega al cliente

1. Mostrarle el bot funcionando en vivo
2. Darle acceso de solo lectura al Google Sheet (para que vea las conversaciones)
3. Explicarle:
   - El bot responde automáticamente 24/7
   - Si alguien escribe algo que el bot no puede manejar, lo deriva al humano
   - Ellos siguen respondiendo manualmente desde el mismo número si quieren (el bot no bloquea respuestas manuales)
4. Entregar el informe de activación

---

## COSTOS MENSUALES REALES

| Servicio | Costo |
|---|---|
| Make Starter | $9 USD |
| OpenAI API (estimado Antocarz) | $3-5 USD |
| WhatsApp Cloud API | Gratis (primeras 1.000 conversaciones) |
| Google Sheets | Gratis |
| **Total tuyo** | **~$12-14 USD** |

**Lo que cobras al cliente:** $60.000-80.000 CLP/mes (~$63-84 USD)
**Tu margen:** ~$49-70 USD/mes por cliente

---

## MANTENIMIENTO MENSUAL (lo que haces tú)

- Revisar que el escenario de Make esté activo (1 min)
- Revisar el Sheet de conversaciones para detectar preguntas no respondidas bien (10 min)
- Ajustar system prompt si hay servicios nuevos o cambios de horario (cuando el cliente avise)
- Informe mensual al cliente: total conversaciones, preguntas top, tasa de derivación

---

## TROUBLESHOOTING COMÚN

**El bot no responde:**
1. Verificar que el escenario de Make esté activo (toggle verde)
2. Verificar que el webhook de Meta esté suscrito a "messages"
3. Verificar que el token de acceso no haya expirado (usar token permanente)

**Respuestas cortadas o raras:**
- Subir los Max Tokens en OpenAI (de 500 a 800)
- Revisar el system prompt por instrucciones contradictorias

**El Sheet no registra:**
- Verificar permisos de Google Sheets en la conexión de Make
- Re-autorizar la conexión desde Make > Connections

**Costo de OpenAI sube mucho:**
- Bajar Max Tokens a 300
- Cambiar model a `gpt-4o-mini` si no lo estás usando ya
- Revisar si hay loops en el escenario de Make
