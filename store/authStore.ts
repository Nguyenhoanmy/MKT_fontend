'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '@/services/auth.service';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: async (data: Partial<AuthUser>) => {
        try {
          set({ isLoading: true });
          const { user } = get();
          if (user) {
            const updatedUser = { ...user, ...data };
            set({ user: updatedUser });
          }
        } catch (error) {
          console.error('Error updating profile:', error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'elearning-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
