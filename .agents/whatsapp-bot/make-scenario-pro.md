# Make — Escenarios Bot Pro Antocarz
# Versión 2.0 — 2026-04-20
# 4 escenarios completos: Bot Principal + Recordatorios + Resumen Diario + Post-Servicio

---

## PREREQUISITOS ANTES DE EMPEZAR

### Variables globales (guardar en Make > Connections / Variables)
| Variable | Valor |
|---|---|
| `OPENAI_API_KEY` | Tu API Key de OpenAI |
| `WA_PHONE_NUMBER_ID` | ID del chip del bot (ver Meta for Developers) |
| `WA_ACCESS_TOKEN` | Token permanente de Meta |
| `WA_LAUTARO_NUMBER` | `56997371969` (número WhatsApp sucursal Lautaro) |
| `WA_BALMACEDA_NUMBER` | `56931258163` (número WhatsApp sucursal Balmaceda) |
| `GOOGLE_CALENDAR_LAUTARO_ID` | ID del calendario de Google de Lautaro |
| `GOOGLE_CALENDAR_BALMACEDA_ID` | ID del calendario de Balmaceda |

### Data Store (crear antes en Make > Data Stores)
Nombre: `antocarz_sessions`  
Estructura:
| Campo | Tipo | Descripción |
|---|---|---|
| `phone` | Text | Clave principal (número en formato 56XXXXXXXXX) |
| `client_name` | Text | Nombre del cliente (se va guardando) |
| `history` | Text | JSON string con array de últimos 10 mensajes |
| `booking_state` | Text | idle / collecting / awaiting_calendar / awaiting_confirmation |
| `booking_service` | Text | Servicio solicitado |
| `booking_duration` | Text | Duración en horas |
| `booking_branch` | Text | lautaro / balmaceda |
| `booking_vehicle` | Text | Modelo y año |
| `booking_datetime_pref` | Text | Preferencia expresada por el cliente |
| `booking_slots_json` | Text | JSON string con los slots ofrecidos (para confirmar) |
| `last_interaction` | Text | Timestamp ISO de la última interacción |

### Google Calendars (crear en calendar.google.com)
1. Crear dos calendarios: "Antocarz Lautaro" y "Antocarz Balmaceda"
2. Compartirlos con el email de tu cuenta Google de Make (permisos: editar)
3. Copiar el Calendar ID de cada uno (en Configuración del calendario > Integrar)

### Token permanente Meta (si aún no lo tienes)
1. business.facebook.com → Configuración del negocio
2. Usuarios → Usuarios del sistema → Agregar usuario "Make Bot" (rol: Admin)
3. Asignar activo: la app "Antocarz wsp"
4. Generar token → Permiso requerido: `whatsapp_business_messaging`
5. Copiar y guardar — no expira

---

## ESCENARIO 1 — BOT PRINCIPAL

### Descripción
Recibe mensajes de clientes, mantiene historial, gestiona agendamiento completo con Google Calendar.

### Trigger
**WhatsApp Business Cloud — Watch Events**  
(mismo webhook que ya tienes configurado)

---

### MÓDULO 1 — Watch Events
- Módulo: `WhatsApp Business Cloud` → `Watch Events`
- Conexión: tu conexión WhatsApp existente
- Este módulo dispara el escenario al recibir un mensaje

---

### MÓDULO 2 — Filtro inicial
**Agregar filtro entre Módulo 1 y Módulo 3**

Condición (usar operador OR):
```
entry[].changes[].value.messages[].type = "text"
OR
entry[].changes[].value.messages[].type = "interactive"
```

Esto permite procesar tanto mensajes de texto como respuestas de botones/listas.

---

### MÓDULO 3 — Set Variable: extraer datos del mensaje
- Módulo: `Tools` → `Set Variable`
- Crear variable `phone` = `{{entry[].changes[].value.messages[].from}}`
- Crear variable `message_type` = `{{entry[].changes[].value.messages[].type}}`
- Crear variable `message_text`:
  - Si type = "text": `{{entry[].changes[].value.messages[].text.body}}`
  - Si type = "interactive" (button reply): `{{entry[].changes[].value.messages[].interactive.button_reply.title}}`
  - Si type = "interactive" (list reply): `{{entry[].changes[].value.messages[].interactive.list_reply.title}}`

