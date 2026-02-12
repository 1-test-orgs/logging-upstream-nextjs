import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Structured JSON logging
  console.log(JSON.stringify({
    severity: 'INFO',
    message: 'Structured log endpoint called',
    timestamp: new Date().toISOString(),
    metadata: {
      endpoint: '/api/structured-log',
      method: 'GET',
      userAgent: request.headers.get('user-agent'),
      requestId: crypto.randomUUID(),
    },
  }));

  return NextResponse.json({
    message: 'Structured logging endpoint',
    logged: true,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log(JSON.stringify({
    severity: 'INFO',
    message: 'POST request to structured log endpoint',
    timestamp: new Date().toISOString(),
    metadata: {
      endpoint: '/api/structured-log',
      method: 'POST',
      body,
      contentType: request.headers.get('content-type'),
    },
  }));

  return NextResponse.json({
    message: 'Data received and logged',
    data: body,
  });
}
