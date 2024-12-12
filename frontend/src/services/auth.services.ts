import api from './api';
import { LoginCredentials, AuthResponse } from '../types/auth.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Login request payload:', credentials); // Debug log

      const response = await api.post<AuthResponse>('/auth/login/', credentials);
      console.log('Login response:', response.data); // adds a debug log for error handling

      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
      }
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message); // adds a debug log for error handling
      if (error.response) {
        throw new Error(error.response.data.detail || 'Login failed');
      }
      throw new Error('Network error occurred');
    }
  },
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
  },
  getCurrentUser(): AuthResponse['user'] | null {
    const token = localStorage.getItem('token');
    console.log('Current token:', token);
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded token payload:', payload);
        return {
          id: payload.user_id,
          email: payload.email || '',
          role: 'USER' as const
        };
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
}
