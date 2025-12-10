export interface ApiError {
  code: string
  status: number
  request_id: string
  timestamp: string
  errors?: ValidationError[]
  retry_after?: number
}

export interface ValidationError {
  field: string
  code: string
  value?: unknown
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiResponse<T = unknown> {
  data: T
  request_id: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    per_page: number
    total: number
    total_pages: number
  }
  request_id: string
  timestamp: string
}

export interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  pathParams?: Record<string, string | number>
  body?: unknown
  timeout?: number
  skipMiddleware?: string[]
  meta?: Record<string, unknown>
}

export interface RequestContext {
  url: string
  options: RequestOptions
  request_id: string
}

export interface ResponseContext<T = unknown> {
  data: T
  status: number
  headers: Record<string, string>
  request: RequestContext
}

export interface ErrorContext {
  error: ApiError | Error
  request: RequestContext
  retryCount: number
}

export type RequestMiddleware = (
  context: RequestContext
) => Promise<RequestContext> | RequestContext

export type ResponseMiddleware = <T = unknown>(
  context: ResponseContext<T>
) => Promise<ResponseContext<T>> | ResponseContext<T>

export type ErrorMiddleware = (
  context: ErrorContext
) => Promise<ErrorContext | null> | ErrorContext | null

export interface ApiMiddleware {
  name: string
  onRequest?: RequestMiddleware
  onResponse?: ResponseMiddleware
  onError?: ErrorMiddleware
}

export interface ApiClientConfig {
  baseURL: string
  version?: string
  timeout?: number
  headers?: Record<string, string>
  middleware?: ApiMiddleware[]
  credentials?: RequestCredentials
}

export interface RateLimitInfo {
  remaining: number
  limit: number
  reset: number
  retry_after: number
}

export type ErrorCode<T> = T[keyof T]

export interface Endpoint<TRequest = unknown, TResponse = unknown> {
  path: string
  method: HttpMethod
  authenticated?: boolean
  _requestType?: TRequest
  _responseType?: TResponse
}

export function defineEndpoint<TRequest = void, TResponse = unknown>(
  path: string,
  method: HttpMethod,
  options?: { authenticated?: boolean }
): Endpoint<TRequest, TResponse> {
  return {
    path,
    method,
    authenticated: options?.authenticated ?? false
  }
}
