# Tenant-Logs Testing Application

This is a Next.js application designed to test the tenant-logs service with various logging patterns and methodologies.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Testing Endpoints

This application provides 9 API endpoints with different logging patterns. See [API_ENDPOINTS.md](./API_ENDPOINTS.md) for detailed documentation.

### Quick Overview

- `/api/hello` - Basic info logging
- `/api/structured-log` - JSON structured logs (GET/POST)
- `/api/error-log` - Error scenarios with query params
- `/api/warning-log` - Warning types with query params
- `/api/debug-log` - Debug logging with verbose mode
- `/api/multiline-log` - Multi-line and complex formats
- `/api/high-volume` - Generate multiple log entries
- `/api/mixed-formats` - Various format styles
- `/api/time-series` - Time-based sequential logging

## Running Tests

### Using TypeScript (recommended)

```bash
# Test against local development server
npm run test:endpoints

# Test against deployed application
BASE_URL=https://your-app.run.app npm run test:endpoints
```

### Using Shell Script

```bash
# Test against local development server
npm run test:endpoints:sh

# Or directly
./test-all-endpoints.sh

# Test against deployed application
BASE_URL=https://your-app.run.app ./test-all-endpoints.sh
```

### Manual Testing

You can also test individual endpoints manually:

```bash
# Basic endpoint
curl http://localhost:3000/api/hello

# Error with scenario
curl http://localhost:3000/api/error-log?scenario=exception

# High volume logs
curl http://localhost:3000/api/high-volume?count=50
```

## Environment Variables

- `BASE_URL` - Base URL for testing (defaults to `http://localhost:3000`)

## Project Structure

```
.
├── app/
│   ├── api/                    # API route handlers
│   │   ├── hello/             # Basic logging endpoint
│   │   ├── structured-log/    # JSON structured logging
│   │   ├── error-log/         # Error scenarios
│   │   ├── warning-log/       # Warning types
│   │   ├── debug-log/         # Debug logging
│   │   ├── multiline-log/     # Multi-line formats
│   │   ├── high-volume/       # Volume testing
│   │   ├── mixed-formats/     # Format variations
│   │   └── time-series/       # Time-based logging
│   ├── layout.tsx
│   └── page.tsx
├── test-all-endpoints.ts      # TypeScript test script
├── test-all-endpoints.sh      # Shell test script
├── API_ENDPOINTS.md           # Detailed API documentation
└── README.md                  # This file
```

## Testing with Tenant-Logs

1. **Deploy this application** to Cloud Run or run locally
2. **Configure Cloud Logging** to route logs to Pub/Sub
3. **Deploy tenant-logs-v2** service in the same project
4. **Run the test scripts** to generate logs:
   ```bash
   BASE_URL=https://your-app.run.app npm run test:endpoints
   ```
5. **Verify** logs are captured by tenant-logs and streamed correctly

## Log Severity Levels

The endpoints generate logs with various severity levels:
- **DEBUG** - Detailed diagnostic information
- **INFO** - Informational messages
- **WARN** - Warning messages
- **ERROR** - Error messages

## Learn More

To learn more about Next.js:
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```
