#!/bin/bash

# Test all logging endpoints
#
# Usage:
#   BASE_URL=https://your-app.run.app ./test-all-endpoints.sh
#
# Or use default localhost:
#   ./test-all-endpoints.sh

set -e

BASE_URL="${BASE_URL:-http://localhost:3000}"

echo "🚀 Starting endpoint tests..."
echo "📍 Base URL: $BASE_URL"
echo "================================================================================"

SUCCESSFUL=0
FAILED=0

# Helper function to test an endpoint
test_endpoint() {
  local endpoint="$1"
  local method="${2:-GET}"
  local data="${3:-}"

  echo ""
  echo "📡 Testing: $method $endpoint"

  local url="$BASE_URL$endpoint"
  local start_time=$(date +%s%3N)

  if [ -n "$data" ]; then
    if curl -s -w "\nHTTP Status: %{http_code}\n" -X "$method" \
         -H "Content-Type: application/json" \
         -d "$data" \
         "$url" > /tmp/curl_output.txt 2>&1; then
      local end_time=$(date +%s%3N)
      local duration=$((end_time - start_time))
      local status=$(tail -1 /tmp/curl_output.txt | grep -o '[0-9]*')

      if [ "$status" -ge 200 ] && [ "$status" -lt 300 ]; then
        echo "✅ Success (${duration}ms) - Status: $status"
        ((SUCCESSFUL++))
      else
        echo "❌ Failed (${duration}ms) - Status: $status"
        ((FAILED++))
      fi

      head -n -1 /tmp/curl_output.txt | head -20
    else
      echo "❌ Request failed"
      ((FAILED++))
    fi
  else
    if curl -s -w "\nHTTP Status: %{http_code}\n" -X "$method" "$url" > /tmp/curl_output.txt 2>&1; then
      local end_time=$(date +%s%3N)
      local duration=$((end_time - start_time))
      local status=$(tail -1 /tmp/curl_output.txt | grep -o '[0-9]*')

      if [ "$status" -ge 200 ] && [ "$status" -lt 300 ]; then
        echo "✅ Success (${duration}ms) - Status: $status"
        ((SUCCESSFUL++))
      else
        echo "❌ Failed (${duration}ms) - Status: $status"
        ((FAILED++))
      fi

      head -n -1 /tmp/curl_output.txt | head -20
    else
      echo "❌ Request failed"
      ((FAILED++))
    fi
  fi

  sleep 0.5
}

# Run all tests
test_endpoint "/api/hello"
test_endpoint "/api/structured-log"
test_endpoint "/api/structured-log" "POST" '{"test":"data","timestamp":"'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'"}'
test_endpoint "/api/error-log?scenario=basic"
test_endpoint "/api/error-log?scenario=exception"
test_endpoint "/api/error-log?scenario=structured"
test_endpoint "/api/warning-log?type=deprecation"
test_endpoint "/api/warning-log?type=performance"
test_endpoint "/api/warning-log?type=security"
test_endpoint "/api/debug-log"
test_endpoint "/api/debug-log?verbose=true"
test_endpoint "/api/multiline-log"
test_endpoint "/api/high-volume?count=20"
test_endpoint "/api/mixed-formats"
test_endpoint "/api/time-series?duration=3"

# Print summary
echo ""
echo "================================================================================"
echo "📊 Test Summary"
echo "================================================================================"
echo ""
echo "Total Tests: $((SUCCESSFUL + FAILED))"
echo "✅ Successful: $SUCCESSFUL"
echo "❌ Failed: $FAILED"
echo ""
echo "================================================================================"

# Clean up
rm -f /tmp/curl_output.txt

# Exit with error code if any tests failed
if [ $FAILED -gt 0 ]; then
  exit 1
fi

exit 0
