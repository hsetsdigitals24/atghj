import { NextResponse } from 'next/server';
import { buildOjsUrl, isOjsConfigured } from '@/app/lib/ojs';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (!isOjsConfigured()) {
    return NextResponse.json(
      { error: 'Configuration missing' },
      { status: 500 }
    );
  }

  const endpoints = ['/submissions', '/issues'];
  const results = [];

  for (const endpoint of endpoints) {
    const url = buildOjsUrl(endpoint, { count: '1' });

    try {
      const startTime = Date.now();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      const duration = Date.now() - startTime;
      const contentType = response.headers.get('content-type');

      let responseData: unknown;
      try {
        const text = await response.text();
        responseData = JSON.parse(text);
      } catch {
        responseData = '[non-JSON response]';
      }

      results.push({
        endpoint,
        status: response.status,
        statusText: response.statusText,
        contentType,
        duration: `${duration}ms`,
        ok: response.ok,
        dataPreview:
          typeof responseData === 'string'
            ? responseData.substring(0, 200)
            : responseData,
      });
    } catch (error) {
      results.push({
        endpoint,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    results,
  });
}
