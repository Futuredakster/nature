// Client-side authentication utilities
import type { User, AuthResponse } from './types';

const TOKEN_KEY = 'admin_token';
const USER_KEY = 'admin_user';

export function setAuth(authResponse: AuthResponse): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, authResponse.token);
    localStorage.setItem(USER_KEY, JSON.stringify(authResponse.user));
  }
}

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function getUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function clearAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getToken();

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (response.status === 401) {
    // Token invalid or expired
    clearAuth();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  return response;
}
