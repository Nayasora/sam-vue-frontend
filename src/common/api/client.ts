import type {
    ApiClientConfig,
    ApiMiddleware,
    Endpoint,
    ErrorContext,
    RequestContext,
    RequestOptions,
    ResponseContext
} from './types'
import {executeErrorMiddleware, executeRequestMiddleware, executeResponseMiddleware} from './middleware'
import {parseApiError} from './errors'

export class ApiClient {
  private config: Required<ApiClientConfig>
  private middleware: ApiMiddleware[]

  constructor(config: ApiClientConfig) {
    this.config = {
      baseURL: config.baseURL,
      version: config.version ?? '',
      timeout: config.timeout ?? 30000,
      headers: config.headers ?? {},
      middleware: config.middleware ?? [],
      credentials: config.credentials ?? 'same-origin'
    }
    this.middleware = [...this.config.middleware]
  }

  use(middleware: ApiMiddleware): void {
    this.middleware.push(middleware)
  }

  removeMiddleware(name: string): void {
    this.middleware = this.middleware.filter((mw) => mw.name !== name)
  }

  async get<TResponse = unknown>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: 'GET' })
  }

  async post<TRequest = unknown, TResponse = unknown>(
    url: string,
    body?: TRequest,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: 'POST', body })
  }

  async put<TRequest = unknown, TResponse = unknown>(
    url: string,
    body?: TRequest,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: 'PUT', body })
  }

  async patch<TRequest = unknown, TResponse = unknown>(
    url: string,
    body?: TRequest,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: 'PATCH', body })
  }

  async delete<TResponse = unknown>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: 'DELETE' })
  }

  async execute<TRequest, TResponse>(
    endpoint: Endpoint<TRequest, TResponse>,
    options?: {
      body?: TRequest
      params?: Record<string, string | number>
      headers?: Record<string, string>
    }
  ): Promise<TResponse> {
    return this.request<TResponse>(endpoint.path, {
      method: endpoint.method,
      body: options?.body,
      headers: options?.headers,
      pathParams: options?.params
    })
  }

  private async request<TResponse>(url: string, options: RequestOptions = {}): Promise<TResponse> {
    const fullUrl = this.buildRequestUrl(url, options.pathParams, options.params)

    let requestContext: RequestContext = {
      url: fullUrl,
      request_id: '',
      options: {
        ...options,
        method: options.method ?? 'GET',
        timeout: options.timeout ?? this.config.timeout,
        headers: {
          'Content-Type': 'application/json',
          ...this.config.headers,
          ...options.headers
        }
      }
    }

    try {
      requestContext = await executeRequestMiddleware(this.middleware, requestContext)

      const response = await this.executeRequest(requestContext)

      let responseContext: ResponseContext<TResponse> = {
        ...response,
        data: response.data as TResponse,
        request: requestContext
      }

      responseContext = await executeResponseMiddleware(this.middleware, responseContext)

      return responseContext.data
    } catch (error) {
      let errorContext: ErrorContext = {
        error: error instanceof Error ? parseApiError(error) : (error as any),
        request: requestContext,
        retryCount: 0
      }

      const handledError = await executeErrorMiddleware(this.middleware, errorContext)

      if (handledError) {
        throw handledError.error
      }

      throw error
    }
  }

  private async executeRequest<TResponse>(
    context: RequestContext
  ): Promise<{ data: TResponse; status: number; headers: Record<string, string> }> {
    const { url, options } = context

    const fetchOptions: RequestInit = {
      method: options.method,
      headers: options.headers,
      signal: AbortSignal.timeout(options.timeout || this.config.timeout),
      credentials: this.config.credentials
    }

    if (options.body && options.method !== 'GET') {
      fetchOptions.body = JSON.stringify(options.body)
    }

    const response = await fetch(url, fetchOptions)

    const responseHeaders: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })

    let data: TResponse
    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      data = await response.json() as TResponse
    } else {
      data = (await response.text()) as TResponse
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return {
      data,
      status: response.status,
      headers: responseHeaders
    }
  }

  private buildRequestUrl(
    path: string,
    pathParams?: Record<string, string | number>,
    queryParams?: Record<string, string | number | boolean>
  ): string {
    let interpolatedPath = path
    if (pathParams) {
      Object.entries(pathParams).forEach(([key, value]) => {
        interpolatedPath = interpolatedPath.replace(`:${key}`, String(value))
      })
    }

    const base = this.config.baseURL.replace(/\/$/, '')
    const version = this.config.version ? `/${this.config.version}` : ''
    const cleanPath = interpolatedPath.startsWith('/') ? interpolatedPath : `/${interpolatedPath}`
    let url = `${base}${version}${cleanPath}`

    if (queryParams) {
      const searchParams = new URLSearchParams()
      Object.entries(queryParams).forEach(([key, value]) => {
        searchParams.append(key, String(value))
      })
      const queryString = searchParams.toString()
      if (queryString) {
        url = `${url}?${queryString}`
      }
    }

    return url
  }
}

export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config)
}