Para manejar los 3 casos, usa la función `if` de Make:
```
{{if(entry[].changes[].value.messages[].type = "text"; entry[].changes[].value.messages[].text.body; if(entry[].changes[].value.messages[].interactive.button_reply.id != ""; entry[].changes[].value.messages[].interactive.button_reply.title; entry[].changes[].value.messages[].interactive.list_reply.title))}}
```

También crear variable `slot_id` (solo para list replies):
```
{{entry[].changes[].value.messages[].interactive.list_reply.id}}
```

---

### MÓDULO 4 — Data Store: leer sesión
- Módulo: `Data Store` → `Get a Record`
- Data Store: `antocarz_sessions`
- Key: `{{phone}}`

Si no existe registro → los campos estarán vacíos (Make devuelve null — funciona igual)

---

### MÓDULO 5 — HTTP: llamar a OpenAI
- Módulo: `HTTP` → `Make a request`
- URL: `https://api.openai.com/v1/chat/completions`
- Method: POST
- Headers:
  - `Authorization`: `Bearer {{OPENAI_API_KEY}}`
  - `Content-Type`: `application/json`
- Body Type: `Raw` → `JSON`

**Body JSON:**
```json
{
  "model": "gpt-4o-mini",
  "response_format": {"type": "json_object"},
  "max_tokens": 600,
  "temperature": 0.5,
  "messages": [
    {
      "role": "system",
      "content": "{{system_prompt_base}}\n\n---\nESTADO ACTUAL DE ESTA SESIÓN:\nEstado del agendamiento: {{4.booking_state}}\nDatos recopilados: Servicio: {{4.booking_service}} | Sucursal: {{4.booking_branch}} | Vehículo: {{4.booking_vehicle}} | Nombre: {{4.client_name}} | Preferencia: {{4.booking_datetime_pref}}\nFecha actual Chile: {{formatDate(now; \"DD/MM/YYYY\"; \"America/Santiago\")}} — Hora: {{formatDate(now; \"HH:mm\"; \"America/Santiago\")}}"
    },
    {{history_messages_array}},
    {
      "role": "user",
      "content": "{{message_text}}"
    }
  ]
}
```

**Nota sobre `system_prompt_base`:** Pegar el contenido completo de `system-prompt.md` (sin la sección "CONTEXTO DINÁMICO") en una variable de Make o directamente en el campo.

**Nota sobre `history_messages_array`:** Ver construcción en paso 4.1 abajo.

#### Paso 4.1 — Construir array de historial
El campo `history` del Data Store contiene un JSON string como:
```json
[{"role":"user","content":"hola"},{"role":"assistant","content":"..."}]
```

En el body de OpenAI, el campo `messages` acepta un array. Para insertar el historial, usa el módulo `JSON` → `Parse JSON` antes del HTTP, luego referencia los items del array.

**Alternativa más simple (recomendada para Make):**
Guarda el historial ya formateado como string e incorpóralo directamente al body:

En el body JSON del HTTP module, en el campo messages:
```
[{"role":"system","content":"..."},{{parseJSON(4.history)}},{"role":"user","content":"{{message_text}}"}]
```

Si `4.history` es null (primera vez), usar: `{{if(4.history = null; "[]"; 4.history)}}`

---

### MÓDULO 6 — Parse JSON: extraer respuesta de GPT
- Módulo: `JSON` → `Parse JSON`
- JSON String: `{{5.data.choices[].message.content}}`

Esto genera:
- `6.action` → la acción a ejecutar
- `6.response` → el texto para el cliente
- `6.booking` → objeto con datos del booking (puede ser null)

---

### MÓDULO 7 — Router (bifurcación por `action`)
Agregar módulo `Router`. Crear las siguientes ramas:

---

#### RAMA A — action = "chat"
**Filtro:** `{{6.action}}` = `chat`

**A1. WhatsApp — Enviar mensaje de texto**
- Módulo: `WhatsApp Business Cloud` → `Send a Text Message`  
  *(o HTTP si prefieres más control — ver nota al final)*
- To: `{{phone}}`
- Message: `{{6.response}}`

