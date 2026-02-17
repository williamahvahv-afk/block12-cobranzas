export async function onRequest() {
  return Response.json({ ok: true, ts: Date.now() });
}
