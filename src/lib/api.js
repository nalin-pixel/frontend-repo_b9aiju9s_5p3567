export const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export async function api(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

export function getOrCreateUserId() {
  let id = localStorage.getItem('umax_user_id');
  if (!id) {
    id = `u_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    localStorage.setItem('umax_user_id', id);
  }
  return id;
}
