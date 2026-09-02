export function getApiUrl() {
  const raw = import.meta.env.VITE_API_URL;
  if (raw === '') return null;
  if (typeof raw === 'string' && raw.trim()) return raw.trim().replace(/\/$/, '');
  if (import.meta.env.DEV) return 'http://localhost:5080';
  return null;
}

export function getTurnstileSiteKey() {
  const raw = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  if (typeof raw === 'string' && raw.trim()) return raw.trim();
  return '';
}

async function request(path, options = {}) {
  const base = getApiUrl();
  if (!base) {
    const err = new Error('run-local');
    err.code = 'run-local';
    throw err;
  }
  const headers = { ...(options.headers || {}) };
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(`${base}${path}`, {
    credentials: 'include',
    ...options,
    headers,
  });
  return res;
}

function throwHttp(res, fallback) {
  const err = new Error(fallback);
  if (res.status === 429) err.code = 'try-later';
  else if (res.status === 503) err.code = 'mail';
  else err.code = fallback;
  throw err;
}

export async function getMe() {
  const res = await request('/api/auth/me');
  if (!res.ok) {
    const err = new Error('failed');
    err.code = 'failed';
    throw err;
  }
  return res.json();
}


export async function getPlan() {
  const res = await request("/api/plan");
  if (!res.ok) {
    const err = new Error("failed");
    err.code = "failed";
    throw err;
  }
  return res.json();
}

export async function login(email, password) {
  const res = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = new Error('auth');
    err.code = 'auth';
    throw err;
  }
  return res.json();
}

export async function register(email, password, extra = {}) {
  const res = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      company: extra.company || '',
      'cf-turnstile-response': extra.turnstile || '',
    }),
  });
  if (!res.ok) throwHttp(res, 'register');
  return res.json();
}

export async function verifyEmail(token) {
  const res = await request('/api/auth/verify', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
  if (!res.ok) {
    const err = new Error('verify');
    err.code = 'verify';
    throw err;
  }
  return res.json();
}

export async function resendVerification(email) {
  const res = await request('/api/auth/resend-verification', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throwHttp(res, 'register');
  return res.json();
}

export async function logout() {
  await request('/api/auth/logout', { method: 'POST' });
}

export async function postJob(kind, files, fields = {}) {
  const fd = new FormData();
  for (const file of files) fd.append('files', file);
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null || value === '') continue;
    fd.append(key, String(value));
  }
  const res = await request(`/api/jobs/${kind}`, { method: 'POST', body: fd });
  if (res.status === 402) {
    const err = new Error('plan');
    err.code = 'plan';
    throw err;
  }
  if (!res.ok) {
    let code = 'failed';
    try {
      const data = await res.json();
      if (data && typeof data.code === 'string') code = data.code;
    } catch {
      /* ignore */
    }
    const err = new Error(code);
    err.code = code;
    throw err;
  }
  return new Uint8Array(await res.arrayBuffer());
}