**A2. Data Store — Actualizar historial**
- Módulo: `Data Store` → `Update a Record`
- Key: `{{phone}}`
- Campo `history`:
```
{{substring(
  toString(
    concat(
      parseJSON(if(4.history = null; "[]"; 4.history));
      [{"role":"user","content":"{{message_text}}"},{"role":"assistant","content":"{{6.response}}"}]
    )
  );
  0;
  if(length(toString(concat(parseJSON(if(4.history = null; "[]"; 4.history));[{"role":"user","content":"{{message_text}}"},{"role":"assistant","content":"{{6.response}}"}]))) > 8000; length(toString(...)) - 8000; 0);
  8000
)}}
```

**Simplificación práctica:** En Make, usa un Text Aggregator para construir el historial nuevo como JSON string, luego guarda. Mantener máximo los últimos 20 mensajes (10 turnos).

- Campo `last_interaction`: `{{now}}`

**A3. Google Sheets — Log conversación**
- Módulo: `Google Sheets` → `Add a Row`
- Spreadsheet: tu sheet de logs
- Valores:
  - Timestamp: `{{formatDate(now; "DD/MM/YYYY HH:mm"; "America/Santiago")}}`
  - Teléfono: `{{phone}}`
  - Nombre: `{{4.client_name}}`
  - Mensaje cliente: `{{message_text}}`
  - Respuesta bot: `{{6.response}}`
  - Acción: `chat`

---

#### RAMA B — action = "request_branch"
**Filtro:** `{{6.action}}` = `request_branch`

**B1. HTTP — Enviar botones interactivos (WhatsApp)**
- Módulo: `HTTP` → `Make a request`
- URL: `https://graph.facebook.com/v20.0/{{WA_PHONE_NUMBER_ID}}/messages`
- Method: POST
- Headers:
  - `Authorization`: `Bearer {{WA_ACCESS_TOKEN}}`
  - `Content-Type`: `application/json`
- Body:
```json
{
  "messaging_product": "whatsapp",
  "to": "{{phone}}",
  "type": "interactive",
  "interactive": {
    "type": "button",
    "body": {
      "text": "{{6.response}}"
    },
    "action": {
      "buttons": [
        {
          "type": "reply",
          "reply": {
            "id": "branch_lautaro",
            "title": "Lautaro 812"
          }
        },
        {
          "type": "reply",
          "reply": {
            "id": "branch_balmaceda",
            "title": "Balmaceda 2033"
          }
        }
      ]
    }
  }
}
```

**B2. Data Store — Actualizar historial + estado**
- Key: `{{phone}}`
- `booking_state`: `collecting`
- `history`: (igual que Rama A)
- `last_interaction`: `{{now}}`

**B3. Google Sheets — Log**
- Acción: `request_branch`

---

#### RAMA C — action = "request_calendar"
**Filtro:** `{{6.action}}` = `request_calendar`

Esta rama hace 3 cosas: guarda estado, consulta Calendar, vuelve a llamar a GPT con disponibilidad, envía lista de slots.

**C1. Data Store — Guardar datos de booking**
- Key: `{{phone}}`
- `booking_state`: `awaiting_calendar`
- `booking_service`: `{{6.booking.service}}`
- `booking_duration`: `{{6.booking.service_duration_hours}}`
- `booking_branch`: `{{6.booking.branch}}`
- `booking_vehicle`: `{{6.booking.vehicle}}`
- `client_name`: `{{6.booking.client_name}}`
- `booking_datetime_pref`: `{{6.booking.datetime_preference}}`
- `history`: (actualizar)

**C2. Google Calendar — Buscar eventos próximos 5 días**

Ejecutar DOS veces en paralelo (o usar router interno basado en branch):

Si branch = lautaro:
- Módulo: `Google Calendar` → `Search Events`
- Calendar ID: `{{GOOGLE_CALENDAR_LAUTARO_ID}}`
- From: `{{formatDate(now; "YYYY-MM-DD"; "America/Santiago")}}T00:00:00`
- To: `{{formatDate(addDays(now; 5); "YYYY-MM-DD"; "America/Santiago")}}T23:59:59`

Si branch = balmaceda:
- Calendar ID: `{{GOOGLE_CALENDAR_BALMACEDA_ID}}`
- (mismas fechas)

**Práctica:** Agregar un router interno (C2-Router) con filtro por `6.booking.branch`.

