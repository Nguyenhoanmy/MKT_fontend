// ============================================================
// SERVICE — API Client (Mock với artificial delay)
// Simulates real API latency để demo skeleton loading
// ============================================================

const ARTIFICIAL_DELAY = 600; // ms

export async function apiGet<T>(data: T, delay = ARTIFICIAL_DELAY): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

export async function apiPost<T>(data: T, delay = ARTIFICIAL_DELAY): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}
