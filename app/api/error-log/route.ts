import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Simulate different error scenarios
  const scenario = request.nextUrl.searchParams.get('scenario') || 'basic';

  switch (scenario) {
    case 'basic':
      console.error('ERROR: Basic error log test', {
        timestamp: new Date().toISOString(),
        errorCode: 'TEST_ERROR_001',
      });
      break;

    case 'exception':
      try {
        throw new Error('Simulated exception for testing');
      } catch (error) {
        console.error('ERROR: Exception caught', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          timestamp: new Date().toISOString(),
        });
      }
      break;

    case 'structured':
      console.error(JSON.stringify({
        severity: 'ERROR',
        message: 'Structured error log',
        timestamp: new Date().toISOString(),
        error: {
          code: 'ERR_SIMULATION',
          details: 'This is a simulated error for testing purposes',
        },
      }));
      break;

    default:
      console.error('ERROR: Unknown scenario', { scenario });
  }

  return NextResponse.json({
    message: 'Error logged',
    scenario,
    timestamp: new Date().toISOString(),
  });
}