**C3. Text Aggregator — Formatear ocupación del calendario**
- Agregar módulo `Text Aggregator` después del Search Events
- Template para cada evento:
  `{{formatDate(item.start.dateTime; "ddd DD/MM"; "America/Santiago")}} {{formatDate(item.start.dateTime; "HH:mm"; "America/Santiago")}}–{{formatDate(item.end.dateTime; "HH:mm"; "America/Santiago")}}`
- Separador: salto de línea

Resultado ejemplo:
```
Mié 23/04 09:30–12:00
Mié 23/04 14:00–17:00
Jue 24/04 10:00–13:00
```

**C4. HTTP — Segunda llamada a OpenAI (con disponibilidad)**
- Mismo formato que Módulo 5
- En el system message, agregar al final:
```
DISPONIBILIDAD CALENDARIO (sucursal {{6.booking.branch}}):
Horarios ocupados próximos 5 días hábiles:
{{calendar_busy_text}}

Duración del servicio "{{6.booking.service}}": {{6.booking.service_duration_hours}} horas.
Horario de atención: Lun–Vie 09:30–18:00, Sáb 09:30–14:00.
Buffer entre citas: 30 minutos.

Con esta información, calcula los slots disponibles y responde con action: "send_slots". Ofrece máximo 3 opciones distribuidas en los próximos 3 días hábiles. El label de cada slot debe tener máximo 24 caracteres (límite WhatsApp). Formato label: "Lun 20 - 10:00 hrs".
```
- Mensaje del usuario: `"El cliente preguntó: {{6.booking.datetime_preference}}. Por favor ofrece los horarios disponibles."`

**C5. Parse JSON — Extraer send_slots de GPT**
- Parse la respuesta del segundo call a OpenAI

**C6. HTTP — Enviar lista interactiva con slots**
- URL: `https://graph.facebook.com/v20.0/{{WA_PHONE_NUMBER_ID}}/messages`
- Method: POST
- Body:
```json
{
  "messaging_product": "whatsapp",
  "to": "{{phone}}",
  "type": "interactive",
  "interactive": {
    "type": "list",
    "body": {
      "text": "{{C5.response}}"
    },
    "action": {
      "button": "Ver horarios",
      "sections": [
        {
          "title": "Disponibles",
          "rows": [
            {
              "id": "{{C5.booking.available_slots[1].id}}",
              "title": "{{C5.booking.available_slots[1].label}}"
            },
            {
              "id": "{{C5.booking.available_slots[2].id}}",
              "title": "{{C5.booking.available_slots[2].label}}"
            },
            {
              "id": "{{C5.booking.available_slots[3].id}}",
              "title": "{{C5.booking.available_slots[3].label}}"
            }
          ]
        }
      ]
    }
  }
}
```

**Nota:** Si GPT devuelve menos de 3 slots, los slots vacíos generarán error. Agregar filtro `if(C5.booking.available_slots[3] != null; ...)` o manejar con módulo Iterator.

**C7. Data Store — Guardar slots ofrecidos + estado**
- `booking_state`: `awaiting_confirmation`
- `booking_slots_json`: `{{toString(C5.booking.available_slots)}}`

**C8. Google Sheets — Log**
- Acción: `request_calendar`

---

#### RAMA D — action = "create_booking"
**Filtro:** `{{6.action}}` = `create_booking`

**D1. Google Calendar — Crear evento**

Router interno basado en `6.booking.branch`:

Si lautaro:
- Módulo: `Google Calendar` → `Create an Event`
- Calendar ID: `{{GOOGLE_CALENDAR_LAUTARO_ID}}`

Si balmaceda:
- Calendar ID: `{{GOOGLE_CALENDAR_BALMACEDA_ID}}`

Campos del evento:
- Title: `{{6.booking.service}} — {{6.booking.vehicle}}`
- Start Date/Time: `{{6.booking.confirmed_datetime}}`
- End Date/Time: `{{addHours(parseDate(6.booking.confirmed_datetime; "YYYY-MM-DDTHH:mm:ss"); 6.booking.service_duration_hours)}}`
- Description:
  ```
  Cliente: {{6.booking.client_name}}
  Teléfono: {{phone}}
  Vehículo: {{6.booking.vehicle}}
  Servicio: {{6.booking.service}}
  Notas: Agendado vía bot WhatsApp
  ```
