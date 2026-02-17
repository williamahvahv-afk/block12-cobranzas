export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const key = request.headers.get('X-App-Key') || '';
  if (!env.APP_KEY || key !== env.APP_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  const db = env.DB;

  if (request.method === 'GET') {
    const period = url.searchParams.get('period');
    if (!period) return new Response('Missing period', { status: 400 });

    const row = await db.prepare(
      'SELECT period, json, updated_at FROM period_state WHERE period = ?'
    ).bind(period).first();

    if (!row) return Response.json({ period, json: null, updated_at: 0 });

    let parsed = null;
    try { parsed = JSON.parse(row.json); } catch { parsed = null; }

    return Response.json({ period: row.period, json: parsed, updated_at: row.updated_at });
  }

  if (request.method === 'POST') {
    const body = await request.json().catch(() => null);
    if (!body || !body.period || !body.json) {
      return new Response('Invalid body', { status: 400 });
    }

    const period = body.period;
    const updated_at = Date.now();
    const jsonText = JSON.stringify(body.json);

    await db.prepare(`
      INSERT INTO period_state (period, json, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(period) DO UPDATE SET json=excluded.json, updated_at=excluded.updated_at
    `).bind(period, jsonText, updated_at).run();

    return Response.json({ ok: true, period, updated_at });
  }

  return new Response('Method not allowed', { status: 405 });
}
