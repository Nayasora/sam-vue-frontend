import type { ApiError, ValidationError } from './types'
import { generateRequestId } from './utils'

export const GenericErrorCodes = {
  SERVER: {
    INTERNAL_ERROR: 'server.internal_error' as const,
    MAINTENANCE: 'server.maintenance' as const,
    TIMEOUT: 'server.timeout' as const
  },

  RATE_LIMIT: {
    EXCEEDED: 'rate_limit.exceeded' as const
  }
} as const

export function createApiError(
  code: string,
  status: number,
  errors?: ValidationError[],
  retry_after?: number
): ApiError {
  return {
    code,
    status,
    request_id: generateRequestId(),
    timestamp: new Date().toISOString(),
    errors,
    retry_after
  }
}

export function createRateLimitError(retryAfter: number): ApiError {
  return createApiError(GenericErrorCodes.RATE_LIMIT.EXCEEDED, 429, undefined, retryAfter)
}

export function createServerError(code: string = GenericErrorCodes.SERVER.INTERNAL_ERROR): ApiError {
  return createApiError(code, 500)
}

export function parseApiError(error: unknown): ApiError {
  if (isApiError(error)) {
    return error
  }

  if (error instanceof Error) {
    if (error.message?.includes('timeout') || error.message?.includes('aborted')) {
      return createApiError(GenericErrorCodes.SERVER.TIMEOUT, 503)
    }

    const statusMatch = error.message?.match(/HTTP (\d{3})/)
    if (statusMatch && statusMatch[1]) {
      const status = parseInt(statusMatch[1], 10)
      return createApiError(`http.${status}`, status)
    }

    return createApiError(GenericErrorCodes.SERVER.INTERNAL_ERROR, 500)
  }

  if (typeof error === 'object' && error !== null && 'response' in error) {
    const responseError = error as any
    const data = responseError.response?.data

    if (data && isApiError(data)) {
      return data
    }

    const status = responseError.response?.status || 500
    const code = data?.code || `http.${status}`
    return {
      code,
      status,
      request_id: data?.request_id || generateRequestId(),
      timestamp: data?.timestamp || new Date().toISOString(),
      errors: data?.errors,
      retry_after: data?.retry_after
    }
  }

  return createApiError(GenericErrorCodes.SERVER.INTERNAL_ERROR, 500)
}

export function isApiError(obj: unknown): obj is ApiError {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'code' in obj &&
    typeof obj.code === 'string' &&
    'status' in obj &&
    typeof obj.status === 'number' &&
    'request_id' in obj &&
    'timestamp' in obj
  )
}

export function isRetryableError(error: ApiError): boolean {
  const retryableStatuses = [408, 429, 503, 504]
  return retryableStatuses.includes(error.status)
}

export function hasValidationErrors(error: ApiError): error is ApiError & { errors: ValidationError[] } {
  return Boolean(error.errors && error.errors.length > 0)
}

export function extractValidationErrors(error: ApiError): Record<string, string> {
  if (!error.errors || !Array.isArray(error.errors)) {
    return {}
  }

  return error.errors.reduce((acc, err) => {
    acc[err.field] = err.code
    return acc
  }, {} as Record<string, string>)
}

export function getFieldError(error: ApiError, field: string): string | undefined {
  if (!error.errors) return undefined
  const fieldError = error.errors.find((err) => err.field === field)
  return fieldError?.code
}

export function calculateRetryDelay(
  attempt: number,
  baseDelay: number = 1000,
  multiplier: number = 2,
  maxDelay: number = 30000
): number {
  const delay = baseDelay * Math.pow(multiplier, attempt - 1)
  return Math.min(delay, maxDelay)
}

export function getRetryDelay(error: ApiError, attempt: number = 1): number {
  if (error.retry_after) {
    return error.retry_after * 1000 // Convert seconds to milliseconds
  }
  return calculateRetryDelay(attempt)
}

export function getErrorI18nKey(code: string): string {
  return `errors.${code}`
}

export function getFieldErrorI18nKey(code: string): string {
  return `errors.validation.${code}`
}
