'use client';

import { useAuth } from '@/contexts/simple-store';
import { Dashboard } from '@/components/pages/dashboard';
import { LoginModal } from '@/components/forms/login-modal';

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return <LoginModal />;
  }

  return <Dashboard />;
}
