# Tenant-Logs Testing API Endpoints

This Next.js application provides various API endpoints to test the tenant-logs service with different logging patterns and methodologies.

## Endpoints

### 1. `/api/hello`
**Method:** GET
**Purpose:** Basic info-level logging
**Logs Generated:**
- Simple console.log with timestamp
- Plain text format

**Example:**
```bash
curl http://localhost:3000/api/hello
```

---

### 2. `/api/structured-log`
**Methods:** GET, POST
**Purpose:** JSON structured logging
**Logs Generated:**
- Fully structured JSON logs
- Includes metadata like requestId, userAgent, endpoint

**Examples:**
```bash
# GET request
curl http://localhost:3000/api/structured-log

# POST request
curl -X POST http://localhost:3000/api/structured-log \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

---

### 3. `/api/error-log`
**Method:** GET
**Purpose:** Error-level logging with different scenarios
**Query Parameters:**
- `scenario` - Type of error (basic, exception, structured)

**Logs Generated:**
- console.error with various formats
- Stack traces for exceptions
- Structured error objects

**Examples:**
```bash
# Basic error
curl http://localhost:3000/api/error-log?scenario=basic

# Exception with stack trace
curl http://localhost:3000/api/error-log?scenario=exception

# Structured error
curl http://localhost:3000/api/error-log?scenario=structured
```

---

### 4. `/api/warning-log`
**Method:** GET
**Purpose:** Warning-level logging
**Query Parameters:**
- `type` - Type of warning (deprecation, performance, security, default)

**Logs Generated:**
- console.warn with context
- Different warning scenarios

**Examples:**
```bash
# Deprecation warning
curl http://localhost:3000/api/warning-log?type=deprecation

# Performance warning
curl http://localhost:3000/api/warning-log?type=performance

# Security warning
curl http://localhost:3000/api/warning-log?type=security
```

---

### 5. `/api/debug-log`
**Method:** GET
**Purpose:** Debug-level logging
**Query Parameters:**
- `verbose` - Enable verbose logging (true/false)

**Logs Generated:**
- console.debug with request details
- Verbose mode includes headers and metadata

**Examples:**
```bash
# Basic debug
curl http://localhost:3000/api/debug-log

# Verbose debug
curl http://localhost:3000/api/debug-log?verbose=true
```

---

### 6. `/api/multiline-log`
**Method:** GET
**Purpose:** Multi-line and complex log formats
**Logs Generated:**
- Multi-line text logs
- Stack trace simulations
- Large JSON payloads with nested structures

**Example:**
```bash
curl http://localhost:3000/api/multiline-log
```

---

### 7. `/api/high-volume`
**Method:** GET
**Purpose:** Generate high volume of logs
**Query Parameters:**
- `count` - Number of log entries to generate (1-100)

**Logs Generated:**
- Multiple sequential log entries
- Varying severity levels (INFO, WARN, ERROR, DEBUG)
- Progress indicators

**Examples:**
```bash
# Generate 10 logs
curl http://localhost:3000/api/high-volume?count=10

# Generate 50 logs
curl http://localhost:3000/api/high-volume?count=50
```

---

### 8. `/api/mixed-formats`
**Method:** GET
**Purpose:** Test various log format styles
**Logs Generated:**
- Plain text
- Key-value format
- JSON format
- Common Log Format (CLF)
- Syslog-style format
- Custom formatted logs
- Emoji-enhanced logs
- Table-like format

**Example:**
```bash
curl http://localhost:3000/api/mixed-formats
```

---

### 9. `/api/time-series`
**Method:** GET
**Purpose:** Generate time-series logs with delays
**Query Parameters:**
- `duration` - Duration in seconds (1-30)

**Logs Generated:**
- Sequential logs with 1-second intervals
- Includes metrics (CPU, memory, requests)
- Milestone logs every 5 seconds

**Examples:**
```bash
# 5-second duration
curl http://localhost:3000/api/time-series?duration=5

# 10-second duration
curl http://localhost:3000/api/time-series?duration=10
```

---

## Testing Scenarios

### Scenario 1: Basic Logging Test
```bash
# Test all basic endpoints
curl http://localhost:3000/api/hello
curl http://localhost:3000/api/structured-log
curl http://localhost:3000/api/debug-log
```

### Scenario 2: Error and Warning Testing
```bash
# Test different error scenarios
curl http://localhost:3000/api/error-log?scenario=basic
curl http://localhost:3000/api/error-log?scenario=exception
curl http://localhost:3000/api/warning-log?type=security
```

### Scenario 3: High Volume Testing
```bash
# Generate high volume of logs
curl http://localhost:3000/api/high-volume?count=100
```

### Scenario 4: Format Testing
```bash
# Test different log formats
curl http://localhost:3000/api/mixed-formats
curl http://localhost:3000/api/multiline-log
```

### Scenario 5: Time-Based Testing
```bash
# Generate logs over time
curl http://localhost:3000/api/time-series?duration=30
```

---

## Log Severity Levels

The endpoints generate logs with the following severity levels:
- **DEBUG** - Detailed diagnostic information
- **INFO** - Informational messages
- **WARN** - Warning messages
- **ERROR** - Error messages

---

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Testing with tenant-logs

These endpoints are designed to test the tenant-logs service:
1. Deploy this application to Cloud Run
2. Configure Cloud Logging to route logs to Pub/Sub
3. Deploy tenant-logs-v2 service
4. Call these endpoints to generate various log types
5. Verify logs are captured and streamed correctly
