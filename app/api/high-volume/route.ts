import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const count = parseInt(request.nextUrl.searchParams.get('count') || '10', 10);
  const maxCount = Math.min(count, 100); // Cap at 100 to prevent abuse

  console.log(`INFO: Starting high-volume log test with ${maxCount} entries`);

  for (let i = 1; i <= maxCount; i++) {
    const severities = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
    const severity = severities[i % severities.length];

    console.log(JSON.stringify({
      severity,
      message: `High-volume log entry ${i} of ${maxCount}`,
      timestamp: new Date().toISOString(),
      metadata: {
        sequenceNumber: i,
        totalCount: maxCount,
        operation: 'high_volume_test',
        randomData: Math.random().toString(36).substring(7),
      },
    }));

    // Add some variety
    if (i % 10 === 0) {
      console.log(`Progress: ${i}/${maxCount} log entries generated`);
    }
  }

  console.log(`INFO: Completed high-volume log test with ${maxCount} entries`);

  return NextResponse.json({
    message: 'High-volume logs generated',
    count: maxCount,
    timestamp: new Date().toISOString(),
  });
}
