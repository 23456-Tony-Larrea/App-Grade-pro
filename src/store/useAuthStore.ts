import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthUser {
  id?: number;
  name?: string;
  token?: string;
  email?: string,
  secondLastName?:string,
  identity?: string,
}

interface AuthStore {
  authUser: AuthUser | null;
  setAuthUser: (authUser: AuthUser) => void;
  clearAuthUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      authUser: null,
      setAuthUser: (authUser) => set({ authUser }),
      clearAuthUser: () => set({ authUser: null }),
    }),
    {
      name: 'auth-login',
    }
  )
);