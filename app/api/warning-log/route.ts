import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Different warning scenarios
  const type = request.nextUrl.searchParams.get('type') || 'default';

  switch (type) {
    case 'deprecation':
      console.warn('WARN: Deprecated API usage detected', {
        api: '/api/old-endpoint',
        deprecatedSince: '2025-01-01',
        alternative: '/api/new-endpoint',
        timestamp: new Date().toISOString(),
      });
      break;

    case 'performance':
      console.warn('WARN: Performance degradation detected', {
        operation: 'database_query',
        duration: '5234ms',
        threshold: '1000ms',
        timestamp: new Date().toISOString(),
      });
      break;

    case 'security':
      console.warn(JSON.stringify({
        severity: 'WARNING',
        message: 'Potential security issue detected',
        timestamp: new Date().toISOString(),
        details: {
          type: 'rate_limit_warning',
          attempts: 8,
          threshold: 10,
          ip: request.headers.get('x-forwarded-for') || 'unknown',
        },
      }));
      break;

    default:
      console.warn('WARN: Generic warning message', {
        timestamp: new Date().toISOString(),
      });
  }

  return NextResponse.json({
    message: 'Warning logged',
    type,
    timestamp: new Date().toISOString(),
  });
}