- Location: `{{6.booking.branch_address}}`

**D2. WhatsApp — Enviar confirmación al cliente**
- Módulo: `WhatsApp Business Cloud` → `Send a Text Message`
- To: `{{phone}}`
- Message: `{{6.response}}`

**D3. HTTP — Notificar a la sucursal**
- URL: `https://graph.facebook.com/v20.0/{{WA_PHONE_NUMBER_ID}}/messages`
- Method: POST
- Body (text message al número de la sucursal):
```json
{
  "messaging_product": "whatsapp",
  "to": "{{6.booking.branch_phone}}",
  "type": "text",
  "text": {
    "body": "📅 NUEVO TURNO AGENDADO\n\nCliente: {{6.booking.client_name}}\nTeléfono: +{{phone}}\nServicio: {{6.booking.service}}\nVehículo: {{6.booking.vehicle}}\nFecha y hora: {{6.booking.confirmed_datetime_label}}\nSucursal: {{6.booking.branch_address}}"
  }
}
```

**D4. Data Store — Resetear estado de booking**
- Key: `{{phone}}`
- `booking_state`: `idle`
- `booking_service`: `` (vacío)
- `booking_branch`: `` (vacío)
- `booking_vehicle`: `` (vacío)
- `booking_datetime_pref`: `` (vacío)
- `booking_slots_json`: `` (vacío)
- `client_name`: `{{6.booking.client_name}}` (mantener nombre para futuras interacciones)
- `last_interaction`: `{{now}}`

**D5. Google Sheets — Log booking**
- Spreadsheet: hoja "Agendamientos"
- Valores:
  - Timestamp: `{{formatDate(now; "DD/MM/YYYY HH:mm"; "America/Santiago")}}`
  - Teléfono: `{{phone}}`
  - Nombre: `{{6.booking.client_name}}`
  - Vehículo: `{{6.booking.vehicle}}`
  - Servicio: `{{6.booking.service}}`
  - Sucursal: `{{6.booking.branch_address}}`
  - Fecha turno: `{{6.booking.confirmed_datetime_label}}`
  - Estado: `Confirmado`
  - ID Evento Calendar: `{{D1.id}}`

---

#### RAMA E — action = "escalate"
**Filtro:** `{{6.action}}` = `escalate`

**E1. WhatsApp — Enviar mensaje al cliente**
- Message: `{{6.response}}`

**E2. HTTP — Alertar al agente humano**
- Enviar WhatsApp a número de Sebastián (o al encargado de Antocarz):
```json
{
  "messaging_product": "whatsapp",
  "to": "56XXXXXXXXX",
  "type": "text",
  "text": {
    "body": "⚠️ DERIVACIÓN BOT\n\nCliente: +{{phone}}\nÚltimo mensaje: {{message_text}}\n\nRequiere atención humana."
  }
}
```

**E3. Data Store — Actualizar historial**

**E4. Google Sheets — Log**
- Acción: `escalate`

---

## ESCENARIO 2 — RECORDATORIOS 24 HORAS

### Trigger
- Módulo: `Scheduling` → activar escenario
- Configurar: cada día a las **09:00** (zona horaria: America/Santiago)

### Módulos

**2.1. Set Variable — fecha de mañana**
- `tomorrow_start`: `{{formatDate(addDays(now; 1); "YYYY-MM-DD"; "America/Santiago")}}T00:00:00`
- `tomorrow_end`: `{{formatDate(addDays(now; 1); "YYYY-MM-DD"; "America/Santiago")}}T23:59:59`

**2.2. Google Calendar — Buscar eventos de mañana (Lautaro)**
- Calendar ID: `{{GOOGLE_CALENDAR_LAUTARO_ID}}`
- From: `{{tomorrow_start}}`
- To: `{{tomorrow_end}}`

**2.3. Iterator — Para cada evento de Lautaro**
- Módulo: `Flow Control` → `Iterator`
- Array: resultado del módulo 2.2

**2.4. Text Parser — Extraer teléfono de la descripción del evento**
- Módulo: `Text Parser` → `Match a Pattern`
- Pattern: `Teléfono: (\d{11,12})`
- Text: `{{item.description}}`
- Resultado: `{{2.4.$1}}` → el número del cliente

