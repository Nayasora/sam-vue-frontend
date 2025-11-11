import type {
    ApiMiddleware,
    ErrorContext,
    RequestContext,
    ResponseContext
} from './types'
import { generateRequestId, generateIdempotencyKey } from './utils'

export async function executeRequestMiddleware(
  middleware: ApiMiddleware[],
  context: RequestContext
): Promise<RequestContext> {
  let currentContext = context

  for (const mw of middleware) {
    if (mw.onRequest && !shouldSkipMiddleware(context, mw.name)) {
      currentContext = await mw.onRequest(currentContext)
    }
  }

  return currentContext
}

export async function executeResponseMiddleware<T>(
  middleware: ApiMiddleware[],
  context: ResponseContext<T>
): Promise<ResponseContext<T>> {
  let currentContext = context

  for (let i = middleware.length - 1; i >= 0; i--) {
    const mw = middleware[i]
    if (mw && mw.onResponse && !shouldSkipMiddleware(context.request, mw.name)) {
      currentContext = await mw.onResponse(currentContext)
    }
  }

  return currentContext
}

export async function executeErrorMiddleware(
  middleware: ApiMiddleware[],
  context: ErrorContext
): Promise<ErrorContext | null> {
  let currentContext: ErrorContext | null = context

  for (const mw of middleware) {
    if (currentContext && mw.onError && !shouldSkipMiddleware(context.request, mw.name)) {
      currentContext = await mw.onError(currentContext)
      if (currentContext === null) {
        break
      }
    }
  }

  return currentContext
}

function shouldSkipMiddleware(context: RequestContext, middlewareName: string): boolean {
  return context.options.skipMiddleware?.includes(middlewareName) ?? false
}

export const requestIdMiddleware: ApiMiddleware = {
  name: 'request-id',
  onRequest: (context) => {
    if (!context.request_id) {
      context.request_id = generateRequestId()
    }
    context.options.headers = {
      ...context.options.headers,
      'X-Request-ID': context.request_id
    }
    return context
  }
}

export function createLocaleMiddleware(getLocale: () => string): ApiMiddleware {
  return {
    name: 'locale',
    onRequest: (context) => {
      const locale = getLocale()
      context.options.headers = {
        ...context.options.headers,
        'Accept-Language': locale
      }
      return context
    }
  }
}

export function createLoggerMiddleware(
  logger: {
    log: (message: string, data?: unknown) => void
    error: (message: string, data?: unknown) => void
  }
): ApiMiddleware {
  const timings = new Map<string, number>()

  return {
    name: 'logger',
    onRequest: (context) => {
      timings.set(context.request_id, Date.now())
      logger.log(`[API] ${context.options.method || 'GET'} ${context.url}`, {
        request_id: context.request_id
      })
      return context
    },
    onResponse: (context) => {
      const startTime = timings.get(context.request.request_id)
      const duration = startTime ? Date.now() - startTime : undefined
      timings.delete(context.request.request_id)

      logger.log(
        `[API] ${context.request.options.method || 'GET'} ${context.request.url} - ${context.status}`,
        {
          request_id: context.request.request_id,
          duration: duration ? `${duration}ms` : undefined
        }
      )
      return context
    },
    onError: (context) => {
      timings.delete(context.request.request_id)
      const error = context.error
      logger.error(
        `[API] ${context.request.options.method || 'GET'} ${context.request.url} - ERROR`,
        {
          request_id: context.request.request_id,
          error: error instanceof Error ? error.message : 'code' in error ? error.code : 'Unknown'
        }
      )
      return context
    }
  }
}

export function createHeadersMiddleware(headers: Record<string, string>): ApiMiddleware {
  return {
    name: 'custom-headers',
    onRequest: (context) => {
      context.options.headers = {
        ...headers,
        ...context.options.headers
      }
      return context
    }
  }
}

export const idempotencyMiddleware: ApiMiddleware = {
  name: 'idempotency',
  onRequest: (context) => {
    const method = context.options.method
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      if (!context.options.headers?.['Idempotency-Key']) {
        context.options.headers = {
          ...context.options.headers,
          'Idempotency-Key': generateIdempotencyKey()
        }
      }
    }
    return context
  }
}
