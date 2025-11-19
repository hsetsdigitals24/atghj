
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_API_URL;
  const OJS_API_KEY = process.env.NEXT_PUBLIC_OJS_API_KEY;
  
  console.log('=== OJS API DEBUG ===');
  console.log('OJS_BASE_URL:', OJS_BASE_URL);
  console.log('OJS_API_KEY exists:', !!OJS_API_KEY);
  console.log('OJS_API_KEY length:', OJS_API_KEY?.length);

  if (!OJS_BASE_URL || !OJS_API_KEY) {
    return NextResponse.json({
      error: 'Configuration missing',
      hasBaseUrl: !!OJS_BASE_URL,
      hasApiKey: !!OJS_API_KEY
    }, { status: 500 });
  }

  // Test different endpoints
  const endpoints = [
    '/api/v1/submissions',
    '/api/v1/issues',
    '/api/v1/_submissions' // Check if underscore is needed
  ];

  const results = [];

  for (const endpoint of endpoints) {
    const apiUrl = new URL(`${OJS_BASE_URL}${endpoint}`);
    apiUrl.searchParams.append('apiToken', OJS_API_KEY);
    apiUrl.searchParams.append('count', '1');

    console.log(`Testing: ${apiUrl.toString()}`);

    try {
      const startTime = Date.now();
      const response = await fetch(apiUrl.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'NextJS-Debug/1.0'
        }
      });

      const duration = Date.now() - startTime;
      const contentType = response.headers.get('content-type');
      
      let responseData;
      try {
        responseData = await response.text();
        // Try to parse as JSON
        responseData = JSON.parse(responseData);
      } catch {
        // Keep as text if not JSON
      }

      results.push({
        endpoint,
        status: response.status,
        statusText: response.statusText,
        contentType,
        duration: `${duration}ms`,
        ok: response.ok,
        dataPreview: typeof responseData === 'string' 
          ? responseData.substring(0, 200) 
          : responseData
      });

      console.log(`✓ ${endpoint}: ${response.status}`);
    } catch (error) {
      results.push({
        endpoint,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      console.error(`✗ ${endpoint}:`, error);
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    config: {
      baseUrl: OJS_BASE_URL,
      apiKeyLength: OJS_API_KEY.length,
      apiKeyStart: OJS_API_KEY.substring(0, 8) + '...'
    },
    results
  });
}