**2.5. HTTP — Enviar recordatorio por WhatsApp**
```json
{
  "messaging_product": "whatsapp",
  "to": "{{2.4.$1}}",
  "type": "text",
  "text": {
    "body": "Hola {{item.summary | split(" — ")[1]}} 👋 Te recordamos que mañana tienes tu hora en Antocarz.\n\n📋 Servicio: {{item.summary | split(" — ")[0]}}\n📍 Sucursal: Lautaro 812, La Serena\n🕐 Hora: {{formatDate(item.start.dateTime; \"HH:mm\"; \"America/Santiago\")}} hrs\n\nCualquier cambio avísanos con anticipación. ¡Hasta mañana!"
  }
}
```

**2.6 a 2.8. Repetir módulos 2.2–2.5 para Balmaceda**
- Calendar ID: `{{GOOGLE_CALENDAR_BALMACEDA_ID}}`
- En el texto del recordatorio, cambiar dirección a "Balmaceda 2033, La Serena"

---

## ESCENARIO 3 — RESUMEN DIARIO AL EQUIPO

### Trigger
- Cada día a las **08:30** (America/Santiago)
- Solo días hábiles (agregar filtro: `{{dayOfWeek(now)}} != 7` para excluir domingos)

### Módulos

**3.1. Set Variable — rango del día actual**
- `today_start`: `{{formatDate(now; "YYYY-MM-DD"; "America/Santiago")}}T00:00:00`
- `today_end`: `{{formatDate(now; "YYYY-MM-DD"; "America/Santiago")}}T23:59:59`

**3.2. Google Calendar — Buscar eventos hoy (Lautaro)**
- Calendar ID: `{{GOOGLE_CALENDAR_LAUTARO_ID}}`
- From: `{{today_start}}`
- To: `{{today_end}}`

**3.3. Text Aggregator — Formatear agenda Lautaro**
- Template:
  `🕐 {{formatDate(item.start.dateTime; "HH:mm"; "America/Santiago")}} — {{item.summary}}`
- Separador: salto de línea

**3.4. HTTP — Enviar resumen a WhatsApp Lautaro**
```json
{
  "messaging_product": "whatsapp",
  "to": "{{WA_LAUTARO_NUMBER}}",
  "type": "text",
  "text": {
    "body": "📅 AGENDA HOY — LAUTARO\n{{formatDate(now; \"dddd DD [de] MMMM\"; \"America/Santiago\")}}\n\n{{3.3.text}}\n\n{{if(3.3.text = \"\"; \"Sin turnos agendados para hoy.\"; \"Total: \" + count(3.2) + \" turno(s)\")}}"
  }
}
```

**3.5 a 3.7. Repetir para Balmaceda**
- Calendar ID: `{{GOOGLE_CALENDAR_BALMACEDA_ID}}`
- Enviar a: `{{WA_BALMACEDA_NUMBER}}`

---

## ESCENARIO 4 — SEGUIMIENTO POST-SERVICIO

### Trigger
- Cada día a las **10:00** (America/Santiago)

### Módulos

**4.1. Set Variable — fecha de hace 2 días**
- `two_days_ago_start`: `{{formatDate(addDays(now; -2); "YYYY-MM-DD"; "America/Santiago")}}T00:00:00`
- `two_days_ago_end`: `{{formatDate(addDays(now; -2); "YYYY-MM-DD"; "America/Santiago")}}T23:59:59`

**4.2. Google Calendar — Buscar eventos de hace 2 días (Lautaro)**
- Calendar ID: `{{GOOGLE_CALENDAR_LAUTARO_ID}}`
- From: `{{two_days_ago_start}}`
- To: `{{two_days_ago_end}}`

**4.3. Iterator — Para cada evento**

**4.4. Text Parser — Extraer teléfono**
- Mismo patrón que Escenario 2, módulo 2.4

**4.5. HTTP — Enviar mensaje post-servicio**
```json
{
  "messaging_product": "whatsapp",
  "to": "{{4.4.$1}}",
  "type": "text",
  "text": {
    "body": "Hola, somos Antocarz 👋 ¿Cómo quedó tu vehículo tras la instalación? Tu opinión nos ayuda a mejorar. Si tuvieras un minuto para dejarnos una reseña en Google, te lo agradeceríamos mucho 🙏\nhttps://g.page/r/antocarz/review"
  }
}
```

