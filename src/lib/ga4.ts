/**
 * ga4.ts — Helper para GA4 Reporting API
 *
 * Autenticación vía Service Account (JWT RS256, sin dependencias externas).
 * Requiere env vars:
 *   GA4_SERVICE_ACCOUNT  → contenido completo del JSON de la service account de Google
 *   GA4_PROPERTY_ID      → ej. "530277574"
 *   ANALYTICS_TOKEN      → contraseña para acceder al panel (ej. "antocarz2026")
 */

import { createSign } from 'node:crypto';

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

interface ReportRow {
  dimensionValues?: { value: string }[];
  metricValues: { value: string }[];
}

interface GA4Report {
  rows?: ReportRow[];
}

async function getAccessToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })).toString('base64url');

  const message = `${header}.${payload}`;
  const sign = createSign('RSA-SHA256');
  sign.update(message);
  const jwt = `${message}.${sign.sign(sa.private_key, 'base64url')}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!res.ok) throw new Error(`GA4 auth failed: ${await res.text()}`);
  return ((await res.json()) as { access_token: string }).access_token;
}

async function runReport(token: string, propertyId: string, body: unknown): Promise<GA4Report> {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) throw new Error(`GA4 report error: ${await res.text()}`);
  return res.json() as Promise<GA4Report>;
}

export interface AnalyticsSummary {
  sessions: number;
  users: number;
  waClicks: number;
  conversionRate: number;
  channels: { name: string; sessions: number; pct: number }[];
  topPages: { path: string; views: number }[];
  newUsers: number;
  returningUsers: number;
  mobile: number;
  desktop: number;
  tablet: number;
}

const CHANNEL_NAMES: Record<string, string> = {
  'Organic Search': 'Búsqueda orgánica',
  'Direct': 'Directo',
  'Referral': 'Referidos',
  'Organic Social': 'Redes sociales',
  'Paid Search': 'Búsqueda pagada',
  'Email': 'Email',
  'Unassigned': 'Sin clasificar',
  'Cross-network': 'Multi-canal',
};

export async function fetchAnalyticsSummary(
  propertyId: string,
  serviceAccountJson: string
): Promise<AnalyticsSummary> {
  const sa = JSON.parse(serviceAccountJson) as ServiceAccount;
  const token = await getAccessToken(sa);
  const dr = [{ startDate: '30daysAgo', endDate: 'today' }];

  const [ov, wa, ch, pg, nv, dv] = await Promise.all([
    // 1. Sesiones y usuarios totales
    runReport(token, propertyId, {
      dateRanges: dr,
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
    }),
    // 2. WhatsApp clicks (evento custom implementado en el sitio)
    runReport(token, propertyId, {
      dateRanges: dr,
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: { matchType: 'EXACT', value: 'whatsapp_click' },
        },
      },
    }),
    // 3. Canales de tráfico
    runReport(token, propertyId, {
      dateRanges: dr,
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 5,
    }),
    // 4. Páginas más vistas
    runReport(token, propertyId, {
      dateRanges: dr,
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 5,
    }),
    // 5. Nuevos vs recurrentes
    runReport(token, propertyId, {
      dateRanges: dr,
      dimensions: [{ name: 'newVsReturning' }],
      metrics: [{ name: 'activeUsers' }],
    }),
    // 6. Dispositivos
    runReport(token, propertyId, {
      dateRanges: dr,
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }],
    }),
  ]);

  const sessions = parseInt(ov.rows?.[0]?.metricValues[0].value ?? '0');
  const users    = parseInt(ov.rows?.[0]?.metricValues[1].value ?? '0');
  const waClicks = parseInt(wa.rows?.[0]?.metricValues[0].value ?? '0');
  const conversionRate = sessions > 0 ? Math.round((waClicks / sessions) * 1000) / 10 : 0;

  const chTotal = ch.rows?.reduce((s, r) => s + parseInt(r.metricValues[0].value), 0) || 1;
  const channels = (ch.rows ?? []).slice(0, 4).map(r => ({
    name: CHANNEL_NAMES[r.dimensionValues![0].value] ?? r.dimensionValues![0].value,
    sessions: parseInt(r.metricValues[0].value),
    pct: Math.round((parseInt(r.metricValues[0].value) / chTotal) * 100),
  }));

  const topPages = (pg.rows ?? []).slice(0, 5).map(r => ({
    path: r.dimensionValues![0].value,
    views: parseInt(r.metricValues[0].value),
  }));

  const findNV = (k: string) =>
    parseInt(nv.rows?.find(r => r.dimensionValues![0].value === k)?.metricValues[0].value ?? '0');
  const findDV = (k: string) =>
    parseInt(dv.rows?.find(r => r.dimensionValues![0].value === k)?.metricValues[0].value ?? '0');

  return {
    sessions,
    users,
    waClicks,
    conversionRate,
    channels,
    topPages,
    newUsers: findNV('new'),
    returningUsers: findNV('returning'),
    mobile: findDV('mobile'),
    desktop: findDV('desktop'),
    tablet: findDV('tablet'),
  };
}
