const store = new Map<string, number[]>();

// Returns false if the IP exceeded the limit within the window.
export function checkRateLimit(ip: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const prev = (store.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (prev.length >= limit) return false;
  store.set(ip, [...prev, now]);
  return true;
}
