const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(base + path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    // For dev simplicity; adjust when adding auth
    cache: 'no-store',
  });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try { const data = await res.json(); msg = data?.error ?? msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}
