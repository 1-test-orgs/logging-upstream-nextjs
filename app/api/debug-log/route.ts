import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const verbose = request.nextUrl.searchParams.get('verbose') === 'true';

  // Debug logs with varying detail levels
  console.debug('DEBUG: Request received', {
    url: request.url,
    method: request.method,
    timestamp: new Date().toISOString(),
  });

  if (verbose) {
    console.debug('DEBUG: Request headers', {
      headers: Object.fromEntries(request.headers.entries()),
      timestamp: new Date().toISOString(),
    });

    console.debug('DEBUG: Request metadata', {
      nextUrl: {
        pathname: request.nextUrl.pathname,
        searchParams: Object.fromEntries(request.nextUrl.searchParams.entries()),
      },
      geo: (request as unknown as { geo?: unknown }).geo,
      ip: request.headers.get('x-forwarded-for'),
      timestamp: new Date().toISOString(),
    });
  }

  // Structured debug log
  console.log(JSON.stringify({
    severity: 'DEBUG',
    message: 'Debug endpoint processing complete',
    timestamp: new Date().toISOString(),
    metadata: {
      verbose,
      processingTime: Math.random() * 100,
    },
  }));

  return NextResponse.json({
    message: 'Debug logs generated',
    verbose,
    timestamp: new Date().toISOString(),
  });
}
