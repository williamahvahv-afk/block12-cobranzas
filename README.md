# Block 12 — Cobranzas (Feb–Jun 2026) con Cloudflare Pages + D1

## Qué hace
- App web (móvil/PC) para registrar pagos por mes.
- API /api/state (GET/POST) que guarda un JSON por mes en D1.
- Protección simple con header X-App-Key (secret).

## Estructura
- public/index.html
- functions/api/state.js
- functions/api/health.js
- migrations/0001_init.sql
- wrangler.toml

## Pasos rápidos (resumen)
1) Crear D1: wrangler d1 create block12_cobranzas
2) Poner database_id en wrangler.toml
3) Crear tabla con migración en D1 (ver migrations/0001_init.sql)
4) Definir secret APP_KEY (dashboard o wrangler secret put APP_KEY)
5) Publicar con Pages (output: public/) y Functions activas.
