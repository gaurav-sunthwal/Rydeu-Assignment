import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { api } from '../services/api';

// In-memory fallback dictionary
const memoryStorage: Record<string, string> = {};

// Safe wrapper to prevent "Native module is null" crashes
const SafeStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
      if (key === 'auth_user') {
        return await SecureStore.getItemAsync(key);
      }
      return await AsyncStorage.getItem(key);
    } catch (e: any) {
      console.warn(`[SafeStorage] getItem failed for key "${key}", falling back to memory storage:`, e.message);
      return memoryStorage[key] || null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
      if (key === 'auth_user') {
        await SecureStore.setItemAsync(key, value);
        return;
      }
      await AsyncStorage.setItem(key, value);
    } catch (e: any) {
      console.warn(`[SafeStorage] setItem failed for key "${key}", falling back to memory storage:`, e.message);
      memoryStorage[key] = value;
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
      if (key === 'auth_user') {
        await SecureStore.deleteItemAsync(key);
        return;
      }
      await AsyncStorage.removeItem(key);
    } catch (e: any) {
      console.warn(`[SafeStorage] removeItem failed for key "${key}", falling back to memory storage:`, e.message);
      delete memoryStorage[key];
    }
  }
};

interface User {
  username: string;
  email?: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  isFirstTime: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  bypassLogin: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isFirstTime: true,
  isInitialized: false,

  login: async (email: string, password: string) => {
    try {
      const data = await api.login(email, password);
      // Redact token from debug logs
      const safeData = data ? {
        ...data,
        data: data.data ? { ...data.data, token: data.data.token ? '***[REDACTED]***' : undefined } : undefined,
        token: data.token ? '***[REDACTED]***' : undefined,
      } : null;
      console.log('[authStore] API Raw Response Data (token redacted):', JSON.stringify(safeData, null, 2));
      
      const user = {
        username: email.split('@')[0],
        email,
        token: data?.data?.token || data?.token || 'authenticated-token',
      };
      
      console.log('[authStore] Saving user from API response (token redacted):', { ...user, token: '***[REDACTED]***' });
      try {
        await SafeStorage.setItem('auth_user', JSON.stringify(user));
        await SafeStorage.setItem('has_opened_before', 'true');
        console.log('[authStore] Saved successfully to SafeStorage');
      } catch (storageErr: any) {
        console.error('[authStore] SafeStorage setItem failed:', storageErr);
      }
      
      set({ user, isFirstTime: false });
    } catch (e: any) {
      console.warn('[authStore] API login failed, checking fallback for demo credentials:', e.message);
      // Fallback for offline testing / staging server timeout
      if (email === 'rydeu@email10p.org' && password === '123456') {
        const user = { username: 'rydeu', email, token: 'offline-mock-token' };
        console.log('[authStore] Using demo credentials fallback user (token redacted):', { ...user, token: '***[REDACTED]***' });
        try {
          await SafeStorage.setItem('auth_user', JSON.stringify(user));
          await SafeStorage.setItem('has_opened_before', 'true');
          console.log('[authStore] Demo user saved successfully to SafeStorage');
        } catch (storageErr: any) {
          console.error('[authStore] SafeStorage setItem failed:', storageErr);
        }
        set({ user, isFirstTime: false });
        return;
      }
      throw new Error(e.message || 'Login failed');
    }
  },

  bypassLogin: async () => {
    const user = { username: 'Rydeu Guest', email: 'demo@rydeu.com', token: 'offline-mock-token' };
    console.log('[authStore] Bypass login, using user (token redacted):', { ...user, token: '***[REDACTED]***' });
    try {
      await SafeStorage.setItem('auth_user', JSON.stringify(user));
      await SafeStorage.setItem('has_opened_before', 'true');
      console.log('[authStore] Bypass user saved successfully to SafeStorage');
    } catch (storageErr: any) {
      console.error('[authStore] SafeStorage bypass setItem failed:', storageErr);
    }
    set({ user, isFirstTime: false });
  },

  logout: async () => {
    console.log('[authStore] Logging out, clearing SafeStorage');
    try {
      await SafeStorage.removeItem('auth_user');
      console.log('[authStore] SafeStorage user removed successfully');
    } catch (storageErr: any) {
      console.error('[authStore] SafeStorage removeItem failed:', storageErr);
    }
    set({ user: null });
  },

  checkAuth: async () => {
    console.log('[authStore] Starting checkAuth...');
    try {
      const storedUser = await SafeStorage.getItem('auth_user');
      const hasOpenedBefore = await SafeStorage.getItem('has_opened_before');
      
      let parsedUser = null;
      try {
        if (storedUser) {
          parsedUser = JSON.parse(storedUser);
        }
      } catch {}
      const loggedUser = parsedUser ? { ...parsedUser, token: '***[REDACTED]***' } : null;
      console.log('[authStore] Loaded from SafeStorage - User (token redacted):', loggedUser, 'hasOpenedBefore:', hasOpenedBefore);

      set({
        user: parsedUser,
        isFirstTime: hasOpenedBefore !== 'true',
        isInitialized: true,
      });
    } catch (e) {
      console.error('[authStore] checkAuth failed reading SafeStorage:', e);
      set({ isInitialized: true });
    }
  },
}));
