# Plan de Servicio — WhatsApp AI Bot
# Gautama Digital — Sebastián Morales
# Creado: 2026-04-11

---

## Concepto

Servicio administrado de asistente IA para WhatsApp. El negocio responde automáticamente 24/7 sin contratar personal. Sebastián lo construye, lo mantiene y lo cobra mensualmente.

---

## Stack técnico (decisión tomada)

- **WhatsApp:** Meta Cloud API (oficial, sin riesgo de ban)
- **Automatización:** Make.com
- **IA:** OpenAI GPT-4o mini
- **Logs:** Google Sheets
- **Agenda (upgrade):** Google Calendar

---

## Estado actual del piloto (Gautama Digital) — actualizado 2026-04-12

- [x] Cuenta Make creada (plan gratuito)
- [x] OpenAI API key generada
- [x] App Meta for Developers creada (app: Antocarz wsp, ID: 1662952501371459)
- [x] Chip nuevo activado y registrado (+56 9 8289 0047)
- [x] Phone Number ID del chip: 1004533332754398
- [x] WABA ID Gautama Digital: obtenido en Meta Business Manager
- [x] Número registrado con PIN 123456 via Make Register a Sender
- [x] Escenario Make construido y funcionando:
  - Watch Events (WhatsApp Business Cloud)
  - OpenAI Generate a completion (GPT-4o mini)
  - WhatsApp Send a Message
  - Google Sheets Add a Row (logs)
- [x] Bot responde mensajes en tiempo real ✅
- [ ] Bug pendiente: JSON prefix en las respuestas (visual, no funcional)
- [ ] Memoria de conversación (cada mensaje es independiente)
- [ ] System prompt completo de Antocarz (actualmente simplificado)
- [ ] Token permanente (actualmente temporal)

---

## Credenciales del piloto (NO compartir)

```
Phone Number ID: 1101602276366409
WhatsApp Business Account ID: 1862553081073953
Access Token: temporal (expira 24hrs — regenerar con token permanente)
OpenAI API Key: guardada por el cliente
Verify Token: gautama2026
```

---

## Arquitectura del escenario Make (bot base)

```
[Watch Events - WhatsApp Business Cloud]
        ↓
[Filtro: solo mensajes de texto]
        ↓
[OpenAI - GPT-4o mini + system prompt]
        ↓
[WhatsApp Business Cloud - Send Message]
        ↓
[Google Sheets - Add Row (log)]
```

---

## Tiers de servicio para vender

| Plan | Incluye | Setup | Mensual |
|---|---|---|---|
| Starter | Bot FAQs + respuestas automáticas 24/7 | $200 USD | $40 USD |
| Pro | Starter + agenda Google Calendar + confirmaciones + recordatorios | $350 USD | $70 USD |
| Business | Pro + notificación al equipo + reseña post-servicio + informe mensual | $500 USD | $120 USD |

**Costos reales por cliente:**
- Make: ~$10 USD (escalar con packs de operaciones)
- OpenAI: ~$3-5 USD
- WhatsApp API: gratis hasta 1.000 conversaciones/mes
- **Total: ~$13-15 USD/mes**

**Margen por cliente Pro: ~$55 USD/mes**

---

## Funcionalidades por nivel

### Bot Base (Starter)
- Responder FAQs en lenguaje natural
- Informar servicios, precios, horarios, ubicación
- Capturar nombre + vehículo + servicio de interés
- Derivar al humano cuando no sabe
- Respuesta fuera de horario automática
- Log de conversaciones en Google Sheets

### Agenda Automática (upgrade Pro)
```
Cliente pide hora
      ↓
Make consulta Google Calendar (disponibilidad real)
      ↓
Bot ofrece opciones disponibles
      ↓
Cliente elige
      ↓
Make crea evento en Calendar ✅
Make envía confirmación al cliente ✅
Make notifica al dueño/sucursal ✅
24hrs antes → recordatorio automático al cliente ✅
```

### Post-servicio (upgrade Business)
- Mensaje automático post-visita pidiendo reseña Google
- Seguimiento si el cliente no respondió
- Informe mensual: total conversaciones, preguntas top, tasa derivación

---

## Siguiente cliente: Antocarz

- Plan recomendado: **Pro** (dos sucursales, alto volumen de instalaciones)
- System prompt: ya construido (ver system-prompt.md)
- Requiere: chip nuevo + acceso Facebook Business de Antocarz
- Agregar: Google Calendar por sucursal (Lautaro y Balmaceda)
- Tiempo estimado de implementación: 3-4 horas (con agenda incluida)

---

## Proceso de onboarding por cliente (estandarizado)

1. Cliente llena formulario Google Forms (datos negocio, servicios, FAQs, tono)
2. Cliente compra chip nuevo
3. Tú creas/accedes al Meta Business Manager
4. Registras número en WhatsApp Cloud API
5. Clonas escenario Make base
6. Personalizas system prompt con datos del cliente
7. Conectas Google Calendar si es plan Pro+
8. Pruebas (mínimo 20 mensajes de prueba)
9. Entrega + capacitación (30 min)
10. Informe mensual a partir del mes siguiente

---

## Escalabilidad Make

| Clientes | Ops necesarias | Costo Make | Ingresos (Pro) | Margen |
|---|---|---|---|---|
| 1 | ~3.600/mes | $10 USD | $70 USD | $55 USD |
| 3 | ~10.800/mes | $19 USD | $210 USD | $186 USD |
| 5 | ~18.000/mes | $28 USD | $350 USD | $307 USD |
| 10 | ~36.000/mes | $46 USD | $700 USD | $639 USD |
| 20 | ~72.000/mes | $82 USD | $1.400 USD | $1.303 USD |

**Migrar a n8n self-hosted cuando supere 15 clientes** (VPS $6/mes, operaciones ilimitadas)
