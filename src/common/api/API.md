# Common API Infrastructure Documentation

## Overview

The common API layer provides **infrastructure only** - no domain-specific logic. Features define their own error codes, endpoints, types, and middleware.

### Architecture Principles

1. **Common Layer**: Type-safe client, middleware system, generic error utilities
2. **Feature Layer**: Domain-specific errors, endpoints, types, and middleware
3. **Minimal Errors**: Error codes only, messages handled via i18n in UI
4. **Composable**: Middleware/hook system for extensibility

---

## API Client

### Creating a Client

```typescript
import { createApiClient } from '@/common/api/client'
import { requestIdMiddleware, timestampMiddleware } from '@/common/api/middleware'

const client = createApiClient({
  baseURL: 'https://api.example.com/api',
  version: 'v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  },
  middleware: [
    requestIdMiddleware,
    timestampMiddleware
  ]
})
```

### Making Requests

```typescript
// Simple requests
const users = await client.get('/users')
const user = await client.post('/users', { name: 'John' })
await client.put('/users/123', { name: 'Jane' })
await client.delete('/users/123')

// Type-safe endpoint requests
import { defineEndpoint } from '@/common/api/types'

const createUser = defineEndpoint<CreateUserPayload, User>(
  '/users',
  'POST',
  { authenticated: true }
)

const user = await client.execute(createUser, {
  body: { name: 'John', email: 'john@example.com' }
})
```

---

## Error Format

### Minimal Error Structure

Errors contain **only codes and metadata**. All user-facing messages are handled via i18n based on the error code.

```typescript
interface ApiError {
  code: string              // Error code for i18n lookup
  status: number            // HTTP status code
  request_id: string        // Request tracking ID
  timestamp: string         // ISO 8601 timestamp
  errors?: ValidationError[] // Field-level validation errors (optional)
  retry_after?: number      // Seconds to wait (rate limiting)
}
```

### Error Response Example

```json
{
  "code": "auth.token.expired",
  "status": 401,
  "request_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-11-10T12:34:56Z"
}
```

### Validation Error Example

```json
{
  "code": "auth.validation.failed",
  "status": 422,
  "request_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-11-10T12:34:56Z",
  "errors": [
    {
      "field": "email",
      "code": "auth.validation.email.format"
    },
    {
      "field": "password",
      "code": "auth.validation.password.min_length"
    }
  ]
}
```

### Generic Error Codes

Common layer provides **only** infrastructure-level error codes:

```typescript
GenericErrorCodes = {
  SERVER: {
    INTERNAL_ERROR: 'server.internal_error',
    MAINTENANCE: 'server.maintenance',
    TIMEOUT: 'server.timeout'
  },
  RATE_LIMIT: {
    EXCEEDED: 'rate_limit.exceeded'
  }
}
```

**Features define their own domain-specific error codes** (auth, user, etc.)

### Error Code Pattern

**Format**: `domain.resource.error`

**Examples**:
- `server.internal_error` (common)
- `rate_limit.exceeded` (common)
- `auth.token.expired` (auth feature)
- `user.profile.not_found` (user feature)

### i18n Integration

Error codes map to i18n keys for user-facing messages:

```typescript
import { getErrorI18nKey } from '@/common/api/errors'

const i18nKey = getErrorI18nKey('auth.token.expired')
// Returns: 'errors.auth.token.expired'

// In your i18n translations:
{
  "errors": {
    "auth": {
      "token": {
        "expired": "Your session has expired. Please login again."
      }
    }
  }
}
```

---

## Middleware System

### Middleware Interface

```typescript
interface ApiMiddleware {
  name: string
  onRequest?: (context: RequestContext) => Promise<RequestContext> | RequestContext
  onResponse?: (context: ResponseContext) => Promise<ResponseContext> | ResponseContext
  onError?: (context: ErrorContext) => Promise<ErrorContext | null> | ErrorContext | null
}
```

### Built-in Middleware

#### Request ID Generation

```typescript
import { requestIdMiddleware } from '@/common/api/middleware'

// Automatically generates and adds X-Request-ID header
client.use(requestIdMiddleware)
```

#### Timestamp Tracking

```typescript
import { timestampMiddleware } from '@/common/api/middleware'

// Tracks request duration
client.use(timestampMiddleware)
```

#### Locale Headers

```typescript
import { createLocaleMiddleware } from '@/common/api/middleware'

client.use(createLocaleMiddleware(() => currentLocale))
// Adds Accept-Language header
```

#### Custom Headers

```typescript
import { createHeadersMiddleware } from '@/common/api/middleware'

client.use(createHeadersMiddleware({
  'X-App-Version': '1.0.0',
  'X-Platform': 'web'
}))
```

#### Logging

```typescript
import { createLoggerMiddleware } from '@/common/api/middleware'

client.use(createLoggerMiddleware({
  log: (msg, data) => console.log(msg, data),
  error: (msg, data) => console.error(msg, data)
}))
```

#### Idempotency Keys

```typescript
import { idempotencyMiddleware } from '@/common/api/middleware'

// Automatically adds Idempotency-Key to POST/PUT/PATCH
client.use(idempotencyMiddleware)
```

### Creating Custom Middleware

```typescript
import { createRequestMiddleware } from '@/common/api/middleware'

const myMiddleware = createRequestMiddleware('my-middleware', (context) => {
  // Modify request before sending
  context.options.headers = {
    ...context.options.headers,
    'X-Custom-Header': 'value'
  }
  return context
})

client.use(myMiddleware)
```

