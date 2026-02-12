import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const duration = parseInt(request.nextUrl.searchParams.get('duration') || '5', 10);
  const maxDuration = Math.min(duration, 30); // Cap at 30 seconds
  const interval = 1000; // 1 second

  console.log(JSON.stringify({
    severity: 'INFO',
    message: 'Starting time-series log test',
    timestamp: new Date().toISOString(),
    metadata: {
      duration: maxDuration,
      interval,
    },
  }));

  const logs: string[] = [];

  for (let i = 0; i < maxDuration; i++) {
    await new Promise(resolve => setTimeout(resolve, interval));

    const logEntry = {
      severity: 'INFO',
      message: `Time-series log entry ${i + 1}`,
      timestamp: new Date().toISOString(),
      metadata: {
        sequenceNumber: i + 1,
        totalDuration: maxDuration,
        elapsedSeconds: i + 1,
        metrics: {
          cpu: Math.random() * 100,
          memory: Math.random() * 1024,
          requests: Math.floor(Math.random() * 1000),
        },
      },
    };

    console.log(JSON.stringify(logEntry));
    logs.push(JSON.stringify(logEntry));

    // Log milestone
    if ((i + 1) % 5 === 0) {
      console.log(`Milestone: ${i + 1} seconds elapsed`);
    }
  }

  console.log(JSON.stringify({
    severity: 'INFO',
    message: 'Completed time-series log test',
    timestamp: new Date().toISOString(),
    metadata: {
      totalLogs: logs.length,
      duration: maxDuration,
    },
  }));

  return NextResponse.json({
    message: 'Time-series logs generated',
    duration: maxDuration,
    logCount: logs.length,
    timestamp: new Date().toISOString(),
  });
}
