import { create } from 'zustand';
import { cognitoAuth, type CognitoUser } from './cognito';
import { apiRequest } from './queryClient';
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  cognitoUser: CognitoUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: { email: string; password: string; firstName: string; lastName: string; company?: string }) => Promise<void>;
  signOut: () => void;
  initialize: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  cognitoUser: null,
  isLoading: false,
  isAuthenticated: false,

  signIn: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      await cognitoAuth.signIn({ email, password });
      await get().initialize();
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signUp: async (data) => {
    set({ isLoading: true });
    try {
      await cognitoAuth.signUp(data);
      // After signup, user needs to verify email before they can sign in
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signOut: () => {
    cognitoAuth.signOut();
    set({ user: null, cognitoUser: null, isAuthenticated: false });
  },

  initialize: async () => {
    set({ isLoading: true });
    try {
      const cognitoUser = await cognitoAuth.getCurrentUser();
      if (cognitoUser) {
        // Get or create user in our database
        try {
          const response = await apiRequest('GET', '/api/users/me', undefined);
          const user = await response.json();
          set({ user, cognitoUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          // User doesn't exist in our database, create them
          if (error.message.includes('404')) {
            const newUser = await apiRequest('POST', '/api/users', {
              email: cognitoUser.email,
              firstName: cognitoUser.firstName,
              lastName: cognitoUser.lastName,
              company: cognitoUser.company,
              cognitoId: cognitoUser.sub
            });
            const user = await newUser.json();
            set({ user, cognitoUser, isAuthenticated: true, isLoading: false });
          } else {
            throw error;
          }
        }
      } else {
        set({ user: null, cognitoUser: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      set({ user: null, cognitoUser: null, isAuthenticated: false, isLoading: false });
    }
  }
}));

// Interceptor to add Cognito ID to requests
const originalApiRequest = apiRequest;
export const authenticatedApiRequest = async (method: string, url: string, data?: unknown) => {
  const cognitoUser = await cognitoAuth.getCurrentUser();
  const headers: Record<string, string> = data ? { "Content-Type": "application/json" } : {};
  
  if (cognitoUser) {
    headers['x-cognito-id'] = cognitoUser.sub;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }

  return res;
};