**Nota:** Reemplazar la URL de reseña con el link real de Google Business de Antocarz.

**4.6 a 4.8. Repetir para Balmaceda**

---

## CHECKLIST DE ACTIVACIÓN

Antes de activar en producción:

- [ ] Token permanente de Meta generado y configurado
- [ ] Data Store `antocarz_sessions` creado con la estructura correcta
- [ ] Calendarios Google "Antocarz Lautaro" y "Antocarz Balmaceda" creados y compartidos con Make
- [ ] Calendar IDs copiados en variables de Make
- [ ] System prompt v2.0 completo pegado en el módulo HTTP de OpenAI
- [ ] Google Sheet de logs creado con hojas "Conversaciones" y "Agendamientos"
- [ ] Botones interactivos probados con número personal (verificar que llegan los 2 botones)
- [ ] Lista interactiva probada (verificar que aparece el menú de slots)
- [ ] Flujo completo probado: desde "quiero agendar" hasta confirmación en Calendar
- [ ] Notificación a sucursal probada (verificar que llega al número correcto)
- [ ] Recordatorio 24hrs probado manualmente (ejecutar Escenario 2 a mano)
- [ ] Resumen diario probado (ejecutar Escenario 3 a mano)
- [ ] Post-servicio probado (ejecutar Escenario 4 con evento de prueba de hace 2 días)

---

## COSTOS MENSUALES REALES

| Servicio | Plan | Costo |
|---|---|---|
| Make | Starter (10.000 ops/mes) | $9 USD |
| OpenAI API | Pay-per-use estimado Antocarz | $5-8 USD |
| WhatsApp Cloud API | Gratis hasta 1.000 conversaciones | $0 |
| Google Sheets / Calendar | Incluido en Google Workspace | $0 |
| **Total tuyo** | | **~$14-17 USD** |

**Lo que cobras a Antocarz (Plan Pro):** $80.000 CLP/mes  
**Margen:** ~$65 USD/mes

---

## ESTIMACIÓN DE OPERACIONES MAKE (por mes)

| Escenario | Frecuencia | Ops por ejecución | Total/mes |
|---|---|---|---|
| Bot Principal | ~200 mensajes/mes | ~15 ops cada uno | 3.000 |
| Recordatorios 24h | Diario | ~10 ops (promedio 5 turnos) | 300 |
| Resumen diario | Diario (26 días) | 10 ops | 260 |
| Post-servicio | Diario | 10 ops | 300 |
| **Total estimado** | | | **~3.860 ops** |

**El plan Starter de Make (10.000 ops) es más que suficiente.**

---

## NOTAS TÉCNICAS IMPORTANTES

1. **Versión de Graph API:** Usar `v20.0` (actual estable a 2026). Meta mantiene retrocompatibilidad por 2 años.

2. **response_format json_object de OpenAI:** Solo compatible con modelos `gpt-4o-mini` en adelante. El modelo DEBE tener la instrucción "responde siempre con JSON" en el system prompt — de lo contrario devuelve error 400.

3. **Botones interactivos:** Máximo 3 botones por mensaje. Título de botón: máximo 20 caracteres. Usamos 2 botones (Lautaro y Balmaceda).

4. **Lista interactiva:** Máximo 10 filas. Título de fila: máximo 24 caracteres. Siempre incluir un `button` label (texto del botón que abre la lista): máximo 20 caracteres. Usamos "Ver horarios" (12 chars ✅).

5. **Data Store en Make:** En el plan Starter, máximo 10.000 registros. Con el uso de Antocarz (escala a ~500 clientes activos), no habrá problemas. El campo `history` puede alcanzar 2-3 KB por cliente — bien dentro del límite de 64KB por registro.

6. **Timezone Chile:** `America/Santiago` cubre tanto horario estándar (UTC-4) como verano (UTC-3). Make ajusta automáticamente con la zona correcta.

7. **Números WhatsApp:** Siempre en formato internacional sin + ni espacios: `56997371969`. El campo `to` del API nunca lleva +.

8. **Eventos cancelados:** Si un cliente cancela, el bot actual no gestiona cancelaciones — derivar al humano con action `escalate`. Funcionalidad a agregar en v3.0.
