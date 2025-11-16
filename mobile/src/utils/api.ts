//const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7071/api';
const API_BASE = 'http://localhost:7071/api';

const DEFAULT_USER_ID = Number(import.meta.env.VITE_APP_USER_ID ?? 1);

async function httpGet<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `GET ${url} failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

async function httpPost<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `POST ${url} failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export { API_BASE, DEFAULT_USER_ID, httpGet, httpPost };
