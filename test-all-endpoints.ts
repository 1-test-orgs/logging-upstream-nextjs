#!/usr/bin/env tsx

/**
 * Test all logging endpoints
 *
 * Usage:
 *   BASE_URL=https://your-app.run.app tsx test-all-endpoints.ts
 *
 * Or use default localhost:
 *   tsx test-all-endpoints.ts
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

interface TestResult {
  endpoint: string;
  status: number;
  success: boolean;
  duration: number;
  error?: string;
}

const results: TestResult[] = [];

async function callEndpoint(endpoint: string, options: RequestInit = {}): Promise<TestResult> {
  const url = `${BASE_URL}${endpoint}`;
  const startTime = Date.now();

  try {
    console.log(`\n📡 Testing: ${endpoint}`);
    const response = await fetch(url, options);
    const duration = Date.now() - startTime;
    const data = await response.json();

    const result: TestResult = {
      endpoint,
      status: response.status,
      success: response.ok,
      duration,
    };

    if (response.ok) {
      console.log(`✅ Success (${duration}ms) - Status: ${response.status}`);
      console.log(`   Response:`, data);
    } else {
      console.log(`❌ Failed (${duration}ms) - Status: ${response.status}`);
      result.error = `HTTP ${response.status}`;
    }

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.log(`❌ Error (${duration}ms):`, error instanceof Error ? error.message : String(error));

    return {
      endpoint,
      status: 0,
      success: false,
      duration,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function runAllTests() {
  console.log('🚀 Starting endpoint tests...');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log('=' .repeat(80));

  // Test 1: Basic hello endpoint
  results.push(await callEndpoint('/api/hello'));

  // Wait a bit between requests
  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 2: Structured logging (GET)
  results.push(await callEndpoint('/api/structured-log'));

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 3: Structured logging (POST)
  results.push(await callEndpoint('/api/structured-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ test: 'data', timestamp: new Date().toISOString() }),
  }));

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 4: Error logs - basic
  results.push(await callEndpoint('/api/error-log?scenario=basic'));

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 5: Error logs - exception
  results.push(await callEndpoint('/api/error-log?scenario=exception'));

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 6: Error logs - structured
  results.push(await callEndpoint('/api/error-log?scenario=structured'));

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 7: Warning logs - deprecation
  results.push(await callEndpoint('/api/warning-log?type=deprecation'));

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 8: Warning logs - performance
  results.push(await callEndpoint('/api/warning-log?type=performance'));

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 9: Warning logs - security
  results.push(await callEndpoint('/api/warning-log?type=security'));

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 10: Debug logs - basic
  results.push(await callEndpoint('/api/debug-log'));

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 11: Debug logs - verbose
  results.push(await callEndpoint('/api/debug-log?verbose=true'));

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 12: Multi-line logs
  results.push(await callEndpoint('/api/multiline-log'));

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 13: High volume - 20 logs
  results.push(await callEndpoint('/api/high-volume?count=20'));

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 14: Mixed formats
  results.push(await callEndpoint('/api/mixed-formats'));

  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 15: Time series - 3 seconds (quick test)
  results.push(await callEndpoint('/api/time-series?duration=3'));

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 Test Summary');
  console.log('='.repeat(80));

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

  console.log(`\nTotal Tests: ${results.length}`);
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏱️  Total Duration: ${totalDuration}ms`);
  console.log(`⏱️  Average Duration: ${Math.round(totalDuration / results.length)}ms`);

  if (failed > 0) {
    console.log('\n❌ Failed Tests:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.endpoint}: ${r.error || `HTTP ${r.status}`}`);
    });
  }

  console.log('\n' + '='.repeat(80));

  // Exit with error code if any tests failed
  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
