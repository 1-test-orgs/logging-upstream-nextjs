import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Plain text log
  console.log('Plain text: Mixed formats endpoint called');

  // Key-value format
  console.log('level=info msg="Key-value format log" endpoint=/api/mixed-formats timestamp=' + new Date().toISOString());

  // JSON format
  console.log(JSON.stringify({
    level: 'info',
    msg: 'JSON format log',
    endpoint: '/api/mixed-formats',
    timestamp: new Date().toISOString(),
  }));

  // Common Log Format (CLF) style
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const timestamp = new Date().toISOString();
  console.log(`${ip} - - [${timestamp}] "GET /api/mixed-formats HTTP/1.1" 200 1234`);

  // Syslog-style format
  console.log(`<14>1 ${timestamp} test-app api mixed-formats - - msg="Syslog-style log"`);

  // Custom format with separators
  console.log('===================================');
  console.log('Custom Format Log Entry');
  console.log('-----------------------------------');
  console.log('Timestamp: ' + timestamp);
  console.log('Endpoint: /api/mixed-formats');
  console.log('Method: GET');
  console.log('Status: Success');
  console.log('===================================');

  // Emoji-enhanced log (for testing special characters)
  console.log('✅ INFO: Request processed successfully 🎉', {
    endpoint: '/api/mixed-formats',
    timestamp,
  });

  // Error format but info level
  console.info('INFO (via console.info): Testing different console methods');

  // Table-like format
  console.log('┌────────────────┬──────────────────────────────┐');
  console.log('│ Field          │ Value                        │');
  console.log('├────────────────┼──────────────────────────────┤');
  console.log('│ Endpoint       │ /api/mixed-formats           │');
  console.log('│ Method         │ GET                          │');
  console.log('│ Status         │ 200                          │');
  console.log('└────────────────┴──────────────────────────────┘');

  return NextResponse.json({
    message: 'Mixed format logs generated',
    formats: [
      'plain-text',
      'key-value',
      'json',
      'clf',
      'syslog',
      'custom',
      'emoji',
      'table',
    ],
    timestamp,
  });
}
