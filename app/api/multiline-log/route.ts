import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Multi-line logs
  console.log(`Multi-line log entry:
Request Details:
  - Method: ${request.method}
  - URL: ${request.url}
  - Timestamp: ${new Date().toISOString()}
  - User Agent: ${request.headers.get('user-agent')}
End of multi-line log`);

  // Stack trace simulation
  console.log(`Stack trace simulation:
  at processRequest (file:///app/api/multiline-log/route.ts:10:5)
  at handleRequest (file:///app/middleware.ts:25:12)
  at runtime (file:///node_modules/next/dist/server/base-server.js:120:8)`);

  // Large JSON payload
  const largePayload = {
    timestamp: new Date().toISOString(),
    request: {
      method: request.method,
      url: request.url,
      headers: Object.fromEntries(request.headers.entries()),
    },
    metadata: {
      server: 'next-js',
      version: '15.1.6',
      environment: process.env.NODE_ENV,
    },
    data: {
      items: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        description: `Description for item ${i + 1}`,
        timestamp: new Date().toISOString(),
      })),
    },
  };

  console.log(JSON.stringify(largePayload, null, 2));

  return NextResponse.json({
    message: 'Multi-line logs generated',
    timestamp: new Date().toISOString(),
  });
}