### Skipping Middleware

```typescript
// Skip specific middleware for a request
await client.get('/public/data', {
  skipMiddleware: ['auth-token', 'logging']
})
```

---

## Request Standards

### Required Headers

```http
Content-Type: application/json
Accept: application/json
X-Request-ID: {uuid-v4}
Accept-Language: {locale}
```

### Authenticated Requests

```http
Authorization: Bearer {jwt-token}
Content-Type: application/json
X-Request-ID: {uuid-v4}
```

### Mutation Requests (POST/PUT/PATCH)

```http
Authorization: Bearer {jwt-token}
Content-Type: application/json
X-Request-ID: {uuid-v4}
Idempotency-Key: {uuid-v4}
```

---

## Response Standards

### Success Response

```json
{
  "data": {
    "id": "123",
    "email": "user@example.com",
    "created_at": "2024-11-10T12:34:56Z"
  },
  "request_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-11-10T12:34:56Z"
}
```

### Pagination Response

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  },
  "request_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-11-10T12:34:56Z"
}
```

### Response Headers

```http
X-Request-ID: {uuid-v4}
Content-Type: application/json
RateLimit-Limit: 100
RateLimit-Remaining: 42
RateLimit-Reset: 45
```

---

## HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| **200** | OK | Successful GET, PUT, PATCH |
| **201** | Created | Successful POST creating resource |
| **204** | No Content | Successful DELETE |
| **400** | Bad Request | Invalid request syntax |
| **401** | Unauthorized | Missing/invalid authentication |
| **403** | Forbidden | Authenticated but not authorized |
| **404** | Not Found | Resource doesn't exist |
| **409** | Conflict | Duplicate or conflicting state |
| **422** | Unprocessable Entity | Validation errors |
| **429** | Too Many Requests | Rate limit exceeded |
| **500** | Internal Server Error | Server failure |
| **503** | Service Unavailable | Temporary maintenance |

---

## Feature Implementation Guide

### 1. Define Error Codes

```typescript
// src/features/myfeature/http/api.errors.ts
export const MyFeatureErrorCodes = {
  RESOURCE_NOT_FOUND: 'myfeature.resource.not_found',
  INVALID_INPUT: 'myfeature.validation.invalid_input'
} as const
```

### 2. Define Types

```typescript
// src/features/myfeature/http/api.types.ts
export interface CreateResourcePayload {
  name: string
}

export interface ResourceResponse {
  id: string
  name: string
}
```

### 3. Define Endpoints

```typescript
// src/features/myfeature/http/api.endpoints.ts
import { defineEndpoint } from '@/common/api/types'

export const MyFeatureEndpoints = {
  CREATE: defineEndpoint<CreateResourcePayload, ResourceResponse>(
    '/myfeature/resources',
    'POST',
    { authenticated: true }
  )
}
```

### 4. Create Middleware (Optional)

```typescript
// src/features/myfeature/http/api.middleware.ts
import type { ApiMiddleware } from '@/common/api/types'

export const myFeatureMiddleware: ApiMiddleware = {
  name: 'my-feature',
  onRequest: (context) => {
    // Add feature-specific logic
    return context
  }
}
```

### 5. Create Feature Client

```typescript
// src/features/myfeature/http/index.ts
import { createApiClient } from '@/common/api/client'
import { MyFeatureEndpoints } from './api.endpoints'

export function createMyFeatureClient(baseURL: string) {
  const client = createApiClient({
    baseURL,
    middleware: [myFeatureMiddleware]
  })

  return {
    createResource: (payload: CreateResourcePayload) =>
      client.execute(MyFeatureEndpoints.CREATE, { body: payload })
  }
}
```

---

## Utilities

### Error Handling

```typescript
import {
  parseApiError,
  isRetryableError,
  calculateRetryDelay,
  getErrorI18nKey
} from '@/common/api/errors'

try {
  await client.get('/users')
} catch (error) {
  const apiError = parseApiError(error)

  if (isRetryableError(apiError)) {
    const delay = calculateRetryDelay(retryCount)
    await sleep(delay)
    // Retry request
  }

  const i18nKey = getErrorI18nKey(apiError.code)
  showErrorMessage(t(i18nKey))
}
```

### Validation Errors

```typescript
import { extractValidationErrors, getFieldError } from '@/common/api/errors'

try {
  await client.post('/users', userData)
} catch (error) {
  const apiError = parseApiError(error)
  const fieldErrors = extractValidationErrors(apiError)

  // fieldErrors = { email: 'auth.validation.email.format', ... }

  const emailError = getFieldError(apiError, 'email')
  if (emailError) {
    showFieldError('email', t(getErrorI18nKey(emailError)))
  }
}
```

---

## Best Practices

1. **Keep Common Generic**: No domain logic in common layer
2. **Feature Self-Contained**: Each feature has its own errors, types, endpoints
3. **Use Middleware**: Compose functionality via middleware, not inheritance
4. **Type Safety**: Use `defineEndpoint()` and `client.execute()` for type safety
5. **i18n All Messages**: Never hardcode user-facing messages, use error codes + i18n
6. **Error Handling**: Always use `parseApiError()` to normalize errors
7. **Request IDs**: Include request IDs in error reports for debugging

---