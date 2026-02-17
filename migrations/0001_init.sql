CREATE TABLE IF NOT EXISTS period_state (
  period TEXT PRIMARY KEY,
  json TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
