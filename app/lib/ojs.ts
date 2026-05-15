import { NextResponse } from 'next/server';

const OJS_BASE_URL = process.env.OJS_API_URL;
const OJS_API_KEY = process.env.OJS_API_KEY;

const DEFAULT_REVALIDATE = 3600;

export interface OjsFetchOptions {
  params?: Record<string, string | number | undefined>;
  revalidate?: number;
  signal?: AbortSignal;
  timeout?: number; // milliseconds
}

export function isOjsConfigured(): boolean {
  return Boolean(OJS_BASE_URL && OJS_API_KEY);
}

export function ojsConfigErrorResponse() {
  return NextResponse.json(
    { error: 'OJS configuration missing' },
    { status: 500 }
  );
}

export function buildOjsUrl(
  path: string,
  params?: OjsFetchOptions['params']
): string {
  const url = new URL(`${OJS_BASE_URL}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      url.searchParams.append(key, String(value));
    }
  }
  if (OJS_API_KEY) {
    url.searchParams.append('apiToken', OJS_API_KEY);
  }
  return url.toString();
}

export async function ojsFetch(
  path: string,
  options: OjsFetchOptions = {}
): Promise<Response> {
  if (!isOjsConfigured()) {
    throw new Error('OJS configuration missing');
  }

  const url = buildOjsUrl(path, options.params);
  
  // Create AbortController with timeout
  const timeoutMs = options.timeout ?? 10000; // 10 seconds default
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  // Merge signals if user provided one
  const signal = options.signal 
    ? new AbortSignal() 
    : controller.signal;

  const init: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    },
    signal,
    next: { revalidate: options.revalidate ?? DEFAULT_REVALIDATE },
  };

  try {
    return await fetch(url, init);
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error(`OJS API request timeout after ${timeoutMs}ms to ${path}`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function ojsFetchJson<T>(
  path: string,
  options: OjsFetchOptions = {}
): Promise<T> {
  const response = await ojsFetch(path, options);
  if (!response.ok) {
    throw new OjsApiError(response.status, response.statusText, path);
  }
  return response.json() as Promise<T>;
}

export class OjsApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public path: string
  ) {
    super(`OJS API error: ${status} ${statusText}`);
    this.name = 'OjsApiError';
  }
}
