'use client';

import { create } from 'zustand';
import type { User, UserType, ActiveTab } from '@/types';

interface AuthState {
  user: User | null;
  userType: UserType;
  activeTab: ActiveTab;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setUserType: (type: UserType) => void;
  setActiveTab: (tab: ActiveTab) => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  user: null,
  userType: 'admin',
  activeTab: 'dashboard',

  // Actions
  setUser: (user) => set({ user }),
  setUserType: (userType) => set({ userType }),
  setActiveTab: (activeTab) => set({ activeTab }),
  logout: () => set({ user: null, userType: 'admin', activeTab: 'dashboard' }),
}));

// Simplified hook
export const useAuth = () => {
  const { user, userType, activeTab, setUser, setUserType, setActiveTab, logout } = useAuthStore();
  
  return {
    user,
    userType,
    activeTab,
    setUser,
    setUserType,
    setActiveTab,
    logout,
  };
};