import { bagistoClient, setAuthToken } from '../bagisto'
import { ENDPOINTS } from '../endpoints'
import type { Customer } from '../bagisto.types'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

export interface LoginResponse {
  token: string
  message: string
  data: Customer
}

export interface RegisterResponse {
  message: string
  data: Customer
}

export interface ProfileResponse {
  data: Customer
}

export interface UpdateProfileData {
  first_name?: string
  last_name?: string
  email?: string
  gender?: string
  date_of_birth?: string
  phone?: string
  current_password?: string
  new_password?: string
  new_password_confirmation?: string
}

export interface ForgotPasswordData {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await bagistoClient.post<LoginCredentials, LoginResponse>(
      ENDPOINTS.AUTH.LOGIN,
      credentials
    )

    if (response.token) {
      setAuthToken(response.token)
    }

    return response
  }

  async register(data: RegisterData): Promise<RegisterResponse> {
    const response = await bagistoClient.post<RegisterData, RegisterResponse>(
      ENDPOINTS.AUTH.REGISTER,
      data
    )

    return response
  }

  async logout(): Promise<{ message: string }> {
    try {
      const response = await bagistoClient.get<{ message: string }>(
        ENDPOINTS.AUTH.LOGOUT
      )
      return response
    } finally {
      setAuthToken(null)
    }
  }

  async getProfile(): Promise<Customer> {
    const response = await bagistoClient.get<ProfileResponse>(
      ENDPOINTS.AUTH.PROFILE
    )
    return response.data
  }

  async updateProfile(data: UpdateProfileData): Promise<Customer> {
    const response = await bagistoClient.put<UpdateProfileData, ProfileResponse>(
      ENDPOINTS.AUTH.UPDATE_PROFILE,
      data
    )
    return response.data
  }

  async forgotPassword(data: ForgotPasswordData): Promise<ForgotPasswordResponse> {
    const response = await bagistoClient.post<ForgotPasswordData, ForgotPasswordResponse>(
      ENDPOINTS.AUTH.FORGOT_PASSWORD,
      data
    )
    return response
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token')
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token')
  }
}

export const authService = new AuthService()
